import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import { PrestationPage } from "@/components/PrestationPage";

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
    alt: "Photographie d'événement sportif",
  };
});

export default function ReportageOutdoorPage() {
  return (
    <PrestationPage
      number="02"
      title="Reportage outdoor"
      intro="Randonnée, montagne, aventure et activités de plein air. Je photographie votre projet directement sur le terrain pour retranscrire l'expérience, l'environnement et l'ambiance."
      description="Une approche naturelle et immersive pour créer des images adaptées à votre communication et raconter votre activité au-delà d'une simple photographie de produit ou de pratique sportive."
      heroImage={{
        src: "/images/prestations/reportage-outdoor/hero.webp",
        alt: "Reportage outdoor en montagne",
      }}
      photos={photos}
      contactTitle="Un projet outdoor ?"
      contactText="Contactez-moi pour discuter de votre projet et imaginer ensemble le reportage adapté à votre activité."
    />
  );
}