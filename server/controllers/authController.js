import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE.ENV === "production",
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Mohammad akib",
      text: `Welcome to greatstack website. Your account has been created with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "User registered!" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Failed to register: ${error.message}`,
      });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and/or Password are missing",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    
    if(!user){
      return res.json({success: false, message: "Invalid Email"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.json({success: false, message: "Invalid Credentials"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production"? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({success: true});

  } catch (error) {
    return res.json({success: false, message: error.message})
  }
};

