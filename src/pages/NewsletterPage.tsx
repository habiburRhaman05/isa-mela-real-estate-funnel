import axios from "axios";
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
import PhoneInputField from "@/components/PhoneInputField";
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
import { langToLanguage, langToMarket } from "@/lib/langToMarket";

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
        phoneError: t.newsletter.phoneError,
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






const onSubmit = async (values: NewsletterFormValues) => {
  setIsSubmitting(true);

  const firstName = values.name.split(" ")[0] || values.name;
  const lastName = values.name.split(" ").slice(1).join(" ") || "";

  const ghlWebhookUrl = "https://services.leadconnectorhq.com/hooks/iGbC817rCzAfj7HtPYRs/webhook-trigger/f7VKPnATBSUsvQ6OeaO8";

  try {
    // // 1. Fire internal tracking
    // if (typeof postTrackingEvent === "function") {
    //   postTrackingEvent({
    //     type: "external form_submission" as const,
    //     timestamp: Date.now(),
    //     formId: "newsletter-early-access",
    //     formData: { first_name: firstName, last_name: lastName, email: values.email, phone: values.phone || "" },
    //     url: window.location.href,
    //     title: document.title,
    //     path: window.location.pathname,
    //     userAgent: navigator.userAgent,
    //     trackingId: "tk_052d6da214a342649fb05f5efd6fb348",
    //     locationId: "iGbC817rCzAfj7HtPYRs",
    //     projectId: "1788077166891936938",
    //     sessionId: crypto.randomUUID(),
    //     properties: {
    //       deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
    //       source: "ai_studio",
    //       projectId: "1788077166891936938",
    //       formName: "Early Access Newsletter Form",
    //     },
    //   });
    // }

    // 2. Format fields into a URL encoded payload structure to natively step over CORS
    const formBody = new URLSearchParams();
    formBody.append("first_name", firstName);
    formBody.append("last_name", lastName);
    formBody.append("email", values.email);
    formBody.append("phone", "+" + (values.phone || ""));
    formBody.append("language", langToLanguage(lang));
    formBody.append("market", langToMarket(lang));

    // 3. Make the direct Axios Post Request
    await axios.post(ghlWebhookUrl, formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    // 4. Resolve success state layouts
    setIsSubmitted(true);

  } catch (error) {
    console.error("Submission processing crashed:", error);
  } finally {
    setIsSubmitting(false);
  }
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
        <Container className="py-4 sm:py-5 lg:py-6">
          {/* ── Top: Headline only, centered, no bg ─────── */}
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
            <span className="eyebrow text-[#7B5EA7]">{t.newsletter.eyebrow}</span>
            <h1 className="font-display text-[1.35rem] sm:text-[1.75rem] lg:text-[2.2rem] font-normal leading-[1.1] tracking-[-0.02em] text-[#1a1a18] mt-2">
              {t.newsletter.headline[0]}{" "}
              <em className="not-italic text-[#7B5EA7]">
                {t.newsletter.headline[1]}
              </em>
            </h1>
            <p className="mt-2 text-[13px] text-[#8a847c] leading-snug max-w-lg mx-auto">
              {t.newsletter.subtitle}
            </p>
          </div>

          {/* ── Middle: Bento grid ────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Form card — left 6 cols */}
            <div className="lg:col-span-6 bg-white border border-[#ece5d9] rounded-[1.75rem] shadow-[0_20px_50px_-30px_rgba(26,26,24,0.35)] p-4 sm:p-5 flex flex-col">
              <h2 className="font-display text-xl font-normal text-[#1a1a18] text-center mb-1">
                {t.newsletter.formTitle}
              </h2>
              <div className="w-10 h-[2px] bg-[#7B5EA7] rounded-full mx-auto mt-1.5 mb-4" />

              {isSubmitted ? (
                <FormSuccess
                  title={t.newsletter.success}
                  subtitle={t.newsletter.successSub}
                />
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-3 flex-1 flex flex-col"
                    noValidate
                  >
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

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className={labelClass}>
                            {t.newsletter.phoneLabel}{" "}
                            <span className="text-[#b5aea4] text-[10px]">(optional)</span>
                          </FormLabel>
                          <PhoneInputField
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
                            placeholder={t.newsletter.phonePh}
                            hasError={!!fieldState.error}
                          />
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />

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

                    <div className="mt-auto pt-2">
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
                    </div>
                  </form>
                </Form>
              )}
            </div>

            {/* Image — right 6 cols, no border, no rounded */}
            <div className="lg:col-span-6">
              <img
                src="/isa-melo.png"
                alt=""
                className="w-full h-auto object-cover rounded-none border-none rounded-sm"
              />
            </div>

            {/* Benefit 2 — left 6 cols
            {(() => {
              const b = benefits[1];
              const Icon = ICON_MAP[b.icon] || Zap;
              return (
                <div className="lg:col-span-6 bg-white border border-[#ece5d9] rounded-[1.75rem] px-3 py-2.5 flex flex-row items-center gap-2 transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(26,26,24,0.1)] hover:border-[#2A9D8F]/20 relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#2A9D8F]/5 rounded-full" />
                  <span className="w-7 h-7 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  </span>
                  <div className="min-w-0 flex flex-wrap items-baseline gap-x-1">
                    <span className="text-[13px] font-semibold text-[#1a1a18] leading-snug">
                      {b.title}
                    </span>
                    <span className="text-[11px] text-[#8a847c] leading-snug">
                      {b.desc}
                    </span>
                  </div>
                </div>
              );
            })()} */}

            {/* Benefit 3 — right 6 cols */}
            {/* {(() => {
              const b = benefits[2];
              const Icon = ICON_MAP[b.icon] || Zap;
              return (
                <div className="lg:col-span-6 bg-white border border-[#ece5d9] rounded-[1.75rem] px-3 py-2.5 flex flex-row items-center gap-2 transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(26,26,24,0.1)] hover:border-[#C9A961]/20 relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#C9A961]/5 rounded-full" />
                  <span className="w-7 h-7 rounded-lg bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#C9A961]" />
                  </span>
                  <div className="min-w-0 flex flex-wrap items-baseline gap-x-1">
                    <span className="text-[13px] font-semibold text-[#1a1a18] leading-snug">
                      {b.title}
                    </span>
                    <span className="text-[11px] text-[#8a847c] leading-snug">
                      {b.desc}
                    </span>
                  </div>
                </div>
              );
            })()} */}
          </div>

          {/* ── Bottom: Horizontal CTA grid ────────────── */}
          {!isSubmitted && (
            <div className="mt-5 sm:mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[#ece5d9]" />
                <span className="text-[11px] font-medium text-[#a9a299] uppercase tracking-wider whitespace-nowrap">
                  {t.newsletter.ctaOr}
                </span>
                <div className="flex-1 h-px bg-[#ece5d9]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Call Now */}
                <a
                  href="tel:+12133402861"
                  className="group flex items-center gap-3 bg-white border border-[#ece5d9] hover:border-[#2A9D8F] rounded-2xl px-3.5 py-3 transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(42,157,143,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D8F]/30"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#2A9D8F]/10 group-hover:bg-[#2A9D8F] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-[#2A9D8F] group-hover:text-white transition-colors duration-300" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[12px] font-semibold text-[#1a1a18] leading-tight truncate">{t.newsletter.ctaCall}</span>
                    <span className="block text-[10px] text-[#999] leading-tight truncate">{t.newsletter.ctaCallSub}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#2A9D8F] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                </a>

                {/* Explore Site */}
                <a
                  href={BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white border border-[#ece5d9] hover:border-[#7B5EA7] rounded-2xl px-3.5 py-3 transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(123,94,167,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#7B5EA7]/10 group-hover:bg-[#7B5EA7] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Globe className="w-4 h-4 text-[#7B5EA7] group-hover:text-white transition-colors duration-300" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[12px] font-semibold text-[#1a1a18] leading-tight truncate">{t.newsletter.ctaExplore}</span>
                    <span className="block text-[10px] text-[#999] leading-tight truncate">{t.newsletter.ctaExploreSub}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7B5EA7] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white border border-[#ece5d9] hover:border-[#25D366] rounded-2xl px-3.5 py-3 transition-all duration-300 hover:shadow-[0_8px_24px_-10px_rgba(37,211,102,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/30"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#25D366]/10 group-hover:bg-[#25D366] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors duration-300 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[12px] font-semibold text-[#1a1a18] leading-tight truncate">{t.newsletter.ctaWhatsapp}</span>
                    <span className="block text-[10px] text-[#999] leading-tight truncate">{t.newsletter.ctaWhatsappSub}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#25D366] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
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
