/**
 * A small burst of paper.
 *
 * The template fires a Lottie animation for this, which costs a second
 * animation library plus a 40KB JSON payload for one click. This is ~80 lines
 * of canvas and no dependency.
 *
 * Two things keep it on-brand rather than party-store. The pieces are flat
 * rectangles with no rounding — they read as torn paper, which is the one
 * metaphor this whole design system runs on. And the colours are pulled from
 * the live CSS custom properties at call time, so a burst in dark mode is
 * warm tan on charcoal, not the same primaries over a different background.
 */

type Burst = {
  /** Viewport coordinates. Defaults to the centre. */
  x?: number;
  y?: number;
  count?: number;
  /** Initial upward kick. Higher throws further. */
  power?: number;
};

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vrot: number;
  color: string;
  life: number;
};

/** Reads a token off <html>, with a fallback for the server-rendered case. */
function token(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function confetti({ x, y, count = 34, power = 13 }: Burst = {}): void {
  if (typeof window === "undefined") return;
  // Anyone who asked for less motion gets none of this.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const colors = [
    token("--accent", "#8a5436"),
    token("--accent-ink", "#71432a"),
    token("--positive", "#4f7a52"),
    token("--foreground", "#211d19"),
    token("--faint", "#a69d91"),
  ];

  const originX = x ?? window.innerWidth / 2;
  const originY = y ?? window.innerHeight / 2;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    // Above the music player and the nav, below the command palette.
    zIndex: "9000",
    pointerEvents: "none",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const pieces: Piece[] = Array.from({ length: count }, () => {
    // Biased upward, so it arcs instead of spraying in a circle.
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
    const speed = power * (0.55 + Math.random() * 0.75);
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 4 + Math.random() * 5,
      h: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.3,
      color: colors[(Math.random() * colors.length) | 0],
      life: 1,
    };
  });

  let raf = 0;
  let last = performance.now();

  const frame = (now: number) => {
    // Normalised to 60fps so the arc is the same on a 120Hz display.
    const dt = Math.min((now - last) / 16.67, 3);
    last = now;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = 0;

    for (const p of pieces) {
      p.vy += 0.42 * dt; // gravity
      p.vx *= 0.995 ** dt; // drag
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      p.life -= 0.009 * dt;

      if (p.life <= 0 || p.y > window.innerHeight + 40) continue;
      alive++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (alive > 0) {
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  };

  raf = requestAnimationFrame(frame);
}
