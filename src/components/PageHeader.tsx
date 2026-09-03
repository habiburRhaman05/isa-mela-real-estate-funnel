import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LOGO_URL } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";

type PageHeaderProps = {
  lang: Lang;
  backHref?: string;
  backLabel?: string;
  compact?: boolean;
};

/**
 * Shared top bar for every funnel page: logo left, language switcher right
 * (an optional back link sits above both). Keeping this in one place means
 * language switching works the same way on every step of the funnel, not
 * just the homepage.
 */
export const PageHeader = ({
  lang,
  backHref,
  backLabel,
  compact,
}: PageHeaderProps) => (
  <div className="w-full px-4 sm:px-8 pt-6">
    {backHref && backLabel && (
      <div className="max-w-6xl mx-auto mb-3">
        <a
          href={backHref}
          className="inline-flex items-center gap-2 text-xs text-[#7B5EA7] hover:underline font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </a>
      </div>
    )}
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
      <a
        href={`/?lang=${lang}`}
        className="hover:scale-105 transition-transform duration-300"
      >
        <img
          src={LOGO_URL}
          alt="Isa Melo Dubai Real Estate"
          className={`${compact ? "h-16 sm:h-20" : "h-20 sm:h-24"} object-contain`}
        />
      </a>
      <LanguageSwitcher />
    </div>
  </div>
);

export default PageHeader;
