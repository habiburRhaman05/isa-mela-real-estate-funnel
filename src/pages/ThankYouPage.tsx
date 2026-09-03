import React from "react";
import { CheckCircle2 } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import PhotoCollage from "@/components/PhotoCollage";

export const ThankYouPage = () => {
  const lang = useLang();
  const t = getDict(lang);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f0f0f] flex flex-col">
      <PageHeader lang={lang} />

      {/* Split content */}
      <div className="flex-1 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-8 pb-8">
        <PhotoCollage />

        {/* Right: thank you message */}
        <div className="text-center lg:text-left max-w-md mx-auto lg:mx-0 space-y-4 px-2">
          <span className="inline-flex w-14 h-14 rounded-full bg-[#7B5EA7]/10 items-center justify-center mb-2">
            <CheckCircle2 className="w-8 h-8 text-[#7B5EA7]" />
          </span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight text-[#0f0f0f]">
            {t.thankYou.line1}
          </h1>
          <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight text-[#7B5EA7] pt-2">
            {t.thankYou.line2}
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        <PageFooter text={t.thankYou.footer} />
      </div>
    </div>
  );
};

export default ThankYouPage;
