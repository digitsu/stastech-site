/**
 * app/docs/spec/page.tsx
 *
 * Landing page for the STAS 3.0 canonical specification. The page intentionally
 * does NOT inline the full protocol document — readers download the .docx for
 * the authoritative text. The page only surfaces a short bullet list of
 * protocol highlights, a download button, and a link to the script-template
 * source on GitHub.
 *
 * The downloadable docx filename is recorded in public/spec/manifest.json by
 * scripts/build-spec.sh. The manifest is read at module scope so bumping
 * SPEC_DOCX in the build script ships a new spec version with no TSX edits.
 */

import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'STAS 3.0 Specification',
  description:
    'Download the canonical STAS 3.0 specification document. Protocol highlights: P2MPKH, var2 action data, protoID, divisible swap, freeze/confiscation, Bundle Factory, OP_PUSH_TX.',
  alternates: { canonical: '/docs/spec' },
}

type Highlight = { title: string; href: string; body: string }

const HIGHLIGHTS: Highlight[] = [
  {
    title: 'P2MPKH',
    href: '/docs/stas#p2mpkh',
    body: 'm-of-n multisig ownership; on-chain indistinguishable from P2PKH until spend.',
  },
  {
    title: 'var2 (structured action data)',
    href: '/docs/stas',
    body: 'Per-spend action data carrying swap descriptors, freeze markers, or owner-defined bytes.',
  },
  {
    title: 'protoID (token identity)',
    href: '/docs/stas#protoid',
    body: '20-byte token identity anchored to the issuer’s redemption address.',
  },
  {
    title: 'Divisible swap',
    href: '/docs/swap',
    body: 'Atomic on-chain exchange between two STAS token types with exchange-rate enforcement.',
  },
  {
    title: 'Freeze / confiscation',
    href: '/docs/stas#flags',
    body: 'Optional, issuance-time flagged authority addresses for regulated assets.',
  },
  {
    title: 'Bundle Factory',
    href: '/docs/stas#bundle-factory',
    body: 'Plans merge/split/transfer chains for multi-recipient payouts from a wallet’s UTXO set.',
  },
  {
    title: 'OP_PUSH_TX validation',
    href: '/docs/stas',
    body: 'Miner-enforced validation via sighash preimage; every operation is checked on-chain.',
  },
]

/**
 * Reads the manifest at build time to discover the current docx filename.
 * @returns docxHref - URL path under /spec/ for the download button
 */
function loadDocxHref(): string {
  const specDir = path.join(process.cwd(), 'public', 'spec')
  const manifestPath = path.join(specDir, 'manifest.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
    base: string
    html: string
    docx: string
    source: string
  }
  return `/spec/${manifest.docx}`
}

const docxHref = loadDocxHref()

/** SpecPage — download-and-highlights view of the STAS 3.0 specification. */
export default function SpecPage() {
  return (
    <DocsLayout
      title="STAS 3.0 Specification"
      description="Canonical wire-format and state-machine reference. Last updated: v0.2.1, 2026-05-02."
    >
      <section className="mb-8">
        <p className="text-[#c9d1d9] leading-relaxed mb-6">
          The authoritative STAS 3.0 protocol document — wire format, locking-script
          structure, opcode tables, and state-machine rules — is distributed as a
          single .docx. Download it for the full text; the bullets below are a
          non-normative summary of what the protocol provides.
        </p>
        <div className="flex flex-wrap gap-3">
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
            Download specification (.docx)
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
            View script templates on GitHub ↗
          </a>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Protocol Highlights</h2>
        <ul className="space-y-3">
          {HIGHLIGHTS.map((h) => (
            <li
              key={h.title}
              className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg"
            >
              <Link
                href={h.href}
                className="text-sm font-semibold text-[#58a6ff] hover:text-white transition-colors"
              >
                {h.title}
              </Link>
              <p className="text-sm text-[#c9d1d9] mt-1">{h.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg">
          <p className="text-sm text-[#c9d1d9]">
            Looking for usage examples?{' '}
            <Link
              href="/docs/sdks"
              className="text-[#58a6ff] hover:text-white transition-colors font-medium"
            >
              SDK Reference
            </Link>{' '}
            covers the Rust and Elixir libraries that build and validate STAS transactions.
          </p>
        </div>
      </section>
    </DocsLayout>
  )
}
