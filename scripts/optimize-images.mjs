#!/usr/bin/env node
/**
 * Generates resized WebP versions from public/images-original into public/images.
 * Use --thumbnails to generate smaller versions from public/images into
 * public/images-thumbnails.
 *
 * Goal: drastically reduce bytes + decoded memory while staying crisp on desktop.
 *
 * Usage:
 *   npm run optimize-images
 *   npm run optimize-images -- --max-width 2400
 *   npm run optimize-images -- --max-width 1800 --quality 72
 *   npm run optimize-images -- --input-dir galleries/jo2024bike
 *   npm run optimize-images -- --thumbnails --max-width 640
 *   npm run optimize-images -- --dry-run
 *
 * Notes:
 * - Output files are `.webp` and metadata is stripped.
 * - Only `.jpg/.jpeg/.png` inputs are processed (skip `.webp/.avif/.svg`).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");

function parseArgs(argv) {
  const dryRun = argv.includes("--dry-run");
  const force = argv.includes("--force");
  const thumbnails = argv.includes("--thumbnails");
  const inputDirIdx = argv.indexOf("--input-dir");
  const inputDir =
    inputDirIdx !== -1 && argv[inputDirIdx + 1]
      ? argv[inputDirIdx + 1]
      : ".";
  const maxWidthIdx = argv.indexOf("--max-width");
  const maxWidth =
    maxWidthIdx !== -1 && argv[maxWidthIdx + 1]
      ? Number.parseInt(argv[maxWidthIdx + 1], 10)
      : thumbnails ? 640 : 2400;
  const qualityIdx = argv.indexOf("--quality");
  const quality =
    qualityIdx !== -1 && argv[qualityIdx + 1]
      ? Number.parseInt(argv[qualityIdx + 1], 10)
      : thumbnails ? 72 : 82;

  if (!Number.isFinite(maxWidth) || maxWidth < 320) {
    throw new Error(`Invalid --max-width: ${argv[maxWidthIdx + 1] ?? ""}`);
  }
  if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
    throw new Error(`Invalid --quality: ${argv[qualityIdx + 1] ?? ""}`);
  }

  return { dryRun, force, inputDir, maxWidth, quality, thumbnails };
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkFiles(p)));
    else out.push(p);
  }
  return out;
}

function isOptimizable(ext, thumbnails) {
  return ext === ".jpg" || ext === ".jpeg" || ext === ".png" ||
    (thumbnails && ext === ".webp");
}

function outPathFor(absIn, imagesRoot, optimizedRoot) {
  const rel = path.relative(imagesRoot, absIn);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`File outside images root: ${absIn}`);
  }
  const parsed = path.parse(rel);
  return path.join(optimizedRoot, parsed.dir, `${parsed.name}.webp`);
}

async function ensureDir(p) {
  await fs.promises.mkdir(path.dirname(p), { recursive: true });
}

async function optimizeOne(absIn, absOut, maxWidth, quality, dryRun, force, thumbnails) {
  const inStat = await fs.promises.stat(absIn);
  const outExists = fs.existsSync(absOut);
  const outStat = outExists ? await fs.promises.stat(absOut) : null;
  let metadata;
  let orientedDimensions;

  // Skip if output is newer or same mtime (basic incremental behavior).
  if (!force && outStat && outStat.mtimeMs >= inStat.mtimeMs) {
    if (!thumbnails) return { skipped: true };

    metadata = await sharp(absIn, { failOn: "none" }).metadata();
    orientedDimensions = metadata.autoOrient ?? {
      width: metadata.width,
      height: metadata.height,
    };
    const outputMetadata = await sharp(absOut, { failOn: "none" }).metadata();
    const expectedWidth = Math.min(orientedDimensions.width ?? maxWidth, maxWidth);
    if (outputMetadata.width === expectedWidth) return { skipped: true };
  }

  if (dryRun) return { skipped: false, dryRun: true };

  metadata ??= await sharp(absIn, { failOn: "none" }).metadata();
  orientedDimensions ??= metadata.autoOrient ?? {
    width: metadata.width,
    height: metadata.height,
  };

  await ensureDir(absOut);

  const isPortrait = orientedDimensions.height > orientedDimensions.width;
  const resizeWidth = !thumbnails && isPortrait
    ? Math.round(maxWidth * (2 / 3))
    : maxWidth;

  const pipeline = sharp(absIn, { failOn: "none" })
    .rotate() // respect EXIF orientation
    .resize({
      width: resizeWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .withMetadata({ orientation: undefined }) // strip EXIF orientation
    .webp({
      quality,
      effort: 6,
      smartSubsample: true,
    });

  await pipeline.toFile(absOut);
  return { skipped: false };
}

async function main() {
  const { dryRun, force, inputDir, maxWidth, quality, thumbnails } = parseArgs(
    process.argv.slice(2),
  );

  const imagesRootBase = path.join(
    PROJECT_ROOT,
    "public",
    thumbnails ? "images" : "images-original",
  );
  const outputRootBase = path.join(
    PROJECT_ROOT,
    "public",
    thumbnails ? "images-thumbnails" : "images",
  );
  const imagesRoot = path.resolve(imagesRootBase, inputDir);
  const inputRelativePath = path.relative(imagesRootBase, imagesRoot);

  if (inputRelativePath.startsWith("..") || path.isAbsolute(inputRelativePath)) {
    const sourceDirectory = thumbnails ? "images" : "images-original";
    throw new Error(`--input-dir must be a path inside public/${sourceDirectory}`);
  }

  if (!fs.existsSync(imagesRoot)) {
    console.error(`Folder not found: ${path.relative(PROJECT_ROOT, imagesRoot)}`);
    process.exit(1);
  }

  const outputRoot = path.join(outputRootBase, inputRelativePath);
  const all = await walkFiles(imagesRoot);
  const candidates = all
    .filter((p) => isOptimizable(path.extname(p).toLowerCase(), thumbnails))
    .sort();

  console.error(
    `Found ${candidates.length} optimizable image(s) under ${path.relative(PROJECT_ROOT, imagesRoot)} (landscapeMaxWidth=${maxWidth}, portraitMaxWidth=${thumbnails ? maxWidth : Math.round(maxWidth * (2 / 3))})`,
  );

  let done = 0;
  let skipped = 0;

  for (const absIn of candidates) {
    const absOut = outPathFor(absIn, imagesRoot, outputRoot);
    const relIn = path.relative(PROJECT_ROOT, absIn);
    const outputs = thumbnails
      ? [
          { path: absOut, width: maxWidth },
          {
            path: path.join(
              path.dirname(absOut),
              `${path.parse(absOut).name}-1280.webp`,
            ),
            width: 1280,
          },
        ]
      : [{ path: absOut, width: maxWidth }];
    done += 1;

    for (const output of outputs) {
      const relOut = path.relative(PROJECT_ROOT, output.path);
      const result = await optimizeOne(
        absIn,
        output.path,
        output.width,
        quality,
        dryRun,
        force,
        thumbnails,
      );
      if (result.skipped) {
        skipped += 1;
        continue;
      }
      process.stderr.write(`[${done}/${candidates.length}] ${relIn} → ${relOut}\n`);
    }
  }

  console.error(`Done. Skipped ${skipped} (already up-to-date).`);

  if (dryRun) {
    console.error("Dry run: outputs were not written.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

