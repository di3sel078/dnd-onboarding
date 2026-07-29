(function () {
  // Handles direct file open (pathname ends with '/') and server roots
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Nav content lives here instead of duplicated in every page's HTML.
  // Desktop shows the main links inline plus a "Reference" dropdown;
  // mobile flattens everything (including the reference pages) into the
  // hamburger dropdown.
  const NAV_MAIN_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "character-creator.html", label: "Build Your Character" },
    { href: "turn-guide.html", label: "Survive Combat" },
    { href: "roleplaying.html", label: "Be Your Character" },
  ];

  const NAV_REFERENCE_LINKS = [
    { href: "character-options.html", label: "Character Options" },
    { href: "extra-rules.html", label: "Extra Rules" },
    { href: "glossary.html", label: "Glossary" },
    { href: "gallery.html", label: "Gallery" },
    { href: "xumaria.html", label: "Xumaria" },
  ];

  function linkTag(item) {
    return `<a href="${item.href}">${item.label}</a>`;
  }

  function buildNav() {
    const nav = document.getElementById("main-nav");
    if (!nav) return;

    // Desktop row skips "Home" — the logo already links there
    const desktopMainLinks = NAV_MAIN_LINKS.slice(1).map(linkTag).join("");
    const referenceLinks = NAV_REFERENCE_LINKS.map(linkTag).join("");
    const mobileLinks = [...NAV_MAIN_LINKS, ...NAV_REFERENCE_LINKS]
      .map(linkTag)
      .join("");

    nav.innerHTML = `
      <a href="index.html" class="nav-logo">
        <img
          src="assets/d20_transparent.png"
          alt="d20"
          class="nav-logo-icon"
          width="25"
          height="28"
        />
        An Introductory D&amp;D 5e Guide
      </a>
      <div class="nav-links-desktop">
        ${desktopMainLinks}
        <div class="nav-dropdown" id="nav-reference-dropdown">
          <button
            type="button"
            class="nav-dropdown-toggle"
            id="nav-reference-toggle"
            aria-expanded="false"
          >
            Reference <span class="nav-dropdown-caret" aria-hidden="true">&#9660;</span>
          </button>
          <div class="nav-dropdown-menu" id="nav-reference-menu">
            ${referenceLinks}
          </div>
        </div>
      </div>
      <button
        class="nav-toggle"
        id="nav-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        aria-controls="nav-links"
      >
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
      <div class="nav-links" id="nav-links">
        ${mobileLinks}
      </div>
    `;
  }

  buildNav();

  // Mark the current page's link(s) active — the link can appear in both
  // the desktop row/dropdown and the flattened mobile dropdown
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.getElementById("nav-links");
  if (mainNav) {
    let referenceActive = false;
    mainNav.querySelectorAll("a[href]").forEach((link) => {
      const isActive = link.getAttribute("href") === currentPage;
      link.classList.toggle("active", isActive);
      if (
        isActive &&
        NAV_REFERENCE_LINKS.some((item) => item.href === currentPage)
      ) {
        referenceActive = true;
      }
    });

    const referenceToggle = document.getElementById("nav-reference-toggle");
    if (referenceToggle) {
      referenceToggle.classList.toggle("active", referenceActive);
    }
  }

  // Hamburger menu (mobile only — nav-links is a dropdown at small screen sizes)
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tapping a link should close the menu behind it
    navLinks
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));

    // Close on Escape and return focus to the toggle button
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Close when clicking anywhere outside the nav
    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navToggle.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // "Reference" dropdown (desktop only — the ▾ menu on the right)
  const referenceDropdown = document.getElementById("nav-reference-dropdown");
  const referenceToggle = document.getElementById("nav-reference-toggle");
  if (referenceDropdown && referenceToggle) {
    const closeReferenceMenu = () => {
      referenceDropdown.classList.remove("open");
      referenceToggle.setAttribute("aria-expanded", "false");
    };

    referenceToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = referenceDropdown.classList.toggle("open");
      referenceToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Clicking anywhere outside, or picking a link, closes the menu
    document.addEventListener("click", (event) => {
      if (!referenceDropdown.contains(event.target)) closeReferenceMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeReferenceMenu();
        referenceToggle.focus();
      }
    });
    referenceDropdown
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeReferenceMenu));
  }

  // Page Modules

  function initCharacterCreator() {
    // Movement through each step of character creation
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const nextBtn = document.getElementById("btn-next");
    const prevBtn = document.getElementById("btn-prev");
    const trackerNextBtn = document.getElementById("tracker-next");
    const trackerPrevBtn = document.getElementById("tracker-prev");
    const trackerNav = document.getElementById("step-tracker-nav");
    const trackerToggleBtn = document.getElementById("tracker-toggle");
    const trackerToggleCount = document.getElementById("tracker-toggle-count");
    const trackerSelect = document.getElementById("step-tracker-select");

    const stepIcons = document.querySelectorAll(".step-icon");
    const stepLabels = document.querySelectorAll(".step-label");
    const trackerEntries = document.querySelectorAll(".tracker-entry-btn");

    // Remembers the step between visits. The URL hash still wins (deep
    // links, refresh); this covers leaving the page and coming back.
    const STEP_STORAGE_KEY = "creator-step";
    const TRACKER_COLLAPSED_STORAGE_KEY = "creator-tracker-collapsed";

    function saveStep(index) {
      // localStorage can throw (private browsing, blocked storage) — a
      // failed save just means the page opens on step 1 next visit
      try {
        localStorage.setItem(STEP_STORAGE_KEY, String(index));
      } catch (_) {}
    }

    function readSavedStep() {
      try {
        const raw = localStorage.getItem(STEP_STORAGE_KEY);
        if (raw === null) return null;
        const index = Number(raw);
        return Number.isInteger(index) && index >= 0 && index < steps.length
          ? index
          : null;
      } catch (_) {
        return null;
      }
    }

    function saveTrackerCollapsed(collapsed) {
      // Same best-effort save as saveStep — a failed write just means the
      // tracker opens expanded next visit
      try {
        localStorage.setItem(TRACKER_COLLAPSED_STORAGE_KEY, String(collapsed));
      } catch (_) {}
    }

    function readTrackerCollapsed() {
      try {
        return localStorage.getItem(TRACKER_COLLAPSED_STORAGE_KEY) === "true";
      } catch (_) {
        return false;
      }
    }

    // Reads "#step-4" from the URL and returns index 3, or null if
    // missing/invalid. The hash is 1-indexed (step-1..step-10) to match
    // each step's id/label, but the internal step index stays 0-based.
    function stepFromHash() {
      const match = window.location.hash.match(/^#step-(\d+)$/);
      if (!match) return null;
      const index = Number(match[1]) - 1;
      return index >= 0 && index < steps.length ? index : null;
    }

    // updateUrl is false when we're just reacting to a URL/history change
    // that already happened (initial load, back/forward button)
    function showStep(index, { updateUrl = true, scroll = true } = {}) {
      currentStep = index;
      saveStep(index);
      const totalPlaySteps = steps.length - 1; // excludes the review step
      const isReviewStep = index === steps.length - 1;

      // Show/Hide Steps
      steps.forEach((step) => step.classList.remove("active"));
      steps[index].classList.add("active");

      // Step Tracker
      stepIcons.forEach((icon, i) => {
        icon.classList.remove("active", "complete");

        if (i < index) {
          icon.classList.add("complete");
        } else if (i === index) {
          icon.classList.add("active");
        }
      });

      // Active label
      stepLabels.forEach((label, i) => {
        label.classList.toggle("active", i === index);
      });

      // Change Button Text
      prevBtn.textContent = index === 0 ? "Home" : "Previous";
      if (isReviewStep) {
        // Review step: Next goes to the combat guide
        nextBtn.textContent = "Next: How to Survive Combat →";
      } else if (index === steps.length - 2) {
        // Step 10: Next goes to the review step
        nextBtn.textContent = "Next: Review Your Sheet →";
      } else {
        nextBtn.textContent = "Next";
      }

      // Mobile tracker arrows only move between steps, so they disable
      // at the ends instead of falling through to Home/Finish
      trackerPrevBtn.disabled = index === 0;
      trackerNextBtn.disabled = index === steps.length - 1;

      // Hide the step pips on the review step: it isn't in the tracker
      trackerNav.classList.toggle("review-active", isReviewStep);

      // Keep the collapsed bar's step count in sync with the current step
      if (isReviewStep) {
        trackerToggleCount.textContent = "Review your sheet";
      } else {
        trackerToggleCount.textContent = `Step ${index + 1} of ${totalPlaySteps}: ${stepLabels[index].textContent}`;
      }

      // Keep the mobile <select> in sync with the current step
      trackerSelect.value = String(index);

      // Push a history entry so refresh keeps the step and back steps
      // backward through the guide instead of leaving the page
      if (updateUrl) {
        const hash = `#step-${index + 1}`;
        if (window.location.hash !== hash) {
          history.pushState(null, "", hash);
        }
      }

      // Scroll back to the top of the page for the new step
      if (scroll) {
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({
          top: 0,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      }
    }

    // Button Click Reactions
    nextBtn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      } else {
        window.location.href = "turn-guide.html";
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      } else {
        window.location.href = "index.html";
      }
    });

    // Mobile prev/next arrows flanking the tracker's current pip
    trackerNextBtn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      }
    });

    trackerPrevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });

    // Jump directly to a step by clicking its tracker entry
    trackerEntries.forEach((entry, i) => {
      entry.addEventListener("click", () => {
        showStep(i);
      });
    });

    // Mobile step select: jump directly to the chosen step
    trackerSelect.addEventListener("change", () => {
      showStep(Number(trackerSelect.value));
    });

    // Collapse the tracker down to a thin "Step X of 10" bar, or expand it
    trackerToggleBtn.addEventListener("click", () => {
      const collapsed = trackerNav.classList.toggle("collapsed");
      trackerToggleBtn.setAttribute("aria-expanded", String(!collapsed));
      saveTrackerCollapsed(collapsed);
    });

    // Restore the tracker's collapsed/expanded state from the last visit
    if (readTrackerCollapsed()) {
      trackerNav.classList.add("collapsed");
      trackerToggleBtn.setAttribute("aria-expanded", "false");
    }

    // Back/forward buttons (and manual hash edits) fire hashchange —
    // sync the visible step without pushing another history entry
    window.addEventListener("hashchange", () => {
      const index = stepFromHash();
      if (index !== null) {
        showStep(index, { updateUrl: false, scroll: false });
      }
    });

    // Restore step from a deep link or refresh, then from the last visit's
    // saved step; otherwise start clean at step 0
    const hashStep = stepFromHash();
    if (window.location.hash && hashStep === null) {
      // Invalid hash (e.g. "#step-99") — clean it up rather than leaving a broken URL
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    const savedStep = hashStep === null ? readSavedStep() : null;
    if (savedStep !== null && savedStep > 0) {
      // Reflect the restored step in the URL without adding a history entry
      history.replaceState(null, "", `#step-${savedStep + 1}`);
    }
    showStep(hashStep ?? savedStep ?? 0, { updateUrl: false, scroll: false });
  }

  function initRoleplaying() {
    // TODO
  }

  function initGlossary() {
    // TODO
  }

  function initExtraRules() {
    // TODO
  }

  function initTurnGuide() {
    // TODO
  }

  function initXumaria() {
    // Entry data lives in js/reference-data.js, loaded just before this
    // file on xumaria.html only
    if (typeof VERDARII_SUBRACES === "undefined") return;

    initOptionCards([
      {
        gridId: "verdarii-cards",
        entries: VERDARII_SUBRACES,
        modalHtml: raceModalHtml,
      },
    ]);
  }

  function initGallery() {
    const grid = document.getElementById("character-cards");
    if (!grid) return;

    // Card content mirrors the "OG Character Examples" section on the page.
    // Adding a character is one new entry here — the markup is generated.
    // `description` is a list of paragraphs; `placeholder: true` marks copy
    // that hasn't been written yet so it renders visibly as a stand-in.
    // `artist` credits the portrait in the pop-up; omit it and the caption
    // is left off entirely.
    const CHARACTERS = [
      {
        name: "Crimson",
        image: "assets/images/characters/crimson.jpeg",
        alt: "Portrait of Crimson, a half-elf rogue with fiery red hair",
        artist: "Kaya McCue",
        description: [
          "Crimson is a cunning, swashbuckling, half-elf rogue, named for her fiery red hair that made her near impossible to miss on any deck she walked. She didn’t start out as the Pirate Queen, she was just another pair of hands on a creaking ship, quick-fingered (and quicker tongued), with a habit of acting before thinking, which got her into as much trouble as it got her out of.",
          "What set her apart wasn’t raw power, it was her ability to read a room, find the angle nobody else saw, and talk (or fight) her way through whatever mess her impulses landed her in. Through clever schemes, desperate gambles, and more than a few decisions that should have gotten her killed, she clawed her way from anonymous crew member to the most feared captain on the sea.",
          "Crimson is a reminder that you don’t need a grand title at the start, sometimes the best stories are about earning one.",
        ],
      },
      {
        name: "Acharia",
        image: "assets/images/characters/acharia.jpg",
        alt: "Portrait of Acharia",
        artist: "Kaya McCue",
        description: [
          "Acharia is a life cleric whose story began as an orphan under the care of a fugitive priest. Though naturally volatile and shadowed by a dark disposition, her mentor looked past her rough edges, guiding her toward the path of healing. She eventually joined a band of adventurers who looked the other way regarding her frequent outbursts and questionable morals. Driven by a thirst for dominance, she entered into a sinister pact with a devil, yet her time on the road sparked an unexpected transformation. As her journey progressed, the cold, power-motivated hothead slowly found a new purpose, evolving into a steadfast protector who would sacrifice everything for the family she chose.",
        ],
      },
      {
        name: "Maeve",
        image: "assets/images/characters/maeve.jpg",
        alt: "Portrait of Maeve",
        artist: "Kaya McCue",
        description: ["Description coming soon"],
        placeholder: true,
      },
      {
        name: "Hana",
        image: "assets/images/characters/hana.jpg",
        alt: "Portrait of Hana",
        artist: "Kaya McCue",
        description: ["Description coming soon"],
        placeholder: true,
      },
      {
        name: "Lyonoris",
        image: "assets/images/characters/lyo.jpg",
        alt: "Portrait of Lyonoris",
        artist: "Robin Laronde",
        description: ["Description coming soon."],
        placeholder: true,
      },
      {
        name: "Hal",
        image: "assets/images/characters/hal.jpg",
        alt: "Portrait of Hal",
        artist: "Robin Laronde",
        description: ["Description coming soon"],
        placeholder: true,
      },
    ];

    // Marks descriptions that aren't written yet so they read as stand-ins
    function placeholderClass(character) {
      return character.placeholder ? "text-placeholder" : "";
    }

    // The card is just the portrait and the name — the description lives in
    // the pop-up
    function cardTag(character) {
      return `
        <button
          type="button"
          class="character-card"
          aria-haspopup="dialog"
          aria-label="Read about ${character.name}"
        >
          <img
            src="${character.image}"
            alt="${character.alt}"
            width="400"
            height="500"
          />
          <span class="character-card-name">${character.name}</span>
        </button>
      `;
    }

    grid.innerHTML = CHARACTERS.map(cardTag).join("");

    const modal = document.getElementById("character-modal");
    const modalImage = document.getElementById("character-modal-image");
    const modalTitle = document.getElementById("character-modal-title");
    const modalText = document.getElementById("character-modal-text");
    const modalCredit = document.getElementById("character-modal-credit");
    const modalClose = document.getElementById("character-modal-close");

    function openModal(character) {
      modalImage.src = character.image;
      modalImage.alt = character.alt;
      modalTitle.textContent = character.name;

      // Left empty for uncredited art — :empty hides the caption
      modalCredit.textContent = character.artist
        ? `Art by: ${character.artist}`
        : "";

      modalText.innerHTML = character.description
        .map((text) => `<p class="${placeholderClass(character)}">${text}</p>`)
        .join("");

      modal.showModal();
      document.body.classList.add("modal-open");
    }

    // Loops over whatever was rendered, so a new CHARACTERS entry still needs
    // no changes here. A real <button> fires click on Enter and Space, so
    // there's no keydown handler to keep in sync. The hover lift is pure CSS.
    grid.querySelectorAll(".character-card").forEach((card, index) => {
      card.addEventListener("click", () => openModal(CHARACTERS[index]));
    });

    modalClose.addEventListener("click", () => modal.close());

    // A click that lands on the dialog element itself (rather than its
    // contents) is a click on the backdrop
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });

    // Fires for the X, the backdrop, and Escape alike
    modal.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
    });
  }

  // Skips the row entirely when the field is empty/missing
  function field(label, value) {
    return value ? `<p><strong>${label}:</strong> ${value}</p>` : "";
  }

  function traitTags(traits) {
    return traits
      .map(
        (trait) =>
          `<p><strong><em>${trait.name}.</em></strong> ${trait.desc}</p>`,
      )
      .join("");
  }

  function raceModalHtml(entry) {
    const subraces = entry.subraces
      .map(
        (subrace) => `
          <h4>Subrace: ${subrace.name}</h4>
          <p>${subrace.desc}</p>
          ${field("Ability Score Increase", subrace.asi)}
          ${traitTags(subrace.traits)}
        `,
      )
      .join("");
    return `
      <p>${entry.summary}</p>
      ${field("Ability Score Increase", entry.asi)}
      ${field("Age", entry.age)}
      ${field("Alignment", entry.alignment)}
      ${field("Size", entry.size)}
      ${field("Speed", entry.speed)}
      ${field("Darkvision", entry.darkvision)}
      ${field("Languages", entry.languages)}
      ${entry.traits.length ? `<h4>Traits</h4>${traitTags(entry.traits)}` : ""}
      ${subraces}
    `;
  }

  // Wires a shared dialog (#options-modal) to one or more grids of option
  // cards. Each section is { gridId, entries, modalHtml }; entries render
  // as buttons in the grid and open the shared modal via modalHtml(entry).
  // Used by both character-options.html (classes/races/backgrounds) and
  // xumaria.html (Verdarii).
  function initOptionCards(sections) {
    const modal = document.getElementById("options-modal");
    const modalTitle = document.getElementById("options-modal-title");
    const modalText = document.getElementById("options-modal-text");
    const modalClose = document.getElementById("options-modal-close");
    if (!modal) return;

    // Entry id -> { entry, modalHtml }, for deep links like #fighter
    const entriesById = new Map();

    function openModal(entry, modalHtml) {
      modalTitle.textContent = entry.name;
      modalText.innerHTML = modalHtml(entry);
      modal.showModal();
      document.body.classList.add("modal-open");
      // Long entries should always open scrolled to the top
      modal.querySelector(".character-modal-body").scrollTop = 0;
    }

    for (const section of sections) {
      const grid = document.getElementById(section.gridId);
      if (!grid) continue;

      // The entry id doubles as the card's anchor id
      grid.innerHTML = section.entries
        .map(
          (entry) => `
            <button
              type="button"
              class="option-card"
              id="${entry.id}"
              aria-haspopup="dialog"
            >
              <span class="option-card-name">${entry.name}</span>
              <span class="option-card-summary">${entry.summary}</span>
            </button>
          `,
        )
        .join("");

      grid.querySelectorAll(".option-card").forEach((card, index) => {
        const entry = section.entries[index];
        entriesById.set(entry.id, { entry, modalHtml: section.modalHtml });
        card.addEventListener("click", () =>
          openModal(entry, section.modalHtml),
        );
      });
    }

    modalClose.addEventListener("click", () => modal.close());

    // A click that lands on the dialog element itself (rather than its
    // contents) is a click on the backdrop. Escape is handled natively.
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });

    modal.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
    });

    // Deep links (e.g. character-options.html#fighter) scroll to the card
    // and open its entry. Closing the modal is not tied to history — the
    // back button navigates pages, not pop-ups.
    function openFromHash() {
      const found = entriesById.get(window.location.hash.slice(1));
      if (!found) return;
      const card = document.getElementById(found.entry.id);
      if (card) card.scrollIntoView({ block: "center" });
      if (modal.open) modal.close();
      openModal(found.entry, found.modalHtml);
    }

    window.addEventListener("hashchange", openFromHash);
    openFromHash();
  }

  function initCharacterOptions() {
    // Entry data lives in js/reference-data.js, loaded just before this
    // file on character-options.html only
    if (typeof CLASSES === "undefined") return;

    // One roll table (d8 Personality Trait, d6 Ideal, ...) as rows
    function rollTableTag(die, label, rows) {
      return `
        <div class="table-wrap">
          <table class="modifier-table">
            <tr><th>${die}</th><th>${label}</th></tr>
            ${rows.map((row, i) => `<tr><td>${i + 1}</td><td>${row}</td></tr>`).join("")}
          </table>
        </div>
      `;
    }

    // Renders the level 1 class feature(s), or nothing until they're filled
    // in on the entry (see js/reference-data.js)
    function level1FeaturesHtml(entry) {
      if (!entry.level1Feature) return "";
      const secondary = entry.level1FeatureSecondary
        ? `<p><strong><em>${entry.level1FeatureSecondary.name}.</em></strong> ${entry.level1FeatureSecondary.desc}</p>`
        : "";
      return `
        <h4>Level 1 Features</h4>
        <p><strong><em>${entry.level1Feature.name}.</em></strong> ${entry.level1Feature.desc}</p>
        ${secondary}
      `;
    }

    function classModalHtml(entry) {
      const spellcasting = entry.spellcasting
        ? `${entry.spellcasting.ability}. ${entry.spellcasting.note}`
        : "None";
      // Spell lists are deliberately not reprinted — link out instead
      const spellListLink = entry.spellcasting
        ? `<p>
            Spell lists aren't reprinted here.
            <a href="https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spells"
              target="_blank" rel="noopener noreferrer">Browse the full spell
              list in the free D&amp;D Basic Rules</a>.
          </p>`
        : "";
      return `
        <p>${entry.description}</p>
        ${field("Hit Die", entry.hitDie)}
        ${field("Hit Points at Level 1", entry.hpAtFirst)}
        ${field("Primary Ability", entry.primaryAbility)}
        ${field("Saving Throws", entry.saves)}
        ${field("Armor", entry.armor)}
        ${field("Weapons", entry.weapons)}
        ${field("Tools", entry.tools)}
        ${field("Skills", entry.skills)}
        ${field("Spellcasting", spellcasting)}
        <h4>Starting Equipment</h4>
        <p>
          You start with the following, in addition to the equipment granted
          by your background:
        </p>
        <ul>${entry.equipment.map((item) => `<li>${item}</li>`).join("")}</ul>
        ${level1FeaturesHtml(entry)}
        <h4>${entry.subclass.term} (Subclass, chosen at level ${entry.subclass.level})</h4>
        <p>
          <strong>${entry.subclass.name}</strong>: ${entry.subclass.blurb}
        </p>
        ${spellListLink}
      `;
    }

    function backgroundModalHtml(entry) {
      // PHB backgrounds aren't in the SRD — name and pointer only
      if (!entry.srd) {
        return `
          <p>${entry.summary}</p>
          <p>
            This background comes from the Player's Handbook, so its full
            rules aren't part of the free SRD and can't be reprinted here.
          </p>
          <p>
            <a class="btn btn-primary" href="${entry.link}"
              target="_blank" rel="noopener noreferrer">
              Read the Full Entry (D&amp;D Basic Rules)
            </a>
          </p>
        `;
      }
      const characteristics = entry.characteristics;
      return `
        <p>${entry.description}</p>
        ${field("Skill Proficiencies", entry.skills)}
        ${field("Tool Proficiencies", entry.tools)}
        ${field("Languages", entry.languages)}
        ${field("Equipment", entry.equipment)}
        <h4>Feature: ${entry.feature.name}</h4>
        <p>${entry.feature.desc}</p>
        <h4>Suggested Characteristics</h4>
        <p>${characteristics.intro}</p>
        ${rollTableTag("d8", "Personality Trait", characteristics.personalityTraits)}
        ${rollTableTag("d6", "Ideal", characteristics.ideals)}
        ${rollTableTag("d6", "Bond", characteristics.bonds)}
        ${rollTableTag("d6", "Flaw", characteristics.flaws)}
      `;
    }

    // Each grid renders one array from reference-data.js — adding an entry
    // there needs no changes here. Classes are split across two grids by
    // their `core` flag (see reference-data.js).
    initOptionCards([
      {
        gridId: "class-cards",
        entries: CLASSES.filter((entry) => entry.core !== false),
        modalHtml: classModalHtml,
      },
      {
        gridId: "other-class-cards",
        entries: CLASSES.filter((entry) => entry.core === false),
        modalHtml: classModalHtml,
      },
      { gridId: "race-cards", entries: RACES, modalHtml: raceModalHtml },
      {
        gridId: "background-cards",
        entries: BACKGROUNDS,
        modalHtml: backgroundModalHtml,
      },
    ]);
  }

  // Main

  function main() {
    switch (currentPage) {
      case "character-creator.html":
        initCharacterCreator();
        break;
      case "roleplaying.html":
        initRoleplaying();
        break;
      case "glossary.html":
        initGlossary();
        break;
      case "extra-rules.html":
        initExtraRules();
        break;
      case "turn-guide.html":
        initTurnGuide();
        break;
      case "xumaria.html":
        initXumaria();
        break;
      case "gallery.html":
        initGallery();
        break;
      case "character-options.html":
        initCharacterOptions();
        break;
    }
  }

  document.addEventListener("DOMContentLoaded", main);
})();
