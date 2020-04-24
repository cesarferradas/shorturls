const request = require('supertest')
const mongoose = require('mongoose')

const config = require('./config')
const server = require('../src/server')

before((done) => {
  mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, done)
})

describe('Base route', () => {
  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })
  it('404 everything else', (done) => {
    request(server)
      .get('/foobar')
      .expect(404, done)
  })
})

describe('API route', () => {
  it('responds to /', (done) => {
    request(server)
      .get('/api')
      .expect(200, done)
  })
})
