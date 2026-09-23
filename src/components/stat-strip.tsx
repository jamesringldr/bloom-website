import { site } from "@/lib/content";

const stats = [
  { label: "4 classrooms", accent: "bg-bloom-red" },
  { label: `Ages ${site.ages}`, accent: "bg-bloom-orange" },
  {
    label: "Creative Curriculum + Handwriting Without Tears",
    accent: "bg-bloom-green",
  },
  { label: `Opening ${site.opening}`, accent: "bg-bloom-blue" },
];

export function StatStrip() {
  return (
    <section
      aria-label="At a glance"
      className="border-y border-border/70 bg-white/80"
    >
      <div className="container-bloom grid gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-start gap-3 rounded-2xl bg-bloom-soft/80 px-4 py-3"
          >
            <span
              className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${stat.accent}`}
              aria-hidden
            />
            <p className="font-display text-base font-medium leading-snug text-bloom-ink sm:text-lg">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
