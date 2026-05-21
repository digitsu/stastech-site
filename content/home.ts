/**
 * content/home.ts
 *
 * Single source of truth for all homepage copy. Every string here is
 * transcribed verbatim from the stastech.org rebuild instructions
 * (sections 3, 4, 6-11). Components in components/home/* render this data
 * and contain no copy of their own.
 *
 * LINK DESTINATIONS: a handful of CTA targets are not yet decided. They are
 * collected in `links` below and marked TODO. Search "TODO(links)" to find
 * every placeholder that needs a real destination before launch.
 */

/* ---- shared types -------------------------------------------------- */

export type Cta = { label: string; href: string };

export type Metric = { value: string; label: string };

export type Logo = { name: string; href: string };

export type WithoutWithRow = { without: string; with: string };

export type TabFeature = { title: string; body: string };

export type FaqItem = { q: string; a: string };

export type CodeSample = { install: string; code: string };

export type AudienceTab = {
  id: "issuers" | "exchanges" | "developers" | "enterprise";
  label: string;
  painHeadline: string;
  painStack: string[];
  /** Optional emphasized callout box. Only the Issuers view has one. */
  painMath?: string;
  withoutWith: WithoutWithRow[];
  features: TabFeature[];
  proof: string[];
  /** Trailing note under the proof block (e.g. licensing line). */
  proofNote?: string;
  /** Copy-paste code sample. Only the Developers view has one. */
  codeSample?: CodeSample;
  faq: FaqItem[];
  primaryCta: Cta;
  secondaryCta: Cta;
  trustTriple: string;
};

/* ---- link destinations --------------------------------------------- */

/**
 * Centralized CTA targets. The first group resolves to real pages/repos.
 * The TODO group has no confirmed destination yet — see the launch
 * checklist. "#" renders as a non-navigating link until wired.
 */
export const links = {
  sdk: "/docs/sdks",
  spec: "/docs/spec",
  swapDocs: "/docs/swap",
  github: "https://github.com/stassso",
  scriptTemplates: "https://github.com/stassso/STAS-3-script-templates",
  // Contact: opens an X compose window addressed to @StasToken.
  contact: "https://x.com/intent/tweet?text=%40StasToken%20",
  // Verified-integrator sites.
  centi: "https://centi.ch",
  certihash: "https://sentinelnode.online",
  dxs: "https://dxs.app",
  // "The Last Missing Piece" thesis — Bitcoin Script Engineering Part V.
  article:
    "https://medium.com/@Stas33496115/bitcoin-script-engineering-part-v-e7f3592636ef",
} as const;

/* ---- hero (section 3) ---------------------------------------------- */

export const hero = {
  headline:
    "Bitcoin can process a million transactions per second. Nobody cares.",
  subhead:
    "Until tokens settle on Layer 1, every blockchain rebuilt the intermediaries Bitcoin was designed to replace. STAS makes every sat the unit of account, settles in one Bitcoin transaction, and bakes compliance into the script.",
  primaryCta: { label: "Get the SDK", href: links.sdk },
  secondaryCta: { label: "Read the spec", href: links.spec },
  trustLine:
    "MIT-licensed. 700,000 production transactions. $0.00015 average fee. TypeScript, Elixir, Rust.",
};

/* ---- proof strip (section 4) --------------------------------------- */

export const proofStrip = {
  metrics: [
    { value: "700,000", label: "production transactions" },
    { value: "$0.00015", label: "average L1 fee" },
    { value: "1,000,000+", label: "TPS tested (Teranode)" },
    { value: "150M+", label: "tx/day (Consigliere stress test)" },
  ] as Metric[],
  logos: [
    { name: "Centi", href: links.centi },
    { name: "CERTIHASH", href: links.certihash },
    { name: "DXS", href: links.dxs },
  ] as Logo[],
  article: {
    lead: "Read the full thesis:",
    title:
      '"The Last Missing Piece: Why Bitcoin Needs Layer-1 Tokenization to Matter"',
    href: links.article,
  },
};

/* ---- audience tabs (sections 5-9) ---------------------------------- */

export const defaultTab: AudienceTab["id"] = "issuers";

