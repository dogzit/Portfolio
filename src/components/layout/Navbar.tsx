"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <nav
          className={cn(
            "flex items-center gap-1 px-4 py-2.5 rounded-2xl transition-all duration-500",
            scrolled
              ? "glass border border-white/[0.06] shadow-xl shadow-black/20"
              : "bg-transparent",
          )}
        >
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
                    className="absolute inset-0 rounded-xl bg-white/[0.05] border border-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <MagneticButton
            href="#contact"
            className="hidden md:flex ml-2 items-center gap-2 px-4 py-2 text-sm rounded-xl bg-electric/10 border border-electric/20 text-electric-bright hover:bg-electric/20 hover:border-electric/40 transition-all duration-200 font-medium"
          >
            Let&apos;s Talk
          </MagneticButton>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden ml-2 p-2 rounded-xl text-muted hover:text-foreground transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 glass border border-white/[0.06] rounded-2xl p-4 shadow-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 text-sm text-muted hover:text-foreground rounded-xl hover:bg-white/[0.04] transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/[0.06]">
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full px-4 py-3 text-sm text-electric-bright bg-electric/10 rounded-xl border border-electric/20 font-medium"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
