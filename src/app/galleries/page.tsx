import { GalleryCard } from "@/components/GalleryCard";
import { galleries } from "@/data/galleries";

export default function GalleriesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight">
          Galeries photos
        </h1>
        <p className="max-w-xl text-sm text-neutral-600">
          Cliquez sur une galerie pour découvrir l&apos;ensemble des photos.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {Object.entries(galleries).map(([slug, gallery]) => (
          <GalleryCard
            key={slug}
            slug={slug}
            title={gallery.title}
            heroSrc={gallery.heroSrc}
          />
        ))}
      </section>
    </div>
  );
}

