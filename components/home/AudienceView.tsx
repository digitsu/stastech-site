/**
 * AudienceView.tsx — renders the full content of one audience tab.
 *
 * All four audience views (issuers, exchanges, developers, enterprise) share
 * the same structure, so this is a single data-driven renderer fed an
 * `AudienceTab` object. Optional blocks (pain-math callout, code sample)
 * render only when the data provides them.
 *
 * Block order follows the rebuild instructions: pain headline -> pain stack
 * -> without/with table -> three features -> proof -> code sample -> FAQ ->
 * CTA + trust triple.
 */
import type { AudienceTab } from "@/content/home";
import { CtaPair, TrustTriple } from "./Cta";
import FaqAccordion from "./FaqAccordion";

function PainBlock({ tab }: { tab: AudienceTab }) {
  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {tab.painHeadline}
      </h3>
      <ul className="mt-8 space-y-6">
        {tab.painStack.map((point, i) => (
          <li key={i} className="flex gap-4">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <p className="text-base leading-relaxed text-fg-soft">{point}</p>
          </li>
        ))}
      </ul>
      {tab.painMath && (
        <div className="mt-8 rounded-lg border border-edge bg-surface p-6">
          <p className="text-base leading-relaxed text-fg-soft">
            {tab.painMath}
          </p>
        </div>
      )}
    </div>
  );
}

function WithoutWithTable({ tab }: { tab: AudienceTab }) {
  return (
    <div className="overflow-hidden rounded-lg border border-edge">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="bg-surface-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-fg-muted">
          Without STAS
        </div>
        <div className="hidden bg-surface px-5 py-3 text-sm font-semibold uppercase tracking-wider text-accent sm:block">
          With STAS
        </div>
      </div>
      {tab.withoutWith.map((row, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-edge bg-surface-2 px-5 py-4 text-base text-fg-soft">
            {row.without}
          </div>
          <div className="block bg-surface px-5 py-1 text-sm font-semibold uppercase tracking-wider text-accent sm:hidden">
            With STAS
          </div>
          <div className="border-t border-edge bg-surface px-5 py-4 text-base text-white sm:border-l">
            {row.with}
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesTrio({ tab }: { tab: AudienceTab }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {tab.features.map((feature, i) => (
        <div
          key={feature.title}
          className="rounded-lg border border-edge bg-surface p-6"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-edge bg-surface-2 text-sm font-bold text-accent">
            {i + 1}
          </span>
          <h4 className="mt-4 text-lg font-semibold text-white">
            {feature.title}
          </h4>
          <p className="mt-2 text-base leading-relaxed text-fg-soft">
            {feature.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProofBlock({ tab }: { tab: AudienceTab }) {
  return (
    <div className="rounded-lg border border-edge bg-surface-2 p-6">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-fg-faint">
        Proof
      </h4>
      <div className="mt-4 space-y-3">
        {tab.proof.map((line, i) => (
          <p key={i} className="text-base leading-relaxed text-fg-soft">
            {line}
          </p>
        ))}
      </div>
      {tab.proofNote && (
        <p className="mt-4 border-t border-edge pt-4 text-sm text-fg-muted">
          {tab.proofNote}
        </p>
      )}
    </div>
  );
}

function CodeSample({ tab }: { tab: AudienceTab }) {
  if (!tab.codeSample) return null;
  return (
    <div>
      <h4 className="text-lg font-semibold text-white">
        Issue a token from your existing stack
      </h4>
      <div className="mt-4 overflow-hidden rounded-lg border border-edge bg-surface-2">
        <div className="border-b border-edge px-5 py-3 font-mono text-sm text-accent">
          {tab.codeSample.install}
        </div>
        <pre className="overflow-x-auto px-5 py-4 font-mono text-sm leading-relaxed text-fg-soft">
          <code>{tab.codeSample.code}</code>
        </pre>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-fg-faint">
      {children}
    </h3>
  );
}

export default function AudienceView({ tab }: { tab: AudienceTab }) {
  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 py-16 sm:px-6 lg:px-8">
      <PainBlock tab={tab} />

      <div className="space-y-4">
        <SectionHeading>The difference</SectionHeading>
        <WithoutWithTable tab={tab} />
      </div>

      <div className="space-y-6">
        <FeaturesTrio tab={tab} />
      </div>

      <ProofBlock tab={tab} />

      <CodeSample tab={tab} />

      <div className="space-y-4">
        <SectionHeading>Questions</SectionHeading>
        <FaqAccordion items={tab.faq} />
      </div>

      <div className="border-t border-edge pt-10">
        <CtaPair primary={tab.primaryCta} secondary={tab.secondaryCta} />
        <TrustTriple text={tab.trustTriple} />
      </div>
    </div>
  );
}
