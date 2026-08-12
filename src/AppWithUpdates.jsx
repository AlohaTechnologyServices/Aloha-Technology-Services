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
  ["Additional capabilities arranged in your preferred order", "Additional specialized services"],
  ["Services in preferred order", "Specialized services"],
  [
    "Detailed residential inspections with photographs, clear priorities and practical recommendations for buyers, sellers and owners.",
    "Detailed residential inspections with photographs, clear classifications, defined limitations and practical recommendations for buyers, sellers and owners.",
  ],
  [
    "Photographs, priorities, limitations and practical recommendations.",
    "Photographs, classifications, limitations and practical recommendations.",
  ],
  [
    "Photographs, priorities, limitations and practical recommendations",
    "Photographs, classifications, limitations and practical recommendations",
  ],
  [
    "The report explains what was observed, why it matters, what could not be inspected and what type of follow-up should be considered.",
    "The report distinguishes serviceable components, maintenance needs, repair concerns, significant conditions, and inspection limitations or specialist referrals.",
  ],
  [
    "Residential inspections are visual and non-invasive reviews of readily accessible components at the time of inspection. They are not warranties, guarantees, destructive investigations, engineering analyses, environmental assessments, licensed pest certifications, appraisals or comprehensive code-compliance inspections. Concealed, inaccessible, shut-down, unsafe or excluded components may not be inspected.",
    "ATS residential inspections are visual, non-invasive reviews of readily accessible conditions present at the time of inspection. Normal user controls may be operated when included in the agreed scope and conditions are safe. Inspections do not include destructive testing, repairs, electrical panel dead-front or service-cover removal, engineering capacity determinations, comprehensive code certification, pest-species or infestation identification, environmental or mold certification, laboratory water-quality certification, or specialist testing unless separately performed by an appropriately qualified professional. Concealed, inaccessible, shut-down, unsafe, or excluded components are documented as limitations.",
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
      "The observation relates to routine maintenance, a manageable repair, a potential do-it-yourself item, or a recommended upgrade. These conditions generally do not represent an immediate safety concern or significant functional failure; however, prolonged neglect may contribute to deterioration, reduced performance, or progression to a Yellow or Red condition. Refer to the individual observation for recommended action and timing.",
  },
  {
    key: "yellow",
    title: "Yellow — Repair / Evaluate",
    text:
      "The system or component was not operating as intended, showed a material defect, or presented a condition warranting timely attention. If left unaddressed, the concern may contribute to property damage, reduced performance, or an unreasonable risk to people or property. Further evaluation by an appropriately qualified professional may be recommended.",
  },
  {
    key: "red",
    title: "Red — Significant / Prompt Action",
    text:
      "The observation identifies a significant defect, active or developing damage, substantial system or component failure, or a condition that may pose a meaningful risk to people or property. Prompt evaluation and corrective action by the appropriately qualified professional are recommended.",
  },
  {
    key: "gray",
    title: "Gray — Limitation / Referral",
    text:
      "A system, component, or area could not be fully inspected because it was inaccessible, concealed, obstructed, shut down, unsafe to operate, outside the agreed scope, or otherwise restricted. Gray may also identify an observation requiring evaluation by an appropriately qualified specialist. A limitation or referral does not, by itself, indicate that the component is defective.",
  },
];

const SINGLE_FAMILY_RATES = [
  ["Up to 1,000 sq. ft.", "$450"],
  ["1,001–1,200 sq. ft.", "$500"],
  ["1,201–2,000 sq. ft.", "$550"],
  ["2,001–2,500 sq. ft.", "$650"],
  ["2,501–3,000 sq. ft.", "$825"],
  ["Over 3,000 sq. ft.", "Please request an estimate"],
];

const CONDO_RATES = [
  ["Up to 700 sq. ft.", "$350"],
  ["701–1,200 sq. ft.", "$400"],
  ["1,201–1,500 sq. ft.", "$500"],
  ["Over 1,500 sq. ft.", "$600"],
];

