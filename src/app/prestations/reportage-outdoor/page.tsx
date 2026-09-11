import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { imageSize } from "image-size";

import { PrestationPage } from "@/components/PrestationPage";

export const metadata: Metadata = {
  title: "Photographe outdoor et montagne à Annecy | Reportage",
  description:
    "Photographe outdoor basé en Haute-Savoie, spécialisé dans les reportages en montagne, aventure, randonnée, trail et sports outdoor. Annecy, Savoie et Alpes.",
};

const imageDirectory = path.join(
  process.cwd(),
  "public/images/prestations/reportage-outdoor"
);

const imageFiles = [
  "photo1.webp",
  "photo2.webp",
  "photo3.webp",
  "photo4.webp",
];

const photos = imageFiles.map((file) => {
  const filePath = path.join(imageDirectory, file);
  const buffer = fs.readFileSync(filePath);
  const { width, height } = imageSize(buffer);

  return {
    src: `/images/prestations/reportage-outdoor/${file}`,
    width,
    height,
    alt: "Photographie outdoor en montagne",
  };
});

export default function Page() {
  return (
    <PrestationPage
      number="02"
      title="Reportage outdoor"
      intro="Je réalise des reportages photo en montagne et en pleine nature pour raconter des aventures, des pratiques sportives et des projets outdoor. Mon approche associe action, environnement et moments de vie."
      description="Trail, randonnée, alpinisme, ski, vélo ou aventure : je m'adapte aux contraintes du terrain pour créer des images immersives qui retranscrivent l'expérience vécue."
      heroImage={{
        src: "/images/prestations/reportage-outdoor/hero.webp",
        alt: "Reportage photographique outdoor en montagne",
      }}
      photos={photos}
      contentSections={[
        {
          title: "Raconter une aventure en images",
          text: "Un reportage outdoor permet de raconter bien plus qu'une activité sportive. L'objectif est de retranscrire une expérience, un itinéraire, une ambiance et un environnement. Je cherche à construire une série d'images cohérente, mêlant scènes d'action, portraits, détails et paysages.",
        },
        {
          title: "Être au coeur de votre événement ou de votre projet",
          text: "Je réalise des reportages autour du trail, de la randonnée, du vélo, du ski, de l'alpinisme et plus largement des activités de pleine nature, avec pour but d'être au plus proche de l'action et de l'expérience vécue. Mon expérience sportive me permet de suivre les participants et de m'adapter aux contraintes du terrain pour créer des images immersives et naturelles.",
        },
      ]}
      contactTitle="Vous avez un projet outdoor ?"
      contactText="Vous souhaitez raconter une aventure, mettre en valeur une activité ou créer des images pour un projet en montagne ? Contactez-moi pour échanger sur vos besoins."
    />
  );
}