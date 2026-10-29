import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-xl text-center">
        <p className="eyebrow justify-center">
          <span aria-hidden className="h-px w-5 bg-line-strong" />
          404
        </p>

        <h1 className="font-display text-display-xl mt-6 text-foreground">
          Lost<span className="text-accent">?</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
          This page doesn&apos;t exist. The work does, though — it&apos;s back on the
          home page.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/#work" className="btn btn-ghost">
            See my work
          </Link>
        </div>

        <p className="mt-12 font-mono text-[12px] text-faint">
          Zolbayar · Full-Stack Developer
        </p>
      </div>
    </main>
  );
}
