import { Router } from 'express'

import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  verifyEmailHandler
} from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post('/register', registerHandler)

authRoutes.get('/refresh', refreshHandler)
authRoutes.get('/logout', logoutHandler)

authRoutes.get('/email/verify/:code', verifyEmailHandler)

export default authRoutes
