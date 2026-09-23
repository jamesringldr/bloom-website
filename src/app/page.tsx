import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { StatStrip } from "@/components/stat-strip";
import { Programs } from "@/components/programs";
import { Approach } from "@/components/approach";
import { Tuition } from "@/components/tuition";
import { Team } from "@/components/team";
import { StoryCalendar } from "@/components/story-calendar";
import { Faq } from "@/components/faq";
import { ReserveForm } from "@/components/reserve-form";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <StatStrip />
        <Programs />
        <Approach />
        <Tuition />
        <Team />
        <StoryCalendar />
        <Faq />
        <ReserveForm />
      </main>
      <SiteFooter />
    </>
  );
}
