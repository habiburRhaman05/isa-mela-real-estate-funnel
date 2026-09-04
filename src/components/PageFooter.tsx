import { Facebook, Twitter, Linkedin } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import Container from "@/components/Container";
import { INSTAGRAM_URL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";

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
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Facebook"
          className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
        >
          <Facebook className="w-4 h-4 text-white" fill="white" />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on X (Twitter)"
          className="w-9 h-9 rounded-full bg-[#000000] flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
        >
          <Twitter className="w-4 h-4 text-white" fill="white" />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
          className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
        >
          <Linkedin className="w-4 h-4 text-white" fill="white" />
        </a>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Website"
          className="w-9 h-9 rounded-full bg-white border border-[#ece5d9] flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
        >
          <GoogleIcon className="w-5 h-5" />
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
