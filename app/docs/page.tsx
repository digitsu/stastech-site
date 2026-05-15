/**
 * app/docs/page.tsx
 *
 * Documentation overview page — entry point for the /docs section.
 * Describes the STAS protocol, token lifecycle, locking script structure,
 * spending types, fee handling, and architecture overview.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Technical documentation for the STAS token protocol on Bitcoin (SV).',
  alternates: { canonical: '/docs' },
}

const stas30Template = {
  name: 'STAS 3.0',
  href: '/docs/stas',
  description:
    'The current STAS token template. Divisible data-carrying tokens with administrative controls, multi-sig authority, and structured action data. Suitable for compliance-regulated assets and general-purpose tokenization.',
  badge: 'STAS 3.0 — Current',
}

/** DocsIndex — protocol documentation landing page. */
export default function DocsIndex() {
  return (
    <DocsLayout
      title="STAS Protocol Documentation"
      description="STAS — Tokenization Architecture for Satoshis"
    >
      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What is STAS?</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          STAS is a token protocol built natively on Bitcoin (SV) (Bitcoin Satoshi Vision). It enables the creation,
          issuance, and management of tokens using Bitcoin&apos;s native scripting capabilities — no sidechains,
          no bridges, no wrapping. Every STAS token is a standard Bitcoin UTXO with an embedded locking script
          that enforces token rules at the protocol level.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed">
          The protocol uses <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">OP_PUSH_TX</code> for
          trustless on-chain validation, meaning token operations are verified by miners without requiring
          any external oracle or indexer for correctness.
        </p>
      </section>

      {/* Token Templates by Generation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Token Templates</h2>

        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#58a6ff] mb-4">STAS 3.0 — Current</h3>
        <Link href={stas30Template.href} className="block p-6 bg-[#0d1117] border-2 border-[#58a6ff]/40 rounded-lg hover:border-[#58a6ff] transition-colors group">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-[#58a6ff] transition-colors">
              {stas30Template.name}
            </h3>
            <span className="text-xs font-semibold text-[#58a6ff] bg-[#58a6ff]/10 px-3 py-1 rounded-full border border-[#58a6ff]/30">
              {stas30Template.badge}
            </span>
          </div>
          <p className="text-sm text-[#c9d1d9]">{stas30Template.description}</p>
        </Link>
      </section>

      {/* SDK Reference */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">SDK Reference</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          STAS is implemented across four SDKs covering Rust, Elixir, TypeScript, and JavaScript. Each provides
          factory functions for building token transactions.
        </p>
        <Link href="/docs/sdks" className="inline-flex items-center gap-2 text-[#58a6ff] hover:text-white font-medium text-sm transition-colors">
          View SDK comparison &amp; links →
        </Link>
      </section>

      {/* Token Lifecycle */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Token Lifecycle</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-6">
          Every STAS token follows the same high-level lifecycle, regardless of which template is used:
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['Contract', 'Issue', 'Transfer / Split / Merge / Swap', 'Redeem'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#58a6ff]/10 text-[#58a6ff] text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-white">{step}</span>
              {i < 3 && <span className="text-[#30363d] text-lg">→</span>}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">1. Contract</h3>
            <p className="text-sm text-[#c9d1d9]">
              Define the token&apos;s properties — symbol, total supply, decimals, and the redemption
              address (the issuer&apos;s key that can later burn tokens). The contract also configures
              optional capabilities via <strong className="text-white">flags</strong>: freezability,
              confiscatability, and their respective authority addresses.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">2. Issue</h3>
            <p className="text-sm text-[#c9d1d9]">
              Mint tokens by spending the contract UTXO. This creates one or more token UTXOs, each
              containing satoshis that represent the token value and a locking script that enforces
              STAS protocol rules. Issuance and redemption addresses support both P2PKH (single key)
              and{' '}
              <Link href="/docs/stas#p2mpkh" className="text-[#58a6ff] hover:text-white transition-colors">P2MPKH</Link>{' '}
              (multisig) formats.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">3. Transfer / Split / Merge / Swap</h3>
            <p className="text-sm text-[#c9d1d9]">
              Move tokens between owners. <strong className="text-white">Transfer</strong> moves an entire
              UTXO. <strong className="text-white">Split</strong> divides a UTXO into multiple outputs.{' '}
              <strong className="text-white">Merge</strong> combines two UTXOs of the same token into
              one. <strong className="text-white">Swap</strong> enables{' '}
              <Link href="/docs/swap" className="text-[#58a6ff] hover:text-white transition-colors">divisible atomic exchange</Link>{' '}
              between two different token types on-chain.
              Every operation is validated on-chain by the locking script — no external oracle required.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">4. Redeem</h3>
            <p className="text-sm text-[#c9d1d9]">
              Burn tokens by sending them to the redemption address specified at contract creation.
              The redeemed tokens are permanently removed from circulation.
            </p>
          </div>
        </div>
      </section>

      {/* Script Structure */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Locking Script Structure</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Every STAS locking script contains a common set of structural fields. Understanding these
          fields is essential for working with the protocol at the transaction level.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Variable Field 1 — Owner Address / MPKH</h3>
            <p className="text-sm text-[#c9d1d9]">
              The first 20 bytes of the script body. Contains the public key hash (P2PKH) or the multisig
              script hash (P2MPKH) of the current token owner. To skip ownership verification (e.g. for
              permissionless swaps), set this to the hash of an empty
              string: <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">b472a266d0bd89c13706a4132ccfb16f7c3b9fcb</code>.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Variable Field 2 — Action Data</h3>
            <p className="text-sm text-[#c9d1d9]">
              A variable-length field immediately following the owner address. Its first byte is
              an <strong className="text-white">action identifier</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#c9d1d9] ml-2 mt-2">
              <li><code className="text-[#58a6ff] bg-[#161b22] px-1 rounded">0</code> — plain data (no special action)</li>
              <li>
                <code className="text-[#58a6ff] bg-[#161b22] px-1 rounded">1</code> — {' '}
                <Link href="/docs/swap" className="text-[#58a6ff] hover:text-white transition-colors">divisible swap configuration</Link>{' '}
                (exchange rate, requested asset, receive address)
              </li>
              <li><code className="text-[#58a6ff] bg-[#161b22] px-1 rounded">2</code> — frozen UTXO designation</li>
            </ul>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Redemption PKH + Flags + Service Fields</h3>
            <p className="text-sm text-[#c9d1d9]">
              After the core script logic, embedded data
              includes: the <strong className="text-white">redemption address</strong> (token identity),
              an optional <strong className="text-white">flags field</strong> configuring freeze/confiscation
              capabilities, and <strong className="text-white">service fields</strong> containing the authority
              addresses for each enabled flag. See{' '}
              <Link href="/docs/stas#flags" className="text-[#58a6ff] hover:text-white transition-colors">Flags &amp; Administrative Controls</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Unlocking Script & Spending Types */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Spending Types</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Every STAS unlocking script includes a <strong className="text-white">spending-type parameter</strong> that
          tells the locking script which operation is being performed:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Value</th>
                <th className="text-left py-2 text-[#8b949e] font-medium">Operation</th>
                <th className="text-left py-2 pl-4 text-[#8b949e] font-medium">Authorization</th>
              </tr>
            </thead>
            <tbody className="text-[#c9d1d9]">
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">1</code></td>
                <td className="py-2">Regular spending (transfer, split, merge, redeem)</td>
                <td className="py-2 pl-4">Owner signature</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">2</code></td>
                <td className="py-2">Freeze / Unfreeze</td>
                <td className="py-2 pl-4">Freeze authority signature</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">3</code></td>
                <td className="py-2">Confiscation</td>
                <td className="py-2 pl-4">Confiscation authority signature</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">4</code></td>
                <td className="py-2">Swap cancellation</td>
                <td className="py-2 pl-4">Maker&apos;s receive-address signature</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Fee Handling */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Fee Handling</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          STAS token UTXOs carry satoshis that represent the token value — those satoshis cannot be used
          to pay mining fees without breaking the token&apos;s conservation rules. Instead, every STAS
          transaction requires a separate <strong className="text-white">funding UTXO</strong> (a standard
          P2PKH output) that covers the mining fee.
        </p>
        <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg mb-4">
          <p className="text-sm text-[#c9d1d9]">
            <strong className="text-white">Transaction structure:</strong> Token input(s) + Funding input →
            Token output(s) + Optional note output + Fee change output
          </p>
        </div>
        <p className="text-[#c9d1d9] leading-relaxed">
          The locking script enforces a strict conservation check: the sum of token satoshis in the outputs
          must equal the sum of token satoshis in the inputs. The funding input covers the difference, and
          any remaining satoshis from the funding input are returned as a standard P2PKH change output.
          SDKs handle funding UTXO selection and change calculation automatically.
        </p>
      </section>

      {/* Note Output */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Data Note Output</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Any STAS transaction may include an optional <strong className="text-white">data-only note
          output</strong> as the last output in the transaction. This output uses{' '}
          <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">OP_FALSE OP_RETURN</code>{' '}
          followed by up to 65,533 bytes of arbitrary data. The note carries zero satoshis and is
          provably unspendable.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed">
          Use cases include audit trails, compliance metadata, legal references, or any application-specific
          data that should be permanently recorded alongside the token operation.
          When no note is needed, the unlocking script passes <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">OP_FALSE</code> to
          indicate its absence.
        </p>
      </section>

      {/* Architecture Overview */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Architecture Overview</h2>
        <div className="space-y-4 text-[#c9d1d9] leading-relaxed">
          <p>
            All STAS tokens share a common architecture:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-[#c9d1d9] ml-2">
            <li>
              <strong className="text-white">Contract TX</strong> — defines token properties (symbol, supply, redemption address, flags)
            </li>
            <li>
              <strong className="text-white">Issue TX</strong> — mints tokens from a contract, creating the first UTXO(s); supports P2PKH and P2MPKH
            </li>
            <li>
              <strong className="text-white">Transfer / Split / Merge</strong> — move tokens between owners while preserving on-chain validation
            </li>
            <li>
              <strong className="text-white">Divisible Swap</strong> — {' '}
              <Link href="/docs/swap" className="text-[#58a6ff] hover:text-white transition-colors">on-chain atomic exchange</Link>{' '}
              with exchange-rate enforcement, enabling L1 P2P order books
            </li>
            <li>
              <strong className="text-white">Freeze / Unfreeze / Confiscation</strong> — optional administrative controls, configured at issuance via flags
            </li>
            <li>
              <strong className="text-white">Redeem</strong> — burns tokens by sending them back to the redemption address
            </li>
            <li>
              <strong className="text-white">Bundle Factory</strong> — a higher-level SDK abstraction
              that automatically plans sequences of merge, split, and transfer transactions to fulfill
              multi-recipient payouts from a wallet&apos;s UTXO set
            </li>
          </ul>
          <p>
            Each template extends this base with additional capabilities. STAS 3.0 (the current template) adds
            multi-sig administrative authority and structured action data. Token provenance and authenticity
            are verified by running a standalone indexer — such as{' '}
            <Link href="/docs/athanor" className="text-[#58a6ff] hover:text-white transition-colors">Athanor</Link>{' '}
            or{' '}
            <Link href="/docs/consigliere" className="text-[#58a6ff] hover:text-white transition-colors">Consigliere</Link>{' '}
            — that traces the full token chain to the original issuance.
          </p>
        </div>
      </section>
    </DocsLayout>
  )
}
