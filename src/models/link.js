const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

const config = require('../config')

const LinkSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(config.linkSize),
  },
  count: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (val) => /^https?:\/\/(www)?[^ "]+\.+[^ "]+$/.test(val),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
}, { timestamps: true })

LinkSchema.options.toJSON = {
  transform: (doc, ret) => ({
    code: ret._id,
    count: ret.count,
    url: ret.url,
    created_at: ret.createdAt,
    updated_at: ret.updatedAt,
  }),
}

const Link = mongoose.model('Link', LinkSchema)

module.exports = Link
