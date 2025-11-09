import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import quizModel from "./models/quizModel.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.post("/api/mcqs", async (req, res) => {
  try {
    const { title, mcqs } = req.body;
    const quiz = new quizModel({ title, mcqs });
    await quiz.save();
    res.status(201).json({ message: "MCQ saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
