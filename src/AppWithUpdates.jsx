import React, { useEffect } from "react";
import App from "./App";
import "./ats-site-updates.css";

const TEXT_REPLACEMENTS = new Map([
  [
    "Aloha Technology Services LLC is organized around the work we most value: supporting properties, inspecting homes, coordinating qualified providers and solving practical operational and technology challenges.",
    "Aloha Technology Services LLC is organized around specialized property services, residential inspections, provider coordination, operational improvement and practical technology solutions.",
  ],
  [
    "These services reflect the work ATS most prefers to perform and the areas where local field experience, detailed documentation and strong provider relationships create the greatest value.",
    "These services represent ATS’s core property and inspection specialties, where local field experience, detailed documentation and strong provider relationships create the greatest value.",
  ],
  [
    "Additional capabilities arranged in your preferred order",
    "Additional specialized services",
  ],
  ["Services in preferred order", "Specialized services"],
  [
    "The report explains what was observed, why it matters, what could not be inspected and what type of follow-up should be considered.",
    "The report distinguishes serviceable components, maintenance needs, repair concerns, significant conditions, and inspection limitations or specialist referrals.",
  ],
]);

const INSPECTION_CLASSIFICATIONS = [
  {
    key: "blue",
    title: "Blue — Serviceable",
    text:
      "The system or component was operating as intended at the time of inspection, with no material deficiency observed. Normal aging, routine upkeep, and conditions consistent with the component’s type and service life may still be present. Continued monitoring and regular maintenance are recommended.",
  },
  {
    key: "green",
    title: "Green — Maintenance",
    text:
      "The observation relates to routine maintenance, a manageable repair, a potential do-it-yourself item, or a recommended upgrade. These conditions generally do not represent an immediate safety concern or significant functional failure; however, prolonged neglect may contribute to deterioration, reduced performance, or progression to a Yellow or Red condition. Refer to the individual observation for the recommended action and timing.",
  },
  {
    key: "yellow",
    title: "Yellow — Repair / Evaluate",
    text:
      "The system or component was functional but was not operating as intended, showed a material defect, or presented a condition that warrants timely attention. If left unaddressed, the concern may contribute to property damage, reduced performance, diminished property value, or an unreasonable risk to people or property. Further evaluation by an appropriately qualified professional may be recommended.",
  },
  {
    key: "red",
    title: "Red — Significant / Prompt Action",
    text:
      "The observation identifies a significant defect, active or developing damage, a substantial system or component failure, or a condition that may pose a meaningful risk to people or property. Prompt evaluation and corrective action by an appropriately qualified professional are recommended. Refer to the individual observation for specific findings and next steps.",
  },
  {
    key: "gray",
    title: "Gray — Limitation / Referral",
    text:
      "A system, component, or area could not be fully inspected because it was inaccessible, concealed, obstructed, shut down, unsafe to operate, outside the agreed scope, or otherwise restricted. Gray may also identify a condition requiring evaluation by an appropriately qualified specialist. This classification does not, by itself, indicate that the component is defective.",
  },
];

function replaceOutdatedWording() {
  const elements = document.querySelectorAll("h1, h2, h3, p, span");

  elements.forEach((element) => {
    if (element.childElementCount > 0) return;

    const currentText = element.textContent?.trim();
    const replacement = TEXT_REPLACEMENTS.get(currentText);

    if (replacement && currentText !== replacement) {
      element.textContent = replacement;
    }
  });
}

function updateDesktopServicesMenu() {
  const menuLabel = Array.from(document.querySelectorAll("header p")).find(
    (element) => element.textContent?.trim() === "Specialized services",
  );

  if (!menuLabel) return;

  const menuPanel = menuLabel.parentElement;
  const menuGrid = menuPanel?.querySelector(":scope > div.grid");

  if (!menuGrid) return;

  menuGrid.classList.add("ats-services-menu-grid");

  const menuButtons = Array.from(menuGrid.children).filter(
    (element) => element.tagName === "BUTTON",
  );
  const rowCount = Math.ceil(menuButtons.length / 2);
  menuGrid.style.setProperty("--ats-menu-rows", String(rowCount));

  menuButtons.forEach((button) => {
    const marker = button.querySelector(":scope > span:first-child");
    if (!marker) return;

    if (/^\d+$/.test(marker.textContent?.trim() || "")) {
      marker.textContent = "›";
    }

    marker.classList.add("ats-service-menu-marker");
  });
}

function updateMobileServicesMenu() {
  const serviceDetails = Array.from(document.querySelectorAll("header details")).find(
    (details) => details.querySelector("summary")?.textContent?.trim() === "Services",
  );

  if (!serviceDetails) return;

  serviceDetails.querySelectorAll("button").forEach((button) => {
    const marker = button.querySelector(":scope > span:first-child");
    if (!marker) return;

    if (/^\d+\.$/.test(marker.textContent?.trim() || "")) {
      marker.textContent = "›";
    }

    marker.classList.add("ats-mobile-service-marker");
  });
}

function improveCardContrast() {
  document.querySelectorAll("div.rounded-2xl").forEach((card) => {
    if (card.classList.contains("bg-[#061B33]")) {
      card.classList.add("ats-dark-card");
    }
  });
}

function updateInspectionClassificationSection() {
  const sectionTitle = Array.from(document.querySelectorAll("section h2")).find(
    (heading) => heading.textContent?.trim() === "Organized to support action—not confusion",
  );

  const section = sectionTitle?.closest("section");
  if (!section) return;

  const grid = Array.from(section.children).find(
    (element) => element instanceof HTMLElement && element.classList.contains("grid"),
  );
  if (!grid) return;

  const existingTitles = Array.from(grid.querySelectorAll("h3")).map((item) => item.textContent?.trim());
  const alreadyUpdated =
    grid.dataset.atsClassificationVersion === "2" &&
    existingTitles.length === INSPECTION_CLASSIFICATIONS.length &&
    existingTitles[0] === INSPECTION_CLASSIFICATIONS[0].title;

  grid.classList.add("ats-classification-grid");
  if (alreadyUpdated) return;

  grid.dataset.atsClassificationVersion = "2";
  grid.innerHTML = INSPECTION_CLASSIFICATIONS.map(
    (item) => `
      <article class="ats-classification-card ats-classification-${item.key}">
        <div class="ats-classification-accent" aria-hidden="true"></div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `,
  ).join("");
}

function applyWebsiteUpdates() {
  replaceOutdatedWording();
  updateDesktopServicesMenu();
  updateMobileServicesMenu();
  improveCardContrast();
  updateInspectionClassificationSection();
}

export default function AppWithUpdates() {
  useEffect(() => {
    let animationFrame = 0;

    const scheduleUpdate = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        applyWebsiteUpdates();
      });
    };

    scheduleUpdate();

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return React.createElement(App);
}
