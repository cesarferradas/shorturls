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

const Link = mongoose.model('Link', LinkSchema)

const toJson = (link) => ({
  id: link.id,
  url: link.url,
  created_at: link.createdAt,
  updated_at: link.updatedAt,
})

module.exports = {
  Link,
  toJson,
}
