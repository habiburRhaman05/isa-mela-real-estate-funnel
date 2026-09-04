/** Shared input shell: soft filled field, gold-free neutral border that turns
 *  purple on focus and red on a validation error. */
export const pillClass = (hasError?: boolean) =>
  [
    "flex items-center gap-2 w-full rounded-xl border px-3 py-2.5 transition-all",
    hasError
      ? "border-red-300 bg-red-50/40 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-500/10"
      : "border-[#e6dfd3] bg-[#faf8f5] focus-within:border-[#7B5EA7] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#7B5EA7]/10",
  ].join(" ");

/** Label styling shared by every form field. */
export const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a847c]";

/** Primary action button. */
export const primaryButtonClass =
  "w-full inline-flex items-center justify-center gap-2 bg-[#1a1a18] hover:bg-[#7B5EA7] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 text-sm disabled:opacity-60 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Secondary / back button. */
export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#1a1a18]/5 text-[#6b6660] hover:text-[#1a1a18] font-semibold py-3 px-5 rounded-xl border border-[#e6dfd3] transition-all text-sm active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5EA7]/30";
