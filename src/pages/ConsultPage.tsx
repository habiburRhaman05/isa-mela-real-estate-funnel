import React, { useEffect, useRef } from "react";
import {
  ChevronDown,
  Star,
  Clock,
  Globe,
  Sparkles,
} from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Container from "@/components/Container";

const ISA_IMAGE = "isa-mela.png";

const GHL_BOOKING_ID = "sShdixsaL8b6OlfL7kon";

export const ConsultPage = () => {
  const lang = useLang();
  const t = getDict(lang);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  /* Load the GHL form-embed script once */
  useEffect(() => {
    if (document.getElementById("ghl-form-embed-script")) return;
    const s = document.createElement("script");
    s.id = "ghl-form-embed-script";
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.type = "text/javascript";
    document.body.appendChild(s);
    scriptRef.current = s;
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader
        lang={lang}
        backTo={`/?lang=${lang}`}
        backLabel={t.guide.back}
      />

      <main className="flex-1">
        <Container className="py-4 sm:py-5 lg:py-6">
          {/* ── Hero text ─────────────────────────── */}
          {!false && (
            <div className="mb-4 text-center">
              <span className="eyebrow">{t.consult.eyebrow}</span>
              <h1 className="font-display text-[1.5rem] sm:text-[2rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1a1a18] mt-2">
                {t.consult.title}
              </h1>
              <p className="text-[13px] text-[#6b6660] leading-snug mt-2 max-w-md mx-auto">
                {t.consult.subtitle}
              </p>
            </div>
          )}

          {/* ── GHL Calendar Embed ────────────────── */}
          <div className="mx-auto max-w-2xl">
            <div className="bg-white border border-[#ece5d9] rounded-[1.75rem] shadow-[0_20px_50px_-30px_rgba(26,26,24,0.35)] overflow-hidden p-1">
              <iframe
                src={`https://api.leadconnectorhq.com/widget/booking/${GHL_BOOKING_ID}`}
                allow="payment"
                style={{ width: "100%", border: "none", overflow: "hidden" }}
                scrolling="no"
                id={`${GHL_BOOKING_ID}_1788517571533`}
                title="Book a Consultation"
              />
            </div>
          </div>

          {/* ── Trust cards ────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 sm:mt-6">
            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-[#7B5EA7]" fill="currentColor" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust1Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust1Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-[#2A9D8F]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust2Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust2Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-[#C9A961]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust3Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust3Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#E07A5F]/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-[#E07A5F]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust4Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust4Sub}</span>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* ── FAQ Section ──────────────────────────────────── */}
      <section className="pb-5 sm:pb-7">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-lg sm:text-xl font-normal tracking-[-0.01em] text-[#1a1a18] text-center mb-4">
              {t.consult.faqTitle}
            </h2>
            <div className="space-y-2">
              {[
                { q: t.consult.faq1Q, a: t.consult.faq1A },
                { q: t.consult.faq2Q, a: t.consult.faq2A },
                { q: t.consult.faq3Q, a: t.consult.faq3A },
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-[#ece5d9] rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer list-none text-[13px] font-medium text-[#1a1a18] hover:text-[#7B5EA7] transition-colors">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-[#b5aea4] flex-shrink-0 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-4 pb-4 text-[12px] text-[#6b6660] leading-snug">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <PageFooter text={t.consult.footer} />
    </div>
  );
};

export default ConsultPage;
