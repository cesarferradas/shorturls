const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')

const api = require('./routes/api')
const auth = require('./routes/auth')
const base = require('./routes/base')
const config = require('./config')
const logger = require('./utils/logger')
const middleware = require('./routes/middleware')

const server = express()

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, {
  authSource: 'admin',
  user: config.db.user,
  pass: config.db.password,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 5000,
}).catch((err) => logger.error(`Could not connect to MongoDB ${err}`))

server.use(bodyParser.json())
server.use(helmet())
server.use(morgan(config.morgan.format))

server.use(middleware.loadUser)
// TODO rate limit using middleware and redis here
// base.use(middleware.rateLimit)

server.use('/api/auth/', auth)
server.use('/api/', api)
server.use('/', base)

server.use(middleware.handleError)

server.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
})

module.exports = server
