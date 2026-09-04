import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  RoiIcon,
  TaxFreeIcon,
  OwnershipIcon,
  ForeignersIcon,
  GoldenVisaIcon,
  ProcessIcon,
  PassportIcon,
  FundsIcon,
  IdCardIcon,
  DocsIcon,
  InfrastructureIcon,
  RentalIcon,
  LocationIcon,
  LifestyleIcon,
  MapPinIcon,
  CheckPremiumIcon,
} from "@/components/icons/GuideIcons";
import { WHATSAPP_URL } from "@/lib/constants";



/* ── Section heading ──────────────────────────────────── */
const SectionHeading = ({ icon: Icon, children }: { icon: React.FC<{ className?: string }>; children: React.ReactNode }) => (
  <h2 className="font-display text-[1.15rem] sm:text-[1.35rem] font-normal tracking-[-0.01em] text-[#171716] flex items-center gap-3">
    <Icon className="w-[22px] h-[22px] text-[#7351A6] flex-shrink-0" />
    {children}
  </h2>
);

/* ── Number badge ─────────────────────────────────────── */
const NumBadge = ({ n }: { n: string }) => (
  <span className="w-10 h-10 rounded-full bg-[#F3EFE8] text-[#7351A6] font-display text-[13px] font-medium flex items-center justify-center flex-shrink-0 select-none">
    {n}
  </span>
);

