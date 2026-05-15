/**
 * app/docs/stas-btg/page.tsx
 *
 * STAS-BTG provenance tracking template documentation. Research-only page
 * covering the motivation, known limitations, operations, and lineage
 * validation approach.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'STAS Provenance Tracking Template',
  description: 'STAS-BTG token template — enhanced provenance tracking with on-chain proof chain to the original issuance.',
  alternates: { canonical: '/docs/stas-btg' },
}

/** StasBtgDocs — STAS-BTG research template reference page. */
export default function StasBtgDocs() {
  return (
    <DocsLayout
      title="STAS Provenance Tracking"
      description="Enhanced provenance tracking — each transfer carries a verifiable proof chain"
    >
      {/* Research-only notice */}
      <section className="mb-10">
        <div className="p-5 bg-[#1a1300] border border-[#d29922]/40 rounded-lg">
          <h3 className="text-base font-semibold text-[#d29922] mb-2">
            Research template — motivation is valid, naive embedding does not scale
          </h3>
          <p className="text-sm text-[#c9d1d9] mb-3">
            The standard STAS locking script enforces per-hop transfer mechanics (P2PKH gate, satoshi
            conservation, output-template propagation) but does <strong className="text-white">not</strong>
            {' '}enforce on-chain that input UTXOs belong to the same issuance pool. The
            {' '}<code className="text-[#58a6ff] bg-[#0d1117] px-1 py-0.5 rounded">protoID</code> bytes after
            {' '}<code className="text-[#58a6ff] bg-[#0d1117] px-1 py-0.5 rounded">OP_RETURN</code> are
            propagated as data, not verified by the script as identical to the input&apos;s protoID across
            merges or substitutions. Pool membership is enforced off-chain by indexers (Athanor /
            Consigliere) refusing to admit forged spends to the valid-UTXO set; that trust assumption
            rests on indexers running the same open-source code and being discoverable. A single-indexer
            regime, or a corrupted indexer state, could let a forged STAS UTXO ride alongside a real one
            in a merge.
          </p>
          <p className="text-sm text-[#c9d1d9] mb-3">
            STAS-BTG&apos;s premise — making provenance script-verifiable rather than indexer-mediated —
            is therefore <strong className="text-white">well-founded</strong>, not redundant. The
            blocker is engineering: embedding the previous transaction grows the spend linearly in
            chain depth, and merges concatenate the ancestor histories of every merged input into the
            resulting UTXO. Repeated merges produce roughly geometric growth in transaction size, which
            makes the naive prev-tx-embedding form impractical for any token that splits and re-merges
            in normal use.
          </p>
          <p className="text-sm text-[#c9d1d9]">
            For production today, use the standard STAS template with indexer-based provenance and accept
            the indexer-trust model. STAS-BTG remains a research reference; the implementation in
            {' '}<code className="text-[#58a6ff] bg-[#0d1117] px-1 py-0.5 rounded">bsv-sdk-rust</code>
            {' '}is incomplete (engine-verify tests fail) and is not maintained for production. A practical
            BTG-class scheme likely needs accumulator-based membership proofs, recursive proof
            composition, or a federated checkpointing layer rather than naive prev-tx embedding — see
            Lineage Validation below.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          STAS-BTG extends the standard STAS template with <strong className="text-white">provenance tracking</strong>.
          Every transfer embeds a reference to the previous transaction in the spending proof, creating an
          on-chain chain of custody that traces back to the original issuance (genesis) transaction.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed">
          This eliminates the need for full ancestor chain traversal when validating token authenticity.
          A verifier can walk the embedded proof chain directly on-chain, confirming that each transfer
          was valid without relying on an external indexer.
        </p>
      </section>

      {/* Key Difference */}
      <section className="mb-10">
        <div className="p-5 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg">
          <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Key Difference from Standard STAS</h3>
          <p className="text-sm text-[#c9d1d9]">
            Standard STAS validates only the <em>current</em> transaction&apos;s structure. STAS-BTG additionally
            verifies the <em>previous</em> transaction on-chain, ensuring continuous provenance. This makes
            Provenance-tracked tokens suitable for high-value assets where full chain-of-custody verification is critical.
          </p>
        </div>
      </section>

      {/* Operations */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Operations</h2>
        <div className="space-y-6">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Transfer</h3>
            <p className="text-sm text-[#c9d1d9]">
              Moves a provenance-tracked token UTXO to a new owner. The unlocking script includes the previous transaction
              data, which the locking script verifies on-chain before allowing the transfer.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Split</h3>
            <p className="text-sm text-[#c9d1d9]">
              Divides a provenance-tracked token UTXO into two outputs while maintaining the provenance chain on both
              resulting UTXOs.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Merge</h3>
            <p className="text-sm text-[#c9d1d9]">
              Combines two provenance-tracked token UTXOs into one. Both inputs must share the same token ID, and
              both provenance chains are verified before merging.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Checkpoint</h3>
            <span className="inline-block text-xs font-medium text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-0.5 rounded-full mb-2">
              BTG Exclusive
            </span>
            <p className="text-sm text-[#c9d1d9]">
              Creates a new verification anchor point. The checkpoint operation re-validates the entire
              provenance chain and produces a fresh starting point, reducing the verification depth for
              subsequent transfers. Useful for long-lived tokens with extensive transfer histories.
            </p>
          </div>
        </div>
      </section>

      {/* Lineage Validation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Lineage Validation</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          SDKs provide a <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">LineageValidator</code> that
          walks the proof chain from a given UTXO to the original issuance. It uses
          a <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">TxFetcher</code> trait/behaviour
          to retrieve ancestor transactions — you provide the implementation (e.g., querying a node or block explorer).
        </p>
        <p className="text-[#c9d1d9] leading-relaxed">
          The validator confirms that every link in the chain contains a valid STAS-BTG locking script
          and that each transaction correctly references its predecessor.
        </p>
      </section>

      {/* SDK Pointer */}
      <section className="mb-10">
        <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg">
          <p className="text-sm text-[#c9d1d9]">
            For SDK-specific usage examples and API details, see the{' '}
            <Link href="/docs/sdks" className="text-[#58a6ff] hover:text-white transition-colors font-medium">SDK Reference</Link>.
          </p>
        </div>
      </section>
    </DocsLayout>
  )
}
