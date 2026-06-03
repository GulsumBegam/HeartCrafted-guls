import { NextRequest, NextResponse } from "next/server";
import { uploadImage, uploadAudio } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file, type = "image", folder } = body as {
      file: string;
      type?: "image" | "audio";
      folder?: string;
    };

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    let url: string;
    if (type === "audio") {
      url = await uploadAudio(file, folder);
    } else {
      url = await uploadImage(file, folder);
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please check your Cloudinary configuration." },
      { status: 500 }
    );
  }
}
