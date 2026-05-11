"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, Check, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { CONTACT_LINKS } from "@/lib/data";
import { ContactLink } from "@/types";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

function GithubIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github:    GithubIcon,
  instagram: InstagramIcon,
  facebook:  FacebookIcon,
  mail:      Mail,
  phone:     Phone,
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("bolorzoloko@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.04] blur-3xl rounded-full"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-mono text-electric/70 tracking-widest uppercase mb-4">
            // 04  contact
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let&apos;s Build{" "}
            <span className="shimmer-text">Something</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted/70 text-lg max-w-lg mx-auto">
            Open to internship opportunities, freelance projects, and interesting collaborations.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
        >
          {CONTACT_LINKS.map((link, i) => (
            <ContactCard
              key={link.label}
              link={link}
              delay={i * 0.1}
              onCopy={link.icon === "mail" ? handleCopyEmail : undefined}
              copied={copied && link.icon === "mail"}
            />
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12"
        >
          <ContactForm />
        </motion.div>

        {/* Motto footer line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-16 text-center"
        >
          <p className="text-xs font-mono text-muted/20 italic">
            &ldquo;I don&apos;t learn to pass exams. I learn to build.&rdquo;
          </p>
          <p className="text-xs font-mono text-muted/15 mt-2">— Zolbayar, 17</p>
        </motion.div>
      </div>
    </section>
  );
}

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

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-foreground/90 text-sm placeholder:text-muted/30 font-mono focus:outline-none focus:border-electric/40 focus:bg-white/[0.05] transition-all duration-200";

  return (
    <div className="glass rounded-2xl border border-white/[0.06] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center">
          <Mail size={14} className="text-electric-bright" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground/80">Send a message</p>
          <p className="text-xs text-muted/40 font-mono">Saved directly to my inbox</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
              <Check size={20} className="text-green-400" />
            </div>
            <p className="text-sm font-semibold text-foreground/80">Message sent!</p>
            <p className="text-xs text-muted/40 font-mono">I&apos;ll get back to you soon.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-electric-bright/60 hover:text-electric-bright transition-colors font-mono"
            >
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className={inputClass}
              />
            </div>
            <textarea
              placeholder="Message..."
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />

            {status === "error" && (
              <p className="text-xs text-red-400/80 font-mono">{errorMsg}</p>
            )}

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted/30 font-mono">Usually reply within 24h</p>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric text-white text-sm font-semibold hover:bg-electric/90 transition-all duration-200 shadow-lg shadow-electric/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {status === "loading" ? "Sending..." : "Send"}
                {status !== "loading" && <ArrowUpRight size={13} />}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactCard({
  link,
  delay,
  onCopy,
  copied,
}: {
  link: ContactLink;
  delay: number;
  onCopy?: () => void;
  copied?: boolean;
}) {
  const Icon = ICON_MAP[link.icon] ?? Mail;

  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass glass-hover rounded-2xl p-6 border border-white/[0.06] group relative overflow-hidden cursor-pointer"
      onClick={onCopy}
    >
      <MagneticButton
        href={onCopy ? undefined : link.href}
        target={onCopy ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="w-full"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-electric/30 group-hover:bg-electric/10 transition-all duration-300">
            {copied ? (
              <Check size={20} className="text-green-400" />
            ) : (
              <Icon size={20} className="text-muted/60 group-hover:text-electric-bright transition-colors" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
              {link.label}
            </p>
            <p className="text-xs text-muted/50 font-mono mt-0.5 group-hover:text-electric-bright/60 transition-colors">
              {copied ? "Copied!" : link.username}
            </p>
          </div>
          <ArrowUpRight
            size={14}
            className="text-muted/30 group-hover:text-electric-bright/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        </div>
      </MagneticButton>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-[0.04] transition-opacity rounded-bl-full bg-electric" />
    </motion.div>
  );
}
