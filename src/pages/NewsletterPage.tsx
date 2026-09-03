import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTrackingEvent } from "@/lib/tracking";
import { Loader2, Mail, User } from "lucide-react";
import { getDict, useLang } from "@/lib/i18n";
import PhoneInputField, {
  type CountryData,
} from "@/components/PhoneInputField";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import PhotoCollage from "@/components/PhotoCollage";
import FunnelCard from "@/components/FunnelCard";
import FormSuccess from "@/components/FormSuccess";
import { pillClass } from "@/components/FormField";
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

export const NewsletterPage = () => {
  const navigate = useNavigate();
  const lang = useLang();
  const t = getDict(lang);
  const [phoneCountry, setPhoneCountry] = useState<CountryData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = useMemo(() => createContactSchema(t.newsletter), [t]);
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
      formId: "newsletter-early-access",
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

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f0f0f] flex flex-col">
      <PageHeader lang={lang} compact />

      {/* Split content */}
      <div className="flex-1 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start px-4 sm:px-8 pb-8">
        <PhotoCollage />

        {/* Right: form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 pt-6 lg:pt-16">
          {!isSubmitted && (
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-center lg:text-left leading-tight mb-6 text-[#0f0f0f] max-w-lg">
              <span>{t.newsletter.headline[0]}</span>{" "}
              <span className="text-[#7B5EA7]">{t.newsletter.headline[1]}</span>
            </h1>
          )}

          <FunnelCard>
            {isSubmitted ? (
              <FormSuccess
                title={t.newsletter.success}
                subtitle={t.newsletter.successSub}
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
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm font-semibold text-[#0f0f0f]">
                          {t.newsletter.namePh}
                        </FormLabel>
                        <div className={pillClass(!!fieldState.error)}>
                          <User className="w-4 h-4 mr-2 text-[#7B5EA7] flex-shrink-0" />
                          <FormControl>
                            <input
                              {...field}
                              type="text"
                              placeholder={t.newsletter.namePh}
                              className="w-full bg-transparent text-[#0f0f0f] placeholder-[#6b6b6b] focus:outline-none text-sm font-medium"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="px-1 text-xs font-normal" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm font-semibold text-[#0f0f0f]">
                          {t.newsletter.phonePh}
                        </FormLabel>
                        <PhoneInputField
                          value={field.value}
                          onChange={(num, country) => {
                            field.onChange(num);
                            setPhoneCountry(country);
                          }}
                          placeholder={t.newsletter.phonePh}
                          hasError={!!fieldState.error}
                        />
                        <FormMessage className="px-1 text-xs font-normal" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm font-semibold text-[#0f0f0f]">
                          {t.newsletter.emailPh}
                        </FormLabel>
                        <div className={pillClass(!!fieldState.error)}>
                          <Mail className="w-4 h-4 mr-2 text-[#7B5EA7] flex-shrink-0" />
                          <FormControl>
                            <input
                              {...field}
                              type="email"
                              placeholder={t.newsletter.emailPh}
                              className="w-full bg-transparent text-[#0f0f0f] placeholder-[#6b6b6b] focus:outline-none text-sm font-medium"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="px-1 text-xs font-normal" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5 pt-1">
                        <div className="flex items-start gap-3 px-1">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mt-1 h-4 w-4 rounded border-[#7B5EA7]/60 accent-[#7B5EA7] focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 bg-transparent flex-shrink-0"
                            />
                          </FormControl>
                          <label className="text-xs text-[#6b6b6b] leading-snug">
                            {t.newsletter.consent}
                          </label>
                        </div>
                        <FormMessage className="px-1 text-xs font-normal" />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-[#7B5EA7] hover:bg-[#6a4f96] hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 text-white font-semibold py-4 rounded-full shadow-sm transition-all duration-300 tracking-wider uppercase text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        {t.newsletter.submitting}
                      </>
                    ) : (
                      t.newsletter.submit
                    )}
                  </button>
                </form>
              </Form>
            )}
          </FunnelCard>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        <PageFooter text={t.newsletter.footer} />
      </div>
    </div>
  );
};

export default NewsletterPage;
