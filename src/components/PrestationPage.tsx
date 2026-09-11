import Image from "next/image";
import Link from "next/link";
import { RowsPhotoAlbum } from "react-photo-album";

type PrestationPhoto = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

type PrestationPageProps = {
  number: string;
  title: string;
  intro: string;
  description: string;
  heroImage: {
    src: string;
    alt: string;
  };
  photos: PrestationPhoto[];
  contactTitle: string;
  contactText: string;
};

export function PrestationPage({
  number,
  title,
  intro,
  description,
  heroImage,
  photos,
  contactTitle,
  contactText,
}: PrestationPageProps) {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.25em] text-neutral-500 uppercase dark:text-neutral-400">
            {number} — Prestations
          </p>

          <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="mt-6 leading-7 text-neutral-600 dark:text-neutral-300">
            {intro}
          </p>

          <p className="mt-4 leading-7 text-neutral-600 dark:text-neutral-300">
            {description}
          </p>
        </div>

        <div className="relative aspect-[1/1] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Examples */}
      <section>
        <div className="mb-8">
          <h2 className="mt-3 text-2xl font-medium tracking-tight">
            Quelques images
          </h2>
        </div>

        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={320}
          padding={0}
          spacing={2}
          rowConstraints={{ minPhotos: 2, maxPhotos: 3 }}
        />
      </section>

      {/* Contact */}
      <section className="border-t border-black/10 pt-12 dark:border-white/10">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight">
            {contactTitle}
          </h2>

          <p className="mt-4 leading-7 text-neutral-600 dark:text-neutral-300">
            {contactText}
          </p>

          <Link
            href="/about"
            className="mt-6 inline-block text-xs font-medium tracking-[0.2em] uppercase underline underline-offset-4 hover:opacity-60"
          >
            Me contacter →
          </Link>
        </div>
      </section>
    </div>
  );
}