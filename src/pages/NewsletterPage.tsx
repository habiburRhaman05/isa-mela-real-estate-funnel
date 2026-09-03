import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTrackingEvent } from "@/lib/tracking";
import {
  Loader2,
  Mail,
  User,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  CheckCircle2,
  Phone,
  Globe,
} from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Container from "@/components/Container";
import FormSuccess from "@/components/FormSuccess";
import {
  pillClass,
  labelClass,
  primaryButtonClass,
} from "@/components/FormField";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  createNewsletterSchema,
  NEWSLETTER_DEFAULT_VALUES,
  type NewsletterFormValues,
} from "@/lib/schemas";
import { WHATSAPP_URL } from "@/lib/constants";

const BASE = "http://isamelo-realestate.vercel.app";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  TrendingUp,
  Shield,
};

export const NewsletterPage = () => {
  const navigate = useNavigate();
  const lang = useLang();
  const t = getDict(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = useMemo(
    () =>
      createNewsletterSchema({
        nameError: t.newsletter.nameError,
        emailError: t.newsletter.emailError,
        consentError: t.newsletter.consentError,
      }),
    [t],
  );

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: NEWSLETTER_DEFAULT_VALUES,
    mode: "onBlur",
  });

  const onSubmit = (values: NewsletterFormValues) => {
    setIsSubmitting(true);

    const trackingPayload = {
      type: "external form_submission" as const,
      timestamp: Date.now(),
      formId: "newsletter-early-access",
      formData: {
        first_name: values.name.split(" ")[0] || values.name,
        last_name: values.name.split(" ").slice(1).join(" ") || "",
        phone: "",
        phone_country: "",
        phone_country_code: "",
        phone_dial_code: "",
        email: values.email,
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        phone: "Phone Number",
        phone_country: "Phone Country",
        phone_country_code: "Phone Country Code",
        phone_dial_code: "Phone Dial Code",
        email: "Email",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: "tk_052d6da214a342649fb05f5efd6fb348",
      locationId: "iGbC817rCzAfj7HtPYRs",
      projectId: "1788077166891936938",
      sessionId: crypto.randomUUID(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
        source: "ai_studio",
        projectId: "1788077166891936938",
        formName: "Early Access Newsletter Form",
      },
    };

    postTrackingEvent(trackingPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => navigate(`/thank-you?lang=${lang}`), 1400);
    }, 600);
  };

  const benefits = t.newsletter.benefits;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader
        lang={lang}
        backTo={`/?lang=${lang}`}
        backLabel={t.guide.back}
      />

      <main className="flex-1">
        <Container className="py-10 sm:py-14 lg:py-20">
          {/* ── Top: Headline only, centered, no bg ─────── */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="eyebrow text-[#7B5EA7]">{t.newsletter.eyebrow}</span>
            <h1 className="font-display text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-normal leading-[1.1] tracking-[-0.02em] text-[#1a1a18] mt-3">
              {t.newsletter.headline[0]}{" "}
              <em className="not-italic text-[#7B5EA7]">
                {t.newsletter.headline[1]}
              </em>
            </h1>
            <p className="mt-4 text-sm sm:text-[15px] text-[#8a847c] leading-relaxed max-w-lg mx-auto">
              {t.newsletter.subtitle}
            </p>
          </div>

          {/* ── Middle: Asymmetric 2-column ────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
            {/* Left column: Stacked benefit cards with staggered offset */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {benefits.map((b, i) => {
                const Icon = ICON_MAP[b.icon] || Zap;
                const offsets = ["lg:translate-y-0", "lg:translate-y-6", "lg:translate-y-3"];
                return (
                  <div
                    key={i}
                    className={`bg-white border border-[#ece5d9] rounded-2xl px-6 py-6 transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(26,26,24,0.1)] hover:border-[#C9A961]/30 ${offsets[i] || ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B5EA7]/10 to-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#7B5EA7]" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-[#1a1a18]">
                          {b.title}
                        </h3>
                        <p className="text-[13px] text-[#8a847c] leading-relaxed mt-1.5">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}


            </div>

            {/* Right column: Sticky form */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white border border-[#ece5d9] rounded-[1.75rem] shadow-[0_20px_50px_-30px_rgba(26,26,24,0.35)] p-6 sm:p-8">
                <h2 className="font-display text-xl font-normal text-[#1a1a18] text-center mb-1">
                  {t.newsletter.formTitle}
                </h2>
                <div className="w-10 h-[2px] bg-[#7B5EA7] rounded-full mx-auto mt-2 mb-6" />

                {isSubmitted ? (
                  <FormSuccess
                    title={t.newsletter.success}
                    subtitle={t.newsletter.successSub}
                  />
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-4"
                      noValidate
                    >
                      {/* Name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className={labelClass}>
                              {t.newsletter.nameLabel}
                            </FormLabel>
                            <div className={pillClass(!!fieldState.error)}>
                              <User className="w-4 h-4 text-[#b5aea4] flex-shrink-0" />
                              <FormControl>
                                <input
                                  {...field}
                                  type="text"
                                  placeholder={t.newsletter.namePh}
                                  className="w-full bg-transparent text-[#1a1a18] placeholder-[#b5aea4] focus:outline-none text-sm"
                                />
                              </FormControl>
                            </div>
                            <FormMessage className="text-xs font-normal" />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className={labelClass}>
                              {t.newsletter.emailLabel}
                            </FormLabel>
                            <div className={pillClass(!!fieldState.error)}>
                              <Mail className="w-4 h-4 text-[#b5aea4] flex-shrink-0" />
                              <FormControl>
                                <input
                                  {...field}
                                  type="email"
                                  placeholder={t.newsletter.emailPh}
                                  className="w-full bg-transparent text-[#1a1a18] placeholder-[#b5aea4] focus:outline-none text-sm"
                                />
                              </FormControl>
                            </div>
                            <FormMessage className="text-xs font-normal" />
                          </FormItem>
                        )}
                      />

                      {/* Consent */}
                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5 pt-0.5">
                            <div className="flex items-start gap-3">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.checked)
                                  }
                                  className="mt-0.5 h-4 w-4 rounded border-[#d5cec2] accent-[#7B5EA7] flex-shrink-0"
                                />
                              </FormControl>
                              <label className="text-[11px] text-[#8a847c] leading-relaxed">
                                {t.newsletter.consent}
                              </label>
                            </div>
                            <FormMessage className="text-xs font-normal" />
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={primaryButtonClass}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {t.newsletter.submitting}
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            {t.newsletter.submit}
                          </>
                        )}
                      </button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>

          {/* ── Bottom: Horizontal CTA grid ────────────── */}
          {!isSubmitted && (
            <div className="mt-12 sm:mt-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#ece5d9]" />
                <span className="text-[11px] font-medium text-[#a9a299] uppercase tracking-wider whitespace-nowrap">
                  {t.newsletter.ctaOr}
                </span>
                <div className="flex-1 h-px bg-[#ece5d9]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Call Now */}
                <a
                  href="tel:+12133402861"
                  className="group relative bg-white border border-[#ece5d9] hover:border-[#2A9D8F] rounded-2xl px-5 py-5 transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(42,157,143,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D8F]/30 overflow-hidden"
                >
                  <span className="absolute top-0 right-0 w-16 h-16 bg-[#2A9D8F]/5 rounded-bl-[3rem]" />
                  <div className="relative">
                    <span className="w-10 h-10 rounded-xl bg-[#2A9D8F]/10 group-hover:bg-[#2A9D8F] flex items-center justify-center flex-shrink-0 transition-colors duration-300 mb-3">
                      <Phone className="w-[18px] h-[18px] text-[#2A9D8F] group-hover:text-white transition-colors duration-300" />
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-[#1a1a18] leading-snug">
                          {t.newsletter.ctaCall}
                        </h4>
                        <p className="text-[11px] text-[#999] leading-tight mt-1">
                          {t.newsletter.ctaCallSub}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#2A9D8F] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </a>

                {/* Explore Site */}
                <a
                  href={BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-[#ece5d9] hover:border-[#7B5EA7] rounded-2xl px-5 py-5 transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(123,94,167,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30 overflow-hidden"
                >
                  <span className="absolute top-0 right-0 w-16 h-16 bg-[#7B5EA7]/5 rounded-bl-[3rem]" />
                  <div className="relative">
                    <span className="w-10 h-10 rounded-xl bg-[#7B5EA7]/10 group-hover:bg-[#7B5EA7] flex items-center justify-center flex-shrink-0 transition-colors duration-300 mb-3">
                      <Globe className="w-[18px] h-[18px] text-[#7B5EA7] group-hover:text-white transition-colors duration-300" />
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-[#1a1a18] leading-snug">
                          {t.newsletter.ctaExplore}
                        </h4>
                        <p className="text-[11px] text-[#999] leading-tight mt-1">
                          {t.newsletter.ctaExploreSub}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#7B5EA7] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-[#ece5d9] hover:border-[#25D366] rounded-2xl px-5 py-5 transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(37,211,102,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/30 overflow-hidden"
                >
                  <span className="absolute top-0 right-0 w-16 h-16 bg-[#25D366]/5 rounded-bl-[3rem]" />
                  <div className="relative">
                    <span className="w-10 h-10 rounded-xl bg-[#25D366]/10 group-hover:bg-[#25D366] flex items-center justify-center flex-shrink-0 transition-colors duration-300 mb-3">
                      <svg
                        className="w-[18px] h-[18px] text-[#25D366] group-hover:text-white transition-colors duration-300 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-[#1a1a18] leading-snug">
                          {t.newsletter.ctaWhatsapp}
                        </h4>
                        <p className="text-[11px] text-[#999] leading-tight mt-1">
                          {t.newsletter.ctaWhatsappSub}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#25D366] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </Container>
      </main>

      <PageFooter text={t.newsletter.footer} />
    </div>
  );
};

export default NewsletterPage;
