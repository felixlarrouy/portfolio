import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

function getRoots() {
  const originalsRoot = path.join(process.cwd(), "public", "images");
  const optimizedRoot = path.join(process.cwd(), "public", "images-optimized");
  return { originalsRoot, optimizedRoot, hasOptimized: fs.existsSync(optimizedRoot) };
}

type Photo = {
  src: string;
  width: number;
  height: number;
};

export async function GET() {
  try {
    const { originalsRoot, optimizedRoot, hasOptimized } = getRoots();
    const originalsDir = path.join(originalsRoot, "home");
    const optimizedDir = path.join(optimizedRoot, "home");
    const files = await fs.promises.readdir(originalsDir);

    const photos: Photo[] = [];

    for (const file of files) {
      if (!file.toLowerCase().match(/\.(jpe?g|png|webp)$/)) continue;

      const originalAbs = path.join(originalsDir, file);
      const parsed = path.parse(file);
      const optimizedAbs = path.join(optimizedDir, `${parsed.name}.webp`);
      const useOptimized = hasOptimized && fs.existsSync(optimizedAbs);
      const absPath = useOptimized ? optimizedAbs : originalAbs;

      const fileBuffer = await fs.promises.readFile(absPath);
      const size = imageSize(fileBuffer);

      if (!size.width || !size.height) continue;

      photos.push({
        src: useOptimized ? `/images-optimized/home/${parsed.name}.webp` : `/images/home/${file}`,
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

