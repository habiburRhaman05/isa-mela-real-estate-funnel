import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import FunnelLayout from "@/components/FunnelLayout";

export const ThankYouPage = () => {
  const lang = useLang();
  const t = getDict(lang);

  return (
    <FunnelLayout lang={lang} footerText={t.thankYou.footer}>
      <div className="text-center lg:text-left">
        <span className="inline-flex w-12 h-12 rounded-full bg-[#7B5EA7] items-center justify-center mb-6">
          <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
        </span>
        <div>
          <span className="eyebrow">{t.thankYou.eyebrow}</span>
        </div>
        <h1 className="font-display text-[1.75rem] sm:text-[2.5rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1a1a18] mt-3">
          {t.thankYou.line1}
        </h1>
        <p className="font-display text-[1.75rem] sm:text-[2.5rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#7B5EA7] mt-2">
          {t.thankYou.line2}
        </p>
        <Link
          to={`/?lang=${lang}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6b6660] hover:text-[#1a1a18] transition-colors mt-9"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.thankYou.back}
        </Link>
      </div>
    </FunnelLayout>
  );
};

export default ThankYouPage;
