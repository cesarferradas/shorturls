const jwt = require('jsonwebtoken')
const redis = require('redis')

const config = require('../config')
const logger = require('../utils/logger')

const redisClient = redis.createClient({
  host: config.redis.host,
}).on('error', (err) => logger.error(`Redis error: ${err}`))

const handleError = (err, req, res, done) => {
  const status = err.status || 500
  const message = err.message || 'Server error'
  const error = err.error || ''

  if (status >= 500) {
    logger.error(`${message}: ${error}`)
  } else {
    logger.info(`${message}: ${error}`)
  }

  res.status(status).json({ message })
  done()
}

const loadUser = (req, res, next) => {
  req.user = undefined
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, config.jwt.secret, { issuer: config.jwt.issuer }, (err, decode) => {
      if (err) {
        next({
          status: 401,
          message: err.message,
        })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    next()
  }
}

const rateLimit = (req, res, next) => {
  redisClient.get(req.ip, (err, val) => {
    redisClient.setex(req.ip, config.rateLimitTTL, 1)
    if (val) {
      next({
        status: 429,
        message: 'Too many requests',
      })
    } else {
      next()
    }
  })
}

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

module.exports = {
  handleError,
  loadUser,
  requireAuth,
  rateLimit,
}
