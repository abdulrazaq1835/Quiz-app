import mongoose from "mongoose";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const TOKEN_EXPIRES_IN = "24h";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are reqiured" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: " Invalid Email" });
    }

    const isExists = await User.findOne({ email }).lean();
    if (isExists) {
      return res.status(400).json({message:"User already Exists"});
    }

    const newId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: newId,
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    if (!JWT_SECRET) throw new Error("JWT token is not found on server");
 
    const token = jwt.sign({ id: newId.toString() }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res
      .status(201)
      .json({
        message: "Account Created SuccessFully",
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email },
      });
  } catch (error) {
    return res.status(500).json({message:"Internal server error"});
  }
}


// login


export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
