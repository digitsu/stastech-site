/**
 * ProofStrip.tsx — proof strip (rebuild instructions section 4).
 * Four metrics, a verified-integrator logo row, and an anchor to the
 * long-form thesis. Renders directly under the hero on every view.
 */
import Link from "next/link";
import { proofStrip } from "@/content/home";

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M3 8h9M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProofStrip() {
  const { metrics, logos, article } = proofStrip;

  return (
    <section className="border-b border-edge bg-surface-2">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Metrics */}
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="text-2xl font-bold text-white sm:text-3xl">
                {metric.value}
              </dt>
              <dd className="mt-1 text-sm text-fg-muted">{metric.label}</dd>
            </div>
          ))}
        </dl>

        {/* Logos */}
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-edge pt-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-fg-faint">
            In production
          </span>
          {logos.map((logo) => (
            <span
              key={logo.name}
              className="text-lg font-semibold text-fg-soft"
            >
              {logo.name}
            </span>
          ))}
        </div>

        {/* Long-form thesis anchor */}
        <Link
          href={article.href}
          className="mt-8 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-hover"
        >
          <span>
            {article.lead} {article.title}
          </span>
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
