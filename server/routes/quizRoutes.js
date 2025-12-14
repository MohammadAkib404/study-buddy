import express from "express";
import { getQuiz, getTitles, saveQuiz } from "../controllers/quizController.js";
import userAuth from "../middlewares/userAuth.js";

const quizRouter = express.Router();

quizRouter.post('/save', userAuth, saveQuiz);
quizRouter.get('/titles', getTitles);
quizRouter.get('/quiz', getQuiz);

export default quizRouter;