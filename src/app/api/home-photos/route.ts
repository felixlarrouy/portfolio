import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const IMAGES_DIR = "public/images/home";

type Photo = {
  src: string;
  width: number;
  height: number;
};

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), IMAGES_DIR);
    const files = await fs.promises.readdir(dirPath);

    const photos: Photo[] = [];

    for (const file of files) {
      if (!file.toLowerCase().match(/\.(jpe?g|png|webp)$/)) continue;

      const absolutePath = path.join(dirPath, file);
      const fileBuffer = await fs.promises.readFile(absolutePath);
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

