# D&D Onboarding Site — Full Review

**Reviewer lens:** UI/UX web design + TTRPG/DM expertise
**Scope:** Every `.html` page, `css/*.css`, `js/main.js`, `js/reference-data.js`
**Method:** Full read-through of every file, plus static checks (link targets, WCAG contrast ratios, `node --check`, image file sizes, duplicate-ID scan). **No browser/visual testing was done** — nothing here was confirmed by actually rendering the site, per this repo's verification rules. Layout claims below are called out as "worth checking in-browser" where I can't be fully certain from code alone.
**Ground rules followed:** Stub/unwritten content (`roleplaying.html`, `glossary.html`, `turn-guide.html`'s mostly-empty body, gallery placeholder bios) is not flagged as a bug — it's clearly and intentionally marked as unfinished. I only flag things that are *built* and behaving in a way that's confusing, incorrect, or inconsistent.

---

## tl;dr

The engineering under the hood (step tracker, deep-linking, modal system, nav) is genuinely well-built — better than most sites this size. The SRD-sourced reference data is careful and, as far as I can verify, accurate. The issues below are mostly small: a couple of real rules inaccuracies, one real content/UI mismatch in the character creator, some accessibility contrast, and a handful of typos/consistency nits.

**Highest-value fixes, in order:**
1. Step 3's class-entry pop-up doesn't contain the "table of class features" the step's own copy tells you to look for (see [Character Creator → Step 3](#step-3--choose-your-class)).
2. Shield AC / proficiency explanation is factually backwards from the correct explanation given two steps earlier (see [Step 9](#step-9--choose-your-equipment)).
3. `.btn-secondary` text fails WCAG AA contrast (see [Cross-Cutting Issues](#cross-cutting-issues)).
4. Homepage's reference-page list omits "Character Options" (see [index.html](#indexhtml--homepage)).

---

## index.html (Homepage)

Clean, well-paced intro. The "Core Loop" diagram is a nice, genuinely helpful visual for someone who's never seen a TTRPG explained before, and the responsive stacking of it at 640px is handled carefully (arrows re-orient instead of just disappearing).

### Issue: Reference-page list omits "Character Options"
**Category:** Presentation / Accuracy
**Where:** "How This Website Works" section

> "There are also four reference pages: Extra Rules (leveling up and such), Glossary (definitions), Gallery (fun artwork), and Xumaria (my personal homemade world)."

The actual Reference dropdown (`NAV_REFERENCE_LINKS` in `js/main.js`) has **five** entries — this sentence skips "Character Options," which is arguably the most useful of the five (it's linked from nearly every step of the character creator). A first-time reader has no idea it exists until they open the dropdown themselves.

**Fix:**
```html
<p>
  There are also five reference pages: Character Options (every class, race,
  and background at a glance), Extra Rules (leveling up and such), Glossary
  (definitions), Gallery (fun artwork), and Xumaria (my personal homemade
  world). On a computer, they're under the "Reference" tab, on a phone
  they're under the &#x2630; menu.
</p>
```

---

## character-creator.html

This is the flagship page and it shows — the step tracker (sticky nav, collapsible, mobile pip-with-arrows fallback, `<select>` fallback below 640px), the hash-based deep linking (`#step-4` survives refresh and back/forward), and the `localStorage` step memory are all handled with real care, including graceful degradation when storage is blocked (private browsing). This is the strongest engineering on the site.

### Step 1 — Terms
Accurate and well-scoped: dice notation, ability checks, saving throws, DC, advantage/disadvantage, and a properly-caveated explanation of natural 20s/1s (correctly marks the "critical success/failure outside combat" idea as a house rule, not RAW — good instinct, a lot of beginner guides get this wrong).

**Issue: "Action," "bonus action," and "reaction" are never defined**
**Category:** Presentation (jargon without explanation)

Step 1 is explicitly the page's glossary-before-you-start, but it never defines the basic turn-structure vocabulary. This matters because those terms get used informally elsewhere in the guide well before `turn-guide.html` (which would normally be where this lives) has any real content — e.g. a Rogue reading about Cunning Action, or a Fighter reading about Action Surge, has no idea what "bonus action" or "action" means yet. A total beginner finishing character creation still won't know what happens on their turn.

**Fix:** add a short subsection to Step 1, e.g.:
```html
<h3>Actions on Your Turn</h3>
<p>
  On your turn in combat you typically get one <strong>Action</strong>
  (attacking, casting most spells, dashing, etc.), one
  <strong>Movement</strong> (up to your speed), and sometimes a
  <strong>Bonus Action</strong> if a feature specifically grants one. A
  <strong>Reaction</strong> is a special action you can take once per round,
  even outside your turn, when its trigger condition is met (like an
  Opportunity Attack). We'll cover this in full on the Survive Combat page,
  but you'll see these terms in your class features starting in Step 3.
</p>
```
This doesn't require `turn-guide.html` to be finished — it just closes the gap until it is.

### Step 3 — Choose your Class

**Issue: The "class entry" doesn't contain what the copy says it does**
**Category:** Accuracy / UX — this is the single most concrete bug in the review

Under "How to Read a Class Entry," Level 1 Features says:

> "At the bottom of your class entry you'll find a table of class features and which level you get them. Look at the level 1 row: those are the abilities your character starts with."

The class table just above this links each class to `character-options.html#<class>`, which opens a modal built by `classModalHtml()` in `js/main.js`. That modal shows Hit Die, HP, Primary Ability, Saves, Armor, Weapons, Tools, Skills, Spellcasting, Starting Equipment, and Subclass — **but no level/feature table at all.** The only place a level-by-level feature list actually exists is `classes.html`, reached by an *additional* "Full Class Details →" click from inside the modal — and even there, every feature's description currently reads "Description coming soon" (since `featureDescriptions` is `null` for every class in `reference-data.js`; only the flat name+level list renders).

A first-time user following the instructions literally will scroll through the pop-up looking for a table that isn't there.

**Fix (pick one):**
- **Cheapest:** update Step 3's copy to say the table is one click further in:
  > "Once you open a class's entry, click 'Full Class Details' to see a level-by-level list of every feature and which level you get it. The level 1 row is what your character starts with."
- **Better:** surface the level-1 features directly in the pop-up itself, so users don't need the extra click for the one thing this step asks them to look at. `classModalHtml()` already has `entry.levelFeatures` available — a small addition before the subclass heading:
  ```js
  function level1FeaturesHtml(entry) {
    const lvl1 = (entry.levelFeatures || []).filter((f) => f.level === 1);
    if (!lvl1.length) return "";
    return `
      <h4>Level 1 Features</h4>
      <ul>${lvl1.map((f) => `<li>${f.name}</li>`).join("")}</ul>
    `;
  }
  ```
  called alongside `featureDescriptionsHtml(entry)` in `classModalHtml`.

**Issue: Spellcasting column promises something the site never explains**
**Category:** Accuracy / Consistency

The class table's Spellcasting column lists Fighter and Rogue as "With Subclass (Intelligence)" — referring to Eldritch Knight and Arcane Trickster. Neither subclass is SRD content, and neither is mentioned *anywhere else* on the site: `reference-data.js` only defines Champion (Fighter) and Thief (Rogue) as subclasses. Compare this to Artificer/Blood Hunter, which get an explicit "not from the core rules, check with your DM" `dm-note` right next to them. A curious reader who clicks through looking for the Intelligence-based spellcasting subclass will find nothing.

**Fix:** either footnote those two table cells the same way Artificer/Blood Hunter are footnoted ("via a non-SRD subclass — ask your DM"), or simplify the cells to "None (SRD)" to match what the rest of the site actually covers.

### Step 9 — Choose your Equipment

**Issue: Shield AC bonus described as proficiency-gated (it isn't)**
**Category:** Accuracy — a real rules error, and it contradicts the site's own correct explanation elsewhere

> "Shields... For your AC, add +2 to any of the above armor types (if you're proficient with shields)."

This is backwards. You get a shield's +2 AC **regardless of proficiency** — what non-proficiency actually does (per the rule, and per this site's own **correct** explanation of it back in Step 7!) is impose disadvantage on Strength/Dexterity checks, saves, and attack rolls, plus block spellcasting, while you're wearing it. The AC bonus itself is never conditional on proficiency, for armor or shields.

Step 7 gets this exactly right:
> "using armor you're not trained in doesn't just skip a bonus, it actively hinders you (disadvantage on any Ability Check, Saving Throw, or Attack roll using Strength or Dexterity, and you can't cast spells while wearing the armor)"

**Fix:**
```html
<h3>Shields</h3>
<p>
  Shields are held in one hand and add a bit of extra protection on top of
  whatever armor you're already wearing. For your AC, add +2 to any of the
  above armor types. You always get this bonus, even if you're not
  proficient with shields, but (like armor) wielding one without
  proficiency gives you disadvantage on Strength/Dexterity checks, saves,
  and attack rolls, and blocks spellcasting while you're carrying it.
</p>
```

### Step 8 — Choose your Spells

**Issue: Artificer mislabeled as a "full spellcaster"**
**Category:** Accuracy (low impact — Artificer is already flagged as non-core everywhere it's mentioned)

`reference-data.js` describes the Artificer's spellcasting as "Full spellcaster from level 1." Mechanically, Artificer uses the **half-caster** slot progression (same table shape as Paladin/Ranger, topping out at 5th-level slots at level 20) — it's just unusual in that it starts at level 1 instead of level 2 like the other half-casters. Calling it a "full spellcaster" overstates its slot progression.

**Fix:** `note: "Half-caster (same slot progression as Paladin/Ranger), but uniquely starts casting at level 1 instead of level 2."`

### Sequencing note (not a bug)
The review step's "Next" button goes straight to `turn-guide.html`, which today is a single paragraph on death saves. Since this is the very next click after finishing the site's most polished experience, it's probably worth prioritizing `turn-guide.html` ahead of the other stub pages — the drop-off in polish right after the character creator is the most jarring transition on the site.

---

## character-options.html & classes.html (+ js/reference-data.js)

These two pages share a data source and a render pipeline, so I'm covering them together.

The SRD sourcing is careful — the file's own header notes it was cross-checked against the Open5e API, and spot-checking a large sample (ability score increases, hit dice, spell slot tables, subclass names/levels, race traits) against what I know of SRD 5.1, I didn't find any wrong mechanical values. That's a genuinely strong foundation.

### Typos
**Category:** Presentation, trivial fixes
- `reference-data.js`: Blood Hunter `primaryAbility: "Constituion & Dexterity or Strength"` → **Constitution**
- `reference-data.js`: Artificer `skills: "...Investivation..."` → **Investigation**

### Note: classes.html's "Full Class Features" is 100% placeholder today
**Category:** Presentation (not flagging the missing content itself — flagging how it *reads*)

Every class's "Full Class Features (All Levels)" section currently renders "Description coming soon." for every single feature, because `featureDescriptions` is `null` across the board in `reference-data.js`. That's expected and by design. But `classes.html` otherwise presents as a finished reference page (bordered sections, full stat blocks, equipment lists) — so hitting a wall of identical placeholder text at the bottom of all fourteen classes reads more like something broke than like an intentionally staged page.

**Suggestion:** collapse/hide the `<details>` block until at least one class has real data, or replace the per-feature "Description coming soon." with a single note at the top of the section ("Full write-ups are still being written — for now, this is the name and level of every feature you'll get").

### Opportunity: unused, already-written content
**Category:** Suggestion, not a bug

`level1Feature` / `level1FeatureSecondary` for Barbarian (Rage, Unarmored Defense), Artificer (Magical Tinkering), and Blood Hunter (Hunter's Bane, Blood Maledict) already have full, well-written descriptions — the file's own comment confirms these fields are "no longer rendered anywhere... kept as source material." Wiring just those three into `featureDescriptions[0]` would remove "Description coming soon" for three classes' level-1 entries at essentially zero writing cost.

---

## gallery.html

The pop-up card pattern is well done: real `<button>` elements (Enter/Space work for free), a native `<dialog>` with `showModal()` (focus trap, Escape, focus restore all handled by the browser), and placeholder bios are clearly marked via `.text-placeholder` rather than silently blank.

### Issue: Unoptimized portrait images
**Category:** Performance

Cards render at a 4:5 ratio inside a max ~400px-wide grid cell, but the source files are far larger than needed:

| File | Size |
|---|---|
| `hana.jpg` | 3.2 MB |
| `maeve.jpg` | 2.5 MB |
| `acharia.jpg` | 1.7 MB |
| `lyo.jpg` | 712 KB |
| `hal.jpg` | 267 KB |
| `crimson.jpeg` | 68 KB |

`crimson.jpeg` shows what the other five should look like. On a phone connection, loading three of these on page load could add several seconds. Since the character creator's Step 2 actively sends new users here ("Check out the Gallery now →") as inspiration, this is a page worth being fast.

**Fix:** resize to ~1000px on the long edge and re-compress. On macOS, no extra tooling needed:
```bash
sips -Z 1000 -s formatOptions 75 assets/images/characters/hana.jpg --out assets/images/characters/hana.jpg
sips -Z 1000 -s formatOptions 75 assets/images/characters/maeve.jpg --out assets/images/characters/maeve.jpg
sips -Z 1000 -s formatOptions 75 assets/images/characters/acharia.jpg --out assets/images/characters/acharia.jpg
```
(Back up originals first — `sips` overwrites in place.)

### Sequencing note (not a bug)
Four of six characters (Maeve, Hana, Lyonoris, Hal) still have "Description coming soon" bios. Since this page is pitched as inspiration from Step 2 of the character creator, it may be worth finishing a couple more bios before leaning on it too hard in that pitch — just a prioritization thought, not a complaint about the placeholder handling itself (which is done well).

---

## xumaria.html

### Issue: "Coming Soon!" header undersells the real content on the page
**Category:** Presentation

The page opens with a big `<h1>Coming Soon!</h1>`, immediately followed by a fully-written homebrew race with six detailed, flavorful cards (base Verdarii + five subraces). That's real, substantial content — labeling the whole page "Coming Soon" (and the nav-page title reinforcing "Xumaria... Stub, marked 'Coming Soon!'") undersells it and may cause a reader to bounce before scrolling down to the actually-finished race.

**Fix:** reframe the header around what *is* there, rather than what isn't:
```html
<h1>The World of Xumaria</h1>
<p>
  This page will eventually cover the full Xumaria setting. For now, here's
  the first playable piece: the Verdarii, a nature-bound Elven people.
</p>
```

### Balance note (DM perspective)
**Category:** Content — worth a deliberate pass, not an error (it's homebrew, so there's no "correct" answer)

Each Verdarii subrace carries 9–11 total traits — a base kit shared by all five (Fey Ancestry, Child of the Forest, Keen Senses, Trance) plus 4–5 subrace-unique traits that typically include a limited-use bonus-action AoE effect (poison/charm/knockback), a cantrip, an extra skill proficiency, and a passive combat buff, on top of a +2/+1 ability score increase. For comparison, a core SRD race (e.g. Dwarf, Elf) usually has 3–5 total traits and no combat action economy additions. This reads meaningfully stronger than anything in the core rulebook. Since this site's audience is brand-new players who won't have the experience to judge power level themselves, it's worth either a balance pass or an explicit note ("this race runs a bit stronger than standard — clear it with your DM first").

### Minor: redundant trait text
Every Verdarii card lists both **Fey Ancestry** ("magic can't put you to sleep") and **Trance** ("magic can't put you to sleep") — the same sleep immunity stated twice on one card. Low priority, but worth trimming one mention.

---

## turn-guide.html & roleplaying.html

Both are correctly treated as stubs by this review (per the ground rules above) — the only issue worth flagging is one that exists independent of how much content is there.

### Issue: Nav label doesn't match the page's own heading
**Category:** Presentation/Consistency

Both pages are reachable from a nav label that doesn't match what the page calls itself once you arrive:

| Nav label (`js/main.js`) | Page `<h1>` / `<title>` |
|---|---|
| "Survive Combat" | "Turn Guide" / "D&D Turn Guide" |
| "Be Your Character" | "Roleplaying" / "D&D Roleplaying" |

This is a small "did I click the right thing?" moment — a new user clicks "Survive Combat" and lands on a page that calls itself "Turn Guide," with no visual continuity between the two names. Worth picking one name per page and using it everywhere (nav, `<title>`, `<h1>`).

The one piece of real content on `turn-guide.html` (Death Saves) is accurate, with one small precision issue:

> "melee attacks are automatic critical hits against an unconscious character"

The actual rule is about proximity, not attack type: **any** attack (including a thrown weapon or a touch spell) automatically crits an unconscious/incapacitated target if the attacker is within 5 feet — this covers virtually all melee attacks, but not a reach-weapon attack from 10 feet, and it does cover some ranged-in-name-only attacks made at point-blank range.

**Fix:**
```html
<p>
  ...Taking any damage while you're at 0 HP counts as an automatic failure
  (two if it's a critical hit — any attack made from within 5 feet of an
  unconscious creature is automatically a critical hit, which covers
  virtually every melee attack).
</p>
```

---

## extra-rules.html

Accurate as far as it goes. One small edge case worth adding:

**Issue: Missing the "minimum 1 HP" floor on level-up**
**Category:** Accuracy (minor, edge case)

> "Whichever method you use, always add your Constitution modifier to the hit points you gain each level."

The rule also guarantees a minimum of 1 HP gained per level even if a negative Constitution modifier would push the total below that (relevant for very low-Con builds, e.g. a Con 6 Wizard rolling low). Small addition:
```html
<p>
  Whichever method you use, always add your Constitution modifier to the
  hit points you gain each level. Even with a negative modifier, you always
  gain at least 1 hit point per level.
</p>
```

---

## Cross-Cutting Issues

Things that span multiple pages or live in the shared CSS/JS.

### `.btn-secondary` fails WCAG AA text contrast
**Category:** Accessibility

Computed contrast of `--color-accent` (`#c41e1e`) text against `--color-bg` (`#111111`) is **3.19:1**. WCAG AA requires 4.5:1 for normal-size text (the button's `--text-base` / semibold doesn't qualify as "large text," which would only need 3:1). This button variant is used constantly — "Download Blank Character Sheet," "Full Class Details," every "Browse the ___ List" button. It's readable, but it's under the accessibility bar as written.

**Fix:** introduce a slightly lighter red specifically for text-on-dark use, distinct from the fill/border red:
```css
:root {
  --color-accent-text: #e2504f; /* ~4.6:1 on --color-bg — verified */
}
.btn-secondary {
  color: var(--color-accent-text);
  border-color: var(--color-accent-text);
}
```
(Other uses of `--color-accent` as a background — buttons, borders, the `.step-icon.active` pip — are unaffected and don't have this problem, since they're not text-on-background contrast.)

*(For reference, other checked pairs all clear AA: body text 15.8:1, muted text 5.8–6.1:1, tinted text 8.4–8.8:1, text-on-filled-button 5–6.7:1.)*

### Missing `<link rel="preconnect">` on 4 of 10 pages
**Category:** Performance/Consistency

`index.html`, `character-creator.html`, `character-options.html`, `classes.html`, `gallery.html`, and `xumaria.html` all preconnect to `fonts.googleapis.com`. `turn-guide.html`, `roleplaying.html`, `extra-rules.html`, and `glossary.html` don't. Small, easy fix — add the same `<link rel="preconnect" ...>` tag those four pages are missing, right above the existing Google Fonts `<link>`.

### Dormant design-system pieces
**Category:** Code quality, informational only

- `--color-text-subtle: #333333` is defined in `variables.css` (commented "Footer, very de-emphasized") but never referenced anywhere in `styles.css` — the footer actually uses `--color-text-muted`. Not a live bug, but if this token ever does get wired up: its contrast against `--color-bg` is **1.49:1**, effectively invisible. It would need lightening before use.
- `.section-definition` and `.section-reference` (and the `--color-info` / `--color-reference` tokens behind them) are fully styled in `styles.css` but not used in any current HTML. Fine to leave as prepared-but-unused infrastructure — just flagging so it doesn't look like an oversight.

### Table cells using em dashes
**Category:** Convention consistency, very low priority

This repo's own convention (CLAUDE.md) is "No em-dashes in page copy." `character-creator.html`'s armor/weapon reference tables use literal em dashes ("—") as "no value" placeholders in ~24 cells (e.g. armor table's Strength/Stealth columns). This is a common, defensible table convention and reads fine — but it's worth either explicitly carving out table cells as an exception to the house style, or swapping to plain text like "—" → "None" for strict consistency with the stated rule.

### Nav logo on narrow phones — worth checking in-browser
**Category:** Responsive layout, unverified

`.main-nav` has a fixed `height: var(--nav-height)` (80px) at all widths, and the logo text ("An Introductory D&D 5e Guide") sits inline with the icon and the hamburger button with no font-size reduction at the 640px breakpoint. On the narrowest common phone widths (320–375px), that's a tight fit alongside the hamburger button. I can't confirm this actually wraps or clips without rendering it, but it's close enough to the edge of my own width estimate that it's worth a real check on a small device/emulator. If it does wrap, a `font-size` step-down for `.nav-logo` at the 640px breakpoint (or a shorter mobile-only logo string) would fix it cheaply.

---

## What's working well (worth preserving as the site grows)

- The character creator's step tracker is a genuinely well-designed piece of UI: sticky positioning, collapse-to-bar state (persisted), URL hash sync, `localStorage` step memory, and three distinct responsive layouts (desktop pips → tablet current-pip-with-arrows → mobile `<select>`) — all handled without a framework.
- The `<dialog>`-based modal system (gallery, character options, Xumaria) is accessible by default: native focus trapping, Escape handling, and focus restore, plus real `<button>` cards so keyboard activation works without extra JS.
- Deep linking is thought through end-to-end — `character-options.html#fighter` both scrolls to and opens the right card on load, and the character creator's own `#step-4` hashes survive refresh and browser back/forward.
- The SRD sourcing discipline (explicit comment about cross-checking against Open5e, consistent SRD-vs-non-SRD callouts for Artificer/Blood Hunter and the PHB-only backgrounds) is exactly the kind of rigor a rules-accuracy-sensitive site needs, and it shows in how few actual rules errors turned up in this review.
- The DM-voice writing (Step 5's aside about preferring rolled stats, the personal house-rules `<details>` blocks) does what the brief asked for — it reads like a specific person's table, not a wiki.
