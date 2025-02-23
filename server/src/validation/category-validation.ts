import { z, ZodType } from "zod";

class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(2),
    description: z.string().min(10).max(400).optional(),
  });
  static readonly GET_QUERIES: ZodType = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(2).or(z.null()).optional(),
    description: z.string().min(10).max(400).or(z.null()).optional(),
  });
}

export default CategoryValidation;
