"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { caseItems } from "@/lib/content";
import FanCard from "./FanCard";
import PhoneMockup from "./PhoneMockup";
import { IconChevronLeft, IconChevronRight } from "./icons";

const swatches = [
  "from-[#0146ad] to-[#3a7bd5]",
  "from-[#1f61aa] to-[#73a2dd]",
  "from-[#004eb1] to-[#0a3d91]",
  "from-[#00224f] to-[#0146ad]",
  "from-[#175497] to-[#4a8fd6]",
  "from-[#0a3d91] to-[#189bf0]",
  "from-[#013a8f] to-[#5490d6]",
  "from-[#082047] to-[#004eb1]",
  "from-[#0146ad] to-[#00b4d8]",
];

const hexSwatches: [string, string][] = [
  ["#0146ad", "#3a7bd5"],
  ["#1f61aa", "#73a2dd"],
  ["#004eb1", "#0a3d91"],
  ["#00224f", "#0146ad"],
  ["#175497", "#4a8fd6"],
  ["#0a3d91", "#189bf0"],
  ["#013a8f", "#5490d6"],
  ["#082047", "#004eb1"],
  ["#0146ad", "#00b4d8"],
];

function getOffset(i: number, active: number, total: number) {
  let diff = i - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function CaseCarousel() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = caseItems.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % total), 2200);
    return () => clearInterval(id);
  }, [paused, total]);

  const goto = (i: number) => setIndex(((i % total) + total) % total);
  const active = caseItems[index];
  const [activeFrom, activeTo] = hexSwatches[index % hexSwatches.length];

  return (
    <div
      className="relative mx-auto max-w-[1180px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-center">
        <h3 className="text-base font-semibold text-text-dark md:text-lg">{t(active.title)}</h3>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {caseItems.map((item, i) => (
          <button
            key={item.title.en}
            aria-label={`go to ${t(item.title)}`}
            onClick={() => goto(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-brand-blue" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>

      <div className="relative mt-2 md:mt-3">
        <div className="relative h-[440px] overflow-hidden md:h-[620px]">
          {/* Background deck: flat, parallel screenshot cards, no bezel */}
          {caseItems.map((item, i) => {
            const offset = getOffset(i, index, total);
            const abs = Math.abs(offset);
            if (abs > 4 || abs === 0) return null;
            const translateX = offset * 150;
            const scale = Math.max(1 - abs * 0.14, 0.5);
            const opacity = Math.max(1 - abs * 0.28, 0);

            return (
              <button
                key={item.title.en}
                onClick={() => goto(i)}
                aria-label={t(item.title)}
                className="absolute inset-0 m-auto h-[400px] w-[196px] appearance-none border-0 bg-transparent p-0 outline-none transition-transform duration-700 ease-out md:h-[580px] md:w-[278px]"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 100 - abs,
                  pointerEvents: abs > 3 ? "none" : "auto",
                }}
              >
                <FanCard gradient={swatches[i % swatches.length]} image={item.image} />
              </button>
            );
          })}

          {/* Fixed foreground phone frame: shows the active case's screenshot */}
          <div className="absolute inset-0 m-auto h-[400px] w-[196px] md:h-[580px] md:w-[278px]" style={{ zIndex: 200 }}>
            <PhoneMockup image={active.image} gradientFrom={activeFrom} gradientTo={activeTo} />
          </div>
        </div>

        <button
          aria-label="previous case"
          onClick={() => goto(index - 1)}
          className="absolute left-0 top-1/2 z-[201] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-text-body shadow-sm transition-colors hover:bg-brand-blue hover:text-white md:flex"
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="next case"
          onClick={() => goto(index + 1)}
          className="absolute right-0 top-1/2 z-[201] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-text-body shadow-sm transition-colors hover:bg-brand-blue hover:text-white md:flex"
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
