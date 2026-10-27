"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Ulaanbaatar",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/**
 * Ulaanbaatar time, ticking every second. Renders a fixed-width placeholder
 * on the server so the status bar doesn't reflow when it hydrates.
 */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tnum">
      {time ?? "--:--:--"}
      <span aria-hidden className="caret ml-1 inline-block">
        ▊
      </span>
    </span>
  );
}
