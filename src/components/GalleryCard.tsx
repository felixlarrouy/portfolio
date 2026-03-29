"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  slug: string;
  title: string;
  heroSrc: string;
};

export function GalleryCard({ slug, title, heroSrc }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/galleries/${slug}`}
      className="block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-neutral-100 shadow-xl">
        <Image
          src={heroSrc}
          alt={title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className={`object-cover transition duration-300 ease-out ${
            hover ? "scale-105" : "scale-100"
          }`}
        />
        {/* Opacity via inline style so hover works regardless of Tailwind group variants */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center transition duration-300 ease-out"
          style={{
            opacity: hover ? 1 : 0,
            backgroundColor: hover
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 0)",
          }}
          aria-hidden={!hover}
        >
          <h2 
            className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-900"
            style={{ textAlign: "center" }}
          >
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
