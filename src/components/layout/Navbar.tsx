"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const onScroll = () => setMobileOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav className="flex items-center gap-1 px-4 py-2.5 rounded-2xl glass border border-white/[0.06] shadow-xl shadow-black/20">
          {/* Logo */}
          <MagneticButton
            href="#"
            className="mr-4 font-mono text-sm font-semibold text-foreground/90 tracking-tight"
          >
            <span className="gradient-text">zoloo</span>
            <span className="text-white/20">.dev</span>
          </MagneticButton>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative px-4 py-2 text-sm rounded-xl transition-all duration-200",
                  activeSection === item.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground/80",
                )}
              >
                {activeSection === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-white/5 border border-white/8"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <MagneticButton
            href="#contact"
            className="hidden md:flex ml-2 items-center gap-2 px-4 py-2 text-sm rounded-xl bg-electric/10 border border-electric/20 text-electric-bright hover:bg-electric/20 hover:border-electric/40 transition-all duration-200 font-medium"
          >
            Let&apos;s Talk
          </MagneticButton>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.88 }}
            className="md:hidden ml-2 w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"
            style={{ background: mobileOpen ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={15} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={15} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(5,5,8,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Dropdown panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-[72px] left-4 right-4 z-50 rounded-2xl border overflow-hidden"
              style={{
                background: "rgba(10,10,16,0.95)",
                backdropFilter: "blur(24px)",
                borderColor: "rgba(255,255,255,0.07)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Top accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />

              <div className="p-3">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.22, ease: "easeOut" }}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl group transition-all duration-150"
                    style={{
                      background: activeSection === item.href ? "rgba(59,130,246,0.08)" : "transparent",
                    }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono tabular-nums"
                        style={{ color: activeSection === item.href ? "#60a5fa" : "rgba(255,255,255,0.2)" }}>
                        0{i + 1}
                      </span>
                      <span className={cn(
                        "text-sm font-medium transition-colors",
                        activeSection === item.href ? "text-white" : "text-white/55"
                      )}>
                        {item.label}
                      </span>
                    </div>
                    {activeSection === item.href && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-electric/80"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="px-3 pb-3"
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.22)",
                    color: "#93c5fd",
                  }}
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={13} />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
