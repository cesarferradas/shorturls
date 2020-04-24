const Link = require('../models/link')

const create = (req, res, next) => {
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
}

const retrieve = (req, res, next) => {
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
}

const redirect = (req, res) => {
  Link.findById(req.params.linkId, (err, link) => {
    // TODO redirect to somewhere more meaningful
    if (err || !link) {
      res.status(404).send('Not found')
    } else {
      res.redirect(link.url)
    }
  })
}

module.exports = {
  create,
  retrieve,
  redirect,
}
