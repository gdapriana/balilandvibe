import { z } from "zod";

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
