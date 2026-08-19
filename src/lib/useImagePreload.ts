"use client";

import { useEffect, useState } from "react";

const loadedCache = new Set<string>();

export function preloadImage(src: string) {
  if (loadedCache.has(src)) return;
  const img = new window.Image();
  img.onload = () => loadedCache.add(src);
  img.src = src;
}

export function useImagePreload(src?: string) {
  const [loaded, setLoaded] = useState(() => Boolean(src && loadedCache.has(src)));

  useEffect(() => {
    if (!src) {
      setLoaded(false);
      return;
    }
    if (loadedCache.has(src)) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    const img = new window.Image();
    img.onload = () => {
      loadedCache.add(src);
      setLoaded(true);
    };
    img.onerror = () => setLoaded(false);
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return loaded;
}
