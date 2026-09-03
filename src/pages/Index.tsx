import React from "react";
import { Instagram } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import PhotoCollage from "@/components/PhotoCollage";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

export const Index = () => {
  const lang = useLang();
  const t = getDict(lang);

  const navLinks = [
    { href: "/investment", label: t.nav.invest },
    { href: "/property-buyers-guide", label: t.nav.guide },
    { href: "/consult-with-isa", label: t.nav.consult },
    { href: "/newsletter", label: t.nav.newsletter },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f0f0f] flex flex-col">
      <PageHeader lang={lang} />

      {/* Split content */}
      <div className="flex-1 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-8 pb-8">
        <PhotoCollage />

        {/* Right: content */}
        <div className="flex flex-col items-center lg:items-start justify-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-center lg:text-left leading-tight mb-8 text-[#0f0f0f] max-w-lg">
            <span>{t.home.headline[0]}</span>{" "}
            <span className="text-[#7B5EA7]">{t.home.headline[1]}</span>
          </h1>

          <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#0f0f0f]/5 hover:bg-[#0f0f0f]/10 border border-[#7B5EA7]/40 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-[#0f0f0f]" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7B5EA7] hover:bg-[#6a4f96] hover:shadow-md active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              {t.home.whatsapp}
            </a>
          </div>

          <nav className="w-full max-w-md space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`${link.href}?lang=${lang}`}
                className="block w-full text-center border border-[#7B5EA7] hover:bg-[#7B5EA7] hover:shadow-md active:scale-[0.99] hover:text-white text-[#0f0f0f] rounded-full py-4 px-6 font-semibold text-sm sm:text-base transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        <PageFooter text={t.home.footer} />
      </div>
    </div>
  );
};

export default Index;
