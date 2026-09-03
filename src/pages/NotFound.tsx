import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getDict, useLang } from "@/lib/i18n";
import PageFooter from "@/components/PageFooter";

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
    <div className="flex min-h-screen flex-col bg-[#ffffff]">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#0f0f0f]">
            {t.notFound.title}
          </h1>
          <p className="mb-4 text-xl text-[#6b6b6b]">{t.notFound.body}</p>
          <a
            href={`/?lang=${lang}`}
            className="text-[#7B5EA7] underline hover:text-[#6a4f96] font-semibold"
          >
            {t.notFound.home}
          </a>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        <PageFooter text={t.notFound.footer} />
      </div>
    </div>
  );
};

export default NotFound;
