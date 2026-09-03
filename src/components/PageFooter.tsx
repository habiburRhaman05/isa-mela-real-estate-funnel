import { Instagram } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

type PageFooterProps = {
  text: string;
};

/**
 * Shared footer for every funnel page: copyright on the left, social
 * links on the right, each icon in its own real brand color (not the
 * site's purple) so they read as recognizable platform links.
 */
export const PageFooter = ({ text }: PageFooterProps) => (
  <footer className="mt-auto pt-6 pb-8 border-t border-[#7B5EA7]/10">
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-[#6b6b6b] text-center sm:text-left">
        © {new Date().getFullYear()} {text}
      </p>
      <div className="flex items-center gap-3">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40"
          style={{
            background:
              "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
          }}
        >
          <Instagram className="w-4 h-4 text-white" />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
        </a>
      </div>
    </div>
  </footer>
);

export default PageFooter;
