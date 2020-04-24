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

UserSchema.methods.toJson = () => ({
  id: this.user.id,
  email: this.user.email,
  created_at: this.user.createdAt,
  updated_at: this.user.updatedAt,
})

const User = mongoose.model('User', UserSchema)

module.exports = User
