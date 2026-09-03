import { useEffect, useState } from "react";
import { en, pt, es } from "./translations";

export type Lang = "pt" | "en" | "es";

export const LANGS: Lang[] = ["pt", "en", "es"];
export const DEFAULT_LANG: Lang = "en";

const STORAGE_KEY = "isa_melo_lang";

export function getLangFromUrl(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang")?.toLowerCase() as Lang | null;
  if (q && LANGS.includes(q)) {
    try {
      localStorage.setItem(STORAGE_KEY, q);
    } catch {
      /* ignore */
    }
    return q;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && LANGS.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setLang(getLangFromUrl());
  }, []);

  return lang;
}

/* ------------------------------------------------------------------ */
/* Translation dictionaries                                            */
/* ------------------------------------------------------------------ */

export type Dict = {
  langLabel: string;
  langFlag: string;
  nav: {
    invest: string;
    guide: string;
    consult: string;
    newsletter: string;
  };
  home: {
    headline: [string, string];
    whatsapp: string;
    footer: string;
  };
  newsletter: {
    headline: [string, string];
    namePh: string;
    phonePh: string;
    emailPh: string;
    consent: string;
    submit: string;
    submitting: string;
    success: string;
    successSub: string;
    error: string;
    nameError: string;
    phoneError: string;
    emailError: string;
    consentError: string;
    footer: string;
  };
  investment: {
    step1Title: string;
    step1Options: string[];
    step2Title: string;
    step2Options: string[];
    step3Label: string;
    step3Ph: string;
    step4Label: string;
    step4Ph: string;
    step5Label: string;
    step5Ph: string;
    consent: string;
    prev: string;
    next: string;
    submit: string;
    success: string;
    successSub: string;
    error: string;
    selectError: string;
    nameError: string;
    phoneError: string;
    emailError: string;
    consentError: string;
    stepWord: string;
    footer: string;
  };
  consult: {
    namePh: string;
    phonePh: string;
    emailPh: string;
    consent: string;
    submit: string;
    submitting: string;
    success: string;
    successSub: string;
    error: string;
    nameError: string;
    phoneError: string;
    emailError: string;
    consentError: string;
    footer: string;
  };
  guide: {
    back: string;
    badge: string;
    title: string;
    subtitle: string;
    statRoi: string;
    statTax: string;
    statFreehold: string;
    s1Title: string;
    s1Body: string;
    s1Strong: string;
    s1Areas: string;
    s2Title: string;
    s2BodyPre: string;
    s2BodyStrong: string;
    s2BodyPost: string;
    s3Title: string;
    s3Step1: string;
    s3Step1b: string;
    s3Step2: string;
    s3Step2b: string;
    s3Step3: string;
    s3Step3b: string;
    s3Step4: string;
    s3Step4b: string;
    ctaTitle: string;
    ctaBody: string;
    ctaConsult: string;
    ctaWhatsapp: string;
    footer: string;
  };
  thankYou: {
    line1: string;
    line2: string;
    footer: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
    footer: string;
  };
};

export const translations: Record<Lang, Dict> = { pt, en, es };

export function getDict(lang: Lang): Dict {
  return translations[lang] ?? translations[DEFAULT_LANG];
}
