export const PRICING_PAGE_PATH = "/pricing";

export const TRAVEL_POLICY = [
  { distance: "0–15 miles", price: "Included", detail: "Local service area from the ATS Waikoloa dispatch point." },
  { distance: "16–25 miles", price: "$50", detail: "One travel charge per scheduled site visit." },
  { distance: "26–40 miles", price: "$90", detail: "One-way normal road distance is used." },
  { distance: "41–60 miles", price: "$135", detail: "One travel charge per scheduled site visit." },
  { distance: "61–80 miles", price: "$200", detail: "A minimum service commitment equivalent to approximately two billable service hours applies." },
  { distance: "81+ miles", price: "From $275", detail: "A half-day service minimum generally applies. Inter-island work is custom quoted." },
];

export const CANCELLATION_POLICY = [
  { notice: "More than 24 hours", policy: "No standard service cancellation fee" },
  { notice: "Less than 24 hours", policy: "50% of the scheduled minimum" },
  { notice: "ATS already en route / no-show / inaccessible site", policy: "100% of the scheduled minimum + applicable travel" },
  { notice: "Half-day, full-day or 61+ mile reservation", policy: "48-hour notice required" },
];

export const SERVICE_PRICING = {
  "/services/property-field-services": {
    title: "Property Field Services",
    eyebrow: "Property service pricing",
    intro: "Clear visit pricing for owner-directed observation, documentation and authorized onsite support.",
    items: [
      { label: "Scheduled Property Check", price: "$145", detail: "Up to 60 minutes with standard photo documentation and factual visit notes." },
      { label: "Monthly Recurring Check", price: "$135 / visit", detail: "For an established recurring checklist and scheduled monthly service." },
      { label: "Twice-Monthly Recurring Check", price: "$130 / visit", detail: "For an established recurring checklist and two scheduled visits per month." },
      { label: "Weekly Recurring Check", price: "$125 / visit", detail: "For an established recurring checklist and weekly scheduled service." },
      { label: "Recurring-Service Baseline", price: "$195", detail: "Up to 90 minutes to establish access procedures, requested checkpoints and baseline documentation." },
      { label: "Priority Property Condition Check", price: "$175", detail: "First hour for an accepted priority condition visit; priority premiums may apply." },
    ],
    note: "Extended properties, vendor attendance, delivery verification, detailed documentation and other field assignments are quoted according to scope. Property Field Services are not property management or a home inspection.",
  },
  "/services/vendor-coordination": {
    title: "Vendor Research, Quotes & Coordination",
    eyebrow: "Provider research pricing",
    intro: "Pay for ATS research and coordination—not referral commissions or contractor markups.",
    items: [
      { label: "Find a Provider", price: "$75", detail: "Up to two researched provider options for a straightforward need. No vendor outreach included." },
      { label: "Provider Research & Shortlist", price: "$125", detail: "Up to three researched candidates for one provider category with current-fit review." },
      { label: "Research & Request Quotes", price: "$195", detail: "Provider research plus quote requests to client-approved providers and normal follow-up." },
      { label: "Complete Vendor Quote Package", price: "$275", detail: "Research, quote requests and factual comparison of available proposals." },
      { label: "Specialty / Higher-Risk Project", price: "From $325", detail: "For more specialized provider categories or more involved verification and coordination." },
    ],
    note: "Clients select, contract with and pay third-party providers directly. ATS does not accept referral compensation and does not guarantee third-party work.",
  },
  "/services/handyman-services": {
    title: "Handyman Services",
    eyebrow: "Handyman pricing",
    intro: "Straightforward minor-service pricing with free remote quoting when the scope can be evaluated from photos, measurements or product information.",
    items: [
      { label: "Standard Service Visit", price: "$125", detail: "Up to 90 minutes of qualifying handyman labor." },
      { label: "3-Hour Punch List", price: "$225", detail: "Reserved time for multiple compatible minor tasks at one location." },
      { label: "Half Day", price: "$295", detail: "Up to four hours of qualifying handyman work." },
      { label: "Full Day", price: "$575", detail: "Up to eight hours of qualifying handyman work." },
      { label: "Onsite Scope Assessment", price: "$75", detail: "Used when a responsible quote cannot be prepared remotely; credited toward qualifying $250+ projects booked within 30 days." },
    ],
    note: "Additional qualifying labor is $75/hour. Materials and applicable travel are additional. Work requiring a licensed contractor, permit or regulated trade is referred to an appropriately qualified provider.",
  },
  "/services/technology-installation": {
    title: "Technology Installation",
    eyebrow: "Technology service pricing",
    intro: "Practical setup, troubleshooting and connected-home support with clear starting prices.",
    items: [
      { label: "Technology Setup", price: "From $125", detail: "Basic compatible device, streaming, printer or equipment setup." },
      { label: "TV Mounting", price: "From $125", detail: "Standard compatible customer-provided mount on suitable wood-frame/drywall conditions." },
      { label: "Wi-Fi Troubleshooting", price: "$145", detail: "Up to 90 minutes, then $85/hour when additional diagnostic time is authorized." },
      { label: "Mesh Wi-Fi Installation", price: "From $195", detail: "Two-node setup; larger systems are priced by node count and property complexity." },
      { label: "Smart-Home Setup", price: "From $125", detail: "Compatible plug-in, battery-powered or non-hardwired devices." },
      { label: "Whole-Property Technology Refresh", price: "From $395", detail: "Broader connectivity, television, streaming and connected-device refresh projects." },
    ],
    note: "Free remote quotes are available when photos, model numbers and project details are sufficient. Electrical, hardwired or other regulated work is outside the standard ATS technology-installation scope.",
  },
  "/services/training-support": {
    title: "Training & Support",
    eyebrow: "Training deliverables",
    intro: "Starting prices reflect the preparation, writing, recording, editing and revision work behind practical training materials.",
    items: [
      { label: "Quick Reference Guide", price: "From $95", detail: "Concise one-page instructions or reference material." },
      { label: "How-To Guide", price: "From $145", detail: "Short written guide with organized steps and supporting visuals when appropriate." },
      { label: "Training Video", price: "From $195", detail: "Simple screen-recorded walkthrough; more produced modules are quoted by scope." },
      { label: "Employee Onboarding Package", price: "From $395", detail: "Practical onboarding checklist, role guidance and selected training materials." },
      { label: "Training / Support Library", price: "From $495", detail: "Organized written and video resources for repeatable internal or property support." },
    ],
    note: "One reasonable revision round is included with normal fixed-price deliverables. Major process changes or expanded scope are quoted separately.",
  },
  "/services/workflow-optimization": {
    title: "Workflow Optimization",
    eyebrow: "Operations improvement pricing",
    intro: "Fixed-price starting points for documenting, analyzing and improving how work moves through an organization.",
    items: [
      { label: "Checklist Development", price: "From $125", detail: "Simple operational checklist for a defined process or readiness need." },
      { label: "SOP Development", price: "From $195", detail: "Professional documentation of an existing defined process." },
      { label: "Workflow Review", price: "$295", detail: "Focused review of one defined workflow with findings and practical recommendations." },
      { label: "Workflow Optimization", price: "$495", detail: "Review plus redesigned workflow, responsibilities, decision points and implementation guidance." },
      { label: "Operations Assessment", price: "$595", detail: "Broader small-business operational assessment with prioritized recommendations." },
      { label: "Larger Improvement Project", price: "From $950", detail: "Multi-workflow or broader operations-improvement engagement." },
    ],
    note: "Workflow Optimization improves the process itself. Training, automation or application development can be added when the redesigned process needs implementation support.",
  },
  "/services/website-development": {
    title: "Website Development",
    eyebrow: "Website project pricing",
    intro: "Transparent starting prices for professional small-business websites, landing pages and ongoing care.",
    items: [
      { label: "Landing Page", price: "From $450", detail: "Focused page for a service, campaign, event or lead-generation objective." },
      { label: "Single-Page Business Website", price: "From $650", detail: "Professional responsive one-page presence for a straightforward small business." },
      { label: "Small-Business Website", price: "From $1,250", detail: "Typically three to five core pages with navigation, forms and search foundations." },
      { label: "Standard Business Website", price: "From $1,750", detail: "Typically six to eight pages or a more detailed service-based website." },
      { label: "Website Care", price: "From $75 / month", detail: "Optional ongoing minor content and maintenance support." },
    ],
    note: "Domains, hosting, paid software, stock assets and third-party subscriptions are separate unless specifically included in the written quote.",
  },
  "/services/business-insight": {
    title: "Insight & Analysis",
    eyebrow: "Analysis and reporting pricing",
    intro: "Practical business analysis and leadership-ready reporting without enterprise-consulting overhead.",
    items: [
      { label: "Leadership Brief", price: "From $195", detail: "Concise findings, exceptions, risks and recommended actions." },
      { label: "Focused Operational Analysis", price: "$295", detail: "One defined operational question using reasonably organized client-provided information." },
      { label: "Business / Operations Analysis", price: "$495", detail: "Broader trend, comparison and operational review with recommendations." },
      { label: "Dashboard Development", price: "From $395", detail: "Practical spreadsheet or reporting dashboard for defined metrics." },
      { label: "Recurring Business Reporting", price: "From $250 / month", detail: "Standardized recurring reporting using established data sources and report structure." },
    ],
    note: "Data cleanup, larger datasets, multiple data sources and advanced dashboards may require additional scope. ATS provides business and operational analysis, not regulated professional opinions.",
  },
  "/services/automation-development": {
    title: "Automation Development",
    eyebrow: "Automation project pricing",
    intro: "Starting prices include appropriate testing, documentation and exception handling for the agreed workflow.",
    items: [
      { label: "Automation Assessment", price: "$195", detail: "$100 may be credited toward an ATS implementation of $500+ when the client proceeds." },
      { label: "Simple Automation", price: "From $295", detail: "One trigger and a limited number of straightforward actions between compatible systems." },
      { label: "Business Workflow Automation", price: "From $495", detail: "Multi-step workflow with conditions, testing and basic exception handling." },
      { label: "Advanced Automation", price: "From $750", detail: "More complex routing, approvals, transformations or multiple systems." },
      { label: "Multi-System Integration", price: "From $1,250", detail: "Broader automation spanning several platforms or business functions." },
      { label: "Automation Support", price: "From $75 / month", detail: "Optional defined health review and minor maintenance support." },
    ],
    note: "Third-party automation subscriptions and usage charges are separate. Appropriate human approval is preserved where judgment or consequential decisions are involved.",
  },
  "/services/ai-implementation": {
    title: "AI Implementation",
    eyebrow: "Practical AI pricing",
    intro: "Small-business entry points for useful AI implementation with privacy, data quality and human review considered from the start.",
    items: [
      { label: "AI Use-Case Review", price: "$195", detail: "$100 may be credited toward an ATS AI implementation of $500+ when the client proceeds." },
      { label: "Business AI Setup", price: "From $295", detail: "Defined tool selection, configuration, reusable instructions and basic user setup." },
      { label: "AI Workflow Implementation", price: "From $495", detail: "Contained AI-assisted workflow with testing and an appropriate human-review path." },
      { label: "Internal Knowledge Assistant", price: "From $750", detail: "Configured assistant using an organized, approved knowledge set." },
      { label: "AI Governance & Training", price: "From $195", detail: "Practical acceptable-use guidance, training or both depending on scope." },
    ],
    note: "Third-party AI subscriptions, API usage and related software costs are separate. AI output can be incorrect; consequential decisions require appropriate human review.",
  },
  "/services/application-development": {
    title: "Application Development",
    eyebrow: "Application project pricing",
    intro: "A practical progression from existing-platform implementation to focused custom internal applications.",
    items: [
      { label: "Application / Platform Setup", price: "From $395", detail: "Configuration of an appropriate existing business platform for a defined need." },
      { label: "Spreadsheet Modernization", price: "From $750", detail: "Move a spreadsheet-driven workflow into a more structured system." },
      { label: "Internal Business Tool", price: "From $1,250", detail: "Small, tightly controlled custom internal tool for one defined workflow." },
      { label: "Business Application", price: "From $2,000", detail: "More substantial internal application with multiple screens, records or user functions." },
      { label: "Advanced Business Application", price: "From $3,500", detail: "Multiple workflows, permissions, integrations or advanced business logic." },
      { label: "Application Support", price: "From $125 / month", detail: "Optional ongoing maintenance and defined support allocation." },
    ],
    note: "Larger custom applications and MVPs require a detailed quote. Hosting, databases, authentication services, APIs and other third-party infrastructure costs are separate unless stated otherwise.",
  },
};

