/**
 * app/docs/stas/page.tsx
 *
 * STAS Standard Template documentation page. Covers P2MPKH multisig,
 * structured action data (var2), token identity (protoID), divisible swap,
 * optional freeze/confiscation, Bundle Factory, and OP_PUSH_TX on-chain
 * validation.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'STAS Standard Template',
  description: 'STAS 3.0 protocol features — P2MPKH multisig, structured action data (var2), token identity (protoID), divisible swap, optional freeze/confiscation, Bundle Factory, and OP_PUSH_TX on-chain validation.',
  alternates: { canonical: '/docs/stas' },
}

/** StasDocs — detailed reference for the STAS 3.0 standard template. */
export default function StasDocs() {
  return (
    <DocsLayout
      title="STAS Standard Template"
      description="The STAS 3.0 protocol — fungible tokens with OP_PUSH_TX on-chain validation"
    >
      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The STAS standard template is the foundational token type. It enables fungible tokens on Bitcoin (SV) where
          every operation is validated on-chain using <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">OP_PUSH_TX</code> —
          the spending transaction&apos;s preimage is pushed onto the stack and verified against the UTXO&apos;s
          locking script, ensuring only valid token operations are accepted by miners.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The current version (STAS 3.0) introduces multisig ownership (P2MPKH), optional freeze/confiscation
          capabilities, divisible on-chain swaps with exchange-rate enforcement, and per-transaction data note
          outputs. STAS 3.0 finalizes the protocol around two emphases beyond the base template: a{' '}
          <strong className="text-white">structured 2nd variable field (var2)</strong> that carries swap
          descriptors, frozen markers, or owner-defined data per spend, and a set of{' '}
          <strong className="text-white">compliance-flagged service fields</strong> (freeze authority,
          confiscation authority) that issuers commonly need for regulated assets.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Designed for stablecoins, securities, and regulated assets where issuers need predictable
          authority addresses, deterministic swap rules, and an immutable token-ID anchored to the
          issuer&apos;s redemption address.
        </p>
        <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg">
          <p className="text-sm text-[#c9d1d9]">
            Read the finalized v0.2.1 protocol document:{' '}
            <Link href="/docs/spec" className="text-[#58a6ff] hover:text-white transition-colors font-medium">STAS 3.0 Specification (v0.2.1)</Link>.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Stablecoins', desc: 'Fiat-backed tokens with multi-sig governance and full audit trail' },
            { label: 'Securities', desc: 'Tokenized equity or debt instruments with regulatory oversight' },
            { label: 'Regulated Assets', desc: 'Any asset requiring formalized authority and compliance records' },
          ].map((item) => (
            <div key={item.label} className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg text-center">
              <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">{item.label}</h3>
              <p className="text-xs text-[#8b949e]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* P2MPKH */}
      <section id="p2mpkh" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">P2MPKH — Multisig Ownership</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          STAS introduces <strong className="text-white">Pay-to-Multiple-Public-Key-Hash (P2MPKH)</strong>,
          a new spending format that extends P2PKH to support m-of-n multisig ownership while preserving
          the privacy and security benefits of hashing. The full multisig script remains hidden until
          spending, providing better privacy and an additional cryptographic layer compared to bare multisig.
        </p>

        {/* Comparison grid */}
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#3fb950] mb-2">P2PKH (Single Key)</h3>
            <p className="text-xs text-[#c9d1d9] mb-2">
              Standard single-signature ownership. The locking script contains the HASH160 of the
              owner&apos;s compressed public key (20 bytes).
            </p>
            <div className="mt-2 p-2 bg-[#161b22] rounded text-xs font-mono text-[#8b949e]">
              <div className="text-[#3fb950]">Locking: HASH160(pubkey) → 20 bytes</div>
              <div className="text-[#58a6ff] mt-1">Unlock: &lt;sig&gt; &lt;pubkey&gt;</div>
            </div>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/40 rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-2">P2MPKH (Multisig)</h3>
            <p className="text-xs text-[#c9d1d9] mb-2">
              The locking script contains the HASH160 of the raw multisig script — the <strong className="text-white">MPKH</strong>.
              Up to 5 public keys with m-of-n threshold. The full multisig script is only revealed at spend time.
            </p>
            <div className="mt-2 p-2 bg-[#161b22] rounded text-xs font-mono text-[#8b949e]">
              <div className="text-[#3fb950]">Locking: HASH160(multisig_script) → 20 bytes</div>
              <div className="text-[#58a6ff] mt-1">Unlock: &lt;sig₁&gt; … &lt;sigₘ&gt; &lt;multisig_script&gt;</div>
            </div>
          </div>
        </div>

        {/* Auto-detection */}
        <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg mb-6">
          <h3 className="text-sm font-semibold text-white mb-2">Auto-Detection</h3>
          <p className="text-sm text-[#c9d1d9]">
            The STAS locking script auto-detects which format is being used at spend time: if the
            unlocking data (the &ldquo;public key&rdquo; slot) is exactly <strong className="text-white">33 bytes</strong> (a
            single compressed public key), it runs standard P2PKH verification. Otherwise, it treats
            the data as a serialized multisig script, verifies that its HASH160 matches the stored MPKH,
            then evaluates the embedded <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_CHECKMULTISIG</code> with
            the provided threshold signatures.
          </p>
        </div>

        {/* Scope */}
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          P2MPKH applies to <strong className="text-white">all address fields</strong> in the protocol:
          token ownership, issuance, redemption, freeze authority, and confiscation authority can all be
          either P2PKH or P2MPKH. The 20-byte hash stored in the locking script is identical in size
          regardless of format — the only difference is what the hash commits to.
        </p>
      </section>

      {/* MultisigScript Format */}
      <section id="multisig-script" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">P2MPKH Redemption Script Body</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The P2MPKH redemption script is a fixed <strong className="text-white">70-byte</strong>{' '}
          <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_SPLIT</code>-based
          body that supports up to 5 public keys with an m-of-n threshold. It is used as an explicit
          locking-script template only at issuance and redemption outputs; in-life STAS UTXOs inline the
          same logic inside the engine and never carry the body verbatim.
        </p>

        {/* Script layout (asm) */}
        <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg mb-4 overflow-x-auto">
          <pre className="text-sm font-mono text-[#c9d1d9] whitespace-pre">
{`OP_DUP OP_HASH160 <MPKH:20> OP_EQUALVERIFY
OP_SIZE 0x21 OP_EQUAL OP_IF
  OP_CHECKSIG
OP_ELSE
  OP_1 OP_SPLIT
  (OP_1 OP_SPLIT OP_IFDUP OP_IF OP_SWAP OP_SPLIT OP_ENDIF) × 5
  OP_CHECKMULTISIG
OP_ENDIF`}
          </pre>
        </div>

        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Hex serialization (with <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">&lt;MPKH&gt;</code>{' '}
          substituted in):
        </p>
        <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-[#c9d1d9] whitespace-pre">
{`76a914 <MPKH:20> 88 82 01 21 87 63 ac 67
51 7f
51 7f 73 63 7c 7f 68
51 7f 73 63 7c 7f 68
51 7f 73 63 7c 7f 68
51 7f 73 63 7c 7f 68
51 7f 73 63 7c 7f 68
ae 68    # total = 70 bytes`}
          </pre>
        </div>

        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The size-21 (0x21) branch handles the single-sig path: a 33-byte compressed pubkey is supplied,
          the body falls through to <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_CHECKSIG</code>,
          and the spend is on-chain indistinguishable from a P2PKH spend. Anything other than 33 bytes in
          that slot triggers the <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_SPLIT</code>{' '}
          chain, which dismantles the supplied <em>redeem buffer</em> into m, the n public keys, and n, then
          drives <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_CHECKMULTISIG</code>.
        </p>

        <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg mb-4">
          <h3 className="text-sm font-semibold text-white mb-2">Redeem buffer (multisig path)</h3>
          <p className="text-sm text-[#c9d1d9] mb-2">
            The unlock-side data the engine HASH160s — what the body splits — is laid out as raw bytes,
            <strong className="text-white"> not</strong> Script opcodes:
          </p>
          <pre className="text-xs font-mono text-[#c9d1d9] whitespace-pre overflow-x-auto">
{`[m: 1 byte raw, 1..5]
[0x21][pk₁: 33 B]
…
[0x21][pkₙ: 33 B]
[n: 1 byte raw, 1..5]

length = 2 + 34·n   ;   n ≤ 5`}
          </pre>
          <p className="text-sm text-[#c9d1d9] mt-2">
            m and n are written as <strong className="text-white">raw bytes</strong>, not as{' '}
            <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_m</code>/<code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_n</code>{' '}
            opcodes, and there is no trailing{' '}
            <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_CHECKMULTISIG</code>{' '}
            — that opcode is supplied by the locking body itself.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">MPKH Computation</h3>
            <p className="text-sm text-[#c9d1d9]">
              The <strong className="text-white">MPKH</strong> (Multiple Public Key Hash) is computed
              as <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">HASH160(redeem_buffer)</code> — the
              same RIPEMD160(SHA256(…)) used for P2PKH addresses. This produces a 20-byte hash that
              is stored in the locking script&apos;s owner field, making P2PKH and P2MPKH outputs
              indistinguishable on-chain until the UTXO is spent.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Script Sizes</h3>
            <p className="text-sm text-[#c9d1d9] mt-2">
              The P2MPKH redemption-script body is a fixed{' '}
              <strong className="text-white">70 bytes</strong> regardless of n (1..5). The redeem
              buffer the unlocking script pushes is{' '}
              <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">2 + 34·n</code>{' '}
              bytes. Total unlock size for the multisig path is approximately:
            </p>
            <pre className="text-xs font-mono text-[#c9d1d9] whitespace-pre mt-2 overflow-x-auto">
{`unlock_bytes ≈ 1 (OP_0 dummy)
             + m × 73       (DER signatures with sighash byte)
             + (2 + 34·n)   (redeem buffer)
             + push overhead`}
            </pre>
            <p className="text-xs text-[#8b949e] mt-2">
              Worked examples (push overhead ≈ 2 bytes): 1-of-1 ≈ 113 B unlock; 2-of-3 ≈ 253 B unlock;
              3-of-5 ≈ 393 B unlock. The locking-script body itself stays fixed at 70 B; only the
              unlocking script grows with m and n.
            </p>
          </div>
        </div>

        {/* Unlocking script formats */}
        <h3 className="text-base font-semibold text-white mb-3">Unlocking Script Formats</h3>
        <div className="space-y-4 mb-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h4 className="text-sm font-semibold text-[#3fb950] mb-2">P2PKH Unlock (standard)</h4>
            <pre className="text-xs font-mono text-[#8b949e]">&lt;DER_sig ‖ sighash_byte&gt; &lt;compressed_pubkey_33bytes&gt;</pre>
            <p className="text-xs text-[#c9d1d9] mt-1">
              The STAS script sees 33 bytes in the public key slot → runs P2PKH verification.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg">
            <h4 className="text-sm font-semibold text-[#58a6ff] mb-2">P2MPKH Unlock (multisig)</h4>
            <pre className="text-xs font-mono text-[#8b949e]">OP_0 &lt;sig₁ ‖ flag&gt; &lt;sig₂ ‖ flag&gt; … &lt;sigₘ ‖ flag&gt; &lt;redeem_buffer&gt;</pre>
            <p className="text-xs text-[#c9d1d9] mt-1">
              The STAS script (or the standalone P2MPKH body at issuance/redemption) sees a redeem
              buffer in place of a 33-byte pubkey, HASH160s it, verifies it matches the stored MPKH,
              splits the buffer to recover m, the n public keys, and n, then runs{' '}
              <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_CHECKMULTISIG</code>.
              The leading <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_0</code>{' '}
              is the standard <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_CHECKMULTISIG</code>{' '}
              off-by-one dummy — STAS 3.0 v0.2.1 mandates it.
            </p>
          </div>
        </div>
      </section>

      {/* Signature-Suppression Mode */}
      <section className="mb-10">
        <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg">
          <h3 className="text-sm font-semibold text-[#58a6ff] mb-2">Signature-Suppression Mode</h3>
          <p className="text-sm text-[#c9d1d9]">
            Setting the owner field to{' '}
            <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">EMPTY_HASH160</code> ={' '}
            <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">b472a266…9fcb</code>{' '}
            (HASH160 of the empty string) instructs the engine to accept{' '}
            <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_FALSE</code>{' '}
            in place of both signature and pubkey/redeem-buffer for that party — all ECDSA checks are
            skipped. Used to mark a swap as <em>arbitrator-free</em> on that leg, and as a general
            &ldquo;no-auth&rdquo; sentinel on any owner field.
          </p>
        </div>
      </section>

      {/* SDK Support */}
      <section id="p2mpkh-sdk" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">SDK Support</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          P2MPKH is supported across all STAS SDKs. The core types and factory plumbing handle
          automatic dispatch between P2PKH and P2MPKH signing based on the signing key provided.
        </p>

        <div className="space-y-4">
          {/* Rust */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#f97316] mb-2">Rust (bsv-sdk-rust)</h3>
            <div className="space-y-2 text-xs text-[#c9d1d9]">
              <p>
                <code className="text-[#58a6ff]">bsv_transaction::template::p2mpkh::MultisigScript</code> — construct,
                serialize, parse, compute MPKH
              </p>
              <p>
                <code className="text-[#58a6ff]">bsv_tokens::types::SigningKey</code> — <code className="text-[#c9d1d9]">Single(PrivateKey)</code> |{' '}
                <code className="text-[#c9d1d9]">Multi {'{'} private_keys, multisig {'}'}</code>
              </p>
              <p>
                <code className="text-[#58a6ff]">bsv_tokens::types::OwnerAddress</code> — <code className="text-[#c9d1d9]">Address(Address)</code> |{' '}
                <code className="text-[#c9d1d9]">Mpkh([u8; 20])</code>
              </p>
              <p>
                Factories accept <code className="text-[#58a6ff]">Payment {'{'} signing_key: SigningKey {'}'}</code> and
                auto-dispatch P2PKH vs P2MPKH signing.
              </p>
            </div>
          </div>

          {/* Elixir */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#a855f7] mb-2">Elixir (bsv_sdk_elixir)</h3>
            <div className="space-y-2 text-xs text-[#c9d1d9]">
              <p>
                <code className="text-[#58a6ff]">BSV.Transaction.P2MPKH</code> — <code className="text-[#c9d1d9]">new_multisig/2</code>,{' '}
                <code className="text-[#c9d1d9]">mpkh/1</code>,{' '}
                <code className="text-[#c9d1d9]">to_script_bytes/1</code>,{' '}
                <code className="text-[#c9d1d9]">from_script_bytes/1</code>
              </p>
              <p>
                <code className="text-[#58a6ff]">BSV.Tokens.SigningKey</code> — <code className="text-[#c9d1d9]">{'{'}:single, key{'}'}</code> |{' '}
                <code className="text-[#c9d1d9]">{'{'}:multi, keys, multisig{'}'}</code>
              </p>
              <p>
                <code className="text-[#58a6ff]">BSV.Tokens.OwnerAddress</code> — <code className="text-[#c9d1d9]">{'{'}:address, string{'}'}</code> |{' '}
                <code className="text-[#c9d1d9]">{'{'}:mpkh, &lt;&lt;_::160&gt;&gt;{'}'}</code>
              </p>
              <p>
                Backward compatible — <code className="text-[#58a6ff]">Payment</code> and <code className="text-[#58a6ff]">TokenInput</code> accept
                both <code className="text-[#c9d1d9]">private_key:</code> (legacy) and <code className="text-[#c9d1d9]">signing_key:</code> (new).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locking Script Structure */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Locking Script Structure</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The STAS locking script contains two variable fields at the very start, followed by the
          core validation logic and trailing metadata:
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Variable Field 1 — Owner Address / MPKH</h3>
            <p className="text-sm text-[#c9d1d9]">
              Fixed 20 bytes. The HASH160 of the owner&apos;s public key (P2PKH) or multisig script (P2MPKH).
              Set to <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">b472a266...9fcb</code> (hash
              of empty string) to skip ownership verification — useful for permissionless swaps.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Variable Field 2 — Action Data</h3>
            <p className="text-sm text-[#c9d1d9] mb-2">
              Variable length, immediately following field 1. Always present (use{' '}
              <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_0</code> when
              unused). Must be a single data push. The first byte of the pushed data is the action identifier:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#c9d1d9] ml-2 mb-3">
              <li><code className="text-[#58a6ff]">0</code> — plain data, no special action</li>
              <li>
                <code className="text-[#58a6ff]">1</code> — divisible swap configuration (see{' '}
                <Link href="/docs/swap" className="text-[#58a6ff] hover:text-white transition-colors">Divisible Swap</Link>)
              </li>
              <li><code className="text-[#58a6ff]">2</code> — frozen UTXO designation</li>
            </ul>
            <p className="text-sm text-[#c9d1d9] mb-2">
              The push obeys minimal Bitcoin Script push encoding. SDKs and indexers must handle every
              encoding variant to correctly parse STAS locking scripts:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#30363d]">
                    <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Opcode</th>
                    <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Hex</th>
                    <th className="text-left py-2 text-[#8b949e] font-medium">Behaviour</th>
                  </tr>
                </thead>
                <tbody className="text-[#c9d1d9]">
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4">Bare push</td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x01</code>–<code className="text-[#58a6ff]">0x4b</code></td>
                    <td className="py-2">Opcode byte is the data length</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OP_PUSHDATA1</code></td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x4c</code></td>
                    <td className="py-2">1-byte length prefix</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OP_PUSHDATA2</code></td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x4d</code></td>
                    <td className="py-2">2-byte little-endian length prefix</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OP_PUSHDATA4</code></td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x4e</code></td>
                    <td className="py-2">4-byte little-endian length prefix</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OP_0</code></td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x00</code></td>
                    <td className="py-2">Empty/nil action data (standard transfer)</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OP_2</code></td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x52</code></td>
                    <td className="py-2">Frozen marker (specifically the frozen form of an empty push)</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OP_1</code>, <code className="text-[#58a6ff]">OP_3</code>–<code className="text-[#58a6ff]">OP_16</code></td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x51</code>, <code className="text-[#58a6ff]">0x53</code>–<code className="text-[#58a6ff]">0x60</code></td>
                    <td className="py-2">Direct push-value opcodes for small integers</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OP_1NEGATE</code></td>
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">0x4f</code></td>
                    <td className="py-2">Push value -1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-[#0d1117] border border-[#f0883e]/30 rounded-lg">
              <p className="text-sm text-[#c9d1d9] mb-2">
                <strong className="text-[#f0883e]">Frozen marker construction (action <code className="text-[#58a6ff]">0x02</code>):</strong>{' '}
                the bare opcodes <code className="text-[#58a6ff]">OP_1</code>, <code className="text-[#58a6ff]">OP_3</code>–<code className="text-[#58a6ff]">OP_16</code>,
                and <code className="text-[#58a6ff]">OP_1NEGATE</code> are <strong className="text-white">not</strong>{' '}
                interchangeable encodings of the frozen state. The freeze rules are:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-[#c9d1d9] ml-2">
                <li>Empty push (<code className="text-[#58a6ff]">OP_0</code>) → <code className="text-[#58a6ff]">OP_2</code> (<code className="text-[#58a6ff]">0x52</code>)</li>
                <li>Pushdata bytes → prepend <code className="text-[#58a6ff]">0x02</code> to the pushed bytes</li>
                <li><code className="text-[#58a6ff]">OP_1</code>, <code className="text-[#58a6ff]">OP_3</code>–<code className="text-[#58a6ff]">OP_16</code>, <code className="text-[#58a6ff]">OP_1NEGATE</code> → first convert to pushdata form (the value the opcode would push), then prepend <code className="text-[#58a6ff]">0x02</code></li>
              </ul>
              <p className="text-sm text-[#c9d1d9] mt-2">
                Unfreezing strictly reverses the mapping.
              </p>
            </div>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Core Script Logic</h3>
            <p className="text-sm text-[#c9d1d9]">
              The OP_PUSH_TX verification engine: preimage hash reversal, ECDSA signature trick,
              preimage field extraction, output validation loop, and satoshi conservation check.
              This section is identical across all STAS templates.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Trailing Metadata (post-OP_RETURN)</h3>
            <p className="text-sm text-[#c9d1d9]">
              After <code className="text-[#58a6ff] bg-[#161b22] px-1 py-0.5 rounded text-xs">OP_RETURN</code>:
              the 20-byte protoID (redemption address/MPKH, doubles as the token identity), the flags
              field, any conditionally-present service fields (freeze authority, confiscation authority),
              and an optional issuer payload. This region is{' '}
              <strong className="text-white">byte-identical across every spend</strong> of an issuance —
              the engine self-verifies the invariant by inspecting the sighash preimage of the spending
              transaction. Issuance-time configuration lives here; per-spend action lives in var2.
            </p>
          </div>
        </div>
      </section>

      {/* Token Identity (protoID) */}
      <section id="protoid" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Token Identity (protoID)</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Every STAS 3.0 issuance carries a 20-byte{' '}
          <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">protoID</code> stored
          immediately after <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">OP_RETURN</code>.
          It is the HASH160 of the issuer&apos;s redemption address (PKH or MPKH) and acts as a stable,
          immutable fingerprint that identifies the issuance across every UTXO that descends from it.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Per spec §14: if the protoID is changed, the token-ID changes. To issue multiple sub-types
          under the same parent issuance, encode the sub-type inside the optional issuer payload after
          the service fields — never inside protoID itself.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed">
          The protoID also doubles as the redemption target: tokens are burned by spending them to the
          protoID address. Because redemption is a transfer to the protoID rather than a separate
          spend type, only the issuer (the keyholder of the redemption address) can actually destroy
          supply; freeze and confiscation cannot burn.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">How It Works</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          When a token is spent, the unlocking script provides the sighash preimage of the spending
          transaction along with authorization parameters. The locking script verifies:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#c9d1d9] ml-2 mb-4">
          <li>The preimage is authentic (via the ECDSA signature trick against hardcoded validation pubkeys)</li>
          <li>The spending-type parameter matches the authorization provided</li>
          <li>Output scripts contain valid STAS locking scripts with correct token ID and new owner</li>
          <li>Token satoshis are conserved: the sum of token-input satoshis equals the sum of token-output satoshis (covers single-input spends, splits, and merges)</li>
          <li>The 2nd variable field values in outputs match what was declared in the unlocking script</li>
        </ul>
      </section>

      {/* Operations */}
      <section id="operations" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Operations</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-6">
          When multiple modes appear applicable, the engine resolves them by precedence —{' '}
          <strong className="text-white">Confiscation &gt; Freeze &gt; Swap &gt; Regular spend</strong>.
        </p>
        <div className="space-y-6">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Contract</h3>
            <p className="text-sm text-[#c9d1d9]">
              Creates the token contract defining symbol, total supply, decimals, the redemption address,
              and optional capability flags (freezable, confiscatable). The contract TX output is consumed
              by the Issue operation.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Issue (Two-TX Flow)</h3>
            <p className="text-sm text-[#c9d1d9]">
              STAS 3.0 issuance is a two-transaction flow: the first establishes the token contract
              (protoID, flags, freeze/confiscation authorities, optional issuer payload); the second
              mints the tokens by spending the contract output. The split allows the immutable
              post-OP_RETURN configuration — including any multi-sig authority MPKHs — to be embedded
              before any tokens enter circulation. Issuance creates one or more STAS UTXOs representing
              the issued supply, each locked to the designated initial owner. The issuance and redemption
              addresses support both P2PKH and P2MPKH formats.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Transfer</h3>
            <p className="text-sm text-[#c9d1d9]">
              Moves a token UTXO from one owner to another. The entire UTXO value transfers to the new
              owner. Spending-type: <code className="text-[#58a6ff]">1</code> (regular).
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Split</h3>
            <p className="text-sm text-[#c9d1d9]">
              Divides a single token UTXO into up to 4 outputs — sent to one or more recipients with
              the remainder returned as change. Enables partial-value transfers.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Merge</h3>
            <p className="text-sm text-[#c9d1d9]">
              Combines two token UTXOs into a single output. Both inputs must belong to the same token
              (same token ID). The merged output contains the sum of both input values.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Divisible Swap</h3>
            <p className="text-sm text-[#c9d1d9]">
              Atomic on-chain exchange between two different STAS token types with exchange-rate enforcement.
              Enables L1 P2P order books for true decentralized exchange. See{' '}
              <Link href="/docs/swap" className="text-[#58a6ff] hover:text-white transition-colors font-medium">Divisible Swap</Link>{' '}
              for full details.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Swap Cancellation</h3>
            <p className="text-sm text-[#c9d1d9]">
              spendType <code className="text-[#58a6ff]">4</code>. Withdraws a standing swap offer.
              The input must carry a swap descriptor (action{' '}
              <code className="text-[#58a6ff]">0x01</code>) in var2; produces a single output whose
              owner equals the descriptor&apos;s <code className="text-[#58a6ff]">receiveAddr</code>;
              authorization must validate under that same address (P2PKH or P2MPKH). A cancellation
              cannot be combined with an executing swap in the same transaction.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-base font-semibold text-[#58a6ff] mb-2">Redeem</h3>
            <p className="text-sm text-[#c9d1d9]">
              Burns tokens by transferring them to the redemption address specified in the contract.
              The redeemed tokens are permanently removed from circulation.
            </p>
          </div>
        </div>
      </section>

      {/* Flags */}
      <section id="flags" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Flags &amp; Administrative Controls</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          STAS tokens support optional administrative capabilities that are <strong className="text-white">configured
          at issuance</strong> via a flags field in the trailing metadata. Once set, these flags cannot be
          changed. If no flags are set, the token has no administrative controls — it is purely owner-governed.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Bit</th>
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Flag</th>
                <th className="text-left py-2 text-[#8b949e] font-medium">Effect</th>
              </tr>
            </thead>
            <tbody className="text-[#c9d1d9]">
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">0</code> (rightmost)</td>
                <td className="py-2 pr-4 text-white font-medium">Freezable</td>
                <td className="py-2">Enables freeze/unfreeze operations by a designated authority</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">1</code></td>
                <td className="py-2 pr-4 text-white font-medium">Confiscatable</td>
                <td className="py-2">Enables confiscation by a designated authority</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          When a flag is enabled, the corresponding <strong className="text-white">service field</strong> follows
          the flags field in the trailing metadata, containing the authority address/MPKH for that
          capability. Service fields appear in the opposite order to the flags (right-to-left flags →
          left-to-right service fields).
        </p>

        {/* Freeze */}
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold text-[#f0883e]">Freeze / Unfreeze</h3>
              <span className="text-xs font-medium text-[#f0883e] bg-[#f0883e]/10 px-2 py-0.5 rounded-full">
                Requires freezable flag
              </span>
            </div>
            <p className="text-sm text-[#c9d1d9] mb-2">
              Locks or unlocks a token UTXO, preventing or restoring transferability.
              Spending-type: <code className="text-[#58a6ff]">2</code>. Authorized by the freeze authority address.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#c9d1d9] ml-2">
              <li>Freezing sets the action identifier in the 2nd variable field to <code className="text-[#58a6ff]">2</code></li>
              <li>Unfreezing restores the original value</li>
              <li>Frozen UTXOs cannot be transferred, split, or merged — but can still be confiscated</li>
              <li>Freeze/unfreeze transactions produce exactly one token output (no splitting)</li>
              <li>Both variable fields (owner + action data) must remain identical to the input</li>
            </ul>
          </div>

          {/* Confiscation */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold text-[#f85149]">Confiscation</h3>
              <span className="text-xs font-medium text-[#f85149] bg-[#f85149]/10 px-2 py-0.5 rounded-full">
                Requires confiscatable flag
              </span>
            </div>
            <p className="text-sm text-[#c9d1d9] mb-2">
              Forcibly reassigns token ownership. Spending-type: <code className="text-[#58a6ff]">3</code>.
              Authorized by the confiscation authority address.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#c9d1d9] ml-2">
              <li>No restrictions on output address, 2nd variable field, or number of outputs</li>
              <li>Can reassign and freeze tokens in a single transaction</li>
              <li>Works on frozen UTXOs and swap-configured UTXOs</li>
              <li>Cannot be used to redeem (burn) tokens</li>
              <li>txType is unrestricted under spendType <code className="text-[#58a6ff]">3</code> — confiscation may be carried in any transaction-type slot</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg mt-4">
          <p className="text-sm text-[#c9d1d9]">
            <strong className="text-white">Priority hierarchy:</strong> Confiscation &gt; Freezing &gt; Swap configuration.
            A swap-configured UTXO can be frozen; both frozen and swap-configured UTXOs can be confiscated.
            Neither freezing nor confiscation can redeem tokens.
          </p>
        </div>
      </section>

      {/* Transaction Types */}
      <section id="tx-types" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Transaction Types</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The unlocking script&apos;s <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">txType</code>{' '}
          parameter selects the trailing-parameter shape the engine expects:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Value</th>
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Meaning</th>
                <th className="text-left py-2 text-[#8b949e] font-medium">Trailing parameters</th>
              </tr>
            </thead>
            <tbody className="text-[#c9d1d9]">
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">0</code></td>
                <td className="py-2 pr-4">Regular spend / split / 1-in 1-out</td>
                <td className="py-2">none</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">1</code></td>
                <td className="py-2 pr-4">Atomic swap</td>
                <td className="py-2">counterparty locking script, piece count, length-prefixed piece array (each piece: 1-byte length + body, no separator; max 127 B/piece)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">2</code>–<code className="text-[#58a6ff]">7</code></td>
                <td className="py-2 pr-4">Merge variants (value = piece count)</td>
                <td className="py-2">piece count (matches txType), length-prefixed piece array of that length (each piece: 1-byte length + body, no separator; max 127 B/piece)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#8b949e] mt-3">
          Confiscation is keyed off spendType only and may use <strong className="text-white">any</strong>{' '}
          txType value. Freeze/unfreeze and swap cancellation use txType <code className="text-[#58a6ff]">0</code>.
        </p>
      </section>

      {/* Bundle Factory */}
      <section id="bundle-factory" className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Bundle Factory</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The Bundle Factory is a higher-level abstraction that automatically plans and constructs sequences
          of merge, split, and transfer transactions to fulfill multi-recipient payouts from a wallet&apos;s
          UTXO set. Instead of manually orchestrating individual operations, the Bundle Factory takes a list
          of recipients and amounts, then produces a ready-to-broadcast transaction chain.
        </p>

        <h3 className="text-base font-semibold text-white mb-3">How It Works</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h4 className="text-sm font-semibold text-[#58a6ff] mb-1">1. UTXO Selection</h4>
            <p className="text-sm text-[#c9d1d9]">
              Selects the minimum set of token UTXOs from the wallet that cover the total required
              payout amount.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h4 className="text-sm font-semibold text-[#58a6ff] mb-1">2. Merge Tree</h4>
            <p className="text-sm text-[#c9d1d9]">
              If multiple UTXOs are selected, builds a tree of pairwise merge transactions to consolidate
              them into a single UTXO. Inserts &ldquo;transfer refresh&rdquo; levels every 3 merge levels
              to prevent excessive script depth in the resulting transactions.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h4 className="text-sm font-semibold text-[#58a6ff] mb-1">3. Transfer Planning</h4>
            <p className="text-sm text-[#c9d1d9]">
              Splits the consolidated UTXO across recipients. Each intermediate transaction handles up
              to 3 recipients plus a change output; the final transaction supports up to 4 recipients.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h4 className="text-sm font-semibold text-[#58a6ff] mb-1">4. Fee Chaining</h4>
            <p className="text-sm text-[#c9d1d9]">
              A single funding UTXO chains through all transactions in the bundle. Each transaction&apos;s
              fee change output feeds the next transaction as its fee input, minimizing the number of
              funding UTXOs required.
            </p>
          </div>
        </div>

        <h3 className="text-base font-semibold text-white mt-6 mb-3">Supported Operation Types</h3>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The Bundle Factory supports bundles for <strong className="text-white">transfer</strong>,{' '}
          <strong className="text-white">freeze</strong>, <strong className="text-white">unfreeze</strong>,{' '}
          <strong className="text-white">swap</strong>, and <strong className="text-white">confiscation</strong> operations.
          Optional OP_RETURN notes can be attached to the final transaction in the bundle for additional
          metadata or compliance records.
        </p>
      </section>

      {/* Fee Handling */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Fee Handling</h2>
        <p className="text-[#c9d1d9] leading-relaxed">
          Token satoshis are conserved across inputs and outputs — they cannot pay mining fees. Every
          STAS transaction requires a separate <strong className="text-white">funding UTXO</strong> (standard
          P2PKH) to cover the fee. Any leftover satoshis from the funding input are returned as a P2PKH
          change output. SDKs handle this automatically.
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
