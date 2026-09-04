import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  MapPin,
  Globe,
  Users,
  Shield,
  Wallet,
  FileText,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { WHATSAPP_URL } from "@/lib/constants";

export const PropertyBuyersGuidePage = () => {
  const lang = useLang();
  const t = getDict(lang);

  const stats = [
    { icon: TrendingUp, value: "6–10%", label: t.guide.statRoi, desc: "Strong rental demand & capital growth" },
    { icon: ShieldCheck, value: "0%", label: "Property or Income Tax", desc: "No property tax, no capital gains tax, no income tax" },
    { icon: Building2, value: "100%", label: t.guide.statFreehold, desc: "Full ownership in designated freehold areas" },
  ];

  const purchaseSteps = [
    { num: 1, title: t.guide.s3Step1, body: t.guide.s3Step1b },
    { num: 2, title: t.guide.s3Step2, body: t.guide.s3Step2b },
    { num: 3, title: t.guide.s3Step3, body: t.guide.s3Step3b },
    { num: 4, title: t.guide.s3Step4, body: t.guide.s3Step4b },
  ];

  const requirements = [
    { icon: FileText, title: "Passport", desc: "Valid passport copy of all investors" },
    { icon: Wallet, title: "Proof of Funds", desc: "Bank statement or funds verification" },
    { icon: Shield, title: "Emirates ID*", desc: "If you already have UAE residency" },
    { icon: Building2, title: "Property Documents", desc: "SPA / MOU and related documents" },
  ];

  const benefits = [
    { icon: Building2, title: "World-Class Infrastructure", desc: "Modern, safe and investor-friendly environment." },
    { icon: TrendingUp, title: "High Rental Demand", desc: "Strong yields driven by expats and tourism." },
    { icon: Globe, title: "Strategic Location", desc: "Gateway between Europe, Asia & Africa." },
    { icon: Shield, title: "Lifestyle & Security", desc: "Tax-free living with top-tier quality of life." },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader lang={lang} backTo={`/?lang=${lang}`} backLabel={t.guide.back} />

      <main className="flex-1">
        {/* ── Hero Section ────────────────────────────────────── */}
        <Container className="pt-12 pb-10 sm:pt-16 sm:pb-14">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-10 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-5">
                <span className="eyebrow">{t.guide.badge}</span>
                <span className="text-[#8a847c]">•</span>
                <span className="text-xs text-[#8a847c] uppercase tracking-wider">6 Min Read</span>
              </div>
              <h1 className="font-display text-[2.25rem] sm:text-5xl xl:text-[3.25rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#1a1a18]">
                {t.guide.title}
              </h1>
              <p className="text-base text-[#6b6660] leading-[1.75] mt-6 max-w-lg">
                {t.guide.subtitle}
              </p>
              <div className="flex items-center gap-3 mt-6 text-sm text-[#8a847c]">
                <MapPin className="w-4 h-4 text-[#c9a961]" />
                <span className="font-medium text-[#c9a961]">Dubai, UAE</span>
                <span>•</span>
                <span>Updated September 2026</span>
              </div>
            </div>

            {/* Right: Dubai Image with Overlay Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                  alt="Dubai Skyline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] border border-[#ece5d9] max-w-[220px]">
                <p className="text-[10px] uppercase tracking-widest text-[#c9a961] font-semibold mb-3">Dubai<br />Real Estate</p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] text-[#6b6660] leading-tight">Freehold areas for foreigners</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] text-[#6b6660] leading-tight">100% ownership in eligible zones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-16 pt-10 border-t border-[#ece5d9]">
            {stats.map(({ icon: Icon, value, label, desc }) => (
              <div key={label} className="text-center sm:text-left">
                <Icon className="w-6 h-6 text-[#c9a961] mb-3 mx-auto sm:mx-0" />
                <div className="font-display text-2xl sm:text-4xl font-normal tracking-[-0.02em] text-[#1a1a18]">
                  {value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#1a1a18] mt-1.5">
                  {label}
                </div>
                <div className="text-xs text-[#8a847c] mt-1 leading-snug max-w-[200px]">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </Container>

        {/* ── Content Sections ────────────────────────────────── */}
        <Container className="pb-10">
          <div className="space-y-5">
            {/* Section 01 */}
            <div className="bg-white rounded-2xl border border-[#ece5d9] p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <span className="w-10 h-10 rounded-full bg-[#f5f1ea] text-[#7B5EA7] font-display text-sm flex items-center justify-center flex-shrink-0">
                  01
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-xl sm:text-2xl font-normal tracking-[-0.01em] text-[#1a1a18] flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#7B5EA7] flex-shrink-0" />
                    {t.guide.s1Title}
                  </h2>
                  <p className="text-[15px] text-[#6b6660] leading-[1.75] mt-4">
                    {t.guide.s1Body}
                    <strong className="font-semibold text-[#1a1a18]">
                      {t.guide.s1Strong}
                    </strong>
                    {t.guide.s1Areas}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 02 */}
            <div className="bg-white rounded-2xl border border-[#ece5d9] p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <span className="w-10 h-10 rounded-full bg-[#f5f1ea] text-[#7B5EA7] font-display text-sm flex items-center justify-center flex-shrink-0">
                  02
                </span>
                <div className="flex-1">
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
                </div>
              </div>
            </div>

            {/* Section 03: Step-by-Step */}
            <div className="bg-white rounded-2xl border border-[#ece5d9] p-6 sm:p-8">
              <div className="flex items-start gap-5 mb-8">
                <span className="w-10 h-10 rounded-full bg-[#f5f1ea] text-[#7B5EA7] font-display text-sm flex items-center justify-center flex-shrink-0">
                  03
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-normal tracking-[-0.01em] text-[#1a1a18] flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-[#7B5EA7] flex-shrink-0" />
                  {t.guide.s3Title}
                </h2>
              </div>

              {/* Horizontal Steps with Gold Line */}
              <div className="relative">
                {/* Gold connecting line */}
                <div className="hidden sm:block absolute top-[18px] left-[50px] right-[50px] h-[1px] bg-gradient-to-r from-[#c9a961]/0 via-[#c9a961] to-[#c9a961]/0" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
                  {purchaseSteps.map((step) => (
                    <div key={step.num} className="flex flex-col items-center text-center relative">
                      {/* Number Circle */}
                      <div className="w-9 h-9 rounded-full bg-white border-2 border-[#c9a961] flex items-center justify-center mb-4 relative z-10">
                        <span className="font-display text-sm text-[#c9a961] font-medium">{step.num}</span>
                      </div>
                      <p className="font-semibold text-[#1a1a18] text-sm leading-tight">
                        {step.title}
                      </p>
                      <p className="text-xs text-[#8a847c] leading-relaxed mt-2">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* ── Requirements & Benefits ─────────────────────────── */}
        <Container className="pb-10">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* What You'll Need */}
            <div className="bg-white rounded-2xl border border-[#ece5d9] p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <FileText className="w-5 h-5 text-[#7B5EA7]" />
                <h3 className="font-display text-lg font-normal tracking-[-0.01em] text-[#1a1a18]">
                  What You'll Need
                </h3>
                <ArrowRight className="w-4 h-4 text-[#8a847c]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {requirements.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="border border-[#ece5d9] rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-[#f5f1ea] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#7B5EA7]" />
                    </div>
                    <p className="font-semibold text-[#1a1a18] text-sm">{title}</p>
                    <p className="text-[11px] text-[#8a847c] leading-snug mt-1">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#8a847c] mt-4 italic">*If applicable</p>
            </div>

            {/* Why Invest in Dubai? */}
            <div className="bg-white rounded-2xl border border-[#ece5d9] p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <TrendingUp className="w-5 h-5 text-[#c9a961]" />
                <h3 className="font-display text-lg font-normal tracking-[-0.01em] text-[#1a1a18]">
                  Why Invest in Dubai?
                </h3>
              </div>
              <div className="space-y-5">
                {benefits.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#f5f1ea] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a1a18] text-sm">{title}</p>
                      <p className="text-[12px] text-[#8a847c] leading-snug mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* ── CTA Section ─────────────────────────────────────── */}
        <Container className="pb-16">
          <div className="relative overflow-hidden rounded-[20px] bg-[#1a1a18] px-8 sm:px-12 py-12 sm:py-14">
            {/* Subtle dark purple gradient overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
              style={{
                background: "linear-gradient(135deg, #1a1a18 0%, #2d1f3d 50%, #1a1a18 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#7B5EA7]/10 blur-[100px] pointer-events-none"
            />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div className="max-w-lg">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a961] font-semibold">
                  Private Property Access
                </span>
                <h3 className="font-display text-2xl sm:text-[1.75rem] font-normal leading-[1.2] tracking-[-0.02em] text-white mt-3">
                  Ready to explore exclusive off-market opportunities?
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mt-4">
                  Book a 1-on-1 private consultation with Isa Melo for curated property selections tailored to your goals.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  to={`/consult-with-isa?lang=${lang}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#c9a961] hover:bg-[#b89a52] text-[#1a1a18] font-semibold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a961]/50"
                >
                  <CalendarCheck className="w-4 h-4" />
                  {t.guide.ctaConsult}
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  {t.guide.ctaWhatsapp}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-[#ece5d9]">
        <Container className="flex flex-col-reverse sm:flex-row items-center justify-between gap-5 py-7">
          <p className="text-xs text-[#8a847c] text-center sm:text-left">
            © {new Date().getFullYear()} {t.guide.footer}
          </p>
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.instagram.com/isamelo.realestate/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{
                background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              }}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center transition-transform hover:scale-110"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default PropertyBuyersGuidePage;
