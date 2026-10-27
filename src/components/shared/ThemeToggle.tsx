"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const EVENT = "themechange";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** The theme actually in force: an explicit choice, else whatever the OS says. */
function getSnapshot(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "dark" || chosen === "light") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Server and first hydration pass: unknown, so render a placeholder. */
function getServerSnapshot(): Theme | null {
  return null;
}

type VTDocument = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Day / night switch. Remembers the choice; falls back to the OS setting.
 *
 * Where the browser supports the View Transitions API, the new theme is
 * revealed as a circle growing out of this button, so the swap reads as one
 * motion instead of a flash. Everywhere else it just changes instantly.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const apply = () => {
      document.documentElement.dataset.theme = next;
      window.dispatchEvent(new Event(EVENT));
    };

    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }

    const doc = document as VTDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof doc.startViewTransition !== "function") {
      apply();
      return;
    }

    // Grow the reveal from the button, out to whichever corner is furthest.
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${radius}px`);
    root.dataset.vt = "theme";

    doc.startViewTransition(apply).finished.finally(() => {
      delete root.dataset.vt;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground ${className}`}
    >
      {theme === null ? (
        <span className="h-3.5 w-3.5" />
      ) : theme === "dark" ? (
        <Sun size={14} />
      ) : (
        <Moon size={14} />
      )}
    </button>
  );
}
