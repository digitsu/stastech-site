#!/usr/bin/env bash
#
# build-spec.sh — Regenerates the STAS 3.0 specification assets for the docs site.
#
# What it does:
#   1. Converts the canonical STAS 3.0 spec docx to an HTML fragment using pandoc.
#   2. Copies the original docx into public/spec/ so it is served as a downloadable
#      asset.
#   3. Writes a small manifest (public/spec/manifest.json) recording which files
#      are the current canonical pair, so the Next.js page (src/pages/docs/spec.js)
#      can render and link them without hardcoding a version-specific filename.
#
# Output filenames are derived from the input docx filename so that updating the
# spec is a one-shot operation: bump SPEC_DOCX, run this script, both the HTML
# render and the downloadable docx pick up the new version automatically.
#
# Usage:
#   bash scripts/build-spec.sh
#   SPEC_DOCX=/path/to/other.docx bash scripts/build-spec.sh
#
# Dependencies:
#   pandoc (https://pandoc.org) — must be on PATH or at /opt/homebrew/bin/pandoc.
#
# Heading-level shift (--shift-heading-level-by=1):
#   The docx top-level heading becomes <h2> so it nests correctly under the
#   page <h1> rendered by DocsLayout in the Next.js site.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Source docx — override with SPEC_DOCX env var if needed.
SPEC_DOCX="${SPEC_DOCX:-/Users/jerrychan/work/stas/STAS 3 spec v0.2.1.docx}"

if [[ ! -f "${SPEC_DOCX}" ]]; then
  # Source docx is unavailable — typical on hosted builds (Cloudflare Pages, CI)
  # where the canonical file lives only on a maintainer's workstation. Fall back
  # to the artifacts committed under public/spec/ instead of failing the build.
  # Override with SPEC_DOCX=/path/to/spec.docx to force regeneration locally.
  echo "WARN: source docx not found at: ${SPEC_DOCX}" >&2
  echo "      Using committed assets in public/spec/. Set SPEC_DOCX to regenerate." >&2
  exit 0
fi

# Derive a URL-safe base name from the input filename. Strip directories and the
# trailing .docx, then replace any whitespace with underscores so the filename
# survives a browser download without %20 encoding noise.
RAW_BASE="$(basename "${SPEC_DOCX}" .docx)"
SAFE_BASE="$(printf '%s' "${RAW_BASE}" | tr -s '[:space:]' '_')"

# Output paths (relative to site root).
OUT_DIR="${SITE_ROOT}/public/spec"
OUT_HTML="${OUT_DIR}/${SAFE_BASE}.html"
OUT_DOCX="${OUT_DIR}/${SAFE_BASE}.docx"
OUT_MANIFEST="${OUT_DIR}/manifest.json"

# Locate pandoc. If pandoc is unavailable (e.g., a CI build that does not have
# it installed), skip regeneration and fall through to the committed artifacts.
# This makes the script safe to wire into a `prebuild` npm hook on hosts like
# Cloudflare Pages where the build container may lack pandoc.
PANDOC_BIN="$(command -v pandoc 2>/dev/null || echo /opt/homebrew/bin/pandoc)"
if [[ ! -x "${PANDOC_BIN}" ]]; then
  echo "WARN: pandoc not found; skipping spec regeneration." >&2
  echo "      Using committed assets in public/spec/. Install pandoc to refresh:" >&2
  echo "        macOS: brew install pandoc" >&2
  echo "        Debian/Ubuntu: apt-get install -y pandoc" >&2
  exit 0
fi

mkdir -p "${OUT_DIR}"

echo "Source: ${SPEC_DOCX}"
echo "Base:   ${SAFE_BASE}"

echo "Converting docx -> HTML ..."
"${PANDOC_BIN}" \
  -f docx \
  -t html5 \
  --shift-heading-level-by=1 \
  --section-divs \
  --syntax-highlighting=none \
  -o "${OUT_HTML}" \
  "${SPEC_DOCX}"
echo "  Written: ${OUT_HTML} ($(wc -c <"${OUT_HTML}") bytes)"

echo "Copying docx asset ..."
cp "${SPEC_DOCX}" "${OUT_DOCX}"
echo "  Written: ${OUT_DOCX} ($(wc -c <"${OUT_DOCX}") bytes)"

# Write a small manifest the Next.js page reads at build time. This decouples
# spec.js from any specific version filename: bumping SPEC_DOCX is enough to
# point both the inline render and the download button at the new file.
echo "Writing manifest ..."
cat >"${OUT_MANIFEST}" <<EOF
{
  "base": "${SAFE_BASE}",
  "html": "${SAFE_BASE}.html",
  "docx": "${SAFE_BASE}.docx",
  "source": "$(basename "${SPEC_DOCX}")"
}
EOF
echo "  Written: ${OUT_MANIFEST}"

echo "Done."
