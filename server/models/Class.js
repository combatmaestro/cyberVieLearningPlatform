const mongoose = require('mongoose');

const ScheduledClassSchema = new mongoose.Schema({
  batchId: {
    type:String,
    // ref: 'Batch',
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Class', ScheduledClassSchema);
