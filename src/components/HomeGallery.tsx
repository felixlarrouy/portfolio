
"use client";

import { useEffect, useState } from "react";
import { PhotoGallery } from "@/components/PhotoGallery";
import type { Photo } from "@/types/photo";

function shufflePhotos(photos: Photo[]): Photo[] {
  const shuffled = [...photos];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function HomeGallery({ photos }: { photos: Photo[] }) {
  const [shuffledPhotos, setShuffledPhotos] = useState(photos);

  useEffect(() => {
    setShuffledPhotos(shufflePhotos(photos));
  }, [photos]);

  return <PhotoGallery photos={shuffledPhotos} />;
}
