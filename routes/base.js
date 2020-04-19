const express = require('express')

const link = require('../controllers/link')

const base = express.Router()

base.route('/')
  .get((req, res) => {
    res.send('Oops, there\'s nothing here')
  })

base.route('/:linkId')
  .get(link.redirect)

module.exports = base
