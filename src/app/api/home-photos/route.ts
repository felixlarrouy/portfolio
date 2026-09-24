import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

type Photo = {
  src: string;
  width: number;
  height: number;
};

export async function GET() {
  try {
    const imagesRoot = path.join(process.cwd(), "public", "images");
    const homeDir = path.join(imagesRoot, "home");
    const files = await fs.promises.readdir(homeDir);

    const photos: Photo[] = [];

    for (const file of files) {
      if (!file.toLowerCase().match(/\.(jpe?g|png|webp)$/)) continue;

      const fileBuffer = await fs.promises.readFile(path.join(homeDir, file));
      const size = imageSize(fileBuffer);

      if (!size.width || !size.height) continue;

      photos.push({
        src: `/images/home/${file}`,
        width: size.width,
        height: size.height,
      });
    }

    // Sort by filename for stable order
    photos.sort((a, b) => a.src.localeCompare(b.src));

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Failed to read home photos", error);
    return NextResponse.json(
      { error: "Failed to load photos" },
      { status: 500 },
    );
  }
}

