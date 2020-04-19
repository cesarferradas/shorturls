const mongoose = require('mongoose')
const shortid = require('shortid')

const LinkSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: 'Field url is required',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Link = mongoose.model('Link', LinkSchema)

module.exports = Link
