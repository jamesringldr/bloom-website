import { approach } from "@/lib/content";

export function Approach() {
  return (
    <section
      id="approach"
      className="section-pad bg-white/70 accent-orange"
      aria-labelledby="approach-heading"
    >
      <div className="container-bloom">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-bloom-orange">
            Our Approach
          </p>
          <h2
            id="approach-heading"
            className="font-display text-3xl font-semibold text-bloom-ink sm:text-4xl"
          >
            Play with purpose. Relationships first.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-bloom-ink/75">
            {approach.lead}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {approach.pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-border/80 bg-bloom-soft/60 p-6"
            >
              <span
                className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                style={{
                  backgroundColor: [
                    "var(--bloom-orange)",
                    "var(--bloom-green)",
                    "var(--bloom-blue)",
                    "var(--bloom-purple)",
                    "var(--bloom-red)",
                  ][i % 5],
                }}
                aria-hidden
              >
                {i + 1}
              </span>
              <h3 className="font-display text-xl font-semibold text-bloom-ink">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-bloom-ink/75">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-bloom-orange/40 bg-orange-50/60 px-6 py-8 text-center">
          <p className="font-display text-lg font-medium text-bloom-ink">
            Google reviews coming soon
          </p>
          <p className="mt-1 text-sm text-bloom-ink/60">
            We’re just getting started—check back after we open in February 2027.
          </p>
        </div>
      </div>
    </section>
  );
}
