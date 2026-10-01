"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { socialLinks } from "@/data/socialLinks";

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isPortfolio = pathname === "/";
  const isGalleries = pathname === "/galleries" || pathname.startsWith("/galleries/");
  const isPrestations = pathname === "/prestations" || pathname.startsWith("/prestations/");
  const isAbout = pathname === "/about";

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative z-[60] flex h-8 w-8 items-center justify-center"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
      >
        <span className="text-2xl leading-none">
          {open ? "×" : "☰"}
        </span>
      </button>

      {open && createPortal(
        <nav className="fixed inset-0 z-[35] flex items-center justify-center bg-white px-6 pt-20">
          <div className="relative flex h-full w-full items-center justify-center text-center">
            <div className="flex flex-col items-center gap-10">

            <Link
              href="/"
              onClick={closeMenu}
              aria-current={isPortfolio ? "page" : undefined}
              className={`text-3xl font-semibold hover:opacity-60 ${isPortfolio ? "underline decoration-1 underline-offset-4" : ""}`}
            >
              Portfolio
            </Link>

            <Link
              href="/galleries"
              onClick={closeMenu}
              aria-current={isGalleries ? "page" : undefined}
              className={`text-3xl font-semibold hover:opacity-60 ${isGalleries ? "underline decoration-1 underline-offset-4" : ""}`}
            >
              Galeries photos
            </Link>

            <div className="flex flex-col items-center gap-5">
              <Link
                href="/prestations"
                onClick={closeMenu}
                aria-current={isPrestations ? "page" : undefined}
                className={`text-3xl font-semibold hover:opacity-60 ${isPrestations ? "underline decoration-1 underline-offset-4" : ""}`}
              >
                Prestations
              </Link>

              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/prestations/evenements-sportifs"
                  onClick={closeMenu}
                  aria-current={pathname === "/prestations/evenements-sportifs" ? "page" : undefined}
                  className={`text-sm font-semibold text-neutral-600 hover:text-black ${pathname === "/prestations/evenements-sportifs" ? "underline decoration-1 underline-offset-4" : ""}`}
                >
                  Événements sportifs
                </Link>

                <Link
                  href="/prestations/reportage-outdoor"
                  onClick={closeMenu}
                  aria-current={pathname === "/prestations/reportage-outdoor" ? "page" : undefined}
                  className={`text-sm font-semibold text-neutral-600 hover:text-black ${pathname === "/prestations/reportage-outdoor" ? "underline decoration-1 underline-offset-4" : ""}`}
                >
                  Reportage outdoor
                </Link>

                <Link
                  href="/prestations/communication-entreprise"
                  onClick={closeMenu}
                  aria-current={pathname === "/prestations/communication-entreprise" ? "page" : undefined}
                  className={`text-sm font-semibold text-neutral-600 hover:text-black ${pathname === "/prestations/communication-entreprise" ? "underline decoration-1 underline-offset-4" : ""}`}
                >
                  Communication & entreprise
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              onClick={closeMenu}
              aria-current={isAbout ? "page" : undefined}
              className={`text-3xl font-semibold hover:opacity-60 ${isAbout ? "underline decoration-1 underline-offset-4" : ""}`}
            >
              À propos
            </Link>

            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-8">
              <a
                href={socialLinks.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label={socialLinks.instagram.label}
                title={socialLinks.instagram.label}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              {/* <a
                href={socialLinks.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label={socialLinks.linkedin.label}
                title={socialLinks.linkedin.label}
                className="text-lg font-bold leading-none"
              >
                <span aria-hidden="true">{socialLinks.linkedin.text}</span>
              </a> */}
              <a
                href={socialLinks.email.href}
                onClick={closeMenu}
                aria-label={socialLinks.email.label}
                title={socialLinks.email.label}
                className="text-xl font-semibold leading-none"
              >
                <span aria-hidden="true">{socialLinks.email.text}</span>
              </a>
            </div>

          </div>
        </nav>,
        document.body,
      )}
    </div>
  );
}