import type { Lang } from "@/lib/i18n";

/** Map internal lang code → display language name */
export function langToLanguage(lang: Lang): string {
  const map: Record<Lang, string> = {
    en: "English",
    pt: "Portuguese (BR)",
    es: "Spanish",
    ar: "Arabic",
  };
  return map[lang] ?? "English";
}

/** Map internal lang code → market / country */
export function langToMarket(lang: Lang): string {
  const map: Record<Lang, string> = {
    en: "USA",
    pt: "Brazil",
    es: "Other",
    ar: "UAE",
  };
  return map[lang] ?? "Other";
}
