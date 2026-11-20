
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderNav } from "@/components/HeaderNav";
import { MobileMenu } from "@/components/MobileMenu";

export function SiteHeader() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      if (currentScrollY <= 32) {
        setIsCompact(false);
      } else if (currentScrollY > 80) {
        setIsCompact(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-[padding] duration-350 ease-in-out ${
        isCompact ? "py-2" : "pt-4 md:pt-10"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between items-center gap-4">

          <div className="flex flex-col justify-center">
            <Link
              href="/"
              className={`font-medium transition-[font-size] duration-350 ease-in-out ${
                isCompact ? "text-xl" : "text-3xl"
              }`}
            >
              Félix Larrouy
            </Link>

            <div
              className={`overflow-hidden text-sm font-medium text-neutral-500 transition-[max-height,opacity] duration-350 ease-in-out ${
                isCompact
                  ? "max-h-0 opacity-0 mb-0"
                  : "max-h-6 opacity-100 mb-4"
              }`}
            >
              <p>Photographe outdoor basé à Annecy, France</p>
            </div>
          </div>

          <HeaderNav />
          <MobileMenu />

        </div>
      </div>
    </header>
  );
}
