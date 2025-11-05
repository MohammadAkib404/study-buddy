import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Mcq from './models/mcqModel.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running successfully')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))