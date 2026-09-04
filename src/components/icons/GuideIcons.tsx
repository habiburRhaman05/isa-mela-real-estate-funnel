import React from "react";

type I = { className?: string };

/* ── Stats Row ─────────────────────────────────────────── */

/** ROI: elegant line chart trending upward */
export const RoiIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 8 11 13 14 21 5" />
    <polyline points="16 5 21 5 21 10" />
  </svg>
);

/** Tax-free: shield with check */
export const TaxFreeIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v5c0 5.25 3.4 10.14 8 11.4C16.6 21.14 20 16.25 20 11V6l-8-4z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

/** Ownership: building with columns */
export const OwnershipIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="9" width="16" height="13" rx="1" />
    <path d="M8 9V6a4 4 0 018 0v3" />
    <line x1="12" y1="14" x2="12" y2="18" />
    <line x1="8" y1="13" x2="8" y2="13.01" />
    <line x1="16" y1="13" x2="16" y2="13.01" />
  </svg>
);

/* ── Section Headers ───────────────────────────────────── */

/** Globe with crosshairs for "Foreigners" */
export const ForeignersIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="3.5" ry="9" />
    <path d="M3.5 8.5h17M3.5 15.5h17" />
  </svg>
);

/** Crown for Golden Visa */
export const GoldenVisaIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18L4 8l4 4 4-8 4 8 4-4 2 10H2z" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** Clipboard with check for Process */
export const ProcessIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="19" rx="2" />
    <path d="M9 3V1h6v2" />
    <polyline points="9 13 11 15 15 11" />
  </svg>
);

/* ── Requirement Mini-Cards ────────────────────────────── */

/** Passport book */
export const PassportIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <circle cx="12" cy="10" r="2.5" />
    <path d="M8 16.5c0-1.38 1.79-2.5 4-2.5s4 1.12 4 2.5" />
  </svg>
);

/** Banknote / wallet */
export const FundsIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <circle cx="17" cy="14" r="1.5" />
  </svg>
);

/** ID card */
export const IdCardIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="10.5" r="2" />
    <path d="M4 16.5c0-1.38 1.79-2.5 4-2.5s4 1.12 4 2.5" />
    <line x1="15" y1="9" x2="19" y2="9" />
    <line x1="15" y1="12" x2="18" y2="12" />
  </svg>
);

/** Stacked documents */
export const DocsIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);

/* ── Benefit Icons ─────────────────────────────────────── */

/** Cityscape for Infrastructure */
export const InfrastructureIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="5" height="11" rx="0.5" />
    <rect x="9.5" y="6" width="5" height="16" rx="0.5" />
    <rect x="16" y="9" width="5" height="13" rx="0.5" />
    <rect x="4.5" y="13" width="1.5" height="1.5" fill="currentColor" stroke="none" rx="0.2" opacity="0.35" />
    <rect x="4.5" y="16.5" width="1.5" height="1.5" fill="currentColor" stroke="none" rx="0.2" opacity="0.35" />
    <rect x="11" y="8.5" width="1.5" height="1.5" fill="currentColor" stroke="none" rx="0.2" opacity="0.35" />
    <rect x="11" y="12" width="1.5" height="1.5" fill="currentColor" stroke="none" rx="0.2" opacity="0.35" />
    <rect x="11" y="15.5" width="1.5" height="1.5" fill="currentColor" stroke="none" rx="0.2" opacity="0.35" />
    <rect x="17.5" y="11.5" width="1.5" height="1.5" fill="currentColor" stroke="none" rx="0.2" opacity="0.35" />
    <rect x="17.5" y="15" width="1.5" height="1.5" fill="currentColor" stroke="none" rx="0.2" opacity="0.35" />
  </svg>
);

/** Rising bars for Rental Demand */
export const RentalIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="14" width="4" height="7" rx="0.5" />
    <rect x="10" y="8" width="4" height="13" rx="0.5" />
    <rect x="17" y="4" width="4" height="17" rx="0.5" />
  </svg>
);

/** Compass for Location */
export const LocationIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polygon points="14.5 9.5 9.5 14.5 10.5 10.5 14.5 9.5" fill="currentColor" stroke="none" opacity="0.6" />
    <polygon points="9.5 14.5 14.5 9.5 13.5 13.5 9.5 14.5" fill="currentColor" stroke="none" opacity="0.3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** Shield with star for Lifestyle */
export const LifestyleIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 6.5V12c0 5.25 3.75 10.14 9 11.4 5.25-1.26 9-6.15 9-11.4V6.5L12 2z" />
    <path d="M12 7.5l1 2.1 2.3.3-1.7 1.6.4 2.3L12 12.8l-2 1 .4-2.3-1.7-1.6 2.3-.3z" fill="currentColor" stroke="none" opacity="0.5" />
  </svg>
);

/* ── Utility Icons ─────────────────────────────────────── */

/** Map pin */
export const MapPinIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

/** Check circle */
export const CheckPremiumIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8" />
    <polyline points="7 10 9.5 12.5 13 7.5" />
  </svg>
);

/** Clock */
export const ClockIcon = ({ className }: I) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8" />
    <polyline points="10 5.5 10 10 13 12.5" />
  </svg>
);
