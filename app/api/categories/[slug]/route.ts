import { prisma } from "@/lib/prisma";
import { PATCH_CATEGORY } from "@/lib/schema";
import { Params, slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const checkBody = PATCH_CATEGORY.parse(body);
    const checkItem = await prisma.category.findUnique({
      where: {
        slug,
      },
    });
    if (!checkItem)
      return NextResponse.json({ errors: "not found" }, { status: 404 });
    let candidateSlug: string | undefined = undefined;
    if (checkBody.name) {
      candidateSlug = slugify(checkBody.name, slugifyParams);
      const checkItemName = await prisma.category.findUnique({
        where: {
          slug: candidateSlug,
        },
      });
      if (checkItemName)
        return NextResponse.json({ errors: "already exist" }, { status: 409 });
    }
    const item = await prisma.category.update({
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const checkItem = await prisma.category.findUnique({
      where: {
        slug,
      },
    });
    if (!checkItem)
      return NextResponse.json({ errors: "not found" }, { status: 404 });
    const item = await prisma.category.delete({
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
