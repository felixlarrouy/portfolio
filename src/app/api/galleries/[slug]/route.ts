import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { galleries } from "@/data/galleries";

type Photo = {
  src: string;
  width: number;
  height: number;
};

type Context = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function GET(_req: Request, context: Context) {
  try {
    const { slug } = await Promise.resolve(context.params);

    if (!(slug in galleries)) {
      return NextResponse.json({ error: "Unknown gallery" }, { status: 404 });
    }

    const imagesRoot = path.join(process.cwd(), "public", "images");
    const galleryDir = path.join(imagesRoot, "galleries", slug);

    const files = await fs.promises.readdir(galleryDir);
    const photos: Photo[] = [];

    for (const file of files) {
      const lower = file.toLowerCase();
      if (!lower.match(/\.(jpe?g|png|webp)$/)) continue;

      const fileBuffer = await fs.promises.readFile(path.join(galleryDir, file));
      const size = imageSize(fileBuffer);

      if (!size.width || !size.height) continue;

      photos.push({
        src: `/images/galleries/${slug}/${file}`,
        width: size.width,
        height: size.height,
      });
    }

    photos.sort((a, b) => a.src.localeCompare(b.src));
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Failed to read gallery photos", error);
    return NextResponse.json(
      { error: "Failed to load photos" },
      { status: 500 },
    );
  }
}

