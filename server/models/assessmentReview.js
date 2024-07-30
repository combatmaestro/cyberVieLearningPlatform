const mongoose = require('mongoose');

// const QuestionAnswerSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: true,
//   },
//   answer: {
//     type: String,
//     required: true,
//   },
//   marksAllocated: {
//     type: String,
//     required: true,
//   },
//   answerStatus: {
//     type: String,
//     required: true,
//   },
// });


const AssessmentReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submittedBy: {
    type: String,
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  teacherAllocated: {
    type: String,
    required: true,
  },
  questionAndAnswers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionAnswer',
    required: true,
  }],
  assessmentStatus:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('AssessmentReview', AssessmentReviewSchema);
