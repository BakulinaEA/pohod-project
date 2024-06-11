import { Router } from 'express'

import {
  loginHandler,
  logoutHandler,
  registerHandler
} from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post('/register', registerHandler)
authRoutes.get('/logout', logoutHandler)

export default authRoutes
