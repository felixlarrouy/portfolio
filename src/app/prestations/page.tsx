import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prestations photo | Félix Larrouy Photographie",
  description: "Reportages photo pour événements sportifs, activités outdoor et communication d'entreprise autour d'Annecy.",
};

const prestations = [
  {
    number: "01",
    title: "Événements sportifs",
    description:
      "Couverture photo de compétitions de trail, cyclisme, triathlon, ski et autres événements sportifs. Je produis des images dynamiques et naturelles pour documenter l’événement et mettre en valeur l’organisation et les participants.",
    image: "/images/prestations/evenements-sportifs/hero.webp",
    href: "/prestations/evenements-sportifs",
  },
  {
    number: "02",
    title: "Reportage outdoor",
    description:
      "Des photos au cœur de votre social run/ride, de votre expédition (alpinisme, ski de rando...) ou de tout autre événement, avec des images qui retranscrivent l'ambiance, les paysages et l'expérience vécue sur le terrain.",
    image: "/images/prestations/reportage-outdoor/hero.webp",
    href: "/prestations/reportage-outdoor",
  },
  {
    number: "03",
    title: "Communication & entreprise",
    description:
      "Shooting de produits de votre marque en conditions réelles, mise en avant des services de votre entreprise : je vous livre des photos adaptées à votre activité et à votre image, destinées à votre site internet et à vos réseaux sociaux.",
    image: "/images/prestations/communication-entreprise/hero.webp",
    href: "/prestations/communication-entreprise",
  },
];

export default function PrestationsPage() {
  return (
    <div className="space-y-16">
      <section className="max-w-3xl">
        <p className="mb-4 text-xs font-medium text-neutral-500">
          Prestations
        </p>

        <h1 className="text-4xl font-medium md:text-5xl">
          Des images pour raconter votre projet.
        </h1>
      </section>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {prestations.map((prestation) => (
          <Link
            key={prestation.number}
            href={prestation.href}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden border-3 border-black bg-neutral-100">
              <Image
                src={prestation.image}
                alt={prestation.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs text-neutral-500">
                {prestation.number}
              </p>

              <h2 className="text-xl font-medium">
                {prestation.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {prestation.description}
              </p>

              <p className="mt-4 text-xs font-medium underline underline-offset-4">
                Découvrir →
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}