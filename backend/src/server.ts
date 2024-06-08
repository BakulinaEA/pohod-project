import mongoose, { Collection, connect } from 'mongoose'
import http from 'http'

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD
const MONGO_HOST = process.env.DATABASE_HOST
const MONGO_PORT = process.env.DATABASE_PORT
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME

const SERVER_HOST = process.env.SERVER_HOST
const SERVER_PORT = process.env.SERVER_PORT

const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.error('Error by connecting to MongoDB:', err))
