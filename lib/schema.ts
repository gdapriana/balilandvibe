import { z } from "zod";

export const POST_MEDIA = z.object({
  name: z.string().min(1),
  public_id: z.string().min(1),
  secure_url: z.string().url().min(1),
});

export const GET_MEDIA_QUERIES = z.object({
  name: z.string().optional(),
  order: z.enum(["name", "created"]).optional(),
});
