import { calendar2027, story } from "@/lib/content";

export function StoryCalendar() {
  return (
    <section
      id="story"
      className="section-pad accent-purple"
      aria-labelledby="story-heading"
    >
      <div className="container-bloom grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-bloom-purple">
            Our Story
          </p>
          <h2
            id="story-heading"
            className="font-display text-3xl font-semibold text-bloom-ink sm:text-4xl"
          >
            Built by educators who believe community comes first
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-bloom-ink/80">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-bloom-purple/15 sm:p-8">
          <h3 className="font-display text-2xl font-semibold text-bloom-ink">
            2027 Calendar
          </h3>
          <p className="mt-1 text-sm text-bloom-ink/60">
            Special days and planned closures for our opening year.
          </p>

          <h4 className="mt-6 text-xs font-bold uppercase tracking-wide text-bloom-purple">
            Special events
          </h4>
          <ul className="mt-3 space-y-2">
            {calendar2027.events.map((event) => (
              <li
                key={event.name}
                className="flex flex-col gap-0.5 rounded-xl bg-bloom-soft/80 px-3 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span className="font-semibold text-bloom-ink">{event.name}</span>
                <span className="shrink-0 text-sm text-bloom-ink/60">
                  {event.date}
                </span>
              </li>
            ))}
          </ul>

          <h4 className="mt-6 text-xs font-bold uppercase tracking-wide text-bloom-red">
            Closures
          </h4>
          <ul className="mt-3 space-y-2">
            {calendar2027.closures.map((event) => (
              <li
                key={event.name}
                className="flex flex-col gap-0.5 rounded-xl bg-red-50/70 px-3 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span className="font-semibold text-bloom-ink">{event.name}</span>
                <span className="shrink-0 text-sm text-bloom-ink/60">
                  {event.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
