import { ArrowUpRight, MapPin } from "lucide-react";
import {
  BIO,
  CONTACT_LINKS,
  CURRENTLY,
  EXPERIENCE,
  FACTS,
  PROJECTS,
  SKILLS,
} from "@/lib/data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { BentoGrid, BentoTile, CopyTile } from "@/components/ui/BentoGrid";
import { LocalTime } from "@/components/shared/LocalTime";
import { GithubIcon } from "@/components/shared/BrandIcons";

/**
 * The skim layer. The story section above is the long version and the projects
 * below are the detailed version; this is the thirty-second one, for a reader
 * who opened the page and wants the shape of things before committing.
 *
 * Built on the bento grid ported from the template, but the tiles carry facts
 * that are already elsewhere in `data.ts` rather than decoration — nothing
 * here is a number invented to fill a cell.
 */
export function Snapshot() {
  const frontend = SKILLS.find((c) => c.name === "Frontend");
  const email = CONTACT_LINKS.find((l) => l.icon === "mail");
  const github = CONTACT_LINKS.find((l) => l.icon === "github");
  const lastRole = EXPERIENCE[0];
  const liveCount = PROJECTS.filter((p) => p.status === "Live").length;

  return (
    <section id="snapshot" className="section">
      <div className="shell">
        <SectionHeader
          index="01"
          label="At a glance"
          title="The short version"
          note="For anyone who'd rather not read the whole thing. Everything here is covered in more detail further down."
        />

        <Reveal className="mt-10">
          <BentoGrid className="border-y border-line">
            {/* Wide: what I'm building now */}
            <BentoTile
              className="sm:col-span-2"
              label="now()"
              title={CURRENTLY[0].value}
              description="A social RPG that tries to make real life hand out XP — the thing I'm spending most evenings on."
            />

            {/* Where */}
            <BentoTile label="where()">
              <div className="space-y-3">
                <p className="flex items-center gap-2 font-display text-display-sm text-foreground">
                  <MapPin size={15} className="shrink-0 text-accent" />
                  Ulaanbaatar
                </p>
                <div className="font-mono text-[12px] text-muted">
                  <LocalTime prefix="Local time" />
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  GMT+8. Happy to work across time zones.
                </p>
              </div>
            </BentoTile>

            {/* Counts — reuses the hero's FACTS so the two can't drift apart */}
            <BentoTile label="count()">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-5">
                {FACTS.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="font-display tnum block text-2xl leading-none text-foreground">
                        {f.value}
                      </span>
                      <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                        {f.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </BentoTile>

            {/* Stack */}
            <BentoTile
              label="stack()"
              title="Strongest in frontend"
              description={frontend?.note}
            >
              <ul className="flex flex-wrap gap-1.5">
                {frontend?.skills.map((s) => (
                  <li key={s.name} className="chip">
                    {s.name}
                  </li>
                ))}
              </ul>
            </BentoTile>

            {/* Last role */}
            {lastRole && (
              <BentoTile label="worked()" title={lastRole.title}>
                <div className="space-y-1.5">
                  <p className="text-sm text-foreground/85">{lastRole.org}</p>
                  <p className="font-mono text-[12px] text-faint">{lastRole.period}</p>
                </div>
              </BentoTile>
            )}

            {/* Wide: get in touch */}
            <BentoTile
              className="sm:col-span-2"
              label="reach()"
              title="Open to internships"
              description={`${liveCount} of the projects below are live and in use. If any of it is useful to you, the fastest way to reach me is email.`}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                {email?.username && (
                  <CopyTile value={email.username} label={email.username} />
                )}
                {github && (
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <GithubIcon size={14} />
                    {github.username}
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </BentoTile>

            {/* Tagline, set as a quiet closing note */}
            <BentoTile label="tldr()">
              <p className="font-display text-display-sm text-muted">{BIO.tagline}</p>
            </BentoTile>
          </BentoGrid>
        </Reveal>

        <div className="lattice-foot border-b border-line">
          <span className="cell-label">dev.snapshot()</span>
        </div>
      </div>
    </section>
  );
}
