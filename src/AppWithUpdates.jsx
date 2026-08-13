import React, { useEffect } from "react";
import App from "./App";
import "./ats-site-updates.css";

const REPLACEMENTS = new Map([
  [
    "Aloha Technology Services LLC is organized around the work we most value: supporting properties, inspecting homes, coordinating qualified providers and solving practical operational and technology challenges.",
    "Aloha Technology Services LLC brings together specialized property and inspection services, connected-home technology, business operations support and digital solutions under one dependable local company.",
  ],
  [
    "Aloha Technology Services LLC is organized around specialized property services, residential inspections, provider coordination, operational improvement and practical technology solutions.",
    "Aloha Technology Services LLC brings together specialized property and inspection services, connected-home technology, business operations support and digital solutions under one dependable local company.",
  ],
  [
    "Whole-property connectivity, televisions, streaming equipment, connected devices and practical technology refreshes.",
    "Whole-property networking, smart-home setup, televisions, streaming equipment, connected devices and practical technology refreshes.",
  ],
  [
    "Reliable technology for homes, businesses and managed residences.",
    "Connected, reliable technology for homes, businesses and managed residences.",
  ],
  [
    "ATS installs, configures and troubleshoots technology for homeowners, businesses, vacation rentals and property teams. Projects may include internet-provider coordination, mesh Wi-Fi, televisions, streaming devices, connected appliances, printers, displays and user-ready documentation.",
    "ATS installs, configures and troubleshoots technology for homeowners, businesses, vacation rentals and property teams. Projects may include whole-property Wi-Fi and networking, internet-provider coordination, televisions and streaming systems, compatible smart-home devices, connected appliances, printers, displays and user-ready documentation.",
  ],
  ["Mesh Wi-Fi and connectivity", "Networking & Connectivity"],
  [
    "Assess coverage, place compatible equipment, configure the network and verify connectivity in priority areas.",
    "Assess coverage, configure compatible routers, mesh systems and network devices, and verify dependable connectivity across the areas that matter most.",
  ],
  ["Connected devices and appliances", "Smart Home Setup & Integration"],
  [
    "Configure compatible smart-home devices, appliances, printers, displays and shared equipment.",
    "Set up and configure compatible smart locks, thermostats, cameras, doorbells, lighting, hubs, connected appliances and related devices within their supported ecosystems.",
  ],
  ["SOP development", "SOP & Process Documentation"],
  [
    "Create usable procedures with roles, standards, decision points, exceptions and escalation steps.",
    "Create clear procedures, checklists and process documentation with defined roles, standards, decision points, exceptions and escalation paths.",
  ],
  ["Implementation support", "Implementation & Operational Support"],
  [
    "Train users, test the new workflow, gather feedback and refine the process after rollout.",
    "Support rollout, user training, testing, adoption follow-through and practical refinement after a new workflow or operating process goes live.",
  ],
  [
    "Detailed residential inspections with photographs, clear priorities and practical recommendations for buyers, sellers and owners.",
    "Detailed residential inspections with photographs, clear classifications, defined limitations and practical recommendations for buyers, sellers and owners.",
  ],
  [
    "Locally owned and operated on Hawaiʻi Island. Property field services, home inspections, vendor coordination, handyman support, operations and practical technology solutions.",
    "Locally owned and operated on Hawaiʻi Island. Specialized property and inspection services, connected-home technology, business operations support and digital solutions.",
  ],
]);

