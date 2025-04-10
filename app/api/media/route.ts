import cloudinary from "@/lib/cloudinary";
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
    const checkSlug = await prisma.media.findUnique({
      where: {
        slug: newSlug,
      },
    });
    if (checkSlug) {
      cloudinary.uploader.destroy(checkBody.public_id);
      return NextResponse.json({ errors: "already exist" }, { status: 400 });
    }
    const media = await prisma.media.create({
      data: { ...checkBody, slug: newSlug },
      select: {
        name: true,
      },
    });
    return NextResponse.json({ data: media }, { status: 200 });
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
