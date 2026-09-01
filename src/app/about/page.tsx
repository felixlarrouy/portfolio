import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
      <section className="space-y-1">
        <div className="relative max-w-lg overflow-hidden bg-neutral-100">
          <Image
            src="/images/self1.jpg"
            alt=""
            width={1400}
            height={900}
            className="w-full object-cover"
            priority
          />
        </div>
        <div className="relative max-w-lg overflow-hidden bg-neutral-100">
          <Image
            src="/images/self2.jpg"
            alt=""
            width={1400}
            height={900}
            className="w-full object-cover"
            priority
          />
          <p className="text-sm text-neutral-600">
            © Baptiste Gousset
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-xs font-medium tracking-[0.3em] uppercase">
            À propos
          </h2>
          <p className="max-w-prose text-sm leading-relaxed text-neutral-600">
            Aussi loin que je m'en souvienne, j'ai toujours eu un appareil photo entre les mains. Du Kodak jetable lors des premières 
            vacances familiales, en passant par divers appareils photo jusqu'à avoir un reflex aujourd'hui, 
            ma passion pour la photographie n'a cessé de grandir. La photographie est pour moi une merveilleuse façon de capturer des
            émotions, des souvenirs, des moments de vie, mais aussi de mettre en valeur ce qui a le mérite de l'être.
          </p>
          <p className="max-w-prose text-sm leading-relaxed text-neutral-600">
            J'aime y allier ma deuxième passion, le sport. Je suis en effet un Annécien de cœur par amour de la montagne, l'environnement
            qui me correspond le mieux et me permet de m'épanouir tant personnellement que professionnellement.
          </p>
          <p className="max-w-prose text-sm leading-relaxed text-neutral-600">
            Je suis néanmoins ouvert à des propositions autres que liées au milieu du sport, n'hésitez pas à me contacter pour plus d'informations.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-medium tracking-[0.3em] uppercase">
            Contact
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
              <div className="space-y-1 text-neutral-600">
                <p>
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/felix_larrouy/"
                    className="underline underline-offset-4 hover:text-black"
                  >
                    @felix_larrouy
                  </a>
                </p>
              </div>
              <div className="space-y-1 text-neutral-600">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:felix.larrouy@gmail.com"
                    className="underline underline-offset-4 hover:text-black"
                  >
                    felix.larrouy@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

