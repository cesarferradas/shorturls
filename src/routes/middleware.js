const jwt = require('jsonwebtoken')

const config = require('../config')
const logger = require('../utils/logger')

const requireAuth = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next({
      status: 401,
      message: 'Unauthorized',
    })
  }
}

const loadUser = (req, res, next) => {
  req.user = undefined
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.jwt.secret, (err, decode) => {
      if (err || !decode) {
        next()
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    next()
  }
}

const handleError = (err, req, res, done) => {
  const status = err.status || 500
  const message = err.message || 'Server error'
  const error = err.error || ''

  if (status >= 500) {
    logger.error(`${message}: ${error}`)
  } else {
    logger.info(`${message}: ${error}`)
  }

  res.status(status).json({ status, message })
  done()
}

module.exports = {
  loadUser,
  requireAuth,
  handleError,
}
