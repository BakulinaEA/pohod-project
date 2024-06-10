import jwt from 'jsonwebtoken'

import UserModel from '../models/user.model'

import VerificationCodeType from '../constants/verificationCodeTypes'
import VerificationCodeModel from '../models/verificationCode.model'
import SessionModel from '../models/session.model'

import { oneHourFromNow } from '../utils/date'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../constants/env'
import appAssert from '../utils/appAssert'
import { CONFLICT } from '../constants/http'

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

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userID: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneHourFromNow()
  })

  // here is send email

  // create session
  const session = await SessionModel.create({
    userID: user._id,
    userAgent: data.userAgent
  })

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    { sessionID: session._id },
    JWT_REFRESH_SECRET,
    { audience: ['user'], expiresIn: '7d' }
  )

  const accessToken = jwt.sign(
    { userID: user._id, sessionID: session._id },
    JWT_SECRET,
    { audience: ['user'], expiresIn: '15m' }
  )

  // return user and tokens
  return {
    user,
    accessToken,
    refreshToken
  }
}
