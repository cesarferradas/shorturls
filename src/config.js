const config = {}

config.env = process.env.NODE_ENV

config.port = process.env.PORT || 3000

config.db = {
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME,
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  password: process.env.MONGO_INITDB_ROOT_PASSWORD,
}

config.logger = {
  level: 'debug',
}

config.jwt = {
  secret: process.env.JWT_SECRET,
}

if (config.env === 'test') {
  // eslint-disable-next-line global-require
  const testConfig = require('./config.test.js')
  Object.assign(config, { ...testConfig })
} else if (config.env === 'production') {
  config.logger.level = 'info'
}

module.exports = config
