"use client";

import { useEffect } from "react";

export function ImageContextMenuGuard() {
  useEffect(() => {
    const isImageTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest("img") !== null;

    const onContextMenu = (e: MouseEvent) => {
      if (isImageTarget(e.target)) {
        e.preventDefault();
      }
    };
    const onDragStart = (e: DragEvent) => {
      if (isImageTarget(e.target)) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
    };
  }, []);

  return null;
}
