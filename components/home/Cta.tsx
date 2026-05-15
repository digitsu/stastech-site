/**
 * Cta.tsx — shared call-to-action primitives used by the hero, each audience
 * tab, and the final CTA.
 *
 * CtaButton renders one button. CtaPair renders a primary + visually
 * subordinate secondary, enforcing the rebuild instruction's rule that no
 * section has two equal-weight CTAs.
 */
import Link from "next/link";
import type { Cta } from "@/content/home";

type Variant = "primary" | "secondary";

const isExternal = (href: string) => href.startsWith("http");

function CtaButton({ cta, variant }: { cta: Cta; variant: Variant }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-canvas hover:bg-accent-hover"
      : "border border-edge text-fg hover:border-accent hover:text-white";
  const className = `${base} ${styles}`;

  if (isExternal(cta.href)) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export function CtaPair({
  primary,
  secondary,
}: {
  primary: Cta;
  secondary: Cta;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <CtaButton cta={primary} variant="primary" />
      <CtaButton cta={secondary} variant="secondary" />
    </div>
  );
}

/** Risk reversal + social proof + speed line shown under a primary CTA. */
export function TrustTriple({ text }: { text: string }) {
  return <p className="mt-5 max-w-xl text-sm text-fg-muted">{text}</p>;
}
