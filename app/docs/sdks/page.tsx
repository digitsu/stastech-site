/**
 * app/docs/sdks/page.tsx
 *
 * SDK Reference page — lists current and legacy STAS SDKs with a support
 * matrix table and detailed capability breakdowns per SDK.
 */

import type { Metadata } from 'next'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'SDK Reference',
  description: 'STAS token SDK comparison — Rust, Elixir, TypeScript, JavaScript implementations.',
  alternates: { canonical: '/docs/sdks' },
}

const currentSdks = [
  {
    name: 'bsv-sdk-rust',
    language: 'Rust',
    status: 'Production',
    gen1: false,
    gen2: true,
    stas30: true,
    bundleFactory: true,
    links: [
      { label: 'crates.io', href: 'https://crates.io/crates/bittoku-bsv' },
      { label: 'docs.rs', href: 'https://docs.rs/bittoku-bsv' },
      { label: 'GitHub', href: 'https://github.com/Bittoku/bsv-sdk-rust' },
    ],
    description: 'Native Rust implementation with full support for Gen2 and 3.0 STAS templates. High performance, suitable for server-side and embedded use.',
    capabilities: [
      'Gen2 and 3.0 token templates',
      'Bundle Factory for multi-recipient payouts',
      'Provenance validation via indexer integration',
      'STAS-BTG research template (not recommended for production) — on-chain prev-TX proof verification with optional issuer-checkpoint path. Motivation is valid: the standard STAS script does not enforce that merged inputs belong to the same issuance pool — that invariant lives in the indexer, not the script. The blocker is naive prev-TX embedding, which grows roughly geometrically under repeated merges. Implementation is incomplete (engine-verify tests fail). Production deployments should use indexer-based provenance for now. See /docs/stas-btg.',
      'P2MPKH support for issuance and redemption',
      'Full coverage for STAS 3.0 v0.2.3 (finalized) — OP_SPLIT-based 70-byte P2MPKH body, scaled-dividend swap rate math, owner-keyed arbitrator-free swaps, separate-pushdata swap-piece arrays, recursive next, P2MPKH redeem buffer with raw m/n bytes',
    ],
  },
  {
    name: 'bsv_sdk_elixir',
    language: 'Elixir',
    status: 'Production',
    gen1: false,
    gen2: true,
    stas30: true,
    bundleFactory: true,
    links: [
      { label: 'HexDocs', href: 'https://hexdocs.pm/bsv_sdk' },
      { label: 'GitHub', href: 'https://github.com/Bittoku/bsv_sdk_elixir' },
      { label: 'v1.4.0 Release', href: 'https://hex.pm/packages/bsv_sdk/1.4.0' },
    ],
    description: 'Elixir SDK with factory modules for Gen2 and 3.0 STAS templates. Leverages OTP for concurrent token operations.',
    capabilities: [
      'Gen2 and 3.0 token templates',
      'Bundle Factory for multi-recipient payouts',
      'Provenance validation via indexer integration',
      'P2MPKH support for issuance and redemption',
      'Full coverage for STAS 3.0 v0.2.3 (finalized) — OP_SPLIT-based 70-byte P2MPKH body, scaled-dividend swap rate math, owner-keyed arbitrator-free swaps, separate-pushdata swap-piece arrays, recursive next, P2MPKH redeem buffer with raw m/n bytes',
    ],
  },
  {
    name: 'dxs-bsv-token-sdk',
    language: 'TypeScript',
    status: 'Production',
    gen1: false,
    gen2: true,
    stas30: true,
    bundleFactory: true,
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/dxs-bsv-token-sdk' },
      { label: 'GitHub', href: 'https://github.com/dxsapp/dxs-bsv-token-sdk' },
    ],
    description: 'TypeScript SDK for BSV transactions with STAS 3.0 support via its DSTAS surface. Split entrypoints: dxs-bsv-token-sdk/dstas, /stas, and /bsv. Suitable for Node.js backends and browser-based applications. Renamed from dxs-stas-sdk; the old package remains on npm but the canonical surface is now dxs-bsv-token-sdk.',
    capabilities: ['Gen2 and 3.0 token templates', 'Bundle Factory (DstasBundleFactory) for multi-recipient payouts', 'Provenance validation via indexer integration'],
  },
]

const legacySdks = [
  {
    name: 'stas-sdk',
    language: 'JavaScript',
    status: 'Production',
    gen1: true,
    gen2: true,
    stas30: false,
    bundleFactory: false,
    links: [
      { label: 'GitHub', href: 'https://github.com/stas-token/stas-sdk' },
    ],
    description: 'STAS token SDK by Vaionex. Supports Gen1 and Gen2 templates. Does not support 3.0.',
    capabilities: ['Gen1 and Gen2 token templates', 'Atomic swaps', 'Unsigned and zero-fee transactions'],
  },
]

const sdks = [...currentSdks, ...legacySdks]

/** SupportBadge — renders a green check or red cross for a boolean feature flag. */
function SupportBadge({ supported }: { supported: boolean }) {
  return supported ? (
    <span className="text-[#3fb950]">✓</span>
  ) : (
    <span className="text-[#f85149]">✗</span>
  )
}

