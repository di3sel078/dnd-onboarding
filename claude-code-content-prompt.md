# Claude Code: Content and Structure Changes — `character-creator.html`

## Project context

Static site, no build step, no framework. All content lives in HTML. `js/main.js` drives the step switcher. `css/styles.css` has all component styles. Existing design tokens are in `css/variables.css`.

**Style rules for any new prose you write:**
- Heading + paragraph pattern: `<h2>Section</h2> <p>Explanation.</p>`, then `<h3>Subsection</h3> <p>Text.</p>` and so on.
- Avoid `<ul>` unless the content is genuinely a list of items with no natural prose flow. The existing page uses `<ul>` sparingly.
- Match the existing voice: light, educational, first-person DM perspective. Refer to the surrounding paragraphs in each step to calibrate tone before writing new copy.
- All new sections go inside a `<div class="section">` wrapper, matching the existing pattern.
- Use `<strong>` for the first use of a key term, just as the existing content does.

---

## Change 1 — Step 3: Replace the external class link + add "How to Read a Class Entry"

### 1a. Replace the "Browse the Full Class List" button

The current button links to `https://dnd5e.wikidot.com/#toc19`. Replace the `href` with:

```
https://www.dndbeyond.com/sources/dnd/basic-rules-2014/classes
```

Update the button label to: `Browse the Class List (D&D Basic Rules)`

The surrounding prose can stay as-is.

### 1b. Add a "How to Read a Class Entry" section

Add a new `<div class="section">` immediately after the "Where To See The Full Class List" section. It explains what a class entry looks like on the linked page and what to record. Write it in the existing DM voice. Cover these items in this order, each as an `<h3>` + `<p>`:

**`<h3>Saving Throws</h3>`** — Every class makes you proficient in exactly two saving throws, listed at the top of the class entry. Write both in the "Saving Throws" section of your sheet by filling in the bubble next to each one.

**`<h3>Armor and Weapon Proficiencies</h3>`** — The entry lists which armor categories (light, medium, heavy, shields) and weapon categories (simple, martial) your class is trained in. Write these in the "Other Proficiencies & Languages" box.

**`<h3>Skills</h3>`** — Your class offers a short list of skills to choose from and tells you how many to pick (usually two). Hold off on selecting them for now — Step 7 covers skills in full. Just make a note of which skills are on your class's list.

**`<h3>Starting Equipment</h3>`** — Your class gives you a choice of starting gear, usually something like "option A or option B." Pick one from each choice. You'll write the gear down in Step 9 when we cover equipment.

**`<h3>Level 1 Features</h3>`** — At the bottom of your class entry you'll find a table of class features and which level you get them. Look at the level 1 row — those are the abilities your character starts with. Write their names in the "Features & Traits" box on your sheet. Some of them are choices you need to make right now (a Fighter picks a Fighting Style; a Cleric picks a Divine Domain), so read each one and decide. You don't need to memorize the rules, just know what you have access to.

---

## Change 2 — Step 4: Replace the external race link + add "How to Read a Race Entry"

### 2a. Replace the "Browse the Full Race List" button

The current button links to `https://dnd5e.wikidot.com/#toc2`. Replace the `href` with:

```
https://www.dndbeyond.com/sources/dnd/basic-rules-2014/races
```

Update the button label to: `Browse the Race List (D&D Basic Rules)`

### 2b. Add a "How to Read a Race Entry" section

Add a new `<div class="section">` immediately after the "Where to See the Full List" section. Same `<h3>` + `<p>` pattern as Change 1b:

**`<h3>Ability Score Increases</h3>`** — Your race bumps one or more of your six ability scores by a set amount (for example, elves get +2 Dexterity). Don't apply these yet — you'll add them on top of your scores in Step 5.

**`<h3>Speed</h3>`** — Write this number in the "Speed" box near the top of your sheet. Most races walk 30 feet per turn; some are faster or slower.

**`<h3>Size</h3>`** — Most races are Medium, a few are Small. Note it if it's Small — it affects a handful of things like which weapons you can use effectively.

**`<h3>Languages</h3>`** — Your race grants Common plus one or two others. Write them in the "Other Proficiencies & Languages" box.

**`<h3>Traits</h3>`** — These are your race's built-in perks: darkvision, resistances, special abilities, and so on. Write the trait names (and any short notes on what they do) in the "Features & Traits" box alongside your class features from Step 3.

