const models = require('../models')

const create = (req, res) => {
  // TODO handle shortid collisions
  const newLink = new models.Link(req.body)
  newLink.save((err, link) => {
    if (err) {
      res.status(400).json({
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
  models.Link.findById(req.params.linkId, (err, link) => {
    if (err) {
      // TODO redirect to somewhere more meaningful
      res.status(400).json({
        status: 400,
        message: err.message,
      })
    } else {
      res.redirect(link.url)
    }
  })
}

module.exports = {
  create,
  redirect,
}
