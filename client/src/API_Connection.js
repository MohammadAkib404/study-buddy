import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

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
    const res = await axios.post("http://localhost:5000/api/quizzes/save", {
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
