import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const prompt = (text) => {
  return `
Chapter Text: ${text}

Generate 15–20 multiple-choice questions (MCQs) based on the above text, aligned with the CBSE school curriculum. 

⚠️ Important:
- Return ONLY a valid JSON array (no variable names, no code fences, no extra text).
- Each element must be an object with:
  {
    "question": "string",
    "options": ["opt1", "opt2", "opt3", "opt4"],
    "ans": number
  }
- "ans" must be a number (1–4).
- Each option must not exceed 60 characters (excluding spaces).
- Avoid repeating similar questions.
- Mix easy, moderate, and higher-order thinking.
- Total number of questions: 15 or 20.

Your output must be valid JSON that can be parsed directly with JSON.parse().
`;
};


const getMCQ = async (text) => {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: `${prompt(text)}` },
        ],
        temperature: 0.7,
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
    const reply = res.data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error("MCQ generation error:", error);
  }
};

export default getMCQ;
