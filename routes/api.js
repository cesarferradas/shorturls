const express = require('express')

const link = require('../controllers/link')

const api = express.Router()

api.route('/')
  .get((req, res) => {
    res.json({
      status: 200,
      message: 'shorturls API',
    })
  })

api.route('/links')
  .post(link.create)

api.route('*')
  .all((req, res) => {
    res.status(400).json({
      status: 400,
      message: `Cannot ${req.method} to ${req.url}`,
    })
  })

module.exports = api
