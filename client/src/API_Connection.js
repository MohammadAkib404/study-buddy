import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const prompt = (text, variator) => {
  return `
Chapter Text: ${text}

Task: Create ${
    variator.mcqAmount
  } CBSE-style multiple-choice questions (MCQs) from the text.

Rules:
1. Output ONLY a valid JSON array (no text, markdown, or code fences).
2. Each item = {
   "question": string,
   "options": [${variator.noOfOpt} strings],
   "ans": (0 - ${variator.noOfOpt - 1})
}
3. Use double quotes only.
4. The output must start with '[' and end with ']'.
5. Vocabulary Level: ${variator.vocabularyLevel}.
6. Difficulty Level: ${variator.difficultyLevel}.
7. IMPORTANT: The correct answer’s *position* ("ans") should vary randomly.
   - First, decide the correct answer.
   - Then, shuffle the options so the correct one lands at a random index.
   - Finally, set "ans" to that new index (not a random number).
8. Never assign "ans" randomly without ensuring it points to the correct option.

Example:
[
  {
    "question": "What is the first planet in the solar system?",
    "options": ["Mercury", "Earth", "Venus"],
    "ans": 0
  }
]
`;
};


const getMCQ = async (text, variator) => {
  console.log(prompt(text, variator));
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-v3.2-exp",
        messages: [
          { role: "user", content: `${prompt(text, variator)}` },
        ],
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
    const reply = res.data.choices[0].message.content;
    console.log(res)
    return reply;
  } catch (error) {
    console.error("MCQ generation error:", error);
  }
};

export default getMCQ;
