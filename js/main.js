(function () {
  const pages = [
    { href: "character-creator.html", label: "Character Creator" },
    { href: "turn-guide.html", label: "Turn Guide" },
    { href: "rules-guide.html", label: "Extra Rules" },
  ];

  // Handles direct file open (pathname ends with '/') and server roots
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const links = pages
    .map(({ href, label }) => {
      const isActive = href === currentPage;
      return `<a href="${href}"${isActive ? ' class="active"' : ""}>${label}</a>`;
    })
    .join("");

  const header = document.querySelector("header");
  if (header) {
    header.innerHTML = `<nav class="main-nav">
    <a href="index.html" class="nav-logo">
      <img src="assets/d20_transparent.png" alt="d20" class="nav-logo-icon" />
      D&amp;D Onboarding (5e)
    </a>
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
      ${links}
    </div>
  </nav>`;

    // Hamburger menu (mobile only — hidden via CSS above the mobile breakpoint)
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
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
    const trackerEntries = document.querySelectorAll(".tracker-entry");

    // Reads "#step-3" from the URL and returns 3, or null if missing/invalid
    function stepFromHash() {
      const match = window.location.hash.match(/^#step-(\d+)$/);
      if (!match) return null;
      const index = Number(match[1]);
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
        const hash = `#step-${index}`;
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

  function initRulesGuide() {
    // TODO
  }

  function initTurnGuide() {
    // TODO
  }

  // Main

  function main() {
    switch (currentPage) {
      case "character-creator.html":
        initCharacterCreator();
        break;
      case "rules-guide.html":
        initRulesGuide();
        break;
      case "turn-guide.html":
        initTurnGuide();
        break;
    }
  }

  document.addEventListener("DOMContentLoaded", main);
})();
