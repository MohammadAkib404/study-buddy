import express from "express";
import { generateMCQ, getQuiz, getTitles } from "../controllers/quizController.js";
import userAuth from "../middlewares/userAuth.js";

const quizRouter = express.Router();

quizRouter.post("/generate-mcq", userAuth, generateMCQ)
quizRouter.get('/titles', userAuth, getTitles);
quizRouter.get('/quiz', userAuth, getQuiz);

export default quizRouter;