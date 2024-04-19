// app.js

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const quizData = require("./quizData.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint to get quiz questions
app.get("/quiz", (req, res) => {
  res.json(quizData);
});

// Endpoint to submit answers and calculate score
app.post("/submit", (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;
  const feedback = [];

  quizData.forEach((question, index) => {
    if (userAnswers[index] === question.correctIndex) {
      score++;
      feedback.push({ index: index, correct: true });
    } else {
      feedback.push({
        index: index,
        correct: false,
        correctIndex: question.correctIndex,
      });
    }
  });

  res.json({ score: score, feedback: feedback });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
