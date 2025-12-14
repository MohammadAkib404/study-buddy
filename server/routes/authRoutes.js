import express from "express";
import {getUserData, isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail, verifyResetOtp} from '../controllers/authController.js'
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post('/verify-reset-otp', verifyResetOtp)
authRouter.post("/reset-password", resetPassword);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.get("/data", userAuth, getUserData);

export default authRouter;