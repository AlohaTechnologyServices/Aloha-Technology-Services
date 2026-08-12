const SCOPE_BOUNDARY_REPLACEMENTS = new Map([
  ["No destructive testing, repair work or dismantling of equipment", "Not a destructive inspection, repair service, or dismantling of equipment."],
  ["No electrical panel dead-front or service-cover removal", "Not an inspection that removes electrical panel dead fronts or equipment service covers."],
  ["No engineering analysis, structural-capacity determination or comprehensive code certification", "Not an engineering analysis, structural-capacity determination, or comprehensive code-compliance certification."],
  ["No pest-species or infestation certification, mold identification, environmental sampling or laboratory water-quality certification", "Not a pest-species or infestation certification, mold assessment, environmental sampling service, or laboratory water-quality certification."],
  ["Dedicated operational inspections of pools/spas and irrigation systems are separate services unless specifically added to the inspection agreement", "Not a dedicated operational pool/spa or irrigation inspection unless that service is specifically added to the inspection agreement."],
  ["No appraisal, property valuation or repair-cost estimate", "Not an appraisal, property valuation, or repair-cost estimate."],
  ["No negotiation strategy, legal opinion or seller-disclosure interpretation", "Not a negotiation strategy, legal opinion, or seller-disclosure interpretation."],
  ["No recommendation regarding whether the client should purchase the property", "Not a recommendation about whether the client should purchase the property."],
  ["Physical findings remain within the same visual, non-invasive scope boundaries as the applicable residential inspection", "Not an expansion beyond the visual, non-invasive scope boundaries of the applicable residential inspection."],
  ["No seller-disclosure or legal advice", "Not legal or seller-disclosure advice."],
  ["No appraisal, property valuation, pricing strategy or marketability opinion", "Not an appraisal, property valuation, pricing strategy, or marketability opinion."],
  ["No prediction of buyer reactions or negotiation recommendations", "Not a prediction of buyer reactions or a negotiation recommendation."],
  ["No guarantee of remaining service life or future performance", "Not a guarantee of remaining service life or future performance."],
  ["No repair work is performed as part of the inspection", "Not a repair or maintenance service; corrective work is not performed as part of the inspection."],
  ["The inspection does not create an ongoing property-management, caretaking or maintenance responsibility", "Not an ongoing property-management, caretaking, or maintenance service."],
  ["Regulated repair or specialist work is referred to the appropriately qualified professional", "Not a substitute for appropriately licensed repair or specialist services when those services are required."],
  ["Broad site conditions, foundations, roofs, building-wide systems and association-controlled common elements are not represented as inspected unless specifically included, readily accessible and within the agreed scope", "Not a broad inspection of site conditions, foundations, roofs, building-wide systems, or association-controlled common elements unless specifically included, readily accessible, and within the agreed scope."],
  ["ATS does not interpret condominium declarations, bylaws or legal maintenance responsibility between the owner and association", "Not an interpretation of condominium declarations, bylaws, or legal maintenance responsibility between the owner and association."],
  ["No representation is made that concealed or inaccessible shared systems were inspected", "Not a representation that concealed or inaccessible shared systems were inspected."],
  ["Not a municipal building inspection or code-compliance certification", "Not a municipal building inspection or code-compliance certification."],
  ["Not architectural, engineering, plan/specification-compliance or concealed-work verification", "Not an architectural or engineering service, plan/specification-compliance review, or concealed-work verification."],
  ["Does not certify contractor workmanship or replace the builder’s quality-control and warranty obligations", "Not a certification of contractor workmanship or a replacement for the builder’s quality-control and warranty obligations."],
  ["A reinspection is not a new whole-home inspection unless separately contracted", "Not a new whole-home inspection unless separately contracted."],
  ["No certification of concealed work, contractor workmanship, code compliance, permit closeout or future durability", "Not a certification of concealed work, contractor workmanship, code compliance, permit closeout, or future durability."],
  ["Unrelated systems are outside scope unless specifically added to the written agreement", "Not an evaluation of unrelated systems unless those systems are specifically added to the written agreement."],
  ["Thermal imaging does not see through walls and does not independently establish the presence of moisture", "Not a method for seeing through walls or independently establishing moisture presence; thermal imaging is a supplemental screening tool."],
  ["Moisture readings are screening and documentation tools rather than certification of concealed conditions", "Not a certification of concealed conditions; moisture readings are screening and documentation tools."],
  ["No mold-species identification, indoor-air-quality certification, environmental sampling or destructive leak testing", "Not a mold-species identification, indoor-air-quality certification, environmental sampling, or destructive leak-testing service."],
  ["The inspection does not guarantee the exact concealed source or full extent of damage", "Not a guarantee of the exact concealed source or full extent of damage."],
  ["No backflow-prevention certification", "Not a backflow-prevention certification."],
  ["No buried-pipe or valve locating, pressure testing or design-flow calculation", "Not a buried-pipe or valve-locating service, pressure test, or design-flow calculation."],
  ["No water-quality certification or landscape-design adequacy certification", "Not a water-quality certification or landscape-design adequacy evaluation."],
  ["No irrigation repair or adjustment service is performed as part of the inspection", "Not an irrigation repair or adjustment service."],
  ["No electrical-panel or service-cover removal or equipotential-bonding certification", "Not an electrical-panel/service-cover inspection or equipotential-bonding certification."],
  ["No gas-pressure, combustion or leak certification", "Not a gas-pressure, combustion, or leak certification."],
  ["No structural engineering, water-chemistry certification, suction/entrapment certification or pressure testing", "Not a structural-engineering evaluation, water-chemistry certification, suction/entrapment certification, or pressure-testing service."],
  ["No concealed leak location or comprehensive code-compliance certification", "Not a concealed leak-location service or comprehensive code-compliance certification."],
  ["This is a condition-documentation service, not a comprehensive technical home inspection", "Not a comprehensive technical home inspection; this is a condition-documentation service."],
  ["No property management, leasing, guest or tenant administration, rent handling or housekeeping certification", "Not property management, leasing, guest or tenant administration, rent handling, or housekeeping certification."],
  ["ATS does not determine responsibility for damage or make tenancy, rental or owner-management decisions", "Not a determination of responsibility for damage or a tenancy, rental, or owner-management decision."],
]);

