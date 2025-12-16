import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getMCQ = async (text, variator) => {
  try {
    const MCQs = await axios.post(`${backendUrl}/quizzes/generate-mcq`)
    return MCQs;
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
