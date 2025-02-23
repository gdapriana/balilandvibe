import { z, ZodType } from "zod";

class UserValidation {
  static REGISTER: ZodType = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
  });
  static LOGIN: ZodType = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
  });
}

export default UserValidation;
