const mongoose = require('mongoose');
const formDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,  // Ensure phoneNumber is unique
    trim: true,
  },
  organization: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    enum: ['free', 'paid'],
    default: 'free',
  },
}, {
  timestamps: true,
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
