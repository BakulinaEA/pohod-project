const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue

  if (value === undefined) {
    throw new Error(`Missing .env variable ${key}`)
  }

  return value
}

// DEV ENV INIT
export const NODE_ENV =
  process.env.NODE_ENV || getEnv('NODE_ENV', 'development')

// SERVER INIT
export const SERVER_PORT =
  process.env.SERVER_PORT || getEnv('SERVER_PORT', '3000')

// JWT SECRETS DATA
export const JWT_SECRET =
  process.env.JWT_SECRET || getEnv('JWT_SECRET', 'SOMESECRETS')
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || getEnv('JWT_REFRESH_SECRET', 'SOMESECRETS')

// MONGO INIT
const MONGO_USERNAME =
  process.env.MONGO_INITDB_ROOT_USERNAME ||
  getEnv('MONGO_INITDB_ROOT_USERNAME', 'admin')
const MONGO_PASSWORD =
  process.env.MONGO_INITDB_ROOT_PASSWORD ||
  getEnv('MONGO_INITDB_ROOT_PASSWORD', 'password')
const MONGO_HOST = process.env.MONGO_HOST || getEnv('MONGO_HOST', 'localhost')
const MONGO_PORT = process.env.MONGO_PORT || getEnv('MONGO_PORT', '27017')

export const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`

// FRONTEND INIT
export const FRONTEND_HOST =
  process.env.FRONTEND_HOST || getEnv('FRONTEND_HOST', 'localhost')
export const FRONTEND_PORT =
  process.env.FRONTEND_PORT || getEnv('FRONTEND_PORT', '5173')
