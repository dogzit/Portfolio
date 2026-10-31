"use client";

import { useEffect } from "react";

/**
 * A note for anyone who opens devtools.
 *
 * Reviewers of a developer's portfolio tend to look at the console, and most
 * of the time it's empty or full of warnings. This is the cheapest possible
 * way to reward that instinct — it ships as one `useEffect` and prints once.
 *
 * Deliberately plain text plus one styled line: ASCII art in a console is a
 * coin flip across themes and fonts, and this has to read in both.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    const heading = [
      "color:#c79468",
      "font-size:13px",
      "font-weight:700",
      "letter-spacing:0.08em",
    ].join(";");

    console.log("%cZOLBAYAR — DEV", heading);
    console.log(
      [
        "You opened the console. Good instinct.",
        "",
        "Built with Next.js 16, React 19, Tailwind v4, Prisma and Framer Motion.",
        "The source is at https://github.com/dogzit",
        "",
        "There's a keyboard easter egg on this page. It's the obvious one.",
        "Hiring, or want to build something? bolorzoloko@gmail.com",
      ].join("\n"),
    );
  }, []);

  return null;
}