const MAINTENANCE_SINGLE_FAMILY_RATES = [
  ["Up to 1,000 sq. ft.", "$400"],
  ["1,001–1,200 sq. ft.", "$450"],
  ["1,201–2,000 sq. ft.", "$500"],
  ["2,001–2,500 sq. ft.", "$600"],
  ["2,501–3,000 sq. ft.", "$750"],
  ["Over 3,000 sq. ft.", "Please request an estimate"],
];

const MAINTENANCE_CONDO_RATES = [
  ["Up to 700 sq. ft.", "$325"],
  ["701–1,200 sq. ft.", "$375"],
  ["1,201–1,500 sq. ft.", "$450"],
  ["Over 1,500 sq. ft.", "$550"],
];

const NEW_CONSTRUCTION_SINGLE_FAMILY_RATES = [
  ["Up to 1,000 sq. ft.", "$500"],
  ["1,001–1,200 sq. ft.", "$550"],
  ["1,201–2,000 sq. ft.", "$625"],
  ["2,001–2,500 sq. ft.", "$725"],
  ["2,501–3,000 sq. ft.", "$925"],
  ["Over 3,000 sq. ft.", "Please request an estimate"],
];

const NEW_CONSTRUCTION_CONDO_RATES = [
  ["Up to 700 sq. ft.", "$400"],
  ["701–1,200 sq. ft.", "$450"],
  ["1,201–1,500 sq. ft.", "$550"],
  ["Over 1,500 sq. ft.", "$675"],
];

