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
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  currentSalary: {
    type: Number,
    required: true,
  },
  tier: {
    type: String,
    enum: ['free', 'paid'],
    default: 'free',
  },
  expectedSalary: {
    type: Number,
    required: true,
  },
  howFoundUs:{
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
