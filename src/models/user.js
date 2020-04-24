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
  },
}, { timestamps: true })

UserSchema.options.toJSON = {
  transform: (doc, ret) => ({
    email: ret.email,
    created_at: ret.createdAt,
    updated_at: ret.updatedAt,
  }),
}

const User = mongoose.model('User', UserSchema)

module.exports = User
