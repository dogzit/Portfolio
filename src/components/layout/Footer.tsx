import { ArrowUpRight } from "lucide-react";
import { GithubStats } from "@/components/shared/GithubStats";
import { LocalTime } from "@/components/shared/LocalTime";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell py-12">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-display text-3xl text-foreground">
              Zolbayar<span className="text-accent">.</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Full-stack developer in Ulaanbaatar. Currently building SIDEQUEST and
              running my school&apos;s tech club.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:justify-end">
            <a
              href="/api/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1 text-muted"
            >
              Resume <ArrowUpRight size={12} />
            </a>
            <a
              href="https://github.com/dogzit"
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1 text-muted"
            >
              GitHub <ArrowUpRight size={12} />
            </a>
            <a href="#hero" className="link text-muted">
              Back to top
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] text-faint">
            © {new Date().getFullYear()} Zolbayar · Built with Next.js · Works on my
            machine
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <LocalTime />
            <GithubStats />
          </div>
        </div>
      </div>
    </footer>
  );
}
