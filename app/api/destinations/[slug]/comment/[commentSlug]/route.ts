import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type CommentParams = Promise<{ commentSlug: string }>;

export async function DELETE(
  req: NextRequest,
  { params }: { params: CommentParams }
) {
  try {
    const { commentSlug } = await params;
    const session = await auth();
    if (!session)
      return NextResponse.json({ errors: "unauthorized" }, { status: 401 });

    const checkSlug = await prisma.comment.findUnique({
      where: { slug: commentSlug },
    });

    if (!checkSlug)
      return NextResponse.json({ errors: "not found" }, { status: 404 });

    if (session.user?.email !== checkSlug.user_email)
      return NextResponse.json({ errors: "forbidden" }, { status: 403 });

    const deletedComment = await prisma.comment.delete({
      where: { slug: commentSlug },
      select: {
        user_email: true,
      },
    });
    return NextResponse.json({ data: deletedComment }, { status: 200 });
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
