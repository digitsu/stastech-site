/**
 * FinalCta.tsx — shared final call to action (rebuild instructions
 * section 11). Same dual-CTA pattern as the hero, closed with a trust
 * micro-line that reuses the hero's headline number.
 */
import { finalCta } from "@/content/home";
import { CtaPair, TrustTriple } from "./Cta";

export default function FinalCta() {
  return (
    <section className="border-t border-edge bg-surface-2">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {finalCta.headline}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-soft">
          {finalCta.body}
        </p>
        <div className="mt-10">
          <CtaPair
            primary={finalCta.primaryCta}
            secondary={finalCta.secondaryCta}
          />
          <TrustTriple text={finalCta.trustMicroLine} />
        </div>
      </div>
    </section>
  );
}
