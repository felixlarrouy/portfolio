"use client";

import { useEffect, useState } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type Photo = {
  src: string;
  width: number;
  height: number;
};

export function MasonryGallery({ slug }: { slug: string }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    let isMounted = true;

    fetch(`/api/galleries/${slug}`)
      .then((res) => res.json())
      .then((data: Photo[]) => {
        if (isMounted) setPhotos(data);
      })
      .catch((error) => {
        console.error(`Failed to load ${slug} photos`, error);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!photos.length) return null;

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        columns={(containerWidth) => {
          if (containerWidth < 600) return 2;
          if (containerWidth < 900) return 3;
          return 4;
        }}
        spacing={2}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Zoom]}
      />
    </>
  );
}