import { z, ZodType } from "zod";

class SourceValidation {
  static CREATE: ZodType = z.object({
    name: z.string().min(5),
    citationNum: z.number().or(z.null()).optional(),
    year: z.string().or(z.null()).optional(),
    publisher: z.string().or(z.null()).optional(),
    doi: z.string().url().or(z.null()).optional(),
    weblink: z.string().url().or(z.null()).optional(),
    accessed: z.string().date().optional(),
    storySlug: z.string().or(z.null()).optional(),
    destinationSlug: z.string().or(z.null()).optional(),
    cultureSlug: z.string().or(z.null()).optional(),
  });
  static UPDATE: ZodType = z.object({
    name: z.string().min(5).or(z.null()).optional(),
    citationNum: z.number().or(z.null()).optional(),
    year: z.string().or(z.null()).optional(),
    publisher: z.string().or(z.null()).optional(),
    doi: z.string().url().or(z.null()).optional(),
    weblink: z.string().url().or(z.null()).optional(),
    accessed: z.string().date().or(z.null()).optional(),
    storySlug: z.string().or(z.null()).optional(),
    destinationSlug: z.string().or(z.null()).optional(),
    cultureSlug: z.string().or(z.null()).optional(),
  });
}

export default SourceValidation;
