require('express-async-errors')
const express = require('express')
const app = require('./app')
const cors = require('cors')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static('build'))
server.use(middleware.requestLogger)

server.use(app)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// run server
logger.info('connecting to', config.MONGODB_URI)
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    server.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

module.exports = server
