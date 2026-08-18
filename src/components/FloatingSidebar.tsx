"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { IconFolder, IconReceipt, IconHeadset, IconWechat, IconPhone, IconArrowUp } from "./icons";

export default function FloatingSidebar() {
  const { t } = useLanguage();
  const [showTop, setShowTop] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      const heroEl = document.getElementById("home");
      const threshold = heroEl ? heroEl.offsetHeight - 160 : window.innerHeight - 160;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    {
      icon: IconFolder,
      label: { en: "Get Cases", zh: "获取案例" },
      onClick: () => {
        window.location.href = "#contact";
      },
    },
    {
      icon: IconReceipt,
      label: { en: "View Pricing", zh: "了解报价" },
      onClick: () => {
        window.location.href = "#contact";
      },
    },
    {
      icon: IconHeadset,
      label: { en: "Live Chat", zh: "在线咨询" },
      onClick: undefined,
    },
    {
      icon: IconWechat,
      label: { en: "WhatsApp", zh: "WhatsApp" },
      onClick: () => {
        const message = "Hello, I am looking to develop a mobile app and would like to get an estimated cost and timeline for the project.";
        window.open(`https://wa.me/6591237341?text=${encodeURIComponent(message)}`, "_blank");
      },
    },
    {
      icon: IconPhone,
      label: { en: "Call Us", zh: "拨打电话" },
      onClick: undefined,
    },
  ];

  return (
    <div
      className={`fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 transition-all duration-500 md:flex ${
        visible ? "opacity-100" : "pointer-events-none translate-x-4 opacity-0"
      }`}
    >
      {items.map((item) => (
        <button
          key={item.label.en}
          onClick={item.onClick}
          aria-label={t(item.label)}
          className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-full bg-brand-blue text-white shadow-[0_6px_18px_rgba(1,70,173,0.35)] transition-transform hover:scale-105 hover:bg-brand-blue-dark"
        >
          <item.icon className="h-6 w-6" />
          <span className="text-[10px] font-medium leading-none">{t(item.label)}</span>
        </button>
      ))}

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t({ en: "Back to top", zh: "回到顶部" })}
          className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-full border-2 border-brand-blue bg-white text-brand-blue shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-transform hover:scale-105"
        >
          <IconArrowUp className="h-5 w-5" />
          <span className="text-[10px] font-medium uppercase leading-none">top</span>
        </button>
      )}
    </div>
  );
}
