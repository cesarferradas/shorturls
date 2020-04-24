const config = module.exports

config.env = process.env.NODE_ENV

config.db = {
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME,
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  password: process.env.MONGO_INITDB_ROOT_PASSWORD,
}

config.morgan = {
  format: 'tiny',
}

config.winston = {
  level: 'debug',
}

config.jwt = {
  secret: process.env.JWT_SECRET,
}

config.port = process.env.PORT || 3000

config.saltRounds = 10

if (config.env === 'production') {
  config.morgan.format = 'combined'
  config.winston.level = 'info'
}
