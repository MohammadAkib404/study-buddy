import quizModel from "../models/quizModel.js";

export const saveQuiz = async (req, res) => {
  try {
    const { title, mcqs } = req.body;
    const quiz = new quizModel({ userId: req.userId, title, mcqs });
    await quiz.save();
    res.status(201).json({ message: "MCQ saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTitles = async (req, res) => {
  try {
    const quizzes = await quizModel.find({}, { title: 1, _id: 0 });
    const titles = quizzes.map((el) => el.title);
    res.json(titles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch names" });
  }
};

export const getQuiz = async (req, res) => {
  const { title } = req.query;
  try {
    const quiz = await quizModel.find({ title: title }, { mcqs: 1, _id: 0 });
    const questions = quiz[0].mcqs;
    res.send(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};
