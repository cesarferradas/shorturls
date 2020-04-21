const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const morgan = require('morgan')
const winston = require('winston')

const api = require('./routes/api')
const auth = require('./routes/auth')
const base = require('./routes/base')

const app = express()

const port = process.env.PORT

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
})

mongoose.connect(`mongodb://${process.env.DB_HOST}/shorturls`, {
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  authSource: 'admin',
  socketTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(() => logger.error('Could not connect to MongoDB'))

app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('combined'))

// Authentication
app.use((req, res, next) => {
  req.user = undefined
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
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

app.listen(port, () => {
  logger.info(`server running on port ${port}`)
})
