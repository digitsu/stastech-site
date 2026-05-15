/**
 * app/docs/athanor/page.tsx
 *
 * Athanor indexer documentation — Bitcoin (SV) blockchain indexer and wallet
 * backend for STAS tokens, built with Elixir and Phoenix. REST API and
 * WebSocket reference.
 */

import type { Metadata } from 'next'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'Athanor Indexer (Elixir)',
  description:
    'Athanor — Bitcoin (SV) blockchain indexer and wallet backend for STAS tokens, built with Elixir and Phoenix. REST API and WebSocket reference.',
  alternates: { canonical: '/docs/athanor' },
}

/** CodeBlock — renders a pre-formatted code snippet with consistent dark styling. */
function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 overflow-x-auto text-sm text-[#e6edf3] font-mono leading-relaxed">
      {children}
    </pre>
  )
}

/**
 * Endpoint — renders a styled API endpoint with method badge, path, description,
 * and optional request body child content.
 */
function Endpoint({
  method,
  path,
  description,
  children,
}: {
  method: string
  path: string
  description: string
  children?: React.ReactNode
}) {
  const methodColor =
    method === 'GET'
      ? 'bg-green-900/40 text-green-400 border-green-700/40'
      : 'bg-blue-900/40 text-blue-400 border-blue-700/40'

  return (
    <div className="p-5 bg-[#0d1117] border border-[#30363d] rounded-lg mb-4">
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${methodColor}`}
        >
          {method}
        </span>
        <code className="text-sm text-[#58a6ff] font-mono">{path}</code>
      </div>
      <p className="text-sm text-[#c9d1d9] mb-3">{description}</p>
      {children}
    </div>
  )
}

/** AthanorDocs — Athanor Elixir indexer reference page. */
export default function AthanorDocs() {
  return (
    <DocsLayout
      title="Athanor"
      description="The Philosophical Furnace for Bitcoin (SV) &amp; STAS Token Infrastructure"
    >
      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What is Athanor?</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Athanor is an open-source Bitcoin (SV) blockchain indexer and wallet backend built
          with Elixir and the Phoenix framework. Named after the alchemist&apos;s self-feeding
          furnace — &quot;Slow Henry,&quot; the furnace that gives no trouble — it watches
          configured addresses and token IDs, indexes transactions in real-time via Bitcoin (SV) node
          RPC and ZMQ, and exposes a REST API and WebSocket interface for querying balances,
          UTXOs, transaction history, and broadcasting transactions.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Like{' '}
          <a href="/docs/consigliere" className="text-[#58a6ff] hover:text-[#79b8ff] underline">
            Consigliere
          </a>{' '}
          (C# / .NET), Athanor fully resolves <strong className="text-white">token
          provenance</strong> for STAS tokens — tracing each UTXO back to its original issuance
          transaction to verify token authenticity and ownership. It provides a compatible API
          surface with the reliability, concurrency, and fault-tolerance of the BEAM virtual machine.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <a
            href="https://github.com/Bittoku/athanor"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#21262d] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
          >
            GitHub Repository →
          </a>
          <a
            href="/docs/consigliere"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
          >
            Consigliere (C#) →
          </a>
        </div>
      </section>

      {/* Why Elixir */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Why Elixir?</h2>
        <div className="space-y-3">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Fault Tolerance</h3>
            <p className="text-sm text-[#c9d1d9]">
              Built on the BEAM VM with OTP supervision trees. If a ZMQ listener or RPC
              connection crashes, only that process restarts — the rest of the system keeps
              running. No single-threaded event loop to block.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Concurrency</h3>
            <p className="text-sm text-[#c9d1d9]">
              Lightweight Erlang processes handle thousands of concurrent WebSocket connections
              and parallel transaction processing without shared-memory coordination.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Hot Code Upgrades</h3>
            <p className="text-sm text-[#c9d1d9]">
              The BEAM supports hot code reloading — deploy updates without dropping active
              WebSocket connections or interrupting the indexing pipeline.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Native Bitcoin (SV) SDK</h3>
            <p className="text-sm text-[#c9d1d9]">
              Uses the{' '}
              <a href="https://hex.pm/packages/bsv_sdk" target="_blank" rel="noreferrer" className="text-[#a78bfa] hover:text-[#c4b5fd] underline">
                bsv_sdk
              </a>{' '}
              Elixir package for transaction parsing and STAS token classification — pure
              Elixir, no FFI bridges or external runtime dependencies.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Key Features</h2>
        <div className="space-y-3">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Token Provenance Resolution</h3>
            <p className="text-sm text-[#c9d1d9]">
              Fully resolves token provenance by tracing each STAS UTXO back to its original
              genesis (issuance) transaction, ensuring accurate ownership and lineage verification.
              Uses the same provenance resolution methodology as Consigliere.
            </p>
            <p className="text-sm text-[#c9d1d9] mt-2">
              For STAS 3.0 (per spec §5.2.1, §14) the canonical token-ID is the 20-byte{' '}
              <code className="text-[#58a6ff]">protoID</code> stored after{' '}
              <code className="text-[#58a6ff]">OP_RETURN</code>, not the owner PKH. Athanor keys
              STAS 3.0 issuance lookups on protoID; sub-types live inside the optional issuer payload
              rather than collapsing into a different token-ID.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Selective UTXO Indexing</h3>
            <p className="text-sm text-[#c9d1d9]">
              Indexes only explicitly configured addresses and token IDs, avoiding full-chain
              tracking. Reduces infrastructure load, storage requirements, and operational costs.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Dynamic Address Onboarding</h3>
            <p className="text-sm text-[#c9d1d9]">
              Add new addresses and token IDs at runtime via the Admin API without reindexing
              or downtime.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Multiple Transaction Types</h3>
            <p className="text-sm text-[#c9d1d9] mb-2">
              Natively indexes STAS tokens (Gen2 and 3.0 templates) and standard P2PKH transactions,
              enabling unified handling of token-based and native Bitcoin (SV) payment flows. STAS 3.0 spend
              classifications observed:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#c9d1d9] ml-2">
              <li><code className="text-[#58a6ff]">spendType = 1</code> — transfer / split / merge / atomic swap</li>
              <li><code className="text-[#58a6ff]">spendType = 2</code> — freeze / unfreeze</li>
              <li><code className="text-[#58a6ff]">spendType = 3</code> — confiscation</li>
              <li><code className="text-[#58a6ff]">spendType = 4</code> — swap cancellation</li>
            </ul>
            <p className="text-sm text-[#c9d1d9] mt-2">
              Freeze and confiscation authority addresses, swap descriptors, and recursive{' '}
              <code className="text-[#58a6ff]">next</code> chains are surfaced through the API as
              those features land in the indexer (planned alongside SDK v0.2.1 finalization).
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Real-Time Event Streaming</h3>
            <p className="text-sm text-[#c9d1d9]">
              Push-based WebSocket notifications via Phoenix Channels for transaction detection,
              balance changes, and UTXO state updates.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Architecture</h2>
        <div className="space-y-3">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Blockchain Layer</h3>
            <p className="text-sm text-[#c9d1d9]">
              Connects to a Bitcoin (SV) node via JSON-RPC for block/transaction queries and ZMQ for
              real-time notifications of new transactions and blocks. Optionally connects to
              JungleBus for cloud-based transaction streaming.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Indexing Pipeline</h3>
            <p className="text-sm text-[#c9d1d9]">
              Incoming transactions are filtered against watched addresses and token IDs using
              an ETS-backed filter for lock-free concurrent reads. Matching transactions are
              classified by the Bitcoin (SV) SDK&apos;s STAS token parser, and UTXO state is maintained
              in PostgreSQL.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">API Layer</h3>
            <p className="text-sm text-[#c9d1d9]">
              A Phoenix-powered REST API serves address balances, UTXO sets, transaction history,
              and admin operations. A WebSocket (Phoenix Channels) interface provides real-time
              push notifications and wallet operations.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Worker Processes</h3>
            <p className="text-sm text-[#c9d1d9]">
              Background GenServers handle chain tip verification, unconfirmed transaction
              monitoring, missing transaction sync, and STAS attribute observation — all
              supervised independently for fault isolation.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Start</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Athanor requires Elixir 1.15+, Erlang/OTP 26+, and PostgreSQL 14+.
        </p>
        <CodeBlock>{`# Clone the repository
git clone https://github.com/Bittoku/athanor.git
cd athanor

# Install dependencies and set up the database
mix setup

# Start the server (default port 5000)
mix phx.server`}</CodeBlock>
        <p className="text-[#c9d1d9] leading-relaxed mt-4 mb-4">
          Or use Docker Compose:
        </p>
        <CodeBlock>{`# Generate a secret key
export SECRET_KEY_BASE=$(mix phx.gen.secret)

# Start with Docker Compose
docker compose up -d`}</CodeBlock>
        <p className="text-[#c9d1d9] leading-relaxed mt-4">
          Configure the Bitcoin (SV) node connection and network via environment variables:
        </p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Variable</th>
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Default</th>
                <th className="text-left py-2 text-[#8b949e] font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-[#c9d1d9]">
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">NETWORK</code></td>
                <td className="py-2 pr-4">testnet</td>
                <td className="py-2">Bitcoin (SV) network (mainnet or testnet)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">BSV_NODE_RPC_URL</code></td>
                <td className="py-2 pr-4">http://localhost:18332</td>
                <td className="py-2">Bitcoin (SV) node JSON-RPC endpoint</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">BSV_NODE_RPC_USER</code></td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2">RPC username</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">BSV_NODE_RPC_PASSWORD</code></td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2">RPC password</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">ZMQ_RAW_TX</code></td>
                <td className="py-2 pr-4">tcp://localhost:28332</td>
                <td className="py-2">ZMQ endpoint for raw transaction notifications</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">JUNGLE_BUS_ENABLED</code></td>
                <td className="py-2 pr-4">false</td>
                <td className="py-2">Enable JungleBus cloud streaming</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">PORT</code></td>
                <td className="py-2 pr-4">5000</td>
                <td className="py-2">HTTP server port</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">DATABASE_URL</code></td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2">PostgreSQL connection URL (production)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* REST API Reference */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">REST API Reference</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-6">
          All endpoints are under <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">/api</code> and
          return JSON. Default base URL: <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">http://localhost:5000</code>.
          The API is compatible with Consigliere (C# / .NET) — existing clients work without changes.
        </p>

        <h3 className="text-lg font-semibold text-white mb-4 mt-8">Admin Endpoints</h3>

        <Endpoint
          method="POST"
          path="/api/admin/manage/address"
          description="Register an address to watch for incoming/outgoing transactions."
        >
          <p className="text-xs text-[#8b949e] mb-2">Request body:</p>
          <CodeBlock>{`{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "name": "Treasury Wallet"     // optional label
}`}</CodeBlock>
        </Endpoint>

        <Endpoint
          method="GET"
          path="/api/admin/manage/addresses"
          description="List all watched addresses."
        />

        <Endpoint
          method="POST"
          path="/api/admin/manage/stas-token"
          description="Register a STAS token ID to track."
        >
          <p className="text-xs text-[#8b949e] mb-2">Request body:</p>
          <CodeBlock>{`{
  "token_id": "1TokenRedemptionAddr...",
  "symbol": "MYTKN"             // optional symbol
}`}</CodeBlock>
        </Endpoint>

        <Endpoint
          method="GET"
          path="/api/admin/manage/stas-tokens"
          description="List all watched STAS token IDs."
        />

        <Endpoint
          method="GET"
          path="/api/admin/blockchain/sync-status"
          description="Check the indexer's sync status relative to the Bitcoin (SV) node's chain tip."
        />

        <h3 className="text-lg font-semibold text-white mb-4 mt-8">Address Endpoints</h3>

        <Endpoint
          method="GET"
          path="/api/address/:address/balance"
          description="Get the Bitcoin (SV) and token balances for a watched address."
        />

        <Endpoint
          method="GET"
          path="/api/address/:address/utxos"
          description="List unspent transaction outputs for a watched address. Returns both Bitcoin (SV) and STAS token UTXOs."
        />

        <Endpoint
          method="GET"
          path="/api/address/:address/history"
          description="Paginated transaction history for a watched address. Supports skip and take query parameters."
        />

        <h3 className="text-lg font-semibold text-white mb-4 mt-8">Transaction Endpoints</h3>

        <Endpoint
          method="GET"
          path="/api/transaction/:txid"
          description="Look up an indexed transaction by its txid."
        />

        <Endpoint
          method="POST"
          path="/api/transaction/broadcast"
          description="Broadcast a raw transaction to the Bitcoin (SV) network."
        >
          <p className="text-xs text-[#8b949e] mb-2">Request body:</p>
          <CodeBlock>{`{
  "hex": "0100000001..."
}`}</CodeBlock>
        </Endpoint>
      </section>

      {/* WebSocket API */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">WebSocket API</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Athanor exposes a Phoenix Channels WebSocket for real-time wallet operations.
          Connect to <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">ws://localhost:5000/socket/websocket</code> and
          join a wallet topic.
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Topics</h3>
            <ul className="list-disc list-inside text-sm text-[#c9d1d9] ml-2 space-y-1">
              <li><code className="text-[#58a6ff]">wallet:lobby</code> — general wallet operations</li>
              <li><code className="text-[#58a6ff]">wallet:&#123;address&#125;</code> — address-specific subscriptions and push notifications</li>
            </ul>
          </div>

          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Events</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#30363d]">
                    <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Event</th>
                    <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Direction</th>
                    <th className="text-left py-2 text-[#8b949e] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-[#c9d1d9]">
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">subscribe</code></td>
                    <td className="py-2 pr-4">→ server</td>
                    <td className="py-2">Subscribe to address notifications</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">unsubscribe</code></td>
                    <td className="py-2 pr-4">→ server</td>
                    <td className="py-2">Unsubscribe from address notifications</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">get_balance</code></td>
                    <td className="py-2 pr-4">→ server</td>
                    <td className="py-2">Query current balances</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">get_utxo_set</code></td>
                    <td className="py-2 pr-4">→ server</td>
                    <td className="py-2">Query unspent outputs</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">get_history</code></td>
                    <td className="py-2 pr-4">→ server</td>
                    <td className="py-2">Query transaction history</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">broadcast</code></td>
                    <td className="py-2 pr-4">→ server</td>
                    <td className="py-2">Broadcast a raw transaction</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">new_tx</code></td>
                    <td className="py-2 pr-4">← server</td>
                    <td className="py-2">Push: new transaction affecting subscribed address</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="text-[#c9d1d9] leading-relaxed mt-4">
          Example using the Phoenix JavaScript client:
        </p>
        <CodeBlock>{`import { Socket } from "phoenix"

const socket = new Socket("ws://localhost:5000/socket/websocket")
socket.connect()

const channel = socket.channel("wallet:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")

channel.join()
  .receive("ok", () => console.log("Joined wallet channel"))

// Get current UTXOs
channel.push("get_utxo_set", {})
  .receive("ok", ({ utxos }) => console.log("UTXOs:", utxos))

// Broadcast a transaction built with the STAS SDK
channel.push("broadcast", { hex: rawTxHex })
  .receive("ok", ({ txid, status }) => console.log("Broadcast:", txid, status))

// Listen for real-time notifications
channel.on("new_tx", (payload) => {
  console.log("New transaction:", payload)
})`}</CodeBlock>
      </section>

      {/* Tech Stack */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Tech Stack</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Component</th>
                <th className="text-left py-2 text-[#8b949e] font-medium">Technology</th>
              </tr>
            </thead>
            <tbody className="text-[#c9d1d9]">
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Runtime</td>
                <td className="py-2">Elixir 1.15+ / Erlang/OTP 26+</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Web Framework</td>
                <td className="py-2">Phoenix 1.8</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Database</td>
                <td className="py-2">PostgreSQL 14+ (Ecto)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Bitcoin (SV) SDK</td>
                <td className="py-2">bsv_sdk (Hex) — tx parsing, STAS classification</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">ZMQ</td>
                <td className="py-2">chumak (pure Erlang ZMQ)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">HTTP Client</td>
                <td className="py-2">Req (Finch-backed)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Real-time</td>
                <td className="py-2">Phoenix Channels (WebSocket)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Author */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Author</h2>
        <p className="text-[#c9d1d9] leading-relaxed">
          <a href="https://github.com/digitsu" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-[#79b8ff] underline">
            David Chan
          </a>{' '}
          — <a href="https://bittoku.co.jp" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-[#79b8ff] underline">Bittoku</a>
        </p>
      </section>
    </DocsLayout>
  )
}
