import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { galleries } from "../src/data/galleries";

const publicRoot = path.join(process.cwd(), "public");
const imagesRoot = path.join(publicRoot, "images");
const thumbnailsRoot = path.join(publicRoot, "images-thumbnails");
const outputDir = path.join(process.cwd(), "src/data");
const outputFile = path.join(outputDir, "photo-manifest.json");

type Photo = {
  src: string;
  width: number;
  height: number;
  srcSet: { src: string; width: number; height: number }[];
};

type Manifest = {
  home: Photo[];
  prestations: Record<string, Photo[]>;
} & Record<string, Photo[] | Record<string, Photo[]>>;

function listPhotoFiles(
  directory: string,
  isPhoto: (file: string) => boolean = (file) => /\.(jpe?g|png|webp)$/i.test(file),
): string[] {
  return fs.readdirSync(directory).filter(isPhoto).sort();
}

function getPhotos(
  directory: string,
  urlPrefix: string,
  thumbnailDirectory: string,
  thumbnailUrlPrefix: string,
  isPhoto?: (file: string) => boolean,
): Photo[] {
  const files = listPhotoFiles(directory, isPhoto);

  return files.map((file) => {
    const filePath = path.join(directory, file);
    const buffer = fs.readFileSync(filePath);

    const { width, height } = imageSize(buffer);

    if (!width || !height) {
      throw new Error(`Dimensions not found for image: ${path.relative(process.cwd(), filePath)}`);
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

    return {
      src: `${urlPrefix}/${file}`,
      width,
      height,
      srcSet: thumbnails,
    };
  });
}

function generateManifest() {
  if (!fs.existsSync(imagesRoot) || !fs.statSync(imagesRoot).isDirectory()) {
    throw new Error("Missing required image directory: public/images");
  }

  const manifest: Manifest = { home: [], prestations: {} };

  // Home
  const homeDir = path.join(imagesRoot, "home");
  if (!fs.existsSync(homeDir) || !fs.statSync(homeDir).isDirectory()) {
    throw new Error("Missing required image directory: public/images/home");
  }
  if (listPhotoFiles(homeDir).length === 0) {
    throw new Error("No photos found in public/images/home");
  }
  manifest.home = getPhotos(
    homeDir,
    "/images/home",
    path.join(thumbnailsRoot, "home"),
    "/images-thumbnails/home",
  );

  // Validate declared galleries before collecting any entries.
  const galleriesDir = path.join(imagesRoot, "galleries");
  for (const [slug, gallery] of Object.entries(galleries)) {
    const galleryDir = path.join(galleriesDir, slug);
    if (!fs.existsSync(galleryDir) || !fs.statSync(galleryDir).isDirectory()) {
      throw new Error(`Missing directory for declared gallery "${slug}": ${path.relative(process.cwd(), galleryDir)}`);
    }
    if (listPhotoFiles(galleryDir).length === 0) {
      throw new Error(`Declared gallery "${slug}" contains no photos`);
    }

    const heroPath = path.join(publicRoot, gallery.heroSrc.replace(/^\/+/, ""));
    if (!fs.existsSync(heroPath) || !fs.statSync(heroPath).isFile()) {
      throw new Error(`Hero image for gallery "${slug}" does not exist: ${gallery.heroSrc}`);
    }
  }

  const galleryDirectories = fs
    .readdirSync(galleriesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const gallery of galleryDirectories) {
    const galleryDir = path.join(galleriesDir, gallery.name);

    manifest[gallery.name] = getPhotos(
      galleryDir,
      `/images/galleries/${gallery.name}`,
      path.join(thumbnailsRoot, "galleries", gallery.name),
      `/images-thumbnails/galleries/${gallery.name}`,
    );
  }

  // Prestations
  const prestationsDir = path.join(imagesRoot, "prestations");
  if (fs.existsSync(prestationsDir)) {
    const prestationDirectories = fs
      .readdirSync(prestationsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory());

    for (const prestation of prestationDirectories) {
      const prestationDir = path.join(prestationsDir, prestation.name);
      const heroPath = path.join(prestationDir, "hero.webp");
      const photoFiles = listPhotoFiles(
        prestationDir,
        (file) => file.toLowerCase().endsWith(".webp") && file !== "hero.webp",
      );

      if (!fs.existsSync(heroPath) || !fs.statSync(heroPath).isFile()) {
        throw new Error(`Missing required hero image: ${path.relative(process.cwd(), heroPath)}`);
      }
      if (photoFiles.length === 0) {
        throw new Error(`No photos found in prestation directory: ${path.relative(process.cwd(), prestationDir)}`);
      }

      const photoFileSet = new Set(photoFiles);
      manifest.prestations[prestation.name] = getPhotos(
        prestationDir,
        `/images/prestations/${prestation.name}`,
        path.join(thumbnailsRoot, "prestations", prestation.name),
        `/images-thumbnails/prestations/${prestation.name}`,
        (file) => photoFileSet.has(file),
      );
    }
  }

  fs.mkdirSync(outputDir, { recursive: true });
  const temporaryOutputFile = `${outputFile}.tmp`;
  fs.writeFileSync(temporaryOutputFile, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  fs.renameSync(temporaryOutputFile, outputFile);

  console.log(`Generated photo manifest: ${outputFile}`);
}

try {
  generateManifest();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Photo manifest generation failed: ${message}`);
  process.exitCode = 1;
}