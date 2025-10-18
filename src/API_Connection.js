import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const prompt = (text) => {
  return `
Chapter Text: ${text}

Task: Generate only 15-20 multiple-choice questions (MCQs) from the text above. Align with CBSE curriculum.

RULES:
1. Return ONLY a valid JSON array. Do NOT include code fences, tags, explanations, or the word 'json'.
2. The response must be a valid JSON string that can be parsed directly by JSON.parse().
3. Each element of the array must be an object with three properties:
   - "question": a string containing the question text.
   - "options": an array of exactly 4 strings (the answer choices).
   - "ans": a number (0–3) representing the index of the correct option.
4. Use double quotes (") for all keys and string values.
5. Do NOT use single quotes (') anywhere.
6. Do NOT include backticks, markdown formatting, or extra text.
7. The output must start with '[' and end with ']'.
8. Return only valid JSON, without code block formatting, markdown, or explanations. Do not include json or anywhere.

RESPONSE FORMAT (strictly follow this pattern):
[
  {
    "question": "What is the first planet in the solar system?",
    "options": ["Mercury", "Earth", "Venus", "Mars"],
    "ans": 0
  },
  {
    "question": "Which one is an aquatic animal?",
    "options": ["Lion", "Tiger", "Bear", "Whale"],
    "ans": 3
  }
]
`;
};





const getMCQ = async (text) => {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-v3.2-exp",
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
    console.log(res)
    return reply;
  } catch (error) {
    console.error("MCQ generation error:", error);
  }
};

export default getMCQ;
