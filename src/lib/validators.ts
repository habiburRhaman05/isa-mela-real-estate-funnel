// Shared client-side validation helpers for funnel forms.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value: string): boolean =>
  EMAIL_REGEX.test(value.trim());

export const isValidPhone = (value: string): boolean =>
  value.replace(/\D/g, "").length >= 8;

export const isNonEmpty = (value: string): boolean => value.trim().length > 0;
