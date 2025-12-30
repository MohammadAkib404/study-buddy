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

const getTopics = async (text) => {
  try {
    const {data} = await axios.post(`${backendUrl}/topics/generate`, {text})
    console.log(data)
    const topics = data.content;
    return topics;
  } catch (error) {
    console.error("MCQ generation error:", error);
  }
};

export { getMCQ, getTopics };
