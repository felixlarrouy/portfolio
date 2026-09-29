"use client";

import dynamic from "next/dynamic";
import { createElement, useState, type SyntheticEvent } from "react";
import type { ComponentProps } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import SSR from "react-photo-album/ssr";

import "yet-another-react-lightbox/styles.css";

import { getThumbnailSrc } from "@/lib/imagePaths";
import type { Photo } from "@/types/photo";

const Lightbox = dynamic(
  async () => {
    const [lightboxModule, { default: Fullscreen }, { default: Zoom }] =
      await Promise.all([
        import("yet-another-react-lightbox"),
        import("yet-another-react-lightbox/plugins/fullscreen"),
        import("yet-another-react-lightbox/plugins/zoom"),
      ]);
    const LightboxComponent = lightboxModule.default;

    return function LazyLightbox(
      props: ComponentProps<typeof LightboxComponent>,
    ) {
      return <LightboxComponent {...props} plugins={[Fullscreen, Zoom]} />;
    };
  },
  { ssr: false },
);

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);
  const galleryPhotos = photos.map((photo) => ({
    ...photo,
    src: getThumbnailSrc(photo.src),
  }));
  const lightboxPhotos = photos.map((photo) => ({
    ...photo,
    srcSet: photo.srcSet?.slice(1, 2).concat({
      src: photo.src,
      width: photo.width,
      height: photo.height,
    }),
  }));

  if (!photos.length) return null;

  return (
    <>
      <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 md:px-8">
        <SSR breakpoints={[360, 768, 1280]}>
          <MasonryPhotoAlbum
            photos={galleryPhotos}
            sizes={{
              size: "calc(100vw - 64px)",
              sizes: [
                { viewport: "(max-width: 767px)", size: "calc(100vw - 32px)" },
              ],
            }}
            columns={(containerWidth) => (containerWidth < 768 ? 2 : 4)}
            padding={(containerWidth) => (containerWidth < 768 ? 3 : 5)}
            spacing={(containerWidth) => (containerWidth < 768 ? 10 : 25)}
            componentsProps={{
              image: { className: "border-3 border-black" },
            }}
            render={{
              image: (props, { index: photoIndex }) => {
                return createElement("img", {
                  ...props,
                  src: props.src,
                  loading: photoIndex < 10 ? "eager" : "lazy",
                  decoding: "async",
                  fetchPriority: photoIndex === 0 ? "high" : "auto",
                  onError: (event: SyntheticEvent<HTMLImageElement>) => {
                    console.warn("Vignette manquante :", event.currentTarget.src);
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
        </SSR>
      </div>

      {index >= 0 && (
        <Lightbox
          slides={lightboxPhotos}
          open
          index={index}
          close={() => setIndex(-1)}
        />
      )}
    </>
  );
}