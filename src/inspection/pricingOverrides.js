import { inspectionServices } from "./inspectionData";

const newConstruction = inspectionServices.find((inspection) => inspection.id === "new-construction");

if (newConstruction) {
  Object.assign(newConstruction, {
    short:
      "Independent new-construction inspections offered at the pre-drywall stage, the detailed final stage, or as a discounted two-inspection bundle.",
    bestFor:
      "Single-family new-construction buyers and owners who want independent documentation before concealed work is covered and/or before final acceptance.",
    startingPrice: "$275 pre-drywall / $450 final",
    scope: [
      "Pre-Drywall Inspection — visible and readily accessible framing, structural connections, sheathing, rough plumbing, rough electrical routing, HVAC and ductwork where present, penetrations, blocking, supports and other components that will become concealed by insulation or finishes",
      "Pre-Drywall Inspection — photographic documentation of visible concerns so the client can raise them with the builder before wall and ceiling finishes conceal the work",
      "Detailed Final Inspection — the applicable Full Residential Home Inspection scope for the substantially completed single-family residence",
      "Detailed Final Inspection — visible completion, workmanship, finish and installation concerns, including incomplete or damaged components and normal user-level operation of installed systems where appropriate and safe",
      "Detailed Final Inspection — doors, windows, cabinets, fixtures, site and drainage conditions, roof, exterior, attic, interior, plumbing, electrical, HVAC and included built-in appliances where readily accessible",
      "Supplemental thermal imaging and moisture measurements during the Detailed Final Inspection when useful and appropriate, with photographic documentation of material findings and limitations",
    ],
    boundaries: [
      "Not a municipal building inspection, permit inspection, code-compliance certification or approval of construction.",
      "Not an architectural or engineering service, structural-capacity determination, plan/specification-compliance review or concealed-work certification.",
      "The Pre-Drywall Inspection is limited to conditions visible and readily accessible at the time of the visit; work already concealed cannot be verified.",
      "Not a certification of contractor workmanship or a replacement for the builder’s quality-control, required inspections, warranties or contractual obligations.",
    ],
    deliverable:
      "Each inspection includes a photographic report documenting visible conditions, material limitations and items appropriate for discussion with the builder or an appropriately qualified professional. Clients who bundle both phases receive a separate report for the Pre-Drywall Inspection and the Detailed Final Inspection.",
    pricing: [
      {
        title: "Pre-Drywall Inspection",
        rows: [
          { label: "Up to 1,000 sq. ft.", price: "$275" },
          { label: "1,001–1,200 sq. ft.", price: "$325" },
          { label: "1,201–2,000 sq. ft.", price: "$375" },
          { label: "2,001–2,500 sq. ft.", price: "$475" },
          { label: "2,501–3,000 sq. ft.", price: "$650" },
          { label: "Over 3,000 sq. ft.", estimate: true },
        ],
      },
      {
        title: "Detailed Final Inspection",
        rows: [
          { label: "Up to 1,000 sq. ft.", price: "$450" },
          { label: "1,001–1,200 sq. ft.", price: "$500" },
          { label: "1,201–2,000 sq. ft.", price: "$550" },
          { label: "2,001–2,500 sq. ft.", price: "$650" },
          { label: "2,501–3,000 sq. ft.", price: "$825" },
          { label: "Over 3,000 sq. ft.", estimate: true },
        ],
      },
      {
        title: "Pre-Drywall + Detailed Final Bundle — 15% Savings",
        rows: [
          { label: "Up to 1,000 sq. ft.", price: "$616.25" },
          { label: "1,001–1,200 sq. ft.", price: "$701.25" },
          { label: "1,201–2,000 sq. ft.", price: "$786.25" },
          { label: "2,001–2,500 sq. ft.", price: "$956.25" },
          { label: "2,501–3,000 sq. ft.", price: "$1,253.75" },
          { label: "Over 3,000 sq. ft.", estimate: true },
        ],
      },
    ],
    pricingNotes: [
      "Detailed Final Inspection pricing matches the Full Residential Home Inspection single-family rate schedule.",
      "Pre-Drywall Inspection pricing is $175 less than the corresponding Detailed Final Inspection rate through 3,000 sq. ft.",
      "Bundle pricing reflects a 15% discount from the combined standalone Pre-Drywall and Detailed Final Inspection rates. Both inspections must be booked for the same new-construction residence to qualify.",
      "Total inspected square footage includes garages, lanais and other areas included in the agreed inspection scope. Square footage is subject to site verification.",
      "New Construction Home Inspections are offered for single-family residences. Condominium new-construction inspections are not offered under this service.",
    ],
  });
}

const poolSpa = inspectionServices.find((inspection) => inspection.id === "pool-spa");

if (poolSpa) {
  poolSpa.startingPrice = "$75 spa / $150 pool";
  poolSpa.pricing = [
    {
      title: "Pool & Spa",
      rows: [
        { label: "Pool & Spa", price: "$200" },
        { label: "Pool Only", price: "$150" },
        { label: "Spa Only", price: "$75" },
      ],
    },
  ];
}
