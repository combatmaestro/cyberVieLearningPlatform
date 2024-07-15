const mongoose = require('mongoose');

const LabSchema = new mongoose.Schema({
  labName: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  responseNuvePro: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Lab', LabSchema);
