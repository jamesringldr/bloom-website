import { site } from "@/lib/content";
import { Reveal } from "./reveal";

const facts = [
  { big: "4 Programs", small: "Separate focused classrooms for each", tone: "bg-p2-tomato text-white", r: "-1.5deg" },
  { big: "6 wks–6 yrs", small: "ages we care for", tone: "bg-p2-orange text-p2-ink", r: "1deg" },
  { big: "Creative Curriculum", small: "+ Handwriting Without Tears", tone: "bg-p2-leaf text-p2-ink", r: "-1deg" },
  { big: "Jan 2027", small: `opening in ${site.location}`, tone: "bg-p2-cobalt text-white", r: "1.5deg" },
];

export function P2Facts() {
  return (
    <section aria-label="At a glance" className="relative bg-p2-cream px-4 pb-6 pt-14 sm:px-6 sm:pt-16">
      <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <li key={f.big}>
            <Reveal delay={i * 70}>
              <div
                className={`p2-tilt flex min-h-40 flex-col justify-between rounded-[2rem] p-6 ${f.tone}`}
                style={{ "--r": f.r } as React.CSSProperties}
              >
                <p className="font-display text-3xl font-extrabold leading-none sm:text-4xl">{f.big}</p>
                <p className="mt-4 text-base font-bold">{f.small}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
