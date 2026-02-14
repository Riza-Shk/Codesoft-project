require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

connectDB();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


const authRoutes = require("./routes/authRoutes");
console.log("Auth routes file loaded");

const quizRoutes = require("./routes/quizRoutes");
app.use("/api/quizzes", quizRoutes);

const historyRoutes = require("./routes/historyRoutes");
app.use("/api/history", historyRoutes);


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Quiz Maker Backend is Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
