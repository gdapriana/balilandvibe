import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { POST_COMMENT } from "@/lib/schema";
import { Params, slugifyParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: Params },
  res: NextResponse
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const checkSlug = await prisma.destination.findUnique({ where: { slug } });
    if (!checkSlug)
      return NextResponse.json({ errors: "not found" }, { status: 404 });
    const checkBody = POST_COMMENT.parse(body);
    const session = await auth();
    if (!session)
      return NextResponse.json({ errors: "unauthorized" }, { status: 403 });

    const comment = await prisma.comment.create({
      data: {
        destination_slug: slug,
        user_email: session.user?.email!,
        body: checkBody.body,
        slug: `${slugify(session.user?.email!, slugifyParams)}-${new Date()
          .valueOf()
          .toString()}`,
      },
      select: {
        destination: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ data: comment }, { status: 200 });
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
