# Repository Guidelines & Invariants

## 1. Script Lifecycle Conventions
The scripts in `script/` follow GitHub's *Scripts to Rule Them All* pattern:
- `script/bootstrap`: Focuses purely on resolving/installing dependencies (`bundle install`).
- `script/setup`: Initial machine/environment setup. Always invokes `script/bootstrap` first.
- `script/build` / `script/cibuild`: Builds the Jekyll site and verifies `_site/index.html` presence.
- Always check if script files are symlinks or hardlinks before modifying them in-place.

## 2. Theme System & Color Palette
The site uses the **Rosé Pine** design system with dynamic light/dark toggling:
- **Day (Light)**: Rosé Pine Dawn (`--rp-base: #faf4ed`, `--rp-surface: #fffaf3`, `--rp-text: #575279`, `--rp-pine: #286983`).
- **Night (Dark)**: Rosé Pine Moon (soft/lighter dark tone: `--rp-base: #2a273f`, `--rp-surface: #332f4c`, `--rp-text: #eceaf8`, `--rp-foam: #9ccfd8`).
- Maintain WCAG AA compliance (contrast ratio ≥ 4.5:1 for normal text) for all UI text, headings, and code elements.

## 3. Code Block Legibility & Syntax Highlighting Invariants
- Code containers (`div.highlighter-rouge`, `figure.highlight`, `.highlight`, `pre.highlight`, `table.rouge-table td pre`) must explicitly declare `color: var(--text-color) !important` to ensure unstyled/plain text, shell outputs, and operators remain visible in dark mode.
- Syntax comments (`.c`, `.c1`, etc.) and gutter line numbers must use high-contrast muted tokens (`var(--rp-muted)`) with sufficient opacity (≥ 0.85).
- Always include explicit token styles for identifiers (`.n`), punctuation (`.p`), and types (`.kt`, `.nc`).
