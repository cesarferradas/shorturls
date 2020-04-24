const mongoose = require('mongoose')
const shortid = require('shortid')

const LinkSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
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
    url: ret.url,
    created_at: ret.createdAt,
    updated_at: ret.updatedAt,
  }),
}

const Link = mongoose.model('Link', LinkSchema)

module.exports = Link
