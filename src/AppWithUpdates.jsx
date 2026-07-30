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
]);

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
  // Card.jsx always includes bg-white. Mark every Card that App.jsx also
  // intended to render with the navy bg-[#061B33] utility so supplemental CSS
  // can reliably restore the navy background regardless of Tailwind rule order.
  document.querySelectorAll("div.rounded-2xl").forEach((card) => {
    if (card.classList.contains("bg-[#061B33]")) {
      card.classList.add("ats-dark-card");
    }
  });
}

function applyWebsiteUpdates() {
  replaceOutdatedWording();
  updateDesktopServicesMenu();
  updateMobileServicesMenu();
  improveCardContrast();
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
