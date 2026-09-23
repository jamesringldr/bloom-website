import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
import { BurstDoodle, Cloud, FlowerDoodle, HeroScene, SunDoodle, SwirlDoodle } from "./art";

const bloomLetters = [
  "text-p2-tomato",
  "text-[#c85f00]",
  "text-[#178048]",
  "text-p2-cobalt",
  "text-p2-grape",
];

const words = ["Where", "little", "hearts", "grow,", "play,", "and"];

export function P2Hero() {
  return (
    <section id="top" aria-labelledby="p2-hero-heading" className="relative isolate bg-p2-cream">
      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-32 text-center sm:pt-36">
        {/* ambient doodles */}
        <SunDoodle className="p2-spin absolute left-[3%] top-28 hidden size-16 text-p2-sun sm:block lg:left-[6%] lg:size-20" />
        <FlowerDoodle className="p2-float absolute right-3 top-[5.25rem] size-9 text-p2-forest sm:right-[4%] sm:top-28 sm:size-16 lg:right-[8%] lg:size-20" />
        <BurstDoodle className="p2-float absolute bottom-10 left-[5%] hidden size-14 text-p2-pink [--d:1.2s] sm:block lg:left-[12%]" />
        <SwirlDoodle className="p2-float absolute bottom-16 right-[5%] hidden size-16 text-p2-cobalt [--d:2s] sm:block lg:right-[11%]" />

        <p className="p2-rise font-p2-hand text-2xl font-bold text-p2-tomato sm:text-3xl">
          Opening {site.opening} · {site.location}
        </p>

        <h1
          id="p2-hero-heading"
          className="mx-auto mt-2 max-w-4xl font-p2-display text-[clamp(2.7rem,7.4vw,5.4rem)] font-extrabold leading-[0.98] text-p2-ink"
        >
          {words.map((w, i) => (
            <span key={w} className="p2-word mr-[0.22em]" style={{ "--i": i } as React.CSSProperties}>
              {w}
            </span>
          ))}
          <span className="inline-block whitespace-nowrap">
            {"bloom".split("").map((c, i) => (
              <span
                key={i}
                className={`p2-word ${bloomLetters[i]}`}
                style={{ "--i": words.length + i } as React.CSSProperties}
              >
                {c}
              </span>
            ))}
          </span>
        </h1>

        <p className="p2-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-p2-ink/80 [--d:500ms] sm:text-xl">
          A warm, play-based early learning center for ages {site.ages}. Reserve
          your child’s spot for our January 2027 opening.
        </p>

        <div className="p2-rise mt-8 flex flex-col items-center justify-center gap-3 [--d:650ms] sm:flex-row">
          <Link
            href="#reserve"
            className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-p2-tomato px-8 text-lg font-extrabold text-white shadow-[0_6px_0_0_#8f1f04] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_#8f1f04] sm:w-auto"
          >
            Reserve Enrollment
            <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#programs"
            className="inline-flex h-14 w-full items-center justify-center rounded-full border-2 border-p2-ink px-8 text-lg font-extrabold text-p2-ink transition-colors duration-200 hover:bg-p2-ink hover:text-p2-cream sm:w-auto"
          >
            Explore Programs
          </Link>
        </div>
      </div>

      {/* scalloped photo band (illustrated placeholder — swap in a real photo) */}
      <div className="relative">
        <div className="relative h-[21rem] overflow-hidden sm:h-[26rem] lg:h-[30rem]">
          <div className="p2-scallop absolute inset-x-0 top-0 z-10" aria-hidden />
          <HeroScene className="absolute inset-0 h-full w-full" />
          <Cloud className="p2-drift absolute left-[6%] top-10 w-28 text-white sm:w-40" />
          <Cloud className="p2-drift absolute right-[8%] top-20 w-24 text-p2-cream [--d:-6s] sm:w-32" />
          <Cloud className="p2-drift absolute left-[38%] top-4 hidden w-20 text-white/90 [--d:-11s] sm:block" />
          <div className="p2-rise absolute bottom-0 left-1/2 h-[92%] -translate-x-1/2 [--d:900ms]">
            <Image
              src="/mascot-blossom-web.png"
              alt="Blossom, the Bloom mascot, waving hello"
              width={600}
              height={577}
              priority
              className="p2-sway h-full w-auto"
            />
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-p2-ink">
            Placeholder art — real classroom photo coming
          </span>
        </div>
      </div>
    </section>
  );
}
