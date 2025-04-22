import { prisma } from "@/lib/prisma";
import { PATCH_DESTINATION } from "@/lib/schema";
import { Params, slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const item = await prisma.destination.findUnique({
      where: { slug },
      include: {
        _count: true,
        category: {
          select: {
            slug: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                image: true,
                name: true,
              },
            },
          },
        },
        cover: {
          select: {
            secure_url: true,
          },
        },
        district: {
          select: {
            slug: true,
            name: true,
          },
        },
      },
    });
    if (!item)
      return NextResponse.json({ errors: "not found" }, { status: 404 });
    return NextResponse.json({ data: item }, { status: 200 });
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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const checkSlug = await prisma.destination.findUnique({ where: { slug } });
    if (!checkSlug)
      return NextResponse.json({ errors: "not found" }, { status: 404 });
    const checkBody = PATCH_DESTINATION.parse(body);

    if (checkSlug.name === checkBody.name) checkBody.name = undefined;
    if (checkSlug.address === checkBody.address) checkBody.address = undefined;
    if (checkSlug.description === checkBody.description)
      checkBody.description = undefined;
    if (checkSlug.cover_slug === checkBody.cover_slug)
      checkBody.cover_slug = undefined;
    if (checkSlug.district_slug === checkBody.district_slug)
      checkBody.district_slug = undefined;
    if (checkSlug.category_slug === checkBody.category_slug)
      checkBody.category_slug = undefined;

    let candidateSlug = undefined;
    if (checkBody.name) {
      candidateSlug = slugify(checkBody.name, slugifyParams);
      const checkCandidate = await prisma.destination.findUnique({
        where: { slug: candidateSlug },
      });
      if (checkCandidate)
        return NextResponse.json(
          { errors: "item already exist" },
          { status: 409 }
        );
    }
    if (checkBody.cover_slug) {
      const checkCover = await prisma.media.findUnique({
        where: { slug: checkBody.cover_slug },
      });
      if (!checkCover)
        return NextResponse.json(
          { errors: "media not found" },
          { status: 409 }
        );
    }
    if (checkBody.district_slug) {
      const checkDistrict = await prisma.district.findUnique({
        where: { slug: checkBody.district_slug },
      });
      if (!checkDistrict)
        return NextResponse.json(
          { errors: "district not found" },
          { status: 409 }
        );
    }
    if (checkBody.category_slug) {
      const checkCategory = await prisma.category.findUnique({
        where: { slug: checkBody.category_slug },
      });
      if (!checkCategory)
        return NextResponse.json(
          { errors: "category not found" },
          { status: 409 }
        );
    }
    const updatedItem = await prisma.destination.update({
      where: {
        slug,
      },
      data: {
        ...checkBody,
        slug: candidateSlug,
      },
      select: {
        name: true,
      },
    });

    return NextResponse.json({ data: updatedItem }, { status: 200 });
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const checkSlug = await prisma.destination.findUnique({
      where: {
        slug,
      },
    });
    if (!checkSlug)
      return NextResponse.json({ errors: "not found" }, { status: 404 });

    const item = await prisma.destination.delete({
      where: {
        slug,
      },
      select: {
        name: true,
      },
    });
    return NextResponse.json({ data: item }, { status: 200 });
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
