const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();

// CREATE QUIZ
router.post("/create", async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ message: "Invalid quiz data" });
  }

  try {
    const quiz = await Quiz.create({ title, questions });
    res.status(201).json({
      message: "Quiz created successfully",
      quizId: quiz._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL QUIZZES
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("title");
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET SINGLE QUIZ
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (error) {
    res.status(404).json({ message: "Quiz not found" });
  }
});
// DELETE QUIZ
router.delete("/:id", async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
