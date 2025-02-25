import jwt, { VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../application/database";
import { Response, NextFunction } from "express";
import { UserRequest } from "../types";
dotenv.config();

const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, async (err: VerifyErrors | null, decoded: any) => {
      if (err) return res.status(401).json({ errors: "unauthorized" });
      const user = await db.user.findFirst({ where: { token } });
      if (!user) return res.status(401).json({ errors: "unauthorized" });
      if (user.username !== decoded.username) return res.status(401).json({ errors: "unauthorized" });
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    });
  } else {
    res
      .status(401)
      .json({
        errors: "unauthorized",
      })
      .end();
  }
};
export default authMiddleware;
