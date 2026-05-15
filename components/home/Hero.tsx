/**
 * Hero.tsx — shared homepage hero (rebuild instructions section 3).
 * Contrarian headline, subhead, dual CTA, trust line. Renders above every
 * audience view.
 */
import { hero } from "@/content/home";
import { CtaPair, TrustTriple } from "./Cta";

export default function Hero() {
  return (
    <section className="border-b border-edge bg-canvas">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-soft sm:text-xl">
          {hero.subhead}
        </p>
        <div className="mt-10">
          <CtaPair primary={hero.primaryCta} secondary={hero.secondaryCta} />
          <TrustTriple text={hero.trustLine} />
        </div>
      </div>
    </section>
  );
}
