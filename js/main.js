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
        />
        D&amp;D Onboarding (5e)
      </a>
      <div class="nav-links-desktop">
        ${desktopMainLinks}
        <div class="nav-dropdown" id="nav-reference-dropdown">
          <button
            type="button"
            class="nav-dropdown-toggle"
            id="nav-reference-toggle"
            aria-haspopup="true"
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
      if (event.key === "Escape") closeReferenceMenu();
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

    const stepIcons = document.querySelectorAll(".step-icon");
    const trackerEntries = document.querySelectorAll(".tracker-entry-btn");

    // Reads "#step-4" from the URL and returns index 3, or null if
    // missing/invalid. Hashes are 1-based (step-1..step-10) but the
    // internal step index stays 0-based.
    function stepFromHash() {
      const match = window.location.hash.match(/^#step-(\d+)$/);
      if (!match) return null;
      const index = Number(match[1]) - 1;
      return index >= 0 && index < steps.length ? index : null;
    }

    // updateUrl is false when we're just reacting to a URL/history change
    // that already happened (initial load, back/forward button)
    function showStep(index, { updateUrl = true } = {}) {
      currentStep = index;

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

      // Change Button Text
      prevBtn.textContent = index === 0 ? "Home" : "Previous";
      nextBtn.textContent = index === steps.length - 1 ? "Finish" : "Next";

      // Mobile tracker arrows only move between steps, so they disable
      // at the ends instead of falling through to Home/Finish
      trackerPrevBtn.disabled = index === 0;
      trackerNextBtn.disabled = index === steps.length - 1;

      // Push a history entry so refresh keeps the step and back steps
      // backward through the guide instead of leaving the page
      if (updateUrl) {
        const hash = `#step-${index + 1}`;
        if (window.location.hash !== hash) {
          history.pushState(null, "", hash);
        }
      }

      // Scroll back to the top of the page for the new step
      window.scrollTo({ top: 0, behavior: "smooth" });
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

    // Back/forward buttons (and manual hash edits) fire hashchange —
    // sync the visible step without pushing another history entry
    window.addEventListener("hashchange", () => {
      const index = stepFromHash();
      if (index !== null) {
        showStep(index, { updateUrl: false });
      }
    });

    // Restore step from a deep link or refresh; otherwise start clean at step 0
    const hashStep = stepFromHash();
    if (window.location.hash && hashStep === null) {
      // Invalid hash (e.g. "#step-99") — clean it up rather than leaving a broken URL
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    showStep(hashStep ?? 0, { updateUrl: false });
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
    // TODO
  }

  function initGallery() {
    // TODO
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
    }
  }

  document.addEventListener("DOMContentLoaded", main);
})();
