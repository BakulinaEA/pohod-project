import 'dotenv/config'
import express from 'express'
import connectToDatabase from './config/db'
import { SERVER_PORT } from './constants/env'
const app = express()

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'online'
  })
})

app.listen(SERVER_PORT, async () => {
  console.log(`Server is running on port: ${SERVER_PORT}`)
  await connectToDatabase()
})