/** SdksDocs — SDK comparison and details page. */
export default function SdksDocs() {
  return (
    <DocsLayout
      title="SDK Reference"
      description="Compare STAS implementations across languages"
    >
      {/* Comparison Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Generation Support Matrix</h2>
        <p className="text-sm text-[#8b949e] mb-4">
          The <strong className="text-white">STAS 3.0</strong> column reflects support for the
          broader 3.0 template family. As of the v0.2.3 finalized spec, parity with the binding
          v0.2.3 details (OP_SPLIT-based P2MPKH body, scaled-dividend rate math, owner-keyed
          arbitrator-free swaps, separate-pushdata swap-piece arrays, recursive{' '}
          <code className="text-[#58a6ff]">next</code>, etc.) is shipped in{' '}
          <code className="text-[#58a6ff]">bsv-sdk-rust</code> and{' '}
          <code className="text-[#58a6ff]">bsv_sdk_elixir</code>;{' '}
          <code className="text-[#58a6ff]">dxs-bsv-token-sdk</code> (renamed from{' '}
          <code className="text-[#58a6ff]">dxs-stas-sdk</code>) ships its own STAS 3.0 surface,
          but byte-level alignment with v0.2.3 has not been independently verified.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-3 pr-4 text-[#8b949e] font-medium">SDK</th>
                <th className="text-center py-3 px-3 text-[#8b949e] font-medium">Gen 1</th>
                <th className="text-center py-3 px-3 text-[#8b949e] font-medium">Gen 2</th>
                <th className="text-center py-3 px-3 text-[#8b949e] font-medium">STAS 3.0</th>
                <th className="text-center py-3 px-3 text-[#8b949e] font-medium">Bundle Factory</th>
                <th className="text-left py-3 px-3 text-[#8b949e] font-medium">Language</th>
                <th className="text-left py-3 pl-3 text-[#8b949e] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {sdks.map((sdk) => (
                <tr key={sdk.name} className="border-b border-[#21262d]">
                  <td className="py-3 pr-4">
                    <code className="text-[#58a6ff] text-xs bg-[#0d1117] px-1.5 py-0.5 rounded">{sdk.name}</code>
                  </td>
                  <td className="text-center py-3 px-3"><SupportBadge supported={sdk.gen1} /></td>
                  <td className="text-center py-3 px-3"><SupportBadge supported={sdk.gen2} /></td>
                  <td className="text-center py-3 px-3"><SupportBadge supported={sdk.stas30} /></td>
                  <td className="text-center py-3 px-3"><SupportBadge supported={sdk.bundleFactory} /></td>
                  <td className="py-3 px-3 text-[#c9d1d9]">{sdk.language}</td>
                  <td className="py-3 pl-3">
                    <span className="text-xs font-medium text-[#3fb950] bg-[#3fb950]/10 px-2 py-0.5 rounded-full">
                      {sdk.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Current SDK Details */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-2">Current SDKs</h2>
        <p className="text-sm text-[#8b949e] mb-6">These SDKs support Gen2 and 3.0 STAS templates.</p>
        <div className="space-y-6">
          {currentSdks.map((sdk) => (
            <div key={sdk.name} className="p-5 bg-[#0d1117] border border-[#30363d] rounded-lg">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-white">{sdk.name}</h3>
                  <span className="text-xs text-[#8b949e]">{sdk.language}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-[#c9d1d9]">
                    Gen1 <SupportBadge supported={sdk.gen1} />
                  </span>
                  <span className="text-xs text-[#c9d1d9]">
                    Gen2 <SupportBadge supported={sdk.gen2} />
                  </span>
                  <span className="text-xs text-[#c9d1d9]">
                    3.0 <SupportBadge supported={sdk.stas30} />
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">{sdk.description}</p>
              {sdk.capabilities && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-2">Key Capabilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#c9d1d9] ml-1">
                    {sdk.capabilities.map((cap) => (
                      <li key={cap}>{cap}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-3">
                {sdk.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#58a6ff] hover:text-white transition-colors"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legacy SDK Details */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Legacy SDKs</h2>
        <p className="text-sm text-[#8b949e] mb-6">These SDKs support Gen1 and/or Gen2 templates only. They do not support 3.0.</p>
        <div className="space-y-6">
          {legacySdks.map((sdk) => (
            <div key={sdk.name} className="p-5 bg-[#0d1117] border border-[#21262d] rounded-lg opacity-80">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white">{sdk.name}</h3>
                  <span className="text-xs font-medium text-[#8b949e] bg-[#21262d] px-2 py-0.5 rounded-full">Legacy</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-[#c9d1d9]">
                    Gen1 <SupportBadge supported={sdk.gen1} />
                  </span>
                  <span className="text-xs text-[#c9d1d9]">
                    Gen2 <SupportBadge supported={sdk.gen2} />
                  </span>
                  <span className="text-xs text-[#c9d1d9]">
                    3.0 <SupportBadge supported={sdk.stas30} />
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">{sdk.description}</p>
              {sdk.capabilities && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-2">Key Capabilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#c9d1d9] ml-1">
                    {sdk.capabilities.map((cap) => (
                      <li key={cap}>{cap}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-3">
                {sdk.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#58a6ff] hover:text-white transition-colors"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </DocsLayout>
  )
}
