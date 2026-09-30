import type { Metadata } from "next";
import { PhotoGallery } from "@/components/PhotoGallery";
import manifest from "@/data/photo-manifest.json";

export const metadata: Metadata = {
  title: "Felix Larrouy Photographie",
  description: "Photographe outdoor à Annecy.",
};

export default function Home() {
  return (
    <div id="top" className="space-y-8">
      <PhotoGallery photos={manifest.home} />
    </div>
  );
}
