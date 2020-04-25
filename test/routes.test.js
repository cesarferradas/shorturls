const request = require('supertest')
const mongoose = require('mongoose')

const config = require('./config')
const server = require('../src/server')
const Link = require('../src/models/link')
const User = require('../src/models/user')

before((done) => {
  mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, done)
  // TODO seed DB
})

after((done) => {
  Link.deleteMany({}, () => {
    User.deleteMany({}, done)
  })
})

describe('Base root', () => {
  it('returns success', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })
})

describe('Base redirect', () => {
  xit('returns a redirect to a long url', (done) => {
    // TODO mock database call to find this Link
    request(server)
      .get('dY-Z2vk4X')
      .expect(404, done)
  })
  it('returns a 404 if link not found', (done) => {
    request(server)
      .get('/foobar')
      .expect(404, done)
  })
})

describe('/api', () => {
  it('returns success', (done) => {
    request(server)
      .get('/api')
      .expect(200, done)
  })
})

describe('/api/links', () => {
  it('requires authentication', (done) => {
    request(server)
      .post('/api/links')
      .expect(401, done)
  })
  xit('creates a link', (done) => {
    // TODO send valid JWT to prevent 401
    request(server)
      .post('/api/links')
      .expect(201, done)
  })
})

describe('/api/links/:linkId', () => {
  it('requires authentication', (done) => {
    request(server)
      .get('/api/links/dY-Z2vk4X')
      .expect(401, done)
  })
  xit('gets a link', (done) => {
    // TODO send valid JWT to prevent 401
    request(server)
      .get('/api/links/dY-Z2vk4X')
      .expect(200, done)
  })
})

describe('api/auth/register', () => {
  it('creates a user', (done) => {
    request(server)
      .post('/api/auth/register')
      .send({
        email: 'user1@shorturls.com',
        password: 'password',
      })
      .expect(201, done)
  })
  xit('fails if user already exists', (done) => {
    request(server)
      .post('/api/auth/register')
      .send({
        email: 'user@shorturls.com',
        password: 'password',
      })
      .expect(400, done)
  })
})

describe('api/auth/login', () => {
  xit('returns a JWT', (done) => {
    request(server)
      .post('/api/auth/login')
      .send({
        email: 'user@shorturls.com',
        password: 'password',
      })
      .expect(200, done)
  })
  xit('returns unauthorized if credentials are incorrect', (done) => {
    request(server)
      .post('/api/auth/login')
      .send({
        email: 'user@shorturls.com',
        password: 'wrongpassword',
      })
      .expect(401, done)
  })
})
