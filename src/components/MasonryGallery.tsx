"use client";

import { createElement, useState, type SyntheticEvent } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import manifest from "@/data/photo-manifest.json";
import { getThumbnailSrc } from "@/lib/imagePaths";

type Photo = {
  src: string;
  width: number;
  height: number;
};

export function MasonryGallery({ slug }: { slug: string }) {
  const [index, setIndex] = useState(-1);
  const [completedImages, setCompletedImages] = useState<Set<number>>(
    () => new Set(),
  );
  const photos = (manifest as Record<string, Photo[]>)[slug] ?? [];
  const galleryPhotos = photos.map((photo) => ({
    ...photo,
    src: getThumbnailSrc(photo.src),
  }));

  const markImageComplete = (photoIndex: number) => {
    setCompletedImages((completed) => {
      if (completed.has(photoIndex)) return completed;
      const next = new Set(completed);
      next.add(photoIndex);
      return next;
    });
  };

  if (!photos.length) return null;

  return (
    <>
      <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 md:px-8">
        <MasonryPhotoAlbum
          photos={galleryPhotos}
          columns={(containerWidth) => (containerWidth < 768 ? 2 : 4)}
          padding={(containerWidth) => (containerWidth < 768 ? 3 : 5)}
          spacing={(containerWidth) => (containerWidth < 768 ? 10 : 25)}
          componentsProps={{
            image: { className: "border-3 border-dark" },
          }}
          render={{
            image: (props, { index: photoIndex }) => {
              const firstTenLoaded = photos
                .slice(0, 10)
                .every((_, firstIndex) => completedImages.has(firstIndex));
              const shouldLoad =
                photoIndex < 10 ||
                (firstTenLoaded &&
                  (photoIndex === 10 || completedImages.has(photoIndex - 1)));

              return createElement("img", {
                ...props,
                src: shouldLoad ? props.src : undefined,
                loading: photoIndex < 10 ? "eager" : "lazy",
                decoding: "async",
                onLoad: () => markImageComplete(photoIndex),
                onError: (event: SyntheticEvent<HTMLImageElement>) => {
                  markImageComplete(photoIndex);
                  const fullResolutionSrc = photos[photoIndex]?.src;
                  const fullResolutionUrl = fullResolutionSrc
                    ? new URL(
                        fullResolutionSrc,
                        event.currentTarget.ownerDocument.baseURI,
                      ).href
                    : undefined;
                  if (
                    fullResolutionSrc &&
                    event.currentTarget.src !== fullResolutionUrl
                  ) {
                    event.currentTarget.src = fullResolutionSrc;
                  }
                },
              });
            },
          }}
          onClick={({ index }) => setIndex(index)}
        />
      </div>

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