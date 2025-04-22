import { prisma } from "@/lib/prisma";
import { GET_DESTINATION_QUERIES, POST_DESTINATION } from "@/lib/schema";
import { slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const nameQ = searchParams.get("name") ?? undefined;
    const addressQ = searchParams.get("address") ?? undefined;
    const pageQ = searchParams.get("page") ?? undefined;
    const orderQ = searchParams.get("order") ?? undefined;
    const queries = GET_DESTINATION_QUERIES.parse({
      name: nameQ,
      address: addressQ,
      page: pageQ,
      order: orderQ,
    });

    const allItems = await prisma.destination.count();

    const limitDefault = 10;
    const pageDefault = parseInt(queries.page ?? "1");
    const skip = (pageDefault - 1) * limitDefault;
    const totalPage = Math.ceil(allItems / limitDefault);

    const items = await prisma.destination.findMany({
      where: {
        AND: [
          { name: { contains: queries.name, mode: "insensitive" } },
          { address: { contains: queries.address, mode: "insensitive" } },
        ],
      },
      skip,
      take: limitDefault,
      select: {
        _count: true,
        name: true,
        slug: true,
        address: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        cover: {
          select: {
            secure_url: true,
          },
        },
        district: {
          select: {
            name: true,
            slug: true,
          },
        },
        description: true,
      },
    });

    return NextResponse.json(
      { data: items, total_items: allItems, total_page: totalPage },
      { status: 200 }
    );
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
    const checkBody = POST_DESTINATION.parse(body);
    const slug = slugify(checkBody.name, slugifyParams);
    const checkItem = await prisma.destination.findUnique({ where: { slug } });
    if (checkItem)
      return NextResponse.json({ errors: "already exist" }, { status: 409 });
    if (checkBody.cover_slug) {
      const checkCover = await prisma.media.findUnique({
        where: { slug: checkBody.cover_slug },
      });
      if (!checkCover)
        return NextResponse.json(
          { errors: "media not found" },
          { status: 404 }
        );
    }
    if (checkBody.category_slug) {
      const checkCategory = await prisma.category.findUnique({
        where: { slug: checkBody.category_slug },
      });
      if (!checkCategory)
        return NextResponse.json(
          { errors: "category not found" },
          { status: 404 }
        );
    }
    if (checkBody.district_slug) {
      const checkDistrict = await prisma.district.findUnique({
        where: { slug: checkBody.district_slug },
      });
      if (!checkDistrict)
        return NextResponse.json(
          { errors: "district not found" },
          { status: 404 }
        );
    }
    const item = await prisma.destination.create({
      data: {
        ...checkBody,
        slug,
      },
      select: { name: true },
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
