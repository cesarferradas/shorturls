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
    required: 'url is required',
    validate: {
      validator: (val) => /^https?:\/\/(www)?[^ "]+\.+[^ "]+$/.test(val),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
})

const Link = mongoose.model('Link', LinkSchema)

module.exports = Link
