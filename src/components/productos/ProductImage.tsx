"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ProductImage.module.scss";

interface Props {
  imagenes: string[];
  alt: string;
  /** Two-letter monogram shown on the branded placeholder. */
  monogram?: string;
  intervalMs?: number;
}

const FALLBACK_DELAY = 3800;

export function ProductImage({ imagenes, alt, monogram = "dm", intervalMs = FALLBACK_DELAY }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);

  const hasMultiple = imagenes.length > 1;

  const markLoaded = useCallback((i: number) => {
    setLoaded((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  const markFailed = useCallback((i: number) => {
    setFailed((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  // Closes the SSR/hydration race: if an <img> already finished loading before
  // React attached its onLoad/onError handlers (cached or very fast responses),
  // the events never fire — so we settle its state from `complete` on mount.
  const settleFromComplete = useCallback((i: number, node: HTMLImageElement | null) => {
    if (!node || !node.complete) return;
    if (node.naturalWidth > 0) markLoaded(i);
    else markFailed(i);
  }, [markLoaded, markFailed]);

  useEffect(() => {
    if (!hasMultiple) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const node = containerRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.2 },
    );
    io.observe(node);

    const id = window.setInterval(() => {
      if (paused || !visibleRef.current) return;
      setActive((i) => {
        // Skip over failed images
        for (let step = 1; step <= imagenes.length; step++) {
          const next = (i + step) % imagenes.length;
          if (!failed.has(next)) return next;
        }
        return i;
      });
    }, intervalMs);

    return () => { io.disconnect(); window.clearInterval(id); };
  }, [hasMultiple, imagenes.length, intervalMs, paused, failed]);

  const activeShowable = loaded.has(active) && !failed.has(active);

  return (
    <div
      ref={containerRef}
      className={styles.frame}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Placeholder is always rendered behind — never shows a broken-image icon. */}
      <BrandedPlaceholder monogram={monogram} />

      {imagenes.map((src, i) => {
        if (failed.has(i)) return null;
        const isActive = i === active && activeShowable;
        return (
          <div
            key={src}
            className={styles.layer}
            data-active={isActive ? "true" : "false"}
            aria-hidden={isActive ? undefined : true}
          >
            <img
              ref={(node) => settleFromComplete(i, node)}
              src={src}
              alt={isActive ? alt : ""}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => markLoaded(i)}
              onError={() => markFailed(i)}
            />
          </div>
        );
      })}

      {hasMultiple && (
        <div className={styles.dots} aria-hidden="true">
          {imagenes.map((_, i) => {
            const shown = !failed.has(i);
            if (!shown) return null;
            return (
              <span key={i} className={styles.dot} data-active={i === active ? "true" : "false"} />
            );
          })}
        </div>
      )}
    </div>
  );
}

function BrandedPlaceholder({ monogram }: { monogram: string }) {
  return (
    <div className={styles.placeholder} aria-hidden="true">
      <span className={styles.monogram}>{monogram}</span>
      <span className={styles.placeholderLabel}>Próximamente</span>
    </div>
  );
}
