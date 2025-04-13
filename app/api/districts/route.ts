import { prisma } from "@/lib/prisma";
import { GET_DISTRICT_QUERIES, POST_DISTRICT } from "@/lib/schema";
import { slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name") ?? undefined;
    const order = searchParams.get("order") ?? undefined;
    const queries = GET_DISTRICT_QUERIES.parse({ name, order });
    const items = await prisma.district.findMany({
      where: {
        name: { contains: queries.name, mode: "insensitive" },
      },
      include: {
        cover: true,
        _count: true,
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
    const checkBody = POST_DISTRICT.parse(body);
    const newSlug: string = slugify(checkBody.name, slugifyParams);
    const checkSlug = await prisma.district.findUnique({
      where: {
        slug: newSlug,
      },
    });
    if (checkSlug) {
      return NextResponse.json({ errors: "already exist" }, { status: 409 });
    }
    const item = await prisma.district.create({
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
