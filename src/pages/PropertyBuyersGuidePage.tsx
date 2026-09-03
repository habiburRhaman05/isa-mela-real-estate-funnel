import React from "react";
import {
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Building2,
  CalendarCheck,
} from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/constants";

export const PropertyBuyersGuidePage = () => {
  const lang = useLang();
  const t = getDict(lang);

  const purchaseSteps = [
    { title: t.guide.s3Step1, body: t.guide.s3Step1b },
    { title: t.guide.s3Step2, body: t.guide.s3Step2b },
    { title: t.guide.s3Step3, body: t.guide.s3Step3b },
    { title: t.guide.s3Step4, body: t.guide.s3Step4b },
  ];

  const stats = [
    { icon: TrendingUp, value: "6% – 10%", label: t.guide.statRoi },
    { icon: ShieldCheck, value: "0% Tax", label: t.guide.statTax },
    { icon: Building2, value: "100% Freehold", label: t.guide.statFreehold },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f0f0f] flex flex-col">
      <PageHeader lang={lang} backHref={`/?lang=${lang}`} backLabel={t.guide.back} compact />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 pb-12 pt-4">
        {/* Hero */}
        <div className="bg-[#f5f3ef] rounded-[2.5rem] px-6 sm:px-12 pt-10 pb-16 sm:pb-20 text-center">
          <span className="inline-block bg-white text-[#7B5EA7] border border-[#7B5EA7]/25 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">
            {t.guide.badge}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#0f0f0f] leading-tight max-w-2xl mx-auto">
            {t.guide.title}
          </h1>
          <p className="text-sm sm:text-base text-[#6b6b6b] mt-4 max-w-xl mx-auto leading-relaxed">
            {t.guide.subtitle}
          </p>
        </div>

        {/* Floating stats bar — overlaps the hero's bottom edge */}
        <div className="-mt-10 sm:-mt-12 px-2 sm:px-4">
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_-20px_rgba(15,15,15,0.22)] border border-[#7B5EA7]/10 grid grid-cols-3 divide-x divide-[#7B5EA7]/10">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center px-2 py-5 sm:py-6">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#7B5EA7] mx-auto mb-2" />
                <div className="text-base sm:text-xl font-bold text-[#0f0f0f] leading-tight">
                  {value}
                </div>
                <div className="text-[10px] sm:text-xs text-[#6b6b6b] mt-1 leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guide content */}
        <div className="max-w-2xl mx-auto mt-12 sm:mt-16 space-y-10">
          <section className="space-y-2.5">
            <h2 className="text-xl font-bold text-[#0f0f0f] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-[#7B5EA7]" />
              </span>
              {t.guide.s1Title}
            </h2>
            <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed pl-[42px]">
              {t.guide.s1Body}
              <strong className="text-[#0f0f0f]">{t.guide.s1Strong}</strong>
              {t.guide.s1Areas}
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-xl font-bold text-[#0f0f0f] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#7B5EA7]" />
              </span>
              {t.guide.s2Title}
            </h2>
            <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed pl-[42px]">
              {t.guide.s2BodyPre}
              <strong className="text-[#0f0f0f]">{t.guide.s2BodyStrong}</strong>{" "}
              {t.guide.s2BodyPost}
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-bold text-[#0f0f0f] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-[#7B5EA7]" />
              </span>
              {t.guide.s3Title}
            </h2>

            {/* Numbered timeline */}
            <div className="relative pl-[42px]">
              <div className="absolute left-[17px] top-1 bottom-1 w-px bg-[#7B5EA7]/20" />
              <div className="space-y-6">
                {purchaseSteps.map((s, i) => (
                  <div key={i} className="relative flex gap-4">
                    <div className="relative z-10 w-9 h-9 -ml-[42px] rounded-full bg-[#7B5EA7] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                      {i + 1}
                    </div>
                    <div className="pt-1.5 -ml-2">
                      <p className="font-bold text-[#0f0f0f] text-sm sm:text-base">
                        {s.title}
                      </p>
                      <p className="text-sm text-[#6b6b6b] mt-1 leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-[#7B5EA7] to-[#5f4784] rounded-[2rem] px-6 sm:px-10 py-10 text-center space-y-3 shadow-[0_20px_50px_-20px_rgba(123,94,167,0.55)]">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {t.guide.ctaTitle}
            </h3>
            <p className="text-sm text-white/80 max-w-md mx-auto">
              {t.guide.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
              <a
                href={`/consult-with-isa?lang=${lang}`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 active:scale-[0.98] text-[#7B5EA7] font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#7B5EA7]"
              >
                <CalendarCheck className="w-4 h-4" />
                {t.guide.ctaConsult}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/40 text-white font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#7B5EA7]"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                {t.guide.ctaWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8">
        <PageFooter text={t.guide.footer} />
      </div>
    </div>
  );
};

export default PropertyBuyersGuidePage;
