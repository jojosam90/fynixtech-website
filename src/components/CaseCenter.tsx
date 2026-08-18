"use client";

import { useLanguage } from "@/lib/i18n";
import CaseCarousel from "./CaseCarousel";

export default function CaseCenter() {
  return (
    <section id="cases" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading title={{ en: "Case Center", zh: "案例中心" }} />

        {/* 3D phone carousel */}
        <div className="mt-10">
          <CaseCarousel />
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light,
}: {
  eyebrow?: string;
  title: { en: string; zh: string };
  subtitle?: { en: string; zh: string };
  light?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className="text-center">
      {eyebrow && (
        <p className={`text-sm font-bold tracking-[0.3em] ${light ? "text-brand-yellow" : "text-brand-blue"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-xl font-bold md:text-3xl ${light ? "text-white" : "text-text-dark"}`}>
        {t(title)}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-3 max-w-xl text-base md:text-lg ${light ? "text-white/70" : "text-text-body"}`}>
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}
