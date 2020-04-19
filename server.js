const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')

const settings = require('./settings')
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
    res.send('shorturl API')
  })

app.route('/links')
  .post(v1.createLink)

app.route('/:code')
  .get(v1.redirectLink)

app.listen(settings.port)
