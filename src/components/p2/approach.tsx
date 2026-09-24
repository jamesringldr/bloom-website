import { approach } from "@/lib/content";
import { Blossom } from "./blossom";
import { Reveal } from "./reveal";
import { Cloud } from "./art";
import { CoverStack } from "./cover-stack";
import { FlowerEdge } from "./flower-edge";

const numTone = [
  "bg-p2-tomato text-white",
  "bg-p2-orange text-p2-ink",
  "bg-p2-leaf text-p2-ink",
  "bg-p2-cobalt text-white",
  "bg-p2-pink text-p2-ink",
];
const tilt = ["-1deg", "0.8deg", "-0.6deg", "1deg", "-0.8deg"];

export function P2Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="p2-approach-heading"
      className="relative bg-p2-grape px-4 pb-24 pt-20 text-white sm:px-6 sm:pb-28 sm:pt-28"
    >
      <FlowerEdge id="p2-flowers-approach" color="var(--color-p2-grape)" eye="var(--color-p2-sun)" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Cloud className="p2-drift absolute -left-6 top-24 w-40 text-white/15 sm:w-56" />
        <Cloud className="p2-drift absolute right-4 top-[38%] w-32 text-white/15 [--d:-8s] sm:w-44" />
        <Cloud className="p2-drift absolute bottom-16 left-[30%] w-36 text-white/15 [--d:-14s]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-p2-hand text-2xl font-bold text-p2-sun sm:text-3xl">Our Approach</p>
          <h2
            id="p2-approach-heading"
            className="mt-1 font-p2-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.08]"
          >
            Play with <span className="p2-squiggle [--sq:var(--color-p2-sun)]">purpose.</span> Relationships first.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/95">{approach.lead}</p>
          <Blossom pose="pencil" className="p2-sway mt-8 h-44 lg:h-60 lg:[@media(max-height:959px)]:hidden" />
        </Reveal>

        <CoverStack className="space-y-4 lg:space-y-10">
          {approach.pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              className="p2-cover lg:sticky"
              style={{ top: `calc(8rem + ${i} * 1rem)` }}
            >
              <Reveal delay={i * 60}>
                <div
                  className="p2-tilt flex gap-5 rounded-[2rem] bg-p2-cream p-6 text-p2-ink shadow-[0_-10px_30px_-12px_rgb(31_27_61/0.35)] sm:p-7"
                  style={{ "--r": tilt[i] } as React.CSSProperties}
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-full font-display text-2xl font-extrabold ${numTone[i]}`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold leading-tight">{pillar.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-p2-ink/80">{pillar.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </CoverStack>
      </div>
    </section>
  );
}
