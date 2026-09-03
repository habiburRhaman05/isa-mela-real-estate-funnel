/** Consistent pill border/focus classes for form inputs, swapping to red when a field has a validation error. */
export const pillClass = (hasError?: boolean) =>
  `flex items-center border rounded-full px-5 py-3.5 transition-colors bg-white/60 ${
    hasError
      ? "border-red-400 focus-within:border-red-500"
      : "border-[#7B5EA7]/60 focus-within:border-[#7B5EA7]"
  } focus-within:ring-2 ${hasError ? "focus-within:ring-red-500/15" : "focus-within:ring-[#7B5EA7]/15"}`;
