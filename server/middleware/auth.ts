import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (req: any, res: any, next: any) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

export const admin = (req: any, res: any, next: any) => {
  if (req.user && req.user.role.includes("admin")) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};