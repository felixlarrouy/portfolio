"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

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

      {open && (
        <nav className="fixed inset-x-0 top-16 bottom-0 z-50 flex items-center justify-center bg-white px-6">
          <div className="relative flex h-full w-full items-center justify-center text-center">
            <div className="flex flex-col items-center gap-10">

            <Link
              href="/galleries"
              onClick={closeMenu}
              className="text-xl font-bold tracking-[0.12em] uppercase hover:opacity-60"
            >
              Galeries photos
            </Link>

            <div className="flex flex-col items-center gap-5">
              <Link
                href="/prestations"
                onClick={closeMenu}
                className="text-xl font-bold tracking-[0.12em] uppercase hover:opacity-60"
              >
                Prestations
              </Link>

              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/prestations/evenements-sportifs"
                  onClick={closeMenu}
                  className="text-sm font-semibold tracking-[0.1em] uppercase text-neutral-600 hover:text-black"
                >
                  Événements sportifs
                </Link>

                <Link
                  href="/prestations/reportage-outdoor"
                  onClick={closeMenu}
                  className="text-sm font-semibold tracking-[0.1em] uppercase text-neutral-600 hover:text-black"
                >
                  Reportage outdoor
                </Link>

                <Link
                  href="/prestations/communication-entreprise"
                  onClick={closeMenu}
                  className="text-sm font-semibold tracking-[0.1em] uppercase text-neutral-600 hover:text-black"
                >
                  Communication & entreprise
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              onClick={closeMenu}
              className="text-xl font-bold tracking-[0.12em] uppercase hover:opacity-60"
            >
              À propos
            </Link>

            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-8">
              <a
                href="https://www.instagram.com/felix_larrouy/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label="Instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label="LinkedIn"
                title="LinkedIn"
                className="text-lg font-bold leading-none"
              >
                <span aria-hidden="true">in</span>
              </a>
              <a
                href="mailto:felix.larrouy@gmail.com"
                onClick={closeMenu}
                aria-label="Email"
                title="Email"
                className="text-xl font-semibold leading-none"
              >
                <span aria-hidden="true">@</span>
              </a>
            </div>

          </div>
        </nav>
      )}
    </div>
  );
}