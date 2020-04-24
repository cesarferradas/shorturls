const express = require('express')

const Link = require('../models/link')

const base = express.Router()

base.route('/')
  .get((req, res) => { res.send('Oops, there\'s nothing here') })

base.route('/:linkId')
  .get((req, res) => {
    Link.findById(req.params.linkId, (err, link) => {
      // TODO redirect to somewhere more meaningful
      if (err || !link) {
        res.status(404).send('Not found')
      } else {
        res.redirect(link.url)
      }
    })
  })

module.exports = base
