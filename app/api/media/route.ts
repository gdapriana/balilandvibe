import { prisma } from "@/lib/prisma";
import { POST_MEDIA } from "@/lib/schema";
import { slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const checkBody = POST_MEDIA.parse(body);
    const newSlug: string = slugify(checkBody.name, slugifyParams);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errors: e.errors }, { status: 400 });
    }
    return NextResponse.json(
      { errors: "internal server error" },
      { status: 500 }
    );
  }
}
