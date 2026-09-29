#!/usr/bin/env node
/**
 * Embeds copyright into image files under public/images using ExifTool.
 * Writes EXIF Copyright, IPTC CopyrightNotice, and XMP dc:rights (common for stock / web).
 *
 * Prerequisite: install ExifTool — https://exiftool.org/
 *   macOS: brew install exiftool
 *
 * Usage:
 *   npm run embed-copyright
 *   npm run embed-copyright -- --dry-run
 *   PHOTO_COPYRIGHT="© Me 2026" npm run embed-copyright
 *
 * Keep PHOTO_COPYRIGHT in sync with src/constants/photoCopyright.ts for the live site.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const IMAGES_ROOT = path.join(PROJECT_ROOT, "public", "images");

const DEFAULT_COPYRIGHT = "© Félix Larrouy. Tous droits réservés.";

const COPYRIGHT =
  process.env.PHOTO_COPYRIGHT?.trim() || DEFAULT_COPYRIGHT;

const ARTIST = process.env.PHOTO_ARTIST?.trim() || "Félix Larrouy";

const dryRun = process.argv.includes("--dry-run");

function exiftoolInstalled() {
  try {
    execFileSync("exiftool", ["-ver"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function collectImageFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectImageFiles(full, out);
    } else if (/\.(jpe?g|png|webp|tiff?)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function main() {
  if (!exiftoolInstalled()) {
    console.error(
      "exiftool not found. Install it first:\n  macOS: brew install exiftool\n  https://exiftool.org/",
    );
    process.exit(1);
  }

  if (!fs.existsSync(IMAGES_ROOT)) {
    console.error(`No folder at ${IMAGES_ROOT}`);
    process.exit(1);
  }

  const files = collectImageFiles(IMAGES_ROOT);
  if (!files.length) {
    console.log(`No images found under ${IMAGES_ROOT}`);
    process.exit(0);
  }

  console.log(`Copyright: ${COPYRIGHT}`);
  console.log(`Artist:    ${ARTIST}`);
  console.log(`Files:     ${files.length}`);

  const args = [
    "-overwrite_original",
    "-P",
    `-Copyright=${COPYRIGHT}`,
    `-IPTC:CopyrightNotice=${COPYRIGHT}`,
    `-XMP-dc:Rights=${COPYRIGHT}`,
    `-Artist=${ARTIST}`,
    `-IPTC:By-line=${ARTIST}`,
    `-XMP-dc:Creator=${ARTIST}`,
    ...files,
  ];

  if (dryRun) {
    console.log("\n[--dry-run] Would run:\n  exiftool", args.map((a) => (/\s/.test(a) ? JSON.stringify(a) : a)).join(" "));
    process.exit(0);
  }

  execFileSync("exiftool", args, {
    stdio: "inherit",
    cwd: PROJECT_ROOT,
  });

  console.log("\nDone. Original files were modified in place (backup first if unsure).");
}

main();
