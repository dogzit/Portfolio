import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  /** Any CSS colour. Defaults to the clay accent at low opacity. */
  fill?: string;
};

/**
 * A single wide, heavily blurred ellipse raking across the top of a section —
 * ported from the Aceternity spotlight, then pulled back hard.
 *
 * The original is a white beam on black at 21% opacity, which on paper would
 * read as a smudge. Here it's the clay accent at a few percent, so it lands as
 * a warm wash in the corner rather than a stage light. It animates in once and
 * stays; `prefers-reduced-motion` skips straight to the resting state.
 */
export function Spotlight({ className, fill }: SpotlightProps) {
  return (
    <svg
      aria-hidden
      className={cn("spotlight-beam pointer-events-none absolute", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spotlight-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill ?? "var(--accent)"}
          fillOpacity="0.16"
        />
      </g>
      <defs>
        <filter
          id="spotlight-blur"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="151" result="blur" />
        </filter>
      </defs>
    </svg>
  );
}
