const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SubTopic', subtopicSchema);
