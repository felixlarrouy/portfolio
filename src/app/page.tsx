"use client";

import { HomeGallery } from "@/components/HomeGallery";

export default function Home() {
  return (
    <div id="top" className="space-y-8">
      <section className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-neutral-500">
            Photographe professionnel
          </p>
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-neutral-500">
            Basé à Annecy, France
          </p>
        </div>
      </section>
      <HomeGallery />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-4 inline-flex items-center justify-center bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-700 transition hover:text-black cursor-pointer"
      >
        Retour en haut de page
      </button>
    </div>
  );
}
