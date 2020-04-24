const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const morgan = require('morgan')

const api = require('./routes/api')
const auth = require('./routes/auth')
const base = require('./routes/base')
const config = require('./config')
const logger = require('./utils/logger')

const app = express()

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, {
  authSource: 'admin',
  user: config.db.user,
  pass: config.db.password,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 5000,
}).catch((err) => logger.error(`Could not connect to MongoDB ${err}`))

app.use(bodyParser.json())
app.use(helmet())
app.use(morgan(config.morgan.format))

app.use((req, res, next) => {
  req.user = undefined
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.jwt.secret, (err, decode) => {
      if (err || !decode) {
        next()
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    next()
  }
})

app.use('/api/auth/', auth)
app.use('/api/', api)
app.use('/', base)

app.use((err, req, res, done) => {
  const status = err.status || 500
  const message = err.message || 'Server error'
  const error = err.error || ''

  if (status >= 500) {
    logger.error(`${message}: ${error}`)
  } else {
    logger.info(`${message}: ${error}`)
  }

  res.status(status).json({ status, message })
  done()
})

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
})

module.exports = app
