import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getMCQ = async (text, variator) => {
  try {
    const {data} = await axios.post(`${backendUrl}/quizzes/generate-mcq`, {text, variator})
    console.log(data)
    const mcqs = data.content;
    return mcqs;
  } catch (error) {
    console.error("MCQ generation error:", error);
  }
};

export { getMCQ };
