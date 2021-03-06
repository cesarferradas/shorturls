const bodyParser = require('body-parser')
const cors = require('cors')
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

const app = express()

mongoose.connect(`mongodb://${config.mongo.host}/${config.mongo.name}`, {
  authSource: 'admin',
  user: config.mongo.user,
  pass: config.mongo.password,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 5000,
}).catch((err) => logger.error(`Could not connect to MongoDB ${err}`))

app.use(bodyParser.json())
app.use(cors({ origin: config.allowedOrigins }))
app.use(helmet())
app.use(morgan(config.morgan.format))

app.use(middleware.loadUser)

app.use('/api/auth/', auth)
app.use('/api/', api)
app.use('/', base)

// TODO format unhandled errors
app.use(middleware.handleError)

module.exports = app
