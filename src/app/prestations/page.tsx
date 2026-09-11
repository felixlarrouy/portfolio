import Image from "next/image";
import Link from "next/link";

const prestations = [
  {
    number: "01",
    title: "Événements sportifs",
    description:
      "Trail, cyclisme, ski, outdoor et autres événements sportifs. Des images dynamiques et naturelles pour documenter l’événement et mettre en valeur les participants.",
    image: "/images/prestations/evenements-sportifs/hero.webp",
    href: "/prestations/evenements-sportifs",
  },
  {
    number: "02",
    title: "Reportage outdoor",
    description:
      "Randonnée, montagne, aventure et activités de plein air. Des images qui retranscrivent l’ambiance, les paysages et l’expérience vécue sur le terrain.",
    image: "/images/prestations/reportage-outdoor/hero.webp",
    href: "/prestations/reportage-outdoor",
  },
  {
    number: "03",
    title: "Communication & entreprise",
    description:
      "Photographies destinées à votre site internet, vos réseaux sociaux ou vos supports de communication, adaptées à votre activité et à votre image.",
    image: "/images/prestations/communication-entreprise/hero.webp",
    href: "/prestations/communication-entreprise",
  },
];

export default function PrestationsPage() {
  return (
    <div className="space-y-16">
      <section className="max-w-3xl">
        <p className="mb-4 text-xs font-medium tracking-[0.25em] text-neutral-500 uppercase dark:text-neutral-400">
          Prestations
        </p>

        <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={prestation.image}
                alt={prestation.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs tracking-[0.2em] text-neutral-500 uppercase dark:text-neutral-400">
                {prestation.number}
              </p>

              <h2 className="text-xl font-medium tracking-tight">
                {prestation.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {prestation.description}
              </p>

              <p className="mt-4 text-xs font-medium tracking-[0.2em] uppercase underline underline-offset-4">
                Découvrir →
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}