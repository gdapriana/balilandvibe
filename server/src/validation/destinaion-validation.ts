import {z, ZodType} from "zod";

class DestinaionValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(2),
    description: z.string().min(10).max(400),
    cover: z.string().url(),
    address: z.string().min(10),
    price: z.number().optional(),
    latitude: z.string(),
    longitude: z.string(),
    districtSlug: z.string().optional(),
    categorySlug: z.string().optional()
  })
  static readonly GET_QUERIES: ZodType = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    sort: z.string().optional(),
    category: z.array(z.string()).optional(),
    district: z.array(z.string()).optional(),
    page: z.string().refine((val) => !isNaN(Number(val)), {message: "page queries must number"}).optional(),
    take: z.string().refine((val) => !isNaN(Number(val)), {message: "count queries must number"}).optional(),
  })
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(2).or(z.null()).optional(),
    description: z.string().min(10).max(400).or(z.null()).optional(),
    cover: z.string().url().or(z.null()).optional(),
    address: z.string().min(10).or(z.null()).optional(),
    price: z.number().or(z.null()).optional(),
    latitude: z.string().or(z.null()).optional(),
    longitude: z.string().or(z.null()).optional(),
    districtSlug: z.string().or(z.null()).optional(),
    categorySlug: z.string().or(z.null()).optional()
  })
}

export default DestinaionValidation