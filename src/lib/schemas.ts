import { z } from "zod";
import { isValidPhone } from "./validators";

/** Localized error copy a schema needs — matches the shape already present
 * on t.consult / t.newsletter / t.investment in every language. */
type ContactErrorMessages = {
  nameError: string;
  phoneError: string;
  emailError: string;
  consentError: string;
};

/**
 * Shared name/phone/email/consent schema used by the Consult, Newsletter
 * and Investment (step 3) forms. Built as a factory so error messages stay
 * localized to the active language instead of being hardcoded in English.
 */
export const createContactSchema = (m: ContactErrorMessages) =>
  z.object({
    name: z.string().trim().min(1, m.nameError),
    phone: z.string().refine(isValidPhone, { message: m.phoneError }),
    email: z.string().trim().min(1, m.emailError).email(m.emailError),
    consent: z.boolean().refine((v) => v === true, { message: m.consentError }),
  });

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

export const CONTACT_DEFAULT_VALUES: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  consent: false,
};

/* ------------------------------------------------------------------ */
/* Newsletter-only schema (name + email — no phone)                    */
/* ------------------------------------------------------------------ */

export type NewsletterFormValues = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

export const createNewsletterSchema = (m: { nameError: string; phoneError: string; emailError: string; consentError: string }) =>
  z.object({
    name: z.string().trim().min(1, m.nameError),
    phone: z.string().optional(),
    email: z.string().trim().min(1, m.emailError).email(m.emailError),
    consent: z.boolean().refine((v) => v === true, { message: m.consentError }),
  });

export const NEWSLETTER_DEFAULT_VALUES: NewsletterFormValues = {
  name: "",
  phone: "",
  email: "",
  consent: false,
};
