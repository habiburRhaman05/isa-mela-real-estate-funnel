import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTrackingEvent } from "@/lib/tracking";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  User,
  Check,
  TrendingUp,
  Home,
  Tag,
  KeyRound,
} from "lucide-react";
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

type Step = 1 | 2 | 3;

// Icons for step1Options, in the fixed Invest/Buy/Sell/Rent order every
// language keeps that array in.
const INTENT_ICONS = [TrendingUp, Home, Tag, KeyRound];

const OptionCard = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 ${
      selected
        ? "border-[#7B5EA7] bg-[#7B5EA7]/8 shadow-sm"
        : "border-[#7B5EA7]/15 bg-white/60 hover:border-[#7B5EA7]/40 hover:bg-[#7B5EA7]/5"
    }`}
  >
    <span
      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
        selected ? "bg-[#7B5EA7] text-white" : "bg-[#7B5EA7]/10 text-[#7B5EA7]"
      }`}
    >
      <Icon className="w-4 h-4" />
    </span>
    <span className="flex-1 text-sm font-semibold text-[#0f0f0f]">
      {label}
    </span>
    <span
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
        selected ? "border-[#7B5EA7] bg-[#7B5EA7]" : "border-[#7B5EA7]/25"
      }`}
    >
      {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </span>
  </button>
);

const PriceChip = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`px-4 py-4 rounded-2xl border text-center text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 ${
      selected
        ? "border-[#7B5EA7] bg-[#7B5EA7] text-white shadow-sm"
        : "border-[#7B5EA7]/15 bg-white/60 text-[#0f0f0f] hover:border-[#7B5EA7]/40 hover:bg-[#7B5EA7]/5"
    }`}
  >
    {label}
  </button>
);

const StepProgress = ({ step, word }: { step: Step; word: string }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            s <= step ? "bg-[#7B5EA7]" : "bg-[#7B5EA7]/15"
          }`}
        />
      ))}
    </div>
    <p className="mt-2 text-xs font-medium text-[#6b6b6b]">
      {word} {step} / 3
    </p>
  </div>
);

export const InvestmentPage = () => {
  const navigate = useNavigate();
  const lang = useLang();
  const t = getDict(lang);
  const [step, setStep] = useState<Step>(1);
  const [intent, setIntent] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [phoneCountry, setPhoneCountry] = useState<CountryData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const schema = useMemo(() => createContactSchema(t.investment), [t]);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: CONTACT_DEFAULT_VALUES,
    mode: "onBlur",
  });

  const handleNext = () => {
    if (step === 1) {
      if (!intent) {
        toast.error(t.investment.selectError);
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!priceRange) {
        toast.error(t.investment.selectError);
        return;
      }
      setStep(3);
      return;
    }
    // step 3 is a real <form>; its submit button triggers RHF validation instead.
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1) as Step);

  const onSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true);

    const trackingPayload = {
      type: "external form_submission" as const,
      timestamp: Date.now(),
      formId: "investment-quiz",
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
        phone: "Phone",
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
        formName: "Investment Questionnaire",
      },
    };

    postTrackingEvent(trackingPayload, {
      customFields: {
        H1PuSCyblOGIAxkAbmIj: { value: intent, label: "Intent" },
        mw2gkLlqk6SNCZEvojyS: { value: priceRange, label: "Price Range" },
      },
    });

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
      <div className="flex-1 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start px-4 sm:px-8 pb-6">
        <PhotoCollage />

        {/* Right: quiz card */}
        <div className="w-full max-w-md mx-auto lg:mx-0 pt-6 lg:pt-16">
          <FunnelCard>
            {isSubmitted ? (
              <FormSuccess
                title={t.investment.success}
                subtitle={t.investment.successSub}
              />
            ) : (
              <>
                <StepProgress step={step} word={t.investment.stepWord} />

                <div key={step} className="animate-in fade-in slide-in-from-right-3 duration-300">
                  {step === 1 && (
                    <div>
                      <h2 className="text-base font-semibold mb-4 text-[#0f0f0f]">
                        {t.investment.step1Title}
                      </h2>
                      <div className="flex flex-col gap-2.5">
                        {t.investment.step1Options.map((opt, i) => (
                          <OptionCard
                            key={opt}
                            icon={INTENT_ICONS[i % INTENT_ICONS.length]}
                            label={opt}
                            selected={intent === opt}
                            onClick={() => setIntent(opt)}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full mt-8 bg-[#7B5EA7] hover:bg-[#6a4f96] hover:shadow-md active:scale-[0.98] text-white font-semibold py-3.5 rounded-full shadow-sm transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2"
                      >
                        {t.investment.next}
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 className="text-base font-semibold mb-4 text-[#0f0f0f]">
                        {t.investment.step2Title}
                      </h2>
                      <div className="grid grid-cols-2 gap-2.5">
                        {t.investment.step2Options.map((range) => (
                          <PriceChip
                            key={range}
                            label={range}
                            selected={priceRange === range}
                            onClick={() => setPriceRange(range)}
                          />
                        ))}
                      </div>
                      <div className="flex gap-3 mt-8">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="flex-1 bg-[#7B5EA7]/10 hover:bg-[#7B5EA7]/20 active:scale-[0.98] text-[#0f0f0f] font-semibold py-3.5 rounded-full transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40"
                        >
                          {t.investment.prev}
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="flex-1 bg-[#7B5EA7] hover:bg-[#6a4f96] hover:shadow-md active:scale-[0.98] text-white font-semibold py-3.5 rounded-full shadow-sm transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2"
                        >
                          {t.investment.next}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                        noValidate
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field, fieldState }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-sm font-semibold text-[#0f0f0f]">
                                {t.investment.step3Label}
                              </FormLabel>
                              <div className={pillClass(!!fieldState.error)}>
                                <User className="w-4 h-4 mr-2 text-[#7B5EA7] flex-shrink-0" />
                                <FormControl>
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder={t.investment.step3Ph}
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
                                {t.investment.step4Label}
                              </FormLabel>
                              <PhoneInputField
                                value={field.value}
                                onChange={(num, country) => {
                                  field.onChange(num);
                                  setPhoneCountry(country);
                                }}
                                placeholder={t.investment.step4Ph}
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
                                {t.investment.step5Label}
                              </FormLabel>
                              <div className={pillClass(!!fieldState.error)}>
                                <Mail className="w-4 h-4 mr-2 text-[#7B5EA7] flex-shrink-0" />
                                <FormControl>
                                  <input
                                    {...field}
                                    type="email"
                                    placeholder={t.investment.step5Ph}
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
                            <FormItem className="space-y-1.5">
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
                                  {t.investment.consent}
                                </label>
                              </div>
                              <FormMessage className="px-1 text-xs font-normal" />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="flex-1 bg-[#7B5EA7]/10 hover:bg-[#7B5EA7]/20 active:scale-[0.98] text-[#0f0f0f] font-semibold py-3.5 rounded-full transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40"
                          >
                            {t.investment.prev}
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-[#7B5EA7] hover:bg-[#6a4f96] hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 text-white font-semibold py-3.5 rounded-full shadow-sm transition-all text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2"
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-5 h-5 animate-spin text-white" />
                            ) : (
                              t.investment.submit
                            )}
                          </button>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </>
            )}
          </FunnelCard>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        <PageFooter text={t.investment.footer} />
      </div>
    </div>
  );
};

export default InvestmentPage;
