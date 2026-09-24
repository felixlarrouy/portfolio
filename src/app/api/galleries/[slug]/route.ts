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

function getRoots() {
  const originalsRoot = path.join(process.cwd(), "public", "images");
  const optimizedRoot = path.join(process.cwd(), "public", "images-optimized");
  return { originalsRoot, optimizedRoot, hasOptimized: fs.existsSync(optimizedRoot) };
}

export async function GET(_req: Request, context: Context) {
  try {
    const { slug } = await Promise.resolve(context.params);

    if (!(slug in galleries)) {
      return NextResponse.json({ error: "Unknown gallery" }, { status: 404 });
    }

    const { originalsRoot, optimizedRoot, hasOptimized } = getRoots();
    const originalsDir = path.join(originalsRoot, "galleries", slug);
    const optimizedDir = path.join(optimizedRoot, "galleries", slug);

    const files = await fs.promises.readdir(originalsDir);
    const photos: Photo[] = [];

    for (const file of files) {
      const lower = file.toLowerCase();
      if (!lower.match(/\.(jpe?g|png|webp)$/)) continue;

      const originalAbs = path.join(originalsDir, file);
      const parsed = path.parse(file);
      const optimizedAbs = path.join(optimizedDir, `${parsed.name}.webp`);
      const useOptimized = hasOptimized && fs.existsSync(optimizedAbs);
      const absPath = useOptimized ? optimizedAbs : originalAbs;

      const fileBuffer = await fs.promises.readFile(absPath);
      const size = imageSize(fileBuffer);

      if (!size.width || !size.height) continue;

      const src = useOptimized
        ? `/images-optimized/galleries/${slug}/${parsed.name}.webp`
        : `/images/galleries/${slug}/${file}`;

      photos.push({
        src,
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

