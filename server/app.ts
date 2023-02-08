import express, { Express, Request, Response } from 'express'
import http from 'http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { config } from './src/config/config'
import Logging from './src/library/logging'
import userRoutes from './src/routes/api/users/User'

dotenv.config()

const app: Express = express()

mongoose.set('strictQuery', false)
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to mongoDB')
    startServer()
  })
  .catch(error => {
    Logging.error('Unable to connect')
    Logging.error(error)
  })

const startServer = () => {
  app.use((req, res, next) => {
    Logging.info(`Incoming -> Method: [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
      Logging.info(`Incoming -> Method: [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
    })
    next()
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }
    next()
  })

  /** ROUTES */
  app.use('/api/users', userRoutes)

  /** Healthcheck */
  app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }))

  /** Error Handling */
  app.use((req, res, next) => {
    const error = new Error('Not Found [error handling]')
    Logging.error(error)

    return res.status(404).json({message: `${error.message}`})
  })

  app.listen(config.server.port, () => Logging.info(`⚡Server is running on port ${config.server.port}⚡`))
}