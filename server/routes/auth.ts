import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    user.refreshTokens.push(refreshToken);
    await user.save();

   
    res.cookie("token", token, { httpOnly: true });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      refreshToken
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  const user: any = await User.findOne({ refreshTokens: refreshToken });
  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET!);
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    
   
    res.json({ token: newToken });
  } catch (error) {
    res.status(403).json({ message: "Refresh token expired" });
  }
});

export default router;