---

## Change 3 — Step 5: Restructure the ability scores section

The current Step 5 has four sections: the six score descriptions, "How to Determine Your Scores," "So What Do I Do With These Numbers?", and "House Rules." Replace this with the structure below. Preserve all existing prose where possible — restructure, don't rewrite from scratch unless a section is being added.

### New section order:

**1. "What Are the Six Ability Scores?"** — Keep exactly as-is.

**2. "What You'll Need From Earlier Steps" (new `<div class="section">`)**

Add this before the scoring methods. Write in the existing DM voice:

`<h2>What You'll Need From Earlier Steps</h2>`
`<p>` Before you start generating numbers, grab two things from your earlier choices. `</p>`

`<h3>Your Class's Primary Ability</h3>`
`<p>` From Step 3, your class entry lists a primary ability (or two). That's where you'll want your highest score. If you don't remember it, the table earlier in Step 3 has it. `</p>`

`<h3>Your Race's Ability Score Increases</h3>`
`<p>` From Step 4, your race bumps certain scores after you assign them. Keep that in mind as you go — a racial +2 can nudge a 14 up to a 16, which is a meaningful difference. `</p>`

**3. "Generate Your Scores" (renamed from "How to Determine Your Scores")**

Keep the existing intro paragraph and all three subsections (Rolling for Stats, Standard Array, Point Buy). The only edit: remove the sentence from the Rolling section that says to apply racial ability score increases there — that's now handled in section 5 below.

**4. "Assign Your Scores" (new `<div class="section">`)**

`<h2>Assign Your Scores</h2>`
`<p>` Once you have your six numbers, write each one in the large box next to the ability name on your sheet. Put your highest number in your class's primary ability, and work down from there. Constitution is worth investing in for almost every character since it directly affects your hit points, so try not to dump it entirely. `</p>`

**5. "Add Your Racial Increases" (new `<div class="section">`)**

`<h2>Add Your Racial Increases</h2>`
`<p>` Now take the ability score increases from your race (Step 4) and add them on top of what you just assigned. Update the large score box and recalculate the modifier oval below it. Scores cap at 20, even with racial bonuses. `</p>`

**6. "Calculate Your Modifiers" (renamed from "So What Do I Do With These Numbers?")**

