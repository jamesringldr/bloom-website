import { tuition } from "@/lib/content";
import { Reveal } from "./reveal";

const cols = [
  { key: "five", label: "5-day", tone: "bg-p2-tomato text-white" },
  { key: "four", label: "4-day", tone: "bg-p2-cobalt text-white" },
  { key: "three", label: "3-day", tone: "bg-p2-leaf text-p2-ink" },
  { key: "two", label: "2-day", tone: "bg-p2-grape text-white" },
] as const;

export function P2Tuition() {
  return (
    <section
      id="tuition"
      aria-labelledby="p2-tuition-heading"
      className="relative bg-p2-sun px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-28"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="font-p2-hand text-2xl font-bold text-p2-tomato sm:text-3xl">Tuition</p>
          <h2
            id="p2-tuition-heading"
            className="mt-1 font-p2-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.08]"
          >
            Weekly rates by program &amp; <span className="p2-squiggle [--sq:var(--color-p2-tomato)]">days</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-p2-ink/85">
            Choose the schedule that fits your family. Enrollment and supply fees are billed yearly.
          </p>
          <ul className="mt-6 space-y-2">
            {tuition.fees.map((fee) => (
              <li key={fee} className="w-fit rounded-full bg-p2-ink px-5 py-2 text-[15px] font-bold text-p2-cream">
                {fee}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-md text-sm font-semibold text-p2-ink/75">{tuition.note}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="p2-tilt overflow-x-auto rounded-[2.25rem] bg-p2-cream p-4 sm:p-6" style={{ "--r": "1deg" } as React.CSSProperties}>
            <table className="w-full min-w-[19rem] border-separate border-spacing-x-1.5 border-spacing-y-2 text-center">
              <caption className="sr-only">Weekly tuition by program and days per week</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[26%] text-left font-p2-hand text-xl font-bold text-p2-ink/70">
                    Program
                  </th>
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className={`rounded-full px-1 py-2 text-xs font-extrabold sm:text-sm ${c.tone}`}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tuition.rows.map((row) => (
                  <tr key={row.program}>
                    <th scope="row" className="py-3 text-left font-display text-lg font-extrabold sm:text-2xl">
                      {row.program}
                    </th>
                    {cols.map((c) => (
                      <td key={c.key} className="rounded-2xl bg-white py-3 font-display text-xl font-extrabold sm:text-3xl">
                        ${row.rates[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
