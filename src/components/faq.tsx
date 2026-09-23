import { faq } from "@/lib/content";

export function Faq() {
  return (
    <section
      id="faq"
      className="section-pad bg-white/70 accent-red"
      aria-labelledby="faq-heading"
    >
      <div className="container-bloom max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-bloom-red">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-semibold text-bloom-ink sm:text-4xl"
          >
            Questions families ask
          </h2>
        </div>

        <div className="space-y-3">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-bloom-soft/50 open:bg-white open:shadow-sm"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-display text-lg font-medium text-bloom-ink marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span
                    className="shrink-0 text-bloom-blue transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <div className="border-t border-border/60 px-5 py-4 text-[15px] leading-relaxed text-bloom-ink/75">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
