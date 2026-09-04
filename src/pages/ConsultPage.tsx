import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  Clock,
  Globe,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTrackingEvent } from "@/lib/tracking";
import { Loader2, Mail, User, ShieldCheck, Sparkles, Star } from "lucide-react";
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

const ISA_IMAGE = "isa-mela.png";

/* ── Timezones ───────────────────────────────────────── */
const TIMEZONES = [
  { label: "Dubai (GMT+4)", value: "Asia/Dubai" },
  { label: "London (GMT+0)", value: "Europe/London" },
  { label: "New York (GMT-4)", value: "America/New_York" },
  { label: "Los Angeles (GMT-7)", value: "America/Los_Angeles" },
  { label: "São Paulo (GMT-3)", value: "America/Sao_Paulo" },
  { label: "Singapore (GMT+8)", value: "Asia/Singapore" },
];

/* ── Time slots ──────────────────────────────────────── */
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

/* ── Calendar helpers ─────────────────────────────────── */
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isToday(year: number, month: number, day: number) {
  const now = new Date();
  return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
}

function isPast(year: number, month: number, day: number) {
  const d = new Date(year, month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}

/* ── Booking Step Progress ────────────────────────────── */
const BookingStepProgress = ({ step, total }: { step: number; total: number }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-[10px] uppercase tracking-[0.15em] text-[#7B5EA7] font-semibold">
        Step {step} / {total}
      </span>
      <span className="text-[10px] font-medium text-[#b5aea4]">
        {Math.round((step / total) * 100)}%
      </span>
    </div>
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
            i < step ? "bg-[#7B5EA7]" : "bg-[#ece5d9]"
          }`}
        />
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════ */
export const ConsultPage = () => {
  const navigate = useNavigate();
  const lang = useLang();
  const t = getDict(lang);
  const [phoneCountry, setPhoneCountry] = useState<CountryData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ── Booking steps: 1=form, 2=calendar, 3=time, 4=notes ── */
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("Asia/Dubai");
  const [notes, setNotes] = useState<string>("");
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [yearRange, setYearRange] = useState(() => {
    const y = new Date().getFullYear();
    return { start: y - 4, end: y + 7 };
  });
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showYearMonthPicker) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowYearMonthPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showYearMonthPicker]);

  const jumpToYearMonth = useCallback((y: number, m: number) => {
    setCalYear(y);
    setCalMonth(m);
    setShowYearMonthPicker(false);
  }, []);

  const schema = useMemo(() => createContactSchema(t.consult), [t]);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: CONTACT_DEFAULT_VALUES,
    mode: "onBlur",
  });

  /* ── Calendar navigation ──────────────────────────────── */
  const prevMonth = useCallback(() => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  }, [calMonth]);

  const nextMonth = useCallback(() => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  }, [calMonth]);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  /* ── Form submit → go to calendar ─────────────────────── */
  const handleFormNext = () => {
    setBookingStep(2);
  };

  /* ── Final submit ─────────────────────────────────────── */
  const handleFinalSubmit = () => {
    setIsSubmitting(true);

    const trackingPayload = {
      type: "external form_submission" as const,
      timestamp: Date.now(),
      formId: "consultation-booking",
      formData: {
        first_name: form.getValues("name").split(" ")[0] || form.getValues("name"),
        last_name: form.getValues("name").split(" ").slice(1).join(" ") || "",
        phone: form.getValues("phone"),
        phone_country: phoneCountry?.name || "",
        phone_country_code: phoneCountry?.countryCode || "",
        phone_dial_code: phoneCountry?.dialCode || "",
        email: form.getValues("email"),
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
        bookingDate: selectedDate?.toISOString() || "",
        bookingTime: selectedTime,
        bookingTimezone: selectedTimezone,
        bookingNotes: notes,
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
        <Container className="py-4 sm:py-5 lg:py-6">
          {/* ── Row 1: Left (text + form) + Right (image) ────── */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6" style={{ gridAutoRows: 'minmax(0, auto)' }}>
            {/* Left: Text + Form / Calendar */}
            <div className="flex flex-col justify-center order-2 lg:order-1 min-h-[420px] sm:min-h-[460px]">
              {!isSubmitted && (
                <div className="mb-4">
                  <span className="eyebrow">{t.consult.eyebrow}</span>
                  <h1 className="font-display text-[1.5rem] sm:text-[2rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1a1a18] mt-2">
                    {t.consult.title}
                  </h1>
                  <p className="text-[13px] text-[#6b6660] leading-snug mt-2 max-w-md">
                    {t.consult.subtitle}
                  </p>
                </div>
              )}

              {/* ── Step indicator when in booking flow ── */}
              {!isSubmitted && bookingStep > 1 && (
                <div className="mb-3">
                  <BookingStepProgress step={bookingStep - 1} total={3} />
                </div>
              )}

              <FunnelCard>
                {isSubmitted ? (
                  <FormSuccess
                    title={t.consult.success}
                    subtitle={t.consult.successSub}
                  />
                ) : (
                  <>
                    {/* ═══ STEP 1: Contact Form ═══ */}
                    {bookingStep === 1 && (
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(handleFormNext)}
                          className="w-full space-y-3.5"
                          noValidate
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                              <FormItem className="space-y-1.5">
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
                              <FormItem className="space-y-1.5">
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
                              <FormItem className="space-y-1.5">
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
                              <FormItem className="space-y-1.5 pt-0.5">
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
                            className={`${primaryButtonClass} mt-1`}
                          >
                            <CalendarCheck className="w-4 h-4" />
                            {t.consult.submit}
                          </button>

                          <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#a9a299]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {t.consult.reassurance}
                          </p>
                        </form>
                      </Form>
                    )}

                    {/* ═══ STEP 2: Calendar ═══ */}
                    {bookingStep === 2 && (
                      <div className="animate-in fade-in slide-in-from-right-3 duration-300 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <CalendarCheck className="w-4 h-4 text-[#7B5EA7]" />
                          <h2 className="font-display text-lg font-normal text-[#1a1a18]">
                            Pick a Date
                          </h2>
                        </div>

                        {/* Calendar header */}
                        <div className="flex items-center justify-between mb-3">
                          <button
                            type="button"
                            onClick={prevMonth}
                            className="w-8 h-8 rounded-lg bg-[#f5f1ea] hover:bg-[#ece5d9] flex items-center justify-center transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4 text-[#1a1a18]" />
                          </button>

                          {/* Clickable month/year → opens year-month picker */}
                          <div className="relative" ref={pickerRef}>
                            <button
                              type="button"
                              onClick={() => setShowYearMonthPicker((v) => !v)}
                              className="flex items-center gap-1.5 text-sm font-semibold text-[#1a1a18] hover:text-[#7B5EA7] transition-colors px-2 py-1 rounded-lg hover:bg-[#f5f1ea]"
                            >
                              {MONTHS[calMonth]} {calYear}
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showYearMonthPicker ? "rotate-180" : ""}`} />
                            </button>

                            {/* Year/Month picker dropdown */}
                            {showYearMonthPicker && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-[0_8px_40px_-4px_rgba(26,26,24,0.18)] border border-[#ece5d9] p-3 z-[60] w-[224px] animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Year navigation */}
                                <div className="flex items-center justify-between mb-2">
                                  <button
                                    type="button"
                                    onClick={() => setYearRange((r) => ({ start: r.start - 12, end: r.end - 12 }))}
                                    className="w-7 h-7 rounded-lg hover:bg-[#f5f1ea] flex items-center justify-center transition-colors"
                                  >
                                    <ChevronLeft className="w-3.5 h-3.5 text-[#6b6660]" />
                                  </button>
                                  <span className="text-[11px] font-semibold text-[#1a1a18]">
                                    {yearRange.start} – {yearRange.end}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setYearRange((r) => ({ start: r.start + 12, end: r.end + 12 }))}
                                    className="w-7 h-7 rounded-lg hover:bg-[#f5f1ea] flex items-center justify-center transition-colors"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5 text-[#6b6660]" />
                                  </button>
                                </div>

                                {/* Year grid */}
                                <div className="grid grid-cols-4 gap-1 mb-2">
                                  {Array.from({ length: yearRange.end - yearRange.start + 1 }).map((_, i) => {
                                    const y = yearRange.start + i;
                                    const isCurrentYear = y === calYear;
                                    return (
                                      <button
                                        key={y}
                                        type="button"
                                        onClick={() => jumpToYearMonth(y, calMonth)}
                                        className={`text-[11px] font-medium py-1.5 rounded-lg transition-all duration-150 ${
                                          isCurrentYear
                                            ? "bg-[#7B5EA7] text-white shadow-sm"
                                            : "text-[#6b6660] hover:bg-[#f5f1ea] hover:text-[#1a1a18]"
                                        }`}
                                      >
                                        {y}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Month grid */}
                                <div className="grid grid-cols-3 gap-1">
                                  {MONTHS.map((m, i) => {
                                    const isCurrentMonth = i === calMonth;
                                    return (
                                      <button
                                        key={m}
                                        type="button"
                                        onClick={() => jumpToYearMonth(calYear, i)}
                                        className={`text-[11px] font-medium py-1.5 rounded-lg transition-all duration-150 ${
                                          isCurrentMonth
                                            ? "bg-[#7B5EA7] text-white shadow-sm"
                                            : "text-[#6b6660] hover:bg-[#f5f1ea] hover:text-[#1a1a18]"
                                        }`}
                                      >
                                        {m.slice(0, 3)}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Jump to today */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const now = new Date();
                                    jumpToYearMonth(now.getFullYear(), now.getMonth());
                                  }}
                                  className="w-full mt-2.5 text-[10px] font-bold text-[#7B5EA7] hover:bg-[#7B5EA7]/10 py-1.5 rounded-lg transition-colors tracking-wide uppercase"
                                >
                                  Jump to Today
                                </button>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={nextMonth}
                            className="w-8 h-8 rounded-lg bg-[#f5f1ea] hover:bg-[#ece5d9] flex items-center justify-center transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-[#1a1a18]" />
                          </button>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 gap-1 mb-1.5">
                          {DAYS.map((d) => (
                            <div key={d} className="text-center text-[10px] font-bold text-[#b5aea4] uppercase tracking-wider py-1">
                              {d}
                            </div>
                          ))}
                        </div>

                        {/* Calendar grid — fixed 6-row container to prevent height jumps */}
                        <div className="grid grid-cols-7 gap-1.5" style={{ gridTemplateRows: 'repeat(6, 2.25rem)' }}>
                          {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-[2.25rem]" />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const past = isPast(calYear, calMonth, day);
                            const today = isToday(calYear, calMonth, day);
                            const selected =
                              selectedDate?.getFullYear() === calYear &&
                              selectedDate?.getMonth() === calMonth &&
                              selectedDate?.getDate() === day;
                            const isWeekend = new Date(calYear, calMonth, day).getDay() === 0;

                            return (
                              <button
                                key={day}
                                type="button"
                                disabled={past || isWeekend}
                                onClick={() => setSelectedDate(new Date(calYear, calMonth, day))}
                                className={`relative h-full flex items-center justify-center rounded-xl text-[12px] font-medium transition-all duration-200 ${
                                  past || isWeekend
                                    ? "text-[#d5cec2] cursor-not-allowed"
                                    : selected
                                    ? "bg-[#7B5EA7] text-white shadow-[0_4px_14px_-2px_rgba(123,94,167,0.45)] scale-105"
                                    : today
                                    ? "bg-[#7B5EA7]/10 text-[#7B5EA7] font-semibold ring-1 ring-[#7B5EA7]/20 hover:bg-[#7B5EA7]/15"
                                    : "text-[#1a1a18] hover:bg-[#f5f1ea] hover:scale-[1.02]"
                                }`}
                              >
                                {day}
                                {today && !selected && (
                                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7B5EA7]" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Selected date display */}
                        {selectedDate && (
                          <div className="mt-3 flex items-center gap-2 text-[12px] text-[#7B5EA7] font-medium">
                            <CalendarCheck className="w-3.5 h-3.5" />
                            {selectedDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        )}

                        {/* Navigation */}
                        <div className="flex gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setBookingStep(1)}
                            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#1a1a18]/5 text-[#6b6660] hover:text-[#1a1a18] font-semibold py-2.5 px-5 rounded-xl border border-[#e6dfd3] transition-all text-[12px]"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            disabled={!selectedDate}
                            onClick={() => setBookingStep(3)}
                            className={`${primaryButtonClass} mt-0 disabled:opacity-40`}
                          >
                            Continue
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ═══ STEP 3: Time + Timezone ═══ */}
                    {bookingStep === 3 && (
                      <div className="animate-in fade-in slide-in-from-right-3 duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-[#7B5EA7]" />
                          <h2 className="font-display text-lg font-normal text-[#1a1a18]">
                            Pick a Time
                          </h2>
                        </div>

                        {/* Timezone selector */}
                        <div className="mb-3">
                          <label className="text-[10px] uppercase tracking-[0.12em] text-[#8a847c] font-semibold mb-1 block">
                            Timezone
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b5aea4] pointer-events-none" />
                            <select
                              value={selectedTimezone}
                              onChange={(e) => setSelectedTimezone(e.target.value)}
                              className="w-full appearance-none bg-[#faf8f5] border border-[#e6dfd3] rounded-xl pl-8 pr-8 py-2.5 text-[12px] text-[#1a1a18] focus:outline-none focus:border-[#7B5EA7] focus:ring-2 focus:ring-[#7B5EA7]/10 transition-all"
                            >
                              {TIMEZONES.map((tz) => (
                                <option key={tz.value} value={tz.value}>
                                  {tz.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b5aea4] pointer-events-none" />
                          </div>
                        </div>

                        {/* Time slots grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const selected = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTime(slot)}
                                className={`py-2.5 rounded-xl border text-[12px] font-medium transition-all duration-200 ${
                                  selected
                                    ? "border-[#7B5EA7] bg-[#7B5EA7] text-white shadow-[0_4px_12px_-2px_rgba(123,94,167,0.4)]"
                                    : "border-[#e6dfd3] bg-[#faf8f5] text-[#1a1a18] hover:border-[#c9a961] hover:bg-white"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>

                        {/* Selected display */}
                        {selectedTime && (
                          <div className="mt-3 flex items-center gap-2 text-[12px] text-[#7B5EA7] font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {selectedTime} — {TIMEZONES.find((tz) => tz.value === selectedTimezone)?.label}
                          </div>
                        )}

                        {/* Navigation */}
                        <div className="flex gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setBookingStep(2)}
                            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#1a1a18]/5 text-[#6b6660] hover:text-[#1a1a18] font-semibold py-2.5 px-5 rounded-xl border border-[#e6dfd3] transition-all text-[12px]"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            disabled={!selectedTime}
                            onClick={() => setBookingStep(4)}
                            className={`${primaryButtonClass} mt-0 disabled:opacity-40`}
                          >
                            Continue
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ═══ STEP 4: Notes + Final Submit ═══ */}
                    {bookingStep === 4 && (
                      <div className="animate-in fade-in slide-in-from-right-3 duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquare className="w-4 h-4 text-[#7B5EA7]" />
                          <h2 className="font-display text-lg font-normal text-[#1a1a18]">
                            Any Notes?
                          </h2>
                        </div>

                        {/* Booking summary */}
                        <div className="bg-[#f5f1ea] rounded-xl p-3.5 mb-4 space-y-1.5">
                          <div className="flex items-center gap-2 text-[12px]">
                            <CalendarCheck className="w-3.5 h-3.5 text-[#7B5EA7]" />
                            <span className="font-medium text-[#1a1a18]">
                              {selectedDate?.toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="text-[#b5aea4]">·</span>
                            <Clock className="w-3.5 h-3.5 text-[#7B5EA7]" />
                            <span className="font-medium text-[#1a1a18]">{selectedTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-[#8a847c]">
                            <Globe className="w-3 h-3" />
                            {TIMEZONES.find((tz) => tz.value === selectedTimezone)?.label}
                          </div>
                        </div>

                        {/* Notes textarea */}
                        <div className="mb-4">
                          <label className="text-[10px] uppercase tracking-[0.12em] text-[#8a847c] font-semibold mb-1.5 block">
                            Notes (optional)
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="What would you like to discuss? Any specific properties or areas of interest?"
                            rows={3}
                            className="w-full bg-[#faf8f5] border border-[#e6dfd3] rounded-xl px-3.5 py-2.5 text-[12px] text-[#1a1a18] placeholder-[#b5aea4] focus:outline-none focus:border-[#7B5EA7] focus:ring-2 focus:ring-[#7B5EA7]/10 transition-all resize-none"
                          />
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setBookingStep(3)}
                            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#1a1a18]/5 text-[#6b6660] hover:text-[#1a1a18] font-semibold py-2.5 px-5 rounded-xl border border-[#e6dfd3] transition-all text-[12px]"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleFinalSubmit}
                            className={`${primaryButtonClass} mt-0`}
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CalendarCheck className="w-4 h-4" />
                            )}
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </FunnelCard>
            </div>

            {/* Right: Image */}
            <div className="relative rounded-[1.75rem] overflow-hidden bg-[#e8e2d8] order-1 lg:order-2 min-h-[300px] lg:min-h-0 lg:h-full">
              <img
                src={ISA_IMAGE}
                alt="Isa Melo"
                className="absolute inset-0 w-full h-full object-cover object-[center_80%]"
              />
            </div>
          </div>

          {/* ── Row 2: Trust cards ────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 sm:mt-6">
            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#7B5EA7]/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-[#7B5EA7]" fill="currentColor" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust1Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust1Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-[#2A9D8F]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust2Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust2Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-[#C9A961]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust3Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust3Sub}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white border border-[#ece5d9] rounded-2xl px-3 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#E07A5F]/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-[#E07A5F]" />
              </span>
              <div>
                <span className="block text-[11px] font-semibold text-[#1a1a18]">{t.consult.trust4Title}</span>
                <span className="block text-[10px] text-[#999]">{t.consult.trust4Sub}</span>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* ── FAQ Section ──────────────────────────────────── */}
      <section className="pb-5 sm:pb-7">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-lg sm:text-xl font-normal tracking-[-0.01em] text-[#1a1a18] text-center mb-4">
              {t.consult.faqTitle}
            </h2>
            <div className="space-y-2">
              {[
                { q: t.consult.faq1Q, a: t.consult.faq1A },
                { q: t.consult.faq2Q, a: t.consult.faq2A },
                { q: t.consult.faq3Q, a: t.consult.faq3A },
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-[#ece5d9] rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer list-none text-[13px] font-medium text-[#1a1a18] hover:text-[#7B5EA7] transition-colors">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-[#b5aea4] flex-shrink-0 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-4 pb-4 text-[12px] text-[#6b6660] leading-snug">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <PageFooter text={t.consult.footer} />
    </div>
  );
};

export default ConsultPage;
