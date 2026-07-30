// ============================================================
// CHARACTER OPTIONS DATA
// CLASSES/RACES/BACKGROUNDS are for character-options.html, rendered by
// initCharacterOptions() in js/main.js. VERDARII_SUBRACES is for
// xumaria.html, rendered by initXumaria(). Loaded only by those two pages,
// before main.js.
//
// Mechanical text is taken from the SRD 5.1 (CC BY 4.0), verified
// against the Open5e API (SRD-tagged results only). The SRD contains
// no flavor/intro prose for classes, so each class `summary` and
// `description` here is original wording written for this site.
//
// Adding an entry: append an object to the right array. The `id` is
// the card's anchor hash (character-options.html#fighter) and must be
// unique across all three arrays. No rendering JS changes needed.
//
// level1Feature / level1FeatureSecondary and featuresTable are no longer
// rendered anywhere: levelFeatures (below) now covers what a class gets at
// every level, so showing them too was duplicate information. They're kept
// because their contents are still useful source material. Barbarian's
// level1Feature prose is exactly the kind of description levelFeatures
// entries need, and its featuresTable holds the verified SRD 5.1 resource
// progression (Rages, Rage Damage) that the flat list deliberately drops.
//
// levelFeatures is the flat "what do I get and when" list used by
// classes.html: [{ name: "Rage", level: 1 }, ...] in level order, covering
// every base class feature from the SRD 5.1 class table. Levels that grant
// no new feature are simply left out. Subclass rows follow the SRD's own
// wording: the level you choose the subclass uses the bare term ("Primal
// Path"), and later levels that grant an unnamed subclass feature use
// "<term> feature" ("Primal Path feature"). Specific subclasses (Path of
// the Berserker, Champion, ...) are deliberately never named here.
//
// featureDescriptions is the full write-up for every feature past level 1,
// so a class can eventually have every feature up to level 20 described.
// Fill in as an array of per-level groups:
//   featureDescriptions: [
//     { level: 2, features: [{ name: "Feature Name", desc: "..." }] },
//     { level: 3, features: [{ name: "...", desc: "..." }, { name: "...", desc: "..." }] },
//     ...
//   ],
// Only include levels that grant a new feature; it's null by default and
// the section only renders once filled in.
//
// Classes that aren't part of the core rules (e.g. Artificer, Blood
// Hunter) are marked `core: false` and render under the "Other Classes"
// sub-heading on character-options.html instead of the main grid.
// ============================================================

