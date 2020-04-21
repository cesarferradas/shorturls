const express = require('express')

const link = require('./controllers/link')
const user = require('./controllers/user')

const api = express.Router()

api.route('/')
  .get((req, res) => {
    res.json({
      status: 200,
      message: 'shorturls API',
    })
  })

api.route('/links')
  .post(user.loginRequired, link.create)

api.route('*')
  .all((req, res) => {
    res.status(400).json({
      status: 400,
      message: `Cannot ${req.method} to ${req.url}`,
    })
  })

module.exports = api
