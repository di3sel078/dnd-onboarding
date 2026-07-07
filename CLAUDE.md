# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS site helping new players learn D&D 5e. No build step, no frameworks, no dependencies.

## Running the Site

Open any `.html` file directly in a browser, or serve with any static file server:

```
python3 -m http.server 8000
```

## Architecture

**Pages:**

- `index.html` — Homepage with nav to the three tools
- `character-creator.html` — Step-by-step character creation guide
- `turn-guide.html` — What to do on your turn in combat
- `rules-guide.html` — Common/nitpicky rules reference (driven by `data/rules_guide.json`)

**CSS load order** (all pages should include all three in this order):

1. `css/reset.css` — browser normalization
2. `css/variables.css` — design tokens (colors, spacing, fonts)
3. `css/styles.css` — component and layout styles

**JS:** `js/main.js` handles all interactivity; `data/rules_guide.json` is the data source for the rules reference page.

## Conventions

- Plain HTML, CSS, JS only — no frameworks, no bundlers
- Beginner-friendly language; assume zero D&D knowledge
- Clean modern design aesthetic — avoid fantasy-heavy or dungeon-themed visuals
- CSS custom properties (defined in `variables.css`) for all colors, spacing, and typography values

## Extentions

- Use Context7 for code generation and library questions
