import UserModel from '../models/user.model'

import VerificationCodeType from '../constants/verificationCodeTypes'
import VerificationCodeModel from '../models/verificationCode.model'
import SessionModel from '../models/session.model'

import { oneHourFromNow } from '../utils/date'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../constants/env'
import { CONFLICT, UNAUTHORIZED } from '../constants/http'

import appAssert from '../utils/appAssert'
import { refreshTokenSignOptions, signToken } from '../utils/jwt'

export type CreateAccountParams = {
  email: string
  password: string
  userAgent?: string
}

export const createAccount = async (data: CreateAccountParams) => {
  // verify existing user
  const existingUser = await UserModel.exists({
    email: data.email
  })
  appAssert(
    !existingUser,
    CONFLICT,
    'Пользователь с таким email уже существует'
  )

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password
  })

  const userID = user._id

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userID,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneHourFromNow()
  })

  // here is send email

  // create session
  const session = await SessionModel.create({
    userID,
    userAgent: data.userAgent
  })

  // sign access token & refresh token
  const refreshToken = signToken(
    { sessionID: session._id },
    refreshTokenSignOptions
  )

  const accessToken = signToken({ userID, sessionID: session._id })

  // return user and tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken
  }
}

type LoginParams = {
  email: string
  password: string
  userAgent?: string
}

export const loginUser = async ({
  email,
  password,
  userAgent
}: LoginParams) => {
  // find user by email
  const user = await UserModel.findOne({ email })
  appAssert(user, UNAUTHORIZED, 'Неверный email или пароль')

  // validate password
  const isValid = await user.comparePassword(password)
  appAssert(isValid, UNAUTHORIZED, 'Неверный email или пароль')

  const userID = user._id

  // create a session
  const session = await SessionModel.create({
    userID,
    userAgent
  })

  const sessionInfo = {
    sessionID: session._id
  }

  // sign access token & refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions)

  const accessToken = signToken({ ...sessionInfo, userID })

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken
  }
}
