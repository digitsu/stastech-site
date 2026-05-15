"use client";

/**
 * Header — fixed top navigation bar shared by every page.
 *
 * Client component: it reads the current pathname to highlight the active
 * nav link. The bar is translucent with a blur so hero content shows through.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { name: string; href: string };

const navigation: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
];

const GITHUB_ORG = "https://github.com/stassso";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-edge bg-canvas/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Top"
      >
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center" aria-label="STAS home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/stas-symbol.svg"
              alt="STAS"
              width={84}
              height={30}
            />
          </Link>
          <div className="hidden gap-8 md:flex">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-accent"
                    : "text-fg hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <a
          href={GITHUB_ORG}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-fg-muted transition-colors hover:text-white"
        >
          GitHub
        </a>
      </nav>

      {/* Mobile nav row */}
      <div className="flex justify-center gap-6 border-t border-edge-soft py-3 md:hidden">
        {navigation.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive(link.href) ? "text-accent" : "text-fg hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
