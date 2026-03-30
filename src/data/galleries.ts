export const galleries = {
    jo2024: {
      title: "Épreuves d'escalade — JO de Paris 2024",
      intro: 
        "Série photo réalisée durant les différentes épreuves d'escalade des Jeux Olympiques de Paris 2024. " +
        "Étant un grand passionné d'escalade, j'ai pu acheter des billets pour trois jours d'épreuves et photographier " + 
        "les meilleurs grimpeurs du monde depuis les gradins.",
      heroSrc: "/images/galleries/jo2024/DSC_1654.jpg",
    },
    winter2026: {
      title: "Ski de randonnée — Hiver 2025/2026",
      intro: "Série réalisée au fil des sorties de ski de randonnée durant l'hiver 2025/2026, entre la Haute Savoie, la Savoie et l'Isère.",
      heroSrc: "/images/galleries/winter2026/DSC00161.jpg",
    },
    trailrunningawards2025: {
      title: "Trail Running Awards 2025",
      intro: 
        "Cette cérémonie a eu lieu à l'Impérial Palace d'Annecy le 9 décembre 2025. J'ai pu couvrir cet événement pour " +
        "l'agence Püls. Cette cérémonie a honoré les athlètes, les marques et les initiatives qui ont marqué l'année 2025, " + 
        "soulignant une progression constante vers plus d'inclusion, de durabilité et de performance dans l'écosystème du trail running. ",
      introLink: {
        href: "https://www.puls-agency.com/trail-running-awards-2025-annecy-reportage-puls-media/",
        label: "Lien vers l'article de presse.",
      },
      heroSrc: "/images/galleries/trailrunningawards2025/DSC_6321.jpg",
    },
    clipmils: {
      title: "Backstage de tournage — Clip promotionnel de MILS",
      intro: 
        "Série réalisée lors du tournage d'un clip promotionnel pour la marque MILS. Ce tournage a eu lieu en intérieur " + 
        "dans deux lieux différents : l'atelier de la marque et un studio de tournage. Ce shooting m'a sorti de ma zone de confort, " + 
        "moi qui suis habitué à la photographie en extérieur.",
      heroSrc: "/images/galleries/clipmils/DSC_5836.jpg",
    },
    runpuls17122025: {
      title: "Community run — Püls x Mizuno x Shokz",
      intro:
        "Couverture photo d'un social run organisé par l'agence Püls en collaboration avec deux marques : Mizuno et Shokz. " +
        "La première partie du shooting a eu lieu en magasin (présentation des produits aux participants) et la seconde partie a eu lieu en extérieur. " +
        "J'ai pu suivre le groupe en courant avec mon appreil photo pour être au plus proche des coureurs et capturer l'ambiance de l'événement. ",
      introLink: {
        href: "https://www.puls-agency.com/run-communautaire/run-communautaire-annecy-courir-ensemble-tester-partager/",
        label: "Lien vers l'article de presse.",
      },
      heroSrc: "/images/galleries/runpuls17122025/DSC_6534.jpg",
    },
    runpuls30102025: {
      title: "Community run — Püls x Rossignol x YANAA x Lago",
      intro:  
        "Couverture photo d'un social run organisé par l'agence Püls en collaboration avec plusieurs marques : Rossignol, YANAA et Lago. " +
        "La première partie du shooting a eu lieu en magasin (présentation des produits aux participants) et la seconde partie a eu lieu en extérieur. " + 
        "J'ai pu suivre le groupe en courant avec mon appreil photo pour être au plus proche des coureurs et capturer l'ambiance de l'événement.",
      heroSrc: "/images/galleries/runpuls30102025/DSC_4966.jpg",
    },
    yoga06092025: {
      title: "Cours de yoga au bord du lac d'Annecy",
      introInlineLink: {
        before:
          "Séance photo réalisée lors d'un cours de yoga au bord du lac d'Annecy donné par ",
        link: {
          href: "https://www.instagram.com/lucile.omsanayoga/",
          label: "@lucile.omsanayoga",
        },
        after:
          ". Ces photos ont ensuite servi à faire la promotion de ces cours de yoga sur les réseaux sociaux.",
      },
      heroSrc: "/images/galleries/yoga06092025/DSC_4020.jpg",
    },
    yoga10102025: {
      title: "Cours de yoga en intérieur",
      introInlineLink: {
        before:
          "Séance photo promotionnelle réalisée dans une salle de yoga à Annecy pour ",
        link: {
          href: "https://www.instagram.com/lucile.omsanayoga/",
          label: "@lucile.omsanayoga",
        },
        after:
          ". Ces photos ont ensuite servi à faire la promotion de ces cours de yoga sur les réseaux sociaux.",
      },
      heroSrc: "/images/galleries/yoga10102025/DSC_4409.jpg",
    },
    tmb: {
      title: "Tour du Mont Blanc",
      intro: 
        "Série réalisée à l'appreil photo compact lors du tour du Mont Blanc, fait à pieds et en autonomie en septembre 2025.",
      heroSrc: "/images/galleries/tmb/R0002131.jpg",
    },
    runandbreath : {
      title: "Social run — Respiration optimale",
      introInlineLink: {
        before:
          "Couverture photo d'un social run organisé par ",
        link: {
          href: "https://www.instagram.com/naitacomerro/",
          label: "@naitacomerro",
        },
        after:
          " dont l'objectif était de sensibiliser aux bienfaits de la respiration optimale dans sa pratique sportive.",
      },
      heroSrc: "/images/galleries/runandbreath/DSC_4220.jpg",
    },
  } as const;
  
  export type GallerySlug = keyof typeof galleries;