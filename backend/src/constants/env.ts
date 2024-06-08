const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue

  if (value === undefined) {
    throw new Error(`Missing .env variable ${key}`)
  }

  return value
}

// SERVER INIT
export const SERVER_PORT =
  process.env.SERVER_PORT || getEnv('SERVER_PORT', '3000')

// MONGO INIT
const MONGO_USERNAME =
  process.env.MONGO_INITDB_ROOT_USERNAME ||
  getEnv('MONGO_INITDB_ROOT_USERNAME', 'admin')
const MONGO_PASSWORD =
  process.env.MONGO_INITDB_ROOT_PASSWORD ||
  getEnv('MONGO_INITDB_ROOT_PASSWORD', 'password')
const MONGO_HOST =
  process.env.DATABASE_HOST || getEnv('DATABASE_HOST', 'localhost')
const MONGO_PORT = process.env.DATABASE_PORT || getEnv('DATABASE_PORT', '27017')

export const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`
