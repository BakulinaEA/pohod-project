import { NODE_ENV } from '../constants/env'
import { CookieOptions, Response } from 'express'
import { fifteenMinutsFromNow, oneWeekFromNow } from './date'

const secure = NODE_ENV !== 'development'

const defaults: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutsFromNow(),
  path: '/auth/refresh'
})

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: oneWeekFromNow()
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
