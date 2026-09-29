import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  heroSrc: string;
};

export function GalleryCard({ slug, title, heroSrc }: Props) {
  return (
    <Link
      href={`/galleries/${slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden border-3 border-black bg-neutral-100 shadow-xl md:aspect-[2/3]">
        <Image
          src={heroSrc}
          alt={title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 ease-out md:group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-end justify-start bg-gradient-to-t from-black/80 via-black/25 to-transparent px-4 pb-5 text-left opacity-100 transition duration-300 ease-out md:items-center md:justify-center md:bg-white/95 md:bg-none md:px-4 md:pb-0 md:text-center md:opacity-0 md:group-hover:opacity-100"
        >
          <h2 className="text-sm font-medium text-white md:text-xl md:text-neutral-900">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
