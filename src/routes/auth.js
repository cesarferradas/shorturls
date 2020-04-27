const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const config = require('../config')
const middleware = require('./middleware')
const User = require('../models/user')

const auth = express.Router()

auth.use(middleware.rateLimit)

auth.route('/register')
  .post((req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      next({
        status: 400,
        message: 'Email and password required',
      })
    }
    const newUser = new User()
    newUser.email = email
    newUser.passwordHash = bcrypt.hashSync(req.body.password, config.saltRounds)

    newUser.save((err, user) => {
      if (err) {
        next({
          message: 'Could not register User',
          error: err,
        })
      } else {
        res.status(201).json(user)
      }
    })
  })

auth.route('/login')
  .post((req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        next({
          message: 'Could not log in, please try again',
          error: err,
        })
      } else if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
        next({
          status: 401,
          message: 'Email and password combination not found',
        })
      } else {
        const token = jwt.sign(
          { eml: user.email },
          config.jwt.secret,
          {
            expiresIn: config.jwt.expires,
            subject: user.id,
            issuer: config.jwt.issuer,
          },
        )
        res.json({ token })
      }
    })
  })

module.exports = auth
