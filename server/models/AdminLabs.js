const mongoose = require('mongoose')

const AdminLabs = new mongoose.Schema({
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
})

module.exports = mongoose.model('AdminLabs', moduleSchema)