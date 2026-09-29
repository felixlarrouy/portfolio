import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const cacheControl = "public, max-age=31536000, immutable";

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
