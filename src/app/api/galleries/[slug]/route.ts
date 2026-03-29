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

    const dirPath = path.join(
      process.cwd(),
      "public",
      "images",
      "galleries",
      slug,
    );

    const files = await fs.promises.readdir(dirPath);
    const photos: Photo[] = [];

    for (const file of files) {
      if (!file.toLowerCase().match(/\.(jpe?g|png|webp)$/)) continue;

      const absolutePath = path.join(dirPath, file);
      const fileBuffer = await fs.promises.readFile(absolutePath);
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

