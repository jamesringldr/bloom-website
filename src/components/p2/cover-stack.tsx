"use client";

import { useEffect, useRef } from "react";

/**
 * A sticky-stacked list whose covered cards recede. Each <li> gets a `--cover`
 * value (0 → 1) as the next card slides over it; `.p2-cover` turns that into a
 * slight shrink + dim. Only runs where the cards actually stick (lg and up).
 */
export function CoverStack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = ref.current;
    if (!ol) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const items = Array.from(ol.children) as HTMLElement[];
    let raf = 0;

    const update = () => {
      raf = 0;
      items.forEach((li, i) => {
        const next = items[i + 1];
        if (!next || !mq.matches) {
          li.style.removeProperty("--cover");
          return;
        }
        // distance the next card still has to travel to reach its resting (stuck) spot
        const rest = parseFloat(getComputedStyle(next).top) || 0;
        const distance = next.getBoundingClientRect().top - rest;
        const cover = Math.min(1, Math.max(0, 1 - distance / 260));
        li.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(ol);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={ref} className={className}>
      {children}
    </ol>
  );
}
