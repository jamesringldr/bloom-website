import { team } from "@/lib/content";

export function Team() {
  return (
    <section
      id="team"
      className="section-pad bg-white/70 accent-blue"
      aria-labelledby="team-heading"
    >
      <div className="container-bloom">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-bloom-blue">
            Our Team
          </p>
          <h2
            id="team-heading"
            className="font-display text-3xl font-semibold text-bloom-ink sm:text-4xl"
          >
            Meet the directors
          </h2>
          <p className="mt-3 text-bloom-ink/70">
            Passionate educators building a place where every child is known and
            loved.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {team.map((person, i) => (
            <article
              key={person.name}
              className="flex flex-col gap-5 rounded-3xl bg-bloom-soft/80 p-6 sm:flex-row sm:p-8"
            >
              <div
                className="mx-auto flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full bg-gradient-to-br from-bloom-sky to-white text-center ring-4 ring-white shadow-inner sm:mx-0"
                aria-label={`${person.name} headshot placeholder`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wide text-bloom-ink/45">
                  Placeholder
                </span>
                <span className="font-display text-3xl font-semibold text-bloom-blue">
                  {person.name.charAt(0)}
                </span>
                <span className="mt-1 px-2 text-[10px] text-bloom-ink/40">
                  Photo coming soon
                </span>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display text-2xl font-semibold text-bloom-ink">
                  {person.name}
                </h3>
                <p
                  className="mt-0.5 text-sm font-bold"
                  style={{
                    color: i === 0 ? "var(--bloom-blue)" : "var(--bloom-purple)",
                  }}
                >
                  {person.role}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-bloom-ink/75">
                  {person.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