export const tabs: AudienceTab[] = [
  /* ---- ISSUERS (section 6) ---- */
  {
    id: "issuers",
    label: "For issuers",
    painHeadline: "When a court orders a freeze, who actually executes it?",
    painStack: [
      "Right now your ordinals stablecoin needs your signature on every single transfer. MNEE on BSV is the canonical example: a USD-backed stablecoin running on 1Sat ordinals where every payment, every merchant settlement, every market-maker move waits for the issuer's signing server. The day that server has a bad hour, every customer sees it. The day a regulator audits your throughput claims, the math falls apart. (1Sat ordinals are Layer 2 on BSV. STAS is Layer 1. The architectural difference is what creates the bottleneck.)",
      "Your ERC-20 freeze logic lives in a wrapper contract that wasn't there at issuance. If it fails or gets exploited, the only fix is a chain rollback. Ethereum did this in 2016. The network split into ETH and ETC. Your token would be on whichever side of the fork your custodian picked.",
      "Account-based token systems force you to manage API keys for every developer who integrates. Every wallet, every payment app, every merchant requires your permission and your support team. Your headcount is now a function of your token's adoption, and not in a good way.",
    ],
    painMath:
      "A stablecoin issuer with 100,000 daily transfers and a co-signing requirement runs 100,000 server signatures per day. One server outage at 3am Eastern stalls 100,000 transactions before anyone notices. One regulator question about real-time freeze capability requires a phone call to a person, not a query against a chain.",
    withoutWith: [
      {
        without: "Issuer co-signs every transfer",
        with: "Issuer co-signs nothing. Transfers are peer-to-peer.",
      },
      {
        without: "Freeze requires foundation vote or miner intervention",
        with: "Designated authority freezes one UTXO directly on-chain",
      },
      {
        without:
          "Compliance failure means a chain rollback (see Ethereum 2016)",
        with: "Compliance failure means surgical UTXO confiscation. The rest of the chain keeps running.",
      },
      {
        without: "Manage API keys for every wallet, app, and merchant",
        with: "Developers integrate with the chain. You retain compliance power without sitting in the middle of every integration.",
      },
    ],
    features: [
      {
        title: "Compliance hardcoded at issuance",
        body: "Freeze and confiscation authorities are P2MPKH-baked into the token script. Set once, immutable for the token's life, regulator can verify it independently. Your compliance officer stops being the bottleneck on every audit. The chain is.",
      },
      {
        title: "Native multisig (P2MPKH)",
        body: '3-of-5 board approval for minting, 2-of-3 for transfers, baked into the token template. No external Gnosis Safe, no off-chain signing service, no single private key to compromise. The question "who has the keys?" gets a verifiable answer. Your insurance underwriter sleeps better. So do you.',
      },
      {
        title: "No co-signing bottleneck",
        body: "Transfers are peer-to-peer. The issuer's signature is not in the transaction path. Blockchain throughput is the only ceiling. At 1,000,000+ TPS (Teranode tested), your token's growth stops costing you another headcount in the signing-server team.",
      },
    ],
    proof: [
      "Centi — uses STAS-20 for its Swiss-Franc stablecoin CCHF. 1.2M microtransactions in 24h demonstrated, internal cost $5 USD for the batch. Bank-guaranteed by Dukascopy SA, regulated by FINMA.",
    ],
    proofNote: "All shipped without negotiating a license. STAS is MIT-licensed.",
    faq: [
      {
        q: "If I enable freeze authority at issuance, can I disable it later?",
        a: "No. That's the point. The configuration is immutable for the token's life. Buyers, regulators, and counterparties verify it once and stop asking.",
      },
      {
        q: "How is this different from USDC's freeze function on Ethereum?",
        a: "USDC freezes execute via the issuer's smart contract on a global account ledger. Every freeze touches the entire chain's state and depends on the issuer's signing infrastructure being online. STAS freezes execute on a single UTXO via a designated authority hardcoded at issuance. The issuer's servers are not in the transaction path.",
      },
      {
        q: "What about MiCA and eIDAS 2.0?",
        a: "STAS gives regulators flow tracing across the entire transaction graph, not just balance snapshots. Compliance authorities can be assigned to a regulator-designated multi-sig at issuance, which maps directly onto what MiCA's freeze obligations actually require.",
      },
    ],
    primaryCta: { label: "Talk to an issuer-side engineer", href: links.contact },
    secondaryCta: { label: "See the Centi case study", href: links.centi },
    trustTriple:
      "MIT-licensed. Centi already shipped on it with a Swiss-bank-guaranteed stablecoin. First production token usually takes a sprint, not a quarter.",
  },

  /* ---- EXCHANGES & MARKET MAKERS (section 7) ---- */
  {
    id: "exchanges",
    label: "For exchanges & market makers",
    painHeadline:
      "Every DEX you've built has a sequencer, a bridge, or a wrapped token.",
    painStack: [
      'Lightning\'s roughly 5,000 BTC capacity ceiling and persistent routing failures mean every "trustless" payment routes through liquidity providers who can drop the channel.',
      "ETH rollup sequencers can censor your transactions. Bridge exploits have lost the industry billions of dollars. You audit the math, then you audit the operators, then you find out the operators can also unilaterally upgrade the contract.",
      'Off-chain matching engines are black boxes. Your counterparty\'s order isn\'t on-chain until settlement clears. The window between order and settlement is where MEV lives. The window is also where "oops, our keeper bot went down for 40 minutes" happens.',
    ],
    withoutWith: [
      {
        without: "Bridge between L1 and L2 (exploit risk)",
        with: "One Bitcoin transaction settles the swap",
      },
      {
        without: "Sequencer can censor or reorder",
        with: "Script-enforced exchange rate. No operator.",
      },
      {
        without: "Wrapped tokens drift from the underlying",
        with: "The token IS the asset on L1",
      },
      {
        without: "MEV in the mempool",
        with: "No mempool ordering advantage to extract",
      },
    ],
    features: [
      {
        title: "True Layer-1 atomic swaps",
        body: 'Maker publishes a UTXO at a script-enforced rate. Takers fill partially or fully. Cancellation is one transaction. No bridge, no sequencer, no wrapped token in the path. You stop reading post-mortems on Monday morning. Your security team stops triaging "is our bridge in this exploit?" pages.',
      },
      {
        title: "Partial fills as one L1 transaction",
        body: 'Order placement, partial fill, settlement each execute in a single Bitcoin transaction. No separate matching layer, no off-chain order book, no bookkeeping reconciliation. "Did the trade actually clear?" stops being a question. The chain is the answer.',
      },
      {
        title: "Makers cancel anytime",
        body: "Spend the UTXO back to yourself. The order is gone. No stuck-order incidents, no race conditions on cancel, no operator latency on critical path. The trader who needs to pull a quote in volatile market conditions can do it in one block, not whenever your matching engine acknowledges the cancel.",
      },
    ],
    proof: [
      "DXS — building self-custodial financial market access on STAS, with a prototype Ethereum bridge for inbound liquidity. Open-source. MIT-licensed.",
    ],
    faq: [
      {
        q: "Can multiple takers fill the same maker order partially?",
        a: "Yes. The UTXO splits cleanly across takers. Each claim is its own L1 transaction. The maker can cancel the unfilled remainder at any time.",
      },
      {
        q: "How does this compare to a Uniswap-style AMM?",
        a: "It is a script-enforced limit-order book, not an AMM. No LP token, no impermanent loss, no constant-product math. Closer in spirit to a CLOB than to an AMM.",
      },
      {
        q: "What about latency to fill?",
        a: "One Bitcoin block. Average BSV block time matches BTC's 10-minute target. Teranode-class throughput means there is no fee market between you and inclusion.",
      },
    ],
    primaryCta: { label: "Get the swap example code", href: links.sdk },
    secondaryCta: { label: "See atomic-swap docs", href: links.swapDocs },
    trustTriple:
      "Open-source. DXS already shipped on this. Working swap example in the repo.",
  },

  /* ---- DEVELOPERS (section 8) ---- */
  {
    id: "developers",
    label: "For developers",
    painHeadline:
      '"Where\'s the Alchemy? Where\'s the Infura? Can I actually build on this?"',
    painStack: [
      "You have spent weekends managing API keys, rate limits, and node providers that the chain operator controls. When they decide to upgrade, you find out at 3am via a Sentry alert.",
      "You shipped an ERC-20 once and watched gas spike to $40 during your launch hour. The math you did the week before stopped being the math you were doing on launch day.",
      'You read four different "Bitcoin token" specs and walked away unsure whether the token was actually on Bitcoin or just stored its hash there. Two of them required you to run a separate indexer that was abandoned six months ago.',
    ],
    withoutWith: [
      {
        without: "Manage API keys per integration",
        with: "npm install dxs-bsv-token-sdk",
      },
      {
        without: "Index the entire ledger to compute balances",
        with: "Consigliere indexes only what you watch",
      },
      {
        without: "Pray the protocol does not change under you",
        with: "Chronicle locks the protocol April 2026",
      },
      {
        without: "Closed-source, vendor-controlled tooling",
        with: "MIT-licensed, fork it yourself",
      },
    ],
    features: [
      {
        title: "Three SDKs, three languages",
        body: "TypeScript, Elixir, Rust. All published to the standard package registries. Pick the one your stack already runs. You ship a working token in your existing language by Friday. You did not have to learn a new toolchain to do it.",
      },
      {
        title: "Two open-source indexers",
        body: "Consigliere (C# / .NET) and Athanor (Elixir / Phoenix). Watch the addresses and tokens you care about. Skip the full-node operation. Consigliere has been stress-tested at 150 million transactions per day. It is the piece of your stack you stop paging on.",
      },
      {
        title: "Protocol locked April 2026",
        body: "Chronicle freezes the BSV base protocol permanently. No soft forks, no hard forks, no consensus changes. The token contract you ship today still works in 2036. Your job is not to keep up with the chain. Your job is to keep up with your customers.",
      },
    ],
    proof: [
      "700,000 production transactions — 0.0003 cents avg user-generated tx.",
      "Consigliere indexer — stress-tested at 150 million transactions/day.",
      "SDK status — TypeScript and C# in production. Elixir and Rust beta.",
    ],
    // Source: dxs-bsv-token-sdk README quickstart (BuildDstasIssueTxs).
    codeSample: {
      install: "npm install dxs-bsv-token-sdk",
      code: `import { dstas } from "dxs-bsv-token-sdk/dstas";
import { bsv } from "dxs-bsv-token-sdk/bsv";

// Define a divisible token, no admin authorities.
const issuer = new bsv.PrivateKey(bsv.fromHex(process.env.ISSUER_KEY_HEX));
const scheme = new bsv.TokenScheme(
  "Demo", bsv.toHex(issuer.Address.Hash160), "DEMO", 1,
  { isDivisible: true },
);

// Issue the supply in one Bitcoin transaction.
const fundingTx = bsv.TransactionReader.readHex(process.env.FUNDING_TX_HEX);
const fundingOut = bsv.OutPoint.fromTransaction(fundingTx, 0);

const { issueTxHex } = dstas.BuildDstasIssueTxs({
  fundingPayment: { OutPoint: fundingOut, Owner: issuer },
  scheme,
  destinations: [{ Satoshis: 100, To: issuer.Address }],
  feeRate: 0.1,
});`,
    },
    faq: [
      {
        q: "Can I build a token in an afternoon?",
        a: 'A divisible token issuance is one SDK call. Script template at github.com/stassso/STAS-3-script-templates. Full spec on Medium ("Bitcoin Script Engineering Part V").',
      },
      {
        q: "Do I need to run a full node?",
        a: "No. Run an indexer (Consigliere or Athanor) that watches only the UTXOs you care about.",
      },
      {
        q: "What happens to my contract when Bitcoin Script changes?",
        a: "It does not. Chronicle (April 7, 2026) locks the BSV protocol permanently. Code shipped today runs identically in 2036.",
      },
    ],
    primaryCta: { label: "Get the TypeScript SDK", href: links.sdk },
    secondaryCta: { label: "Browse the GitHub org", href: links.github },
    trustTriple:
      "MIT-licensed. Working code samples in the repo. First token issued in under an hour.",
  },

  /* ---- ENTERPRISE ARCHITECTS (section 9) ---- */
  {
    id: "enterprise",
    label: "For enterprise",
    painHeadline:
      "Permissioned chains keep failing. Public chains keep changing.",
    painStack: [
      "IBM TradeLens shut down in 2022 after Maersk could not get enough rivals to join. R3, Hyperledger, and at least four other consortia have dissolved or pivoted. The published failure rate for enterprise blockchain projects is over 90%.",
      "BTC has shipped consensus-changing soft forks roughly every four years. SegWit in 2017. Taproot in 2021. Ordinals reopened the witness-data debate in 2023. The protocol you committed to at procurement is not the protocol you will be running on at year five of the integration.",
      'Your buying committee will not approve "trust us, it\'s decentralized." They want a contractually stable foundation that does not shift under a 10-year integration. They want one vendor question with one answer, not a quarterly governance call.',
    ],
    withoutWith: [
      {
        without: "Permissioned consortium (vendor lock-in)",
        with: "Public chain, MIT license",
      },
      {
        without: "Public chain with shifting consensus rules",
        with: "Protocol locked permanently April 2026 (Chronicle)",
      },
      {
        without: "Trust the issuer, the foundation, or the sequencer",
        with: "Designated authority hardcoded at issuance",
      },
      {
        without: '"Decentralized" via 22,000 read-only nodes',
        with: "Decentralized via protocol immutability",
      },
    ],
    features: [
      {
        title: "Protocol immutability is a contractual primitive",
        body: 'Chronicle locks the BSV base layer permanently as of April 2026. Comparable to TCP/IP since RFC 793 in 1981; the rules do not change. Your integration does not get retroactively broken by a soft fork. The architect who picked it does not get a Slack message in 2031 about "an upcoming consensus change you should review."',
      },
      {
        title: "Compliance lives in the script",
        body: 'Freeze, unfreeze, and confiscation authorities P2MPKH-hardcoded at issuance. Auditable at the UTXO level for any regulator in any jurisdiction. The legal-and-compliance review you go through once at architecture-approval time is the review you go through. No "well, the chain just changed how this works" follow-up.',
      },
      {
        title: "Throughput tested at 1,000,000+ TPS",
        body: "Teranode (October 2025 test network). Average L1 fee $0.00015. No Layer 2 in the dependency graph. No bridge to operate. No rollup to monitor. Your dependency tree is one item shorter. Every item in a 10-year dependency tree has a maintenance cost. STAS reduces that cost by removing the L2.",
      },
    ],
    proof: [
      "CERTIHASH — cybersecurity monitoring platform built with IBM Consulting. 65.88 million transactions in one week (April 2025). Breach detection 4,000x faster than industry average.",
    ],
    faq: [
      {
        q: "What happens if the BSV Association changes direction?",
        a: "After Chronicle (April 7, 2026), the protocol is locked. The Association cannot change consensus rules. Neither can any miner cartel or developer team. Your integration is contractually stable in a way no other public chain is.",
      },
      {
        q: "Are there reference enterprise integrations?",
        a: "CERTIHASH was built with IBM Consulting and ran 65.88 million transactions in one week of April 2025. Centi runs a Swiss-Franc-pegged stablecoin (CCHF) on STAS-20, bank-guaranteed by Dukascopy SA and regulated under Swiss FINMA. The MIT-licensed STAS protocol has additional public deployments your team can verify and add here.",
      },
      {
        q: "How does this satisfy MiCA and eIDAS 2.0?",
        a: "UTXO-level flow visibility gives regulators the auditability they actually want, not just balance snapshots. Compliance authorities can be hardcoded to regulator-controlled multi-sig at issuance. Selective disclosure of identity credentials maps directly onto eIDAS 2.0 wallet requirements.",
      },
    ],
    primaryCta: { label: "Book a technical briefing", href: links.contact },
    secondaryCta: { label: "See the CERTIHASH case", href: links.certihash },
    trustTriple:
      "MIT-licensed. Built with IBM Consulting. Designed for 10-year integrations.",
  },
];

