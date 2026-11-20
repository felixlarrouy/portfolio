
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function FloatingGalleryBackButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Afficher le bouton uniquement sur les pages de galeries individuelles
    const isGalleryPage = /^\/galleries\/[^/]+\/?$/.test(pathname);

    if (!isGalleryPage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY >= 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Link
        href="/galleries"
        tabIndex={isVisible ? 0 : -1}
        aria-hidden={!isVisible}
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-5 py-3 text-sm font-medium text-black shadow-md backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        Retour aux galeries
      </Link>
    </div>
  );
}
