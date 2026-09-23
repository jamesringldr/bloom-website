import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden section-pad pt-8 sm:pt-12"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, rgb(232 244 255) 0%, rgb(255 248 240) 45%, rgb(232 248 238) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-bloom-orange/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-bloom-purple/10 blur-3xl"
      />

      <div className="container-bloom grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up space-y-6 text-center lg:text-left">
          <Image
            src="/logo-bloom-web.png"
            alt="BLOOM"
            width={320}
            height={160}
            className="mx-auto h-20 w-auto sm:h-24 lg:mx-0 lg:h-28"
            priority
          />
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-bloom-blue">
            {site.location} · Opening {site.opening}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-[1.05] text-bloom-ink sm:text-5xl lg:text-6xl"
          >
            Where little hearts grow, play, and{" "}
            <span className="text-bloom-green">bloom</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-bloom-ink/75 lg:mx-0">
            A warm, play-based early learning center for ages {site.ages}.
            Reserve your child’s spot for our February 2027 opening.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Link
              href="#reserve"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full bg-bloom-red px-8 text-base font-bold text-white shadow-lg shadow-bloom-red/25 hover:bg-bloom-red/90",
              )}
            >
              Reserve Enrollment
            </Link>
            <Link
              href="#programs"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 rounded-full border-2 border-bloom-blue/30 bg-white/70 px-8 text-base font-bold text-bloom-blue hover:bg-white",
              )}
            >
              Explore Programs
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:120ms]">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-bloom-sky via-white to-orange-50 shadow-xl shadow-bloom-blue/10 ring-4 ring-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="rounded-full bg-bloom-ink/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-bloom-ink/55">
                Placeholder photo
              </span>
              <p className="max-w-[14rem] text-sm font-semibold text-bloom-ink/60">
                Kids-at-play classroom photo coming soon — easy to swap
              </p>
            </div>
            <Image
              src="/mascot-blossom-web.png"
              alt="Blossom, the Bloom mascot"
              width={280}
              height={270}
              className="absolute bottom-2 right-2 h-36 w-auto animate-float drop-shadow-lg sm:h-44"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
