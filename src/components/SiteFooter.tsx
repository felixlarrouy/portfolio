"use client";

import { usePathname } from "next/navigation";
import { socialLinks } from "@/data/socialLinks";

export function SiteFooter() {
  const pathname = usePathname();

  const isGalleryPage =
    pathname === "/galleries" ||
    pathname.startsWith("/galleries/");

  const buttonHref = isGalleryPage ? "/prestations" : "/galleries";

  const buttonLabel = isGalleryPage
    ? "Prestations photos"
    : "Découvrir les galeries photos";

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center gap-6">

          <a
            href={buttonHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-black"
          >
            {buttonLabel}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="flex items-center justify-center gap-6 text-black">
            <a
              href={socialLinks.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLinks.instagram.label}
              title={socialLinks.instagram.label}
              className="inline-flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>

            <a
              href={socialLinks.email.href}
              aria-label={socialLinks.email.label}
              title={socialLinks.email.label}
              className="inline-flex items-center justify-center text-[1.5rem] font-semibold normal-case"
            >
              <span aria-hidden="true">{socialLinks.email.text}</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}