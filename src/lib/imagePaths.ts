export function getThumbnailSrc(src: string): string {
  if (!src.startsWith("/images/")) return src;

  const relativePath = src
    .slice("/images/".length)
    .replace(/\.[^.]+$/, "");

  return `/images-thumbnails/${relativePath}.webp`;
}