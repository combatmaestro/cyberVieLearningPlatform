const mongoose = require('mongoose')

const questions = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
    default: 1,
  },
  question: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: String,
    required: true,
  },
  receivedMarks: {
    type: String,
  },
})

module.exports = mongoose.model('Questions', questions)
