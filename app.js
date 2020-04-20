const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')

const api = require('./routes/api')
const base = require('./routes/base')
const logger = require('./utils/logger')

const app = express()

const port = process.env.PORT

mongoose.connect(`mongodb://${process.env.DB_HOST}/shorturls`, {
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  authSource: 'admin',
  socketTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => logger.error(err))

app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('tiny'))

app.use('/api/', api)
app.use('/', base)

app.listen(port, () => {
  logger.info(`server running on port ${port}`)
})
