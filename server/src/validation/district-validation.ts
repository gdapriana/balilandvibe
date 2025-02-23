import { z, ZodType } from "zod";

class DistrictValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(2),
    description: z.string().min(10).max(400).optional(),
    logo: z.string().min(10).max(400).url().optional(),
    cover: z.string().min(10).max(400).url().optional(),
    body: z.string().min(10).optional(),
  });
  static readonly GET_QUERIES: ZodType = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(2).or(z.null()).optional(),
    description: z.string().min(10).max(400).or(z.null()).optional(),
    logo: z.string().min(10).max(400).url().or(z.null()).optional(),
    cover: z.string().min(10).max(400).url().or(z.null()).optional(),
    body: z.string().min(10).or(z.null()).optional(),
  });
}

export default DistrictValidation;
