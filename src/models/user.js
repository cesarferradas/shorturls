const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (val) => val.includes('@') && val.includes('.'),
      message: (props) => `${props.value} is not a valid email`,
    },
    unique: true,
  },
  passwordHash: {
    type: String,
    select: false,
  },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

const toJson = (user) => ({
  id: user.id,
  email: user.email,
  created_at: user.createdAt,
  updated_at: user.updatedAt,
})

module.exports = {
  User,
  toJson,
}
