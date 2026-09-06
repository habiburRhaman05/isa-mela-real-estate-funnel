import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import Container from "@/components/Container";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
  Send,
  Globe,
  Link2,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowLeft,
  GripVertical,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  type SocialLink,
  type SocialPlatform,
  getSocialLinks,
  addSocialLink,
  updateSocialLink,
  removeSocialLink,
  reorderSocialLinks,
  resetSocialLinks,
  onSocialLinksChange,
} from "@/lib/socialLinks";

/* ── Platform metadata ────────────────────────────────────── */

const PLATFORMS: Record<
  SocialPlatform,
  { label: string; color: string; bgClass: string; Icon: React.FC<{ className?: string }> }
> = {
  instagram: {
    label: "Instagram",
    color: "#E4405F",
    bgClass: "bg-[#E4405F]",
    Icon: Instagram,
  },
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    bgClass: "bg-[#1877F2]",
    Icon: Facebook,
  },
  twitter: {
    label: "X (Twitter)",
    color: "#000000",
    bgClass: "bg-black",
    Icon: Twitter,
  },
  linkedin: {
    label: "LinkedIn",
    color: "#0A66C2",
    bgClass: "bg-[#0A66C2]",
    Icon: Linkedin,
  },
  google: {
    label: "Website",
    color: "#4285F4",
    bgClass: "bg-[#4285F4]",
    Icon: Globe,
  },
  whatsapp: {
    label: "WhatsApp",
    color: "#25D366",
    bgClass: "bg-[#25D366]",
    Icon: ({ className }) => (
      <WhatsAppIcon className={className ?? "w-4 h-4 fill-white"} />
    ),
  },
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    bgClass: "bg-[#FF0000]",
    Icon: Youtube,
  },
  tiktok: {
    label: "TikTok",
    color: "#000000",
    bgClass: "bg-black",
    Icon: ({ className }) => (
      <MessageCircle className={className ?? "w-4 h-4 text-white"} />
    ),
  },
  telegram: {
    label: "Telegram",
    color: "#0088cc",
    bgClass: "bg-[#0088cc]",
    Icon: Send,
  },
  custom: {
    label: "Custom",
    color: "#7B5EA7",
    bgClass: "bg-[#7B5EA7]",
    Icon: Link2,
  },
};

const PLATFORM_OPTIONS: SocialPlatform[] = [
  "instagram",
  "facebook",
  "twitter",
  "linkedin",
  "google",
  "whatsapp",
  "youtube",
  "tiktok",
  "telegram",
  "custom",
];

/* ── Inline editable row ──────────────────────────────────── */

