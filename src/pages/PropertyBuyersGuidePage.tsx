import React from "react";
import { Link } from "react-router-dom";
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
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/constants";

export const PropertyBuyersGuidePage = () => {
  const lang = useLang();
  const t = getDict(lang);

  const stats = [
    { icon: TrendingUp, value: "6–10%", label: t.guide.statRoi },
    { icon: ShieldCheck, value: "0%", label: t.guide.statTax },
    { icon: Building2, value: "100%", label: t.guide.statFreehold },
  ];

  const purchaseSteps = [
    { title: t.guide.s3Step1, body: t.guide.s3Step1b },
    { title: t.guide.s3Step2, body: t.guide.s3Step2b },
    { title: t.guide.s3Step3, body: t.guide.s3Step3b },
    { title: t.guide.s3Step4, body: t.guide.s3Step4b },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader lang={lang} backTo={`/?lang=${lang}`} backLabel={t.guide.back} />

      <main className="flex-1">
        {/* Hero */}
        <Container className="pt-12 pb-10 sm:pt-16 sm:pb-14">
          <div className="max-w-3xl">
            <span className="eyebrow">{t.guide.badge}</span>
            <h1 className="font-display text-[2rem] sm:text-5xl font-normal leading-[1.08] tracking-[-0.02em] text-[#1a1a18] mt-4">
              {t.guide.title}
            </h1>
            <p className="text-base text-[#6b6660] leading-relaxed mt-5 max-w-xl">
              {t.guide.subtitle}
            </p>
          </div>

          {/* Stats — flat row of figures, no clipping card overlap */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-[#ece5d9]">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon className="w-5 h-5 text-[#c9a961] mb-3" />
                <div className="font-display text-2xl sm:text-4xl font-normal tracking-[-0.02em] text-[#1a1a18]">
                  {value}
                </div>
                <div className="text-[11px] sm:text-xs text-[#8a847c] mt-1.5 leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Container>

        {/* Body */}
        <Container className="pb-14">
          <div className="max-w-2xl space-y-12">
            <section>
              <h2 className="font-display text-xl sm:text-2xl font-normal tracking-[-0.01em] text-[#1a1a18] flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#7B5EA7] flex-shrink-0" />
                {t.guide.s1Title}
              </h2>
              <p className="text-[15px] text-[#6b6660] leading-[1.75] mt-4">
                {t.guide.s1Body}
                <strong className="font-semibold text-[#1a1a18]">
                  {t.guide.s1Strong}
                </strong>
                {t.guide.s1Areas}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-normal tracking-[-0.01em] text-[#1a1a18] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#7B5EA7] flex-shrink-0" />
                {t.guide.s2Title}
              </h2>
              <p className="text-[15px] text-[#6b6660] leading-[1.75] mt-4">
                {t.guide.s2BodyPre}
                <strong className="font-semibold text-[#1a1a18]">
                  {t.guide.s2BodyStrong}
                </strong>{" "}
                {t.guide.s2BodyPost}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-normal tracking-[-0.01em] text-[#1a1a18] flex items-center gap-3 mb-7">
                <Building2 className="w-5 h-5 text-[#7B5EA7] flex-shrink-0" />
                {t.guide.s3Title}
              </h2>

              <ol className="relative">
                {purchaseSteps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {/* connector */}
                    {i < purchaseSteps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[19px] top-10 bottom-0 w-px bg-[#e6dfd3]"
                      />
                    )}
                    <span className="relative z-10 w-10 h-10 rounded-full bg-white border border-[#e6dfd3] text-[#7B5EA7] font-display text-base flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <p className="font-semibold text-[#1a1a18] text-[15px]">
                        {s.title}
                      </p>
                      <p className="text-sm text-[#6b6660] leading-relaxed mt-1.5">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Container>

        {/* CTA */}
        <Container className="pb-16">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#1a1a18] px-7 sm:px-12 py-12 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[#7B5EA7]/25 blur-3xl pointer-events-none"
            />
            <div className="relative max-w-xl">
              <span className="eyebrow">{t.guide.badge}</span>
              <h3 className="font-display text-2xl sm:text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white mt-3">
                {t.guide.ctaTitle}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mt-4">
                {t.guide.ctaBody}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to={`/consult-with-isa?lang=${lang}`}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#c9a961] text-[#1a1a18] font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <CalendarCheck className="w-4 h-4" />
                  {t.guide.ctaConsult}
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  {t.guide.ctaWhatsapp}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <PageFooter text={t.guide.footer} />
    </div>
  );
};

export default PropertyBuyersGuidePage;
