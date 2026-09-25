import Image from "next/image";
import { team } from "@/lib/content";
import { Reveal } from "./reveal";

const tone = [
  { card: "bg-p2-blush", r: "-1.2deg" },
  { card: "bg-p2-mint", r: "1.2deg" },
];

export function P2Team() {
  return (
    <section
      id="team"
      aria-labelledby="p2-team-heading"
      className="relative bg-p2-cream px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-p2-hand text-2xl font-bold text-p2-cobalt sm:text-3xl">Our Team</p>
          <h2
            id="p2-team-heading"
            className="mt-1 font-p2-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.08]"
          >
            Meet the <span className="p2-squiggle [--sq:var(--color-p2-cobalt)]">directors</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-p2-ink/80">
            Passionate educators building a place where every child is known and loved.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {team.map((person, i) => (
            <Reveal key={person.name} delay={i * 90}>
              <article
                className={`p2-tilt h-full rounded-[2.5rem] p-7 sm:p-9 ${tone[i].card}`}
                style={{ "--r": tone[i].r } as React.CSSProperties}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <Image
                    src={person.photo}
                    alt={`${person.name}, ${person.role}`}
                    width={720}
                    height={720}
                    sizes="144px"
                    className="size-36 shrink-0"
                  />
                  <div>
                    <h3 className="font-display text-4xl font-extrabold">{person.name}</h3>
                    <p className="mt-1 inline-block rounded-full bg-p2-ink px-4 py-1 text-sm font-extrabold text-p2-cream">
                      {person.role}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-[17px] leading-relaxed">{person.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
