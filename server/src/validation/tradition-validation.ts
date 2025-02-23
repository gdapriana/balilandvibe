import { z, ZodType } from "zod";

class TraditionValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(2),
    description: z.string().min(10).max(400),
    body: z.string().min(10),
    cover: z.string().url(),
    address: z.string().min(10).optional(),
    districtSlug: z.string().optional(),
  });
  static readonly GET_QUERIES: ZodType = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    sort: z.string().optional(),
    district: z.array(z.string()).optional(),
    page: z
      .string()
      .refine((val) => !isNaN(Number(val)), { message: "page queries must number" })
      .optional(),
    take: z
      .string()
      .refine((val) => !isNaN(Number(val)), { message: "count queries must number" })
      .optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(2).or(z.null()).optional(),
    description: z.string().min(10).max(400).or(z.null()).optional(),
    body: z.string().min(10).or(z.null()).optional(),
    cover: z.string().url().or(z.null()).optional(),
    address: z.string().min(10).or(z.null()).optional(),
    districtSlug: z.string().or(z.null()).optional(),
  });
}

export default TraditionValidation;
