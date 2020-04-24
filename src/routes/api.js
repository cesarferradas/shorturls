const express = require('express')

const Link = require('../models/link')
const middleware = require('./middleware')

const api = express.Router()

api.route('/')
  .get((req, res) => {
    res.json({
      status: 200,
      message: 'shorturls API',
    })
  })

api.route('/links')
  .post(middleware.requireAuth, (req, res, next) => {
    // TODO handle shortid collisions
    const newLink = new Link(req.body)
    newLink.save((err, link) => {
      if (err) {
        next({
          status: 400,
          message: 'Could not create Link',
          error: err,
        })
      } else {
        res.json({
          status: 200,
          data: link.toJson(),
        })
      }
    })
  })

api.route('/links/:linkId')
  .get(middleware.requireAuth, (req, res, next) => {
    Link.findById(req.params.linkId, (err, link) => {
      if (err || !link) {
        next({
          status: 400,
          message: 'Not found',
          error: err,
        })
      } else {
        res.json({
          status: 200,
          data: link.toJson(),
        })
      }
    })
  })

api.route('*')
  .all((req, res, next) => {
    next({
      status: 400,
      message: `Cannot ${req.method} to ${req.url}`,
    })
  })

module.exports = api
