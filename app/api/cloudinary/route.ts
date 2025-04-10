import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "no file provided" }, { status: 400 });
    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64File}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
      use_filename: true,
    });

    return NextResponse.json({ data: uploadResponse }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "upload failed" }, { status: 500 });
  }
}
