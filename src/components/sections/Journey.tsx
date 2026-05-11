"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/data";
import { TimelineEvent } from "@/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { fadeUp, slideInLeft, slideInRight, viewportConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Journey() {
  return (
    <section id="journey" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
      </div>

      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="// 03  journey"
          title="From Curious Kid to Frontend Intern"
          description="A minimalist map of the path — every milestone that made the engineer."
          align="center"
          className="text-center items-center"
        />

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full h-full origin-top"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.2), transparent)" }}
            />
          </div>

          <div className="space-y-12">
            {TIMELINE.map((event, i) => (
              <TimelineItem key={event.period} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const isLeft = event.side === "left";

  return (
    <motion.div
      variants={isLeft ? slideInLeft : slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.08 }}
      className={cn(
        "relative flex items-start gap-6 md:gap-8",
        isLeft ? "md:flex-row" : "md:flex-row-reverse",
        "flex-row",
      )}
    >
      {/* Content card */}
      <div className={cn("flex-1", !isLeft && "md:text-right")}>
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="glass glass-hover rounded-2xl p-6 border border-white/[0.06] relative overflow-hidden"
        >
          {/* Period */}
          <span className="text-xs font-mono text-electric/70 tracking-widest uppercase">
            {event.period}
          </span>
          <h3 className="text-base font-bold text-foreground mt-1">{event.title}</h3>
          <p className="text-xs text-muted/60 mt-0.5 mb-3">{event.subtitle}</p>
          <p className="text-sm text-muted/80 leading-relaxed">{event.description}</p>

          {/* Tags */}
          <div className={cn("flex flex-wrap gap-1.5 mt-4", !isLeft && "md:justify-end")}>
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-md bg-electric/[0.08] border border-electric/[0.15] text-electric-bright/70 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.03] rounded-bl-full bg-electric" />
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 w-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 400 }}
          className="w-3 h-3 rounded-full border-2 border-electric bg-background relative z-10"
          style={{ boxShadow: "0 0 10px rgba(59,130,246,0.4)" }}
        />
      </div>

      {/* Spacer (right side) */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