const INSPECTION_DETAILS = {
  "Full Residential Home Inspection": {
    id: "full-residential",
    bestFor: "Buyers, sellers and homeowners who want the broadest residential inspection scope.",
    scope: [
      "Site conditions, grading, drainage, vegetation clearances, walking surfaces and readily visible site concerns",
      "Foundation and readily accessible structural components, including visible framing, supports, crawlspaces and attics",
      "Roof coverings, drainage components, flashings, penetrations and accessible roof-related conditions",
      "Exterior walls, cladding, windows, doors, lanais, decks, stairs, guards and readily visible weather-resistance conditions",
      "Plumbing supply, drainage, fixtures, water heating and accessible water-system components",
      "Closed-cover visual review of accessible electrical service equipment, branch-system components, receptacles, switches, lighting and normal user-level safety devices",
      "Cooling, ventilation, condensate management and accessible HVAC components",
      "Accessible propane or fuel-gas components and appliance interfaces when present",
      "Interior rooms, kitchen, bathrooms, laundry, garage and included built-in appliances",
      "Supplemental thermal imaging and moisture measurements when useful and appropriate, with photographic documentation of material findings and limitations",
    ],
    boundaries: [
      "No destructive testing, repair work or dismantling of equipment",
      "No electrical panel dead-front or service-cover removal",
      "No engineering analysis, structural-capacity determination or comprehensive code certification",
      "No pest-species or infestation certification, mold identification, environmental sampling or laboratory water-quality certification",
      "Dedicated operational inspections of pools/spas and irrigation systems are separate services unless specifically added to the inspection agreement",
    ],
    deliverable: "A client-friendly photographic report documenting observed conditions, material limitations, recommended support or referral actions, and ATS’s Blue / Green / Yellow / Red / Gray classification system.",
    pricing: [
      { title: "Single-Family Homes", rows: SINGLE_FAMILY_RATES },
      { title: "Condominiums", rows: CONDO_RATES },
    ],
    pricingNotes: [
      "Total inspected square footage includes garages, lanais and other areas included in the agreed inspection scope. Square footage is subject to site verification.",
      "Townhomes and condominium units with air-conditioning systems are priced using the applicable single-family-home schedule.",
    ],
  },
  "Buyer’s Home Inspection": {
    id: "buyer",
    bestFor: "Prospective buyers during an inspection, due-diligence or contingency period.",
    scope: [
      "The applicable Full Residential or Condo/Townhome physical inspection scope",
      "Material repair and evaluation concerns, maintenance considerations and safety-related observations",
      "Areas requiring specialist follow-up and components that were inaccessible or non-operational",
      "Documents or information that may warrant additional review",
      "Near-term ownership and maintenance planning, including buyer-reported concerns provided before or during the inspection",
    ],
    boundaries: [
      "No appraisal, property valuation or repair-cost estimate",
      "No negotiation strategy, legal opinion or seller-disclosure interpretation",
      "No recommendation regarding whether the client should purchase the property",
      "Physical findings remain within the same visual, non-invasive scope boundaries as the applicable residential inspection",
    ],
    deliverable: "A detailed inspection report plus buyer-focused organization of observations, limitations, recommended referrals and appropriate follow-up, without assigning repair costs or negotiating terms.",
    pricing: [
      { title: "Single-Family Homes", rows: SINGLE_FAMILY_RATES },
      { title: "Condominiums", rows: CONDO_RATES },
    ],
    pricingNotes: [
      "Buyer inspections use the applicable Full Residential or Condo/Townhome rate based on property type and total inspected area.",
      "Townhomes and condominium units with air-conditioning systems are priced using the applicable single-family-home schedule.",
    ],
  },
  "Pre-Listing Home Inspection": {
    id: "pre-listing",
    bestFor: "Owners who want to better understand visible property conditions before listing the home for sale.",
    scope: [
      "The applicable Full Residential or Condo/Townhome physical inspection scope",
      "Visible conditions that could warrant repair or further evaluation",
      "Deferred maintenance and specialist-referral needs",
      "Non-operational or inaccessible components and useful repair or service documentation",
      "Seller-oriented preparation planning without duplicating physical findings already documented in the technical sections",
    ],
    boundaries: [
      "No seller-disclosure or legal advice",
      "No appraisal, property valuation, pricing strategy or marketability opinion",
      "No prediction of buyer reactions or negotiation recommendations",
      "Physical findings remain within the same visual, non-invasive scope boundaries as the applicable residential inspection",
    ],
    deliverable: "A seller-focused condition report that helps the owner organize observed conditions, maintenance, repairs, documentation and specialist follow-up before marketing the property.",
    pricing: [
      { title: "Single-Family Homes", rows: SINGLE_FAMILY_RATES },
      { title: "Condominiums", rows: CONDO_RATES },
    ],
    pricingNotes: [
      "Pre-listing inspections use the applicable Full Residential or Condo/Townhome rate based on property type and total inspected area.",
      "Townhomes and condominium units with air-conditioning systems are priced using the applicable single-family-home schedule.",
    ],
  },
  "Home Maintenance Inspection": {
    id: "maintenance",
    bestFor: "Current homeowners, second-home owners and clients establishing or updating a long-term maintenance plan.",
    scope: [
      "Visible deterioration, deferred maintenance and developing conditions",
      "Water-management, drainage, exterior coating, sealant and weather-exposure conditions",
      "Corrosion, salt-related deterioration, ventilation and moisture-management concerns",
      "Accessible structural, building-envelope, plumbing, electrical, cooling and other installed-system observations",
      "Components that should be serviced, repaired, monitored or further evaluated",
      "Baseline photography where useful for future comparison and practical recurring or near-term maintenance planning",
    ],
    boundaries: [
      "No guarantee of remaining service life or future performance",
      "No repair work is performed as part of the inspection",
      "The inspection does not create an ongoing property-management, caretaking or maintenance responsibility",
      "Regulated repair or specialist work is referred to the appropriately qualified professional",
    ],
    deliverable: "A maintenance-oriented photographic report organized by classification, recommended timing and practical next actions so the owner can build a property-care plan.",
    pricing: [
      { title: "Single-Family Home Maintenance", rows: MAINTENANCE_SINGLE_FAMILY_RATES },
      { title: "Condominium Maintenance", rows: MAINTENANCE_CONDO_RATES },
    ],
    pricingNotes: [
      "Total inspected square footage includes garages, lanais and other areas included in the agreed inspection scope. Square footage is subject to site verification.",
      "Townhomes and condominium units with air-conditioning systems are priced using the applicable single-family maintenance schedule.",
    ],
  },
  "Condo and Townhome Inspection": {
    id: "condo-townhome",
    bestFor: "Condominium and townhome buyers, sellers and owners.",
    scope: [
      "Interior ceilings, walls, floors, doors and windows within the inspected unit",
      "Unit plumbing fixtures and accessible supply and drainage components",
      "Unit electrical components using closed-cover and normal user-level inspection methods",
      "Cooling and ventilation equipment serving the unit",
      "Kitchen, bathrooms, laundry areas and included built-in appliances",
      "Included lanais, balconies, garages, storage areas and other exclusive-use spaces",
      "Visible building-envelope conditions affecting the unit and readily visible interfaces with shared or association-controlled systems",
    ],
    boundaries: [
      "Broad site conditions, foundations, roofs, building-wide systems and association-controlled common elements are not represented as inspected unless specifically included, readily accessible and within the agreed scope",
      "ATS does not interpret condominium declarations, bylaws or legal maintenance responsibility between the owner and association",
      "No representation is made that concealed or inaccessible shared systems were inspected",
    ],
    deliverable: "A unit-focused photographic report distinguishing inspected components from visible conditions that may require association documents, management confirmation or specialist evaluation.",
    pricing: [{ title: "Condominiums", rows: CONDO_RATES }],
    pricingNotes: [
      "Total inspected square footage includes garages, lanais and other areas included in the agreed inspection scope. Square footage is subject to site verification.",
      "Townhomes and condominium units with air-conditioning systems are priced using the applicable single-family-home schedule.",
    ],
  },
  "New Construction Home Inspection": {
    id: "new-construction",
    bestFor: "New-construction buyers, owners approaching final acceptance, and homeowners approaching a builder-warranty milestone.",
    scope: [
      "Applicable installed and readily accessible systems and components included in a residential inspection",
      "Visible completion, workmanship, finish and installation concerns",
      "Incomplete or damaged finishes and accessible installed-system operation using normal user controls",
      "Doors, windows, cabinets, fixtures, site and drainage conditions where accessible",
      "Visible roof, exterior, attic, interior, plumbing, electrical and mechanical conditions",
      "Completion-readiness observations, photographic punch-list documentation and owner-reported warranty concerns when applicable",
    ],
    boundaries: [
      "Not a municipal building inspection or code-compliance certification",
      "Not architectural, engineering, plan/specification-compliance or concealed-work verification",
      "Does not certify contractor workmanship or replace the builder’s quality-control and warranty obligations",
    ],
    deliverable: "A photographic report of visible installed conditions, incomplete or concerning items, limitations and appropriate referrals for discussion with the builder or qualified professional.",
    pricing: [
      { title: "Single-Family New Construction", rows: NEW_CONSTRUCTION_SINGLE_FAMILY_RATES },
      { title: "New Construction Condominiums", rows: NEW_CONSTRUCTION_CONDO_RATES },
    ],
    pricingNotes: [
      "Pricing applies to final/pre-acceptance or warranty-stage visual inspections of installed, readily accessible conditions.",
      "Townhomes and condominium units with air-conditioning systems are priced using the applicable single-family new-construction schedule.",
    ],
  },
  "Repair Verification and Reinspection": {
    id: "reinspection",
    bestFor: "Clients seeking documented follow-up after specified repairs or specialist work.",
    scope: [
      "Review of the original finding or specifically agreed repair item",
      "Visual inspection of the accessible repaired area and comparison with prior photographs or report information",
      "Normal user-level operation where appropriate, included and safe",
      "Photographic documentation of the current condition",
      "Identification of items that appear addressed, partially addressed, unchanged, inaccessible or not verifiable",
      "Referral back to the repairing professional when certification or additional diagnosis is appropriate",
    ],
    boundaries: [
      "A reinspection is not a new whole-home inspection unless separately contracted",
      "No certification of concealed work, contractor workmanship, code compliance, permit closeout or future durability",
      "Unrelated systems are outside scope unless specifically added to the written agreement",
    ],
    deliverable: "A focused photographic reinspection report describing the visible status of the agreed items at the return visit and any limitations or recommended follow-up.",
    pricing: [{
      title: "Repair Verification / Reinspection",
      rows: [
        ["1–5 items", "$175"],
        ["6–10 items", "$225"],
        ["11–20 items", "$300"],
        ["More than 20 items or complex reinspection", "Please request an estimate"],
      ],
    }],
    pricingNotes: ["Pricing may be adjusted when extensive third-party documentation, multiple inaccessible locations or unusually complex systems require additional review."],
  },
  "Moisture and Water-Intrusion Inspection": {
    id: "moisture",
    bestFor: "Leaks, staining, musty conditions, post-storm concerns, previous water events or unexplained moisture indicators.",
    scope: [
      "Review of reported conditions and available history",
      "Visual inspection of the affected area and related building components",
      "Moisture-meter measurements at representative and comparison locations",
      "Thermal imaging under conditions where it may provide useful supplemental information",
      "Moisture-pattern mapping and review of readily visible roof, exterior, plumbing, drainage, condensate or other possible source pathways",
      "Correlation of observations between adjacent surfaces or spaces, with photographs of visible conditions and material instrument readings",
    ],
    boundaries: [
      "Thermal imaging does not see through walls and does not independently establish the presence of moisture",
      "Moisture readings are screening and documentation tools rather than certification of concealed conditions",
      "No mold-species identification, indoor-air-quality certification, environmental sampling or destructive leak testing",
      "The inspection does not guarantee the exact concealed source or full extent of damage",
    ],
    deliverable: "A targeted photographic report documenting observed anomalies, readings, source-correlation observations, limitations and recommended specialist follow-up.",
    pricing: [{
      title: "Moisture / Water-Intrusion",
      rows: [
        ["Localized investigation — one primary concern/area", "$250"],
        ["Multi-area investigation — several related areas", "$350"],
        ["Complex or whole-property source-correlation investigation", "Starting at $450"],
        ["Targeted add-on during a qualifying residential inspection", "Starting at $150"],
      ],
    }],
  },
  "Irrigation System Inspection": {
    id: "irrigation",
    bestFor: "Properties with irrigation systems, high water use, dry zones, overspray, visible leakage, aging components or irrigation-related drainage concerns.",
    scope: [
      "Accessible controller and normal operating settings",
      "Visible source and shutoff context",
      "Operation of accessible irrigation zones when safe and practical",
      "Sprinkler heads, drip emitters, accessible valves, filters and other visible components",
      "Visible leakage, damaged components, obvious coverage deficiencies and overspray",
      "Runoff, ponding, erosion and irrigation-related water contact with the building",
      "Photographic documentation of reportable conditions",
    ],
    boundaries: [
      "No backflow-prevention certification",
      "No buried-pipe or valve locating, pressure testing or design-flow calculation",
      "No water-quality certification or landscape-design adequacy certification",
      "No irrigation repair or adjustment service is performed as part of the inspection",
    ],
    deliverable: "An irrigation condition report documenting representative operation, visible component conditions, property impacts, limitations and recommended follow-up.",
    pricing: [{
      title: "Irrigation Systems",
      rows: [
        ["Up to 6 zones", "$200"],
        ["7–12 zones", "$275"],
        ["13–18 zones", "$350"],
        ["More than 18 zones, large acreage or complex systems", "Please request an estimate"],
        ["Add-on to a qualifying residential inspection — up to 6 zones", "Starting at $150"],
      ],
    }],
  },
  "Pool/Spa and Equipment Inspection": {
    id: "pool-spa",
    bestFor: "Properties with a swimming pool, spa or combined pool/spa system.",
    scope: [
      "Readily visible pool/spa barriers, gates and safety-related conditions",
      "Deck, coping, surrounding walking surfaces and visible drainage conditions",
      "Accessible shell, finish, waterline and visible surface conditions",
      "Pumps, filters, accessible circulation equipment and visible piping under normal user-level operation",
      "Heater and treatment-system controls using normal user interfaces when appropriate",
      "Visible electrical and bonding interfaces without opening electrical or service equipment",
      "Accessible spa-specific components, visible leakage, corrosion, deterioration and equipment-area conditions",
      "Thermal imaging when it provides useful supplemental information, with photographic documentation of reportable conditions",
    ],
    boundaries: [
      "No electrical-panel or service-cover removal or equipotential-bonding certification",
      "No gas-pressure, combustion or leak certification",
      "No structural engineering, water-chemistry certification, suction/entrapment certification or pressure testing",
      "No concealed leak location or comprehensive code-compliance certification",
    ],
    deliverable: "A pool/spa condition report with photographs, visible safety and equipment observations, limitations, classifications and recommended specialist follow-up.",
    pricing: [{
      title: "Pool & Spa",
      rows: [
        ["Pool & Spa", "$200"],
        ["Pool Only", "$150"],
        ["Spa Only", "$50"],
      ],
    }],
    pricingNotes: ["Unusually complex equipment systems, multiple pools/spas, extensive water features or commercial-style equipment may require a custom quote."],
  },
  "Custom Arrival and Departure Inspections": {
    id: "arrival-departure",
    bestFor: "Second homes, periodically occupied residences and owner-managed vacation-rental properties requiring consistent condition documentation.",
    scope: [
      "Arrival or departure access condition and exterior condition views",
      "Room-by-room photographic documentation",
      "Owner-designated furnishings, inventory, appliances and equipment",
      "Normal user-level operation of specifically authorized items",
      "Pool/spa or other amenity condition documentation when included in the written checklist",
      "Owner-authorized utility or control settings",
      "Visible damage, missing items, unexpected conditions and prompt notification of material visible concerns",
      "Safety and closeout observations defined in the agreed checklist",
    ],
    boundaries: [
      "This is a condition-documentation service, not a comprehensive technical home inspection",
      "No property management, leasing, guest or tenant administration, rent handling or housekeeping certification",
      "ATS does not determine responsibility for damage or make tenancy, rental or owner-management decisions",
    ],
    deliverable: "A dated photographic condition record tailored to the owner-approved checklist, documenting the agreed areas, items, visible conditions and exceptions.",
    pricingCustom: true,
    pricingFactors: [
      "Total inspected square footage",
      "Number of rooms, separate areas and accessory spaces",
      "Quantity of furnishings or inventory requiring documentation",
      "Number of appliances or equipment items requiring user-level checks",
      "Pool, spa and other amenities",
      "Exterior areas and accessory structures",
      "Required number and detail of photographs",
      "Checklist complexity, reporting requirements and requested inspection frequency",
    ],
  },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderRateTable(block) {
  return `
    <div class="ats-rate-table-wrap">
      <h4>${escapeHtml(block.title)}</h4>
      <div class="ats-rate-table" role="table" aria-label="${escapeHtml(block.title)} pricing">
        ${block.rows.map(([label, price]) => `
          <div class="ats-rate-row" role="row">
            <span role="cell">${escapeHtml(label)}</span>
            <strong role="cell">${escapeHtml(price)}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderPricing(data) {
  const taxNotice = `<div class="ats-get-notice"><strong>Hawaiʻi General Excise Tax (GET) of 4.7120% is applied to all rates.</strong></div>`;

  if (data.pricingCustom) {
    return `
      <section class="ats-inspection-pricing" data-ats-inspection-pricing>
        <div class="ats-detail-heading-row">
          <span class="ats-detail-kicker">Pricing</span>
          <h3>Custom quote based on the requested inspection scope</h3>
        </div>
        ${taxNotice}
        <p class="ats-pricing-intro">Each client receives a defined scope and per-visit price before service begins. Pricing considers:</p>
        <div class="ats-pricing-factors">
          ${data.pricingFactors.map((item) => `<div><span aria-hidden="true">✓</span><p>${escapeHtml(item)}</p></div>`).join("")}
        </div>
      </section>
    `;
  }

  return `
    <section class="ats-inspection-pricing" data-ats-inspection-pricing>
      <div class="ats-detail-heading-row">
        <span class="ats-detail-kicker">Pricing</span>
        <h3>Inspection rates</h3>
      </div>
      ${taxNotice}
      <div class="ats-rate-grid">
        ${(data.pricing || []).map(renderRateTable).join("")}
      </div>
      ${(data.pricingNotes || []).length ? `<div class="ats-pricing-notes">${data.pricingNotes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")}</div>` : ""}
    </section>
  `;
}

function replaceOutdatedWording() {
  const elements = document.querySelectorAll("h1, h2, h3, p, span");

  elements.forEach((element) => {
    if (element.childElementCount > 0) return;
    const currentText = element.textContent?.trim();
    const replacement = TEXT_REPLACEMENTS.get(currentText);
    if (replacement && currentText !== replacement) element.textContent = replacement;
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
  const menuButtons = Array.from(menuGrid.children).filter((element) => element.tagName === "BUTTON");
  const rowCount = Math.ceil(menuButtons.length / 2);
  menuGrid.style.setProperty("--ats-menu-rows", String(rowCount));

  menuButtons.forEach((button) => {
    const marker = button.querySelector(":scope > span:first-child");
    if (!marker) return;
    if (/^\d+$/.test(marker.textContent?.trim() || "")) marker.textContent = "›";
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
    if (/^\d+\.$/.test(marker.textContent?.trim() || "")) marker.textContent = "›";
    marker.classList.add("ats-mobile-service-marker");
  });
}

function improveCardContrast() {
  document.querySelectorAll("div.rounded-2xl").forEach((card) => {
    if (card.classList.contains("bg-[#061B33]")) card.classList.add("ats-dark-card");
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
    grid.dataset.atsClassificationVersion === "3" &&
    existingTitles.length === INSPECTION_CLASSIFICATIONS.length &&
    existingTitles[0] === INSPECTION_CLASSIFICATIONS[0].title;

  grid.classList.add("ats-classification-grid");
  if (alreadyUpdated) return;

  grid.dataset.atsClassificationVersion = "3";
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

function updateInspectionServicesIntro() {
  const sectionHeading = Array.from(document.querySelectorAll("section h2")).find(
    (heading) => heading.textContent?.trim() === "Choose the inspection that matches the decision you need to make",
  );
  const section = sectionHeading?.closest("section");
  if (!section || section.querySelector("[data-ats-pricing-intro]")) return;

  const intro = document.createElement("div");
  intro.dataset.atsPricingIntro = "true";
  intro.className = "ats-pricing-intro-panel";
  intro.innerHTML = `
    <div>
      <span class="ats-detail-kicker">Scope & pricing</span>
      <h3>Clear expectations before the inspection begins</h3>
      <p>Each service below has a defined visual, non-invasive scope aligned with the ATS Inspector workflow. Select an inspection to review what is included, important scope boundaries, the report deliverable and applicable pricing.</p>
    </div>
    <div class="ats-get-notice"><strong>Hawaiʻi General Excise Tax (GET) of 4.7120% is applied to all rates.</strong></div>
  `;

  const grid = Array.from(section.children).find(
    (element) => element instanceof HTMLElement && element.classList.contains("grid"),
  );
  if (grid) grid.insertAdjacentElement("beforebegin", intro);
}

function updateInspectionDetail() {
  const detail = document.getElementById("inspection-detail");
  if (!detail) return;

  const title = detail.querySelector("h2")?.textContent?.trim();
  const data = INSPECTION_DETAILS[title];
  if (!data) return;

  const bestForLabel = Array.from(detail.querySelectorAll("p")).find((p) => p.textContent?.trim() === "Best for");
  const bestForCard = bestForLabel?.parentElement;
  const bestForText = bestForCard?.querySelector("p:last-child");
  if (bestForText && bestForText.textContent?.trim() !== data.bestFor) bestForText.textContent = data.bestFor;

  const typicalHeading = Array.from(detail.querySelectorAll("h3")).find((h) => h.textContent?.trim() === "Typical scope" || h.textContent?.trim() === "Scope of work");
  const scopeSection = typicalHeading?.parentElement;
  if (scopeSection && scopeSection.dataset.atsInspectionId !== data.id) {
    scopeSection.dataset.atsInspectionId = data.id;
    scopeSection.classList.add("ats-scope-section");
    scopeSection.innerHTML = `
      <div class="ats-detail-heading-row">
        <span class="ats-detail-kicker">Scope of work</span>
        <h3>What is normally reviewed</h3>
      </div>
      <div class="ats-scope-list">
        ${data.scope.map((item) => `<div><span aria-hidden="true">✓</span><p>${escapeHtml(item)}</p></div>`).join("")}
      </div>
    `;
  }

  let boundaries = detail.querySelector("[data-ats-scope-boundaries]");
  if (!boundaries) {
    boundaries = document.createElement("section");
    boundaries.dataset.atsScopeBoundaries = "true";
    scopeSection?.insertAdjacentElement("afterend", boundaries);
  }
  if (boundaries && boundaries.dataset.atsInspectionId !== data.id) {
    boundaries.dataset.atsInspectionId = data.id;
    boundaries.className = "ats-scope-boundaries";
    boundaries.innerHTML = `
      <div class="ats-detail-heading-row">
        <span class="ats-detail-kicker">Scope boundaries</span>
        <h3>What this inspection does not represent</h3>
      </div>
      <div class="ats-boundary-list">
        ${data.boundaries.map((item) => `<div><span aria-hidden="true">—</span><p>${escapeHtml(item)}</p></div>`).join("")}
      </div>
    `;
  }

  const receiveLabel = Array.from(detail.querySelectorAll("p")).find((p) => p.textContent?.trim() === "What you receive");
  const receiveCard = receiveLabel?.parentElement;
  const receiveText = receiveCard?.querySelector("p:last-child");
  if (receiveText && receiveText.textContent?.trim() !== data.deliverable) receiveText.textContent = data.deliverable;

  let pricing = detail.querySelector("[data-ats-inspection-pricing]");
  if (!pricing) {
    const holder = document.createElement("div");
    holder.innerHTML = renderPricing(data);
    pricing = holder.firstElementChild;
    if (receiveCard) receiveCard.insertAdjacentElement("afterend", pricing);
    else boundaries?.insertAdjacentElement("afterend", pricing);
  } else if (pricing.dataset.atsInspectionId !== data.id) {
    const holder = document.createElement("div");
    holder.innerHTML = renderPricing(data);
    const replacement = holder.firstElementChild;
    pricing.replaceWith(replacement);
    pricing = replacement;
  }
  if (pricing) pricing.dataset.atsInspectionId = data.id;
}

function applyWebsiteUpdates() {
  replaceOutdatedWording();
  updateDesktopServicesMenu();
  updateMobileServicesMenu();
  improveCardContrast();
  updateInspectionClassificationSection();
  updateInspectionServicesIntro();
  updateInspectionDetail();
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
