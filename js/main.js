(function () {
  const pages = [
    { href: "index.html", label: "Home" },
    { href: "character-creator.html", label: "Character Creator" },
    { href: "turn-guide.html", label: "Turn Guide" },
    { href: "rules-guide.html", label: "Rules Guide" },
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
        <span class="nav-logo">D&amp;D Onboarding (5e)</span>
        ${links}
      </nav>`;
  }

  // Page Modules

  function initCharacterCreator() {
    // Movement through each step of character creation
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const nextBtn = document.getElementById("btn-next");
    const prevBtn = document.getElementById("btn-prev");

    const stepIcons = document.querySelectorAll(".step-icon");

    function showStep(index) {
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
    }

    // Button Click Reactions
    nextBtn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        window.location.href = "turn-guide.html";
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      } else {
        window.location.href = "index.html";
      }
    });

    showStep(0);
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
