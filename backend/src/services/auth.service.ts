import UserModel from '../models/user.model'

import VerificationCodeType from '../constants/verificationCodeTypes'
import VerificationCodeModel from '../models/verificationCode.model'
import SessionModel from '../models/session.model'

import {
  ONE_DAY_MS,
  fiveMinutesAgo,
  oneHourFromNow,
  oneWeekFromNow
} from '../utils/date'
import { APP_ORIGIN } from '../constants/env'
import {
  CONFLICT,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} from '../constants/http'

import appAssert from '../utils/appAssert'
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken
} from '../utils/jwt'
import { sendMail } from '../utils/sendMail'
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate
} from '../utils/emailTemplates'
import { hashValue } from '../utils/bcrypt'

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
  const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`

  // send verification email
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url)
  })
  // ignore email errors for now
  if (error) console.error(error)

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

// email actions there

export const verifyEmail = async (code: string) => {
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() }
  })
  appAssert(validCode, NOT_FOUND, 'Ссылка для подтверждения почты истекла')

  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userID,
    {
      verified: true
    },
    { new: true }
  )
  appAssert(
    updatedUser,
    INTERNAL_SERVER_ERROR,
    'Невозможно подтвердить почту, попробуйте ещё раз'
  )

  await validCode.deleteOne()

  return {
    user: updatedUser.omitPassword()
  }
}

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret
  })
  appAssert(payload, UNAUTHORIZED, 'Неверный Refresh Token')

  const session = await SessionModel.findById(payload.sessionID)
  const now = Date.now()
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    'Сессия истекла'
  )

  // refresh the session if it expires in the next 24hrs
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS
  if (sessionNeedsRefresh) {
    session.expiresAt = oneWeekFromNow()
    await session.save()
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken(
        {
          sessionID: session._id
        },
        refreshTokenSignOptions
      )
    : undefined

  const accessToken = signToken({
    userID: session.userID,
    sessionID: session._id
  })

  return {
    accessToken,
    newRefreshToken
  }
}

export const sendPasswordResetEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email })
    appAssert(user, NOT_FOUND, 'Пользователь не найден')

    // check for max password reset requests (2 emails in 5min)
    const fiveMinAgo = fiveMinutesAgo()
    const count = await VerificationCodeModel.countDocuments({
      userID: user._id,
      type: VerificationCodeType.PasswordReset,
      createdAt: { $gt: fiveMinAgo }
    })
    appAssert(count <= 1, 429, 'Слишком много запросов, повторите позже')

    const expiresAt = oneHourFromNow()
    const verificationCode = await VerificationCodeModel.create({
      userID: user._id,
      type: VerificationCodeType.PasswordReset,
      expiresAt
    })

    const url = `${APP_ORIGIN}/password/reset?code=${
      verificationCode._id
    }&exp=${expiresAt.getTime()}`

    const { data, error } = await sendMail({
      to: email,
      ...getPasswordResetTemplate(url)
    })

    appAssert(
      data?.id,
      INTERNAL_SERVER_ERROR,
      `${error?.name} - ${error?.message}`
    )
    return {
      url,
      emailId: data.id
    }
  } catch (error: any) {
    console.log('SendPasswordResetError:', error.message)
    return {}
  }
}

type ResetPasswordParams = {
  password: string
  verificationCode: string
}

export const resetPassword = async ({
  verificationCode,
  password
}: ResetPasswordParams) => {
  const validCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.PasswordReset,
    expiresAt: { $gt: new Date() }
  })
  appAssert(validCode, NOT_FOUND, 'Неверный код для восстановления аккаунта')

  const updatedUser = await UserModel.findByIdAndUpdate(validCode.userID, {
    password: await hashValue(password)
  })
  appAssert(
    updatedUser,
    INTERNAL_SERVER_ERROR,
    'Мы не смогли восстановить пароль, попробуйте позже...'
  )

  await validCode.deleteOne()

  // delete all sessions
  await SessionModel.deleteMany({ userID: validCode.userID })

  return { user: updatedUser.omitPassword() }
}
