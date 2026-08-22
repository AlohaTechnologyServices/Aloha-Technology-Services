import { HOMEPAGE_PRICING } from "./pricingData";

const HOME_INSPECTIONS_CARD = {
  title: "Home Inspections",
  price: "View inspection services & pricing",
  path: "/services/home-inspections",
};

if (!HOMEPAGE_PRICING.some((item) => item.path === HOME_INSPECTIONS_CARD.path)) {
  HOMEPAGE_PRICING.splice(1, 0, HOME_INSPECTIONS_CARD);
}

function moveHomepagePricingToBottom() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path !== "/") return;

  const main = document.querySelector("main");
  const pricing = main?.querySelector('[data-ats-home-pricing="true"]');
  if (!main || !pricing || main.lastElementChild === pricing) return;

  main.appendChild(pricing);
}

let scheduledFrame = 0;

function scheduleMove() {
  if (scheduledFrame) return;
  scheduledFrame = window.requestAnimationFrame(() => {
    scheduledFrame = 0;
    moveHomepagePricingToBottom();
  });
}

const observer = new MutationObserver(scheduleMove);

function startObserver() {
  if (!document.body) return;
  observer.observe(document.body, { childList: true, subtree: true });
  scheduleMove();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startObserver, { once: true });
} else {
  startObserver();
}

window.addEventListener("popstate", scheduleMove);
