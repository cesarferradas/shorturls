const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')

const settings = require('./settings')
const { logger } = require('./settings')
const v1 = require('./routes/v1')

const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(morgan(':date[iso] :method :url :status :response-time ms'))

mongoose.Promise = global.Promise
mongoose.connect(settings.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.route('/')
  .get((req, res) => {
    res.send('urlshort API')
  })

app.route('/users')
  .post(v1.createUser)

app.route('/users/:uid')
  .get(v1.getUser)

app.route('/links')
  .post(v1.createLink)

app.route('/:code')
  .get(v1.redirectLink)

// TODO handle undefined HTTP methods as Content-Type JSON
app.listen(settings.port, () => {
  logger.info(`Server running on port ${settings.port}`)
})
