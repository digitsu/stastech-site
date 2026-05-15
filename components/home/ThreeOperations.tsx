/**
 * ThreeOperations.tsx — shared mid-page section (rebuild instructions
 * section 10). A three-step plan that reduces fear of commitment, anchored
 * by the "1-2 KB of Bitcoin Script" closing line.
 */
import { threeOperations } from "@/content/home";

export default function ThreeOperations() {
  const { headline, steps, closingLine } = threeOperations;

  return (
    <section className="border-t border-edge bg-canvas">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {headline}
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-lg border border-edge bg-surface p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-base font-bold text-canvas">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-fg-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-fg-soft">
          {closingLine}
        </p>
      </div>
    </section>
  );
}
