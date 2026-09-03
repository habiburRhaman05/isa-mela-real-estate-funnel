import { Instagram } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Container from "@/components/Container";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

type PageFooterProps = {
  text: string;
};

/**
 * Copyright left, social links right, each icon in its own real brand color.
 * Rendered inside the shared Container so it aligns with the header above it.
 */
export const PageFooter = ({ text }: PageFooterProps) => (
  <footer className="mt-auto border-t border-[#ece5d9]">
    <Container className="flex flex-col-reverse sm:flex-row items-center justify-between gap-5 py-7">
      <p className="text-xs text-[#8a847c] text-center sm:text-left">
        © {new Date().getFullYear()} {text}
      </p>
      <div className="flex items-center gap-2.5">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
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
          className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
        </a>
      </div>
    </Container>
  </footer>
);

export default PageFooter;
