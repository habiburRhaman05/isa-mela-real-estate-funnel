import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  ArrowRight,
  TrendingUp,
  BookOpen,
  CalendarCheck,
  BellRing,
  Building2,
  Home,
  Users,
  Map,
  Briefcase,
  Compass,
} from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import PhotoCollage from "@/components/PhotoCollage";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

const BASE = "http://isamelo-realestate.vercel.app";

const quickLinks = [
  {
    to: `${BASE}/projects`,
    label: "All Projects",
    icon: Building2,
    color: "from-[#4F8FE8] to-[#2563EB]",
    iconColor: "text-white",
    bg: "bg-[#4F8FE8]/10",
    external: true,
  },
  {
    to: `${BASE}/properties`,
    label: "Properties",
    icon: Home,
    color: "from-[#7B5EA7] to-[#5B3D8F]",
    iconColor: "text-white",
    bg: "bg-[#7B5EA7]/10",
    external: true,
  },
  {
    to: `${BASE}/about-us`,
    label: "About Us",
    icon: Users,
    color: "from-[#C9A961] to-[#A68B3E]",
    iconColor: "text-white",
    bg: "bg-[#C9A961]/10",
    external: true,
  },
  {
    to: `${BASE}/guide`,
    label: "Buyer's Guide",
    icon: Compass,
    color: "from-[#2A9D8F] to-[#1E7A6F]",
    iconColor: "text-white",
    bg: "bg-[#2A9D8F]/10",
    external: true,
  },
  {
    to: `${BASE}/invest`,
    label: "Investment",
    icon: Briefcase,
    color: "from-[#E07A5F] to-[#C45D3E]",
    iconColor: "text-white",
    bg: "bg-[#E07A5F]/10",
    external: true,
  },
  {
    to: `${BASE}/map`,
    label: "Explore Map",
    icon: Map,
    color: "from-[#6C8EBF] to-[#4A6D99]",
    iconColor: "text-white",
    bg: "bg-[#6C8EBF]/10",
    external: true,
  },
];

export const Index = () => {
  const lang = useLang();
  const t = getDict(lang);

  const navLinks = [
    { to: "/investment", label: t.nav.invest, icon: TrendingUp },
    { to: "/property-buyers-guide", label: t.nav.guide, icon: BookOpen },
    { to: "/consult-with-isa", label: t.nav.consult, icon: CalendarCheck },
    { to: "/newsletter", label: t.nav.newsletter, icon: BellRing },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader lang={lang} />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <Container className="grid lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-10 lg:gap-16 xl:gap-20 items-center py-8 sm:py-10 lg:py-12 pb-4 sm:pb-6 lg:pb-8">
          <PhotoCollage size="tall" />

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-5">
              <span className="hidden lg:block w-8 h-px bg-[#c9a961]" />
              <span className="eyebrow">{t.home.eyebrow}</span>
            </div>

            <h1 className="font-display text-[2rem] sm:text-5xl xl:text-[3.35rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#1a1a18] max-w-[19ch]">
              {t.home.headline[0]}{" "}
              <em className="not-italic text-[#7B5EA7]">
                {t.home.headline[1]}
              </em>
            </h1>

            <div className="flex items-center gap-3 mt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1a1a18] hover:bg-[#7B5EA7] text-white font-semibold px-6 py-3.5 rounded-full text-sm transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                {t.home.whatsapp}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border border-[#e6dfd3] bg-white hover:border-[#c9a961] flex items-center justify-center transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
              >
                <Instagram className="w-[18px] h-[18px] text-[#1a1a18]" />
              </a>
            </div>

            <nav className="w-full max-w-lg mt-10 flex flex-col gap-2.5">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={`${to}?lang=${lang}`}
                  className="group flex items-center gap-4 bg-white border border-[#ece5d9] hover:border-[#c9a961] rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-[0_14px_30px_-20px_rgba(26,26,24,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30 text-left"
                >
                  <span className="w-10 h-10 rounded-full bg-[#f5f1ea] group-hover:bg-[#7B5EA7] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon className="w-[18px] h-[18px] text-[#7B5EA7] group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-[#1a1a18] leading-snug">
                    {label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#b5aea4] group-hover:text-[#7B5EA7] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                </Link>
              ))}
            </nav>
          </div>
        </Container>

        {/* ── Quick-access cards ─────────────────────────────── */}
        <section className="pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 lg:pb-16 border-t border-[#ece5d9]">
          <Container>
            <div className="text-center mb-8 sm:mb-10">
              <p className="eyebrow mb-3">Explore</p>
              <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#1a1a18]">
                Discover More
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {quickLinks.map(({ to, label, icon: Icon, color, iconColor }) => (
                <a
                  key={to}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl bg-white border border-[#ece5d9] hover:border-transparent transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(26,26,24,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
                >
                  {/* Gradient icon badge */}
                  <span
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.8} />
                  </span>

                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#1a1a18] leading-tight text-center">
                    {label}
                  </span>

                  {/* Subtle bottom accent line on hover */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-gradient-to-r ${color} group-hover:w-8 transition-all duration-300`}
                  />
                </a>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <PageFooter text={t.home.footer} />
    </div>
  );
};

export default Index;
