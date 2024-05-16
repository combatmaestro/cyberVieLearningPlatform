const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '<p>No Content Available<p>',
  },
  ctf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ctf',
    },
  ],
  complete: {
    type: Boolean,
    default: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Topic', topicSchema)
