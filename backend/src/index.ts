import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectToDatabase from './config/db'
import { APP_ORIGIN, SERVER_PORT } from './constants/env'

import { errorHandler } from './middlewares/errorHandlers'

import authRoutes from './routes/auth.route'
import authenticate from './middlewares/authenticate'
import userRoutes from './routes/user.route'
import sessionRoutes from './routes/session.route'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: `${APP_ORIGIN}`,
    credentials: true
  })
)
app.use(cookieParser())

// server online
app.get('/', (req, res, next) => {
  return res.status(200).json({
    status: 'online'
  })
})

// auth routes
app.use('/auth', authRoutes)

// protected routes
app.use('/user', authenticate, userRoutes)
app.use('/sessions', authenticate, sessionRoutes)

// error handler
app.use(errorHandler)

app.listen(SERVER_PORT, async () => {
  console.log(`Server is running on port: ${SERVER_PORT}`)
  await connectToDatabase()
})
