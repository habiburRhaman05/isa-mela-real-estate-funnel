import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Container from "@/components/Container";

const NotFound = () => {
  const location = useLocation();
  const lang = useLang();
  const t = getDict(lang);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader lang={lang} />
      <main className="flex-1 flex items-center">
        <Container className="py-20 text-center">
          <span className="font-display text-6xl sm:text-8xl font-normal tracking-[-0.03em] text-[#e0d8ca] block">
            {t.notFound.title}
          </span>
          <p className="font-display text-xl sm:text-2xl text-[#1a1a18] mt-4">
            {t.notFound.body}
          </p>
          <Link
            to={`/?lang=${lang}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7B5EA7] hover:text-[#1a1a18] transition-colors mt-7"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.notFound.home}
          </Link>
        </Container>
      </main>
      <PageFooter text={t.notFound.footer} />
    </div>
  );
};

export default NotFound;
