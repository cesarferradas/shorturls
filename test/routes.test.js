const request = require('supertest')
const server = require('../src/server')

describe('Base route', () => {
  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })

  it('404 everything else', (done) => {
    request(server)
      .get('/invalidlinkid')
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
