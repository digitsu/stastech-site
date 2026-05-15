/**
 * Testimonials.tsx — testimonial section (rebuild instructions section 15).
 *
 * Renders nothing until real, attributed quotes from verified STAS users
 * exist in `testimonials`. Generic or fabricated testimonials are worse
 * than an absent section, so the empty state is intentional — do not add
 * placeholder content here.
 */
import { testimonials } from "@/content/home";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-edge bg-canvas">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={`${t.name}-${t.company}`}
              className="rounded-lg border border-edge bg-surface p-8"
            >
              <blockquote className="text-lg leading-relaxed text-fg">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm text-fg-muted">
                <span className="font-semibold text-white">{t.name}</span>
                {", "}
                {t.title}, {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
