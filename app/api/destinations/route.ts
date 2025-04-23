import { prisma } from "@/lib/prisma";
import { GET_DESTINATION_QUERIES, POST_DESTINATION } from "@/lib/schema";
import { slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const name = searchParams.get("name");
    const description = searchParams.get("description");
    const district = searchParams.get("district");
    const address = searchParams.get("address");
    const category = searchParams.get("category");
    const order = searchParams.get("order") || "created";
    let page = searchParams.get("page") || "1";
    let limit = searchParams.get("limit") || "10";

    const checkQueries = GET_DESTINATION_QUERIES.parse({
      name,
      description,
      page,
      limit,
      district,
      category,
      order,
      address,
    });

    const parsedPage = parseInt(checkQueries.page || "1");
    const parsedLimit = parseInt(checkQueries.limit || "10");
    const skip = (parsedPage - 1) * parsedLimit;

    const filters: any = {};
    if (checkQueries.name)
      filters.name = { contains: checkQueries.name, mode: "insensitive" };
    if (checkQueries.description)
      filters.description = {
        contains: checkQueries.description,
        mode: "insensitive",
      };
    if (checkQueries.address)
      filters.address = {
        contains: checkQueries.address,
        mode: "insensitive",
      };
    if (checkQueries.district) filters.district_slug = checkQueries.district;
    if (checkQueries.category) filters.category_slug = checkQueries.category;

    // ORDER BY
    let orderBy: any;
    if (checkQueries.order === "name") {
      orderBy = { name: "asc" };
    } else if (checkQueries.order === "created") {
      orderBy = { created_at: "desc" };
    }

    // Special case: mostLiked or mostSaved
    if (checkQueries.order === "liked" || checkQueries.order === "saved") {
      const allDestinations = await prisma.destination.findMany({
        where: filters,
        include: {
          district: { select: { slug: true, name: true } },
          category: { select: { slug: true, name: true } },
          _count: {
            select: {
              users_liked: true,
              users_saved: true,
            },
          },
        },
      });

      const sorted = allDestinations
        .sort((a, b) => {
          const aCount =
            order === "mostLiked" ? a._count.users_liked : a._count.users_saved;
          const bCount =
            order === "mostLiked" ? b._count.users_liked : b._count.users_saved;
          return bCount - aCount;
        })
        .slice(skip, skip + parsedLimit);

      return NextResponse.json({
        data: sorted,
        page,
        limit,
        total: allDestinations.length,
        totalPages: Math.ceil(allDestinations.length / parsedLimit),
        hasMore: skip + parsedLimit < allDestinations.length,
      });
    }

    // Normal orderBy
    const [destinations, total] = await Promise.all([
      prisma.destination.findMany({
        where: filters,
        skip,
        take: parsedLimit,
        orderBy,
        include: {
          district: { select: { slug: true, name: true } },
          category: { select: { slug: true, name: true } },
        },
      }),
      prisma.destination.count({ where: filters }),
    ]);

    return NextResponse.json({
      data: destinations,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / parsedLimit),
      hasMore: skip + parsedLimit < total,
    });
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
