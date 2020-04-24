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
  it('GET / returns 200', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })
  it('GET /foobar returns 404', (done) => {
    request(server)
      .get('/foobar')
      .expect(404, done)
  })
})

describe('API route', () => {
  it('GET / returns 200', (done) => {
    request(server)
      .get('/api')
      .expect(200, done)
  })
  it('GET /links/foo returns 401', (done) => {
    request(server)
      .get('/api/links/foo')
      .expect(401, done)
  })
  it('POST /links returns 401', (done) => {
    request(server)
      .post('/api/links')
      .expect(401, done)
  })
  it('GET /bar returns 400', (done) => {
    request(server)
      .get('/api/bar')
      .expect(400, done)
  })
})

describe('API auth route', () => {
  it('GET /auth/foo returns 400', (done) => {
    request(server)
      .get('/api/auth/foo')
      .expect(400, done)
  })
})
