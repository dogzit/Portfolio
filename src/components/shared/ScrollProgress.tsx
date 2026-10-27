/**
 * Reading-progress hairline under the navbar.
 *
 * No JavaScript: it's driven by a CSS scroll-driven animation
 * (`animation-timeline: scroll()`), so it costs nothing on the main thread and
 * ships no client component. Browsers without support get `scaleX(0)` — the
 * bar is simply invisible rather than broken.
 */
export function ScrollProgress() {
  return <div aria-hidden className="scroll-progress" />;
}
