"use client";

import { useEffect, useRef } from "react";

/** A meadow of flowers that sprouts up out of the top edge of a section. */
export function FlowerEdge({
  id,
  color,
  eye,
}: {
  id: string;
  color: string;
  eye: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.grow = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.grow = "shown";
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const flower = (scale: number) => (
    <g transform={`scale(${scale})`} fill={color}>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-26" rx="15" ry="22" transform={`rotate(${i * 60})`} />
      ))}
      <circle r="11" fill={eye} />
    </g>
  );

  return (
    <svg
      ref={ref}
      aria-hidden
      className="p2-grow pointer-events-none absolute inset-x-0 h-[110px] w-full"
      style={{ top: "calc(-110px + 2px)" }}
    >
      <defs>
        <pattern id={id} width="300" height="110" patternUnits="userSpaceOnUse">
          <g transform="translate(80 100) rotate(-8)">{flower(1)}</g>
          <g transform="translate(218 106) rotate(14)">{flower(0.62)}</g>
          <circle cx="24" cy="106" r="10" fill={color} />
          <g fill={color}>
            <ellipse cx="0" cy="-16" rx="7" ry="18" transform="translate(150 112) rotate(28)" />
            <ellipse cx="0" cy="-14" rx="6" ry="16" transform="translate(286 112) rotate(-24)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
