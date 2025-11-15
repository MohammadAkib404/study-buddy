import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import Quiz from "./models/quizModel.js";
import connectDB from "./config/connection.js";

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: allowedOrigins}));

app.post("/api/mcqs", async (req, res) => {
  try {
    const { title, mcqs } = req.body;
    const quiz = new Quiz({ title, mcqs });
    await quiz.save();
    res.status(201).json({ message: "MCQ saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/names", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, { title: 1, _id: 0 });
    const titles = quizzes.map((el) => el.title);
    res.json(titles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch names" });
  }
});

app.get('/api/mcq', async (req, res) => {
  const {title} = req.query;
  try {
    const quiz = await Quiz.find({
      title: title,
    }, {mcqs: 1, _id: 0});
    const questions = quiz[0].mcqs;
    res.send(questions);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch questions"});
  }
})

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
