import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ImageContextMenuGuard } from "@/components/ImageContextMenuGuard";
import "./globals.css";
import "react-photo-album/rows.css";

export const metadata: Metadata = {
  title: "Photography Portfolio",
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
          <header className="border-b border-black/5 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
              <Link
                href="/"
                className="text-sm font-semibold tracking-[0.2em] uppercase"
              >
                Félix Larrouy
              </Link>
              <nav className="flex items-center gap-6 text-xs font-medium tracking-[0.25em] uppercase">
                <Link href="/galleries" className="hover:opacity-60">
                  Galeries photos
                </Link>
                <Link href="/about" className="hover:opacity-60">
                  À propos / Contact
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
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
