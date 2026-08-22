import React, { useEffect, useState } from "react";
import App from "./App";
import AlohaAssistant from "./AlohaAssistant";
import {
  CANCELLATION_POLICY,
  GLOBAL_PRICING_NOTES,
  HOMEPAGE_PRICING,
  PRICING_PAGE_PATH,
  PRICING_SUMMARY,
  SERVICE_PRICING,
  TRAVEL_POLICY,
} from "./pricingData";
import "./ats-site-updates.css";

const SITE_URL = "https://atshawaii.vercel.app";
const LOGO = "/images/ats-logo.png";
const COMPANY_NAME = "Aloha Technology Services LLC";

const PAGE_ID_PATHS = {
  home: "/",
  about: "/about",
  contact: "/contact",
  "property-field-services": "/services/property-field-services",
  "home-inspections": "/services/home-inspections",
  "vendor-coordination": "/services/vendor-coordination",
  "handyman-services": "/services/handyman-services",
  "workflow-optimization": "/services/workflow-optimization",
  "technology-installation": "/services/technology-installation",
  "training-support": "/services/training-support",
  "website-development": "/services/website-development",
  "business-insight": "/services/business-insight",
  "automation-development": "/services/automation-development",
  "ai-implementation": "/services/ai-implementation",
  "application-development": "/services/application-development",
};

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

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function navigate(path) {
  const nextPath = normalizePath(path);
  if (normalizePath(window.location.pathname) !== nextPath) {
    window.history.pushState({ path: nextPath }, "", nextPath);
  }
  window.dispatchEvent(new PopStateEvent("popstate", { state: { path: nextPath } }));
}

function navigateFromPageId(pageId) {
  navigate(PAGE_ID_PATHS[pageId] || "/");
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
  if (normalizePath(window.location.pathname) !== "/") return;
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

function addPricingNavigation() {
  const desktopNav = document.querySelector("header nav");
  const aboutButton = Array.from(desktopNav?.querySelectorAll("button") || []).find(
    (button) => button.textContent?.trim() === "About",
  );

  if (aboutButton && !desktopNav.querySelector('[data-ats-pricing-nav="desktop"]')) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Pricing";
    button.className = aboutButton.className;
    button.setAttribute("data-ats-pricing-nav", "desktop");
    button.addEventListener("click", () => navigate(PRICING_PAGE_PATH));
    aboutButton.insertAdjacentElement("beforebegin", button);
  }

  const mobileAbout = Array.from(document.querySelectorAll("header button")).find(
    (button) => button.textContent?.trim() === "About" && !button.closest("nav"),
  );
  if (mobileAbout && !document.querySelector('[data-ats-pricing-nav="mobile"]')) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Pricing & Service Policies";
    button.className = mobileAbout.className;
    button.setAttribute("data-ats-pricing-nav", "mobile");
    button.addEventListener("click", () => navigate(PRICING_PAGE_PATH));
    mobileAbout.insertAdjacentElement("beforebegin", button);
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

  const companyHeading = Array.from(footer.querySelectorAll("h2")).find(
    (heading) => heading.textContent?.trim() === "Company",
  );
  const companyColumn = companyHeading?.parentElement;
  const aboutButton = Array.from(companyColumn?.querySelectorAll("button") || []).find(
    (button) => button.textContent?.trim() === "About",
  );
  if (aboutButton && !companyColumn.querySelector('[data-ats-pricing-footer="true"]')) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Pricing & Service Policies";
    button.className = aboutButton.className;
    button.setAttribute("data-ats-pricing-footer", "true");
    button.addEventListener("click", () => navigate(PRICING_PAGE_PATH));
    aboutButton.insertAdjacentElement("beforebegin", button);
  }
}

function makeHomePricingPreview() {
  const section = document.createElement("section");
  section.className = "ats-home-pricing";
  section.setAttribute("data-ats-home-pricing", "true");
  section.innerHTML = `
    <div class="ats-home-pricing-heading">
      <p>Clear pricing. Defined scope.</p>
      <h2>Know the starting point before you request service.</h2>
      <span>ATS publishes practical starting prices for common services while complex projects remain individually scoped and quoted.</span>
    </div>
    <div class="ats-home-pricing-grid">
      ${HOMEPAGE_PRICING.map(
        (item) => `<button type="button" class="ats-home-price-card" data-path="${item.path}"><span>${item.title}</span><strong>${item.price}</strong><small>View service details →</small></button>`,
      ).join("")}
    </div>
    <div class="ats-home-pricing-action"><button type="button" class="ats-pricing-primary" data-all-pricing>View All Pricing & Policies</button></div>
  `;
  section.querySelectorAll("[data-path]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.getAttribute("data-path")));
  });
  section.querySelector("[data-all-pricing]")?.addEventListener("click", () => navigate(PRICING_PAGE_PATH));
  return section;
}

