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
  BookOpen,
  Shield,
  Phone,
  ExternalLink,
} from "lucide-react";
import { getDict, useLang, type Dict } from "@/lib/i18n";
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
import { ISA_PHOTO_URL, WHATSAPP_URL } from "@/lib/constants";
import axios from "axios";
import { langToLanguage, langToMarket } from "@/lib/langToMarket";

const BASE = "http://isamelo-realestate.vercel.app";

type Step = 1 | 2 | 3;

const INTENT_ICONS = [TrendingUp, Home, Tag, KeyRound];

/* ── Property listing data ───────────────────────────────────── */
const PROPERTIES = [
  {
    name: "Palm Horizon Luxeiry Villa",
    type: "Villa",
    location: "Palm Jumeirah, Dubai",
    price: "AED 38,900,000",
    beds: "7 Bed",
    baths: "9 Bath",
    sqft: "11,800 sqft",
    status: "Available" as const,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
    href: `${BASE}/properties/palm-horizon-villa`,
  },
  {
    name: "Azure Penthouse",
    type: "Penthouse",
    location: "Dubai Marina, Dubai",
    price: "AED 25,500,000",
    beds: "4 Bed",
    baths: "5 Bath",
    sqft: "8,200 sqft",
    status: "Available" as const,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    href: `${BASE}/properties/azure-penthouse`,
  },
  {
    name: "Emirates Hills Estate",
    type: "Estate",
    location: "Emirates Hills, Dubai",
    price: "AED 62,000,000",
    beds: "8 Bed",
    baths: "10 Bath",
    sqft: "18,500 sqft",
    status: "Available" as const,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    href: `${BASE}/properties/emirates-hills-estate`,
  },
  {
    name: "Bulgari Shore Residence",
    type: "Apartment",
    location: "Dubai",
    price: "AED 125,000",
    beds: "4 Bed",
    baths: "5 Bath",
    sqft: "4,000 sqft",
    status: "Available" as const,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    href: `${BASE}/properties/sky-penthouses-mtjjqnxp`,
  },
];

/* ── Small sub-components ────────────────────────────────────── */

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
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30 ${
      selected
        ? "border-[#7B5EA7] bg-[#7B5EA7]/[0.06] shadow-[0_10px_24px_-18px_rgba(123,94,167,0.9)]"
        : "border-[#e6dfd3] bg-[#faf8f5] hover:border-[#c9a961] hover:bg-white"
    }`}
  >
    <span
      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
        selected
          ? "bg-[#7B5EA7] text-white"
          : "bg-white text-[#7B5EA7] border border-[#ece5d9]"
      }`}
    >
      <Icon className="w-4 h-4" />
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
    className={`px-3 py-3 rounded-xl border text-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30 ${
      selected
        ? "border-[#7B5EA7] bg-[#7B5EA7] text-white shadow-[0_12px_26px_-18px_rgba(123,94,167,1)]"
        : "border-[#e6dfd3] bg-[#faf8f5] text-[#1a1a18] hover:border-[#c9a961] hover:bg-white"
    }`}
  >
    {label}
  </button>
);

