import catchErrors from '../utils/catchErrors'
import { loginUser, createAccount } from '../services/auth.service'
import { loginSchema, registerSchema } from './auth.schemas'
import { setAuthCookies } from '../utils/cookies'

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
