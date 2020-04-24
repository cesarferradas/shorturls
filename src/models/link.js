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

LinkSchema.methods.toJson = () => ({
  id: this.link.id,
  url: this.link.url,
  created_at: this.link.createdAt,
  updated_at: this.link.updatedAt,
})

const Link = mongoose.model('Link', LinkSchema)

module.exports = Link