Keep all existing content — the formula, the example, the modifier table. Just rename the `<h2>` to `"Calculate Your Modifiers"`. Remove any sentence that restates the racial increase instruction (it's now in section 5).

**7. "House Rules"** — Keep exactly as-is at the end.

---

## Change 4 — Step 6: Replace the background link + add suggested traits note

The current button links to `https://dnd5e.wikidot.com/#toc3`. Replace the `href` with:

```
https://www.dndbeyond.com/sources/dnd/basic-rules-2014/personality-and-background
```

Update the button label to: `Browse the Background List (D&D Basic Rules)`

After the button's `<div class="center-container">`, add a `<p>` (inside the section but outside the center-container):

> Each background entry includes tables of suggested Personality Traits, Ideals, Bonds, and Flaws. If you left those boxes blank back in Step 2, fill them in now — either roll on the tables or just pick the lines that sound most like your character.

---

## Change 5 — Step 8: Spell list link, level-1 table, components, concentration, rituals

### 5a. Spell list link

At the end of the "Spells Under Attacks & Spellcasting" section (or whichever section is last in the current Step 8), add a `<p>` followed by a `<div class="center-container">` with a `.btn.btn-primary` link:

`<p>` When you're ready to pick your spells, the link below lets you filter by class so you only see what's available to you. Read each spell's full entry before choosing — knowing what your spells actually do is worth the extra few minutes. `</p>`

```html
<div class="center-container">
  <a href="https://www.dndbeyond.com/spells" target="_blank" class="btn btn-primary">Browse the Spell List (D&D Beyond)</a>
</div>
```

### 5b. Level-1 spell counts table

Add a new `<div class="section">` before the "Spell Slots" section. Heading and intro:

`<h2>Starting Spells at Level 1</h2>`
`<p>` How many spells and slots you start with depends on your class. Here's the breakdown. Paladins and Rangers don't get spells until level 2 — if your game starts at level 1, you can skip the rest of this step and come back after your first level-up. `</p>`

Then a table using the existing `.modifier-table` class inside a `.table-wrap` div, with `<thead>` and `<tbody>`, and `scope="col"` on each `<th>`:

| Class | Cantrips | Spells Known or Prepared | 1st-Level Slots |
|---|---|---|---|
| Bard | 2 | 4 known | 2 |
| Cleric | 3 | Wisdom modifier + 1 prepared | 2 |
| Druid | 2 | Wisdom modifier + 1 prepared | 2 |
| Sorcerer | 4 | 2 known | 2 |
| Warlock | 2 | 2 known | 1 |
| Wizard | 3 | 6 in spellbook; Intelligence modifier + 1 prepared | 2 |
| Paladin | — | — | None until level 2 |
| Ranger | — | — | None until level 2 |

After the table, add a `<p>`:

> Write your spell save DC and spell attack modifier in the boxes at the top of the Attacks & Spellcasting section (you calculated these earlier in this step). Then write out each spell you've chosen below them — cantrips first, then your leveled spells.

### 5c. Spell components

Add a new `<div class="section">` after the level-1 table section:

`<h2>Spell Components</h2>`
`<p>` Every spell lists a **Components** line that tells you what it physically takes to cast. There are three kinds. `</p>`

`<h3>Verbal (V)</h3>`
`<p>` You have to speak — so you can't cast it while silenced, gagged, or anywhere speaking would blow your cover. `</p>`

`<h3>Somatic (S)</h3>`
`<p>` You need at least one free hand for the gestures. If both hands are occupied and you can't free one up, you can't complete the cast. `</p>`

`<h3>Material (M)</h3>`
`<p>` The spell requires a physical component — sometimes something specific (a pinch of soot, a bit of fleece), sometimes just anything from a standard component pouch. A **component pouch** or a **spellcasting focus** (a wand, orb, staff, or holy symbol depending on your class) covers almost all material components automatically. Your starting equipment should include one. `</p>`

### 5d. Concentration

Add a new `<div class="section">` after the components section:

`<h2>Concentration</h2>`
`<p>` Some spells have a duration labeled **Concentration** — they stay active as long as you keep your focus on them. `</p>`

`<p>` You can only concentrate on one spell at a time. Casting a second concentration spell immediately ends the first. If you take damage while concentrating, you make a Constitution saving throw (DC 10 or half the damage taken, whichever is higher) or lose the spell. Worth keeping in mind when you're choosing armor. `</p>`

### 5e. Ritual spells

Add a new `<div class="section">` after the concentration section:

`<h2>Ritual Spells</h2>`
`<p>` Some spells are tagged as **Rituals**. If your class has the ability to cast rituals (Clerics, Druids, and Wizards always do; Bards get it as a class feature), you can cast these without spending a spell slot — it just takes 10 extra minutes. `</p>`

`<p>` It's worth scanning the spell list for rituals when you're picking spells, especially utility ones like Detect Magic or Identify. Free casting costs nothing but time. `</p>`

---

## Change 6 — Step 9: AC, weapon properties, range notation, stealth, and attack bonus

### 6a. Add "No Armor" AC formula

In the "Armor Categories & Armor Class" section, add a new `<h3>No Armor</h3>` block as the first entry, before "Light Armor":

`<h3>No Armor</h3>`
`<p>` If you're not wearing any armor at all, your base AC is **10 + your Dexterity modifier**. Some classes improve on this with their own Unarmored Defense feature — a Barbarian uses 10 + Dex + Constitution, and a Monk uses 10 + Dex + Wisdom. If your class has Unarmored Defense in its level 1 features (you wrote those down in Step 3), use that formula instead. `</p>`

### 6b. Explain the Strength column in the armor table

After the closing `</table>` tag inside the armor `<details>` block, add:

`<p>` The **Strength** column is a minimum requirement. If your Strength score is lower than the number listed, your movement speed drops by 10 feet while wearing that armor. `</p>`

### 6c. Fix the stealth disadvantage note

Remove the sentence "You also have disadvantage on Stealth Ability Checks." from the Heavy Armor `<p>`.

After the Strength note added in 6b, add a second `<p>`:

`<p>` The **Stealth** column marks every armor that imposes disadvantage on Stealth checks. It's not just heavy armor — Padded (light), Scale Mail, and Half Plate (both medium) have it too. Check the column before committing to an armor choice if your character plans on sneaking around. `</p>`

### 6d. Convert weapon properties to a two-column table

The weapon properties currently live inside a `<details>` element as `<h3>` + `<p>` pairs. Replace the contents of that `<details>` block with a two-column table using the existing `.modifier-table` class inside a `.table-wrap` div. Include `<thead>` and `<tbody>`, and `scope="col"` on both header cells.

| Property | What it means |
|---|---|
| Finesse | You can use Dexterity instead of Strength for attack and damage rolls. You must use the same ability for both. |
| Light | Small enough to use in your off hand for two-weapon fighting. |
| Heavy | Too unwieldy for Small creatures — they have disadvantage on attack rolls with it. |
| Reach | Extends your melee range by 5 feet. |
| Thrown | You can throw it as a ranged attack. Uses Strength for attack and damage, or Dexterity if the weapon also has Finesse. |
| Versatile | Can be used one-handed or two-handed. The two-handed damage die is listed in parentheses. |
| Two-Handed | Requires both hands to use. |
| Ammunition | Needs ammo to fire. Range is listed as two numbers — see below. |
| Loading | You can only fire one shot per action, no matter how many attacks you'd normally make. |
| Special | Has a unique rule. Check the full description in the Basic Rules for that weapon. |

### 6e. Add range notation explanation

Immediately after the property table, still inside the same `<details>`, add:

`<h3>Reading the Range</h3>`
`<p>` Range is written as two numbers separated by a slash, like 20/60 or 150/600. The first is your **normal range** in feet — attacks within this distance work as usual. Between the two numbers you can still attack, but with **disadvantage**. Beyond the second number, the target is out of reach entirely. `</p>`

### 6f. Fix the attack bonus section

In "Attack & Damage Bonuses," replace the `<h3>Attack Bonus</h3>` paragraph with:

`<h3>Attack Bonus</h3>`
`<p>` Your attack bonus is your **relevant ability modifier plus your proficiency bonus — but only if you're proficient with that weapon** (which you confirmed in Step 7). If you're not proficient, leave the proficiency bonus out. `</p>`

`<p>` For most melee weapons the relevant ability is Strength. For ranged weapons like bows and crossbows, it's Dexterity. Thrown weapons — javelins, handaxes, daggers — use Strength like a normal melee weapon, unless the weapon has **Finesse**, in which case you can use either. `</p>`

`<p>` When you attack, roll a d20 and add your attack bonus. If the total meets or beats your target's Armor Class, you hit. `</p>`

---

## Change 7 — Step 10: Fill in the remaining boxes

Add the following `<div class="section">` blocks to Step 10, before the existing "Beyond Level 1" section.

### 7a. Passive Perception

`<h2>Passive Perception</h2>`
`<p>` On the left side of your sheet there's a box labeled **Passive Wisdom (Perception)**. Fill it in now: **10 + your Wisdom modifier**, plus your proficiency bonus if you're proficient in Perception (marked in Step 7). Your DM uses this number quietly to decide whether you notice something hidden, without tipping you off by asking for a roll. `</p>`

### 7b. Features & Traits

`<h2>Features & Traits</h2>`
`<p>` If you haven't already, fill in the **Features & Traits** box on the right side of your sheet. This is where your class's level 1 abilities go — things like Second Wind (Fighter), Rage (Barbarian), Sneak Attack (Rogue), or your spellcasting details. Your race's traits go in the same box. `</p>`

`<p>` You recorded these back in Steps 3 and 4. If the box is still blank, flip back and grab them now — this is one of the most important parts of your sheet. `</p>`

### 7c. Inspiration

`<h2>Inspiration</h2>`
`<p>` There's a small box near the top-left of the sheet labeled **Inspiration**. Leave it blank for now. Your DM awards it when you play your character true to who they are, and you spend it to gain advantage on any d20 roll. `</p>`

### 7d. Experience Points

`<h2>Experience Points</h2>`
`<p>` Leave **Experience Points** blank unless your DM has said otherwise. Some tables track XP and level up at set thresholds; others use milestone leveling where the DM calls it when the story's ready. Either way, it doesn't affect your starting sheet. `</p>`

### 7e. Page Two

`<h2>Page Two</h2>`
`<p>` The second page of the sheet is all optional flavor — appearance, backstory, allies, enemies, and notes. None of it affects your stats. Fill in as much or as little as you want before the first session. If you're drawing a blank, leave it and let the campaign fill it in for you. `</p>`

---

## Change 8 — Secret Step 11: Sheet Review

### 8a. Add the step to `character-creator.html`

Add a new `<div class="step" id="step-11">` element directly after the closing `</div>` of `#step-10`, before the `<div class="step-nav">` block.

Do not add a `<li class="tracker-entry">` to the tracker nav for this step.

Do not include a `<span class="step-count">` inside this step — the tracker toggle will display custom text instead (see 8b).

The step's `<h1>` heading: `You're Ready to Play`

Add a `<div class="sheet-tip">` below the `<h1>`:

> `<strong>&#x270E; Sheet Tip:</strong>` Use this as a final checklist. Go through each section below and make sure every box is filled in.

Then add `<div class="section">` blocks for each area of the character sheet, in sheet order. Each section uses `<h2>` for the sheet area and `<h3>` + `<p>` for each box or group. Keep each entry to one sentence: what the value is and which step it came from.

**Section: Top of the Sheet**

`<h2>Top of the Sheet</h2>`

`<h3>Character Name</h3>` `<p>` The name you landed on in Step 2. `</p>`
`<h3>Class & Level</h3>` `<p>` Your class from Step 3, followed by 1 for your starting level. `</p>`
`<h3>Background</h3>` `<p>` Your background from Step 6. `</p>`
`<h3>Player Name</h3>` `<p>` That's you — fill in your name. `</p>`
`<h3>Race</h3>` `<p>` Your race from Step 4. `</p>`
`<h3>Alignment</h3>` `<p>` Your alignment from Step 2, if you chose one. `</p>`
`<h3>Experience Points</h3>` `<p>` Leave blank unless your DM has told you to track XP. `</p>`

**Section: Ability Scores**

`<h2>Ability Scores</h2>`
`<p>` All six scores and their modifier ovals were filled in during Step 5, including racial increases. Double-check that the ovals match the modifier table — this is the most common place for a small arithmetic slip. `</p>`

**Section: Left Column**

`<h2>Left Column</h2>`

`<h3>Inspiration</h3>` `<p>` Leave blank — your DM will award it during play. `</p>`
`<h3>Proficiency Bonus</h3>` `<p>` +2 at level 1, filled in during Step 7. `</p>`
`<h3>Saving Throws</h3>` `<p>` Filled in during Step 10 — each modifier is your ability modifier, plus your proficiency bonus for the two saves your class is proficient in (Step 3). `</p>`
`<h3>Skills</h3>` `<p>` Filled in during Step 7 — proficient skills have their bubbles marked and include your proficiency bonus. `</p>`
`<h3>Passive Wisdom (Perception)</h3>` `<p>` Filled in earlier in this step: 10 + Wisdom modifier (+ proficiency bonus if you're trained in Perception). `</p>`

**Section: Center — Combat Stats**

`<h2>Combat Stats</h2>`

`<h3>Armor Class</h3>` `<p>` Calculated in Step 9 based on your armor type (or Unarmored Defense if your class uses it). `</p>`
`<h3>Initiative</h3>` `<p>` Your Dexterity modifier, filled in earlier in this step. `</p>`
`<h3>Speed</h3>` `<p>` Your race's base walking speed from Step 4, in feet. `</p>`

**Section: Hit Points and Hit Dice**

`<h2>Hit Points and Hit Dice</h2>`

`<h3>HP Maximum and Current HP</h3>` `<p>` Both filled in earlier in this step — they start at the same number. `</p>`
`<h3>Temporary Hit Points</h3>` `<p>` Leave blank — certain spells and abilities grant these during play. `</p>`
`<h3>Hit Dice</h3>` `<p>` Filled in earlier in this step: 1 die of your class's hit die type (1d10 for a Fighter, 1d8 for a Ranger, and so on). `</p>`
`<h3>Death Saves</h3>` `<p>` Leave the circles empty — you'll mark them only if your character drops to 0 HP. `</p>`

**Section: Attacks & Spellcasting**

`<h2>Attacks & Spellcasting</h2>`
`<p>` Filled in during Steps 9 (weapons) and 8 (spells). Each row should have the weapon or spell name, its attack bonus or save DC, and its damage or effect. If you're a non-caster, leave the spell rows blank. `</p>`

**Section: Other Proficiencies & Languages**

`<h2>Other Proficiencies & Languages</h2>`
`<p>` This box pulls from several steps: armor and weapon proficiencies (Step 3), tool proficiencies (Steps 3 and 6), and languages (Steps 4 and 6). If anything is missing, flip back to those steps. `</p>`

**Section: Features & Traits**

`<h2>Features & Traits</h2>`
`<p>` Your level 1 class features (Step 3) and racial traits (Step 4) should both be here. If the box is blank, this is the one to go back and fill — these are your character's actual abilities. `</p>`

**Section: Equipment and Coin**

`<h2>Equipment and Coin</h2>`

`<h3>Equipment</h3>` `<p>` Your starting gear from Step 9. `</p>`
`<h3>Coin</h3>` `<p>` Your starting gold from Step 6 — it goes in the GP box in the coin section. `</p>`

**Section: Personality**

`<h2>Personality</h2>`
`<p>` Personality Traits, Ideals, Bonds, and Flaws from Step 2. If you filled these in using your background's suggestion tables (Step 6), they should already be here. `</p>`

**Section: Page Two**

`<h2>Page Two</h2>`
`<p>` Age, height, weight, appearance, backstory, allies, enemies — all optional. Fill in what feels right and leave the rest blank. The story will fill it in eventually. `</p>`

**Closing section:**

`<div class="section">`
`<h2>That's It</h2>`
`<p>` If every box above has something in it (or is intentionally blank for a good reason), your sheet is done. Bring it to the table and we'll handle everything else together. `</p>`
`</div>`

---

### 8b. Update `js/main.js` to handle Step 11

In `initCharacterCreator()`, make the following changes:

**Identify the review step.** At the top of `showStep()`, add:

```js
const totalPlaySteps = steps.length - 1; // excludes the review step
const isReviewStep = index === steps.length - 1;
```

**Tracker toggle text.** In the section that updates `trackerToggleCount.textContent`, add a branch:

```js
if (isReviewStep) {
  trackerToggleCount.textContent = "Review your sheet";
} else {
  trackerToggleCount.textContent = `Step ${index + 1} of ${totalPlaySteps}`;
}
```

**Hide the tracker pip row on the review step.** Add/remove a class on the tracker nav element:

```js
trackerNav.classList.toggle("review-active", isReviewStep);
```

Then add to `css/styles.css` (CHARACTER CREATOR PAGE section):

```css
/* Hide step pips on the sheet review step */
.step-tracker-nav.review-active .step-tracker-content {
  display: none;
}
```

**Next button label.** Find the conditional that sets `nextBtn.textContent`. Update it:

```js
if (isReviewStep) {
  // Review step — Next goes to combat guide
  nextBtn.textContent = "Next: How to Survive Combat →";
} else if (index === steps.length - 2) {
  // Step 10 — Next goes to the review step
  nextBtn.textContent = "Next: Review Your Sheet →";
} else {
  nextBtn.textContent = "Next";
}
```

**Previous button.** The previous button on the review step should read "Previous" and go back to Step 10 (index 9). The existing `prevBtn` logic already handles this by decrementing the index — no change needed, but verify it works.

**Tracker arrow buttons (the small prev/next inside the tracker nav).** These disable at `index === steps.length - 1`, which is now the review step. That's correct — leave as-is.

**Tracker pip active state.** The tracker pips are `<li class="tracker-entry">` items with indices 0–9 (for steps 1–10). On the review step (index 10), no pip will match, so no pip goes active. That is the correct behavior — no change needed, but make sure the active-pip logic doesn't throw a reference error when `index === 10`. Add a guard if needed:

```js
trackerEntries.forEach((entry, i) => {
  entry.classList.toggle("active", i === index);
});
// index 10 simply won't match any entry — that's intentional
```

**URL hash.** The review step pushes `#step-11` to the URL via the existing `history.pushState` logic. `stepFromHash()` should already parse it correctly as index 10 (hash number minus 1). Verify and adjust if needed.

**`nextBtn` navigation on the review step.** When `isReviewStep` is true, clicking Next should navigate to `turn-guide.html` rather than calling `showStep(index + 1)`. Update the Next button click handler:

```js
nextBtn.addEventListener("click", () => {
  if (index === steps.length - 1) {
    window.location.href = "turn-guide.html";
  } else {
    showStep(index + 1);
  }
});
```

If this handler is already inside `showStep()` and re-registered on each call, make sure the old listener is removed before adding the new one (use `{ once: true }` or an `AbortController`), or restructure it to read the current index from a closure variable rather than re-registering on every step change.
