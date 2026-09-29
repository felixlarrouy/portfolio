import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const imagesRoot = path.join(
  process.cwd(),
  "public",
  "images"
);

const outputDir = path.join(
  process.cwd(),
  "src/data"
);

const outputFile = path.join(
  outputDir,
  "photo-manifest.json"
);

type Photo = {
  src: string;
  width: number;
  height: number;
};

type Manifest = Record<string, Photo[]>;

function getPhotos(directory: string, urlPrefix: string): Photo[] {
  const files = fs
    .readdirSync(directory)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort();

  return files.flatMap((file) => {
    const filePath = path.join(directory, file);
    const buffer = fs.readFileSync(filePath);

    const { width, height } = imageSize(buffer);

    if (!width || !height) {
      console.warn(`Skipping ${file}: dimensions not found`);
      return [];
    }

    return [
      {
        src: `${urlPrefix}/${file}`,
        width,
        height,
      },
    ];
  });
}

function generateManifest() {
  const manifest: Manifest = {};

  // Home
  const homeDir = path.join(imagesRoot, "home");

  if (fs.existsSync(homeDir)) {
    manifest.home = getPhotos(
      homeDir,
      "/images/home"
    );
  }

  // Galleries
  const galleriesDir = path.join(imagesRoot, "galleries");

  if (fs.existsSync(galleriesDir)) {
    const galleries = fs
      .readdirSync(galleriesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory());

    for (const gallery of galleries) {
      const galleryDir = path.join(
        galleriesDir,
        gallery.name
      );

      manifest[gallery.name] = getPhotos(
        galleryDir,
        `/images/galleries/${gallery.name}`
      );
    }
  }

  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    outputFile,
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );

  console.log(
    `Generated photo manifest: ${outputFile}`
  );
}

generateManifest();