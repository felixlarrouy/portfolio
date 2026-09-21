import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ImageContextMenuGuard } from "@/components/ImageContextMenuGuard";
import "./globals.css";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import { MobileMenu } from "@/components/MobileMenu";

export const metadata: Metadata = {
  title: "Felix Larrouy Photographie",
  description: "Minimal portfolio to showcase photography work.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <ImageContextMenuGuard />

        <div className="flex min-h-screen flex-col">
          <header className="bg-white pt-4 md:pt-10">
            <div className="mx-auto max-w-6xl px-6">

              {/* Header principal */}
              <div className="flex h-16 items-center justify-between">
                <Link
                  href="/"
                  className="text-sm font-semibold tracking-[0.2em] uppercase"
                >
                  Félix Larrouy
                </Link>

                {/* Navigation desktop */}
                <nav className="hidden items-center gap-6 text-xs font-medium tracking-[0.25em] uppercase md:flex">
                  <Link
                    href="/galleries"
                    className="hover:opacity-60"
                  >
                    Galeries photos
                  </Link>

                  {/* Prestations + sous-menu */}
                  <div className="group relative">
                    <Link
                      href="/prestations"
                      className="flex items-center gap-2 py-2 hover:opacity-60"
                    >
                      Prestations

                      <span className="text-sm leading-none transition-transform duration-200 group-hover:rotate-180">
                        ⌄
                      </span>
                    </Link>

                    {/* Sous-menu */}
                    <div className="invisible absolute top-full left-0 z-50 w-64 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="border border-black/5 bg-white p-2 shadow-lg">

                        <Link
                          href="/prestations/evenements-sportifs"
                          className="block px-4 py-3 tracking-[0.15em] hover:bg-neutral-100"
                        >
                          Événements sportifs
                        </Link>

                        <Link
                          href="/prestations/reportage-outdoor"
                          className="block px-4 py-3 tracking-[0.15em] hover:bg-neutral-100"
                        >
                          Reportage outdoor
                        </Link>

                        <Link
                          href="/prestations/communication-entreprise"
                          className="block px-4 py-3 tracking-[0.15em] hover:bg-neutral-100"
                        >
                          Communication & entreprise
                        </Link>

                      </div>
                    </div>
                  </div>

                  <Link
                    href="/about"
                    className="hover:opacity-60"
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
                      className="text-sm font-bold normal-case leading-none tracking-normal"
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

                {/* Menu mobile */}
                <MobileMenu />

              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-6 py-10">
              {children}
            </div>
          </main>

          <footer className="border-t border-black/5 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs text-neutral-500">
              <span>
                © {new Date().getFullYear()} Félix Larrouy. Tous droits
                réservés.
              </span>

              <span className="tracking-[0.25em] uppercase">
                Photographe professionnel
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}