"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "zh";

type Dict = Record<Lang, string>;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (dict: Dict) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (dict: Dict) => dict[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
