import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ImageContextMenuGuard } from "@/components/ImageContextMenuGuard";
import "./globals.css";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import { HeaderNav } from "@/components/HeaderNav";
import { MobileMenu } from "@/components/MobileMenu";
import { socialLinks } from "@/data/socialLinks";

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
          <header className="relative z-40 bg-white pt-4 md:pt-10">
            <div className="mx-auto max-w-6xl px-6">

              {/* Header principal */}
              <div className="flex items-start justify-between gap-4">
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
                  href={socialLinks.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLinks.linkedin.label}
                  title={socialLinks.linkedin.label}
                  className="inline-flex items-center justify-center text-[1.25rem] font-bold normal-case leading-none"
                >
                  <span aria-hidden="true">{socialLinks.linkedin.text}</span>
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
          </footer>
        </div>
      </body>
    </html>
  );
}