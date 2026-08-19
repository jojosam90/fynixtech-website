"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { nav } from "@/lib/content";
import Logo from "./Logo";
import { IconGlobe, IconMenu, IconClose } from "./icons";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[500] bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-12">
        {/* Logo */}
        <a href="#home" className="flex shrink-0 items-center">
          <Logo markClassName="h-8 w-8 md:h-9 md:w-9" textClassName="text-lg md:text-xl" imgClassName="h-11 md:h-14 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:gap-1">
          {nav.map((item, i) => (
            <a
              key={item.href + item.label.en}
              href={item.href}
              className={`px-4 py-7 text-[19px] font-medium text-text-dark transition-colors hover:text-brand-blue ${
                i === 0 ? "text-brand-blue" : ""
              }`}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-base font-medium text-text-body transition-colors hover:border-brand-blue hover:text-brand-blue lg:flex"
          >
            <IconGlobe className="h-4 w-4" />
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-brand-yellow px-5 py-2.5 text-base font-semibold text-brand-blue transition-colors hover:bg-brand-yellow/90 lg:inline-block"
          >
            {lang === "zh" ? "立即咨询" : "Get a Quote"}
          </a>
          <button
            className="lg:hidden"
            aria-label="menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-white px-4 pb-6 lg:hidden">
          {nav.map((item) => (
            <a
              key={item.href + item.label.en}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-line py-3 text-base font-medium text-text-dark"
            >
              {t(item.label)}
            </a>
          ))}
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="mt-4 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-base font-medium text-text-body"
          >
            <IconGlobe className="h-4 w-4" />
            {lang === "zh" ? "Switch to English" : "切换到中文"}
          </button>
        </div>
      )}
    </header>
  );
}
