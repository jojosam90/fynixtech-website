"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { heroSlides } from "@/lib/content";
import { useImagePreload } from "@/lib/useImagePreload";
import { IconChevronLeft, IconChevronRight } from "./icons";

function SlideVisual({ image }: { image?: string }) {
  const loaded = useImagePreload(image);
  const showImage = Boolean(image) && loaded;

  if (showImage) {
    return (
      <div
        className="absolute right-0 top-1/2 hidden h-[58%] w-[34%] -translate-y-1/2 overflow-hidden md:right-[12%] md:block"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at center, black 45%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 70% 70% at center, black 45%, transparent 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <>
      <div className="absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute -right-10 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute right-10 top-1/3 h-40 w-40 rounded-3xl bg-white/5 backdrop-blur-sm" />
      <div className="absolute right-32 bottom-16 h-24 w-24 rounded-2xl bg-brand-yellow/20" />
    </>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[560px] w-full overflow-hidden pt-16 md:pt-20">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.title.en}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <SlideVisual image={slide.image} />

          <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-12">
            <div className={`max-w-xl transition-all duration-700 ${i === active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                {t(slide.title)}
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                {t(slide.subtitle)}
              </p>
              <a
                href="#contact"
                className="animate-heartbeat mt-8 inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-3 text-base font-bold text-brand-blue transition-colors hover:bg-brand-yellow/90"
              >
                {t(slide.cta)}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        aria-label="previous slide"
        onClick={() => setActive((v) => (v - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 md:flex"
      >
        <IconChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="next slide"
        onClick={() => setActive((v) => (v + 1) % heroSlides.length)}
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 md:flex"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-7 bg-brand-yellow" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
