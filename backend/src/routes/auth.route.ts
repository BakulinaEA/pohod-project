import { Router } from 'express'

import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler
} from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post('/register', registerHandler)

authRoutes.get('/refresh', refreshHandler)
authRoutes.get('/logout', logoutHandler)

export default authRoutes
