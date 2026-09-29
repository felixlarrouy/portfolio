import { PhotoGallery } from "@/components/PhotoGallery";
import manifest from "@/data/photo-manifest.json";

export default function Home() {
  return (
    <div id="top" className="space-y-8">
      <PhotoGallery photos={manifest.home} />
    </div>
  );
}
