import type { Metadata } from "next";

import { PrestationPage } from "@/components/PrestationPage";
import manifest from "@/data/photo-manifest.json";

export const metadata: Metadata = {
  title: "Photographe sportif à Annecy | Événements & outdoor",
  description:
    "Photographe outdoor basé en Haute-Savoie, spécialisé dans les reportages en montagne, aventure, randonnée, trail et sports outdoor. Annecy, Savoie et Alpes.",
};

const photos = manifest.prestations["reportage-outdoor"].map((photo) => ({
    ...photo,
    alt: "Photographie outdoor en montagne",
  }));

export default function Page() {
  return (
    <PrestationPage
      number="02"
      title="Reportage outdoor"
      intro="Je réalise des reportages photo en montagne et en pleine nature pour raconter des aventures, des expéditions, des pratiques sportives et des projets outdoor. J'aime y retranscire l'action, l'environnement mais aussi les moments de vie avec la passion qui me caractérise."
      description="Je m'adapte aux contraintes du terrain pour créer des images immersives qui retranscrivent l'expérience vécue."
      heroImage={{
        src: "/images/prestations/reportage-outdoor/hero.webp",
        alt: "Reportage photographique outdoor en montagne",
      }}
      photos={photos}
      contentSections={[
        {
          title: "Être au coeur de votre événement ou de votre projet",
          text: "Mon expérience sportive me permet de suivre les participants et de m'adapter aux contraintes du terrain pour créer des images immersives et naturelles, avec pour but d'être au plus proche de l'action.",
        },
      ]}
      contactTitle="Vous avez un projet outdoor ?"
      contactText="Vous souhaitez raconter une aventure, mettre en valeur une activité ou créer des images pour un projet en montagne ? Contactez-moi pour échanger sur votre projet."
    />
  );
}