export const HOMEPAGE_PRICING = [
  { title: "Property Field Visits", price: "From $125 recurring / $145 one-time", path: "/services/property-field-services" },
  { title: "Vendor Research & Quotes", price: "From $75", path: "/services/vendor-coordination" },
  { title: "Handyman Services", price: "From $125", path: "/services/handyman-services" },
  { title: "Technology Installation", price: "From $125", path: "/services/technology-installation" },
];

export const PRICING_SUMMARY = [
  { path: "/services/property-field-services", label: "Property Field Services", price: "From $125 recurring / $145 one-time" },
  { path: "/services/vendor-coordination", label: "Vendor Research, Quotes & Coordination", price: "From $75" },
  { path: "/services/handyman-services", label: "Handyman Services", price: "From $125" },
  { path: "/services/technology-installation", label: "Technology Installation", price: "From $125" },
  { path: "/services/training-support", label: "Training & Support", price: "From $95" },
  { path: "/services/workflow-optimization", label: "Workflow Optimization", price: "From $125 / reviews from $295" },
  { path: "/services/website-development", label: "Website Development", price: "Landing pages from $450 / websites from $650" },
  { path: "/services/business-insight", label: "Insight & Analysis", price: "From $195" },
  { path: "/services/automation-development", label: "Automation Development", price: "Assessments $195 / builds from $295" },
  { path: "/services/ai-implementation", label: "AI Implementation", price: "From $195" },
  { path: "/services/application-development", label: "Application Development", price: "Implementation from $395 / internal tools from $1,250" },
];

export const GLOBAL_PRICING_NOTES = {
  tax: "Prices shown are base service prices. Applicable Hawaiʻi General Excise Tax (GET) may be added to invoices where applicable.",
  thirdParty: "Materials, equipment, third-party vendors, permits, domains, hosting, software subscriptions, AI/API usage and other external costs are separate unless specifically included in the written quote.",
  procurement: "Standard preplanned local procurement for ordinary Handyman or Technology materials may include a $25 procurement/handling charge in addition to item cost. More extensive sourcing is quoted separately.",
  correction: "If additional work is required solely because ATS did not perform the agreed scope correctly, ATS does not charge for corrective labor or associated travel. Digital builds include a 30-day correction period for defects against the agreed scope.",
};
