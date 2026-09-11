import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { imageSize } from "image-size";

import { PrestationPage } from "@/components/PrestationPage";

export const metadata: Metadata = {
  title: "Photographe entreprise à Annecy | Communication & contenu",
  description:
    "Photographe professionnel à Annecy pour entreprises, marques et professionnels. Portraits, communication, contenu photo et reportages en Haute-Savoie, Savoie et Alpes.",
};

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
    alt: "Photographie professionnelle pour une entreprise",
  };
});

export default function Page() {
  return (
    <PrestationPage
      number="03"
      title="Communication & entreprise"
      intro="Je crée des images pour les entreprises, marques et professionnels qui souhaitent développer une communication visuelle cohérente et authentique."
      description="Portraits, reportages, savoir-faire, locaux, produits ou contenus destinés aux réseaux sociaux : je construis des séries d'images adaptées à votre identité et à vos besoins de communication."
      heroImage={{
        src: "/images/prestations/communication-entreprise/hero.webp",
        alt: "Photographie professionnelle pour une entreprise",
      }}
      photos={photos}
      contentSections={[
        {
          title: "Des photographies au service de votre communication",
          text: "Une image professionnelle permet de mettre en valeur un savoir-faire et de créer une identité visuelle cohérente. Je réalise des reportages photographiques pensés pour s'intégrer naturellement à vos différents supports de communication.",
        },
        {
          title: "Du contenu pour vos différents supports",
          text: "Les images peuvent être utilisées pour votre site internet, vos réseaux sociaux, vos supports commerciaux, vos dossiers de presse ou vos campagnes de communication. Je peux également produire des séries d'images pensées spécifiquement pour alimenter votre communication dans la durée.",
        },
      ]}
      contactTitle="Un projet de communication ?"
      contactText="Vous avez besoin de nouvelles images pour votre entreprise, votre marque ou vos supports de communication ? Contactez-moi pour discuter de votre projet et définir ensemble les images dont vous avez besoin."
    />
  );
}