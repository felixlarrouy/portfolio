import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import { PrestationPage } from "@/components/PrestationPage";

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
      intro="Trail, cyclisme, ski, course à pied et événements outdoor. Je réalise des images qui capturent l'intensité de la compétition, les émotions des participants et l'ambiance de l'événement."
      description="L'objectif est de vous fournir une série d'images cohérente, dynamique et directement exploitable pour votre communication, vos réseaux sociaux ou vos supports de presse."
      heroImage={{
        src: "/images/prestations/evenements-sportifs/hero.webp",
        alt: "Photographie d'un événement sportif",
      }}
      photos={photos}
      contactTitle="Un événement à venir ?"
      contactText="Contactez-moi pour discuter de votre événement, de vos besoins et du type de reportage souhaité."
    />
  );
}