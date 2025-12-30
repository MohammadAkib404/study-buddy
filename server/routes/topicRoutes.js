import express from 'express';
import { generateTopics } from '../controllers/topicController.js';
import userAuth from "../middlewares/userAuth.js";

const topicRouter = express.Router();

topicRouter.post("/generate", userAuth, generateTopics);

export default topicRouter;
