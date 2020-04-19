const port = process.env.PORT || 4000
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/shorturls'

module.exports = {
  databaseUrl,
  port,
}
