"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
  const pathname = usePathname();

  const isGalleries = pathname === "/galleries";
  const isPrestations = pathname === "/prestations" || pathname.startsWith("/prestations/");
  const isAbout = pathname === "/about";

  return (
    <nav className="hidden items-center gap-6 text-base font-medium md:flex">
      <Link
        href="/galleries"
        aria-current={isGalleries ? "page" : undefined}
        className={isGalleries ? "underline decoration-1 underline-offset-4" : ""}
      >
        Galeries photos
      </Link>

      <div className="group relative">
        <Link
          href="/prestations"
          aria-current={isPrestations ? "page" : undefined}
          className="flex items-center gap-2 py-2"
        >
          <span className={isPrestations ? "underline decoration-1 underline-offset-4" : ""}>
            Prestations
          </span>

          <span className="text-sm leading-none transition-transform duration-200 group-hover:rotate-180">
            ⌄
          </span>
        </Link>

        <div className="invisible absolute top-full right-0 z-50 w-max pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="bg-white">
            <Link
              href="/prestations/evenements-sportifs"
              aria-current={pathname === "/prestations/evenements-sportifs" ? "page" : undefined}
              className={`block whitespace-nowrap px-2 py-1.5 text-right ${
                pathname === "/prestations/evenements-sportifs" ? "underline decoration-1 underline-offset-4" : ""
              }`}
            >
              Événements sportifs
            </Link>

            <Link
              href="/prestations/reportage-outdoor"
              aria-current={pathname === "/prestations/reportage-outdoor" ? "page" : undefined}
              className={`block whitespace-nowrap px-2 py-1.5 text-right ${
                pathname === "/prestations/reportage-outdoor" ? "underline decoration-1 underline-offset-4" : ""
              }`}
            >
              Reportage outdoor
            </Link>

            <Link
              href="/prestations/communication-entreprise"
              aria-current={pathname === "/prestations/communication-entreprise" ? "page" : undefined}
              className={`block whitespace-nowrap px-2 py-1.5 text-right ${
                pathname === "/prestations/communication-entreprise" ? "underline decoration-1 underline-offset-4" : ""
              }`}
            >
              Communication & entreprise
            </Link>
          </div>
        </div>
      </div>

      <Link
        href="/about"
        aria-current={isAbout ? "page" : undefined}
        className={isAbout ? "underline decoration-1 underline-offset-4" : ""}
      >
        À propos
      </Link>

      <div className="flex items-center gap-5">
        <a
          href="https://www.instagram.com/felix_larrouy/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Instagram"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="text-sm font-bold normal-case leading-none"
        >
          <span aria-hidden="true">in</span>
        </a>
        <a
          href="mailto:felix.larrouy@gmail.com"
          aria-label="Email"
          title="Email"
          className="text-base font-semibold normal-case"
        >
          <span aria-hidden="true">@</span>
        </a>
      </div>
    </nav>
  );
}
