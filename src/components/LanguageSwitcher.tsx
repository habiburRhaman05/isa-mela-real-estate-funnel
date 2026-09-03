import { LANGS, useLang, useSetLang, type Lang } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const LANG_META: Record<Lang, { label: string; flag: string; country: string }> = {
  en: { label: "EN", flag: "us", country: "English" },
  pt: { label: "PT", flag: "br", country: "Português" },
  es: { label: "ES", flag: "es", country: "Español" },
};

const FLAG_URL = (code: string) =>
  `https://flagcdn.com/w40/${code}.png`;

/**
 * Language switcher with country flags in a dropdown menu.
 * Switching sets React state directly — no navigation, so the page never reloads.
 */
export const LanguageSwitcher = () => {
  const current = useLang();
  const setLang = useSetLang();
  const meta = LANG_META[current];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e6dfd3] bg-white/70 backdrop-blur-sm flex-shrink-0 text-[11px] font-semibold tracking-wide text-[#6b6660] hover:text-[#1a1a18] hover:bg-[#1a1a18]/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
        aria-label="Language"
      >
        <img
          src={FLAG_URL(meta.flag)}
          alt={`${meta.country} flag`}
          className="w-5 h-auto rounded-[2px] shadow-sm"
        />
        <span>{meta.label}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="min-w-[150px] bg-white border border-[#e6dfd3] shadow-lg rounded-xl p-1"
      >
        {LANGS.map((l) => {
          const m = LANG_META[l];
          const active = current === l;
          return (
            <DropdownMenuItem
              key={l}
              onClick={() => setLang(l)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-[12px] font-medium transition-colors ${
                active
                  ? "bg-[#1a1a18] text-white"
                  : "text-[#6b6660] hover:bg-[#1a1a18]/5 hover:text-[#1a1a18]"
              }`}
            >
              <img
                src={FLAG_URL(m.flag)}
                alt={`${m.country} flag`}
                className="w-5 h-auto rounded-[2px]"
              />
              <span>{m.country}</span>
              <span className={`ml-auto text-[10px] tracking-wide ${active ? "text-white/70" : "text-[#999]"}`}>
                {m.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
