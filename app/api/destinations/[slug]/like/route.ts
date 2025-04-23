import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Params } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const session = await auth();
    if (!session)
      return NextResponse.json({ errors: "unauthenticated" }, { status: 402 });
    const checkSlug = await prisma.destination.findUnique({ where: { slug } });
    if (!checkSlug)
      return NextResponse.json(
        { errors: "destination not found" },
        { status: 404 }
      );

    const liked = await prisma.destination.update({
      where: {
        slug,
      },
      data: {
        users_liked: {
          connect: {
            email: session.user?.email!,
          },
        },
      },
      select: {
        name: true,
      },
    });
    return NextResponse.json({ data: liked }, { status: 200 });
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
    const session = await auth();
    if (!session)
      return NextResponse.json({ errors: "unauthenticated" }, { status: 402 });
    const checkSlug = await prisma.destination.findUnique({ where: { slug } });
    if (!checkSlug)
      return NextResponse.json(
        { errors: "destination not found" },
        { status: 404 }
      );

    const liked = await prisma.destination.update({
      where: {
        slug,
      },
      data: {
        users_liked: {
          disconnect: {
            email: session.user?.email!,
          },
        },
      },
      select: {
        name: true,
      },
    });
    return NextResponse.json({ data: liked }, { status: 200 });
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
