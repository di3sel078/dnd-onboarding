# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS site helping new players learn D&D 5e. No build step, no frameworks, no dependencies, no package.json. Every page is opened directly or served as a flat file.

## Running the Site

Open any `.html` file directly in a browser, or serve with any static file server:

```
python3 -m http.server 8000
```

This is for Tyler to run, not Claude — see Verification below.

## Architecture

**Main guides** (in reading order, linked from the homepage):

- `index.html` — Homepage; intro to D&D and cards linking to the three guides below
- `character-creator.html` — 10-step character creation walkthrough. By far the largest page (~2200 lines)
- `turn-guide.html` — What to do on your turn in combat. Partially written
- `roleplaying.html` — Playing in character. Stub, content not written yet

**Reference pages** (in the nav's "Reference" dropdown):

- `extra-rules.html` — Leveling up and other extras. Partially written
- `glossary.html` — Term definitions. Stub
- `gallery.html` — Character art and descriptions
- `xumaria.html` — Homemade campaign setting. Stub, marked "Coming Soon!"

**CSS** — three files, loaded in this order by every page:

1. `css/reset.css` — browser normalization
2. `css/variables.css` — design tokens (colors, spacing, typography, radii)
3. `css/styles.css` — everything else, organized by the section banners at the top of the file

**JS** — `js/main.js` only. One IIFE containing:

- The nav, built from `NAV_MAIN_LINKS` and `NAV_REFERENCE_LINKS` and injected into each page's empty `<nav id="main-nav">`. Pages don't hardcode nav markup — **adding a page means adding an entry to one of those arrays**
- Nav behavior: active-link highlighting, mobile hamburger, desktop "Reference" dropdown
- One `initPageName()` function per page, dispatched by a `switch` on `currentPage` in `main()`. Most are still `// TODO` stubs
- `initGallery()` renders the character cards and their pop-up from a `CHARACTERS` array — a new character is one array entry, no markup changes

**Assets** — `assets/images/characters/` holds the gallery portraits (~4:5 ratio).

## Conventions

- Plain HTML, CSS, JS only — no frameworks, no bundlers, no dependencies
- Beginner-friendly language; assume zero D&D knowledge
- Clean modern design aesthetic — avoid fantasy-heavy or dungeon-themed visuals
- CSS custom properties (defined in `variables.css`) for all colors, spacing, and typography values. Check for an existing token before adding one
- Reuse the existing breakpoints (`max-width: 900px`, `max-width: 640px`, `min-width: 641px`) rather than inventing new ones
- Use simple one-line comments where appropriate
- No em-dashes in page copy (HTML text content, JS string literals shown to users). Restructure the sentence instead — use a period, comma, colon, or semicolon

## Verification

- Don't run the site to check your own edits — no local server, no headless browser, no screenshots. Tyler verifies changes in the browser.
- Static checks are still fine and encouraged: `node --check` on JS, grepping for stale selectors or dead references, confirming an asset path or element ID exists.
- Say plainly what you did and didn't verify. Don't claim something renders correctly when you haven't seen it.

## Extensions

- Use Context7 for code generation and library questions
