const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: 'Field email is required',
    unique: true,
  },
  hashedPassword: {
    type: String,
  },
  links: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
