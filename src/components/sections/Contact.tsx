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
import { useRef, useState } from "react";
import { CONTACT_LINKS, QUICK_FACTS } from "@/lib/data";
import { confetti } from "@/lib/confetti";
import { ContactLink } from "@/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GithubIcon, InstagramIcon, FacebookIcon } from "@/components/shared/BrandIcons";
import { Reveal } from "@/components/shared/Reveal";

const EMAIL = "bolorzoloko@gmail.com";

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
          index="06"
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
              <p className="mt-4 font-mono text-[12px] text-faint">
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
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
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
  const ref = useRef<HTMLButtonElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      // Same celebration as the snapshot tile, thrown from this button.
      const r = ref.current?.getBoundingClientRect();
      confetti(
        r
          ? { x: r.left + r.width / 2, y: r.top + r.height / 2, count: 26, power: 11 }
          : { count: 26, power: 11 },
      );

      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is still readable on screen */
    }
  };

  return (
    <div className="mt-3 flex items-center gap-2 rounded-none border border-line bg-surface p-2 pl-4">
      <Mail size={14} className="shrink-0 text-faint" />
      <a
        href={`mailto:${EMAIL}`}
        className="min-w-0 flex-1 truncate font-mono text-sm text-foreground transition-colors hover:text-accent sm:text-base"
      >
        {EMAIL}
      </a>
      <button
        ref={ref}
        onClick={copy}
        aria-label="Copy email address"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-none border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
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
        <p className="font-mono text-[12px] text-faint">Goes straight to my inbox</p>
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
