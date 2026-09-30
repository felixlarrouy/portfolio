import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
  async headers() {
    const cacheControl = process.env.NODE_ENV === "development"
      ? "no-store"
      : "public, max-age=31536000, immutable";

    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: cacheControl }],
      },
      {
        source: "/images-thumbnails/:path*",
        headers: [{ key: "Cache-Control", value: cacheControl }],
      },
    ];
  },
};

export default nextConfig;
