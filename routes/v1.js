const models = require('../models')

const createUser = (req, res) => {
  // TODO password hashing
  const newUser = new models.User(req.body)
  newUser.save((err, user) => {
    if (err) {
      res.status(400).json(err)
    }
    // TODO function to format standard JSON response
    res.json(user)
  })
}

const getUser = (req, res) => {
  res.status(200).end()
}

const createLink = (req, res) => {
  // TODO handle url validation
  // TODO handle shortid collisions
  const newLink = new models.Link(req.body)
  newLink.save((err, link) => {
    if (err) {
      res.status(400).json(err)
    }
    res.json(link)
  })
}

const redirectLink = (req, res) => {
  models.Link.findById(req.params.code, (err, link) => {
    if (err) {
      // TODO redirect to somewhere more meaningful
      res.status(400).json(err)
    }
    res.redirect(link.url)
  })
}


module.exports = {
  createUser,
  getUser,
  createLink,
  redirectLink,
}
