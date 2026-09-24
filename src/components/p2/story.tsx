import { calendar2027, story } from "@/lib/content";
import { FlowerEdge } from "./flower-edge";
import { Blossom } from "./blossom";
import { Reveal } from "./reveal";

export function P2Story() {
  return (
    <section
      id="story"
      aria-labelledby="p2-story-heading"
      className="relative bg-p2-cobalt px-4 pb-24 pt-20 text-white sm:px-6 sm:pb-28 sm:pt-28"
    >
      <FlowerEdge id="p2-flowers-story" color="var(--color-p2-cobalt)" eye="var(--color-p2-sun)" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <Reveal>
          <p className="font-p2-hand text-2xl font-bold text-p2-sun sm:text-3xl">Our Story</p>
          <h2
            id="p2-story-heading"
            className="mt-1 font-p2-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.08]"
          >
            Built by educators who believe{" "}
            <span className="p2-squiggle [--sq:var(--color-p2-sun)]">community</span> comes first
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-[17px] leading-relaxed">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="p2-tilt relative mt-24 rounded-[2.5rem] bg-p2-cream p-6 text-p2-ink [--r:0.5deg] sm:p-9 sm:[--r:1.6deg] lg:mt-0"
          >
            <Blossom pose="reading" className="absolute -top-[6.6rem] right-8 h-28 lg:-top-[7.4rem] lg:h-32" />
            <h3 className="font-display text-4xl font-extrabold">2027 Calendar</h3>
            <p className="mt-1 text-[15px] font-semibold text-p2-ink/75">
              Special days and planned closures for our opening year.
            </p>

            <h4 className="mt-6 font-p2-hand text-2xl font-bold text-p2-cobalt">Special events</h4>
            <ul className="p2-stagger mt-2 space-y-2">
              {calendar2027.events.map((event, i) => (
                <li key={event.name} className="flex flex-col items-start gap-1 min-[360px]:flex-row min-[360px]:items-center min-[360px]:gap-3" style={{ "--i": i } as React.CSSProperties}>
                  <span className="w-36 shrink-0 sm:w-40 whitespace-nowrap rounded-full bg-p2-sun px-3 py-1.5 text-center text-sm font-extrabold">
                    {event.date}
                  </span>
                  <span className="font-bold">{event.name}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 font-p2-hand text-2xl font-bold text-p2-tomato">Closures</h4>
            <ul className="p2-stagger mt-2 space-y-2">
              {calendar2027.closures.map((event, i) => (
                <li key={event.name} className="flex flex-col items-start gap-1 min-[360px]:flex-row min-[360px]:items-center min-[360px]:gap-3" style={{ "--i": i + 6 } as React.CSSProperties}>
                  <span className="w-36 shrink-0 sm:w-40 whitespace-nowrap rounded-full bg-p2-blush px-3 py-1.5 text-center text-sm font-extrabold">
                    {event.date}
                  </span>
                  <span className="font-bold">{event.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
