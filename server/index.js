import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDB from "./config/connection.js";
import quizRouter from "./routes/quizRoutes.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: allowedOrigins}));

app.use("/api/auth", authRouter);    
app.use("/api/quizzes", quizRouter);   

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
