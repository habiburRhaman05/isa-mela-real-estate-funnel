import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTrackingEvent } from "@/lib/tracking";
import { Loader2, Mail, User, ShieldCheck, Sparkles, Globe, Clock, Star } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PhoneInputField, {
  type CountryData,
} from "@/components/PhoneInputField";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import Container from "@/components/Container";
import FunnelCard from "@/components/FunnelCard";
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
  createContactSchema,
  CONTACT_DEFAULT_VALUES,
  type ContactFormValues,
} from "@/lib/schemas";

const ISA_IMAGE =
  "isa-mela.png";

export const ConsultPage = () => {
  const navigate = useNavigate();
  const lang = useLang();
  const t = getDict(lang);
  const [phoneCountry, setPhoneCountry] = useState<CountryData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = useMemo(() => createContactSchema(t.consult), [t]);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: CONTACT_DEFAULT_VALUES,
    mode: "onBlur",
  });

  const onSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true);

    const trackingPayload = {
      type: "external form_submission" as const,
      timestamp: Date.now(),
      formId: "consultation-booking",
      formData: {
        first_name: values.name.split(" ")[0] || values.name,
        last_name: values.name.split(" ").slice(1).join(" ") || "",
        phone: values.phone,
        phone_country: phoneCountry?.name || "",
        phone_country_code: phoneCountry?.countryCode || "",
        phone_dial_code: phoneCountry?.dialCode || "",
        email: values.email,
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        phone: "Phone Number",
        phone_country: "Phone Country",
        phone_country_code: "Phone Country Code",
        phone_dial_code: "Phone Dial Code",
        email: "Email Address",
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
        formName: "Consultation Booking Form",
      },
    };

    postTrackingEvent(trackingPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => navigate(`/thank-you?lang=${lang}`), 1400);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader
        lang={lang}
        backTo={`/?lang=${lang}`}
        backLabel={t.guide.back}
      />

      <main className="flex-1">
        <Container className="py-10 sm:py-14 lg:py-16">
          {/* ── Row 1: Left (text + form) + Right (image) ────── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left: Text + Form in one wrapper */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              {!isSubmitted && (
                <div className="mb-7">
                  <span className="eyebrow">{t.consult.eyebrow}</span>
                  <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1a1a18] mt-3">
                    {t.consult.title}
                  </h1>
                  <p className="text-sm text-[#6b6660] leading-relaxed mt-3 max-w-md">
                    {t.consult.subtitle}
                  </p>
                </div>
              )}

              <FunnelCard>
                {isSubmitted ? (
                  <FormSuccess
                    title={t.consult.success}
                    subtitle={t.consult.successSub}
                  />
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-5"
                      noValidate
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className={labelClass}>
                              {t.consult.nameLabel}
                            </FormLabel>
                            <div className={pillClass(!!fieldState.error)}>
                              <User className="w-4 h-4 text-[#b5aea4] flex-shrink-0" />
                              <FormControl>
                                <input
                                  {...field}
                                  type="text"
                                  placeholder={t.consult.namePh}
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
                          <FormItem className="space-y-2">
                            <FormLabel className={labelClass}>
                              {t.consult.phoneLabel}
                            </FormLabel>
                            <PhoneInputField
                              value={field.value}
                              onChange={(num, country) => {
                                field.onChange(num);
                                setPhoneCountry(country);
                              }}
                              placeholder={t.consult.phonePh}
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
                          <FormItem className="space-y-2">
                            <FormLabel className={labelClass}>
                              {t.consult.emailLabel}
                            </FormLabel>
                            <div className={pillClass(!!fieldState.error)}>
                              <Mail className="w-4 h-4 text-[#b5aea4] flex-shrink-0" />
                              <FormControl>
                                <input
                                  {...field}
                                  type="email"
                                  placeholder={t.consult.emailPh}
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
                          <FormItem className="space-y-2 pt-1">
                            <div className="flex items-start gap-3">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  className="mt-0.5 h-4 w-4 rounded border-[#d5cec2] accent-[#7B5EA7] flex-shrink-0"
                                />
                              </FormControl>
                              <label className="text-[11px] text-[#8a847c] leading-relaxed">
                                {t.consult.consent}
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
                            {t.consult.submitting}
                          </>
                        ) : (
                          t.consult.submit
                        )}
                      </button>

                      <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#a9a299]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {t.consult.reassurance}
                      </p>
                    </form>
                  </Form>
                )}
              </FunnelCard>
            </div>

            {/* Right: Image — same height as left via items-stretch */}
            <div className="relative rounded-[1.75rem] overflow-hidden bg-[#e8e2d8] order-1 lg:order-2">
              <img
                src={ISA_IMAGE}
                alt="Isa Melo"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* ── Row 2: Trust cards — horizontal ──────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 sm:mt-10">
            <div className="flex items-center gap-3 bg-white border border-[#ece5d9] rounded-2xl px-4 py-4">
              <span className="w-9 h-9 rounded-lg bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-[16px] h-[16px] text-[#7B5EA7]" fill="currentColor" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust1Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust1Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#ece5d9] rounded-2xl px-4 py-4">
              <span className="w-9 h-9 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-[16px] h-[16px] text-[#2A9D8F]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust2Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust2Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#ece5d9] rounded-2xl px-4 py-4">
              <span className="w-9 h-9 rounded-lg bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-[16px] h-[16px] text-[#C9A961]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust3Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust3Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#ece5d9] rounded-2xl px-4 py-4">
              <span className="w-9 h-9 rounded-lg bg-[#E07A5F]/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-[16px] h-[16px] text-[#E07A5F]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust4Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust4Sub}</span>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <PageFooter text={t.consult.footer} />
    </div>
  );
};

export default ConsultPage;
