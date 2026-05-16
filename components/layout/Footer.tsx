/**
 * Footer — global site footer. Links to the official STAS account on X
 * above a copyright line. Server component (no interactivity).
 */
const X_URL = "https://x.com/StasToken";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-canvas">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow or contact STAS on X"
          className="group inline-flex items-center gap-2 rounded-md border border-edge bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-white"
        >
          <XIcon className="h-4 w-4 text-fg-muted transition-colors group-hover:text-accent" />
          <span>Follow/Contact @StasToken</span>
        </a>
        <p className="text-center text-sm text-fg-faint">
          &copy; {new Date().getFullYear()} STAS Token Protocol. MIT-licensed.
        </p>
      </div>
    </footer>
  );
}