function refineScopeBoundaryWording() {
  document.querySelectorAll(".ats-scope-boundaries p").forEach((paragraph) => {
    const current = paragraph.textContent?.trim();
    const replacement = SCOPE_BOUNDARY_REPLACEMENTS.get(current);
    if (replacement && current !== replacement) paragraph.textContent = replacement;
  });
}

function convertEstimateTextToButtons() {
  document.querySelectorAll(".ats-rate-row").forEach((row) => {
    const priceCell = row.querySelector(":scope > strong");
    if (!priceCell || priceCell.textContent?.trim().toLowerCase() !== "please request an estimate") return;
    const link = document.createElement("a");
    link.href = "/contact";
    link.className = "ats-request-estimate-button";
    link.textContent = "Request an Estimate";
    link.setAttribute("aria-label", "Request an inspection estimate");
    priceCell.replaceWith(link);
  });
}

function markSinglePricingTables() {
  document.querySelectorAll(".ats-rate-grid").forEach((grid) => {
    const tables = Array.from(grid.children).filter((child) => child.classList?.contains("ats-rate-table-wrap"));
    grid.classList.toggle("ats-rate-grid-single", tables.length === 1);
  });
}

function applyInspectionPageRefinements() {
  refineScopeBoundaryWording();
  convertEstimateTextToButtons();
  markSinglePricingTables();
}

let refinementFrame = 0;
function scheduleInspectionPageRefinements() {
  if (refinementFrame) return;
  refinementFrame = window.requestAnimationFrame(() => {
    refinementFrame = 0;
    applyInspectionPageRefinements();
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleInspectionPageRefinements, { once: true });
else scheduleInspectionPageRefinements();

const inspectionRefinementObserver = new MutationObserver(scheduleInspectionPageRefinements);
inspectionRefinementObserver.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
