import { LANGS, useLang, useSetLang, type Lang } from "@/lib/i18n";

const LANG_LABEL: Record<Lang, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

/**
 * Segmented language control. Switching sets React state directly — no
 * navigation, so the page never reloads. Flag emoji were dropped because
 * Windows renders them as bare "US"/"BR" letter boxes.
 */
export const LanguageSwitcher = () => {
  const current = useLang();
  const setLang = useSetLang();

  return (
    <div
      className="inline-flex items-center gap-0.5 p-0.5 rounded-full border border-[#e6dfd3] bg-white/70 backdrop-blur-sm flex-shrink-0"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = current === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30 ${
              active
                ? "bg-[#1a1a18] text-white shadow-sm"
                : "text-[#6b6660] hover:text-[#1a1a18] hover:bg-[#1a1a18]/5"
            }`}
          >
            {LANG_LABEL[l]}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
