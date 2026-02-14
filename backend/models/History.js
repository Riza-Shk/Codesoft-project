const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quizTitle: String,
  score: Number,
  totalQuestions: Number,
  takenAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);
