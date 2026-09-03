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
  ArrowRight,
} from "lucide-react";
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
  secondaryButtonClass,
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
    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30 ${
      selected
        ? "border-[#7B5EA7] bg-[#7B5EA7]/[0.06] shadow-[0_10px_24px_-18px_rgba(123,94,167,0.9)]"
        : "border-[#e6dfd3] bg-[#faf8f5] hover:border-[#c9a961] hover:bg-white"
    }`}
  >
    <span
      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
        selected ? "bg-[#7B5EA7] text-white" : "bg-white text-[#7B5EA7] border border-[#ece5d9]"
      }`}
    >
      <Icon className="w-[18px] h-[18px]" />
    </span>
    <span className="flex-1 text-sm font-medium text-[#1a1a18]">{label}</span>
    <span
      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
        selected ? "border-[#7B5EA7] bg-[#7B5EA7]" : "border-[#d5cec2]"
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
    className={`px-4 py-5 rounded-xl border text-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30 ${
      selected
        ? "border-[#7B5EA7] bg-[#7B5EA7] text-white shadow-[0_12px_26px_-18px_rgba(123,94,167,1)]"
        : "border-[#e6dfd3] bg-[#faf8f5] text-[#1a1a18] hover:border-[#c9a961] hover:bg-white"
    }`}
  >
    {label}
  </button>
);

const StepProgress = ({ step, word }: { step: Step; word: string }) => (
  <div className="mb-7">
    <div className="flex items-center justify-between mb-2.5">
      <span className="eyebrow">
        {word} {step} / 3
      </span>
      <span className="text-[11px] font-medium text-[#b5aea4]">
        {Math.round((step / 3) * 100)}%
      </span>
    </div>
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
            s <= step ? "bg-[#7B5EA7]" : "bg-[#ece5d9]"
          }`}
        />
      ))}
    </div>
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
    }
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
    <FunnelLayout
      lang={lang}
      footerText={t.investment.footer}
      backTo={`/?lang=${lang}`}
      backLabel={t.guide.back}
    >
      {!isSubmitted && (
        <div className="mb-7">
          <span className="eyebrow">{t.investment.eyebrow}</span>
        </div>
      )}

      <FunnelCard>
        {isSubmitted ? (
          <FormSuccess
            title={t.investment.success}
            subtitle={t.investment.successSub}
          />
        ) : (
          <>
            <StepProgress step={step} word={t.investment.stepWord} />

            <div
              key={step}
              className="animate-in fade-in slide-in-from-right-3 duration-300"
            >
              {step === 1 && (
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-normal leading-snug tracking-[-0.01em] text-[#1a1a18] mb-5">
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
                    className={`${primaryButtonClass} mt-7`}
                  >
                    {t.investment.next}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-normal leading-snug tracking-[-0.01em] text-[#1a1a18] mb-5">
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
                  <div className="flex gap-3 mt-7">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className={secondaryButtonClass}
                    >
                      {t.investment.prev}
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className={primaryButtonClass}
                    >
                      {t.investment.next}
                      <ArrowRight className="w-4 h-4" />
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
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-normal leading-snug tracking-[-0.01em] text-[#1a1a18]">
                        {t.investment.step3Title}
                      </h2>
                      {/* Answer recap so people can see what they picked */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {[intent, priceRange].filter(Boolean).map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#7B5EA7] bg-[#7B5EA7]/[0.07] border border-[#7B5EA7]/20 rounded-full px-2.5 py-1"
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className={labelClass}>
                            {t.investment.step3Label}
                          </FormLabel>
                          <div className={pillClass(!!fieldState.error)}>
                            <User className="w-4 h-4 text-[#b5aea4] flex-shrink-0" />
                            <FormControl>
                              <input
                                {...field}
                                type="text"
                                placeholder={t.investment.step3Ph}
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
                            {t.investment.step5Label}
                          </FormLabel>
                          <div className={pillClass(!!fieldState.error)}>
                            <Mail className="w-4 h-4 text-[#b5aea4] flex-shrink-0" />
                            <FormControl>
                              <input
                                {...field}
                                type="email"
                                placeholder={t.investment.step5Ph}
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
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                className="mt-0.5 h-4 w-4 rounded border-[#d5cec2] accent-[#7B5EA7] flex-shrink-0"
                              />
                            </FormControl>
                            <label className="text-[11px] text-[#8a847c] leading-relaxed">
                              {t.investment.consent}
                            </label>
                          </div>
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className={secondaryButtonClass}
                      >
                        {t.investment.prev}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={primaryButtonClass}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
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
    </FunnelLayout>
  );
};

export default InvestmentPage;
