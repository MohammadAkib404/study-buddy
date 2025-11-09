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

const getMCQ = async (text, variator) => {
  try {
    const res = await axios.post(
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
    const reply = res.data.choices[0].message.content;
    console.log(res);
    return reply;
  } catch (error) {
    console.error("MCQ generation error:", error);
  }
};

async function saveMCQ(title, mcqs) {
  try {
    const res = await axios.post("http://localhost:5000/api/mcqs", {
      title: title,
      mcqs: mcqs,
    });
    console.log("Server response:", res.data);
  } catch (error) {
    console.error(
      "Error from me in Save Mcq",
      console.log("Server response:", res.data)
    );
  }
}

export { getMCQ, saveMCQ };
