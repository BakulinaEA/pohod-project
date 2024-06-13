import { RequestHandler } from 'express'
import appAssert from '../utils/appAssert'
import AppErrorCode from '../constants/AppErrorCode'
import { UNAUTHORIZED } from '../constants/http'
import { verifyToken } from '../utils/jwt'

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined
  appAssert(
    accessToken,
    UNAUTHORIZED,
    'Not authorized',
    AppErrorCode.InvalidAccessToken
  )

  const { error, payload } = verifyToken(accessToken)
  appAssert(
    payload,
    UNAUTHORIZED,
    error === 'jwt expired' ? 'Время Token-а истекло' : 'Неверный token',
    AppErrorCode.InvalidAccessToken
  )

  req.userID = payload.userID
  req.sessionID = payload.sessionID
  next()
}

export default authenticate
