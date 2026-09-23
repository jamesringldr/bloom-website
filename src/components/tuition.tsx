import Image from "next/image";
import { tuition } from "@/lib/content";

export function Tuition() {
  return (
    <section
      id="tuition"
      className="section-pad accent-green"
      aria-labelledby="tuition-heading"
    >
      <div className="container-bloom">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-bloom-green">
            Tuition
          </p>
          <h2
            id="tuition-heading"
            className="font-display text-3xl font-semibold text-bloom-ink sm:text-4xl"
          >
            Weekly rates by program & days
          </h2>
          <p className="mt-3 text-bloom-ink/70">
            Choose the schedule that fits your family. Enrollment and supply fees
            are billed yearly.
          </p>
        </div>

        <figure className="mx-auto max-w-2xl">
          <Image
            src="/tuition-table.png"
            alt="Bloom Early Learning Center weekly tuition: Infant $450/$400/$360/$280, Toddler $375/$320/$255/$200, Preschool $350/$300/$240/$180 for 5/4/3/2-day schedules"
            width={769}
            height={612}
            className="h-auto w-full rounded-3xl bg-white shadow-md ring-1 ring-bloom-green/15"
            priority={false}
          />
        </figure>

        <ul className="mx-auto mt-6 flex max-w-2xl flex-col gap-2 text-center text-bloom-ink/75 sm:flex-row sm:justify-center sm:gap-8">
          {tuition.fees.map((fee) => (
            <li key={fee} className="font-semibold">
              {fee}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-sm text-bloom-ink/55">{tuition.note}</p>
      </div>
    </section>
  );
}
