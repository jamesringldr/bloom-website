import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Cloud } from "./art";
import { Blossom } from "./blossom";
import { FlowerEdge } from "./flower-edge";

export function P2Footer() {
  return (
    <footer className="relative bg-p2-forest px-4 pb-8 pt-28 text-p2-cream sm:px-6">
      <FlowerEdge id="p2-flowers-footer" color="var(--color-p2-forest)" eye="var(--color-p2-sun)" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Cloud className="p2-drift absolute left-6 top-10 w-32 text-white/10" />
        <Cloud className="p2-drift absolute right-[30%] top-16 w-24 text-white/10 [--d:-9s]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-p2-hand text-3xl font-bold text-p2-sun">Together we’ll Bloom.</p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-p2-cream/85">
              A warm, play-based early learning center for ages {site.ages}. Opening {site.opening}.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-p2-sun">Say hello</h2>
            <ul className="mt-2 space-y-0.5 text-[15px] font-semibold">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center underline decoration-p2-sun decoration-2 underline-offset-4">
                  {site.email}
                </a>
              </li>
              <li>{site.location}</li>
              <li>{site.hours}</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-p2-sun">Explore</h2>
            <ul className="mt-2 space-y-0.5 text-[15px] font-semibold">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-p2-sun">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-32 sm:mt-28">
          <Blossom
            pose="cool"
            className="p2-sway absolute -top-24 right-[6%] z-10 h-28 sm:-top-36 sm:right-0 sm:h-44"
          />
          <div className="aspect-[2.6/1] w-full overflow-hidden sm:aspect-[3.6/1]">
            <Image
              src="/logo-bloom-web.png"
              alt=""
              width={1000}
              height={500}
              className="size-full object-cover object-[50%_42%]"
              aria-hidden
            />
          </div>
        </div>

        <p className="mt-8 text-center text-sm font-semibold text-p2-cream/75">
          © 2027 {site.name}. {site.location}
        </p>
      </div>
    </footer>
  );
}
