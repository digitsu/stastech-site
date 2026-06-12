@AGENTS.md

## Deployment

This site is a **Next.js static export** (`next build` with `output: "export"` → `./out`)
deployed as a **Cloudflare Worker (Static Assets) via Workers Builds**, Git-connected to
`github.com/digitsu/stastech-site`. It is **NOT** Cloudflare Pages.

- **Auto-deploy:** push to `main` → Workers Builds webhook fires → builds and publishes.
- **Manual deploy:** `npx wrangler deploy` (Workers). **Never** `wrangler pages deploy` —
  there is no Pages project; that command fails with "project not found".
- `wrangler.jsonc` is a Workers config: the publish dir is declared via
  `assets.directory: "./out"`. Do **not** add `pages_build_output_dir` (Pages-only field).
- The Worker lives in a Cloudflare account other than digitsu@mac.com's; custom domains
  `stastech.org` / `www.stastech.org` are bound via `routes` `custom_domain` entries.
- The live site is fronted by Cloudflare's edge cache (`cf-cache-status: HIT`); to verify a
  fresh deploy, cache-bust the URL (`?cb=...` + `Cache-Control: no-cache`).
