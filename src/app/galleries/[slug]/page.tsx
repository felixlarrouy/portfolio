import { notFound } from "next/navigation";
import Link from "next/link";
import { galleries } from "@/data/galleries";
import { RowsGallery } from "@/components/RowsGallery";

type PageProps = {
  params: Promise<{ slug: keyof typeof galleries }>;
};

export function generateStaticParams() {
  return Object.keys(galleries).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const gallery = galleries[slug];

  if (!gallery) return {};

  return {
    title: `${gallery.title} | Photography Portfolio`,
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { slug } = await params;

  const gallery = galleries[slug];

  if (!gallery) {
    notFound();
  }

  return (
    <div className="min-w-0 space-y-10">
      <header className="flex min-w-0 flex-col gap-6">
        <Link
          href="/galleries"
          className="self-start text-[11px] uppercase tracking-[0.25em] text-neutral-500 hover:text-black"
        >
          ← Retour aux galeries
        </Link>

        <div className="min-w-0 space-y-8 text-center">
          <h1 
            className="mx-auto w-fit max-w-xl text-2xl font-bold uppercase tracking-[0.12em]"
            style={{ textAlign: "center" }}
          >
            {gallery.title}
          </h1>
          <div
            className="mx-auto box-border min-w-0 text-center"
            style={{
              width: "min(100%, 44rem)",
              textAlign: "center",
            }}
          >
            <p
              className="w-full text-center text-lg leading-relaxed text-neutral-600"
              style={{ textAlign: "center" }}
            >
              {"introInlineLink" in gallery && gallery.introInlineLink ? (
                <>
                  {gallery.introInlineLink.before}
                  <a
                    href={gallery.introInlineLink.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 underline decoration-neutral-400 underline-offset-2 transition hover:text-black"
                  >
                    {gallery.introInlineLink.link.label}
                  </a>
                  {gallery.introInlineLink.after}
                </>
              ) : (
                <>
                  {"intro" in gallery ? gallery.intro : null}
                  {"introLink" in gallery && gallery.introLink ? (
                    <>
                      {" "}
                      <a
                        href={gallery.introLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-800 underline decoration-neutral-400 underline-offset-2 transition hover:text-black"
                      >
                        {gallery.introLink.label}
                      </a>
                    </>
                  ) : null}
                </>
              )}
            </p>
          </div>
        </div>
      </header>

    <RowsGallery slug={slug} />
    </div>
  );
}