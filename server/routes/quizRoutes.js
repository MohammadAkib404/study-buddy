import express from "express";
import { getQuiz, getTitles, saveQuiz } from "../controllers/quizController.js";

const quizRouter = express.Router();

quizRouter.post('/save', saveQuiz);
quizRouter.get('/titles', getTitles);
quizRouter.get('/quiz', getQuiz);

export default quizRouter;