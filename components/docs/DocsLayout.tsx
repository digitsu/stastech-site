/**
 * components/docs/DocsLayout.tsx
 *
 * Shared layout for all documentation pages. Renders a sticky sidebar with
 * two nav groups ("Documentation" and "Features") and a main content area.
 *
 * Props:
 *   children    — page body content
 *   title       — optional heading displayed at the top of the content area
 *   description — optional subtitle shown beneath the heading
 *
 * This is a client component because the sidebar needs to read the current
 * pathname to highlight the active nav link, and it manages local toggle
 * state for the mobile sidebar.
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarNav = [
  { name: 'Overview', href: '/docs' },
  { name: 'Specification', href: '/docs/spec' },
  { name: 'SDK Reference', href: '/docs/sdks' },
  { name: 'Athanor Indexer (Elixir)', href: '/docs/athanor' },
  { name: 'Consigliere Indexer (C#)', href: '/docs/consigliere' },
]

const featuresNav = [
  { name: 'STAS Standard', href: '/docs/stas' },
  { name: 'Divisible Swap', href: '/docs/swap' },
]

interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

/**
 * DocsLayout wraps every docs page with a responsive two-column layout:
 * a collapsible sidebar on the left and a content panel on the right.
 */
export default function DocsLayout({ children, title, description }: DocsLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#e6edf3] bg-[#161b22] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
              Documentation Menu
            </button>
          </div>

          {/* Sidebar */}
          <aside className={`lg:col-span-3 ${sidebarOpen ? 'block' : 'hidden'} lg:block mb-8 lg:mb-0`}>
            <nav className="sticky top-28 bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-4">
                Documentation
              </h3>
              <ul className="space-y-1">
                {sidebarNav.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                          isActive
                            ? 'bg-[#58a6ff]/10 text-[#58a6ff] font-medium'
                            : 'text-[#c9d1d9] hover:text-white hover:bg-[#21262d]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 pt-3 border-t border-[#30363d]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-2 px-3">
                  Features
                </h3>
                <ul className="space-y-1">
                  {featuresNav.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                            isActive
                              ? 'bg-[#58a6ff]/10 text-[#58a6ff] font-medium'
                              : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 sm:p-8 lg:p-10">
              {title && (
                <div className="mb-8 pb-6 border-b border-[#30363d]">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
                  {description && (
                    <p className="mt-3 text-lg text-[#8b949e]">{description}</p>
                  )}
                </div>
              )}
              <div className="prose-docs">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
