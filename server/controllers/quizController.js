import quizModel from "../models/quizModel.js";
import axios from "axios";

const API_KEY = process.env.OPENROUTER_API_KEY;

const prompt = (text, variator) => {
  return `
Chapter Text: ${text}

Task: Create ${
    variator.mcqAmount
  } CBSE-style multiple-choice questions (MCQs) from the text.

Rules:
1. Output ONLY a valid JSON array (no text, markdown, or code fences).
2. title: A proper title for the quiz generated.
3. Each mcq = {
   "question": string,
   "options": [${variator.noOfOpt} strings],
   "ans": (0 - ${variator.noOfOpt - 1})
}
4. Use double quotes only.
5. The output must start with '{' and end with '}'.
6. Vocabulary Level: ${variator.vocabularyLevel}.
7. Difficulty Level: ${variator.difficultyLevel}.
8. IMPORTANT: The correct answer’s *position* ("ans") should vary randomly.
   - First, decide the correct answer.
   - Then, shuffle the options so the correct one lands at a random index.
   - Finally, set "ans" to that new index (not a random number).
9. Never assign "ans" randomly without ensuring it points to the correct option.

Example:
{
  "title": "Planets and the Solar System",
  "questions": [
    {
      "question": "What is the first planet in the solar system?",
      "options": ["Mercury", "Earth", "Venus"],
      "ans": 0
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "options": ["Mars", "Jupiter", "Saturn"],
      "ans": 0
    }
  ]
}
`;
};

export const generateMCQ = async (req, res) => {
  try {
    const { text, variator } = req.body;

    if (!text || !variator) {
      return res.json({
        success: false,
        message: "Input text and Options is required!",
      });
    }

    const { data } = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-v3.2-exp",
        messages: [{ role: "user", content: `${prompt(text, variator)}` }],
        max_tokens: 400,
        temperature: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "MCQ AI",
        },
      }
    );

    const content = data.choices[0].message.content;
    res.json({ success: true, data: content });
  } catch (error) {
    res.json({
      success: false,
      message: `Failed to generate MCQs: ${error.message}`,
    });
  }
};

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
    const quizzes = await quizModel.find(
      { userId: req.userId },
      { title: 1, _id: 0 }
    );
    const titles = quizzes.map((el) => el.title);
    res.json(titles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch names" });
  }
};

export const getQuiz = async (req, res) => {
  const { title } = req.query;
  try {
    const quiz = await quizModel.find(
      { userId: req.userId, title: title },
      { mcqs: 1, _id: 0 }
    );
    const questions = quiz[0].mcqs;
    res.send(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};
