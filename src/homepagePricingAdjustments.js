import { PRICING_SUMMARY } from "./pricingData";

const HOME_INSPECTIONS_SUMMARY = {
  label: "Home Inspections",
  price: "From $350 condo / $450 home",
  path: "/services/home-inspections",
};

const ALL_SERVICE_PRICING = [HOME_INSPECTIONS_SUMMARY, ...PRICING_SUMMARY];

function normalizePath(pathname = window.location.pathname) {
  const normalized = pathname.replace(/\/$/, "");
  return normalized || "/";
}

function navigate(path) {
  const nextPath = normalizePath(path);
  if (normalizePath() !== nextPath) {
    window.history.pushState({ path: nextPath }, "", nextPath);
  }
  window.dispatchEvent(new PopStateEvent("popstate", { state: { path: nextPath } }));
}

function removeHomepagePricingOutsideHome() {
  if (normalizePath() === "/") return;
  document.querySelectorAll('[data-ats-home-pricing="true"]').forEach((section) => section.remove());
}

function renderAllHomepagePricing() {
  if (normalizePath() !== "/") return;

  const main = document.querySelector("main");
  const section = main?.querySelector('[data-ats-home-pricing="true"]');
  const grid = section?.querySelector(".ats-home-pricing-grid");
  if (!main || !section || !grid) return;

  const intro = section.querySelector(".ats-home-pricing-heading > span");
  if (intro) {
    intro.textContent =
      "Scroll through published starting prices for all ATS service families. Select a service for detailed scope, pricing and quote information.";
  }

  if (grid.getAttribute("data-ats-all-pricing") !== "true") {
    grid.innerHTML = ALL_SERVICE_PRICING.map(
      (item) => `
        <button type="button" class="ats-home-price-card" data-all-service-path="${item.path}">
          <span>${item.label}</span>
          <strong>${item.price}</strong>
          <small>${item.path === "/services/home-inspections" ? "View inspection services & pricing →" : "View service pricing →"}</small>
        </button>
      `,
    ).join("");
    grid.setAttribute("data-ats-all-pricing", "true");
    grid.setAttribute("aria-label", "Scrollable ATS service pricing");

    grid.querySelectorAll("[data-all-service-path]").forEach((button) => {
      button.addEventListener("click", () => navigate(button.getAttribute("data-all-service-path")));
    });
  }

  if (main.lastElementChild !== section) main.appendChild(section);
}

function updatePricingPage() {
  if (normalizePath() !== "/pricing") return;

  Array.from(document.querySelectorAll("button, a")).forEach((element) => {
    const text = element.textContent?.trim();
    if (text === "Home Inspection Pricing" || text === "View Home Inspection Pricing →") {
      element.remove();
    }
  });

  Array.from(document.querySelectorAll("p")).forEach((paragraph) => {
    const text = paragraph.textContent?.trim();
    if (text === "Non-inspection services") {
      paragraph.textContent = "All service pricing";
    }
    if (text === "Home Inspections retain their dedicated scope-and-pricing pages. The prices below cover ATS's other service families.") {
      paragraph.textContent =
        "Published starting prices below cover ATS service families, including Home Inspections. Select any category for complete scope, pricing details and quote information.";
    }
  });

  const heading = Array.from(document.querySelectorAll("h2")).find(
    (element) => element.textContent?.trim() === "Published starting prices",
  );
  const section = heading?.closest("section");
  const grid = section?.querySelector("div.mt-9.grid");
  if (!grid || grid.querySelector('[data-ats-inspection-summary="true"]')) return;

  const firstCard = grid.querySelector("button");
  const card = document.createElement("button");
  card.type = "button";
  card.className =
    firstCard?.className ||
    "group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg";
  card.setAttribute("data-ats-inspection-summary", "true");
  card.innerHTML = `
    <h3 class="text-xl font-bold text-[#061B33]">Home Inspections</h3>
    <p class="mt-3 text-lg font-black text-[#1268D5]">From $350 condo / $450 home</p>
    <p class="mt-3 text-sm leading-6 text-slate-600">Maintenance inspections start at $325 condo / $400 home. Repair verification starts at $175. Specialty inspection pricing varies by service.</p>
    <span class="mt-5 block text-sm font-bold text-slate-500 transition group-hover:text-[#1268D5]">View inspection services & pricing →</span>
  `;
  card.addEventListener("click", () => navigate("/services/home-inspections"));
  grid.insertBefore(card, grid.firstChild);
}

function applyPricingAdjustments() {
  removeHomepagePricingOutsideHome();
  renderAllHomepagePricing();
  updatePricingPage();
}

let scheduledFrame = 0;
function scheduleAdjustments() {
  if (scheduledFrame) return;
  scheduledFrame = window.requestAnimationFrame(() => {
    scheduledFrame = 0;
    applyPricingAdjustments();
  });
}

const observer = new MutationObserver(scheduleAdjustments);

function startObserver() {
  if (!document.body) return;
  observer.observe(document.body, { childList: true, subtree: true });
  scheduleAdjustments();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startObserver, { once: true });
} else {
  startObserver();
}

window.addEventListener("popstate", scheduleAdjustments);