const DIVISIONS = [
  {
    key: "property",
    title: "Property & Inspection Services",
    description:
      "Onsite property support, residential inspections, provider coordination and defined handyman work for owners, buyers, sellers and property stakeholders across Hawaiʻi Island.",
    cards: [
      [
        "Property Field Services",
        "Owner-directed onsite checks, factual documentation, access assistance and clearly authorized field support.",
        "/services/property-field-services",
      ],
      [
        "Home Inspections",
        "Detailed residential inspections with photographs, clear classifications, defined limitations and practical recommendations.",
        "/services/home-inspections",
      ],
      [
        "Vendor Coordination",
        "Project-specific provider research, shortlisting, scheduling, access and documented follow-through across Hawaiʻi Island.",
        "/services/vendor-coordination",
      ],
      [
        "Handyman Services",
        "Minor repairs, installations, adjustments and property punch-list work within a clearly defined non-licensed scope.",
        "/services/handyman-services",
      ],
    ],
  },
  {
    key: "technology",
    title: "Technology & Connected Home",
    description:
      "Installation, networking, smart-home integration and user support designed around dependable day-to-day use in homes, residences and businesses.",
    cards: [
      [
        "Technology Installation",
        "Televisions, streaming equipment, connected devices and practical technology refreshes for residential and business environments.",
        "/services/technology-installation",
      ],
      [
        "Networking & Connectivity",
        "Mesh Wi-Fi, router and network-device setup, coverage improvement, internet-provider coordination and whole-property connectivity.",
        "/services/technology-installation",
      ],
      [
        "Smart Home Setup & Integration",
        "Setup and configuration for compatible smart locks, thermostats, cameras, doorbells, lighting, hubs and connected devices.",
        "/services/technology-installation",
      ],
      [
        "Training & Support",
        "Training videos, written guides and practical support resources that turn complicated systems and processes into repeatable guidance.",
        "/services/training-support",
      ],
    ],
  },
  {
    key: "operations",
    title: "Business Operations & Consulting",
    description:
      "Practical process design, SOPs, analysis and implementation support that make work easier to execute, measure, teach and improve.",
    cards: [
      [
        "Workflow Optimization",
        "Process mapping, clearer ownership and improved handoffs designed around how work actually moves.",
        "/services/workflow-optimization",
      ],
      [
        "SOP & Process Documentation",
        "Clear procedures, checklists, roles, decision points and escalation paths built around how the work actually happens.",
        "/services/workflow-optimization",
      ],
      [
        "Insight & Analysis",
        "Leadership-ready reporting and operational analysis that identifies trends, risks and practical opportunities.",
        "/services/business-insight",
      ],
      [
        "Implementation & Operational Support",
        "Rollout support, user training, testing, adoption follow-through and practical refinement after a new process goes live.",
        "/services/workflow-optimization",
      ],
    ],
  },
  {
    key: "digital",
    title: "Digital, Automation & AI Solutions",
    description:
      "Websites, applications, automations and responsible AI implementations built around defined business needs, usability and measurable outcomes.",
    cards: [
      [
        "Website Development",
        "Responsive websites that explain your services, strengthen credibility and convert visitors into qualified inquiries.",
        "/services/website-development",
      ],
      [
        "Application Development",
        "Custom internal tools, dashboards and application implementation designed around the work your organization performs.",
        "/services/application-development",
      ],
      [
        "Automation Development",
        "Practical automations that reduce repetitive work, improve follow-up and keep important processes moving.",
        "/services/automation-development",
      ],
      [
        "AI Implementation",
        "Responsible AI implementation for defined business needs, with privacy, data quality and human review built in.",
        "/services/ai-implementation",
      ],
    ],
  },
];

function navigate(path) {
  if (window.location.pathname !== path) {
    window.history.pushState({ path }, "", path);
  }
  window.dispatchEvent(new PopStateEvent("popstate", { state: { path } }));
}

function replaceText() {
  document.querySelectorAll("h1,h2,h3,p,span").forEach((element) => {
    if (element.childElementCount) return;
    const current = element.textContent?.trim();
    const next = REPLACEMENTS.get(current);
    if (next && next !== current) element.textContent = next;
  });
}

function divisionIcon(key) {
  const common =
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  if (key === "technology") {
    return `<svg ${common}><circle cx="6" cy="6" r="2.5"></circle><circle cx="18" cy="6" r="2.5"></circle><circle cx="12" cy="18" r="2.5"></circle><path d="M8.2 7.3 10.6 15M15.8 7.3 13.4 15M8.5 6h7"></path></svg>`;
  }
  if (key === "operations") {
    return `<svg ${common}><path d="M6 3h9l3 3v15H6z"></path><path d="M15 3v4h4M9 11h6M9 15h6"></path></svg>`;
  }
  if (key === "digital") {
    return `<svg ${common}><path d="m9 7-5 5 5 5M15 7l5 5-5 5M13 4l-2 16"></path></svg>`;
  }
  return `<svg ${common}><path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10.5V20h13v-9.5M9 20v-6h6v6"></path></svg>`;
}

function makeCard(division, [title, blurb, path]) {
  const shell = document.createElement("div");
  shell.className = "ats-specialty-card-shell";
  shell.innerHTML = `<article class="ats-specialty-card ats-specialty-card--${division.key}"><div class="ats-specialty-card-accent"></div><div class="ats-specialty-card-body"><div class="ats-specialty-icon">${divisionIcon(division.key)}</div><h3>${title}</h3><p>${blurb}</p><button type="button" class="ats-specialty-link"><span>Explore service</span><span aria-hidden="true">→</span></button></div></article>`;
  shell.querySelector("button")?.addEventListener("click", () => navigate(path));
  return shell;
}

function makeDivision(division) {
  const section = document.createElement("section");
  section.className = "ats-service-division";
  section.innerHTML = `<div class="ats-division-heading"><h2>${division.title}</h2><p class="ats-division-description">${division.description}</p></div>`;

  const grid = document.createElement("div");
  grid.className = "ats-division-grid";
  division.cards.forEach((card) => grid.appendChild(makeCard(division, card)));
  section.appendChild(grid);
  return section;
}

