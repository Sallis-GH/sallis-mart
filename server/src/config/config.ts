import dotenv from 'dotenv'

dotenv.config()

const MONGO_USER = process.env.MONGO_USER || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@sallis-mart.vt05nli.mongodb.net/`

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: PORT
  }
}