/* ---- shared mid-page (section 10) ---------------------------------- */

export const threeOperations = {
  headline: "Three operations. One Bitcoin transaction each.",
  steps: [
    {
      title: "Issue",
      body: "Define the token scheme: divisibility, multisig threshold, freeze authority. Broadcast one transaction. Your token exists.",
    },
    {
      title: "Transfer",
      body: "Spend the token UTXO peer-to-peer. No co-signing server. No issuer in the loop.",
    },
    {
      title: "Swap or redeem",
      body: "Publish a swap UTXO at a script-enforced rate. Multiple takers can fill partially. Cancel anytime by spending the UTXO back to yourself.",
    },
  ],
  closingLine:
    "The whole thing is 1–2 KB of Bitcoin Script. Auditable by anyone. Validated by the network. No off-chain settlement platform.",
};

/* ---- final CTA (section 11) ---------------------------------------- */

export const finalCta = {
  headline: "Issue your first STAS token in under an hour.",
  body: "MIT-licensed and free to use forever. Install it without API keys or permission. Built on a Bitcoin protocol that does not change after April 2026.",
  primaryCta: { label: "Get the SDK", href: links.sdk },
  secondaryCta: { label: "Read the spec", href: links.spec },
  trustMicroLine:
    "700,000 production transactions and counting. Centi, CERTIHASH, and DXS already shipped.",
};

/* ---- testimonials (section 15) ------------------------------------- */

/**
 * Intentionally empty. Per section 15, the testimonial section does not
 * render until real attributed quotes from verified STAS users exist.
 * Do not add placeholder or generic testimonials.
 */
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

export const testimonials: Testimonial[] = [];
