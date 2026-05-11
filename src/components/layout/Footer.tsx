export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-muted/60">
          <span className="gradient-text font-semibold">Zolbayar</span>
          {" "}— Crafting the future of web, one pixel and one query at a time.
        </p>
        <p className="text-xs text-muted/40 font-mono">
          Built with Next.js · Framer Motion · Prisma
        </p>
      </div>
    </footer>
  );
}
