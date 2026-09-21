import { GalleryCard } from "@/components/GalleryCard";
import { galleries } from "@/data/galleries";

export default function GalleriesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="max-w-xl text-base text-neutral-600">
          Cliquez sur une galerie pour découvrir l&apos;ensemble des photos.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
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

