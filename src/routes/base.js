const express = require('express')

const Link = require('../models/link')

const base = express.Router()

base.route('/')
  .get((req, res) => {
    // TODO render React homepage
    res.send('shorturls')
  })

base.route('/:linkId')
  .get((req, res) => {
    Link.findById(req.params.linkId, (err, link) => {
      if (err || !link) {
        // TODO render error page
        res.send('Not found')
      } else {
        link.count += 1
        link.save()
        res.redirect(link.url)
      }
    })
  })

module.exports = base