function organizeHome() {
  if (window.location.pathname !== "/") return;
  if (document.querySelector('main [data-ats-service-divisions="property"]')) return;

  const propertyHeading = Array.from(document.querySelectorAll("main h2")).find(
    (heading) => heading.textContent?.trim() === "Property and home services come first",
  );
  const otherHeading = Array.from(document.querySelectorAll("main h2")).find(
    (heading) => heading.textContent?.trim() === "Additional capabilities arranged in your preferred order",
  );

  const propertySection = propertyHeading?.closest("section");
  const otherSection = otherHeading?.closest("section");
  const container = propertySection?.parentElement;

  if (!propertySection || !otherSection || !container || otherSection.parentElement !== container) return;

  propertySection.classList.add("ats-original-services-section-hidden");
  otherSection.classList.add("ats-original-services-section-hidden");

  const propertyBlock = document.createElement("div");
  propertyBlock.className = "ats-service-divisions";
  propertyBlock.setAttribute("data-ats-service-divisions", "property");
  propertyBlock.appendChild(makeDivision(DIVISIONS[0]));
  container.insertBefore(propertyBlock, propertySection);

  const remainingBlock = document.createElement("div");
  remainingBlock.className = "ats-service-divisions ats-service-divisions--remaining";
  remainingBlock.setAttribute("data-ats-service-divisions", "remaining");
  DIVISIONS.slice(1).forEach((division) => remainingBlock.appendChild(makeDivision(division)));
  container.insertBefore(remainingBlock, otherSection);
}

function makeMenu(mobile = false) {
  const menu = document.createElement("div");
  menu.className = mobile ? "ats-grouped-mobile-menu" : "ats-grouped-services-menu";

  DIVISIONS.forEach((division) => {
    const group = document.createElement("div");
    group.className = mobile ? "ats-mobile-menu-group" : "ats-menu-group";

    const heading = document.createElement("p");
    heading.className = mobile ? "ats-mobile-menu-group-title" : "ats-menu-group-title";
    heading.textContent = division.title;
    group.appendChild(heading);

    division.cards.forEach(([title, , path]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = mobile ? "ats-synthetic-mobile-link" : "ats-synthetic-menu-link";
      button.innerHTML = `<span class="${mobile ? "ats-mobile-service-marker" : "ats-service-menu-marker"}">›</span><span>${title}</span>`;
      button.addEventListener("click", () => navigate(path));
      group.appendChild(button);
    });

    menu.appendChild(group);
  });

  return menu;
}

function organizeMenus() {
  const desktopLabel = Array.from(document.querySelectorAll("header p")).find(
    (element) => element.textContent?.trim() === "Services in preferred order",
  );
  const panel = desktopLabel?.parentElement;
  const originalGrid = panel?.querySelector(":scope > div.grid");

  if (panel && originalGrid && !panel.querySelector(":scope > .ats-grouped-services-menu")) {
    desktopLabel.textContent = "Specialized service divisions";
    panel.classList.add("ats-services-menu-panel");
    originalGrid.classList.add("ats-original-menu-grid-hidden");
    originalGrid.insertAdjacentElement("afterend", makeMenu(false));
  }

  const details = Array.from(document.querySelectorAll("header details")).find(
    (element) => element.querySelector("summary")?.textContent?.trim() === "Services",
  );
  const originalMobile = details?.querySelector(":scope > div");

  if (details && originalMobile && !details.querySelector(":scope > .ats-grouped-mobile-menu")) {
    originalMobile.classList.add("ats-original-mobile-menu-hidden");
    originalMobile.insertAdjacentElement("afterend", makeMenu(true));
  }
}

function organizeFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  Array.from(footer.querySelectorAll("h2")).forEach((heading) => {
    if (heading.textContent?.trim() === "Priority services") {
      heading.textContent = "Property & Inspection";
    }
    if (heading.textContent?.trim() === "Specialized services") {
      heading.textContent = "Technology, Operations & Digital";
    }
  });
}

function improveDarkCards() {
  document.querySelectorAll("div.rounded-2xl").forEach((card) => {
    if (card.classList.contains("bg-[#061B33]")) card.classList.add("ats-dark-card");
  });
}

function applyUpdates() {
  replaceText();
  organizeHome();
  organizeMenus();
  organizeFooter();
  improveDarkCards();
}

export default function AppWithUpdates() {
  useEffect(() => {
    let frame = 0;

    const observer = new MutationObserver(() => {
      scheduleUpdate();
    });

    const observe = () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    const runUpdate = () => {
      frame = 0;
      observer.disconnect();
      applyUpdates();
      observe();
    };

    function scheduleUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(runUpdate);
    }

    observe();
    scheduleUpdate();

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <App />;
}
