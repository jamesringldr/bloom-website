import { P2Header } from "@/components/p2/header";
import { P2Hero } from "@/components/p2/hero";
import { P2Facts } from "@/components/p2/facts";
import { P2Programs } from "@/components/p2/programs";
import { P2Approach } from "@/components/p2/approach";
import { P2Tuition } from "@/components/p2/tuition";
import { P2Team } from "@/components/p2/team";
import { P2Story } from "@/components/p2/story";
import { P2Faq } from "@/components/p2/faq";
import { P2Footer } from "@/components/p2/footer";
import { ReserveForm } from "@/components/reserve-form";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-p2-ink focus:px-5 focus:py-3 focus:font-bold focus:text-p2-cream"
      >
        Skip to content
      </a>
      <P2Header />
      <main id="main">
        <P2Hero />
        <P2Facts />
        <P2Programs />
        <P2Approach />
        <P2Tuition />
        <P2Team />
        <P2Story />
        <P2Faq />
        <div className="relative bg-p2-cream">
          <ReserveForm />
        </div>
      </main>
      <P2Footer />
    </>
  );
}
