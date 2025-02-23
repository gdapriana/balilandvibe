import { User } from "@prisma/client";
import validation from "../validation/validation";
import UserValidation from "../validation/user-validation";
import db from "../application/database";
import ResponseError from "../error/response-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class UserServices {
  static async register(body: User) {
    const bodyCheck = validation.validate(UserValidation.REGISTER, body);
    const isItemExists = await db.user.findUnique({ where: { username: bodyCheck.username } });
    if (isItemExists) throw new ResponseError(400, "already exists");
    bodyCheck.password = await bcrypt.hash(bodyCheck.password, 10);
    return db.user.create({
      data: bodyCheck,
      select: { username: true },
    });
  }
  static async login(body: User) {
    const bodyCheck = validation.validate(UserValidation.LOGIN, body);
    const isItemExists = await db.user.findUnique({ where: { username: bodyCheck.username } });
    if (!isItemExists) throw new ResponseError(401, "username or pasword wrong");
    if (!(await bcrypt.compare(bodyCheck.password, isItemExists.password)))
      throw new ResponseError(401, "username or pasword wrong");
    const token = jwt.sign(
      { username: bodyCheck.username, id: isItemExists.id, role: isItemExists.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "3600s",
      },
    );
    return db.user.update({
      where: { username: bodyCheck.username },
      data: { token: token },
      select: {
        token: true,
        username: true,
      },
    });
  }
  static async logout(username: string | undefined) {
    if (!username) throw new ResponseError(401, "unauthenticated");
    const user = await db.user.findUnique({ where: { username } });
    if (!user) throw new ResponseError(404, "not found");
    return db.user.update({
      where: { username },
      data: { token: null },
      select: { username: true },
    });
  }
}

export default UserServices;