const CLASSES = [
  {
    id: "barbarian",
    name: "Barbarian",
    summary: "A fierce warrior who channels rage into devastating attacks.",
    description:
      "Barbarians shrug off blows that would fell anyone else and answer them with wild, overwhelming force. If you want to be the toughest person in the room and solve most problems with a greataxe, this is your class.",
    hitDie: "d12",
    hpAtFirst: "12 + your Constitution modifier",
    primaryAbility: "Strength",
    saves: "Strength & Constitution",
    armor: "Light armor, medium armor, shields",
    weapons: "Simple weapons, martial weapons",
    tools: "None",
    skills:
      "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival",
    equipment: [
      "(a) a greataxe or (b) any martial melee weapon",
      "(a) two handaxes or (b) any simple weapon",
      "An explorer's pack and four javelins",
    ],
    spellcasting: null,
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: {
      name: "Rage",
      desc: "On your turn, you can enter a ferocious rage as a bonus action. While raging (and not wearing heavy armor), you have advantage on Strength checks and saving throws, you gain a bonus to damage on Strength melee weapons, you have resistance to bludgeoning, piercing, and slashing damage. If you are able to cast spells, you cannot cast them or concentrate on them while raging. Your rage lasts for 1 minute and ends early if you are knocked unconscious, do not take or deal damage for 1 full round, or you choose to end it as a bonus action.",
    },
    level1FeatureSecondary: {
      name: "Unarmored Defense",
      desc: "While you are not wearing any armor, your armor class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.",
    },
    featuresTable: {
      columns: ["Level", "Prof. Bonus", "Features", "Rages", "Rage Damage"],
      rows: [
        ["1", "+2", "Rage, Unarmored Defense", "2", "+2"],
        ["2", "+2", "Reckless Attack, Danger Sense", "2", "+2"],
        ["3", "+2", "Primal Path", "3", "+2"],
        ["4", "+2", "Ability Score Improvement", "3", "+2"],
        ["5", "+3", "Extra Attack, Fast Movement", "3", "+2"],
        ["6", "+3", "Path feature", "4", "+2"],
        ["7", "+3", "Feral Instinct", "4", "+2"],
        ["8", "+3", "Ability Score Improvement", "4", "+2"],
        ["9", "+4", "Brutal Critical (1 die)", "4", "+3"],
        ["10", "+4", "Path feature", "4", "+3"],
        ["11", "+4", "Relentless Rage", "4", "+3"],
        ["12", "+4", "Ability Score Improvement", "5", "+3"],
        ["13", "+5", "Brutal Critical (2 dice)", "5", "+3"],
        ["14", "+5", "Path feature", "5", "+3"],
        ["15", "+5", "Persistent Rage", "5", "+3"],
        ["16", "+5", "Ability Score Improvement", "5", "+4"],
        ["17", "+6", "Brutal Critical (3 dice)", "6", "+4"],
        ["18", "+6", "Indomitable Might", "6", "+4"],
        ["19", "+6", "Ability Score Improvement", "6", "+4"],
        ["20", "+6", "Primal Champion", "Unlimited", "+4"],
      ],
    },
    featureDescriptions: null,
    levelFeatures: [
      { name: "Rage", level: 1 },
      { name: "Unarmored Defense", level: 1 },
      { name: "Reckless Attack", level: 2 },
      { name: "Danger Sense", level: 2 },
      { name: "Primal Path", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Extra Attack", level: 5 },
      { name: "Fast Movement", level: 5 },
      { name: "Primal Path feature", level: 6 },
      { name: "Feral Instinct", level: 7 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Brutal Critical (1 die)", level: 9 },
      { name: "Primal Path feature", level: 10 },
      { name: "Relentless Rage", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Brutal Critical (2 dice)", level: 13 },
      { name: "Primal Path feature", level: 14 },
      { name: "Persistent Rage", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Brutal Critical (3 dice)", level: 17 },
      { name: "Indomitable Might", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Primal Champion", level: 20 },
    ],
    subclass: {
      term: "Primal Path",
      level: 3,
      name: "Path of the Berserker",
      blurb: "Channel your rage into a frenzy of extra attacks.",
    },
  },
  {
    id: "bard",
    name: "Bard",
    summary:
      "A charismatic performer who inspires allies and weaves magic through music and words.",
    description:
      "Bards are the ultimate jack-of-all-trades: part spellcaster, part support, part face of the party. Their music bolsters allies, their words cut down enemies, and they're at least a little good at everything.",
    hitDie: "d8",
    hpAtFirst: "8 + your Constitution modifier",
    primaryAbility: "Charisma",
    saves: "Dexterity & Charisma",
    armor: "Light armor",
    weapons: "Simple weapons, hand crossbows, longswords, rapiers, shortswords",
    tools: "Three musical instruments of your choice",
    skills: "Choose any three",
    equipment: [
      "(a) a rapier, (b) a longsword, or (c) any simple weapon",
      "(a) a diplomat's pack or (b) an entertainer's pack",
      "(a) a lute or (b) any other musical instrument",
      "Leather armor and a dagger",
    ],
    spellcasting: {
      ability: "Charisma",
      note: "Full spellcaster from level 1.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Spellcasting", level: 1 },
      { name: "Bardic Inspiration (d6)", level: 1 },
      { name: "Jack of All Trades", level: 2 },
      { name: "Song of Rest (d6)", level: 2 },
      { name: "Bard College", level: 3 },
      { name: "Expertise", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Bardic Inspiration (d8)", level: 5 },
      { name: "Font of Inspiration", level: 5 },
      { name: "Countercharm", level: 6 },
      { name: "Bard College feature", level: 6 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Song of Rest (d8)", level: 9 },
      { name: "Bardic Inspiration (d10)", level: 10 },
      { name: "Expertise", level: 10 },
      { name: "Magical Secrets", level: 10 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Song of Rest (d10)", level: 13 },
      { name: "Magical Secrets", level: 14 },
      { name: "Bard College feature", level: 14 },
      { name: "Bardic Inspiration (d12)", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Song of Rest (d12)", level: 17 },
      { name: "Magical Secrets", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Superior Inspiration", level: 20 },
    ],
    subclass: {
      term: "Bard College",
      level: 3,
      name: "College of Lore",
      blurb: "Collect knowledge and magical secrets from every discipline.",
    },
  },
  {
    id: "cleric",
    name: "Cleric",
    summary:
      "A devoted servant of a deity, channeling divine power to heal and smite.",
    description:
      "Clerics wield magic on loan from a god, and they're far more than healers. A cleric in the right armor can hold the front line while patching up the party and turning away the undead.",
    hitDie: "d8",
    hpAtFirst: "8 + your Constitution modifier",
    primaryAbility: "Wisdom",
    saves: "Wisdom & Charisma",
    armor: "Light armor, medium armor, shields",
    weapons: "Simple weapons",
    tools: "None",
    skills:
      "Choose two from History, Insight, Medicine, Persuasion, and Religion",
    equipment: [
      "(a) a mace or (b) a warhammer (if proficient)",
      "(a) scale mail, (b) leather armor, or (c) chain mail (if proficient)",
      "(a) a light crossbow and 20 bolts or (b) any simple weapon",
      "(a) a priest's pack or (b) an explorer's pack",
      "A shield and a holy symbol",
    ],
    spellcasting: {
      ability: "Wisdom",
      note: "Full spellcaster from level 1. You also pick your Divine Domain at level 1.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Spellcasting", level: 1 },
      { name: "Divine Domain", level: 1 },
      { name: "Channel Divinity (1/rest)", level: 2 },
      { name: "Divine Domain feature", level: 2 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Destroy Undead (CR 1/2)", level: 5 },
      { name: "Channel Divinity (2/rest)", level: 6 },
      { name: "Divine Domain feature", level: 6 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Destroy Undead (CR 1)", level: 8 },
      { name: "Divine Domain feature", level: 8 },
      { name: "Divine Intervention", level: 10 },
      { name: "Destroy Undead (CR 2)", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Destroy Undead (CR 3)", level: 14 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Destroy Undead (CR 4)", level: 17 },
      { name: "Divine Domain feature", level: 17 },
      { name: "Channel Divinity (3/rest)", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Divine Intervention improvement", level: 20 },
    ],
    subclass: {
      term: "Divine Domain",
      level: 1,
      name: "Life Domain",
      blurb:
        "The game's best healer, with every restorative spell hitting harder.",
    },
  },
  {
    id: "druid",
    name: "Druid",
    summary:
      "A guardian of nature who can shapeshift and command the elements.",
    description:
      "Druids draw their magic from nature itself, calling down lightning, commanding vines, and, most famously, transforming into wild animals with Wild Shape at level 2.",
    hitDie: "d8",
    hpAtFirst: "8 + your Constitution modifier",
    primaryAbility: "Wisdom",
    saves: "Intelligence & Wisdom",
    armor:
      "Light armor, medium armor, shields (druids will not wear armor or use shields made of metal)",
    weapons:
      "Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears",
    tools: "Herbalism kit",
    skills:
      "Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival",
    equipment: [
      "(a) a wooden shield or (b) any simple weapon",
      "(a) a scimitar or (b) any simple melee weapon",
      "Leather armor, an explorer's pack, and a druidic focus",
    ],
    spellcasting: { ability: "Wisdom", note: "Full spellcaster from level 1." },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Druidic", level: 1 },
      { name: "Spellcasting", level: 1 },
      { name: "Wild Shape", level: 2 },
      { name: "Druid Circle", level: 2 },
      { name: "Wild Shape improvement", level: 4 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Druid Circle feature", level: 6 },
      { name: "Wild Shape improvement", level: 8 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Druid Circle feature", level: 10 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Druid Circle feature", level: 14 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Timeless Body", level: 18 },
      { name: "Beast Spells", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Archdruid", level: 20 },
    ],
    subclass: {
      term: "Druid Circle",
      level: 2,
      name: "Circle of the Land",
      blurb: "Draw extra spells and power from the terrain you call home.",
    },
  },
  {
    id: "fighter",
    name: "Fighter",
    summary:
      "A master of weapons and combat tactics, adaptable to almost any fighting style.",
    description:
      "Fighters are the most flexible martial class: archer, duelist, armored knight. Every weapon and every suit of armor is on the table. Simple to start, with plenty of depth as you level.",
    hitDie: "d10",
    hpAtFirst: "10 + your Constitution modifier",
    primaryAbility: "Strength or Dexterity",
    saves: "Strength & Constitution",
    armor: "All armor, shields",
    weapons: "Simple weapons, martial weapons",
    tools: "None",
    skills:
      "Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival",
    equipment: [
      "(a) chain mail or (b) leather armor, longbow, and 20 arrows",
      "(a) a martial weapon and a shield or (b) two martial weapons",
      "(a) a light crossbow and 20 bolts or (b) two handaxes",
      "(a) a dungeoneer's pack or (b) an explorer's pack",
    ],
    spellcasting: null,
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Fighting Style", level: 1 },
      { name: "Second Wind", level: 1 },
      { name: "Action Surge (one use)", level: 2 },
      { name: "Martial Archetype", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Extra Attack", level: 5 },
      { name: "Ability Score Improvement", level: 6 },
      { name: "Martial Archetype feature", level: 7 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Indomitable (one use)", level: 9 },
      { name: "Martial Archetype feature", level: 10 },
      { name: "Extra Attack (2)", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Indomitable (two uses)", level: 13 },
      { name: "Ability Score Improvement", level: 14 },
      { name: "Martial Archetype feature", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Action Surge (two uses)", level: 17 },
      { name: "Indomitable (three uses)", level: 17 },
      { name: "Martial Archetype feature", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Extra Attack (3)", level: 20 },
    ],
    subclass: {
      term: "Martial Archetype",
      level: 3,
      name: "Champion",
      blurb: "A straightforward warrior who lands critical hits more often.",
    },
  },
  {
    id: "monk",
    name: "Monk",
    summary:
      "A disciplined martial artist who fights with fists, focus, and inner energy.",
    description:
      "Monks turn their own body into a weapon, darting around the battlefield with unmatched speed and spending inner energy (ki) on flurries of blows, stunning strikes, and acrobatic escapes.",
    hitDie: "d8",
    hpAtFirst: "8 + your Constitution modifier",
    primaryAbility: "Dexterity & Wisdom",
    saves: "Strength & Dexterity",
    armor: "None",
    weapons: "Simple weapons, shortswords",
    tools: "Choose one type of artisan's tools or one musical instrument",
    skills:
      "Choose two from Acrobatics, Athletics, History, Insight, Religion, and Stealth",
    equipment: [
      "(a) a shortsword or (b) any simple weapon",
      "(a) a dungeoneer's pack or (b) an explorer's pack",
      "10 darts",
    ],
    spellcasting: null,
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Unarmored Defense", level: 1 },
      { name: "Martial Arts", level: 1 },
      { name: "Ki", level: 2 },
      { name: "Unarmored Movement", level: 2 },
      { name: "Monastic Tradition", level: 3 },
      { name: "Deflect Missiles", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Slow Fall", level: 4 },
      { name: "Extra Attack", level: 5 },
      { name: "Stunning Strike", level: 5 },
      { name: "Ki-Empowered Strikes", level: 6 },
      { name: "Monastic Tradition feature", level: 6 },
      { name: "Evasion", level: 7 },
      { name: "Stillness of Mind", level: 7 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Unarmored Movement improvement", level: 9 },
      { name: "Purity of Body", level: 10 },
      { name: "Monastic Tradition feature", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Tongue of the Sun and Moon", level: 13 },
      { name: "Diamond Soul", level: 14 },
      { name: "Timeless Body", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Monastic Tradition feature", level: 17 },
      { name: "Empty Body", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Perfect Self", level: 20 },
    ],
    subclass: {
      term: "Monastic Tradition",
      level: 3,
      name: "Way of the Open Hand",
      blurb: "Master unarmed techniques that trip, shove, and stun.",
    },
  },
  {
    id: "paladin",
    name: "Paladin",
    summary: "A holy warrior bound by a sacred oath to fight for their ideals.",
    description:
      "Paladins combine heavy armor and martial skill with divine magic sworn into them by an oath. They heal with a touch, sense evil, and unleash devastating smites when a hit really matters.",
    hitDie: "d10",
    hpAtFirst: "10 + your Constitution modifier",
    primaryAbility: "Strength & Charisma",
    saves: "Wisdom & Charisma",
    armor: "All armor, shields",
    weapons: "Simple weapons, martial weapons",
    tools: "None",
    skills:
      "Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion",
    equipment: [
      "(a) a martial weapon and a shield or (b) two martial weapons",
      "(a) five javelins or (b) any simple melee weapon",
      "(a) a priest's pack or (b) an explorer's pack",
      "Chain mail and a holy symbol",
    ],
    spellcasting: {
      ability: "Charisma",
      note: "Half-caster: spellcasting starts at level 2.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Divine Sense", level: 1 },
      { name: "Lay on Hands", level: 1 },
      { name: "Fighting Style", level: 2 },
      { name: "Spellcasting", level: 2 },
      { name: "Divine Smite", level: 2 },
      { name: "Divine Health", level: 3 },
      { name: "Sacred Oath", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Extra Attack", level: 5 },
      { name: "Aura of Protection", level: 6 },
      { name: "Sacred Oath feature", level: 7 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Aura of Courage", level: 10 },
      { name: "Improved Divine Smite", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Cleansing Touch", level: 14 },
      { name: "Sacred Oath feature", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Aura improvements", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Sacred Oath feature", level: 20 },
    ],
    subclass: {
      term: "Sacred Oath",
      level: 3,
      name: "Oath of Devotion",
      blurb:
        "The classic knight in shining armor, sworn to honesty and courage.",
    },
  },
  {
    id: "ranger",
    name: "Ranger",
    summary: "A skilled hunter and tracker at home in the wilderness.",
    description:
      "Rangers blend martial skill with nature magic, stalking favored enemies across favored terrain. Equally comfortable with two blades or a longbow, they keep the party fed, on the trail, and out of ambushes.",
    hitDie: "d10",
    hpAtFirst: "10 + your Constitution modifier",
    primaryAbility: "Dexterity & Wisdom",
    saves: "Strength & Dexterity",
    armor: "Light armor, medium armor, shields",
    weapons: "Simple weapons, martial weapons",
    tools: "None",
    skills:
      "Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival",
    equipment: [
      "(a) scale mail or (b) leather armor",
      "(a) two shortswords or (b) two simple melee weapons",
      "(a) a dungeoneer's pack or (b) an explorer's pack",
      "A longbow and a quiver of 20 arrows",
    ],
    spellcasting: {
      ability: "Wisdom",
      note: "Half-caster: spellcasting starts at level 2.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Favored Enemy", level: 1 },
      { name: "Natural Explorer", level: 1 },
      { name: "Fighting Style", level: 2 },
      { name: "Spellcasting", level: 2 },
      { name: "Ranger Archetype", level: 3 },
      { name: "Primeval Awareness", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Extra Attack", level: 5 },
      // The SRD table lists level 6 as one combined cell, "Favored Enemy and
      // Natural Explorer improvements"; split here to match how levels 10 and
      // 14 list the same two improvements separately
      { name: "Favored Enemy improvement", level: 6 },
      { name: "Natural Explorer improvement", level: 6 },
      { name: "Ranger Archetype feature", level: 7 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Land's Stride", level: 8 },
      { name: "Natural Explorer improvement", level: 10 },
      { name: "Hide in Plain Sight", level: 10 },
      { name: "Ranger Archetype feature", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Favored Enemy improvement", level: 14 },
      { name: "Vanish", level: 14 },
      { name: "Ranger Archetype feature", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Feral Senses", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Foe Slayer", level: 20 },
    ],
    subclass: {
      term: "Ranger Archetype",
      level: 3,
      name: "Hunter",
      blurb: "Specialized techniques for taking down dangerous prey.",
    },
  },
  {
    id: "rogue",
    name: "Rogue",
    summary:
      "A cunning trickster who relies on stealth, precision, and quick thinking.",
    description:
      "Rogues win by not fighting fair: one perfectly placed Sneak Attack, then back into the shadows. They're also the party's locksmith, trap-finder, and pickpocket, with more skills than any other class.",
    hitDie: "d8",
    hpAtFirst: "8 + your Constitution modifier",
    primaryAbility: "Dexterity",
    saves: "Dexterity & Intelligence",
    armor: "Light armor",
    weapons: "Simple weapons, hand crossbows, longswords, rapiers, shortswords",
    tools: "Thieves' tools",
    skills:
      "Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth",
    equipment: [
      "(a) a rapier or (b) a shortsword",
      "(a) a shortbow and quiver of 20 arrows or (b) a shortsword",
      "(a) a burglar's pack, (b) a dungeoneer's pack, or (c) an explorer's pack",
      "Leather armor, two daggers, and thieves' tools",
    ],
    spellcasting: null,
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Expertise", level: 1 },
      { name: "Sneak Attack", level: 1 },
      { name: "Thieves' Cant", level: 1 },
      { name: "Cunning Action", level: 2 },
      { name: "Roguish Archetype", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Uncanny Dodge", level: 5 },
      { name: "Expertise", level: 6 },
      { name: "Evasion", level: 7 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Roguish Archetype feature", level: 9 },
      { name: "Ability Score Improvement", level: 10 },
      { name: "Reliable Talent", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Roguish Archetype feature", level: 13 },
      { name: "Blindsense", level: 14 },
      { name: "Slippery Mind", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Roguish Archetype feature", level: 17 },
      { name: "Elusive", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Stroke of Luck", level: 20 },
    ],
    subclass: {
      term: "Roguish Archetype",
      level: 3,
      name: "Thief",
      blurb: "A nimble burglar with faster hands and quieter feet.",
    },
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    summary: "A spellcaster with magic woven into their very being.",
    description:
      "Sorcerers don't study magic; they were born with it. A smaller list of known spells than a wizard, but the unique ability to bend and reshape spells on the fly with Metamagic.",
    hitDie: "d6",
    hpAtFirst: "6 + your Constitution modifier",
    primaryAbility: "Charisma",
    saves: "Constitution & Charisma",
    armor: "None",
    weapons: "Daggers, darts, slings, quarterstaffs, light crossbows",
    tools: "None",
    skills:
      "Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion",
    equipment: [
      "(a) a light crossbow and 20 bolts or (b) any simple weapon",
      "(a) a component pouch or (b) an arcane focus",
      "(a) a dungeoneer's pack or (b) an explorer's pack",
      "Two daggers",
    ],
    spellcasting: {
      ability: "Charisma",
      note: "Full spellcaster from level 1. You also pick your Sorcerous Origin at level 1.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Spellcasting", level: 1 },
      { name: "Sorcerous Origin", level: 1 },
      { name: "Font of Magic", level: 2 },
      { name: "Metamagic", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Sorcerous Origin feature", level: 6 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Metamagic", level: 10 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Sorcerous Origin feature", level: 14 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Metamagic", level: 17 },
      { name: "Sorcerous Origin feature", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Sorcerous Restoration", level: 20 },
    ],
    subclass: {
      term: "Sorcerous Origin",
      level: 1,
      name: "Draconic Bloodline",
      blurb: "Magic inherited from a dragon ancestor toughens you up.",
    },
  },
  {
    id: "warlock",
    name: "Warlock",
    summary:
      "A wielder of magic granted through a pact with a powerful otherworldly patron.",
    description:
      "Warlocks traded something for their power, and it shows. Few spell slots, but they come back on a short rest, and the eldritch blast cantrip plus customizable invocations keep the magic flowing all day.",
    hitDie: "d8",
    hpAtFirst: "8 + your Constitution modifier",
    primaryAbility: "Charisma",
    saves: "Wisdom & Charisma",
    armor: "Light armor",
    weapons: "Simple weapons",
    tools: "None",
    skills:
      "Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion",
    equipment: [
      "(a) a light crossbow and 20 bolts or (b) any simple weapon",
      "(a) a component pouch or (b) an arcane focus",
      "(a) a scholar's pack or (b) a dungeoneer's pack",
      "Leather armor, any simple weapon, and two daggers",
    ],
    spellcasting: {
      ability: "Charisma",
      note: "Unique 'Pact Magic': few slots, but they recharge on a short rest. You also pick your Otherworldly Patron at level 1.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Otherworldly Patron", level: 1 },
      { name: "Pact Magic", level: 1 },
      { name: "Eldritch Invocations", level: 2 },
      { name: "Pact Boon", level: 3 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Otherworldly Patron feature", level: 6 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Otherworldly Patron feature", level: 10 },
      { name: "Mystic Arcanum (6th level)", level: 11 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Mystic Arcanum (7th level)", level: 13 },
      { name: "Otherworldly Patron feature", level: 14 },
      { name: "Mystic Arcanum (8th level)", level: 15 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Mystic Arcanum (9th level)", level: 17 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Eldritch Master", level: 20 },
    ],
    subclass: {
      term: "Otherworldly Patron",
      level: 1,
      name: "The Fiend",
      blurb:
        "A patron from the Lower Planes lending you destructive fire magic.",
    },
  },
  {
    id: "wizard",
    name: "Wizard",
    summary:
      "A scholarly spellcaster who masters magic through study and preparation.",
    description:
      "Wizards learn magic the hard way: from books. Their reward is the largest spell list in the game and a spellbook that grows every level: the right spell for every problem, if you prepared it.",
    hitDie: "d6",
    hpAtFirst: "6 + your Constitution modifier",
    primaryAbility: "Intelligence",
    saves: "Intelligence & Wisdom",
    armor: "None",
    weapons: "Daggers, darts, slings, quarterstaffs, light crossbows",
    tools: "None",
    skills:
      "Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion",
    equipment: [
      "(a) a quarterstaff or (b) a dagger",
      "(a) a component pouch or (b) an arcane focus",
      "(a) a scholar's pack or (b) an explorer's pack",
      "A spellbook",
    ],
    spellcasting: {
      ability: "Intelligence",
      note: "Full spellcaster from level 1, casting from a spellbook.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: null,
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    levelFeatures: [
      { name: "Spellcasting", level: 1 },
      { name: "Arcane Recovery", level: 1 },
      { name: "Arcane Tradition", level: 2 },
      { name: "Ability Score Improvement", level: 4 },
      { name: "Arcane Tradition feature", level: 6 },
      { name: "Ability Score Improvement", level: 8 },
      { name: "Arcane Tradition feature", level: 10 },
      { name: "Ability Score Improvement", level: 12 },
      { name: "Arcane Tradition feature", level: 14 },
      { name: "Ability Score Improvement", level: 16 },
      { name: "Spell Mastery", level: 18 },
      { name: "Ability Score Improvement", level: 19 },
      { name: "Signature Spell", level: 20 },
    ],
    subclass: {
      term: "Arcane Tradition",
      level: 2,
      name: "School of Evocation",
      blurb:
        "Specialize in damage-dealing spells, and keep your friends out of the blast.",
    },
  },
  {
    id: "artificer",
    name: "Artificer",
    core: false,
    summary:
      "A brilliant tinkerer who channels their magic into creations. (Not from core rules)",
    description:
      "Masters of invention, artificers use ingenuity and magic to unlock extraordinary capabilities in objects.",
    hitDie: "d8",
    hpAtFirst: "8 + your Constitution modifier",
    primaryAbility: "Intelligence",
    saves: "Intelligence & Constitution",
    armor: "Light Armor, Medium Armor, Shields",
    weapons: "Simple Weapons",
    tools:
      "Thieves' Tools, Tinker's Tools, one type of Artisan Tools of your choice",
    skills:
      "Choose two from Arcana, History, Investivation, Medicine, Nature, Perception, Sleight of Hand",
    equipment: [
      "any two simple weapons",
      "a light crossbow and 20 bolts",
      "(a) studded leather armor or (b) scale mail",
      "thieves' tools and a dungeoneer's pack",
    ],
    spellcasting: {
      ability: "Intelligence",
      note: "Full spellcaster from level 1, casting prepared spells.",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: {
      name: "Magical Tinkering",
      desc: "At 1st level, you've learned how to invest a spark of magic into mundane objects. To use this ability, you must have thieve's tools, or artisan's tools in hand. You then touch a Tiny nonmagical object as an action and give it a magical property of your choice from a list of options. The chosen property lasts indefinitely. As an action, you can touch the object to end the property early.",
    },
    level1FeatureSecondary: null,
    featuresTable: null,
    featureDescriptions: null,
    subclass: {
      term: "Artificer Specialist",
      level: 3,
      name: "Battle Smith",
      blurb:
        "A combination of protector and medic, a Battle Smith is an expert at defending others and repairing both material and personnel.",
    },
  },
  {
    id: "blood_hunter",
    name: "Blood Hunter",
    core: false,
    summary:
      "A fierce hunter who uses the power of blood magic, or hemocraft, to find their prey. (Homebrew by Matt Mercer)",
    description:
      "Blood Hunters are clever warriors driven by an undying determination to destroy evil new and old. Armed with rites of secretive blood magic and a willingness to sacrifice their own vitality and humanity for their cause they protect the realm from the shadows, even as they remain ever vigilant against being drawn to the darkness that consumes the monsters they hunt.",
    hitDie: "d10",
    hpAtFirst: "10 + your Constitution modifier",
    primaryAbility: "Constituion & Dexterity or Strength",
    saves: "Dexterity & Intelligence",
    armor: "Light Armor, Medium Armor, Shields",
    weapons: "Simple Weapons, Martial weapons",
    tools: "Alchemist Supplies",
    skills:
      "Choose two from Acrobatics, Arcana, Athletics, History, Insight, Investigation, Religion, and Survival",
    equipment: [
      "(a) a martial weapon or (b) two simple weapons",
      "(a) a light crossbow and 20 bolts or (b) a hand crossbow and 20 bolts",
      "(a) studded leather armor or (b) scale mail armor",
      "an explorer's pack and alchemist's supplies",
    ],
    spellcasting: {
      ability: "None",
      note: "Blood Hunters can use Blood Curses instead of spellcasting",
    },
    // Level 1 class feature(s), e.g. Barbarian's Rage. Fill in as
    // { name: "Feature Name", desc: "What it does." }. secondary is optional
    // (leave null if the class only grants one feature at level 1).
    level1Feature: {
      name: "Hunter's Bane",
      desc: "At 1st level, you have survived the Hunter's Bane, a dangerous, long-kept secret ritual that changes your life's blood, forever binding you to the darkness and sharpening your senses against it. You have advantage on Wisdom (Survival) checks to track fey, fiends, or undead, as well as on Intelligence checks to recall information about such creatures.",
    },
    level1FeatureSecondary: {
      name: "Blood Maledict",
      desc: "Also at 1st level, you gain the ability to channel, and sometimes sacrifice, a part of your vital essence to curse and manipulate creatures through hemocraft magic. You learn one Blood Curse of your choice. While invoking a Blood Curse, but before it affects the target, you can choose to amplify the curse by taking necrotic damage equal to one roll of your hemocraft die. An amplified curse grants an additional effect, noted in the curse's description. Creatures that do not have blood are immune to the curse unless it has beeen amplified.",
    },
    featuresTable: null,
    featureDescriptions: null,
    subclass: {
      term: "Blood Hunter Order",
      level: 3,
      name: "Order of the Lycan",
      blurb:
        "The ancient curse of lycanthropy is feared by nearly all peoples and cultures. These hunters then use the magic of their blood to harness the power of the monster they harbor, without losing themselves to it. Using intense will and secret blood magic rituals, members of the Order of the Lycan learn to control and unleash their hybrid forms for short periods of time.",
    },
  },
];

// Race trait/flavor text below is SRD 5.1 wording. Two abridgements for
// space, noted inline: the Draconic Ancestry table and the Tinker
// device options are condensed to prose.
const RACES = [
  {
    id: "dragonborn",
    name: "Dragonborn",
    summary: "Proud dragon-blooded folk with a breath weapon to match.",
    asi: "Your Strength score increases by 2, and your Charisma score increases by 1.",
    age: "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
    alignment:
      "Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil. Most dragonborn are good, but those who side with evil can be terrible villains.",
    size: "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
    speed: "Your base walking speed is 30 feet.",
    darkvision: null,
    languages:
      "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.",
    traits: [
      {
        name: "Draconic Ancestry",
        // Condensed from the SRD's Draconic Ancestry table
        desc: "Choose one type of dragon: black or copper (acid), blue or bronze (lightning), brass, gold, or red (fire), green (poison), or silver or white (cold). Your breath weapon and damage resistance are determined by the dragon type.",
      },
      {
        name: "Breath Weapon",
        desc: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area must make a saving throw (DC 8 + your Constitution modifier + your proficiency bonus). A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. After you use your breath weapon, you can't use it again until you complete a short or long rest.",
      },
      {
        name: "Damage Resistance",
        desc: "You have resistance to the damage type associated with your draconic ancestry.",
      },
    ],
    subraces: [],
  },
  {
    id: "dwarf",
    name: "Dwarf",
    summary: "Stout, hardy mountain folk famed for craft and resilience.",
    asi: "Your Constitution score increases by 2.",
    age: "Dwarves mature at the same rate as humans, but they're considered young until they reach the age of 50. On average, they live about 350 years.",
    alignment:
      "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.",
    size: "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.",
    speed:
      "Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.",
    darkvision:
      "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    languages:
      "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.",
    traits: [
      {
        name: "Dwarven Resilience",
        desc: "You have advantage on saving throws against poison, and you have resistance against poison damage.",
      },
      {
        name: "Dwarven Combat Training",
        desc: "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
      },
      {
        name: "Tool Proficiency",
        desc: "You gain proficiency with the artisan's tools of your choice: smith's tools, brewer's supplies, or mason's tools.",
      },
      {
        name: "Stonecunning",
        desc: "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
      },
    ],
    subraces: [
      {
        name: "Hill Dwarf",
        desc: "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.",
        asi: "Your Wisdom score increases by 1.",
        traits: [
          {
            name: "Dwarven Toughness",
            desc: "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.",
          },
        ],
      },
    ],
  },
  {
    id: "elf",
    name: "Elf",
    summary:
      "Graceful, long-lived folk with keen senses and a touch of the fey.",
    asi: "Your Dexterity score increases by 2.",
    age: "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
    alignment:
      "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not.",
    size: "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
    speed: "Your base walking speed is 30 feet.",
    darkvision:
      "Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    languages:
      "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.",
    traits: [
      {
        name: "Keen Senses",
        desc: "You have proficiency in the Perception skill.",
      },
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
      },
      {
        name: "Trance",
        desc: "Elves don't need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
      },
    ],
    subraces: [
      {
        name: "High Elf",
        desc: "As a high elf, you have a keen mind and a mastery of at least the basics of magic.",
        asi: "Your Intelligence score increases by 1.",
        traits: [
          {
            name: "Elf Weapon Training",
            desc: "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
          },
          {
            name: "Cantrip",
            desc: "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.",
          },
          {
            name: "Extra Language",
            desc: "You can speak, read, and write one extra language of your choice.",
          },
        ],
      },
    ],
  },
  {
    id: "gnome",
    name: "Gnome",
    summary: "Small, inventive, and endlessly curious tinkerers.",
    asi: "Your Intelligence score increases by 2.",
    age: "Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.",
    alignment:
      "Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.",
    size: "Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.",
    speed: "Your base walking speed is 25 feet.",
    darkvision:
      "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    languages:
      "You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.",
    traits: [
      {
        name: "Gnome Cunning",
        desc: "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
      },
    ],
    subraces: [
      {
        name: "Rock Gnome",
        desc: "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes.",
        asi: "Your Constitution score increases by 1.",
        traits: [
          {
            name: "Artificer's Lore",
            desc: "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
          },
          {
            name: "Tinker",
            // The three device options are condensed from the SRD list
            desc: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp), such as a clockwork toy, a fire starter, or a music box. The device ceases to function after 24 hours (unless you spend 1 hour repairing it), and you can have up to three such devices active at a time.",
          },
        ],
      },
    ],
  },
  {
    id: "half-elf",
    name: "Half-Elf",
    summary:
      "Caught between two worlds, blending human drive with elven grace.",
    asi: "Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.",
    age: "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.",
    alignment:
      "Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers.",
    size: "Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.",
    speed: "Your base walking speed is 30 feet.",
    darkvision:
      "Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    languages:
      "You can speak, read, and write Common, Elvish, and one extra language of your choice.",
    traits: [
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
      },
      {
        name: "Skill Versatility",
        desc: "You gain proficiency in two skills of your choice.",
      },
    ],
    subraces: [],
  },
  {
    id: "half-orc",
    name: "Half-Orc",
    summary: "Imposing warriors whose orc blood grants raw grit and menace.",
    asi: "Your Strength score increases by 2, and your Constitution score increases by 1.",
    age: "Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.",
    alignment:
      "Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good.",
    size: "Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.",
    speed: "Your base walking speed is 30 feet.",
    darkvision:
      "Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    languages:
      "You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.",
    traits: [
      {
        name: "Menacing",
        desc: "You gain proficiency in the Intimidation skill.",
      },
      {
        name: "Relentless Endurance",
        desc: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
      },
      {
        name: "Savage Attacks",
        desc: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
      },
    ],
    subraces: [],
  },
  {
    id: "halfling",
    name: "Halfling",
    summary: "Small, cheerful wanderers with uncanny luck.",
    asi: "Your Dexterity score increases by 2.",
    age: "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.",
    alignment:
      "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression.",
    size: "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
    speed: "Your base walking speed is 25 feet.",
    darkvision: null,
    languages:
      "You can speak, read, and write Common and Halfling. The Halfling language isn't secret, but halflings are loath to share it with others. They write very little, so they don't have a rich body of literature. Their oral tradition, however, is very strong.",
    traits: [
      {
        name: "Lucky",
        desc: "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
      },
      {
        name: "Brave",
        desc: "You have advantage on saving throws against being frightened.",
      },
      {
        name: "Halfling Nimbleness",
        desc: "You can move through the space of any creature that is of a size larger than yours.",
      },
    ],
    subraces: [
      {
        name: "Lightfoot",
        desc: "As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You're inclined to be affable and get along well with others.",
        asi: "Your Charisma score increases by 1.",
        traits: [
          {
            name: "Naturally Stealthy",
            desc: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.",
          },
        ],
      },
    ],
  },
  {
    id: "human",
    name: "Human",
    summary: "The most adaptable and ambitious people, good at everything.",
    asi: "Your ability scores each increase by 1.",
    age: "Humans reach adulthood in their late teens and live less than a century.",
    alignment:
      "Humans tend toward no particular alignment. The best and the worst are found among them.",
    size: "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
    speed: "Your base walking speed is 30 feet.",
    darkvision: null,
    languages:
      "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects.",
    traits: [],
    subraces: [],
  },
  {
    id: "tiefling",
    name: "Tiefling",
    summary: "Marked by an infernal bloodline: horns, tail, and innate magic.",
    asi: "Your Intelligence score increases by 1, and your Charisma score increases by 2.",
    age: "Tieflings mature at the same rate as humans but live a few years longer.",
    alignment:
      "Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.",
    size: "Tieflings are about the same size and build as humans. Your size is Medium.",
    speed: "Your base walking speed is 30 feet.",
    darkvision:
      "Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    languages: "You can speak, read, and write Common and Infernal.",
    traits: [
      {
        name: "Hellish Resistance",
        desc: "You have resistance to fire damage.",
      },
      {
        name: "Infernal Legacy",
        desc: "You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.",
      },
    ],
    subraces: [],
  },
];

// Homebrew race from the Xumaria setting (see xumaria.html). "Verdarii
// (Base)" lists the traits shared by every subrace; each subrace card
// below it repeats those same base traits alongside its own unique ones,
// since every subrace is its own card/modal rather than nesting under one
// shared "Verdarii" card. Shape matches a RACES entry so raceModalHtml can
// render it unchanged.
const VERDARII_SUBRACES = [
  {
    id: "verdarii-base",
    name: "Verdarii (Base)",
    summary:
      "The base Verdarii race: traits every Verdarii shares before picking a subrace.",
    asi: "Your Dexterity score increases by 2.",
    age: "Like other elves, Verdarii can live to be over 750 years old.",
    alignment: null,
    size: "You are Medium.",
    speed:
      "Your walking speed is 30 feet, and you can walk through any nature-based difficult terrain as if it was normal.",
    darkvision:
      "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
    languages: "You can speak, read, and write Common and Elven.",
    traits: [
      {
        name: "Subraces",
        desc: "This card covers the base Verdarii race. To play one, also pick one of the five subraces on this page (Mycovarii, Solarii, Canoparii, Thornarii, or Luminarii), which add their own ability score increase and extra traits on top of everything below.",
      },
      {
        name: "Creature Type",
        desc: "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
      },
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws you make to avoid or end the charmed condition on yourself, and magic can't put you to sleep.",
      },
      {
        name: "Child of the Forest",
        desc: "Forest animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that lives in a forest. It can understand your words, though you have no special ability to understand it in return.",
      },
      {
        name: "Keen Senses",
        desc: "You have proficiency in the Perception skill.",
      },
      {
        name: "Trance",
        desc: "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trance-like meditation.",
      },
    ],
    subraces: [],
  },
  {
    id: "mycovarii",
    name: "Mycovarii",
    summary:
      "Children of the Rot and Roots: swamp and bog dwellers who see decay as the soil for new life.",
    asi: "Your Dexterity score increases by 2, and your Wisdom score increases by 1.",
    age: "Like other elves, Verdarii can live to be over 750 years old.",
    alignment: null,
    size: "You are Medium.",
    speed:
      "Your walking speed is 30 feet, and you can walk through any nature-based difficult terrain as if it was normal.",
    darkvision:
      "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
    languages: "You can speak, read, and write Common and Elven.",
    traits: [
      {
        name: "Creature Type",
        desc: "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
      },
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws you make to avoid or end the charmed condition on yourself, and magic can't put you to sleep.",
      },
      {
        name: "Child of the Forest",
        desc: "Forest animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that lives in a forest. It can understand your words, though you have no special ability to understand it in return.",
      },
      {
        name: "Keen Senses",
        desc: "You have proficiency in the Perception skill.",
      },
      {
        name: "Trance",
        desc: "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trance-like meditation.",
      },
      {
        name: "Spore-link",
        desc: "You can communicate telepathically with any creature you can see within 30 feet of you. Your communication carries faint sensory impressions: the smell of damp soil, the feel of mist, or the taste of moss. The creature must share a language with you to understand your meaning, and it can't respond telepathically unless it has a similar ability.",
      },
      {
        name: "Children of Decay",
        desc: "You have resistance to poison damage, and you have advantage on saving throws against being poisoned or diseased.",
      },
      {
        name: "Bioluminescent Glow",
        desc: "You can cause parts of your body (fungal patches, eyes, or markings) to emit dim light in a 10-foot radius for up to 1 hour. You can suppress or reactivate this glow as a bonus action. While glowing, you have advantage on Charisma (Intimidation) checks made against creatures that can see you in darkness, but disadvantage on Dexterity (Stealth) checks to hide.",
      },
      {
        name: "Swamp Strider",
        desc: "You can move through nonmagical difficult terrain created by mud, shallow water, or plant growth without expending extra movement.",
      },
      {
        name: "Spore Burst",
        desc: "As a bonus action, you let out a puff of spores at your enemies within 10 feet of you. They must make a Constitution saving throw (DC = 8 + your proficiency bonus + your Constitution modifier) or become poisoned until the end of your next turn. While poisoned in this way, until the start of your next turn, you and your allies have advantage on attack rolls against any of those enemies. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
      },
      {
        name: "Cantrip",
        desc: "You know one cantrip from the druid spell list.",
      },
    ],
    subraces: [],
  },
  {
    id: "solarii",
    name: "Solarii",
    summary:
      "Children of the Wind: sun-chasing wanderers of the prairie and open sky.",
    asi: "Your Dexterity score increases by 2, and your Charisma score increases by 1.",
    age: "Like other elves, Verdarii can live to be over 750 years old.",
    alignment: null,
    size: "You are Medium.",
    speed:
      "Your walking speed is 30 feet, and you can walk through any nature-based difficult terrain as if it was normal.",
    darkvision:
      "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
    languages: "You can speak, read, and write Common and Elven.",
    traits: [
      {
        name: "Creature Type",
        desc: "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
      },
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws you make to avoid or end the charmed condition on yourself, and magic can't put you to sleep.",
      },
      {
        name: "Child of the Forest",
        desc: "Forest animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that lives in a forest. It can understand your words, though you have no special ability to understand it in return.",
      },
      {
        name: "Keen Senses",
        desc: "You have proficiency in the Perception skill.",
      },
      {
        name: "Trance",
        desc: "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trance-like meditation.",
      },
      {
        name: "Step of the Windgrass",
        desc: "Your movement speed increases by 5 feet. You can take the Dash action as a bonus action once per long rest.",
      },
      {
        name: "Current's Favor",
        desc: "You have proficiency in Acrobatics.",
      },
      {
        name: "Windborne Grace",
        desc: "When falling, you can reduce any fall damage you take by an amount equal to five times your level, as currents of air slow your descent.",
      },
      {
        name: "Whisper on the Plains",
        desc: "As an action, once per long rest you can summon a gust that sweeps a 15-foot cone in front of you. Creatures of your choice in that area must succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Dexterity modifier) or be pushed 10 feet and knocked prone.",
      },
      {
        name: "Cantrip",
        desc: "You know the gust cantrip.",
      },
    ],
    subraces: [],
  },
  {
    id: "canoparii",
    name: "Canoparii",
    summary:
      "Children of the Green Veil: jungle guardians whose bodies bloom with vines and blossoms.",
    asi: "Your Dexterity score increases by 2, and your Constitution score increases by 1.",
    age: "Like other elves, Verdarii can live to be over 750 years old.",
    alignment: null,
    size: "You are Medium.",
    speed:
      "Your walking speed is 30 feet, and you can walk through any nature-based difficult terrain as if it was normal.",
    darkvision:
      "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
    languages: "You can speak, read, and write Common and Elven.",
    traits: [
      {
        name: "Creature Type",
        desc: "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
      },
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws you make to avoid or end the charmed condition on yourself, and magic can't put you to sleep.",
      },
      {
        name: "Child of the Forest",
        desc: "Forest animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that lives in a forest. It can understand your words, though you have no special ability to understand it in return.",
      },
      {
        name: "Keen Senses",
        desc: "You have proficiency in the Perception skill.",
      },
      {
        name: "Trance",
        desc: "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trance-like meditation.",
      },
      {
        name: "Vinegrasp",
        desc: "You can cast entangle once per long rest. Wisdom is your spellcasting ability for it.",
      },
      {
        name: "Climber's Grace",
        desc: "You have a climbing speed equal to your walking speed.",
      },
      {
        name: "Symbiotic Healing",
        desc: "When you roll a Hit Die to regain hit points, you can add your Wisdom modifier to the result.",
      },
      {
        name: "Verdant Camouflage",
        desc: "You have advantage on Stealth checks made to hide in rain forest, jungle, or heavily vegetated areas.",
      },
      {
        name: "Nature's Blessing",
        desc: "You have proficiency in Nature or Animal Handling (your choice).",
      },
      {
        name: "Cantrip",
        desc: "You know one cantrip from the druid spell list.",
      },
    ],
    subraces: [],
  },
  {
    id: "thornarii",
    name: "Thornarii",
    summary:
      "The Wardens of the Wild: barkskinned, thorned protectors of forest and grove.",
    asi: "Your Dexterity score increases by 2, and your Strength score increases by 1.",
    age: "Like other elves, Verdarii can live to be over 750 years old.",
    alignment: null,
    size: "You are Medium.",
    speed:
      "Your walking speed is 30 feet, and you can walk through any nature-based difficult terrain as if it was normal.",
    darkvision:
      "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
    languages: "You can speak, read, and write Common and Elven.",
    traits: [
      {
        name: "Creature Type",
        desc: "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
      },
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws you make to avoid or end the charmed condition on yourself, and magic can't put you to sleep.",
      },
      {
        name: "Child of the Forest",
        desc: "Forest animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that lives in a forest. It can understand your words, though you have no special ability to understand it in return.",
      },
      {
        name: "Keen Senses",
        desc: "You have proficiency in the Perception skill.",
      },
      {
        name: "Trance",
        desc: "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trance-like meditation.",
      },
      {
        name: "Barkskin",
        desc: "Your Armor Class increases by 1 due to your strong skin.",
      },
      {
        name: "Thorned Hide",
        desc: "When a creature hits you with a melee attack, it takes piercing damage equal to your proficiency bonus.",
      },
      {
        name: "Vine Lash",
        desc: "As a bonus action, you can cause thorny vines to sprout from your hands, turning an unarmed strike into a 10-foot reach melee attack. You can use this feature a number of times equal to your proficiency bonus, regaining all uses after a long rest.",
      },
      {
        name: "Forest Fortitude",
        desc: "You have advantage on saving throws against being grappled or restrained by plants or vines. You also have proficiency in Athletics.",
      },
      {
        name: "Cantrip",
        desc: "You know one cantrip from the druid spell list.",
      },
    ],
    subraces: [],
  },
  {
    id: "luminarii",
    name: "Luminarii",
    summary:
      "Children of the Bloom: gentle, flower-bringing diplomats of meadow and field.",
    asi: "Your Dexterity score increases by 2, and your Charisma or Wisdom score increases by 1 (your choice).",
    age: "Like other elves, Verdarii can live to be over 750 years old.",
    alignment: null,
    size: "You are Medium.",
    speed:
      "Your walking speed is 30 feet, and you can walk through any nature-based difficult terrain as if it was normal.",
    darkvision:
      "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
    languages: "You can speak, read, and write Common and Elven.",
    traits: [
      {
        name: "Creature Type",
        desc: "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
      },
      {
        name: "Fey Ancestry",
        desc: "You have advantage on saving throws you make to avoid or end the charmed condition on yourself, and magic can't put you to sleep.",
      },
      {
        name: "Child of the Forest",
        desc: "Forest animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that lives in a forest. It can understand your words, though you have no special ability to understand it in return.",
      },
      {
        name: "Keen Senses",
        desc: "You have proficiency in the Perception skill.",
      },
      {
        name: "Trance",
        desc: "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trance-like meditation.",
      },
      {
        name: "Pollen of Serenity",
        desc: "As an action, once per long rest you can release calming pollen in a 10-foot radius. Creatures of your choice in that area must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Charisma modifier) or be charmed until the end of your next turn.",
      },
      {
        name: "Seasonal Bloom",
        desc: "Once per long rest, you can reroll a failed saving throw against being frightened or charmed.",
      },
      {
        name: "Petalglow",
        desc: "You know the light cantrip. When you cast it, the light takes the form of drifting petals or glowing pollen.",
      },
      {
        name: "Harmony of Growth",
        desc: "You have proficiency in Persuasion or Performance (your choice).",
      },
    ],
    subraces: [],
  },
];

// Only the Acolyte is in the SRD 5.1, so it gets the full entry. The other
// twelve backgrounds are Player's Handbook content, so their cards carry
// an original one-line summary (`srd: false`) and link out to the free
// D&D Basic Rules on D&D Beyond instead of reprinting anything.
const DDB_BACKGROUNDS_URL =
  "https://www.dndbeyond.com/sources/dnd/basic-rules-2014/personality-and-background";

const BACKGROUNDS = [
  {
    id: "acolyte",
    name: "Acolyte",
    srd: true,
    summary: "You spent your life in service to a temple and its god.",
    description:
      "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric, since performing sacred rites is not the same thing as channeling divine power.",
    skills: "Insight, Religion",
    tools: "None",
    languages: "Two of your choice",
    equipment:
      "A holy symbol (a gift to you when you entered the priesthood), a prayer book or prayer wheel, 5 sticks of incense, vestments, a set of common clothes, and a pouch containing 15 gp",
    feature: {
      name: "Shelter of the Faithful",
      desc: "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.",
    },
    characteristics: {
      intro:
        "Acolytes are shaped by their experience in temples or other religious communities. Roll on (or pick from) the tables below, or use them as inspiration for your own.",
      personalityTraits: [
        "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
        "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
        "I see omens in every event and action. The gods try to speak to us, we just need to listen.",
        "Nothing can shake my optimistic attitude.",
        "I quote (or misquote) sacred texts and proverbs in almost every situation.",
        "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
        "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
        "I've spent so long in the temple that I have little practical experience dealing with people in the outside world.",
      ],
      ideals: [
        "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)",
        "Charity. I always try to help those in need, no matter what the personal cost. (Good)",
        "Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)",
        "Power. I hope to one day rise to the top of my faith's religious hierarchy. (Lawful)",
        "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)",
        "Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings. (Any)",
      ],
      bonds: [
        "I would die to recover an ancient relic of my faith that was lost long ago.",
        "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
        "I owe my life to the priest who took me in when my parents died.",
        "Everything I do is for the common people.",
        "I will do anything to protect the temple where I served.",
        "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.",
      ],
      flaws: [
        "I judge others harshly, and myself even more severely.",
        "I put too much trust in those who wield power within my temple's hierarchy.",
        "My piety sometimes leads me to blindly trust those that profess faith in my god.",
        "I am inflexible in my thinking.",
        "I am suspicious of strangers and expect the worst of them.",
        "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.",
      ],
    },
  },
  {
    id: "charlatan",
    name: "Charlatan",
    srd: false,
    summary:
      "A silver-tongued con artist who lived by schemes, false identities, and quick exits.",
    link: DDB_BACKGROUNDS_URL + "#Charlatan",
  },
  {
    id: "criminal",
    name: "Criminal",
    srd: false,
    summary:
      "You made your living on the wrong side of the law: burglar, smuggler, or enforcer.",
    link: DDB_BACKGROUNDS_URL + "#Criminal",
  },
  {
    id: "entertainer",
    name: "Entertainer",
    srd: false,
    summary:
      "A performer who thrived in front of a crowd: music, dance, drama, or daring stunts.",
    link: DDB_BACKGROUNDS_URL + "#Entertainer",
  },
  {
    id: "folk-hero",
    name: "Folk Hero",
    srd: false,
    summary:
      "An ordinary person from humble beginnings who stood up for the common folk.",
    link: DDB_BACKGROUNDS_URL + "#FolkHero",
  },
  {
    id: "guild-artisan",
    name: "Guild Artisan",
    srd: false,
    summary:
      "A skilled tradesperson raised up through a guild: smith, brewer, carpenter, or merchant.",
    link: DDB_BACKGROUNDS_URL + "#GuildArtisan",
  },
  {
    id: "hermit",
    name: "Hermit",
    srd: false,
    summary:
      "You lived apart from society in quiet seclusion, and came back with a great discovery.",
    link: DDB_BACKGROUNDS_URL + "#Hermit",
  },
  {
    id: "noble",
    name: "Noble",
    srd: false,
    summary:
      "Born to wealth, power, and privilege, with the connections (and expectations) to match.",
    link: DDB_BACKGROUNDS_URL + "#Noble",
  },
  {
    id: "outlander",
    name: "Outlander",
    srd: false,
    summary:
      "You grew up in the wilds far from civilization, living off the land.",
    link: DDB_BACKGROUNDS_URL + "#Outlander",
  },
  {
    id: "sage",
    name: "Sage",
    srd: false,
    summary:
      "A scholar who spent years chasing knowledge through libraries and archives.",
    link: DDB_BACKGROUNDS_URL + "#Sage",
  },
  {
    id: "sailor",
    name: "Sailor",
    srd: false,
    summary:
      "You sailed the seas aboard a working ship, weathering storms and rough ports.",
    link: DDB_BACKGROUNDS_URL + "#Sailor",
  },
  {
    id: "soldier",
    name: "Soldier",
    srd: false,
    summary:
      "A trained veteran who served in an army, militia, or mercenary company.",
    link: DDB_BACKGROUNDS_URL + "#Soldier",
  },
  {
    id: "urchin",
    name: "Urchin",
    srd: false,
    summary:
      "You grew up poor and alone on city streets, surviving on wit and quickness.",
    link: DDB_BACKGROUNDS_URL + "#Urchin",
  },
];
