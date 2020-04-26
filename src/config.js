const config = module.exports

config.env = process.env.NODE_ENV

config.jwt = {
  secret: process.env.JWT_SECRET,
}

config.linkSize = 7

config.mongo = {
  host: process.env.MONGO_HOST,
  name: process.env.MONGO_NAME || 'shorturls',
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  password: process.env.MONGO_INITDB_ROOT_PASSWORD,
}

config.morgan = {
  format: 'tiny',
}

config.port = process.env.PORT || 3000

config.rateLimitTTL = 1

config.redis = {
  host: process.env.REDIS_HOST,
}

config.saltRounds = 10

config.winston = {
  level: 'debug',
}

if (config.env === 'production') {
  config.morgan.format = 'combined'
  config.winston.level = 'info'
}
