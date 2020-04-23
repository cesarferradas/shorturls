const express = require('express')

const user = require('../controllers/user')

const auth = express.Router()

auth.route('/register')
  .post(user.register)

auth.route('/login')
  .post(user.login)

module.exports = auth
