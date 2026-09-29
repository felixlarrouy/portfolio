#!/usr/bin/env node
/**
 * Uploads files under public/images to Vercel Blob with stable pathnames
 * (mirrors URL paths: images/galleries/... → same as /images/... on the site).
 *
 * Prerequisites:
 *   - Create a Blob store in the Vercel project (Storage tab) and link it.
 *   - Set BLOB_READ_WRITE_TOKEN locally (e.g. `vercel env pull` or paste from
 *     Project → Settings → Environment Variables, or Storage → .env snippet).
 *
 * Usage:
 *   npm run upload-blob
 *   npm run upload-blob -- --dry-run
 *   npm run upload-blob -- --out scripts/blob-manifest.json
 *
 * Options:
 *   --dry-run          List files that would be uploaded, no network calls.
 *   --out <file>       Write JSON map { "/images/...": "https://...blob..." }.
 *   --root <dir>       Root folder (default: public/images).
 *   --concurrency <n>  Parallel uploads (default: 3).
 */

import { put } from "@vercel/blob";
import fs from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);

const MULTIPART_MIN_BYTES = 95 * 1024 * 1024;

function loadEnvLocal() {
  const p = path.join(PROJECT_ROOT, ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function parseArgs(argv) {
  const dryRun = argv.includes("--dry-run");
  let out = null;
  let root = path.join(PROJECT_ROOT, "public", "images");
  let concurrency = 3;
  const outIdx = argv.indexOf("--out");
  if (outIdx !== -1 && argv[outIdx + 1]) out = argv[outIdx + 1];
  const rootIdx = argv.indexOf("--root");
  if (rootIdx !== -1 && argv[rootIdx + 1]) {
    root = path.isAbsolute(argv[rootIdx + 1])
      ? argv[rootIdx + 1]
      : path.join(PROJECT_ROOT, argv[rootIdx + 1]);
  }
  const concIdx = argv.indexOf("--concurrency");
  if (concIdx !== -1 && argv[concIdx + 1]) {
    const n = Number.parseInt(argv[concIdx + 1], 10);
    if (Number.isFinite(n) && n >= 1) concurrency = n;
  }
  return { dryRun, out, root, concurrency };
}

async function walkFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walkFiles(p)));
    } else {
      out.push(p);
    }
  }
  return out;
}

function pathnameForBlob(absFile, publicRoot) {
  const rel = path.relative(publicRoot, absFile).replace(/\\/g, "/");
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`File outside public root: ${absFile}`);
  }
  return rel;
}

function webPathFromPublicRel(publicRel) {
  return `/${publicRel.replace(/\\/g, "/")}`;
}

async function uploadOne(absFile, publicRoot) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "Missing BLOB_READ_WRITE_TOKEN. Add it to .env.local or export it in the shell.",
    );
  }

  const blobPathname = pathnameForBlob(absFile, publicRoot);
  const st = await stat(absFile);
  const body = await readFile(absFile);
  const ext = path.extname(absFile).toLowerCase();
  const contentType =
    ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".gif"
            ? "image/gif"
            : ext === ".avif"
              ? "image/avif"
              : ext === ".svg"
                ? "image/svg+xml"
                : undefined;

  const result = await put(blobPathname, body, {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    multipart: st.size >= MULTIPART_MIN_BYTES,
    ...(contentType ? { contentType } : {}),
  });

  return result;
}

async function pool(items, concurrency, fn) {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx], idx);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
}

async function main() {
  loadEnvLocal();
  const { dryRun, out, root, concurrency } = parseArgs(process.argv.slice(2));

  const publicRoot = path.join(PROJECT_ROOT, "public");
  if (!fs.existsSync(root)) {
    console.error(`Folder not found: ${root}`);
    process.exit(1);
  }

  const allFiles = await walkFiles(root);
  const imageFiles = allFiles.filter((f) =>
    IMAGE_EXT.has(path.extname(f).toLowerCase()),
  );
  imageFiles.sort();

  console.error(
    `Found ${imageFiles.length} image file(s) under ${path.relative(PROJECT_ROOT, root) || "."}`,
  );

  if (dryRun) {
    for (const f of imageFiles) {
      const rel = pathnameForBlob(f, publicRoot);
      console.log(rel);
    }
    return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      "BLOB_READ_WRITE_TOKEN is not set. Add it to .env.local (see script header).",
    );
    process.exit(1);
  }

  const manifest = {};
  let done = 0;

  await pool(imageFiles, concurrency, async (absFile) => {
    const rel = pathnameForBlob(absFile, publicRoot);
    const webPath = webPathFromPublicRel(rel);
    process.stderr.write(`[${++done}/${imageFiles.length}] ${rel}\n`);
    const { url } = await uploadOne(absFile, publicRoot);
    manifest[webPath] = url;
  });

  if (out) {
    const outAbs = path.isAbsolute(out) ? out : path.join(PROJECT_ROOT, out);
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    const sorted = Object.fromEntries(
      Object.keys(manifest)
        .sort()
        .map((k) => [k, manifest[k]]),
    );
    fs.writeFileSync(outAbs, JSON.stringify(sorted, null, 2), "utf8");
    console.error(`Wrote manifest: ${outAbs}`);
  }

  console.error("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
