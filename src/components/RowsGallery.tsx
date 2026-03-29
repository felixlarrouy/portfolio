"use client";

import { useEffect, useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type Photo = {
  src: string;
  width: number;
  height: number;
};

export function RowsGallery({ slug }: { slug: string }) {
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
    <RowsPhotoAlbum
      photos={photos}
      targetRowHeight={320}
      padding={0}
      spacing={2}
      rowConstraints={{ minPhotos: 2, maxPhotos: 3 }}
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

