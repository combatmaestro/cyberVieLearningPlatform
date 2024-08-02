const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
  ctf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ctf',
    },
  ],
  subTopics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubTopic',
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
