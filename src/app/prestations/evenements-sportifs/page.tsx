import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import { PrestationPage } from "@/components/PrestationPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photographe sportif à Annecy | Événements & outdoor",
  description:
    "Photographe sportif basé en Haute-Savoie, spécialisé dans les événements outdoor : trail, ultra-trail, cyclisme, VTT, ski et compétitions en montagne. Annecy, Savoie et Alpes.",
};

const imageDirectory = path.join(
  process.cwd(),
  "public/images/prestations/evenements-sportifs"
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
    src: `/images/prestations/evenements-sportifs/${file}`,
    width,
    height,
    alt: "Photographie d'événement sportif",
  };
});

export default function EvenementsSportifsPage() {
  return (
    <PrestationPage
      number="01"
      title="Événements sportifs"
      intro="Je réalise des reportages photo pour des événements de trail, cyclisme (route, gravel, VTT), escalade, ski et autres compétitions outdoor. Basé en Haute-Savoie, j'accompagne les organisateurs, clubs et structures sportives à Annecy, en Savoie et plus largement dans les Alpes."
      description="De l'action aux émotions des participants, je cherche à retranscrire l'intensité de la compétition et l'environnement dans lequel se déroule votre événement."
      heroImage={{
        src: "/images/prestations/evenements-sportifs/hero.webp",
        alt: "Photographie d'un événement sportif",
      }}
      photos={photos}
      contentSections={[
        {
          title: "Un reportage photo au service de votre événement",
          text: "Je capture des images permettant de retranscrire l'intensité de la compétition, l'engagement des participants et l'atmosphère qui l'entoure. Je couvre les différents temps forts de votre événement afin de créer une série d'images cohérente et directement exploitable pour votre communication : site internet, réseaux sociaux, affiches, ou promotion des prochaines éditions.",
        },
        {
          title: "Photographe sportif en Haute-Savoie et dans les Alpes",
          text: "Basé à d'Annecy, j'interviens principalement en Haute-Savoie, en Savoie et dans les Alpes. Je peux également me déplacer pour couvrir des événements sportifs partout en France selon les projets.",
        },
      ]}
      contactTitle="Vous organisez un événement sportif ?"
      contactText="Vous recherchez un photographe pour couvrir votre prochaine course ou événement outdoor ? Contactez-moi pour discuter de votre projet, du format du reportage et de vos besoins en images."
    />
  );
}