function LinkRow({
  link,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  link: SocialLink;
  index: number;
  total: number;
  onUpdate: (id: string, patch: Partial<SocialLink>) => void;
  onRemove: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    url: link.url,
    label: link.label,
    platform: link.platform,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const meta = PLATFORMS[link.platform] ?? PLATFORMS.custom;
  const Icon = meta.Icon;

  const save = () => {
    onUpdate(link.id, draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft({ url: link.url, label: link.label, platform: link.platform });
    setEditing(false);
    setConfirmDelete(false);
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all ${
        editing
          ? "border-[#7B5EA7]/40 bg-[#7B5EA7]/5"
          : "border-[#ece5d9] bg-white hover:shadow-sm"
      }`}
    >
      {/* Drag handle + order */}
      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="text-[#b5aea4] hover:text-[#7B5EA7] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Move up"
        >
          <GripVertical className="w-3 h-3 rotate-180" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="text-[#b5aea4] hover:text-[#7B5EA7] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Move down"
        >
          <GripVertical className="w-3 h-3" />
        </button>
      </div>

      {/* Icon badge */}
      <span
        className={`w-8 h-8 rounded-full ${meta.bgClass} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className="w-4 h-4 text-white" />
      </span>

      {/* Content */}
      {editing ? (
        <div className="flex-1 min-w-0 space-y-2">
          <select
            value={draft.platform}
            onChange={(e) =>
              setDraft({ ...draft, platform: e.target.value as SocialPlatform })
            }
            className="w-full text-sm border border-[#ece5d9] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#7B5EA7]"
          >
            {PLATFORM_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {PLATFORMS[p].label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={draft.label}
            onChange={(e) => setDraft({ ...draft, label: e.target.value })}
            placeholder="Label"
            className="w-full text-sm border border-[#ece5d9] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#7B5EA7]"
          />
          <input
            type="url"
            value={draft.url}
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            placeholder="https://..."
            className="w-full text-sm border border-[#ece5d9] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#7B5EA7]"
          />
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-[#1a1a18] leading-tight block truncate">
            {link.label}
          </span>
          <span className="text-[11px] text-[#8a847c] leading-snug block truncate">
            {link.url}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={save}
              className="w-7 h-7 rounded-full bg-[#2A9D8F]/10 hover:bg-[#2A9D8F] flex items-center justify-center transition-colors"
              aria-label="Save"
            >
              <Check className="w-3.5 h-3.5 text-[#2A9D8F] hover:text-white" />
            </button>
            <button
              onClick={cancel}
              className="w-7 h-7 rounded-full bg-[#C9A961]/10 hover:bg-[#C9A961] flex items-center justify-center transition-colors"
              aria-label="Cancel"
            >
              <X className="w-3.5 h-3.5 text-[#C9A961] hover:text-white" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                onUpdate(link.id, { enabled: !link.enabled })
              }
              className="w-7 h-7 rounded-full bg-[#ece5d9]/50 hover:bg-[#7B5EA7]/10 flex items-center justify-center transition-colors"
              aria-label={link.enabled ? "Hide" : "Show"}
              title={link.enabled ? "Hide from footer" : "Show in footer"}
            >
              {link.enabled ? (
                <Eye className="w-3.5 h-3.5 text-[#7B5EA7]" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-[#b5aea4]" />
              )}
            </button>
            <button
              onClick={() => setEditing(true)}
              className="w-7 h-7 rounded-full bg-[#ece5d9]/50 hover:bg-[#7B5EA7]/10 flex items-center justify-center transition-colors"
              aria-label="Edit"
            >
              <Pencil className="w-3.5 h-3.5 text-[#7B5EA7]" />
            </button>
            {confirmDelete ? (
              <>
                <button
                  onClick={() => onRemove(link.id)}
                  className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-500 flex items-center justify-center transition-colors"
                  aria-label="Confirm delete"
                >
                  <Check className="w-3.5 h-3.5 text-red-500 hover:text-white" />
                </button>
                <button
                  onClick={cancel}
                  className="w-7 h-7 rounded-full bg-[#ece5d9]/50 hover:bg-[#C9A961] flex items-center justify-center transition-colors"
                  aria-label="Cancel delete"
                >
                  <X className="w-3.5 h-3.5 text-[#b5aea4]" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-7 h-7 rounded-full bg-[#ece5d9]/50 hover:bg-red-50 flex items-center justify-center transition-colors"
                aria-label="Delete"
              >
                <Trash2 className="w-3.5 h-3.5 text-[#b5aea4] hover:text-red-500" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────── */

export const SocialLinksAdminPage = () => {
  const navigate = useNavigate();
  const lang = useLang();
  const t = getDict(lang);

  const [links, setLinks] = useState<SocialLink[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newLink, setNewLink] = useState({
    platform: "instagram" as SocialPlatform,
    label: "Instagram",
    url: "",
  });

  const refresh = useCallback(() => setLinks(getSocialLinks()), []);

  useEffect(() => {
    refresh();
    return onSocialLinksChange(refresh);
  }, [refresh]);

  const handleUpdate = (id: string, patch: Partial<SocialLink>) => {
    updateSocialLink(id, patch);
    refresh();
  };

  const handleRemove = (id: string) => {
    removeSocialLink(id);
    refresh();
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const ids = links.map((l) => l.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    reorderSocialLinks(ids);
    refresh();
  };

  const handleMoveDown = (index: number) => {
    if (index === links.length - 1) return;
    const ids = links.map((l) => l.id);
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    reorderSocialLinks(ids);
    refresh();
  };

  const handleAdd = () => {
    if (!newLink.url.trim()) return;
    addSocialLink({
      platform: newLink.platform,
      label: newLink.label || PLATFORMS[newLink.platform].label,
      url: newLink.url.trim(),
      enabled: true,
    });
    setNewLink({ platform: "instagram", label: "Instagram", url: "" });
    setShowAdd(false);
    refresh();
  };

  const handleReset = () => {
    resetSocialLinks();
    refresh();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a18] flex flex-col">
      <header className="border-b border-[#ece5d9] bg-white">
        <Container className="flex items-center gap-3 py-4">
          <button
            onClick={() => navigate(`/?lang=${lang}`)}
            className="w-9 h-9 rounded-full bg-[#ece5d9]/50 hover:bg-[#7B5EA7]/10 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#7B5EA7]" />
          </button>
          <div>
            <h1 className="font-display text-lg font-normal text-[#1a1a18]">
              Social Links Dashboard
            </h1>
            <p className="text-[11px] text-[#8a847c]">
              Manage the social links shown in the footer
            </p>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-5 max-w-xl mx-auto">
          {/* Stats bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-medium text-[#8a847c] uppercase tracking-wider">
              {links.filter((l) => l.enabled).length} active / {links.length} total
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[11px] text-[#8a847c] hover:text-[#7B5EA7] transition-colors"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>

          {/* Links list */}
          <div className="space-y-2">
            {links.map((link, i) => (
              <LinkRow
                key={link.id}
                link={link}
                index={i}
                total={links.length}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
                onMoveUp={() => handleMoveUp(i)}
                onMoveDown={() => handleMoveDown(i)}
              />
            ))}
          </div>

          {/* Add button / form */}
          <div className="mt-4">
            {showAdd ? (
              <div className="rounded-2xl border border-[#7B5EA7]/40 bg-[#7B5EA7]/5 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#1a1a18]">
                    Add New Social Link
                  </span>
                  <button
                    onClick={() => setShowAdd(false)}
                    className="text-[#b5aea4] hover:text-[#C9A961]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <select
                  value={newLink.platform}
                  onChange={(e) => {
                    const p = e.target.value as SocialPlatform;
                    setNewLink({
                      ...newLink,
                      platform: p,
                      label: PLATFORMS[p].label,
                    });
                  }}
                  className="w-full text-sm border border-[#ece5d9] rounded-xl px-3 py-2 focus:outline-none focus:border-[#7B5EA7]"
                >
                  {PLATFORM_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {PLATFORMS[p].label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={newLink.label}
                  onChange={(e) =>
                    setNewLink({ ...newLink, label: e.target.value })
                  }
                  placeholder="Label (e.g. Instagram)"
                  className="w-full text-sm border border-[#ece5d9] rounded-xl px-3 py-2 focus:outline-none focus:border-[#7B5EA7]"
                />

                <input
                  type="url"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full text-sm border border-[#ece5d9] rounded-xl px-3 py-2 focus:outline-none focus:border-[#7B5EA7]"
                />

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleAdd}
                    disabled={!newLink.url.trim()}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#2A9D8F] text-white text-[13px] font-medium py-2 hover:bg-[#248f82] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Add Link
                  </button>
                  <button
                    onClick={() => setShowAdd(false)}
                    className="flex-1 rounded-xl border border-[#ece5d9] text-[13px] font-medium py-2 hover:bg-[#ece5d9]/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAdd(true)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#ece5d9] hover:border-[#7B5EA7]/40 bg-white py-3 text-[13px] font-medium text-[#8a847c] hover:text-[#7B5EA7] transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Social Link
              </button>
            )}
          </div>

          {/* Preview note */}
          <p className="mt-5 text-center text-[11px] text-[#b5aea4]">
            Changes are saved instantly and reflected in the footer across all pages.
          </p>
        </Container>
      </main>
    </div>
  );
};

export default SocialLinksAdminPage;