export const PropertyBuyersGuidePage = () => {
  const lang = useLang();
  const t = getDict(lang);

  const stats = [
    { icon: RoiIcon, value: "6–10%", label: t.guide.statRoi, desc: t.guide.statRoiDesc },
    { icon: TaxFreeIcon, value: "0%", label: t.guide.statTaxLabel, desc: t.guide.statTaxDesc },
    { icon: OwnershipIcon, value: "100%", label: t.guide.statFreehold, desc: t.guide.statFreeholdDesc },
  ];

  const steps = [
    { n: 1, title: t.guide.s3Step1, body: t.guide.s3Step1b },
    { n: 2, title: t.guide.s3Step2, body: t.guide.s3Step2b },
    { n: 3, title: t.guide.s3Step3, body: t.guide.s3Step3b },
    { n: 4, title: t.guide.s3Step4, body: t.guide.s3Step4b },
  ];

  const reqs = [
    { icon: PassportIcon, title: t.guide.reqPassport, desc: t.guide.reqPassportDesc },
    { icon: FundsIcon, title: t.guide.reqFunds, desc: t.guide.reqFundsDesc },
    { icon: IdCardIcon, title: t.guide.reqEmiratesId, desc: t.guide.reqEmiratesIdDesc },
    { icon: DocsIcon, title: t.guide.reqPropertyDocs, desc: t.guide.reqPropertyDocsDesc },
  ];

  const perks = [
    { icon: InfrastructureIcon, title: t.guide.perkInfrastructure, desc: t.guide.perkInfrastructureDesc },
    { icon: RentalIcon, title: t.guide.perkRental, desc: t.guide.perkRentalDesc },
    { icon: LocationIcon, title: t.guide.perkLocation, desc: t.guide.perkLocationDesc },
    { icon: LifestyleIcon, title: t.guide.perkLifestyle, desc: t.guide.perkLifestyleDesc },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171716] flex flex-col">
      <PageHeader lang={lang} backTo={`/?lang=${lang}`} backLabel={t.guide.back} />

      <main className="flex-1">
        {/* ════════════════════════════════════════════════════
            HERO CARD
        ════════════════════════════════════════════════════ */}
        <section className="pt-8 pb-6">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="bg-white rounded-[20px] border border-[#E8E3D9] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left: Text */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#B89552] font-semibold">{t.guide.badge}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-[#B89552]" />
                    <span className="text-[11px] text-[#8A8580] uppercase tracking-[0.08em] flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                        <circle cx="7" cy="7" r="6" />
                        <polyline points="7 4 7 7 9 8.5" />
                      </svg>
                      {t.guide.heroReadTime}
                    </span>
                  </div>

                  <h1 className="font-display text-[2rem] sm:text-[2.5rem] xl:text-[3rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#171716]">
                    {t.guide.title}
                  </h1>

                  <p className="text-[14.5px] text-[#6B6660] leading-[1.8] mt-5 max-w-[420px]">
                    {t.guide.subtitle}
                  </p>

                  <div className="flex items-center gap-2.5 mt-5 text-[12.5px] text-[#8A8580]">
                    <MapPinIcon className="w-4 h-4 text-[#B89552]" />
                    <span className="font-medium text-[#B89552]">{t.guide.heroLocation}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-[#D4CFC7]" />
                    <span>{t.guide.heroUpdated}</span>
                  </div>

                  <div className="flex items-center gap-2.5 mt-6 flex-wrap">
                    <Link
                      to={`/consult-with-isa?lang=${lang}`}
                      className="inline-flex items-center justify-center gap-2 bg-[#7351A6] hover:bg-[#5B3D8F] text-white font-semibold px-5 py-2.5 rounded-[10px] text-[12px] transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7351A6]/40"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      {t.guide.ctaConsult}
                    </Link>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#171716] hover:bg-[#7351A6] text-white font-semibold px-5 py-2.5 rounded-[10px] text-[12px] transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7351A6]/40"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      {t.guide.ctaWhatsapp}
                    </a>
                  </div>
                </div>

                {/* Right: Image + Floating Card */}
                <div className="relative min-h-[280px] lg:min-h-full">
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                    alt="Dubai Skyline"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />

                  {/* Floating card */}
                  <div className="absolute bottom-6 left-6 bg-white rounded-[14px] p-5 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.08)] border border-[#E8E3D9] w-[195px]">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#B89552] font-semibold leading-snug mb-3">
                      {t.guide.heroCardTitle}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckPremiumIcon className="w-4 h-4 text-[#2A9D8F] mt-[1px] flex-shrink-0" />
                        <span className="text-[10.5px] text-[#6B6660] leading-[1.4]">{t.guide.heroFreehold}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckPremiumIcon className="w-4 h-4 text-[#2A9D8F] mt-[1px] flex-shrink-0" />
                        <span className="text-[10.5px] text-[#6B6660] leading-[1.4]">{t.guide.heroOwnership}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            STATS ROW
        ════════════════════════════════════════════════════ */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="bg-white rounded-[20px] border border-[#E8E3D9] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] p-8 sm:p-10">
              <div className="grid grid-cols-3 gap-8 sm:gap-12">
                {stats.map(({ icon: Icon, value, label, desc }) => (
                  <div key={label} className="text-center sm:text-left">
                    <Icon className="w-7 h-7 text-[#B89552] mb-3 mx-auto sm:mx-0" />
                    <div className="font-display text-[1.75rem] sm:text-[2.25rem] font-normal tracking-[-0.03em] text-[#171716] leading-none">
                      {value}
                    </div>
                    <p className="text-[12px] sm:text-[13px] font-medium text-[#171716] mt-2 leading-snug">
                      {label}
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-[#8A8580] mt-1 leading-relaxed max-w-[200px]">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            CONTENT SECTIONS 01 – 03
        ════════════════════════════════════════════════════ */}
        <section className="pb-6">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-4">
            {/* 01 */}
            <div className="bg-white rounded-[18px] border border-[#E8E3D9] p-7 sm:p-8">
              <div className="flex items-start gap-5">
                <NumBadge n="01" />
                <div className="flex-1 min-w-0">
                  <SectionHeading icon={ForeignersIcon}>{t.guide.s1Title}</SectionHeading>
                  <p className="text-[14.5px] text-[#6B6660] leading-[1.8] mt-4">
                    {t.guide.s1Body}
                    <strong className="font-semibold text-[#171716]">{t.guide.s1Strong}</strong>
                    {t.guide.s1Areas}
                  </p>
                </div>
              </div>
            </div>

            {/* 02 */}
            <div className="bg-white rounded-[18px] border border-[#E8E3D9] p-7 sm:p-8">
              <div className="flex items-start gap-5">
                <NumBadge n="02" />
                <div className="flex-1 min-w-0">
                  <SectionHeading icon={GoldenVisaIcon}>{t.guide.s2Title}</SectionHeading>
                  <p className="text-[14.5px] text-[#6B6660] leading-[1.8] mt-4">
                    {t.guide.s2BodyPre}
                    <strong className="font-semibold text-[#171716]">{t.guide.s2BodyStrong}</strong>{" "}
                    {t.guide.s2BodyPost}
                  </p>
                </div>
              </div>
            </div>

            {/* 03 */}
            <div className="bg-white rounded-[18px] border border-[#E8E3D9] p-7 sm:p-8">
              <div className="flex items-start gap-5 mb-8">
                <NumBadge n="03" />
                <SectionHeading icon={ProcessIcon}>{t.guide.s3Title}</SectionHeading>
              </div>

              <div className="relative">
                <div className="hidden sm:block absolute top-[17px] left-[48px] right-[48px] h-px bg-gradient-to-r from-transparent via-[#B89552] to-transparent" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 sm:gap-5">
                  {steps.map((s) => (
                    <div key={s.n} className="flex flex-col items-center text-center relative">
                      <div className="w-[34px] h-[34px] rounded-full bg-white border-[1.5px] border-[#B89552] flex items-center justify-center mb-4 relative z-10">
                        <span className="font-display text-[13px] text-[#B89552] font-medium">{s.n}</span>
                      </div>
                      <p className="font-semibold text-[#171716] text-[13px] leading-tight">{s.title}</p>
                      <p className="text-[11.5px] text-[#8A8580] leading-[1.55] mt-2 px-1">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            REQUIREMENTS & BENEFITS
        ════════════════════════════════════════════════════ */}
        <section className="pb-8">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* What You'll Need */}
              <div className="bg-white rounded-[18px] border border-[#E8E3D9] p-7 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <DocsIcon className="w-5 h-5 text-[#7351A6]" />
                  <h3 className="font-display text-[17px] font-normal tracking-[-0.01em] text-[#171716]">
                    {t.guide.reqsTitle}
                  </h3>
                  <svg className="w-3.5 h-3.5 text-[#B5AEA4] ml-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3l4 4-4 4" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {reqs.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="border border-[#E8E3D9] rounded-[12px] p-4 hover:border-[#D4CFC7] transition-colors">
                      <div className="w-9 h-9 rounded-[10px] bg-[#F3EFE8] flex items-center justify-center mb-3">
                        <Icon className="w-[18px] h-[18px] text-[#7351A6]" />
                      </div>
                      <p className="font-semibold text-[#171716] text-[13px] leading-snug">{title}</p>
                      <p className="text-[11px] text-[#8A8580] leading-[1.45] mt-1">{desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10.5px] text-[#8A8580] mt-4 italic">{t.guide.reqNote}</p>
              </div>

              {/* Why Invest */}
              <div className="bg-white rounded-[18px] border border-[#E8E3D9] p-7 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-5 h-5 text-[#B89552]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 5 5.6.8-4 3.9.9 5.5L12 14.8 7.1 17.2l.9-5.5-4-3.9 5.6-.8z" />
                  </svg>
                  <h3 className="font-display text-[17px] font-normal tracking-[-0.01em] text-[#171716]">
                    {t.guide.perksTitle}
                  </h3>
                </div>

                <div className="space-y-4">
                  {perks.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-[10px] bg-[#F3EFE8] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-[18px] h-[18px] text-[#B89552]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#171716] text-[13px] leading-snug">{title}</p>
                        <p className="text-[11.5px] text-[#8A8580] leading-[1.5] mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            CTA
        ════════════════════════════════════════════════════ */}
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[20px] bg-[#171716] px-8 sm:px-12 py-12 sm:py-14">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.12]"
                style={{ background: "linear-gradient(135deg, #171716, #2A1F3D 55%, #171716)" }}
              />
              <div
                aria-hidden="true"
                className="absolute -top-28 -right-28 w-[360px] h-[360px] rounded-full bg-[#7351A6]/[0.06] blur-[100px] pointer-events-none"
              />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div className="max-w-[460px]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89552] font-semibold">
                    Private Property Access
                  </p>
                  <h3 className="font-display text-[1.35rem] sm:text-[1.6rem] font-normal leading-[1.22] tracking-[-0.02em] text-white mt-3">
                    {t.guide.ctaTitle}
                  </h3>
                  <p className="text-[13px] text-white/40 leading-[1.7] mt-4">
                    {t.guide.ctaBody}
                  </p>
                </div>

                <div className="flex flex-col gap-3 flex-shrink-0">
                  <Link
                    to={`/consult-with-isa?lang=${lang}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#B89552] hover:bg-[#A6864A] text-[#171716] font-semibold px-8 py-3.5 rounded-[12px] text-[13px] transition-all duration-300 active:scale-[0.98]"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    {t.guide.ctaConsult}
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-semibold px-8 py-3.5 rounded-[12px] text-[13px] transition-all duration-300 active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    {t.guide.ctaWhatsapp}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter text={t.guide.footer} />
    </div>
  );
};

export default PropertyBuyersGuidePage;
