const mongoose = require("mongoose");

const assessment = new mongoose.Schema({
  moduleId: {
    type: String,
    required: true,
  },
  Questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions",
    },
  ],
});

module.exports = mongoose.model("Assessment", assessment);
