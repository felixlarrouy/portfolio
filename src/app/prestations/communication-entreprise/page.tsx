import type { Metadata } from "next";

import { PrestationPage } from "@/components/PrestationPage";
import manifest from "@/data/photo-manifest.json";

export const metadata: Metadata = {
  title: "Photographe entreprise à Annecy | Communication & contenu",
  description:
    "Photographe professionnel à Annecy pour entreprises, marques et professionnels. Portraits, communication, contenu photo et reportages en Haute-Savoie, Savoie et Alpes.",
};

const photos = manifest.prestations["communication-entreprise"].map((photo) => ({
    ...photo,
    alt: "Photographie professionnelle pour une entreprise",
  }));

export default function Page() {
  return (
    <PrestationPage
      number="03"
      title="Communication & entreprise"
      intro="Je crée des images pour les entreprises, les marques et les professionnels qui souhaitent mettre en avant des produits (vêtements techniques, matériel de sport...), des savoir-faire ou encore des services."
      description=""
      heroImage={{
        src: "/images/prestations/communication-entreprise/hero.webp",
        alt: "Photographie professionnelle pour une entreprise",
      }}
      photos={photos}
      contentSections={[
        {
          title: "Des photographies au service de votre communication",
          text: "Une image professionnelle permet de créer une identité visuelle cohérente. Je réalise des photos pensées pour s'intégrer naturellement à vos différents supports de communication (site internet, réseaux sociaux, vos supports commerciaux, vos dossiers de presse ou vos campagnes de communication).",
        },
      ]}
      contactTitle="Un projet de communication ?"
      contactText="Vous avez besoin de nouvelles images pour votre entreprise, votre marque ou vos supports de communication ? Contactez-moi pour discuter de votre projet et définir ensemble les images dont vous avez besoin."
    />
  );
}