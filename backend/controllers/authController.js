import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

function signToken(userId) {
    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error("JWT_SECRET is not defined");
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    return jwt.sign({ sub: userId }, secret, { expiresIn });
}

export async function register(req,res) {
    try {
        const { email, password } = req.body;
        if(!email?.trim() || !password?.trim()) {
            return res.status(400).json({message: "Email and password are required"});
        }
        if(password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if(existingUser) {
            return res.status(400).json({message: "User with this email already exists"});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: email.toLowerCase().trim(),
            passwordHash, 
        });

        const token = signToken(user._id);
        res.status(201).json({ 
            message: "User registered successfully",
            token,
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id.toString());

    return res.json({
      message: "Logged in",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}