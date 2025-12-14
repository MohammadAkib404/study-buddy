import express from "express";
import { getQuiz, getTitles, saveQuiz } from "../controllers/quizController.js";
import userAuth from "../middlewares/userAuth.js";

const quizRouter = express.Router();

quizRouter.post('/save', userAuth, saveQuiz);
quizRouter.get('/titles', userAuth, getTitles);
quizRouter.get('/quiz', userAuth, getQuiz);

export default quizRouter;