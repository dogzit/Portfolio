"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function CaseStudies() {
  return (
    <section id="work" className="relative py-32 px-6">
      {/* Section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-electric/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="// 01  selected work"
          title="Case Studies"
          description="Not just projects — documented engineering decisions, tradeoffs, and outcomes. Each one built to solve a real problem."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={index === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={project} index={index} featured={index === 0} />
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent"
        />
      </div>
    </section>
  );
}
