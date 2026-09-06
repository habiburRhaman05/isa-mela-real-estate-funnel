import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, pt, es } from "./translations";
import { ar } from "./translations-ar";

export type Lang = "pt" | "en" | "es" | "ar";

export const LANGS: Lang[] = ["en", "pt", "es", "ar"];
export const DEFAULT_LANG: Lang = "en";

const STORAGE_KEY = "isa_melo_lang";

/** Resolve the starting language once, from ?lang= then localStorage. */
export function getInitialLang(): Lang {
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

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Holds the active language in React state so switching re-renders in place
 * instead of navigating — no full browser reload, no flash of English.
 */
export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    // Keep ?lang= in the address bar accurate for shareable links, but do it
    // through history so the SPA never reloads.
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState({}, "", url);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export function useLang(): Lang {
  return useContext(LangContext)?.lang ?? DEFAULT_LANG;
}

export function useSetLang(): (next: Lang) => void {
  const ctx = useContext(LangContext);
  return ctx?.setLang ?? (() => undefined);
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
    eyebrow: string;
    headline: [string, string];
    whatsapp: string;
    explore: string;
    discoverMore: string;
    quickProjects: string;
    quickProperties: string;
    quickAbout: string;
    quickGuide: string;
    quickInvest: string;
    quickMap: string;
    footer: string;
  };
  newsletter: {
    eyebrow: string;
    headline: [string, string];
    subtitle: string;
    benefits: { icon: string; title: string; desc: string }[];
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePh: string;
    phoneLabel: string;
    phonePh: string;
    emailLabel: string;
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
    ctaOr: string;
    ctaCall: string;
    ctaCallSub: string;
    ctaExplore: string;
    ctaExploreSub: string;
    ctaWhatsapp: string;
    ctaWhatsappSub: string;
    footer: string;
  };
  investment: {
    eyebrow: string;
    heroHeadline: [string, string, string];
    heroSubtitle: string;
    featured: string;
    viewDetails: string;
    available: string;
    step1Title: string;
    step1Options: string[];
    step2Title: string;
    step2Options: string[];
    step3Title: string;
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
    eyebrow: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
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
    reassurance: string;
    trust1Title: string;
    trust1Sub: string;
    trust2Title: string;
    trust2Sub: string;
    trust3Title: string;
    trust3Sub: string;
    trust4Title: string;
    trust4Sub: string;
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    pickDate: string;
    pickTime: string;
    anyNotes: string;
    timezone: string;
    notesLabel: string;
    notesPh: string;
    back: string;
    next: string;
    confirmBooking: string;
    jumpToToday: string;
    days: string[];
    months: string[];
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
    statRoiDesc: string;
    statTaxLabel: string;
    statTaxDesc: string;
    statFreeholdDesc: string;
    reqsTitle: string;
    reqPassport: string;
    reqPassportDesc: string;
    reqFunds: string;
    reqFundsDesc: string;
    reqEmiratesId: string;
    reqEmiratesIdDesc: string;
    reqPropertyDocs: string;
    reqPropertyDocsDesc: string;
    reqNote: string;
    perksTitle: string;
    perkInfrastructure: string;
    perkInfrastructureDesc: string;
    perkRental: string;
    perkRentalDesc: string;
    perkLocation: string;
    perkLocationDesc: string;
    perkLifestyle: string;
    perkLifestyleDesc: string;
    heroCtaTitle: string;
    heroCardTitle: string;
    heroFreehold: string;
    heroOwnership: string;
    heroReadTime: string;
    heroLocation: string;
    heroUpdated: string;
    footer: string;
  };
  thankYou: {
    eyebrow: string;
    line1: string;
    line2: string;
    back: string;
    whatNext: string;
    bookingConfirmed: string;
    bookingConfirmedSub: string;
    quickResponse: string;
    quickResponseSub: string;
    globalExpertise: string;
    globalExpertiseSub: string;
    footer: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
    footer: string;
  };
};

export const translations: Record<Lang, Dict> = { pt, en, es, ar };

export function getDict(lang: Lang): Dict {
  return translations[lang] ?? translations[DEFAULT_LANG];
}
