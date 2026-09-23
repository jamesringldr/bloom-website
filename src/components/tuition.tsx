import Image from "next/image";
import { tuition } from "@/lib/content";

function formatUsd(n: number) {
  return `$${n}`;
}

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

        <div className="overflow-x-auto rounded-3xl bg-white shadow-md ring-1 ring-bloom-green/15">
          <table className="min-w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border bg-bloom-green/10">
                <th className="px-4 py-4 font-display font-semibold text-bloom-ink sm:px-6">
                  Program
                </th>
                <th className="px-3 py-4 font-display font-semibold text-bloom-ink">
                  5-day
                </th>
                <th className="px-3 py-4 font-display font-semibold text-bloom-ink">
                  4-day
                </th>
                <th className="px-3 py-4 font-display font-semibold text-bloom-ink">
                  3-day
                </th>
                <th className="px-3 py-4 font-display font-semibold text-bloom-ink sm:pr-6">
                  2-day
                </th>
              </tr>
            </thead>
            <tbody>
              {tuition.rows.map((row) => (
                <tr
                  key={row.program}
                  className="border-b border-border/70 last:border-0"
                >
                  <td className="px-4 py-4 font-semibold text-bloom-ink sm:px-6">
                    {row.program}
                  </td>
                  <td className="px-3 py-4 text-bloom-ink/80">
                    {formatUsd(row.rates.five)}
                  </td>
                  <td className="px-3 py-4 text-bloom-ink/80">
                    {formatUsd(row.rates.four)}
                  </td>
                  <td className="px-3 py-4 text-bloom-ink/80">
                    {formatUsd(row.rates.three)}
                  </td>
                  <td className="px-3 py-4 text-bloom-ink/80 sm:pr-6">
                    {formatUsd(row.rates.two)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mx-auto mt-6 flex max-w-2xl flex-col gap-2 text-center text-bloom-ink/75 sm:flex-row sm:justify-center sm:gap-8">
          {tuition.fees.map((fee) => (
            <li key={fee} className="font-semibold">
              {fee}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-sm text-bloom-ink/55">{tuition.note}</p>

        <figure className="mx-auto mt-10 max-w-xl">
          <Image
            src="/tuition-table.png"
            alt="Bloom Early Learning Center weekly tuition rates table"
            width={769}
            height={612}
            className="h-auto w-full rounded-2xl shadow-sm ring-1 ring-border"
          />
          <figcaption className="mt-2 text-center text-xs text-bloom-ink/50">
            Official rates graphic
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
