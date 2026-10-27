import { Reveal } from "@/components/shared/Reveal";

type Props = {
  /** Two-digit section number, e.g. "01". */
  index: string;
  label: string;
  title: React.ReactNode;
  /** Short note that sits opposite the title on wide screens. */
  note?: string;
};

/** The one header shape every section uses, so the page keeps a steady rhythm. */
export function SectionHeader({ index, label, title, note }: Props) {
  return (
    <Reveal className="border-b border-line pb-6 sm:pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">
            <span className="tnum text-faint">{index}</span>
            <span aria-hidden className="h-px w-5 bg-line-strong" />
            {label}
          </p>
          <h2 className="font-display text-display mt-4 text-foreground">{title}</h2>
        </div>
        {note && (
          <p className="measure-sm text-sm leading-relaxed text-muted sm:text-right">
            {note}
          </p>
        )}
      </div>
    </Reveal>
  );
}
