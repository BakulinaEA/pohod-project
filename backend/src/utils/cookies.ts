import { NODE_ENV } from '../constants/env'
import { CookieOptions, Response } from 'express'
import { fifteenMinutsFromNow, oneWeekFromNow } from './date'

const secure = NODE_ENV !== 'development'
export const REFRESH_PATH = '/auth/refresh'

const defaults: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutsFromNow()
})

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: oneWeekFromNow(),
  path: REFRESH_PATH
})

type Params = {
  res: Response
  accessToken: string
  refreshToken: string
}

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions())

export const clearAuthCookies = (res: Response) =>
  res.clearCookie('accessToken').clearCookie('refreshToken', {
    path: REFRESH_PATH
  })
