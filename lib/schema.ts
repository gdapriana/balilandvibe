import { z } from "zod";

export const GET_DESTINATION_QUERIES = z.object({
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  page: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: "page number must be number",
    })
    .optional()
    .nullable(),
  limit: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: "page number must be number",
    })
    .optional()
    .nullable(),
  address: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  order: z.enum(["name", "created", "liked", "saved"]).optional().nullable(),
});

export const POST_DESTINATION = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  address: z.string().optional().nullable(),
  map_url: z.string().url().optional().nullable(),
  cover_slug: z.string().optional().nullable(),
  district_slug: z.string().min(1),
  category_slug: z.string().min(1),
});

export const PATCH_DESTINATION = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  address: z.string().optional().nullable(),
  map_url: z.string().url().optional().nullable(),
  cover_slug: z.string().optional().nullable(),
  district_slug: z.string().min(1).optional(),
  category_slug: z.string().min(1).optional(),
});

export const GET_MEDIA_QUERIES = z.object({
  name: z.string().optional(),
  order: z.enum(["name", "created"]).optional(),
});

export const POST_MEDIA = z.object({
  name: z.string().min(1),
  public_id: z.string().min(1),
  secure_url: z.string().url().min(1),
});

export const GET_CATEGORY_QUERIES = z.object({
  name: z.string().optional(),
  order: z.enum(["name", "created"]).optional(),
});

export const POST_CATEGORY = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
});

export const PATCH_CATEGORY = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
});

export const GET_DISTRICT_QUERIES = z.object({
  name: z.string().optional(),
  order: z.enum(["name", "created"]).optional(),
});

export const POST_DISTRICT = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  cover_slug: z.string().optional().nullable(),
});

export const PATCH_DISTRICT = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  cover_slug: z.string().optional().nullable(),
});

export const POST_COMMENT = z.object({
  body: z.string().min(3).max(200),
});
