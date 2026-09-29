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
  srcSet: { src: string; width: number; height: number }[];
};

type Manifest = Record<string, Photo[]>;

function getPhotos(
  directory: string,
  urlPrefix: string,
  thumbnailDirectory: string,
  thumbnailUrlPrefix: string,
): Photo[] {
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

    const thumbnailName = `${path.parse(file).name}.webp`;
    const thumbnail1280Name = `${path.parse(file).name}-1280.webp`;
    const thumbnails = [thumbnailName, thumbnail1280Name].map((thumbnailFile) => {
      const thumbnailPath = path.join(thumbnailDirectory, thumbnailFile);
      if (!fs.existsSync(thumbnailPath)) {
        throw new Error(
          `Missing expected thumbnail: ${path.relative(process.cwd(), thumbnailPath)}`,
        );
      }

      const thumbnailDimensions = imageSize(fs.readFileSync(thumbnailPath));
      if (!thumbnailDimensions.width || !thumbnailDimensions.height) {
        throw new Error(
          `Could not read thumbnail dimensions: ${path.relative(process.cwd(), thumbnailPath)}`,
        );
      }

      return {
        src: `${thumbnailUrlPrefix}/${thumbnailFile}`,
        width: thumbnailDimensions.width,
        height: thumbnailDimensions.height,
      };
    });

    return [
      {
        src: `${urlPrefix}/${file}`,
        width,
        height,
        srcSet: thumbnails,
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
      "/images/home",
      path.join(process.cwd(), "public", "images-thumbnails", "home"),
      "/images-thumbnails/home",
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
        `/images/galleries/${gallery.name}`,
        path.join(process.cwd(), "public", "images-thumbnails", "galleries", gallery.name),
        `/images-thumbnails/galleries/${gallery.name}`,
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