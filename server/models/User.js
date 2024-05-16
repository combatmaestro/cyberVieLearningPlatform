const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter the email'],
      unique: [true, 'Email Already Exists'],
    },
    avatar: {
      url: {
        type: String,
        default:
          'https://res.cloudinary.com/djgvt8uo4/image/upload/v1621674024/users/user_vprxe7.png',
      },
    },
    tier: {
      type: String,
      enum: ['free', 'paid'],
      default: 'free',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'teacher'],
      default: 'user',
    },
    marks: {
      type: Number,
      default: 0,
    },
    responses: {
      type: Map,
      of: mongoose.Schema.Types.ObjectId,
      default: {},
    },

    mobile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

//return jwt
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, "9D71AA85A1B9A", {
    expiresIn: '7d',
  })
}

module.exports = mongoose.model('User', userSchema)
