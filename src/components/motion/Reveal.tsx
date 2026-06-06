"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Reveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Nothing to do — CSS defaults already render everything visible.
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // ─── Hero word-by-word reveal ───────────────────────────────────────
      const words = gsap.utils.toArray<HTMLElement>("[data-hero-word] > span");
      if (words.length) {
        gsap.set(words, { yPercent: 100 });
        tl.to(words, { yPercent: 0, duration: 1.1, stagger: 0.07 }, 0.05);
      }

      // ─── Hero supporting elements ───────────────────────────────────────
      const heroEls = gsap.utils.toArray<HTMLElement>("[data-hero] [data-hero-el]");
      if (heroEls.length) {
        gsap.set(heroEls, { opacity: 0, y: 14 });
        tl.to(heroEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.25);
      }

      // ─── Hero background blooms ─────────────────────────────────────────
      const bg = document.querySelector<HTMLElement>("[data-hero-bg]");
      if (bg) {
        gsap.set(bg, { scale: 1.1, opacity: 0 });
        tl.to(bg, { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }, 0);
      }

      // ─── Scroll reveals ─────────────────────────────────────────────────
      // We set the hidden state imperatively (not in CSS) so the content stays
      // visible if this script fails to load or run.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (reveals.length) {
        gsap.set(reveals, { opacity: 0, y: 14 });
        reveals.forEach((el) => {
          const parent = el.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll<HTMLElement>(":scope > [data-reveal]"))
            : [];
          const idx = siblings.indexOf(el);
          const delay = siblings.length > 1 && idx >= 0 ? Math.min(idx * 0.06, 0.4) : 0;

          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "expo.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

        // Safety net: refresh ScrollTrigger once on next frame in case the
        // initial layout shifted (fonts, images settling).
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
