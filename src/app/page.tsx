
import type { Metadata } from "next";
import { PhotoGallery } from "@/components/PhotoGallery";
import manifest from "@/data/photo-manifest.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Félix Larrouy Photographie",
  description: "Photographe outdoor à Annecy.",
};

function shufflePhotos<T>(photos: T[]): T[] {
  const shuffled = [...photos];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function Home() {
  const shuffledPhotos = shufflePhotos(manifest.home);

  return (
    <div id="top" className="space-y-8">
      <PhotoGallery photos={shuffledPhotos} />
    </div>
  );
}
