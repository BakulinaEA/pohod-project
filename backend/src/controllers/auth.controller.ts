import catchErrors from '../utils/catchErrors'
import {
  loginUser,
  createAccount,
  refreshUserAccessToken,
  verifyEmail,
  sendPasswordResetEmail,
  resetPassword
} from '../services/auth.service'
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema
} from './auth.schemas'
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies
} from '../utils/cookies'
import { verifyToken } from '../utils/jwt'
import appAssert from '../utils/appAssert'
import SessionModel from '../models/session.model'

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent']
  })

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request)

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(201)
    .json({ user })
})

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent']
  })
  const { accessToken, refreshToken } = await loginUser(request)

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(200)
    .json({ message: 'Успешный логин' })
})

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined
  const { payload } = verifyToken(accessToken || '')

  if (payload) {
    // remove session from db
    await SessionModel.findByIdAndDelete(payload.sessionID)
  }

  // clear cookies
  return clearAuthCookies(res)
    .status(200)
    .json({ message: 'Вы вышли из аккаунта' })
})

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined
  appAssert(refreshToken, 401, 'Отсутствует Refresh Token')

  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken)
  if (newRefreshToken) {
    res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions())
  }
  return res
    .status(200)
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .json({ message: 'Access Token обновлён' })
})

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code)

  await verifyEmail(verificationCode)

  return res.status(200).json({ message: 'Ваша почта подтверждена' })
})

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email)

  await sendPasswordResetEmail(email)

  return res.status(200).json({
    message: 'Ссылка для восстановления пароля была отправлена на вашу почту'
  })
})

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body)

  await resetPassword(request)

  return clearAuthCookies(res)
    .status(200)
    .json({ message: 'Пароль был успешно изменён' })
})
