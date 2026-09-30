import { PrestationPage } from "@/components/PrestationPage";
import manifest from "@/data/photo-manifest.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photographe sportif à Annecy | Événements & outdoor",
  description:
    "Photographe sportif basé en Haute-Savoie, spécialisé dans les événements outdoor : trail, ultra-trail, cyclisme, VTT, ski et compétitions en montagne. Annecy, Savoie et Alpes.",
};

const photos = manifest.prestations["evenements-sportifs"].map((photo) => ({
    ...photo,
    alt: "Photographie d'événement sportif",
  }));

export default function EvenementsSportifsPage() {
  return (
    <PrestationPage
      number="01"
      title="Événements sportifs"
      intro="Je réalise des captations photo pour des événements de trail, cyclisme (route, gravel, VTT), escalade, ski et autres compétitions outdoor."
      description="De l'action aux émotions des participants, je cherche à retranscrire l'intensité de la compétition et l'environnement dans lequel se déroule votre événement."
      heroImage={{
        src: "/images/prestations/evenements-sportifs/hero.webp",
        alt: "Photographie d'un événement sportif",
      }}
      photos={photos}
      contentSections={[
        {
          title: "Un reportage photo au service de votre événement",
          text: "Je couvre les différents temps forts de votre événement afin de créer une série d'images cohérente et directement exploitable pour votre communication : site internet, réseaux sociaux, affiches, ou promotion des prochaines éditions.",
        },
        {
          title: "Photographe sportif en Haute-Savoie et dans les Alpes",
          text: "Basé à d'Annecy, j'interviens principalement en Haute-Savoie, en Savoie et dans les Alpes. Je peux également me déplacer pour couvrir des événements sportifs ailleurs en France ou dans le monde selon votre projet.",
        },
      ]}
      contactTitle="Vous organisez un événement sportif ?"
      contactText="Vous recherchez un photographe pour couvrir votre prochaine course ou événement outdoor ? Contactez-moi pour discuter de votre projet, du format du reportage et de vos besoins en images."
    />
  );
}