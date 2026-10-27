"use client";

import {
  Mail,
  Check,
  Copy,
  Send,
  Briefcase,
  MapPin,
  GraduationCap,
  Languages,
  Clock,
  Handshake,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { CONTACT_LINKS, QUICK_FACTS } from "@/lib/data";
import { ContactLink } from "@/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";

const EMAIL = "bolorzoloko@gmail.com";

/* ── Brand marks ─────────────────────────────────────────────────────────── */
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
};

const FACT_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  briefcase: Briefcase,
  map: MapPin,
  cap: GraduationCap,
  languages: Languages,
  clock: Clock,
  handshake: Handshake,
};

/* ── Section ─────────────────────────────────────────────────────────────── */
export function Contact() {
  const socialLinks = CONTACT_LINKS.filter((l) => !["mail", "phone"].includes(l.icon));
  const phone = CONTACT_LINKS.find((l) => l.icon === "phone");

  return (
    <section id="contact" className="section grid-bg">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Contact"
          title="Get in touch"
          note="Open to internships, freelance work, and problems that look slightly too hard. I reply fast."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — direct lines */}
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Email</p>
            <CopyEmail />

            {phone && (
              <a
                href={phone.href}
                className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-foreground"
              >
                <Phone size={13} />
                {phone.username}
              </a>
            )}

            <div className="mt-10">
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {socialLinks.map((link) => (
                  <SocialDot key={link.label} link={link} />
                ))}
              </ul>
              <p className="mt-4 font-mono text-[11px] text-faint">
                {socialLinks.map((l) => l.username).join("  ·  ")}
              </p>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>

        {/* Quick facts — the short answers people ask for anyway */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_FACTS.map((fact, i) => {
            const Icon = FACT_ICONS[fact.icon] ?? Mail;
            return (
              <Reveal key={fact.label} delay={Math.min(i * 0.04, 0.2)}>
                <div className="card card-hover h-full p-5">
                  <span className="icon-chip">
                    <Icon size={14} />
                  </span>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {fact.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-snug text-foreground/90">
                    {fact.value}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Copy-to-clipboard email ─────────────────────────────────────────────── */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is still readable on screen */
    }
  };

  return (
    <div className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-surface p-2 pl-4">
      <Mail size={14} className="shrink-0 text-faint" />
      <a
        href={`mailto:${EMAIL}`}
        className="min-w-0 flex-1 truncate font-mono text-sm text-foreground transition-colors hover:text-accent sm:text-base"
      >
        {EMAIL}
      </a>
      <button
        onClick={copy}
        aria-label="Copy email address"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
      >
        {copied ? <Check size={14} className="text-positive" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

/* ── One social button ───────────────────────────────────────────────────── */
function SocialDot({ link }: { link: ContactLink }) {
  const Icon = ICON_MAP[link.icon] ?? Mail;
  return (
    <li>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-dot"
        aria-label={`${link.label} — ${link.username}`}
        title={link.username}
      >
        <Icon size={15} />
      </a>
    </li>
  );
}

/* ── Form ────────────────────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow">Or write here</p>
        <p className="font-mono text-[11px] text-faint">Goes straight to my inbox</p>
      </div>

      {status === "success" ? (
        <div className="py-12 text-center">
          <span className="icon-chip mx-auto">
            <Check size={15} />
          </span>
          <p className="font-display mt-4 text-2xl text-foreground">Message sent.</p>
          <p className="mt-1 text-sm text-muted">I&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-name" className="field-label">
                Name
              </label>
              <input
                id="cf-name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="field"
              />
            </div>
            <div>
              <label htmlFor="cf-email" className="field-label">
                Email
              </label>
              <input
                id="cf-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="field"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cf-message" className="field-label">
              Message
            </label>
            <textarea
              id="cf-message"
              placeholder="What are you building?"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              rows={5}
              className="field resize-none"
            />
          </div>

          {status === "error" && (
            <p className="font-mono text-xs text-accent">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary w-full justify-center disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Send message"}
            <Send size={14} />
          </button>
        </form>
      )}
    </div>
  );
}
