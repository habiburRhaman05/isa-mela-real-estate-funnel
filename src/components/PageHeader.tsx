import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Container from "@/components/Container";
import { LOGO_URL, SITE_URL } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";

type PageHeaderProps = {
  lang: Lang;
  backTo?: string;
  backLabel?: string;
};

/**
 * Sticky top bar: back link + logo on the left, language switcher on the
 * right, all on ONE baseline inside the shared Container so the header's
 * left edge lines up with the page content beneath it.
 */
export const PageHeader = ({ lang, backTo, backLabel }: PageHeaderProps) => (
  <header className="sticky top-0 z-30 bg-[#faf8f5]/85 backdrop-blur-md border-b border-[#ece5d9]">
    <Container className="flex items-center justify-between gap-4 h-[72px] sm:h-20">
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
        {backTo && backLabel && (
          <Link
            to={backTo}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#6b6660] hover:text-[#1a1a18] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
        )}
        <Link
          to={`/?lang=${lang}`}
          className="flex-shrink-0 transition-opacity hover:opacity-70"
        >
          <img
            src={LOGO_URL}
            alt="Isa Melo Dubai Real Estate"
            className="h-11 sm:h-14 w-auto object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <LanguageSwitcher />
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a18] text-white text-[11px] font-semibold tracking-wide hover:bg-[#2a2a28] transition-colors shadow-sm"
        >
          Visit Site
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Container>
  </header>
);

export default PageHeader;
