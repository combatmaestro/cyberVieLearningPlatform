const mongoose = require('mongoose');

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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  archive: {
    type: Boolean,
    required: true,
  },
  fee: {
    type: String,
    default: 'free',
  },
  discountedFee: {
    type: String,
    default: 'free',
  }

});

module.exports = mongoose.model('Batch', moduleSchema);
