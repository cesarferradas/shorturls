const winston = require('winston')

const port = process.env.PORT || 4000
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/urlshort'

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
})

module.exports = {
  databaseUrl,
  port,
  logger,
}
