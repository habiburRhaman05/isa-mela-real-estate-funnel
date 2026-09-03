import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import PhotoCollage from "@/components/PhotoCollage";
import Container from "@/components/Container";
import type { Lang } from "@/lib/i18n";

type FunnelLayoutProps = {
  lang: Lang;
  footerText: string;
  children: ReactNode;
  backTo?: string;
  backLabel?: string;
};

/**
 * The split page shell used by every funnel step: portrait on the left,
 * content on the right, vertically centred so the two columns end together.
 * Previously each page hardcoded its own `pt-16` against an uncapped image,
 * which left 150–250px of dead space under the form.
 */
export const FunnelLayout = ({
  lang,
  footerText,
  children,
  backTo,
  backLabel,
}: FunnelLayoutProps) => (
  <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
    <PageHeader lang={lang} backTo={backTo} backLabel={backLabel} />

    <main className="flex-1">
      <Container className="grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-10 lg:gap-16 items-center py-10 sm:py-14">
        <PhotoCollage className="hidden lg:block" />
        <div className="w-full max-w-lg mx-auto lg:mx-0">{children}</div>
      </Container>
    </main>

    <PageFooter text={footerText} />
  </div>
);

export default FunnelLayout;
