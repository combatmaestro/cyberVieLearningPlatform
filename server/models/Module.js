const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    default: 'This is description',
  },

  topic: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
  ],
  type: {
    type: String,
    enum: ['free', 'paid'],
    default: 'free',
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Module', moduleSchema)
