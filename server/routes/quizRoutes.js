import express from "express";
import { getQuiz, getTitles, saveQuiz } from "../controllers/quizController";

const quizRouter = express.Router();

quizRouter.post('/save', saveQuiz);
quizRouter.post('/titles', getTitles);
quizRouter.post('/quiz', getQuiz);

export default quizRouter;