const StepProgress = ({ step, word }: { step: Step; word: string }) => (
  <div className="mb-3">
    <div className="flex items-center justify-between mb-1">
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

const PropertyCard = ({
  name,
  type,
  location,
  price,
  beds,
  baths,
  sqft,
  status,
  featured,
  image,
  href,
  t,
}: (typeof PROPERTIES)[number] & { t: Dict }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#ece5d9] hover:border-[#7B5EA7]/40 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(123,94,167,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30"
  >
    {/* Image */}
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a18]/50 via-transparent to-transparent" />

      {/* Status badge */}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-[#1a1a18]">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            status === "Available" ? "bg-[#22c55e]" : "bg-[#999]"
          }`}
        />
        {status === "Available" ? t.investment.available : status}
      </span>

      {featured && (
        <span className="absolute right-3 top-3 rounded-full bg-[#C9A961]/90 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-white">
          {t.investment.featured}
        </span>
      )}

      {/* Hover CTA */}
      <span className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#1a1a18] text-[11px] font-semibold px-3 py-1.5 rounded-full">
          {t.investment.viewDetails}
          <ArrowRight className="w-3 h-3" />
        </span>
      </span>
    </div>

    {/* Body — purple gradient bg on hover */}
    <div className="relative p-4 sm:p-5 flex flex-col gap-2 bg-white group-hover:bg-gradient-to-br group-hover:from-[#7B5EA7] group-hover:via-[#6B4D9A] group-hover:to-[#5B3D8F] transition-all duration-500">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base sm:text-lg font-normal text-[#1a1a18] group-hover:text-white leading-snug transition-colors duration-500">
          {name}
        </h3>
        <span className="shrink-0 rounded-full border border-[#e6dfd3] group-hover:border-white/30 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#999] group-hover:text-white/70 transition-colors duration-500">
          {type}
        </span>
      </div>

      <p className="text-[10px] uppercase tracking-[0.16em] text-[#999] group-hover:text-white/60 transition-colors duration-500">
        {location}
      </p>

      <p className="font-display text-lg sm:text-xl tracking-[-0.01em] text-[#1a1a18] group-hover:text-[#C9A961] transition-colors duration-500">
        {price}
      </p>

      <div className="h-px bg-[#ece5d9] group-hover:bg-white/20 my-1 transition-colors duration-500" />

      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#999] group-hover:text-white/60 transition-colors duration-500">
        <span>{beds}</span>
        <span className="w-1 h-1 rounded-full bg-[#C9A961]/40" />
        <span>{baths}</span>
        <span className="w-1 h-1 rounded-full bg-[#C9A961]/40" />
        <span>{sqft}</span>
      </div>
    </div>
  </a>
);

/* ── Main page ───────────────────────────────────────────────── */

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

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    // Send data to GoHighLevel webhook (form-encoded)
    try {
      const formBody = new URLSearchParams();
      formBody.append("first_name", values.name.split(" ")[0] || values.name);
      formBody.append("last_name", values.name.split(" ").slice(1).join(" ") || "");
       formBody.append("phone", "+"+values.phone || "");

      formBody.append("email", values.email);
      formBody.append("intent", intent);
      formBody.append("price_range", priceRange);
      formBody.append("form_name", "Investment Questionnaire");
      formBody.append("language", langToLanguage(lang));
      formBody.append("market", langToMarket(lang));

      await axios.post(
        "https://services.leadconnectorhq.com/hooks/iGbC817rCzAfj7HtPYRs/webhook-trigger/1No16nDSMWqSwb1ceFNu",
        formBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
    } catch (err) {
      console.error("Webhook error:", err);
    }

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
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <PageHeader
        lang={lang}
        backTo={`/?lang=${lang}`}
        backLabel={t.guide.back}
      />

      <main className="flex-1">
        {/* ── Hero — text only, centred ────────────────── */}
        <section className="w-full bg-[#faf8f5]">
          <Container className="py-2 sm:py-2.5 lg:py-3 text-center">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-1.5 mb-1">
                <span className="w-4 h-px bg-[#C9A961]" />
                <span className="eyebrow">{t.investment.eyebrow}</span>
                <span className="w-4 h-px bg-[#C9A961]" />
              </div>

              <h1 className="font-display text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] font-normal leading-[1.1] tracking-[-0.02em] text-[#1a1a18] whitespace-nowrap">
                {t.investment.heroHeadline[0]}{" "}
                <em className="not-italic text-[#7B5EA7]">{t.investment.heroHeadline[1]}</em>{" "}
                {t.investment.heroHeadline[2]}
              </h1>

              <p className="text-[12px] text-[#6b6660] leading-snug mt-1 max-w-md mx-auto">
                {t.investment.heroSubtitle}
              </p>

              {/* Decorative accent dots */}
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <span className="w-1 h-1 rounded-full bg-[#7B5EA7]" />
                <span className="w-1 h-1 rounded-full bg-[#7B5EA7]/40" />
                <span className="w-1 h-1 rounded-full bg-[#7B5EA7]/20" />
              </div>
            </div>
          </Container>
        </section>

        {/* ── Form + CTA split ───────────────────────────── */}
        <Container className="py-1.5 sm:py-2 lg:py-2">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] gap-3 lg:gap-5 items-start">
            {/* ── Left: Multi-step form ──────────────────── */}
            <div>
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
                          <h2 className="font-display text-lg sm:text-xl font-normal leading-snug tracking-[-0.01em] text-[#1a1a18] mb-2">
                            {t.investment.step1Title}
                          </h2>
                          <div className="flex flex-col gap-1.5">
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
                            className={`${primaryButtonClass} mt-4`}
                          >
                            {t.investment.next}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h2 className="font-display text-lg sm:text-xl font-normal leading-snug tracking-[-0.01em] text-[#1a1a18] mb-2">
                            {t.investment.step2Title}
                          </h2>
                          <div className="grid grid-cols-2 gap-1.5">
                            {t.investment.step2Options.map((range) => (
                              <PriceChip
                                key={range}
                                label={range}
                                selected={priceRange === range}
                                onClick={() => setPriceRange(range)}
                              />
                            ))}
                          </div>
                          <div className="flex gap-3 mt-4">
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
                            className="space-y-3"
                            noValidate
                          >
                            <div>
                              <h2 className="font-display text-lg sm:text-xl font-normal leading-snug tracking-[-0.01em] text-[#1a1a18]">
                                {t.investment.step3Title}
                              </h2>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {[intent, priceRange]
                                  .filter(Boolean)
                                  .map((chip) => (
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
                                <FormItem className="space-y-1.5">
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
                                <FormItem className="space-y-1.5">
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
                                <FormItem className="space-y-1.5">
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
            </div>

            {/* ── Right: CTA sidebar ─────────────────────── */}
            <div className="flex flex-col gap-2 lg:sticky lg:top-20">
              {/* Buyer's Guide */}
              <a
                href={`${BASE}/guide`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white border border-[#ece5d9] hover:border-[#2A9D8F] rounded-2xl px-4 py-3 transition-all duration-300 hover:shadow-[0_12px_28px_-18px_rgba(42,157,143,0.3)]"
              >
                <span className="w-8 h-8 rounded-full bg-[#2A9D8F]/10 group-hover:bg-[#2A9D8F] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <BookOpen className="w-4 h-4 text-[#2A9D8F] group-hover:text-white transition-colors duration-300" />
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-[#1a1a18] leading-snug">
                    Access Guide
                  </span>
                  <span className="block text-[11px] text-[#999] leading-tight mt-0.5">
                    How to buy property in Dubai
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#b5aea4] group-hover:text-[#2A9D8F] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </a>

              {/* About Isa Melo */}
              <div className="bg-white border border-[#ece5d9] rounded-2xl overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={ISA_PHOTO_URL}
                    alt="Isa Melo"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-display text-base font-normal text-[#1a1a18] leading-snug">
                    About Isa Melo
                  </h3>
                  <p className="text-[11px] text-[#6b6660] leading-snug mt-1.5">
                    Your trusted partner in Dubai real estate. Expert guidance
                    for investors and buyers navigating the Dubai property market.
                  </p>
                  <a
                    href={`${BASE}/about-us`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-[#7B5EA7] hover:text-[#5B3D8F] transition-colors"
                  >
                    Learn more
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}<a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-[#1a1a18] hover:bg-[#7B5EA7] text-white rounded-2xl px-3.5 py-2.5 transition-all duration-300"
              >
                <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Phone className="w-[18px] h-[18px]" />
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold leading-snug">
                    Chat on WhatsApp
                  </span>
                  <span className="block text-[11px] text-white/60 leading-tight mt-0.5">
                    Quick &amp; direct
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </a>
            </div>
          </div>
        </Container>

        {/* ── Available properties ───────────────────────── */}
        <section className="pb-3 sm:pb-4 lg:pb-5">
          <Container>
            <div className="text-center mb-2 sm:mb-3">
              <p className="eyebrow mb-3">Portfolio</p>
              <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#1a1a18]">
                Available Properties
              </h2>
              <p className="text-xs text-[#6b6660] mt-1 max-w-md mx-auto">
                Handpicked premium listings across Dubai's most sought-after locations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {PROPERTIES.map((p) => (
                <PropertyCard key={p.name} {...p} t={t} />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <PageFooter text={t.investment.footer} />
    </div>
  );
};

export default InvestmentPage;
