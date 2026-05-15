/**
 * app/docs/consigliere/page.tsx
 *
 * Consigliere indexer documentation — high-performance Bitcoin (SV) indexer
 * by DXS for scalable payment processing and real-time UTXO tracking.
 * C# / .NET, RavenDB, SignalR.
 */

import type { Metadata } from 'next'
import DocsLayout from '@/components/docs/DocsLayout'

export const metadata: Metadata = {
  title: 'Consigliere Indexer',
  description:
    'Consigliere — A high-performance Bitcoin (SV) indexer by DXS for scalable payment processing and real-time UTXO tracking. C# / .NET, RavenDB, SignalR.',
  alternates: { canonical: '/docs/consigliere' },
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

/** ConsigliereDocs — Consigliere indexer reference page. */
export default function ConsigliereDocs() {
  return (
    <DocsLayout
      title="Consigliere"
      description="High-Performance Bitcoin (SV) Indexer for Scalable Payment Processing"
    >
      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What is Consigliere?</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Consigliere is a high-performance blockchain indexer for the Bitcoin (SV) network,
          purpose-built by <strong className="text-white">DXS</strong> to handle STAS token
          transactions and fully resolve token provenance. It maintains an accurate,
          real-time state of all STAS token UTXOs by tracing their chain back to the
          original issuance transaction, ensuring reliable token authenticity and ownership verification.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Rather than indexing the entire blockchain, Consigliere uses <strong className="text-white">selective
          UTXO indexing</strong> — monitoring only explicitly configured addresses such as payment,
          settlement, or merchant deposit addresses. This targeted approach significantly reduces
          infrastructure load, storage requirements, and operational costs.
        </p>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          For an Elixir/Phoenix alternative with the same core functionality, see{' '}
          <a href="/docs/athanor" className="text-[#58a6ff] hover:text-[#79b8ff] underline">
            Athanor
          </a>.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <a
            href="https://github.com/dxsapp/dxs-consigliere"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#21262d] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
          >
            GitHub Repository →
          </a>
          <a
            href="https://hub.docker.com/r/dxsapp/consigliere"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#58a6ff] bg-[#21262d] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
          >
            Docker Hub →
          </a>
          <a
            href="/docs/athanor"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
          >
            Athanor (Elixir) →
          </a>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Key Features</h2>
        <div className="space-y-3">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Selective UTXO Indexing</h3>
            <p className="text-sm text-[#c9d1d9]">
              Indexes only explicitly configured addresses (payment, settlement, merchant deposits),
              avoiding full-chain address tracking and significantly reducing infrastructure load
              and operating costs.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">High-Throughput Payment Processing</h3>
            <p className="text-sm text-[#c9d1d9]">
              Designed to handle large volumes of transactions and micro-payments with low latency,
              making it suitable for sustained, high-frequency payment workloads.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Token Provenance Resolution</h3>
            <p className="text-sm text-[#c9d1d9]">
              Fully resolves token provenance by tracing each STAS UTXO back to its original genesis
              transaction, ensuring accurate ownership and lineage verification.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Dynamic Address Onboarding</h3>
            <p className="text-sm text-[#c9d1d9]">
              New addresses can be added at runtime without reindexing or downtime, supporting
              merchant onboarding, address rotation, and scalable payment operations.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Real-Time Event Streaming (SignalR)</h3>
            <p className="text-sm text-[#c9d1d9]">
              Push-based WebSocket notifications for transaction detection, balance changes,
              and UTXO state updates via SignalR, enabling immediate reaction to incoming payments.
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#58a6ff] mb-1">Blockchain Reorganization Safety</h3>
            <p className="text-sm text-[#c9d1d9]">
              Automatically detects and handles chain reorganizations, reindexing affected data
              to maintain a consistent and correct view of the blockchain state.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-10">
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
                <td className="py-2 pr-4">Language</td>
                <td className="py-2">C# (.NET)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Blockchain</td>
                <td className="py-2">Bitcoin (SV)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Database</td>
                <td className="py-2">RavenDB</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4">Real-time</td>
                <td className="py-2">SignalR WebSockets</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Docker Setup */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Docker Setup</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          The quickest way to run Consigliere. Available on{' '}
          <a href="https://hub.docker.com/r/dxsapp/consigliere" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-[#79b8ff] underline">Docker Hub</a>.
        </p>
        <CodeBlock>{`docker run -p 5000:5000 \\
  -e "RavenDb__Urls__0=http://ravendb:8080" \\
  -e "RavenDb__DbName=Consigliere" \\
  -e "BsvNodeApi__BaseUrl=http://your-node:18332" \\
  -e "BsvNodeApi__User=your_user" \\
  -e "BsvNodeApi__Password=your_password" \\
  -e "ZmqClient__RawTx2Address=tcp://your-node:28332" \\
  -e "ZmqClient__RemovedFromMempoolBlockAddress=tcp://your-node:28332" \\
  -e "ZmqClient__DiscardedFromMempoolAddress=tcp://your-node:28332" \\
  -e "ZmqClient__HashBlock2Address=tcp://your-node:28332" \\
  dxsapp/consigliere:latest`}</CodeBlock>
        <p className="text-[#c9d1d9] leading-relaxed mt-4">
          Use the Admin API to add addresses and tokens to watch after startup.
        </p>
      </section>

      {/* Manual Setup */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Manual Setup</h2>
        <div className="p-4 bg-yellow-900/20 border border-yellow-700/40 rounded-lg mb-4">
          <p className="text-sm text-yellow-300">
            ⚠️ Consigliere was developed by DXS for internal operations. External deployment
            may require adjustments.
          </p>
        </div>
        <CodeBlock>{`# Clone the repository
git clone https://github.com/dxsapp/dxs-consigliere.git
cd dxs-consigliere/src/Dxs.Consigliere

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the project
dotnet run`}</CodeBlock>
      </section>

      {/* Configuration */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Create <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">
          src/Dxs.Consigliere/appsettings.Development.json</code> for local development:
        </p>
        <CodeBlock>{`{
  "Network": "Testnet",
  "RavenDb": {
    "Urls": ["http://localhost:8080"],
    "DbName": "Consigliere"
  },
  "ZmqClient": {
    "RawTx2Address": "tcp://localhost:28332",
    "RemovedFromMempoolBlockAddress": "tcp://localhost:28332",
    "DiscardedFromMempoolAddress": "tcp://localhost:28332",
    "HashBlock2Address": "tcp://localhost:28332"
  },
  "BsvNodeApi": {
    "BaseUrl": "http://localhost:18332",
    "User": "your_rpc_user",
    "Password": "your_rpc_password"
  },
  "TransactionFilter": {
    "Addresses": [],
    "Tokens": []
  }
}`}</CodeBlock>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Setting</th>
                <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Default</th>
                <th className="text-left py-2 text-[#8b949e] font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-[#c9d1d9]">
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">Network</code></td>
                <td className="py-2 pr-4">Testnet</td>
                <td className="py-2">Bitcoin (SV) network (&quot;Mainnet&quot; or &quot;Testnet&quot;)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">RavenDb.Urls</code></td>
                <td className="py-2 pr-4">http://localhost:8080</td>
                <td className="py-2">RavenDB server URL(s)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">RavenDb.DbName</code></td>
                <td className="py-2 pr-4">Consigliere</td>
                <td className="py-2">RavenDB database name</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">BsvNodeApi.BaseUrl</code></td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2">Bitcoin (SV) node JSON-RPC endpoint (port 8332 mainnet, 18332 testnet)</td>
              </tr>
              <tr className="border-b border-[#21262d]">
                <td className="py-2 pr-4"><code className="text-[#58a6ff]">ZmqClient.*</code></td>
                <td className="py-2 pr-4">tcp://localhost:28332</td>
                <td className="py-2">ZMQ endpoints for real-time block and transaction notifications</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Admin API */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Admin API</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-6">
          Dynamically add and remove watched addresses and tokens at runtime. Settings persist
          in RavenDB and survive restarts. Swagger UI available at{' '}
          <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">http://localhost:5000/swagger</code>.
        </p>

        <Endpoint
          method="POST"
          path="/api/admin/manage/address"
          description="Register an address to watch for incoming/outgoing transactions."
        >
          <p className="text-xs text-[#8b949e] mb-2">Request body:</p>
          <CodeBlock>{`{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "name": "Genesis Address"
}`}</CodeBlock>
        </Endpoint>

        <Endpoint
          method="POST"
          path="/api/admin/manage/stas-token"
          description="Register a STAS token ID to track. The token ID is the redemption address from the token contract."
        >
          <p className="text-xs text-[#8b949e] mb-2">Request body:</p>
          <CodeBlock>{`{
  "tokenId": "542a56ec7a307fd68bf925d8f4d525ca61e868ad",
  "symbol": "USDT-TON"
}`}</CodeBlock>
        </Endpoint>
      </section>

      {/* WebSocket API */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">WebSocket API (SignalR)</h2>
        <p className="text-[#c9d1d9] leading-relaxed mb-4">
          Consigliere exposes a SignalR WebSocket hub at{' '}
          <code className="text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded text-sm">/ws/consigliere</code>{' '}
          for real-time wallet operations.
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Server Methods (client → server)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#30363d]">
                    <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Method</th>
                    <th className="text-left py-2 text-[#8b949e] font-medium">Parameters</th>
                  </tr>
                </thead>
                <tbody className="text-[#c9d1d9]">
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">SubscribeToTransactionStream</code></td>
                    <td className="py-2"><code className="text-[#e6edf3]">{'{ address, slim }'}</code></td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">UnsubscribeToTransactionStream</code></td>
                    <td className="py-2"><code className="text-[#e6edf3]">{'{ address, slim }'}</code></td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">GetBalance</code></td>
                    <td className="py-2"><code className="text-[#e6edf3]">{'{ addresses, tokenIds }'}</code></td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">GetHistory</code></td>
                    <td className="py-2"><code className="text-[#e6edf3]">{'{ address, tokenIds, desc, skipZeroBalance, skip, take }'}</code></td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">GetUtxoSet</code></td>
                    <td className="py-2"><code className="text-[#e6edf3]">{'{ tokenId, address, satoshis }'}</code></td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">GetTransactions</code></td>
                    <td className="py-2"><code className="text-[#e6edf3]">{'[txId, ...]'}</code></td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">Broadcast</code></td>
                    <td className="py-2"><code className="text-[#e6edf3]">rawTxHex</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Client Callbacks (server → client)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#30363d]">
                    <th className="text-left py-2 pr-4 text-[#8b949e] font-medium">Callback</th>
                    <th className="text-left py-2 text-[#8b949e] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-[#c9d1d9]">
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OnTransactionFound</code></td>
                    <td className="py-2">New transaction detected (raw hex)</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OnTransactionDeleted</code></td>
                    <td className="py-2">Transaction removed from mempool (txid)</td>
                  </tr>
                  <tr className="border-b border-[#21262d]">
                    <td className="py-2 pr-4"><code className="text-[#58a6ff]">OnBalanceChanged</code></td>
                    <td className="py-2">Balance updated for watched address</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="text-[#c9d1d9] leading-relaxed mt-4">
          JavaScript client example:
        </p>
        <CodeBlock>{`import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/ws/consigliere")
  .withAutomaticReconnect()
  .build();

connection.on("OnTransactionFound", (hex) => {
  console.log("tx found", hex);
});

connection.on("OnBalanceChanged", (balanceDto) => {
  console.log("balance changed", balanceDto);
});

await connection.start();

await connection.invoke("SubscribeToTransactionStream", {
  address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  slim: false
});`}</CodeBlock>

        <p className="text-[#c9d1d9] leading-relaxed mt-4">
          .NET client example:
        </p>
        <CodeBlock>{`using Microsoft.AspNetCore.SignalR.Client;

var connection = new HubConnectionBuilder()
    .WithUrl("http://localhost:5000/ws/consigliere")
    .WithAutomaticReconnect()
    .Build();

connection.On<string>("OnTransactionFound", hex =>
{
    Console.WriteLine($"tx found {hex}");
});

connection.On<object>("OnBalanceChanged", balance =>
{
    Console.WriteLine($"balance changed {balance}");
});

await connection.StartAsync();

await connection.InvokeAsync("SubscribeToTransactionStream", new
{
    address = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    slim = false
});`}</CodeBlock>
      </section>

      {/* Author */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Author</h2>
        <p className="text-[#c9d1d9] leading-relaxed">
          <a href="https://github.com/panagushin" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-[#79b8ff] underline">
            Oleg Panagushin
          </a>{' '}
          — CTO / System Architect at DXS (Crypto &amp; FinTech)
        </p>
      </section>
    </DocsLayout>
  )
}
