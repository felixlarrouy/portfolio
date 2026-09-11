import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import { PrestationPage } from "@/components/PrestationPage";

const imageDirectory = path.join(
  process.cwd(),
  "public/images/prestations/communication-entreprise"
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
    src: `/images/prestations/communication-entreprise/${file}`,
    width,
    height,
    alt: "Photographie d'événement sportif",
  };
});

export default function CommunicationEntreprisePage() {
  return (
    <PrestationPage
      number="03"
      title="Communication & entreprise"
      intro="Des photographies pensées pour présenter votre activité et construire votre identité visuelle."
      description="Site internet, réseaux sociaux, communication interne ou supports commerciaux : je crée des images cohérentes avec votre univers et vos besoins."
      heroImage={{
        src: "/images/prestations/communication-entreprise/hero.webp",
        alt: "Photographie pour la communication d'une entreprise",
      }}
      photos={photos}
      contactTitle="Besoin de nouvelles images ?"
      contactText="Parlons de votre activité, de vos besoins en images et de la manière dont je peux vous accompagner."
    />
  );
}