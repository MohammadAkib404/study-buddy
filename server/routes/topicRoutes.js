import express from 'express';
import { generateTopics } from '../controllers/topicController.js';

const topicRouter = express.Router();

topicRouter.post("/generate", generateTopics);

export default topicRouter;
