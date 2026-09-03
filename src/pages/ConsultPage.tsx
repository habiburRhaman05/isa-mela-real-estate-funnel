import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTrackingEvent } from "@/lib/tracking";
import { Loader2, Mail, User, ShieldCheck } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PhoneInputField, {
  type CountryData,
} from "@/components/PhoneInputField";
import FunnelLayout from "@/components/FunnelLayout";
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
    <FunnelLayout
      lang={lang}
      footerText={t.consult.footer}
      backTo={`/?lang=${lang}`}
      backLabel={t.guide.back}
    >
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
    </FunnelLayout>
  );
};

export default ConsultPage;
