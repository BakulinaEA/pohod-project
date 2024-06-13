import { Router } from 'express'

import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  sendPasswordResetHandler,
  verifyEmailHandler
} from '../controllers/auth.controller'

const authRoutes = Router()

// login actions
authRoutes.post('/login', loginHandler)
authRoutes.post('/register', registerHandler)

// session actions
authRoutes.get('/refresh', refreshHandler)
authRoutes.get('/logout', logoutHandler)

// email actions
authRoutes.get('/email/verify/:code', verifyEmailHandler)
authRoutes.post('/password/forgot', sendPasswordResetHandler)
authRoutes.post('/password/reset', resetPasswordHandler)
export default authRoutes
