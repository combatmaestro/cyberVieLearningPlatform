const mongoose = require('mongoose')

const ctfSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
    default: 1,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Ctf', ctfSchema)
