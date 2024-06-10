import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectToDatabase from './config/db'
import { FRONTEND_HOST, FRONTEND_PORT, SERVER_PORT } from './constants/env'

import { errorHandler } from './middlewares/errorHandlers'

import authRoutes from './routes/auth.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: `http://${FRONTEND_HOST}:${FRONTEND_PORT}`,
    credentials: true
  })
)
app.use(cookieParser())

app.get('/', (req, res, next) => {
  return res.status(200).json({
    status: 'online'
  })
})

app.use('/auth', authRoutes)

app.use(errorHandler)

app.listen(SERVER_PORT, async () => {
  console.log(`Server is running on port: ${SERVER_PORT}`)
  await connectToDatabase()
})
