/**
 * app/docs/spec/page.tsx
 *
 * Renders the STAS 3.0 canonical specification as a browsable HTML page.
 *
 * The spec content and the downloadable docx are produced by
 * scripts/build-spec.sh, which writes a manifest.json alongside them
 * recording which files are the current canonical pair. This page reads
 * that manifest at build time (module scope in App Router — runs during
 * static export) and uses the recorded filenames for both the inline HTML
 * render and the download button.
 */

import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'STAS 3.0 Specification',
  description:
    'Canonical wire-format and state-machine reference for the STAS 3.0 token protocol. Last updated: v0.2.1, 2026-05-02.',
  alternates: { canonical: '/docs/spec' },
}

/**
 * Reads the manifest and spec HTML at build time.
 * @returns specHtml - the pandoc-generated HTML string
 * @returns docxHref - URL path for the download button
 */
function loadSpec(): { specHtml: string; docxHref: string } {
  const specDir = path.join(process.cwd(), 'public', 'spec')
  const manifestPath = path.join(specDir, 'manifest.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
    base: string
    html: string
    docx: string
    source: string
  }

  const htmlPath = path.join(specDir, manifest.html)
  const specHtml = fs.readFileSync(htmlPath, 'utf8')

  return { specHtml, docxHref: `/spec/${manifest.docx}` }
}

const { specHtml, docxHref } = loadSpec()

/** SpecPage — full-page view of the STAS 3.0 protocol specification. */
export default function SpecPage() {
  return (
    <DocsLayout
      title="STAS 3.0 Specification"
      description="Canonical wire-format and state-machine reference. Last updated: v0.2.1, 2026-05-02."
    >
      {/* Header actions */}
      <section className="mb-8 flex flex-wrap gap-3">
        <a
          href={docxHref}
          download
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
                     bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/30
                     hover:bg-[#58a6ff]/20 hover:border-[#58a6ff] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download original (.docx)
        </a>
        <a
          href="https://github.com/stassso/STAS-3-script-templates"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
                     bg-[#21262d] text-[#c9d1d9] border border-[#30363d]
                     hover:text-white hover:border-[#58a6ff] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View source on GitHub ↗
        </a>
      </section>

      {/* Spec content — source is pandoc output of the authoritative docx, not user input */}
      <article
        className="
          prose prose-invert max-w-none
          prose-headings:text-white
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
          prose-h4:text-base prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2
          prose-p:text-[#c9d1d9] prose-p:leading-relaxed
          prose-a:text-[#58a6ff] prose-a:no-underline hover:prose-a:text-white
          prose-strong:text-white
          prose-code:text-[#58a6ff] prose-code:bg-[#0d1117] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-[#30363d] prose-pre:rounded-lg
          prose-table:text-sm prose-table:w-full
          prose-thead:border-b prose-thead:border-[#30363d]
          prose-th:text-[#8b949e] prose-th:font-medium prose-th:py-2 prose-th:pr-4 prose-th:text-left
          prose-td:text-[#c9d1d9] prose-td:py-2 prose-td:pr-4 prose-td:border-b prose-td:border-[#21262d]
          prose-hr:border-[#30363d]
          prose-li:text-[#c9d1d9]
          prose-ul:list-disc prose-ol:list-decimal
        "
        dangerouslySetInnerHTML={{ __html: specHtml }}
      />
    </DocsLayout>
  )
}
