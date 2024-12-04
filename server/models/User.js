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
    firstName:{
      type: String,
      required: false,
    },
    lastName:{
      type: String,
      required: false
    },
    userName:{
      type: String,
      required: false
    },
    password:{
      type: String,
      required: false
    },
    nuveProStatus:{
      type: String,
      required: false
    },
    subscriptionId:{
      type: String,
      required: false
    },
    labCreated:{
      type:Boolean,
      required: false
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
      enum: ['user', 'admin', 'teacher','counsellor'],
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
    certificateGenerated: {
      type: Boolean,
      default: false, // Initially set to false
    },
    certificateDate: {
      type: Date,
      required: false, // This will store the date the certificate was generated
    },
    certificateRefId:{
      type: String,
     required: false,
    }
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
