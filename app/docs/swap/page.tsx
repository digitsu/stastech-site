/**
 * app/docs/swap/page.tsx
 *
 * Divisible Swap documentation — UTXO-based atomic swaps with on-chain
 * exchange rate enforcement, enabling L1 P2P order books on Bitcoin (SV).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'Divisible Swap',
  description: 'Divisible UTXO-based atomic swaps with on-chain exchange rate enforcement — enabling L1 P2P order books on Bitcoin (SV).',
  alternates: { canonical: '/docs/swap' },
}

/** SwapDocs — reference for divisible on-chain atomic swap mechanics. */
export default function SwapDocs() {
  return (
    <DocsLayout
      title="Divisible Swap"
      description="On-chain atomic exchange with exchange-rate enforcement"
    >
      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          STAS divisible swap enables <strong className="text-white">atomic on-chain exchange</strong> between
          two different STAS token types. A token holder configures a UTXO for swap by embedding an exchange
          offer in the 2nd variable field of the locking script. Other participants can then take (partially
          or fully) the offered tokens in exchange for the requested asset — all validated on-chain by miners.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed">
          This mechanism enables <strong className="text-white">L1 P2P order books</strong> for true
          decentralized exchange: offers sit on-chain as UTXOs, multiple takers can each take a portion,
          and the exchange rate is enforced by the locking script itself.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">How It Works</h2>
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">1. Maker Configures Offer</h3>
            <p className="text-sm text-[#c9d1d9]">
              The maker creates (or transfers) a token UTXO with the 2nd variable field set to a swap
              configuration: action identifier <code className="text-[#58a6ff]">1</code>, followed by the
              requested asset&apos;s script hash, a receive address, and an exchange rate. The UTXO now sits
              on-chain as a standing offer.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">2. Taker Executes Swap</h3>
            <p className="text-sm text-[#c9d1d9]">
              A taker constructs a transaction with two inputs: the maker&apos;s swap-configured UTXO and the
              taker&apos;s UTXO of the requested asset. The locking script verifies that the outputs satisfy
              the exchange rate and that the maker receives the requested asset at the specified address.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">3. Both Assets Can Split</h3>
            <p className="text-sm text-[#c9d1d9]">
              Both the maker&apos;s and taker&apos;s assets can split during the swap. A swap transaction
              can produce up to <strong className="text-white">4 outputs</strong>: 2 principal legs
              (one per party) plus up to 2 remainder outputs. The taker may take only a portion of
              the offered tokens, and the maker&apos;s remainder stays in a UTXO with the same swap
              configuration — ready for the next taker. Previously only the 2nd input&apos;s asset could
              split; STAS 3.0 now allows both legs to produce remainder outputs in a single transaction.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">4. Maker Cancels (Optional)</h3>
            <p className="text-sm text-[#c9d1d9]">
              The maker can cancel the swap offer at any time by spending the UTXO with
              spending-type <code className="text-[#58a6ff]">4</code>, authorized by the receive address
              specified in the swap configuration. The cancellation transaction cannot also be a swap.
            </p>
          </div>
        </div>
      </section>

      {/* Swap Configuration */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Swap Configuration (2nd Variable Field)</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The swap offer is encoded in the 2nd variable field of the locking script. Its structure:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Offset</th>
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Size</th>
                <th className="text-left py-2 text-[#8b949e] font-medium">Field</th>
              </tr>
            </thead>
            <tbody className="text-[#c9d1d9]">
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">0</code></td>
                <td className="py-2 pr-4">1 byte</td>
                <td className="py-2">Action identifier (<code className="text-[#58a6ff]">0x01</code>)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">1</code></td>
                <td className="py-2 pr-4">32 bytes</td>
                <td className="py-2">SHA256 (single) of the bytes of the requested asset&apos;s script that survive across spends — the fixed engine plus the post-OP_RETURN region (everything after the two leading variable fields)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">33</code></td>
                <td className="py-2 pr-4">20 bytes</td>
                <td className="py-2">Address/MPKH to receive the requested asset</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">53</code></td>
                <td className="py-2 pr-4">8 bytes</td>
                <td className="py-2">Exchange rate — 4 bytes numerator + 4 bytes denominator (little-endian)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">61</code></td>
                <td className="py-2 pr-4">variable</td>
                <td className="py-2">Next var2 value to install on the maker&apos;s remainder UTXO (optional)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[#c9d1d9] leading-relaxed mb-3">
          Minimum size: 61 bytes (single non-recursive swap). The trailing{' '}
          <code className="text-[#58a6ff]">next</code> field is the literal var2 value the engine installs
          on the maker&apos;s remainder UTXO once the swap executes. It may be:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-[#c9d1d9] ml-2 mb-3">
          <li>empty — the remainder reverts to plain data var2;</li>
          <li>another swap descriptor — chains the remainder into the next swap (recursive form);</li>
          <li>a frozen marker (<code className="text-[#58a6ff]">0x02</code> action);</li>
          <li>any other owner-defined data the maker chooses.</li>
        </ul>
        <p className="text-[#c9d1d9] leading-relaxed text-sm">
          When <code className="text-[#58a6ff]">next</code> is itself a swap descriptor, the leading
          action byte (<code className="text-[#58a6ff]">0x01</code>) is{' '}
          <strong className="text-white">dropped</strong> from elements after the top-level — that is
          why the recursive form is described as &ldquo;the same layout, minus the action byte.&rdquo;
          The terminal element in a chain therefore carries only{' '}
          <code className="text-[#58a6ff]">requestedScriptHash</code>,{' '}
          <code className="text-[#58a6ff]">receiveAddr</code>, and the rate fields, with no further{' '}
          <code className="text-[#58a6ff]">next</code>.
        </p>
      </section>

      {/* Exchange Rate */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Exchange Rate Enforcement</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The exchange rate is encoded as a <strong className="text-white">numerator/denominator</strong> pair
          (4 bytes each, little-endian, unsigned). The engine evaluates the rate as a scaled-dividend
          integer division on the 8-byte Bitcoin (SV) value field — multiplication is performed first to scale
          the dividend, preserving precision before truncating division:
        </p>
        <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg mb-4">
          <p className="text-sm text-[#c9d1d9] font-mono">
            A&apos; = (A × rateNumerator) / rateDenominator
          </p>
        </div>
        <p className="text-[#c9d1d9] leading-relaxed mb-4 text-sm">
          <strong className="text-white">A</strong> is the input amount of the wanted asset and{' '}
          <strong className="text-white">A&apos;</strong> is the amount delivered to{' '}
          <code className="text-[#58a6ff]">receiveAddr</code>. All arithmetic is over 8-byte unsigned
          integers; the multiplication-first ordering scales the dividend so that fewer bits are lost
          when the integer division truncates the remainder.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#3fb950] mb-1">Example</h3>
            <p className="text-xs text-[#c9d1d9]">
              Numerator: 39142 (<code className="text-[#58a6ff]">e6980000</code>), Denominator:
              100 (<code className="text-[#58a6ff]">64000000</code>) → exchange rate of 391.42.
              For every 1 unit of the offered asset, the maker expects at least 391.42 units of the
              requested asset.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#f0883e] mb-1">Rate Zero</h3>
            <p className="text-xs text-[#c9d1d9]">
              When <code className="text-[#58a6ff]">rateNumerator == 0</code> the engine skips the rate
              check entirely — the value of <code className="text-[#58a6ff]">rateDenominator</code>{' '}
              is irrelevant in that case. Useful for NFT swaps where a fixed exchange rate
              doesn&apos;t apply: the swap simply requires that the requested asset is present.
            </p>
          </div>
        </div>
      </section>

      {/* Transaction Structure */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Swap Transaction Structure</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          A swap transaction consumes two token inputs (from maker and taker) through the first
          two transaction inputs. The locking script determines output assignment based on the 2nd
          variable field values:
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Output Assignment</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#c9d1d9] ml-2">
              <li>
                <strong className="text-white">Requested asset</strong> — delivered at the output
                matching the <em>initiator&apos;s</em> input index (sent to the initiator&apos;s{' '}
                <code className="text-[#58a6ff]">receiveAddr</code>)
              </li>
              <li>
                <strong className="text-white">Given asset</strong> — delivered at the output matching
                the <em>opposite</em> (counterparty) input index
              </li>
              <li>
                <strong className="text-white">Remainder outputs</strong> — when either leg is only
                partially consumed, the remainder is emitted as an additional STAS output that{' '}
                <strong className="text-white">inherits both the owner field and the var2 field</strong>{' '}
                of the source UTXO. A partially-taken maker offer therefore continues to advertise the
                same swap descriptor and remains takeable for the unmatched balance.
              </li>
            </ul>
            <p className="text-sm text-[#8b949e] mt-2">
              Both remainder outputs are optional. A swap may produce 2, 3, or 4 STAS outputs depending
              on whether each leg splits. Previously only the 2nd input&apos;s asset could split;
              STAS 3.0 supports both-leg splitting.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Counterparty Verification</h3>
            <p className="text-sm text-[#c9d1d9] mb-2">
              The engine reconstructs the counterparty&apos;s preceding transaction in-script to verify
              the asset being offered. The unlocking script supplies, after the swap input&apos;s sighash
              preimage:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#c9d1d9] ml-2">
              <li>the counterparty&apos;s full locking script</li>
              <li>an explicit piece-count value</li>
              <li>the array of pieces that remain after excising the counterparty&apos;s asset script from their preceding transaction</li>
            </ul>
            <p className="text-sm text-[#c9d1d9] mt-2">
              Each piece is supplied as its own <strong className="text-white">separate OP_PUSHDATA
              operation</strong> in the unlocking script — not concatenated into one blob and not framed
              with any inline length prefix. The engine consumes them as separate stack items (using{' '}
              <code className="text-[#58a6ff]">OP_DEPTH</code> with{' '}
              <code className="text-[#58a6ff]">OP_ROLL</code> to pull a variable number of pushes off the
              stack, then <code className="text-[#58a6ff]">OP_CAT</code> them back into the reconstructed
              preceding transaction). There is no per-piece size limit beyond Bitcoin&apos;s standard
              pushdata range. The piece count is passed explicitly; for the merge transaction-types{' '}
              <code className="text-[#58a6ff]">2</code>–<code className="text-[#58a6ff]">7</code>{' '}
              the count equals the merge variant value.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Arbitrator (Optional)</h3>
            <p className="text-sm text-[#c9d1d9]">
              Arbitrator-free status is keyed on the <strong className="text-white">owner field</strong>{' '}
              (1st variable field) of the swap UTXO, not on{' '}
              <code className="text-[#58a6ff]">var2.receiveAddr</code>. If a party requires an
              arbitrator, they set the owner field to the arbitrator&apos;s address/MPKH; that party
              must then sign the swap leg. If no arbitrator is needed, the owner field is set to{' '}
              <code className="text-[#58a6ff]">HASH160(&quot;&quot;)</code> ={' '}
              <code className="text-[#58a6ff]">b472a266…9fcb</code> and the engine accepts{' '}
              <code className="text-[#58a6ff]">OP_FALSE</code> in place of a signature for that leg.
            </p>
          </div>
        </div>
      </section>

      {/* Mutual Swap */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Mutual Swap</h2>
        <p className="text-[#c9d1d9] leading-relaxed">
          If both the maker and taker have UTXOs configured for swap, both locking scripts execute
          and enforce their respective conditions. The transaction constructor (arbitrator, if defined)
          must satisfy both parties&apos; swap configurations — output addresses and exchange rates must
          comply with both sides. This creates a fully trustless bilateral exchange.
        </p>
      </section>

      {/* Cancellation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Swap Cancellation</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The maker can cancel a standing swap offer at any time:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#c9d1d9] ml-2 mb-4">
          <li>Set spending-type to <code className="text-[#58a6ff]">4</code></li>
          <li>Provide authorization (signature) corresponding to the receive address in the swap configuration</li>
          <li>The token is spent back to the same address/MPKH, preserving the script and amount</li>
          <li>A cancellation transaction cannot simultaneously be a swap transaction</li>
        </ul>
      </section>

      {/* Constraints */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Constraints</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#c9d1d9] ml-2">
          <li>Only STAS-format contracts can participate in swaps</li>
          <li>Swaps use the first two transaction inputs</li>
          <li>The unlocking script transaction-type parameter must be <code className="text-[#58a6ff]">1</code> (swap)</li>
          <li>Exchange rate enforcement applies as a lower bound on the ratio</li>
          <li>Swap-configured UTXOs can still be frozen (if the token is freezable) and confiscated (if confiscatable)</li>
          <li>Freeze and confiscation cannot burn (redeem) tokens — supply is destroyed only by spending to the protoID address, which the issuer alone can do after the tokens are returned</li>
        </ul>
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
