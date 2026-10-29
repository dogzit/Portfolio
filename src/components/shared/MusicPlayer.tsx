"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const TRACK = "/audio/infrunami.mp3";
const TRACK_LABEL = "Infrunami";
/** Change this if the credit is wrong — it only ever renders as a subtitle. */
const TRACK_ARTIST = "Yeat";
const STORAGE_KEY = "music";
/** Quiet by design — this sits under the page, it isn't the page. */
const TARGET_VOLUME = 0.32;
const FADE_MS = 900;

/**
 * The ambient track. Off until asked for: browsers block audio that starts on
 * its own, and so should a portfolio. The choice is remembered, so a returning
 * visitor who wants it gets it back on their first click — the earliest moment
 * the browser will allow sound.
 *
 * The 4MB file is only fetched once someone actually turns it on (`preload`
 * stays "none" until then), so the default visit pays nothing for it.
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const settleRef = useRef<number | null>(null);
  /** The volume the element *should* be at, whatever the ramp is doing. */
  const targetRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  /** Set once we know the browser refused, so the label can say so. */
  const [blocked, setBlocked] = useState(false);

  /**
   * Ramps volume instead of cutting it, then optionally pauses at zero.
   *
   * The ramp is a nicety; `targetRef` is the truth. A timer lands the volume
   * on target no matter what happens to the animation frame in between —
   * React re-runs effects on mount in development, and an interrupted ramp
   * used to leave the track playing at volume zero.
   */
  const fadeTo = useCallback((to: number, thenPause = false) => {
    const el = audioRef.current;
    if (!el) return;

    targetRef.current = to;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    if (settleRef.current !== null) clearTimeout(settleRef.current);

    const from = el.volume;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1);
      el.volume = from + (to - from) * t;
      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }
      frameRef.current = null;
      if (thenPause) el.pause();
    };

    frameRef.current = requestAnimationFrame(step);

    settleRef.current = window.setTimeout(() => {
      settleRef.current = null;
      const node = audioRef.current;
      if (!node) return;
      node.volume = targetRef.current;
      if (thenPause) node.pause();
    }, FADE_MS + 80);
  }, []);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;

    el.preload = "auto";
    el.volume = 0;
    try {
      await el.play();
    } catch {
      return false;
    }
    fadeTo(TARGET_VOLUME);
    return true;
  }, [fadeTo]);

  const toggle = useCallback(async () => {
    if (playing) {
      setPlaying(false);
      fadeTo(0, true);
      try {
        localStorage.setItem(STORAGE_KEY, "off");
      } catch {}
      return;
    }

    const ok = await play();
    setPlaying(ok);
    setBlocked(!ok);
    try {
      localStorage.setItem(STORAGE_KEY, ok ? "on" : "off");
    } catch {}
  }, [playing, play, fadeTo]);

  /* Resume for someone who left it on last time. The first attempt usually
     fails without a gesture, so we wait for one and try again — once. */
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (saved !== "on") return;

    const attempt = async () => {
      const ok = await play();
      if (ok) setPlaying(true);
      return ok;
    };

    const onGesture = () => {
      void attempt();
      detach();
    };
    const detach = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };

    void attempt().then((ok) => {
      if (ok) return;
      window.addEventListener("pointerdown", onGesture, { once: true });
      window.addEventListener("keydown", onGesture, { once: true });
    });

    /* Only the listeners are torn down. The ramp deliberately isn't: the
       audio element outlives a development remount, and cancelling its fade
       here is what left it silent. */
    return detach;
  }, [play]);

  const label = playing
    ? `Pause ${TRACK_LABEL}`
    : blocked
      ? `Play ${TRACK_LABEL} — your browser blocked it, tap again`
      : `Play ${TRACK_LABEL}`;

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK}
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        className="now-playing"
        data-playing={playing}
        aria-pressed={playing}
        aria-label={label}
        title={label}
      >
        <span className="np-disc" data-icon={playing ? "pause" : "play"}>
          {playing ? (
            <Pause size={15} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={15} fill="currentColor" strokeWidth={0} />
          )}
        </span>

        <span className="np-meta">
          <span className="np-title">{TRACK_LABEL}</span>
          <span className="np-sub">
            {playing && (
              <span aria-hidden className="np-bars">
                <i />
                <i />
                <i />
              </span>
            )}
            {TRACK_ARTIST} · {playing ? "On repeat" : "Tap to play"}
          </span>
        </span>
      </button>
    </>
  );
}
