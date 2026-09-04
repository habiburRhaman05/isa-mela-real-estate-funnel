import React from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ArrowLeft,
  CalendarCheck,
  Clock,
  Globe,
  Sparkles,
  Star,
  Heart,
} from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Container from "@/components/Container";

export const ThankYouPage = () => {
  const lang = useLang();
  const t = getDict(lang);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader lang={lang} backTo={`/?lang=${lang}`} backLabel={t.guide.back} />

      <main className="flex-1 flex items-center justify-center">
        <Container className="py-10 sm:py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Check icon + Received badge — compact single row */}
            <div className="animate-in fade-in zoom-in-75 duration-500 mb-6">
              <span className="inline-flex items-center gap-3 bg-white border border-[#ece5d9] rounded-full pr-4 pl-1.5 py-1.5 shadow-[0_4px_20px_-4px_rgba(123,94,167,0.2)]">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B5EA7] to-[#9B7BC7] flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(123,94,167,0.4)]">
                  <Check className="w-4.5 h-4.5 text-white" strokeWidth={3} />
                </span>
                <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-bold text-[#7B5EA7]">
                  <Sparkles className="w-3 h-3" />
                  {t.thankYou.eyebrow}
                </span>
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1a1a18] animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">
              {t.thankYou.line1}
            </h1>

            {/* Accent line */}
            <p className="font-display text-[1.5rem] sm:text-[2rem] lg:text-[2.25rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#7B5EA7] mt-3 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
              {t.thankYou.line2}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 my-8 animate-in fade-in duration-500 delay-400">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#d5cec2]" />
              <Heart className="w-4 h-4 text-[#C9A961]" fill="currentColor" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#d5cec2]" />
            </div>

            {/* What happens next card */}
            <div className="bg-white border border-[#ece5d9] rounded-2xl shadow-[0_8px_30px_-10px_rgba(26,26,24,0.1)] p-5 sm:p-6 mb-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
              <h3 className="text-[13px] font-bold text-[#1a1a18] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-3 h-3 text-[#7B5EA7]" fill="currentColor" />
                </span>
                {t.thankYou.whatNext}
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#faf8f5] border border-[#f0ebe3]">
                  <span className="w-7 h-7 rounded-lg bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CalendarCheck className="w-3.5 h-3.5 text-[#7B5EA7]" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold text-[#1a1a18]">{t.thankYou.bookingConfirmed}</span>
                    <span className="block text-[10px] text-[#8a847c] leading-snug mt-0.5">
                      {t.thankYou.bookingConfirmedSub}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#faf8f5] border border-[#f0ebe3]">
                  <span className="w-7 h-7 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold text-[#1a1a18]">{t.thankYou.quickResponse}</span>
                    <span className="block text-[10px] text-[#8a847c] leading-snug mt-0.5">
                      {t.thankYou.quickResponseSub}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#faf8f5] border border-[#f0ebe3]">
                  <span className="w-7 h-7 rounded-lg bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="w-3.5 h-3.5 text-[#C9A961]" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold text-[#1a1a18]">{t.thankYou.globalExpertise}</span>
                    <span className="block text-[10px] text-[#8a847c] leading-snug mt-0.5">
                      {t.thankYou.globalExpertiseSub}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back home link */}
            <Link
              to={`/?lang=${lang}`}
              className="inline-flex items-center gap-2 bg-[#1a1a18] text-white hover:bg-[#2a2a28] text-[12px] font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-[0_4px_14px_-2px_rgba(26,26,24,0.3)] hover:shadow-[0_6px_20px_-2px_rgba(26,26,24,0.4)] hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-3 duration-500 delay-600"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.thankYou.back}
            </Link>
          </div>
        </Container>
      </main>

      <PageFooter text={t.thankYou.footer} />
    </div>
  );
};

export default ThankYouPage;
