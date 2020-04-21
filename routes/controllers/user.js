const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')

const register = (req, res) => {
  const newUser = new User(req.body)
  newUser.passwordHash = bcrypt.hashSync(req.body.password, 10)

  newUser.save((err, user) => {
    if (err) {
      res.status(400).json({
        status: 400,
        message: 'Could not register User',
      })
    } else {
      res.json({
        status: 200,
        data: { email: user.email },
      })
    }
  })
}

const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
      res.status(401).json({
        status: 401,
        message: 'No email and password combination found',
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
    res.status(401).json({
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
