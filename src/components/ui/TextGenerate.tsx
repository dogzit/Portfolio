"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  /** The sentence to reveal. Split on whitespace. */
  words: string;
  className?: string;
  /** Seconds before the first word. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  /** Words from this index on take the accent colour. */
  accentFrom?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span";
};

/**
 * Reveals a sentence word by word — the Aceternity `TextGenerateEffect`,
 * rebuilt on `whileInView` instead of `useAnimate`.
 *
 * Two changes worth knowing about. The original fires on mount, so a sentence
 * below the fold has already finished animating by the time you scroll to it;
 * this waits until it's actually on screen. And it animates opacity only —
 * no blur, no y-travel — because the words sit on their final baseline from
 * the first frame, which keeps the line from reflowing as it fills in.
 *
 * The whole string stays in the DOM as one text node for screen readers and
 * for copy-paste; only the visual spans are split.
 */
export function TextGenerate({
  words,
  className,
  delay = 0,
  stagger = 0.045,
  accentFrom,
  as = "p",
}: Props) {
  const reduced = useReducedMotion();
  const wordList = words.split(" ");
  const Tag = as;

  if (reduced) {
    return <Tag className={className}>{words}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{words}</span>
      <span aria-hidden>
        {wordList.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className={cn(
              "inline-block whitespace-pre",
              accentFrom !== undefined && i >= accentFrom && "text-accent",
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: "easeOut",
            }}
          >
            {word}
            {i < wordList.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
