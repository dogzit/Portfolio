"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Compass,
  GitBranch,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Layers,
  FolderKanban,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PROJECTS } from "@/lib/data";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Projects" | "Contact" | "Links";
  icon: React.ElementType;
  action: () => void | Promise<void>;
};

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const scrollTo = useCallback(
    (hash: string) => {
      close();
      if (window.location.pathname !== "/") {
        router.push(`/${hash}`);
        return;
      }
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [close, router],
  );

  const commands: Cmd[] = useMemo(() => {
    const base: Cmd[] = [
      { id: "nav-work", label: "Go to Work", hint: "#work", group: "Navigate", icon: FolderKanban, action: () => scrollTo("#work") },
      { id: "nav-stack", label: "Go to Stack", hint: "#stack", group: "Navigate", icon: Layers, action: () => scrollTo("#stack") },
      { id: "nav-activity", label: "Go to Activity", hint: "#activity", group: "Navigate", icon: GitBranch, action: () => scrollTo("#activity") },
      { id: "nav-about", label: "Go to About", hint: "#about", group: "Navigate", icon: Compass, action: () => scrollTo("#about") },
      { id: "nav-contact", label: "Go to Contact", hint: "#contact", group: "Navigate", icon: MessageSquare, action: () => scrollTo("#contact") },
      { id: "copy-email", label: "Copy email", hint: "bolorzoloko@gmail.com", group: "Contact", icon: Mail, action: async () => {
        try { await navigator.clipboard.writeText("bolorzoloko@gmail.com"); } catch { /* ignore */ }
        close();
      } },
      { id: "open-mail", label: "Email me", hint: "mailto:", group: "Contact", icon: Mail, action: () => { window.location.href = "mailto:bolorzoloko@gmail.com"; close(); } },
      { id: "open-phone", label: "Call me", hint: "+976 88782206", group: "Contact", icon: Phone, action: () => { window.location.href = "tel:+97688782206"; close(); } },
      { id: "open-github", label: "GitHub", hint: "@dogzit", group: "Links", icon: GitBranch, action: () => { window.open("https://github.com/dogzit", "_blank"); close(); } },
      { id: "open-resume", label: "Resume (PDF)", hint: "/api/resume", group: "Links", icon: Briefcase, action: () => { window.open("/api/resume", "_blank"); close(); } },
    ];
    const projectCmds: Cmd[] = PROJECTS.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      hint: p.tagline,
      group: "Projects",
      icon: Code2,
      action: () => scrollTo("#work"),
    }));
    return [...base, ...projectCmds];
  }, [close, scrollTo]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Toggle on ⌘K / Ctrl+K, or when the navbar asks for it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    const onRequest = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onRequest);
    };
  }, [open, close]);

  const onQuery = useCallback((value: string) => {
    setQuery(value);
    setActive(0);
  }, []);

  // Focus input + lock scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 30);
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Keyboard nav within list
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.action();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active]);

  // Keep active item in view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const node = list.querySelector<HTMLElement>(`[data-cmd-index="${active}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const groups: Cmd["group"][] = ["Navigate", "Projects", "Contact", "Links"];

  return (
    <>
      {/* Hidden launcher button — provides accessibility entry point */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="sr-only"
      >
        Open command palette
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            className="fixed inset-0 z-[10000] flex items-start justify-center p-4 pt-[12vh] backdrop-blur-[2px]"
            style={{ background: "color-mix(in srgb, var(--background) 45%, rgba(20,16,12,0.55))" }}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-none overflow-hidden border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-lg)",
              }}
              role="dialog"
              aria-label="Command palette"
            >
              <div className="h-px bg-border" />

              {/* Search */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search size={16} className="text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => onQuery(e.target.value)}
                  placeholder="Search… (try project name, 'email', or 'now')"
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted/50"
                />
                <kbd className="hidden sm:inline-block text-[10px] font-mono text-muted px-1.5 py-0.5 rounded border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <ul ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="py-8 text-center text-xs font-mono text-muted">
                    No matches for &ldquo;{query}&rdquo;
                  </li>
                )}
                {groups.map((g) => {
                  const items = filtered
                    .map((c, i) => ({ c, i }))
                    .filter(({ c }) => c.group === g);
                  if (items.length === 0) return null;
                  return (
                    <li key={g} className="mb-2 last:mb-0">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/70 px-3 pt-2 pb-1">
                        {g}
                      </p>
                      <ul>
                        {items.map(({ c, i }) => {
                          const isActive = i === active;
                          return (
                            <li key={c.id} data-cmd-index={i}>
                              <button
                                onMouseEnter={() => setActive(i)}
                                onClick={() => c.action()}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-none text-left transition-colors ${
                                  isActive
                                    ? "bg-surface-2 text-foreground"
                                    : "text-foreground/70 hover:text-foreground"
                                }`}
                              >
                                <span
                                  className="w-7 h-7 rounded-none flex items-center justify-center shrink-0 border"
                                  style={{
                                    background: isActive ? "var(--surface-2)" : "transparent",
                                    borderColor: isActive ? "var(--border-hover)" : "var(--border)",
                                  }}
                                >
                                  <c.icon size={13} />
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span className="block text-sm truncate">{c.label}</span>
                                  {c.hint && (
                                    <span className="block text-[11px] font-mono text-muted/70 truncate">
                                      {c.hint}
                                    </span>
                                  )}
                                </span>
                                {isActive && (
                                  <ArrowUpRight size={12} className="text-accent shrink-0" />
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] font-mono text-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-border">↑</kbd>
                    <kbd className="px-1 py-0.5 rounded border border-border">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-border">↵</kbd>
                    select
                  </span>
                </div>
                <span>{filtered.length} results</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const subscribePlatform = () => () => {};
const getPlatformSnapshot = () => isMac();
const getServerPlatformSnapshot = () => true;

export function CommandPaletteHint() {
  const mac = useSyncExternalStore(
    subscribePlatform,
    getPlatformSnapshot,
    getServerPlatformSnapshot,
  );
  return (
    <>
      <kbd className="px-1 py-0.5 rounded border border-border">
        {mac ? "⌘" : "Ctrl"}
      </kbd>
      <kbd className="px-1 py-0.5 rounded border border-border">K</kbd>
    </>
  );
}

