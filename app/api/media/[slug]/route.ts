import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { Params } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const itemCheck = await prisma.media.findUnique({
      where: {
        slug,
      },
    });
    if (!itemCheck)
      return NextResponse.json({ errors: "not found" }, { status: 404 });
    cloudinary.uploader.destroy(itemCheck.public_id);
    const deletedItem = await prisma.media.delete({
      where: {
        slug,
      },
      select: {
        name: true,
      },
    });
    return NextResponse.json({ data: deletedItem }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { errors: "internal server error" },
      { status: 500 }
    );
  }
}
