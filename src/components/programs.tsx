import { programs } from "@/lib/content";
import { cn } from "@/lib/utils";

const accentStyles = {
  red: {
    bar: "bg-bloom-red",
    badge: "bg-bloom-red/10 text-bloom-red",
    ring: "ring-bloom-red/20",
  },
  orange: {
    bar: "bg-bloom-orange",
    badge: "bg-bloom-orange/15 text-[#b36e00]",
    ring: "ring-bloom-orange/25",
  },
  green: {
    bar: "bg-bloom-green",
    badge: "bg-bloom-green/15 text-[#1f7a36]",
    ring: "ring-bloom-green/25",
  },
  blue: {
    bar: "bg-bloom-blue",
    badge: "bg-bloom-blue/10 text-bloom-blue",
    ring: "ring-bloom-blue/20",
  },
} as const;

export function Programs() {
  return (
    <section
      id="programs"
      className="section-pad accent-red"
      aria-labelledby="programs-heading"
    >
      <div className="container-bloom">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-bloom-red">
            Programs
          </p>
          <h2
            id="programs-heading"
            className="font-display text-3xl font-semibold text-bloom-ink sm:text-4xl"
          >
            Four classrooms, one growing community
          </h2>
          <p className="mt-3 text-bloom-ink/70">
            From first smiles to kindergarten readiness—each room meets children
            where they are.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => {
            const styles = accentStyles[program.accent];
            return (
              <article
                key={program.id}
                className={cn(
                  "overflow-hidden rounded-3xl bg-white shadow-md shadow-bloom-ink/5 ring-1",
                  styles.ring,
                )}
              >
                <div className={cn("h-2 w-full", styles.bar)} aria-hidden />
                <div className="space-y-4 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-semibold text-bloom-ink">
                      {program.name}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold",
                        styles.badge,
                      )}
                    >
                      {program.age}
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-bloom-ink/50">
                      About
                    </h4>
                    <p className="text-[15px] leading-relaxed text-bloom-ink/80">
                      {program.about}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-bloom-ink/50">
                      Goals
                    </h4>
                    <ul className="space-y-2">
                      {program.goals.map((goal) => (
                        <li
                          key={goal}
                          className="flex gap-2 text-[15px] text-bloom-ink/80"
                        >
                          <span
                            className={cn(
                              "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                              styles.bar,
                            )}
                            aria-hidden
                          />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
