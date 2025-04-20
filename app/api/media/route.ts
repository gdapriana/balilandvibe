import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { GET_MEDIA_QUERIES, POST_MEDIA } from "@/lib/schema";
import { slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const nameQ = searchParams.get("name") ?? undefined;
    const orderQ = searchParams.get("order") ?? undefined;
    const queries = GET_MEDIA_QUERIES.parse({ name: nameQ, order: orderQ });
    const items = await prisma.media.findMany({
      where: {
        name: queries.name,
      },
      orderBy: {
        name: queries.order === "name" ? "asc" : undefined,
        created_at: queries.order === "created" ? "asc" : undefined,
      },
    });
    return NextResponse.json({ data: items }, { status: 200 });
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errors: e.errors }, { status: 400 });
    }
    return NextResponse.json(
      { errors: "internal server error" },
      { status: 500 }
    );
  }
}

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
      return NextResponse.json({ errors: "already exist" }, { status: 409 });
    }
    const item = await prisma.media.create({
      data: { ...checkBody, slug: newSlug },
      select: {
        name: true,
      },
    });
    return NextResponse.json({ data: item }, { status: 201 });
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errors: e.errors }, { status: 400 });
    }
    return NextResponse.json(
      { errors: "internal server error" },
      { status: 500 }
    );
  }
}
