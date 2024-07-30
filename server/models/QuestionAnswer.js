const mongoose = require('mongoose');

const QuestionAnswerSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    marksAllocated: {
      type: String,
      required: true,
    },
    answerStatus: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose.model('QuestionAnswer', QuestionAnswerSchema);