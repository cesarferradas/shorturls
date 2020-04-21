const Link = require('../../models/link')

const create = (req, res, next) => {
  // TODO handle shortid collisions
  const newLink = new Link(req.body)
  newLink.save((err, link) => {
    if (err) {
      next({
        status: 400,
        message: err.message,
      })
    } else {
      res.json({
        status: 200,
        data: link,
      })
    }
  })
}

const redirect = (req, res) => {
  Link.findById(req.params.linkId, (err, link) => {
    // TODO redirect to somewhere more meaningful on error
    if (err || !link) {
      res.status(404).send('Not found')
    } else {
      res.redirect(link.url)
    }
  })
}

module.exports = {
  create,
  redirect,
}
