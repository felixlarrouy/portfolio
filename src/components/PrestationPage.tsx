"use client";

import Image from "next/image";
import Link from "next/link";
import { RowsPhotoAlbum } from "react-photo-album";

type PrestationPhoto = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

type ContentSection = {
  title: string;
  text: string;
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
  contentSections: ContentSection[];
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
  contentSections,
  contactTitle,
  contactText,
}: PrestationPageProps) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start md:gap-16">
        <div className="self-start">
          <p className="mb-4 text-sm font-medium text-neutral-500">
            {number} — Prestations
          </p>
          <h1 className="text-4xl font-medium md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 leading-7 text-neutral-600">
            {intro}
          </p>
          <p className="mt-4 leading-7 text-neutral-600">
            {description}
          </p>

          {/* Content */}
          <section className="max-w-3xl space-y-8 mt-8">
            {contentSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-medium">
                  {section.title}
                </h2>

                <p className="mt-2 leading-7 text-neutral-600">
                  {section.text}
                </p>
              </div>
            ))}
          </section>

        </div>

        <div className="relative aspect-[2/3] overflow-hidden border-3 border-dark bg-neutral-100 md:self-start">
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
      <section className="pt-1">
        <div className="mb-8">
          <h2 className="text-2xl font-medium">
            Quelques images
          </h2>
        </div>

        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={320}
          padding={(containerWidth) => (containerWidth < 768 ? 3 : 5)}
          spacing={(containerWidth) => (containerWidth < 768 ? 10 : 25)}
          rowConstraints={{ minPhotos: 2, maxPhotos: 2 }}
          componentsProps={{
            image: { className: "border-3 border-dark" },
          }}
        />
      </section>

      {/* Contact */}
      <section>
        <div className="max-w-2xl">
            <h2 className="text-2xl font-medium">
            {contactTitle}
          </h2>

          <p className="mt-4 leading-7 text-neutral-600">
            {contactText}
          </p>

          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-medium underline underline-offset-4 hover:opacity-60"
          >
            Me contacter →
          </Link>
        </div>
      </section>
    </div>
  );
}