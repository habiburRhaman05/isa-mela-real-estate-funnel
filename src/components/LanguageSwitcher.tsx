import { LANGS, useLang, type Lang } from "@/lib/i18n";

const LANG_META: Record<Lang, { flag: string; label: string }> = {
  pt: { flag: "🇧🇷", label: "PT" },
  en: { flag: "🇺🇸", label: "EN" },
  es: { flag: "🇪🇸", label: "SP" },
};

export const LanguageSwitcher = () => {
  const current = useLang();

  const buildHref = (l: Lang) => {
    if (typeof window === "undefined") return `/?lang=${l}`;
    const { pathname, search } = window.location;
    const params = new URLSearchParams(search);
    params.set("lang", l);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {LANGS.map((l) => {
        const meta = LANG_META[l];
        const active = current === l;
        return (
          <a
            key={l}
            href={buildHref(l)}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "bg-[#7B5EA7] text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
                : "bg-transparent hover:bg-[#7B5EA7]/10 border border-[#7B5EA7]/40 text-[#0f0f0f] text-xs font-semibold px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40"
            }
          >
            {meta.flag} {meta.label}
          </a>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
