"use client";

/**
 * AudienceTabs.tsx — the audience switcher (rebuild instructions section 5).
 *
 * Desktop: a sticky tab bar; one panel visible at a time.
 * Mobile: an accordion; tapping a header opens that panel.
 *
 * Both interaction models drive a single `active` tab id. All four panels
 * stay mounted in the DOM (hidden when inactive) so every audience view's
 * copy is crawlable for SEO and tab switching causes no layout shift.
 *
 * The active tab syncs to a URL hash (#issuers, #exchanges, #developers,
 * #enterprise) via replaceState, so a tab is shareable without adding a
 * history entry or triggering a scroll jump.
 */
import { useEffect, useState } from "react";
import { tabs, defaultTab, type AudienceTab } from "@/content/home";
import AudienceView from "./AudienceView";

type TabId = AudienceTab["id"];

const tabIds = tabs.map((t) => t.id);

function isTabId(value: string): value is TabId {
  return (tabIds as string[]).includes(value);
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 transition-transform ${
        open ? "rotate-180 text-accent" : "text-fg-muted"
      }`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AudienceTabs() {
  const [active, setActive] = useState<TabId>(defaultTab);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isTabId(hash)) setActive(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const selectTab = (id: TabId) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <section className="bg-canvas">
      {/* Desktop tab bar — sticky just under the fixed header. */}
      <div className="sticky top-16 z-40 hidden border-b border-edge bg-canvas/90 backdrop-blur-md lg:block">
        <div
          role="tablist"
          aria-label="Choose your audience"
          className="mx-auto flex max-w-5xl gap-2 px-4 sm:px-6 lg:px-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => selectTab(tab.id)}
              className={`border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${
                active === tab.id
                  ? "border-accent text-white"
                  : "border-transparent text-fg-muted hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panels: desktop shows the active one; mobile renders an accordion. */}
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <div
            key={tab.id}
            id={tab.id}
            className="border-b border-edge lg:border-b-0"
          >
            <button
              onClick={() => selectTab(tab.id)}
              aria-expanded={isActive}
              className="flex w-full items-center justify-between px-4 py-4 text-left lg:hidden"
            >
              <span
                className={`text-base font-semibold ${
                  isActive ? "text-accent" : "text-white"
                }`}
              >
                {tab.label}
              </span>
              <ChevronIcon open={isActive} />
            </button>

            <div
              role="tabpanel"
              aria-label={tab.label}
              className={isActive ? "block" : "hidden"}
            >
              <AudienceView tab={tab} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
