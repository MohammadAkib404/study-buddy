import quizModel from "../models/quizModel.js";
import axios from "axios";

const API_KEY = process.env.API_KEY;

const prompt = (text, topics = [], variator) => {
  return `
Chapter Text:
${text}

Target Topics:
${JSON.stringify(topics)}

Task:
Create ${variator?.mcqAmount} CBSE-style multiple-choice questions (MCQs) STRICTLY based on the provided Target Topics.
If the chapter text contains additional information, IGNORE anything not relevant to the Target Topics.

Rules:
1. Output ONLY a valid JSON object (no explanations, no markdown, no code fences).
2. Structure:
{
  "title": string,
  "questions": [
    {
      "question": string,
      "options": [${variator?.noOfOpt} strings],
      "ans": number
    }
  ]
}
3. Use double quotes only.
4. The output must start with '{' and end with '}'.
5. Vocabulary Level: ${variator?.vocabularyLevel}.
6. Difficulty Level: ${variator?.difficultyLevel}.
7. IMPORTANT: The correct answer’s index ("ans") must match the correct option.
   - First, determine the correct answer.
   - Then shuffle all options.
   - Finally, assign "ans" to the correct option’s new index.
8. Do NOT generate questions outside the Target Topics.
9. Ensure conceptual accuracy as per CBSE standards.

Example:
{
  "title": "Planets and the Solar System",
  "questions": [
    {
      "question": "Which planet is closest to the Sun?",
      "options": ["Mercury","Venus","Earth"],
      "ans": 0
    }
  ]
}
`;
};

export const generateMCQ = async (req, res) => {
  try {
    const { text, variator, topics } = req.body;

    if (!text || !topics) {
      return res.json({
        success: false,
        message: "Input text and toics are required!",
      });
    }

    const { data } = await axios.post(
      "https://api.a4f.co/v1/chat/completions",
      {
        model: "provider-2/gpt-oss-20b",
        messages: [{ role: "user", content: prompt(text, topics, variator) }],
        temperature: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = data.choices[0].message.content;
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      return res.json({ success: false, message: `Failed to parse content: ${error}` });
    }

    res.json({ success: true, content: parsedContent });

    // Saving Data
    const userId = req.userId;
    const title = parsedContent.title;
    const mcqs = parsedContent.questions;

    const quiz = quizModel({ userId, title, mcqs });
    await quiz.save();
  } catch (error) {
    res.json({
      success: false,
      message: `Failed to generate and/or save MCQs: ${error.message}`,
    });
  }
};

export const getTitles = async (req, res) => {
  const { id } = req.query;
  try {
    const quizInfo = await quizModel.find({}, { title: 1 });
    res.json({ success: true, content: quizInfo });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch names" });
  }
};

export const getQuiz = async (req, res) => {
  const { id } = req.query;
  try {
    const quiz = await quizModel.findOne({ _id: id, userId: req.userId }, { mcqs: 1, _id: 0 });
    const questions = quiz.questions;
    res.send(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};
