# Repository Guidelines & Invariants

## 1. Script Lifecycle & Runtime Conventions
The scripts in `script/` follow GitHub's *Scripts to Rule Them All* pattern:
- `script/bootstrap`: Resolves dependencies via `npm install` (Node/npm managed via mise).
- `script/setup`: Initial machine/environment setup. Always invokes `script/bootstrap` first.
- `script/server`: Starts the Astro local dev server (`npm run dev`) at `http://localhost:4321`.
- `script/build` / `script/cibuild`: Builds the Astro static site into `dist/` and verifies `dist/index.html` presence.
- Always check if script files are symlinks or hardlinks before modifying them in-place.
- Tool runtimes (`mise`, `git`) require local user config access outside sandbox boundaries; run builds and VCS commits unsandboxed when prompted.

## 2. Rivian OS Design Language System (Gen 2 / R2 Platform)
The site uses the **Rivian OS** aesthetic ("Digital Adventure Gear"):
- **Night (Dark)**: Expedition Slate (`--bg-color: #121519`, `--surface: #191d22`, `--compass-accent: #f5b335`).
- **Day (Light)**: Glacier Sand (`--bg-color: #f5f2eb`, `--surface: #ffffff`, `--compass-accent: #c9770e`).
- **Geometry**: Stadium pill geometry (`border-radius: 9999px`) for metadata markers, navigation controls, and waypoints.
- **Outlines**: Cel-shaded 1.5px outlines (`var(--border-color)`) across cards, headers, tables, and code blocks.
- **Contrast**: Maintain strict WCAG AA compliance (contrast ratio ≥ 4.5:1 for normal text) in both Day and Night themes.

## 3. Editorial & Navigation Invariants
- **No Tag Clouds or Category Pills**: Never add tag or category filter pills to the blog feed.
- **No Bloated Hero Banners**: Keep personal writing and chronological posts front and center.
- **Terminology Invariants ('Posts' and 'Experience')**: Always use 'posts' instead of 'entries' across buttons, waypoints, and feeds (e.g., 'All Posts'). Never use 'dossier'; refer strictly to 'experience'.
- **No Page Footer**: The site has no footer; all essential navigation (About, Email, GitHub, LinkedIn, RSS, Theme Toggle) lives in the sticky header nav cluster.
- **Header Icon Navigation & Mobile Cockpit Drawer**: On desktop (≥640px), all nav pods (About, Email, GitHub, LinkedIn, RSS, Theme Toggle) display in the sticky header nav cluster with explicit tooltips (`title`) and `aria-label` attributes. On mobile (<640px), the title and theme toggle are preserved alongside a stadium hamburger button that opens a mobile cockpit drawer displaying all navigation items with large touch targets and descriptive labels to prevent header title truncation. Email links to `mailto:primers.flowing-0q@icloud.com`.
- **Permalink Parity**: Maintain 1:1 post permalink parity (`/:slug`) with historical Jekyll URLs.

## 4. Content Architecture & About Page
- **Blog Posts**: Markdown files stored in `src/content/blog/` following `YYYY-MM-DD-title.md`.
- **Career Experience**: Stored in `src/content/experience/{YYYY}.md` with frontmatter (`year`, `role`, `period`).
- **Repository README**: Root `README.md` is strictly a developer guide for repo structure, tech stack, and script lifecycle.
- **Recency Bias**: The About page prioritizes modern work (2015–Present) expanded with waypoint pills, while older foundational work (2008–2014) is archived in an expandable `<details class="archive-drawer">`.
- **No Redundant Date Periods in Headings**: Era section headings (`<h2>`) must strictly display the role title without redundant parenthesized date ranges (e.g., `Principal Applications Engineer & Platform Lead`, not `... (2021 – Present)`), since chronology is already anchored by individual year pills.
- **No Section Divider Lines**: Section headings must not use `border-bottom` divider lines, keeping the chronology stream continuous and reducing visual line breaks.
- **Vertical Timeline Chapters**: The Timeline Chapters navigation in the Current Focus sidebar must display both the role title and the date period, and must remain vertically stacked across all screen sizes (never horizontally scrolling).
- **Title Wrapping Constraint**: Use fluid scaling (`clamp(1.0625rem, 1.8vw, 1.1875rem)`) with tight tracking (`-0.025em`) to ensure role titles fit on a single line on tablet and desktop.

## 5. Mobile-First & Touch-Native Ergonomics
- **Touch Targets**: Minimum 38–40px touch areas for all interactive links and buttons.
- **Tactile Feedback**: Active press animations (`:active { transform: scale(0.985); }`) on post cards, navigation items, and stadium pills.
- **Safe Areas**: Use `viewport-fit=cover` and `env(safe-area-inset-*)` padding for edge-to-edge mobile screens.
- **Reading Comfort**: Constrain article prose container to max `680px` (optimal 65–75 character measure).
- **Mobile Floating Thumb Pill**: Post pages feature a bottom-anchored thumb-zone pill showing live reading percentage and one-tap return to top.
- **Code & Table Swipe Affordance**: Long code blocks and benchmark tables scroll horizontally without breaking mobile page margins, accompanied by swipe cues on narrow viewports.

## 6. Code Block Legibility & Syntax Invariants
- **Shiki Dual Themes**: Uses `kanagawa-wave` (dark) and `kanagawa-lotus` (light) with `wrap: false` for natural horizontal code alignment.
- **Cockpit Header**: Every code block is wrapped in `.code-block-wrapper` with a language badge and an SVG copy button that transitions to a green checkmark on copy.
- **Unstyled Token Fallback**: Plain text spans, shell prompts, and operators must explicitly declare `color: var(--shiki-dark, var(--text-color)) !important` to ensure legibility in dark mode.

## 7. Version Control & Review Invariants
- **No Automatic Git Commits**: Never run `git commit` automatically after completing code changes.
- **Explicit Review Gate**: Always leave changes in the working directory for user review. Summarize what changed, verify with builds/tests, and explicitly ask the user if they would like to commit the changes.
