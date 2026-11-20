import type { Metadata, Viewport } from "next";
import { ImageContextMenuGuard } from "@/components/ImageContextMenuGuard";
import "./globals.css";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingGalleryCTA } from "@/components/FloatingGalleryCTA";
import { FloatingGalleryBackButton } from "@/components/FloatingGalleryBackButton";

export const metadata: Metadata = {
  title: "Félix Larrouy Photographie",
  description: "Photographe outdoor et aventure autour d'Annecy.",
  metadataBase: new URL("https://www.felixlarrouy-photographie.com"),
  openGraph: {
    images: ["FL-Logo.png"],
  },
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
    <html lang="fr">
      <body className="bg-white text-black antialiased">
        <ImageContextMenuGuard />

        <div className="flex min-h-screen flex-col">
          <SiteHeader />

          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-6 py-10">
              {children}
            </div>
          </main>

          <SiteFooter />
          <FloatingGalleryCTA />
          <FloatingGalleryBackButton />
        </div>
      </body>
    </html>
  );
}