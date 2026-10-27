"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BIO, CURRENTLY, FACTS, PROJECTS } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { LocalTime } from "@/components/shared/LocalTime";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  /** One shared entrance: everything rises a little, in order. */
  const step = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.06 * i, ease },
        };

  return (
    <section id="hero" className="relative flex min-h-svh items-center pt-28 pb-16">
      <div className="shell w-full">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: the statement ───────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div {...step(0)} className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="eyebrow">
                <span className="dot dot-live" />
                Available for internships
              </p>
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <MapPin size={11} className="text-faint" />
                {BIO.location}
              </p>
              <LocalTime />
            </motion.div>

            <h1 className="font-display-black text-display-xl mt-8 flex flex-wrap text-foreground">
              <span className="sr-only">Zolbayar.</span>
              {"Zolbayar".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="name-letter"
                  {...(reduced
                    ? {}
                    : {
                        initial: { opacity: 0, y: "0.38em" },
                        animate: { opacity: 1, y: 0 },
                        transition: {
                          duration: 0.75,
                          delay: 0.1 + i * 0.045,
                          ease,
                        },
                      })}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                aria-hidden
                className="name-letter text-accent"
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: "0.38em" },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.75, delay: 0.1 + 8 * 0.045, ease },
                    })}
              >
                .
              </motion.span>
            </h1>

            <motion.p
              {...step(2)}
              className="mt-5 font-display text-display-sm text-muted"
            >
              Full-stack developer,{" "}
              <em className="text-foreground">seventeen</em>, in Ulaanbaatar.
            </motion.p>

            <motion.p {...step(3)} className="lead measure mt-8">
              {BIO.lead}
            </motion.p>

            <motion.div {...step(4)} className="measure mt-6 space-y-3 text-sm leading-relaxed text-muted">
              {BIO.intro.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...step(5)} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                See my work
                <ArrowDown size={14} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-quiet"
              >
                Resume
                <ArrowUpRight size={14} />
              </a>
            </motion.div>

            {/* Facts — a hairline strip, not stat cards */}
            <motion.dl
              {...step(6)}
              className="mt-12 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
            >
              {FACTS.map((f) => (
                <div key={f.label} className="bg-background px-4 py-3.5">
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="font-display tnum block text-2xl leading-none text-foreground">
                      {f.value}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                      {f.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── Right: portrait + what I'm on ─────────────────────────────── */}
          <motion.div
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.25, ease },
                })}
            className="lg:col-span-5 lg:pl-6"
          >
            <figure className="relative">
              <div className="overflow-hidden rounded-xl border border-line bg-surface-2">
                <div className="relative aspect-[4/5] w-full max-w-sm lg:max-w-none">
                  <ProfilePhoto />
                </div>
              </div>
              <figcaption className="mt-3 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-faint">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-line-strong" />
                That&apos;s me. Yes, the photo is overdue for a retake.
              </figcaption>
            </figure>

            {/* Currently */}
            <dl className="mt-8 border-t border-line">
              {CURRENTLY.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[72px_1fr] items-baseline gap-4 border-b border-line py-3.5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-snug text-foreground/85">{item.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.p
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 1.1, duration: 0.8 },
              })}
          className="mt-16 flex items-center gap-2 font-mono text-[11px] text-faint"
        >
          {!reduced && (
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown size={12} />
            </motion.span>
          )}
          {PROJECTS.length} projects below
        </motion.p>
      </div>
    </section>
  );
}

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return imgError ? (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-display text-6xl text-faint">Z</span>
    </div>
  ) : (
    <Image
      src="/images/profile.jpg"
      alt="Zolbayar"
      fill
      sizes="(max-width: 1024px) 384px, 420px"
      className="object-cover object-top"
      priority
      onError={() => setImgError(true)}
    />
  );
}
