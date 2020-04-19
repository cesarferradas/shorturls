const models = require('../models')
const logger = require('../utils/logger')


const create = (req, res) => {
  // TODO handle shortid collisions
  const newLink = new models.Link(req.body)
  newLink.save((err, link) => {
    if (err) {
      logger.error(`could not create Link: ${err}`)
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
