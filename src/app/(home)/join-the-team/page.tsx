import type { Metadata } from "next";
import { JoinForm } from "@/components/join-form";
import { BurstDoodle, FlowerDoodle, SunDoodle, SwirlDoodle } from "@/components/p2/art";
import { Blossom } from "@/components/p2/blossom";
import { P2Footer } from "@/components/p2/footer";
import { P2Header } from "@/components/p2/header";

export const metadata: Metadata = {
  title: "Join The Team | Bloom Early Learning Center",
  description:
    "Join the team at Bloom Early Learning Center in Lenexa, KS. We’re looking for caring, dependable, and enthusiastic educators.",
};

export default function JoinTheTeamPage() {
  return (
    <div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-p2-ink focus:px-5 focus:py-3 focus:font-bold focus:text-p2-cream"
      >
        Skip to content
      </a>
      <P2Header />
      <main id="main" className="relative isolate overflow-hidden bg-p2-cream px-4 pb-32 pt-32 sm:px-6 sm:pt-36">
        {/* ambient doodles */}
        <SunDoodle className="p2-spin absolute left-[3%] top-28 hidden size-16 text-p2-sun sm:block lg:left-[6%] lg:size-20" />
        <FlowerDoodle className="p2-float absolute right-3 top-[5.25rem] size-9 text-p2-forest sm:right-[4%] sm:top-28 sm:size-16 lg:right-[8%] lg:size-20" />
        <BurstDoodle className="p2-float absolute left-[7%] top-[64rem] hidden size-14 text-p2-pink [--d:1.2s] xl:block" />
        <SwirlDoodle className="p2-float absolute right-[6%] top-[62rem] hidden size-16 text-p2-cobalt [--d:2s] xl:block" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="p2-rise font-p2-display text-[clamp(2.7rem,7.4vw,4.8rem)] font-extrabold leading-[1.02] text-p2-ink">
            Join The <span className="p2-squiggle [--sq:var(--color-p2-tomato)]">Team</span>
          </h1>
          <p className="p2-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-p2-ink/80 [--d:200ms] sm:text-xl">
            Bloom Early Education Center is a place where children are encouraged to learn, play,
            grow, and flourish in an environment where they feel safe, loved, and known. We’re
            looking for caring, dependable, and enthusiastic educators who genuinely love working
            with children, value strong relationships with families and teammates, and want to help
            us build something special from the ground up.
          </p>
        </div>

        <div className="relative mx-auto mt-24 max-w-3xl sm:mt-28">
          <Blossom
            pose="lounge"
            className="absolute -top-[5.75rem] right-6 z-10 h-24 sm:right-10 sm:-top-[6.75rem] sm:h-28"
          />
          <Blossom
            pose="pencil"
            className="p2-sway absolute -left-44 top-24 hidden h-56 xl:block"
          />
          <Blossom
            pose="party"
            className="p2-float absolute -right-44 bottom-32 hidden h-52 xl:block"
          />
          <JoinForm />
        </div>
      </main>
      <P2Footer />
    </div>
  );
}
