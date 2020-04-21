const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User