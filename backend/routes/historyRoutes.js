const express = require("express");
const History = require("../models/History");

const router = express.Router();

// SAVE QUIZ RESULT
router.post("/save", async (req, res) => {
  const { userId, quizId, quizTitle, score, totalQuestions } = req.body;

  if (!userId || !quizId) {
    return res.status(400).json({ message: "Invalid history data" });
  }

  try {
    await History.create({
      userId,
      quizId,
      quizTitle,
      score,
      totalQuestions,
    });

    res.status(201).json({ message: "History saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET USER HISTORY
router.get("/:userId", async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId })
      .sort({ takenAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
