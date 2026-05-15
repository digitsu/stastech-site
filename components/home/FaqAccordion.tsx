"use client";

/**
 * FaqAccordion.tsx — three-question FAQ block shown near the bottom of each
 * audience view. Built on Headless UI Disclosure for accessible expand
 * behavior (keyboard, aria-expanded).
 */
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import type { FaqItem } from "@/content/home";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-accent transition-transform ${
        open ? "rotate-45" : ""
      }`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
    </svg>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-edge overflow-hidden rounded-lg border border-edge bg-surface">
      {items.map((item) => (
        <Disclosure key={item.q} as="div">
          {({ open }) => (
            <>
              <DisclosureButton className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-base font-semibold text-white">
                  {item.q}
                </span>
                <ToggleIcon open={open} />
              </DisclosureButton>
              <DisclosurePanel className="px-5 pb-5 text-base leading-relaxed text-fg-soft">
                {item.a}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
