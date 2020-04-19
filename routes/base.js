const express = require('express')

const links = require('../controllers/links')

const base = express.Router()

base.route('/')
  .get((req, res) => {
    res.send('Oops, there\'s nothing here')
  })

base.route('/:linkId')
  .get(links.redirect)

module.exports = base
