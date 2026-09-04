/**
 * Social Links store — persisted in localStorage so the admin dashboard
 * can add / edit / remove links and the footer picks them up at render time.
 */

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "google"
  | "whatsapp"
  | "youtube"
  | "tiktok"
  | "telegram"
  | "custom";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  /** Brand colour (Tailwind class or hex). Fallback to platform default. */
  color?: string;
  /** Optional custom icon URL or SVG path — only used when platform === "custom". */
  iconUrl?: string;
  enabled: boolean;
}

export interface SocialLinksState {
  links: SocialLink[];
}

const STORAGE_KEY = "social_links";

/** Default social links shown on first visit (mirrors the original hardcoded footer). */
const DEFAULT_LINKS: SocialLink[] = [
  {
    id: "ig-default",
    platform: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/isamelo.realestate/",
    enabled: true,
  },
  {
    id: "fb-default",
    platform: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/",
    enabled: true,
  },
  {
    id: "tw-default",
    platform: "twitter",
    label: "X (Twitter)",
    url: "https://twitter.com/",
    enabled: true,
  },
  {
    id: "li-default",
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/",
    enabled: true,
  },
  {
    id: "google-default",
    platform: "google",
    label: "Website",
    url: "https://isamelo-realestate.vercel.app",
    enabled: true,
  },
  {
    id: "wa-default",
    platform: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/12133402861",
    enabled: true,
  },
];

/* ── helpers ──────────────────────────────────────────────── */

function read(): SocialLink[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LINKS;
    const parsed = JSON.parse(raw) as SocialLink[];
    return parsed.length > 0 ? parsed : DEFAULT_LINKS;
  } catch {
    return DEFAULT_LINKS;
  }
}

function write(links: SocialLink[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

let listeners: Array<() => void> = [];

function emit() {
  listeners.forEach((fn) => fn());
}

/* ── public API ───────────────────────────────────────────── */

/** Subscribe to changes. Returns an unsubscribe function. */
export function onSocialLinksChange(fn: () => void): () => void {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

/** Get the current list of social links. */
export function getSocialLinks(): SocialLink[] {
  return read();
}

/** Get only the enabled links (for the footer). */
export function getEnabledSocialLinks(): SocialLink[] {
  return read().filter((l) => l.enabled);
}

/** Add a new social link. */
export function addSocialLink(
  link: Omit<SocialLink, "id">,
): SocialLink {
  const links = read();
  const newLink: SocialLink = {
    ...link,
    id: `sl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
  write([...links, newLink]);
  emit();
  return newLink;
}

/** Update an existing social link by id. */
export function updateSocialLink(
  id: string,
  patch: Partial<Omit<SocialLink, "id">>,
): void {
  const links = read().map((l) => (l.id === id ? { ...l, ...patch } : l));
  write(links);
  emit();
}

/** Remove a social link by id. */
export function removeSocialLink(id: string): void {
  write(read().filter((l) => l.id !== id));
  emit();
}

/** Reorder links (drag-and-drop or up/down). */
export function reorderSocialLinks(orderedIds: string[]): void {
  const links = read();
  const map = new Map(links.map((l) => [l.id, l]));
  const reordered = orderedIds
    .map((id) => map.get(id))
    .filter(Boolean) as SocialLink[];
  write(reordered);
  emit();
}

/** Reset to defaults. */
export function resetSocialLinks(): void {
  write(DEFAULT_LINKS);
  emit();
}
