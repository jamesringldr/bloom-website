import Image from "next/image";
import { cn } from "@/lib/utils";

const poses = {
  wave: { src: "/blossom/pose-1.webp", w: 560, h: 720 },
  lounge: { src: "/blossom/pose-2.webp", w: 720, h: 581 },
  walk: { src: "/blossom/pose-3.webp", w: 522, h: 720 },
  peek: { src: "/blossom/pose-4.webp", w: 521, h: 720 },
  pencil: { src: "/blossom/pose-5.webp", w: 522, h: 720 },
  cool: { src: "/blossom/pose-6.webp", w: 620, h: 720 },
  reading: { src: "/blossom/pose-7.webp", w: 535, h: 720 },
  party: { src: "/blossom/pose-8.webp", w: 692, h: 720 },
  cheer: { src: "/blossom/pose-9.webp", w: 608, h: 720 },
} as const;

export type BlossomPose = keyof typeof poses;

/** Decorative Blossom pose. Size it with a height class (e.g. `h-40`). */
export function Blossom({ pose, className }: { pose: BlossomPose; className?: string }) {
  const { src, w, h } = poses[pose];
  return (
    <Image
      src={src}
      alt=""
      width={w}
      height={h}
      sizes="(min-width: 640px) 320px, 200px"
      className={cn("pointer-events-none w-auto select-none", className)}
    />
  );
}
