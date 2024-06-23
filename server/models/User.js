const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    batch:{
      type: String,
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
    education: {
      type: String,
      // maxlength: [40, 'Education must be less than or equal to 40 characters'],
    },
    workingDomain: {
      type: String,
      // maxlength: [40, 'Working Domain must be less than or equal to 40 characters'],
    },
    experience: {
      type: String,
      // maxlength: [40, 'Experience must be less than or equal to 40 characters'],
    },
    currentSalary: {
      type: Number,
    },
    expectedSalary: {
      type: Number,
    },
    preferredLocation: {
      type: String,
      // maxlength: [40, 'Preferred Location must be less than or equal to 40 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Return JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, '9D71AA85A1B9A', {
    expiresIn: '7d',
  });
};

module.exports = mongoose.model('User', userSchema);
