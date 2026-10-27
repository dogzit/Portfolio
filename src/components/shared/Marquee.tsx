/**
 * A ticker strip that runs edge to edge between sections.
 *
 * The list is rendered twice and the track slides exactly -50%, so the loop is
 * seamless with no JavaScript and no measuring. The duplicate is hidden from
 * assistive tech so the content is only announced once.
 */
export function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`} data-reverse={reverse || undefined}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="marquee-list"
            aria-hidden={copy === 1 || undefined}
          >
            {items.map((item) => (
              <li key={item} className="marquee-item">
                {item}
                <span aria-hidden className="marquee-sep">
                  ▪
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
