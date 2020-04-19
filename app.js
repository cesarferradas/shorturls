const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const winston = require('winston')

const api = require('./routes/api')
const base = require('./routes/base')

const app = express()

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/shorturls'
const port = process.env.PORT || 4000

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
})

mongoose.Promise = global.Promise
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(bodyParser.json())
app.use(helmet())
app.use(morgan(':date[web] :method :url :status :response-time ms'))

app.use('/api/', api)
app.use('/', base)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
