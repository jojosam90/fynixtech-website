"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { solutions } from "@/lib/content";
import { SectionHeading } from "./CaseCenter";
import { useImagePreload } from "@/lib/useImagePreload";
import { IconApp, IconIot, IconSystem } from "./icons";

const icons = [IconApp, IconIot, IconSystem];
const gradients = [
  "from-[#0146ad] to-[#00224f]",
  "from-[#175497] to-[#0a3d91]",
  "from-[#013a8f] to-[#001b3d]",
];

function SolutionImage({ image }: { image?: string }) {
  const loaded = useImagePreload(image);
  if (!image || !loaded) return <div className="flex-1" />;

  return (
    <div className="my-4 flex-1 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="h-full w-full object-contain"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at center, black 55%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 85% 85% at center, black 55%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function Solutions() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="flex min-h-screen flex-col bg-surface-alt py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <SectionHeading title={{ en: "Solutions", zh: "解决方案" }} />

        <div className="mt-16 flex flex-col gap-4 md:mt-4 md:h-[660px] md:flex-row md:gap-3">
          {solutions.map((sol, i) => {
            const Icon = icons[i];
            const isActive = active === i;
            return (
              <div
                key={sol.title.en}
                onMouseEnter={() => setActive(i)}
                className={`relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i]} transition-all duration-500 ease-out ${
                  isActive ? "md:flex-[3]" : "md:flex-[1]"
                }`}
              >
                <div className="flex h-full min-h-[180px] flex-col p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-3xl font-bold text-white/20">
                      0{i + 1}
                    </span>
                  </div>

                  <SolutionImage image={sol.image} />

                  <div>
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {t(sol.title)}
                    </h3>
                    <p
                      className={`mt-3 max-w-md text-base leading-relaxed text-white/80 transition-all duration-500 md:max-h-0 md:overflow-hidden md:opacity-0 ${
                        isActive ? "md:max-h-40 md:opacity-100" : ""
                      }`}
                    >
                      {t(sol.desc)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
