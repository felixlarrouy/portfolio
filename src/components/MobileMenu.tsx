"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
      >
        <span className="text-xl leading-none">
          {open ? "×" : "☰"}
        </span>
      </button>

      {open && (
        <nav className="absolute inset-x-0 left-0 z-50 border-t border-black/5 bg-white px-6 py-6 dark:border-white/10 dark:bg-black">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 text-xs font-medium tracking-[0.25em] uppercase">

            <Link
              href="/galleries"
              onClick={closeMenu}
              className="py-2 hover:opacity-60"
            >
              Galeries photos
            </Link>

            <div className="flex flex-col gap-4">
              <Link
                href="/prestations"
                onClick={closeMenu}
                className="py-2 hover:opacity-60"
              >
                Prestations
              </Link>

              <div className="ml-4 flex flex-col gap-4 border-l border-black/10 pl-4 text-[11px] tracking-[0.15em] dark:border-white/10">

                <Link
                  href="/prestations/evenements-sportifs"
                  onClick={closeMenu}
                  className="hover:opacity-60"
                >
                  Événements sportifs
                </Link>

                <Link
                  href="/prestations/reportage-outdoor"
                  onClick={closeMenu}
                  className="hover:opacity-60"
                >
                  Reportage outdoor
                </Link>

                <Link
                  href="/prestations/communication-entreprise"
                  onClick={closeMenu}
                  className="hover:opacity-60"
                >
                  Communication & entreprise
                </Link>

              </div>
            </div>

            <Link
              href="/about"
              onClick={closeMenu}
              className="py-2 hover:opacity-60"
            >
              À propos / Contact
            </Link>

          </div>
        </nav>
      )}
    </div>
  );
}