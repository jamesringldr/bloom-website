"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programs } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Blossom } from "./blossom";
import { Reveal } from "./reveal";
import { SeedArt, SproutArt, SunflowerArt, WildflowerArt } from "./art";

const look = {
  seeds: { bg: "bg-p2-tomato", text: "text-white", btn: "bg-p2-sun text-p2-ink", Art: SeedArt },
  sprouts: { bg: "bg-p2-orange", text: "text-p2-ink", btn: "bg-p2-ink text-p2-cream", Art: SproutArt },
  sunflowers: { bg: "bg-p2-leaf", text: "text-p2-ink", btn: "bg-p2-grape text-white", Art: SunflowerArt },
  wildflowers: { bg: "bg-p2-cobalt", text: "text-white", btn: "bg-p2-pink text-p2-ink", Art: WildflowerArt },
} as const;

const badge = {
  seeds: { group: "Infants", range: "6 wks–1 yr" },
  sprouts: { group: "Toddlers", range: "6 mos–2.5 yrs" },
  sunflowers: { group: "Pre-School", range: "2.5–4 yrs" },
  wildflowers: { group: "Pre-K", range: "4–6 yrs" },
} as const;

function AgeBadge({ id, className }: { id: keyof typeof badge; className?: string }) {
  const { group, range } = badge[id];
  return (
    <span
      className={cn(
        "flex-col rounded-2xl bg-white px-3 py-1.5 text-center leading-tight text-p2-ink",
        className,
      )}
    >
      <span className="text-[13px] font-extrabold">{group}</span>
      <span className="text-xs font-bold">{range}</span>
    </span>
  );
}

export function P2Programs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = look[programs[active].id];

  function onKeyDown(e: React.KeyboardEvent) {
    const last = programs.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="programs"
      aria-labelledby="p2-programs-heading"
      className="relative bg-p2-cream-deep px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-p2-hand text-2xl font-bold text-p2-grape sm:text-3xl">Programs</p>
          <h2
            id="p2-programs-heading"
            className="mt-1 font-p2-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.08]"
          >
            Four classrooms, one{" "}
            <span className="p2-squiggle [--sq:var(--color-p2-tomato)]">growing</span> community
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-p2-ink/80">
            From first smiles to kindergarten readiness—each room meets children where they are.
            Pick a classroom to see what a day looks like.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <div
            role="tablist"
            aria-label="Classrooms"
            onKeyDown={onKeyDown}
            className="flex items-end gap-1.5 sm:gap-3"
          >
            {programs.map((program, i) => {
              const { bg, text, Art } = look[program.id];
              const selected = i === active;
              return (
                <button
                  key={program.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`p2-tab-${program.id}`}
                  aria-selected={selected}
                  aria-controls={`p2-tabpanel-${program.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex min-w-0 flex-col items-center gap-1.5 px-1.5 text-center transition-[flex-grow,margin,padding,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] sm:gap-2 sm:px-4 lg:flex-row lg:gap-4 lg:text-left",
                    bg,
                    text,
                    selected
                      ? "relative z-10 -mb-[2px] flex-[1.5] rounded-t-[1.5rem] pb-3 pt-3 sm:pb-5 sm:pt-5 lg:pt-6"
                      : "mb-2 flex-1 rounded-[1.25rem] py-3 hover:-translate-y-1 sm:mb-3 sm:rounded-[1.5rem] sm:py-4",
                  )}
                >
                  <span
                    className={cn(
                      "p2-blob block shrink-0 bg-p2-cream p-1.5 transition-[width,height] duration-300 sm:p-2",
                      selected ? "size-12 sm:size-20 lg:size-24" : "size-11 sm:size-16 lg:size-16",
                    )}
                  >
                    <Art className="size-full" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-display font-extrabold leading-none",
                        selected ? "text-[13px] sm:text-2xl lg:text-4xl" : "text-[12px] sm:text-xl lg:text-2xl",
                      )}
                    >
                      {program.name}
                    </span>
                    <AgeBadge id={program.id} className="mt-2 hidden sm:inline-flex" />
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={cn(
              "rounded-[1.75rem] p-5 transition-colors duration-300 sm:rounded-[2rem] sm:p-8 lg:p-10",
              current.bg,
              current.text,
              active === 0 && "rounded-tl-none sm:rounded-tl-none",
              active === programs.length - 1 && "rounded-tr-none sm:rounded-tr-none",
            )}
          >
            {programs.map((program, i) => {
              const selected = i === active;
              return (
                <div
                  key={program.id}
                  role="tabpanel"
                  id={`p2-tabpanel-${program.id}`}
                  aria-labelledby={`p2-tab-${program.id}`}
                  hidden={!selected}
                  className="grid gap-6 md:grid-cols-[1.35fr_1fr] md:gap-x-10"
                >
                  <div className="p2-swap">
                    <AgeBadge id={program.id} className="mb-4 inline-flex sm:hidden" />
                    <h3 className="font-p2-hand text-3xl font-bold leading-none">About</h3>
                    <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed">{program.about}</p>
                  </div>
                  <div className="p2-swap [--d:80ms]">
                    <h3 className="font-p2-hand text-3xl font-bold leading-none">Goals</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {program.goals.map((goal) => (
                        <li key={goal} className="rounded-full bg-white px-3.5 py-2 text-[13px] font-bold text-p2-ink">
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end md:col-span-2">
                    <a
                      href="#reserve"
                      className={cn(
                        "group/res inline-flex h-12 items-center gap-2 rounded-full px-6 text-base font-extrabold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px",
                        look[program.id].btn,
                      )}
                    >
                      Reserve a Spot!
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/res:translate-x-0.5 group-hover/res:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* CTA banner */}
        <Reveal className="mt-16 sm:mt-24">
          <div className="relative flex flex-col items-start gap-6 rounded-[2.5rem] bg-p2-tomato p-8 pr-8 text-white sm:p-12 sm:pr-64">
            <h3 className="max-w-lg font-display text-4xl font-extrabold leading-[1.02] sm:text-5xl">
              Found your classroom? Save your spot.
            </h3>
            <p className="max-w-md text-lg font-semibold">
              Reservations are open for our January 2027 opening. No payment needed to reserve.
            </p>
            <Link
              href="#reserve"
              className="group/cta inline-flex h-14 items-center gap-2 rounded-full bg-p2-sun px-8 text-lg font-extrabold text-p2-ink transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px"
            >
              Reserve Enrollment
              <ArrowUpRight className="size-5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
            <Blossom
              pose="cheer"
              className="p2-float mx-auto h-52 self-center sm:absolute sm:-top-12 sm:right-10 sm:mx-0 sm:h-72 sm:self-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
