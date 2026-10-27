"use client";

import { useState, useEffect } from "react";
import { Search, X, Menu } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { CommandPaletteHint } from "@/components/shared/CommandPalette";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    let rafId = 0;
    const update = () => {
      setScrolled(window.scrollY > 8);
      if (sections.length === 0) return;

      const trigger = window.innerHeight * 0.3;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      let current = sections[0];
      if (nearBottom) {
        current = sections[sections.length - 1];
      } else {
        for (const s of sections) {
          const { top, bottom } = s.getBoundingClientRect();
          if (top <= trigger && bottom > trigger) {
            current = s;
            break;
          }
        }
      }
      setActiveSection(`#${current.id}`);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const openPalette = () => {
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent("palette:open"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-[var(--status-h)] z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4">
        {/* Wordmark */}
        <a href="#hero" className="group flex items-baseline gap-2">
          <span className="font-display text-xl leading-none text-foreground">
            Zolbayar
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.18em] text-faint uppercase sm:inline">
            dev
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition-colors",
                activeSection === item.href
                  ? "bg-surface-2 text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-foreground sm:flex"
            aria-label="Search the site"
          >
            <Search size={13} />
            <span className="hidden lg:inline">Search</span>
            <span className="flex gap-1">
              <CommandPaletteHint />
            </span>
          </button>

          <ThemeToggle />

          <a
            href="#contact"
            className="hidden rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium leading-none text-background transition-colors hover:bg-accent-ink md:inline-flex"
          >
            Say hi
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="border-t border-line bg-background md:hidden">
          <div className="shell py-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="flex w-full items-baseline justify-between border-b border-line py-3 text-left text-sm text-foreground/85"
              >
                {item.label}
                <span className="font-mono text-[10px] text-faint">{item.href}</span>
              </button>
            ))}
            <button
              onClick={openPalette}
              className="mt-3 flex w-full items-center gap-2 text-sm text-muted"
            >
              <Search size={13} /> Search everything
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
