const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, toJson } = require('../models/user')

const register = (req, res, next) => {
  const newUser = new User(req.body)
  newUser.password_hash = bcrypt.hashSync(req.body.password, 10)

  newUser.save((err, user) => {
    if (err) {
      next({
        status: 400,
        message: 'Could not register User',
        error: err,
      })
    } else {
      res.json({
        status: 200,
        data: toJson(user),
      })
    }
  })
}

const login = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user || !bcrypt.compareSync(req.body.password, user.password_hash)) {
      next({
        status: 401,
        message: 'No email and password combination found',
        error: err,
      })
    } else {
      res.json({
        status: 200,
        data: {
          token: jwt.sign({ _id: user.id }, process.env.JWT_SECRET),
        },
      })
    }
  })
}

const loginRequired = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next({
      status: 401,
      message: 'Unauthorized',
    })
  }
}

module.exports = {
  register,
  login,
  loginRequired,
}
