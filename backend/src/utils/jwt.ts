import jwt, { SignOptions } from 'jsonwebtoken'
import { SessionDocument } from '../models/session.model'
import { UserDocument } from '../models/user.model'
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env'

export type RefreshTokenPayload = {
  sessionID: SessionDocument['_id']
}

export type AccessTokenPayload = {
  userID: UserDocument['_id']
  sessionID: SessionDocument['_id']
}

type SignOptionsAndSecret = SignOptions & {
  secret: string
}

const defaults: SignOptions = {
  audience: ['user']
}

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '15m',
  secret: JWT_SECRET
}

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '7d',
  secret: JWT_REFRESH_SECRET
}

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions
  return jwt.sign(payload, secret, { ...defaults, ...signOpts })
}
