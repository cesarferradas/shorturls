const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const config = require('../config')
const User = require('../models/user')

const auth = express.Router()

auth.route('/register')
  .post((req, res, next) => {
    const newUser = new User(req.body)
    newUser.passwordHash = bcrypt.hashSync(req.body.password, config.saltRounds)

    newUser.save((err, user) => {
      if (err) {
        next({
          status: 400,
          message: 'Could not register User',
          error: err,
        })
      } else {
        res.status(201).json({
          status: 201,
          data: user,
        })
      }
    })
  })

auth.route('/login')
  .post((req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err || !user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
        next({
          status: 401,
          message: 'No email and password combination found',
          error: err,
        })
      } else {
        res.json({
          status: 200,
          data: {
            token: jwt.sign({ eml: user.email }, config.jwt.secret),
          },
        })
      }
    })
  })

module.exports = auth
