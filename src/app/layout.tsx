import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ImageContextMenuGuard } from "@/components/ImageContextMenuGuard";
import "./globals.css";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import { HeaderNav } from "@/components/HeaderNav";
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
                <div className="flex flex-col">
                  <Link
                    href="/"
                    className="text-3xl font-medium"
                  >
                    Félix Larrouy
                  </Link>
                  <div className="text-sm font-medium text-neutral-500">
                    <p>Photographe outdoor basé à Annecy, France</p>
                  </div>
                </div>

                {/* Navigation desktop */}
                <HeaderNav />

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

          <footer className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-6">
              <div className="flex items-center justify-center gap-6 text-black">
                <a
                  href="https://www.instagram.com/felix_larrouy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="inline-flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
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
                  className="inline-flex items-center justify-center text-[1.25rem] font-bold normal-case leading-none"
                >
                  <span aria-hidden="true">in</span>
                </a>

                <a
                  href="mailto:felix.larrouy@gmail.com"
                  aria-label="Email"
                  title="Email"
                  className="inline-flex items-center justify-center text-[1.5rem] font-semibold normal-case"
                >
                  <span aria-hidden="true">@</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}