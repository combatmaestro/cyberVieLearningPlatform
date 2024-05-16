const mongoose = require('mongoose')

const responsesSchema = new mongoose.Schema({
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ctf',
    },
  ],
})

module.exports = mongoose.model('Responses', responsesSchema)
