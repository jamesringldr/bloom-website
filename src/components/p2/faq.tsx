import { Plus } from "lucide-react";
import { faq } from "@/lib/content";
import { Blossom } from "./blossom";
import { Reveal } from "./reveal";

const border = [
  "border-p2-tomato",
  "border-p2-orange",
  "border-p2-leaf",
  "border-p2-cobalt",
  "border-p2-grape",
  "border-p2-pink",
];

export function P2Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="p2-faq-heading"
      className="relative bg-p2-cream-deep px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-p2-hand text-2xl font-bold text-p2-tomato sm:text-3xl">FAQ</p>
          <h2
            id="p2-faq-heading"
            className="mt-1 font-p2-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.08]"
          >
            Good <span className="p2-squiggle [--sq:var(--color-p2-tomato)]">questions</span>
          </h2>
          <Blossom pose="peek" className="mt-8 hidden h-44 lg:block" />
        </Reveal>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details
                name="p2-faq"
                className={`group rounded-[1.75rem] border-[3px] bg-white ${border[i % border.length]}`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.75rem] px-6 py-5 font-display text-xl font-bold sm:text-2xl">
                  {item.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-p2-ink text-p2-cream transition-transform duration-200 group-open:rotate-45">
                    <Plus className="size-5" aria-hidden />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[17px] leading-relaxed text-p2-ink/85">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