function organizeHomePricing() {
  if (normalizePath(window.location.pathname) !== "/") return;
  if (document.querySelector('[data-ats-home-pricing="true"]')) return;
  const propertyBlock = document.querySelector('main [data-ats-service-divisions="property"]');
  if (!propertyBlock?.parentElement) return;
  propertyBlock.insertAdjacentElement("beforebegin", makeHomePricingPreview());
}

function makeServicePricingSection(pricing, path) {
  const section = document.createElement("section");
  section.className = "ats-service-pricing";
  section.setAttribute("data-ats-service-pricing", path);
  section.innerHTML = `
    <div class="ats-service-pricing-heading">
      <p>${pricing.eyebrow}</p>
      <h2>Pricing & starting points</h2>
      <span>${pricing.intro}</span>
    </div>
    <div class="ats-service-pricing-grid">
      ${pricing.items
        .map(
          (item) => `<article class="ats-service-price-card"><div><h3>${item.label}</h3><strong>${item.price}</strong></div><p>${item.detail}</p></article>`,
        )
        .join("")}
    </div>
    <div class="ats-service-price-note"><strong>Scope note:</strong> ${pricing.note}</div>
    <div class="ats-service-pricing-actions"><button type="button" class="ats-pricing-primary" data-request>Request a Quote</button><button type="button" class="ats-pricing-secondary" data-all>View All Pricing & Policies</button></div>
  `;
  section.querySelector("[data-request]")?.addEventListener("click", () => navigate("/contact"));
  section.querySelector("[data-all]")?.addEventListener("click", () => navigate(PRICING_PAGE_PATH));
  return section;
}

function organizeServicePricing() {
  const path = normalizePath(window.location.pathname);
  const pricing = SERVICE_PRICING[path];
  if (!pricing || document.querySelector(`[data-ats-service-pricing="${path}"]`)) return;

  let anchorSection;
  if (path === "/services/vendor-coordination") {
    const methodologyHeading = Array.from(document.querySelectorAll("main h2")).find(
      (heading) => heading.textContent?.trim() === "A structured research and coordination process",
    );
    anchorSection = methodologyHeading?.closest("section");
  } else {
    anchorSection = document.querySelector("main h1")?.closest("section");
  }

  if (!anchorSection) return;
  anchorSection.insertAdjacentElement("afterend", makeServicePricingSection(pricing, path));
}

function improveDarkCards() {
  document.querySelectorAll("div.rounded-2xl").forEach((card) => {
    if (card.classList.contains("bg-[#061B33]")) card.classList.add("ats-dark-card");
  });
}

function applyUpdates() {
  if (normalizePath(window.location.pathname) === PRICING_PAGE_PATH) return;
  replaceText();
  organizeHome();
  organizeMenus();
  addPricingNavigation();
  organizeFooter();
  organizeHomePricing();
  organizeServicePricing();
  improveDarkCards();
}

function PricingNavButton({ path, children, active = false }) {
  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${active ? "bg-white/15 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}
    >
      {children}
    </button>
  );
}

function PricingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const title = "Service Pricing | Aloha Technology Services | Hawaiʻi Island";
    const description =
      "View starting prices, recurring service rates, travel charges and service policies for Aloha Technology Services LLC property, handyman, technology, business and digital services on Hawaiʻi Island.";
    const canonicalUrl = `${SITE_URL}${PRICING_PAGE_PATH}`;
    document.title = title;

    const setMeta = (selector, attribute, value, content) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061B33] text-white shadow-lg">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-4 py-2 sm:px-6 lg:px-8">
          <button type="button" onClick={() => navigate("/")} className="flex min-w-0 items-center" aria-label="Return to the Aloha Technology Services LLC homepage">
            <img src={LOGO} alt={COMPANY_NAME} className="h-16 w-auto max-w-[250px] object-contain sm:max-w-[300px]" loading="eager" />
          </button>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            <PricingNavButton path="/">Home</PricingNavButton>
            <PricingNavButton path="/services/property-field-services">Property Field Services</PricingNavButton>
            <PricingNavButton path="/services/home-inspections">Home Inspections</PricingNavButton>
            <PricingNavButton path="/services/vendor-coordination">Vendor Coordination</PricingNavButton>
            <PricingNavButton path={PRICING_PAGE_PATH} active>Pricing</PricingNavButton>
            <PricingNavButton path="/about">About</PricingNavButton>
            <PricingNavButton path="/contact">Contact</PricingNavButton>
            <button type="button" onClick={() => navigate("/contact")} className="inline-flex items-center justify-center rounded-xl bg-[#1268D5] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#0f5bb9]">Book a Service</button>
          </nav>
          <button type="button" className="rounded-lg border border-white/20 p-2 lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation menu">
            <span className="block text-xl leading-none">{mobileOpen ? "×" : "☰"}</span>
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#061B33] lg:hidden">
            <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">
              {[
                ["Home", "/"],
                ["Property Field Services", "/services/property-field-services"],
                ["Home Inspections", "/services/home-inspections"],
                ["Vendor Coordination", "/services/vendor-coordination"],
                ["Pricing & Service Policies", PRICING_PAGE_PATH],
                ["About", "/about"],
                ["Contact / Book a Service", "/contact"],
              ].map(([label, path]) => (
                <button key={label} type="button" onClick={() => navigate(path)} className={`block w-full rounded-xl px-4 py-3 text-left font-semibold ${path === PRICING_PAGE_PATH ? "bg-[#1268D5]" : "bg-white/10"}`}>{label}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] bg-[#061B33] px-7 py-12 text-white shadow-2xl md:px-11 md:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77D7CF]">Transparent service pricing</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">Pricing & Service Policies</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-200">Use these published starting points to understand the likely service level before requesting a quote. Straightforward services have defined prices; complex projects are scoped according to the actual work, location and deliverables.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate("/contact")} className="rounded-xl bg-white px-5 py-3 font-bold text-[#061B33] transition hover:bg-blue-50">Request Service</button>
            <button type="button" onClick={() => navigate("/services/home-inspections")} className="rounded-xl border border-white/25 px-5 py-3 font-bold text-white transition hover:bg-white/10">Home Inspection Pricing</button>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">How pricing works</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33] md:text-4xl">Clear scope before work begins</h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Clear Scope", "ATS defines the requested work and expected deliverables before work begins."],
              ["Upfront Quote", "Fixed-price services are quoted before authorization. Variable work uses the applicable service rate or reserved time block."],
              ["No Surprise Scope Changes", "If conditions materially change the work, ATS pauses and obtains approval before proceeding."],
              ["Transparent Additional Costs", "Applicable travel, materials and third-party costs are disclosed before authorization whenever reasonably known."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#061B33]">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Non-inspection services</p>
              <h2 className="mt-3 text-3xl font-bold text-[#061B33] md:text-4xl">Published starting prices</h2>
              <p className="mt-4 leading-7 text-slate-600">Home Inspections retain their dedicated scope-and-pricing pages. The prices below cover ATS's other service families.</p>
            </div>
            <button type="button" onClick={() => navigate("/services/home-inspections")} className="font-bold text-[#1268D5] hover:underline">View Home Inspection Pricing →</button>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PRICING_SUMMARY.map((item) => (
              <button key={item.path} type="button" onClick={() => navigate(item.path)} className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <h3 className="text-xl font-bold text-[#061B33]">{item.label}</h3>
                <p className="mt-3 text-lg font-black text-[#1268D5]">{item.price}</p>
                <span className="mt-5 block text-sm font-bold text-slate-500 transition group-hover:text-[#1268D5]">View service pricing →</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Hawaiʻi Island service area</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33]">Travel & Mobilization</h2>
            <p className="mt-4 leading-7 text-slate-600">Travel is based on normal one-way road distance from the ATS Waikoloa dispatch point to the service address. One travel charge applies per scheduled site visit, even when multiple ATS services are completed during that visit.</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {TRAVEL_POLICY.map((row, index) => (
              <div key={row.distance} className={`grid gap-2 px-5 py-5 md:grid-cols-[0.7fr_0.45fr_1.85fr] md:items-center ${index ? "border-t border-slate-200" : ""}`}>
                <strong className="text-[#061B33]">{row.distance}</strong>
                <span className="font-black text-[#1268D5]">{row.price}</span>
                <span className="text-sm leading-6 text-slate-600">{row.detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-7 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 p-7 md:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Quotes & assessments</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33]">Use the right level of review</h2>
            <div className="mt-6 space-y-5 text-slate-600">
              <div><h3 className="font-bold text-[#061B33]">Free remote quotes</h3><p className="mt-1 leading-7">Straightforward Handyman and Technology projects can often be quoted from clear photos, videos, measurements, model numbers or product links.</p></div>
              <div><h3 className="font-bold text-[#061B33]">Onsite scope assessment — $75</h3><p className="mt-1 leading-7">Used when a responsible Handyman or Technology quote cannot be prepared remotely. The fee is credited toward qualifying projects of $250+ booked within 30 days.</p></div>
              <div><h3 className="font-bold text-[#061B33]">Professional discovery</h3><p className="mt-1 leading-7">Initial conversations for consulting and digital projects are generally free. Deeper automation, AI or application assessment work may be a paid deliverable because it produces independent analysis and scope definition.</p></div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 p-7 md:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Appointments</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33]">Changes & cancellations</h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              {CANCELLATION_POLICY.map((row, index) => (
                <div key={row.notice} className={`grid gap-2 p-4 sm:grid-cols-[1fr_1fr] ${index ? "border-t border-slate-200" : ""}`}>
                  <strong className="text-sm text-[#061B33]">{row.notice}</strong>
                  <span className="text-sm leading-6 text-slate-600">{row.policy}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">Work already completed, approved third-party expenses, special-order/nonreturnable items and other committed costs remain billable.</p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#061B33] p-7 text-white md:p-10">
          <div className="grid gap-7 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77D7CF]">Materials & external costs</p>
              <h2 className="mt-3 text-3xl font-bold">What public prices include—and what may be additional</h2>
            </div>
            <div className="space-y-4 text-slate-200">
              <p className="leading-7">{GLOBAL_PRICING_NOTES.tax}</p>
              <p className="leading-7">{GLOBAL_PRICING_NOTES.thirdParty}</p>
              <p className="leading-7">{GLOBAL_PRICING_NOTES.procurement}</p>
              <p className="leading-7">{GLOBAL_PRICING_NOTES.correction}</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-gradient-to-r from-[#0B2B4D] to-[#1268D5] px-7 py-11 text-white md:px-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold">Have a project that does not fit neatly into a price card?</h2>
              <p className="mt-4 leading-7 text-blue-100">Send ATS the actual scope, location and desired result. We will identify the appropriate service family and confirm the pricing approach before work begins.</p>
            </div>
            <button type="button" onClick={() => navigate("/contact")} className="shrink-0 rounded-xl bg-white px-5 py-3 font-bold text-[#061B33] transition hover:bg-blue-50">Request a Quote</button>
          </div>
        </section>
      </main>

      <footer className="mt-20 bg-[#061B33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div><img src={LOGO} alt={COMPANY_NAME} className="h-16 w-auto" /><p className="mt-5 max-w-md leading-7 text-slate-300">Locally owned and operated on Hawaiʻi Island. Property expertise, practical technology and dependable local support.</p></div>
            <div><h2 className="font-bold">Company</h2><div className="mt-4 space-y-3">{[["Home", "/"], ["Pricing & Service Policies", PRICING_PAGE_PATH], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => <button key={label} type="button" onClick={() => navigate(path)} className="block text-sm text-slate-300 hover:text-white">{label}</button>)}</div></div>
            <div><h2 className="font-bold">Popular services</h2><div className="mt-4 space-y-3">{[["Property Field Services", "/services/property-field-services"], ["Home Inspections", "/services/home-inspections"], ["Vendor Coordination", "/services/vendor-coordination"], ["Technology Installation", "/services/technology-installation"]].map(([label, path]) => <button key={label} type="button" onClick={() => navigate(path)} className="block text-sm text-slate-300 hover:text-white">{label}</button>)}</div></div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-sm leading-6 text-slate-400">© 2026 {COMPANY_NAME}. Service availability, scope and pricing are confirmed project by project.</div>
        </div>
      </footer>
      <AlohaAssistant onNavigate={navigateFromPageId} />
    </div>
  );
}

export default function AppWithUpdates() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const syncPath = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    if (pathname === PRICING_PAGE_PATH) return undefined;

    let frame = 0;
    const observer = new MutationObserver(() => scheduleUpdate());

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
  }, [pathname]);

  if (pathname === PRICING_PAGE_PATH) return <PricingPage />;
  return <App />;
}
