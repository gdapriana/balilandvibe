import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import UserServices from "../services/user-services";
import { UserRequest } from "../types";

class UserControllers {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: User = req.body;
      const response = await UserServices.register(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: User = req.body;
      const response = await UserServices.login(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = req.username;
      const response = await UserServices.logout(username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default UserControllers;
