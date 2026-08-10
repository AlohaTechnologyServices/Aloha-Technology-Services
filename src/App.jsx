import { useForm, ValidationError } from "@formspree/react";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Camera,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Code2,
  Droplets,
  FileText,
  Globe2,
  Hammer,
  HardHat,
  Home,
  Laptop,
  Mail,
  MapPin,
  Menu,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Sprout,
  Thermometer,
  Users,
  Video,
  Waves,
  Wifi,
  Workflow,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import AlohaAssistant from "./AlohaAssistant";

const COMPANY_NAME = "Aloha Technology Services LLC";
const COMPANY_EMAIL = "hawaiiats@gmail.com";
const COMPANY_PHONE = "+1 808 443 7148";
const COMPANY_PHONE_HREF = "+18084437148";
const FORM_ID = "mnjlpyya";
const SITE_URL = "https://atshawaii.vercel.app";
const LOGO = "/images/ats-logo.png";
const SOCIAL_IMAGE = "/images/ats-social-card.jpg";
const FOUNDER_PORTRAIT = "/images/kenyon-koa-smith-about.webp";

const PAGE_PATHS = {
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

const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page])
);

const PAGE_SEO = {
  home: {
    title: "Aloha Technology Services LLC | Property, Inspection & Technology Services",
    description:
      "Hawaiʻi Island property field services, residential home inspections, vendor coordination, handyman support, workflow improvement, technology installation, websites, automation, AI and application development.",
  },
  about: {
    title: "About Kenyon Koa Smith | Aloha Technology Services LLC",
    description:
      "Learn about Kenyon Koa Smith and the Hawaiʻi Island property, operations, technology and hands-on experience behind Aloha Technology Services LLC.",
    image: FOUNDER_PORTRAIT,
  },
  contact: {
    title: "Contact Aloha Technology Services LLC | Request Service",
    description:
      "Request a home inspection, property field visit, vendor coordination, handyman service, technology project or business consultation on Hawaiʻi Island.",
  },
  "property-field-services": {
    title: "Property Field Services | Hawaiʻi Island",
    description:
      "Owner-directed visual property checks, photo documentation, vendor access, delivery verification, incident checks and defined onsite support on Hawaiʻi Island.",
  },
  "home-inspections": {
    title: "Home Inspections | Buyers, Sellers & Owners | Hawaiʻi Island",
    description:
      "Detailed residential home inspections, moisture and thermal-imaging inspections, irrigation, pool and spa inspections, reinspections and custom rental arrival/departure inspections.",
  },
  "vendor-coordination": {
    title: "Vendor Coordination & Provider Research | Hawaiʻi Island",
    description:
      "Project-specific provider research and coordination supported by an internal Hawaiʻi Island directory covering 316 unique providers across 39 separated service families.",
  },
  "handyman-services": {
    title: "Handyman Services | Hawaiʻi Island",
    description:
      "Minor repairs, installations, mounting, assembly, adjustments and property punch-list support that do not require a licensed trade professional.",
  },
  "workflow-optimization": {
    title: "Workflow Optimization & SOP Development | Hawaiʻi Island",
    description:
      "Process mapping, SOP development, improved handoffs, clear accountability and practical operational improvement for Hawaiʻi Island organizations.",
  },
  "technology-installation": {
    title: "Technology Installation & Refreshes | Hawaiʻi Island",
    description:
      "Mesh Wi-Fi, televisions, streaming devices, connected equipment, internet-provider coordination and residential or commercial technology refreshes.",
  },
  "training-support": {
    title: "Training Videos, Documentation & Support | Hawaiʻi Island",
    description:
      "Employee onboarding videos, system walkthroughs, homeowner instructions, written guides and practical support libraries.",
  },
  "website-development": {
    title: "Website Development | Hawaiʻi Island",
    description:
      "Responsive business websites, redesigns, landing pages, lead forms, integrations, analytics and practical long-term maintenance.",
  },
  "business-insight": {
    title: "Business Insight & Operational Analysis | Hawaiʻi Island",
    description:
      "Leadership reporting, dashboards, trend analysis, performance reviews and decision support for practical operational improvement.",
  },
  "automation-development": {
    title: "Automation Development | Hawaiʻi Island",
    description:
      "Automations for customer follow-up, reporting, approvals, reminders, data handling and repetitive administrative workflows.",
  },
  "ai-implementation": {
    title: "Practical AI Implementation | Hawaiʻi Island",
    description:
      "Responsible AI implementation for customer support, internal knowledge, documents, reporting and administrative workflows.",
  },
  "application-development": {
    title: "Application Development & Implementation | Hawaiʻi Island",
    description:
      "Custom internal tools, operational dashboards, spreadsheet modernization and third-party application implementation.",
  },
};

const services = [
  {
    id: "property-field-services",
    title: "Property Field Services",
    shortTitle: "Property Field Services",
    icon: Home,
    accent: "bg-emerald-50 text-emerald-700",
    category: "property",
    blurb:
      "Owner-directed onsite checks, factual documentation, access assistance and clearly authorized field support.",
    hero: "Reliable local field support while the owner retains every management decision.",
    overview:
      "ATS provides project-based, owner-directed field services for property owners who need a dependable person on Hawaiʻi Island to observe, document, provide authorized access and complete clearly defined tasks. Each visit follows a written scope or checklist. ATS operates as an independent service vendor—not as a property manager, caretaker, custodian, leasing agent or real estate representative.",
    image: "/images/property-field-services-hero.jpg",
    examples: [
      {
        title: "Scheduled Visual Property Check",
        description:
          "Visit accessible areas under an agreed checklist, photograph requested components and provide dated factual notes about visible conditions.",
      },
      {
        title: "Vendor Access & Appointment Support",
        description:
          "Meet an owner-selected vendor, provide authorized access, document arrival and departure and report visible completion status.",
      },
      {
        title: "Incident, Storm or Leak Check",
        description:
          "Respond to an owner request, document observable conditions and promptly relay information so the owner can authorize the next step.",
      },
      {
        title: "Delivery & Installation Verification",
        description:
          "Document authorized deliveries, visible item condition, placement and apparent completion with photographs or video.",
      },
      {
        title: "Technology & Connectivity Check",
        description:
          "Check owner-identified televisions, Wi-Fi equipment, smart devices and connected appliances and complete approved basic troubleshooting.",
      },
      {
        title: "Post-Service Documentation",
        description:
          "Return after authorized work to photograph visible results and note apparent completion or remaining concerns without providing a warranty or professional certification.",
      },
    ],
    outcomes: [
      "Dated photographs and factual field notes",
      "Faster owner awareness of visible concerns",
      "Reliable onsite access and appointment support",
      "Clear owner control over all decisions",
    ],
    details: [
      {
        title: "Visual checks and documentation",
        description:
          "Exterior and interior walkthroughs of accessible areas, requested photographs or video, indicator or meter photographs and factual notes about visible conditions.",
      },
      {
        title: "Access and onsite presence",
        description:
          "Authorized entry for vendors, deliveries, internet providers, installers or scheduled appointments, with arrival, access and departure documentation.",
      },
      {
        title: "Owner-directed coordination",
        description:
          "Appointment support, relaying owner-approved information and documenting visible progress. The owner selects vendors and approves scope and cost.",
      },
      {
        title: "Supplies, deliveries and inventory",
        description:
          "Owner-authorized pickup, delivery, placement, basic inventory counts and documentation of items present at the property.",
      },
      {
        title: "Technology field support",
        description:
          "Connectivity checks, device setup, equipment resets, television and streaming support and coordination with internet or technology providers.",
      },
      {
        title: "Escalation of visible concerns",
        description:
          "Prompt notice when a visit reveals observable water, damage, security, pest, utility or safety concerns, followed by action only after authorization.",
      },
    ],
    exclusions: [
      "Advertising, listing, showing or offering property for rent",
      "Finding, screening, approving or rejecting tenants or guests",
      "Negotiating rent, deposits, concessions, occupancy or lease terms",
      "Preparing, administering, modifying or enforcing leases",
      "Collecting, holding or accounting for rent or security deposits",
      "Making tenant, guest, rental, eviction or landlord-tenant decisions",
      "Representing the owner as a property manager, caretaker, custodian, broker or salesperson",
      "Performing work that requires a contractor, trade, engineering, pest-control or other professional license",
    ],
    disclaimer:
      "Property Field Services are non-invasive, owner-directed observations and tasks. They are not a home inspection, engineering evaluation, code-compliance inspection, appraisal, warranty or guarantee. The owner retains all management, financial, leasing and legal authority.",
  },
  {
    id: "home-inspections",
    title: "Home Inspections",
    shortTitle: "Home Inspections",
    icon: ClipboardCheck,
    accent: "bg-blue-50 text-blue-700",
    category: "property",
    blurb:
      "Detailed residential inspections with photographs, clear priorities and practical recommendations for buyers, sellers and owners.",
  },
  {
    id: "vendor-coordination",
    title: "Vendor Coordination",
    shortTitle: "Vendor Coordination",
    icon: Users,
    accent: "bg-cyan-50 text-cyan-700",
    category: "property",
    blurb:
      "Project-specific provider research, shortlisting, scheduling, access and documented follow-through across Hawaiʻi Island.",
  },
  {
    id: "handyman-services",
    title: "Handyman Services",
    shortTitle: "Handyman Services",
    icon: Hammer,
    accent: "bg-orange-50 text-orange-700",
    category: "property",
    blurb:
      "Minor repairs, installations, adjustments and property punch-list work within a clearly defined non-licensed scope.",
    hero: "Detail-oriented hands-on support for practical property needs.",
    overview:
      "ATS provides minor repair, installation, mounting, assembly and adjustment services when the work does not require a contractor or specialty-trade license. We document scope before work begins, follow manufacturer instructions when applicable and stop or refer the project when concealed conditions or expanded scope require a qualified professional.",
    image: "/images/handyman-services-hero.jpg",
    examples: [
      {
        title: "Mounting and installation",
        description:
          "Compatible televisions, shelves, wall accessories, smart devices, hardware and equipment installed within the approved scope.",
      },
      {
        title: "Minor repairs and adjustments",
        description:
          "Cabinet, door, furniture, hardware, fixture and general punch-list assistance that does not involve regulated trade work.",
      },
      {
        title: "Assembly and property setup",
        description:
          "Furniture, storage systems, compatible equipment and owner-provided items assembled and positioned according to instructions.",
      },
      {
        title: "Manufacturer-guided support",
        description:
          "Troubleshooting or compatible component replacement using published manufacturer procedures or manufacturer support when appropriate.",
      },
      {
        title: "Rental and residence punch lists",
        description:
          "Defined lists of minor cosmetic, hardware and setup items completed between stays, before owner arrival or during maintenance periods.",
      },
      {
        title: "Scope review and referral",
        description:
          "Visible conditions are reviewed before work. Projects outside the handyman scope are referred to an appropriately qualified provider.",
      },
    ],
    outcomes: [
      "Clear written scope",
      "Professional communication",
      "Manufacturer-aware execution",
      "Appropriate referral when licensing is required",
    ],
    details: [
      {
        title: "Before work begins",
        description:
          "ATS confirms the requested task, visible conditions, access, materials, estimated time and whether the project appears to remain within the permitted minor-service scope.",
      },
      {
        title: "During the project",
        description:
          "Work areas are protected, progress is communicated and unexpected conditions are documented before any change in scope is considered.",
      },
      {
        title: "At completion",
        description:
          "The completed work is reviewed, the area is left orderly and the client receives photographs or notes when requested.",
      },
    ],
    disclaimer:
      "Handyman services exclude work that requires a licensed contractor or regulated trade professional, including permitted structural, roofing, plumbing, electrical, fuel-gas and similar work. Projects are not divided to avoid licensing requirements.",
  },
  {
    id: "workflow-optimization",
    title: "Workflow Optimization",
    shortTitle: "Workflow Optimization",
    icon: Workflow,
    accent: "bg-teal-50 text-teal-700",
    category: "operations",
    blurb:
      "Process mapping, SOPs, clearer ownership and improved handoffs designed around how work actually moves.",
    hero: "Simplify work, reduce friction and strengthen operational consistency.",
    overview:
      "ATS reviews how tasks, decisions and information move through an organization, identifies unnecessary steps and designs practical workflows that are easier to teach, track and improve. Solutions are grounded in the daily operating reality of the people who use them.",
    examples: [
      { title: "SOP development", description: "Create usable procedures with roles, standards, decision points, exceptions and escalation steps." },
      { title: "Cross-department handoffs", description: "Clarify ownership and information transfer between operations, support, accounting, vendors and leadership." },
      { title: "Approval process redesign", description: "Reduce redundant touchpoints and create clearer decision authority and follow-up." },
      { title: "Inspection and readiness programs", description: "Build repeatable checklists, status definitions, accountability and reporting for property or service operations." },
      { title: "Issue tracking and escalation", description: "Create structured pathways for documenting, prioritizing and resolving recurring operational concerns." },
      { title: "Implementation support", description: "Train users, test the new workflow, gather feedback and refine the process after rollout." },
    ],
    outcomes: ["Clearer accountability", "Fewer missed handoffs", "More consistent execution", "Processes that can scale"],
  },
  {
    id: "technology-installation",
    title: "Technology Installation",
    shortTitle: "Technology Installation",
    icon: Wifi,
    accent: "bg-sky-50 text-sky-700",
    category: "technology",
    blurb:
      "Whole-property connectivity, televisions, streaming equipment, connected devices and practical technology refreshes.",
    hero: "Reliable technology for homes, businesses and managed residences.",
    overview:
      "ATS installs, configures and troubleshoots technology for homeowners, businesses, vacation rentals and property teams. Projects may include internet-provider coordination, mesh Wi-Fi, televisions, streaming devices, connected appliances, printers, displays and user-ready documentation.",
    examples: [
      { title: "Mesh Wi-Fi and connectivity", description: "Assess coverage, place compatible equipment, configure the network and verify connectivity in priority areas." },
      { title: "Television and streaming refresh", description: "Install compatible televisions, streaming devices and accessories with clean cable management and user setup." },
      { title: "Internet-provider coordination", description: "Support provider appointments, equipment replacement, activation and service troubleshooting." },
      { title: "Connected devices and appliances", description: "Configure compatible smart-home devices, appliances, printers, displays and shared equipment." },
      { title: "Rental-property technology standards", description: "Create consistent television, Wi-Fi and guest-instruction setups across one or multiple residences." },
      { title: "Business equipment deployment", description: "Install and configure approved displays, printers, network devices and shared workplace equipment." },
    ],
    outcomes: ["Improved coverage", "Cleaner installations", "Fewer support calls", "Clearer user instructions"],
  },
  {
    id: "training-support",
    title: "Training and Support",
    shortTitle: "Training & Support",
    icon: Video,
    accent: "bg-violet-50 text-violet-700",
    category: "technology",
    blurb:
      "Training videos, written guides and support resources that turn complicated processes into repeatable guidance.",
    hero: "Help employees, owners and users perform with confidence.",
    overview:
      "ATS creates focused training videos, walkthroughs, quick-reference documents and support libraries for applications, procedures, devices and operational standards. Content is designed for the real environment in which people will use it.",
    examples: [
      { title: "Employee onboarding", description: "Short modules covering systems, procedures, standards, escalation and role expectations." },
      { title: "How-to support library", description: "A searchable collection of videos and written guides that reduces repeated support requests." },
      { title: "Homeowner and guest instructions", description: "Clear guidance for televisions, Wi-Fi, smart devices and other property systems." },
      { title: "New-system rollout support", description: "Training and documentation that accompany a software, workflow or equipment implementation." },
      { title: "SOP-to-training conversion", description: "Translate written procedures into practical demonstrations, examples and knowledge checks." },
      { title: "Refresh and maintenance", description: "Update training materials as systems, policies and operating conditions change." },
    ],
    outcomes: ["Faster onboarding", "Fewer repeated questions", "More consistent execution", "Greater user confidence"],
  },
  {
    id: "website-development",
    title: "Website Development",
    shortTitle: "Website Development",
    icon: Globe2,
    accent: "bg-indigo-50 text-indigo-700",
    category: "digital",
    blurb:
      "Responsive websites that explain your services, strengthen credibility and convert visitors into qualified inquiries.",
    hero: "Build a professional website around real business goals.",
    overview:
      "ATS designs and develops modern websites for businesses, professionals, property services and personal ventures. Each site is structured around clear messaging, mobile usability, performance, accessibility, lead generation and practical long-term maintenance.",
    examples: [
      { title: "New service-business website", description: "Create a polished site with clear services, trust signals, lead forms and a direct customer path." },
      { title: "Website redesign", description: "Modernize structure, visual presentation, mobile performance, messaging and calls to action." },
      { title: "Landing pages", description: "Build focused pages for specific services, campaigns, audiences or geographic markets." },
      { title: "Forms and integrations", description: "Connect contact forms, scheduling, analytics, payments or other compatible business tools." },
      { title: "Search foundations", description: "Implement page titles, descriptions, structured content, sitemap and crawl-friendly routing." },
      { title: "Ongoing improvements", description: "Update services, copy, calls to action, imagery and functionality as the business evolves." },
    ],
    outcomes: ["Stronger credibility", "Mobile-friendly experience", "Clearer customer journey", "A scalable digital foundation"],
  },
  {
    id: "business-insight",
    title: "Insight & Analysis",
    shortTitle: "Insight & Analysis",
    icon: BarChart3,
    accent: "bg-amber-50 text-amber-700",
    category: "operations",
    blurb:
      "Leadership-ready reporting and operational analysis that identifies trends, risks and practical opportunities.",
    hero: "Turn operational information into clearer decisions.",
    overview:
      "ATS organizes operational information into useful dashboards, trend reviews and recommendations. The goal is not more reporting for its own sake—it is a clearer understanding of what is happening, why it matters and what should be addressed next.",
    examples: [
      { title: "Performance trend review", description: "Identify recurring delays, workload patterns, service gaps and resource constraints." },
      { title: "Leadership dashboard", description: "Present key indicators, priorities and exceptions in a concise decision-ready format." },
      { title: "Vendor and maintenance analysis", description: "Review recurring issues, response times, cost patterns and service outcomes." },
      { title: "Property operations reporting", description: "Create structured reporting for readiness, inspections, open issues and project status." },
      { title: "Process opportunity analysis", description: "Evaluate effort, bottlenecks and avoidable operating costs to identify improvement priorities." },
      { title: "Executive summaries", description: "Translate detailed information into clear conclusions, risks and recommended next steps." },
    ],
    outcomes: ["Clearer reporting", "Better prioritization", "Stronger decisions", "Improved visibility"],
  },
  {
    id: "automation-development",
    title: "Automation Development",
    shortTitle: "Automation Development",
    icon: Zap,
    accent: "bg-fuchsia-50 text-fuchsia-700",
    category: "digital",
    blurb:
      "Practical automations that reduce repetitive work, improve follow-up and keep important processes moving.",
    hero: "Automate routine work without losing operational control.",
    overview:
      "ATS designs automations that connect compatible tools, reduce manual entry and improve consistency. Each automation begins with a defined business need, clear exception handling and an understanding of where human review is still required.",
    examples: [
      { title: "Lead and customer follow-up", description: "Route inquiries, create tasks, notify staff and support timely follow-up." },
      { title: "Administrative workflows", description: "Automate recurring reports, approvals, reminders, document handling and internal notifications." },
      { title: "Property and service updates", description: "Organize inspection, project or vendor information into structured status updates." },
      { title: "Data transfer and cleanup", description: "Reduce repeat entry between compatible systems and standardize incoming information." },
      { title: "Personal productivity", description: "Simplify scheduling, reminders, household administration and recurring information tasks." },
      { title: "Automation review and controls", description: "Document triggers, exceptions, ownership, security and recovery steps before rollout." },
    ],
    outcomes: ["Less repetitive work", "Fewer manual errors", "Faster response times", "Better process visibility"],
  },
  {
    id: "ai-implementation",
    title: "AI Implementation",
    shortTitle: "AI Implementation",
    icon: Bot,
    accent: "bg-purple-50 text-purple-700",
    category: "digital",
    blurb:
      "Responsible AI implementation for defined business needs, with privacy, data quality and human review built in.",
    hero: "Use AI where it creates measurable operational value.",
    overview:
      "ATS helps organizations identify realistic AI opportunities, select appropriate tools, prepare internal knowledge, establish review procedures and train users. The objective is to solve a defined problem—not to add AI without a clear operational purpose.",
    examples: [
      { title: "Internal knowledge assistant", description: "Help staff find approved procedures, service information and reference material more quickly." },
      { title: "Document assistance", description: "Summarize, organize and extract recurring information from appropriate documents." },
      { title: "Customer-support drafting", description: "Create guided response assistance with clear human review and escalation requirements." },
      { title: "Reporting assistance", description: "Accelerate first drafts, recurring summaries and analysis of structured operational information." },
      { title: "AI use-case assessment", description: "Identify where AI may help, where it should not be used and what controls are required." },
      { title: "Training and governance", description: "Define approved use, privacy expectations, review responsibility and quality checks." },
    ],
    outcomes: ["Reduced administrative effort", "Faster access to information", "More consistent support", "Responsible human oversight"],
    disclaimer:
      "AI performance and cost savings vary by use case. Implementations should be reviewed for privacy, security, data quality, appropriate access and human decision-making requirements.",
  },
  {
    id: "application-development",
    title: "Application Development",
    shortTitle: "Application Development",
    icon: Code2,
    accent: "bg-blue-50 text-blue-700",
    category: "digital",
    blurb:
      "Custom internal tools, dashboards and application implementation designed around the work your organization performs.",
    hero: "Build the right tool and implement it with confidence.",
    overview:
      "ATS develops practical applications and helps organizations implement third-party platforms with less disruption. The focus is usability, adoption, documentation and measurable operational value rather than unnecessary technical complexity.",
    examples: [
      { title: "Operations dashboard", description: "Centralize work orders, project updates, owner requests, inspections or performance information." },
      { title: "Spreadsheet modernization", description: "Replace fragmented sheets and manual approvals with a structured, trackable application." },
      { title: "Third-party application rollout", description: "Configure a platform, map workflows, prepare documentation and support user adoption." },
      { title: "Inspection and field tools", description: "Create practical forms, checklists, photo records and status reporting for onsite work." },
      { title: "Internal request portal", description: "Organize service, approval or information requests into a clear intake and tracking process." },
      { title: "Application improvement", description: "Review an existing tool and improve usability, reporting, process fit or integration." },
    ],
    outcomes: ["Less manual work", "Better visibility", "Improved adoption", "Stronger operational control"],
  },
];

const inspectionTypes = [
  {
    id: "full-residential",
    title: "Full Residential Home Inspection",
    short: "Comprehensive review of accessible systems and components from site conditions through roofing, interiors and major installed systems.",
    image: "/images/inspection-full-residential.jpg",
    icon: Home,
    bestFor: "Buyers, sellers and owners who want the broadest single inspection scope.",
    includes: [
      "Site, drainage, grading and accessible exterior conditions",
      "Foundation, structure, roof, attic and visible building envelope",
      "Electrical, plumbing, cooling, ventilation and water-heating systems",
      "Interior rooms, kitchen, bathrooms, laundry, garage and lanais",
      "Photographs, priorities, limitations and practical recommendations",
    ],
    deliverable:
      "A complete client-friendly report with an executive summary, system-by-system findings, Red/Yellow/Green urgency priorities and recommended next actions.",
  },
  {
    id: "buyer",
    title: "Buyer’s Home Inspection",
    short: "A detailed due-diligence inspection that helps a buyer understand visible conditions before completing the purchase.",
    image: "/images/inspection-buyer.jpg",
    icon: Users,
    bestFor: "Prospective buyers during the inspection or due-diligence period.",
    includes: [
      "The full residential inspection scope when accessible and included",
      "Safety, repair, maintenance and specialist-evaluation concerns",
      "Items that may affect near-term budgeting or ownership planning",
      "Clear distinction between urgent concerns and normal maintenance",
      "Review discussion focused on practical buyer questions",
    ],
    deliverable:
      "A prioritized report that supports informed discussions with the buyer’s real-estate and professional advisory team without assigning repair costs or negotiating terms.",
  },
  {
    id: "pre-listing",
    title: "Pre-Listing Home Inspection",
    short: "A proactive inspection before marketing the property, designed to reduce avoidable surprises during escrow.",
    image: "/images/inspection-pre-listing.jpg",
    icon: FileText,
    bestFor: "Owners and listing teams preparing a property for sale.",
    includes: [
      "Visible conditions likely to appear in a later buyer inspection",
      "Maintenance and repair items the owner may choose to address",
      "Specialist-evaluation recommendations where appropriate",
      "Documentation of inaccessible or non-operational components",
      "A practical preparation sequence based on urgency and impact",
    ],
    deliverable:
      "A seller-focused condition report that helps the owner plan repairs, obtain specialist input and organize disclosures with the appropriate professionals.",
  },
  {
    id: "maintenance",
    title: "Home Maintenance Inspection",
    short: "A condition and maintenance review that helps current owners protect the home and plan upcoming work.",
    image: "/images/inspection-maintenance.jpg",
    icon: Wrench,
    bestFor: "Current homeowners, second-home owners and long-term maintenance planning.",
    includes: [
      "Visible deterioration, deferred maintenance and developing concerns",
      "Water-management, corrosion, ventilation and exterior-sealant conditions",
      "Aging systems and components that should be monitored or serviced",
      "Seasonal, annual and near-term maintenance priorities",
      "Recommended trade or specialist categories for follow-up",
    ],
    deliverable:
      "A maintenance-oriented report organized by urgency and likely timeframe so the owner can create a practical property-care plan.",
  },
  {
    id: "condo-townhome",
    title: "Condo and Townhome Inspection",
    short: "A residential inspection tailored to the unit, accessible exclusive-use areas and clearly distinguishable shared-building conditions.",
    image: "/images/inspection-condo-townhome.jpg",
    icon: Building2,
    bestFor: "Condominium and townhome buyers, sellers and owners.",
    includes: [
      "Interior systems and components within the inspected unit",
      "Accessible lanais, assigned areas and unit-specific equipment",
      "Visible conditions at windows, doors, plumbing, electrical and HVAC",
      "Observations that may involve a shared or association-maintained component",
      "Clear scope limitations for inaccessible common elements",
    ],
    deliverable:
      "A unit-focused report that distinguishes inspected components from visible conditions that may require association documents, management confirmation or specialist review.",
  },
  {
    id: "new-construction",
    title: "New Construction Home Inspection",
    short: "An independent visual review of installed work and readily accessible systems before final acceptance or warranty milestones.",
    image: "/images/inspection-new-construction.jpg",
    icon: HardHat,
    bestFor: "New-build buyers, owners approaching final walkthrough and warranty-period reviews.",
    includes: [
      "Visible workmanship, incomplete items and installation concerns",
      "Operation of accessible installed systems and representative components",
      "Interior, exterior, roof, attic and site observations when accessible",
      "Documentation suitable for discussion with the builder",
      "A clear record of limitations and items requiring specialist evaluation",
    ],
    deliverable:
      "A photographic report of visible conditions and incomplete or concerning items. It does not replace municipal inspections, engineering review or the builder’s quality-control obligations.",
  },
  {
    id: "reinspection",
    title: "Repair Verification and Reinspection",
    short: "A focused return visit to document whether specified reported items appear to have been addressed.",
    image: "/images/inspection-reinspection.jpg",
    icon: RefreshCw,
    bestFor: "Clients seeking follow-up documentation after agreed repairs or specialist work.",
    includes: [
      "Review of the original reported item and accessible repair area",
      "Visible comparison with prior photographs or descriptions",
      "Basic operation where safe, appropriate and within scope",
      "Documentation of remaining, changed or inaccessible conditions",
      "Referral back to the repairing professional when certification is required",
    ],
    deliverable:
      "A focused reinspection report describing visible conditions at the return visit. It is not a contractor warranty, engineering certification or guarantee of concealed work.",
  },
  {
    id: "moisture",
    title: "Moisture and Water-Intrusion Inspection",
    short: "A targeted investigation using thermal imaging, a moisture meter and visual indicators to evaluate suspected water intrusion.",
    image: "/images/inspection-moisture-detail.jpg",
    icon: Droplets,
    badge: "Reduced bundled rate available",
    bestFor: "Suspected leaks, staining, musty conditions, post-storm concerns and areas with previous water events.",
    includes: [
      "Thermal scanning of relevant accessible surfaces under suitable conditions",
      "Moisture-meter testing at representative or suspect locations",
      "Visual review of likely entry points, drainage and adjacent materials",
      "Photographic documentation of observed patterns and readings",
      "Recommendations for plumbing, roofing, envelope, mitigation or other specialist review",
    ],
    deliverable:
      "A targeted report identifying observed anomalies, readings, likely pathways and recommended next steps. Thermal imaging does not see through walls and cannot by itself confirm mold, concealed damage or the exact source of moisture.",
  },
  {
    id: "irrigation",
    title: "Irrigation System Inspection",
    short: "A focused operational review of accessible irrigation zones, visible components and observed coverage conditions.",
    image: "/images/inspection-irrigation.jpg",
    icon: Sprout,
    badge: "Reduced bundled rate available",
    bestFor: "Homes with landscaped areas, high water use, dry zones, overspray, leaks or aging irrigation equipment.",
    includes: [
      "Operation of accessible zones and representative emitters",
      "Visible leaks, damaged heads, overspray and obvious coverage gaps",
      "Controller settings and accessible valve or filter conditions",
      "Drainage or water-contact concerns near the building when observable",
      "Recommendations for irrigation or landscaping follow-up",
    ],
    deliverable:
      "An irrigation condition summary with photographs and observed operational concerns. Underground piping, exact flow calculations, water-quality testing and landscape-design performance are outside the standard scope.",
  },
  {
    id: "pool-spa",
    title: "Pool/Spa and Equipment Inspection",
    short: "A visual and operational review of accessible pool or spa components, equipment and safety-related conditions, with thermal imaging where useful.",
    image: "/images/inspection-pool-spa.jpg",
    icon: Waves,
    badge: "Reduced bundled rate available",
    bestFor: "Properties with pools, spas, water features or associated equipment.",
    includes: [
      "Accessible surfaces, coping, visible structure and waterline conditions",
      "Pumps, filters, heaters, controls and visible piping under normal operation",
      "Accessible electrical bonding or safety observations within the inspection scope",
      "Barriers, gates and readily visible safety-related conditions",
      "Thermal observations when they provide useful supplemental information",
    ],
    deliverable:
      "A pool/spa condition report with photographs and recommended specialist follow-up. It is not a leak-detection service, structural engineering evaluation, water-chemistry certification or code-compliance inspection.",
  },
  {
    id: "arrival-departure",
    title: "Custom Arrival and Departure Inspections",
    short: "A custom checklist and photographic condition record for owners who use their residence as a rental or periodically occupied home.",
    image: "/images/inspection-arrival-departure.jpg",
    icon: Camera,
    bestFor: "Vacation-rental owners, second-home owners and owner-managed rental properties.",
    includes: [
      "A client-approved arrival, departure or turnover checklist",
      "Photographs of agreed rooms, furnishings, equipment and visible conditions",
      "Documentation of missing, damaged or non-operational items observed during the visit",
      "Basic readiness checks defined in the written scope",
      "Prompt escalation of visible urgent conditions to the owner",
    ],
    deliverable:
      "A dated condition record tailored to the owner’s checklist. This service does not include leasing, guest placement, rent handling, property management, housekeeping certification or responsibility for concealed damage.",
  },
];

const providerFamilyGroups = [
  {
    title: "Engineering, structure and major projects",
    families: [
      "Structural / Civil Engineering",
      "Geotechnical Engineering",
      "General Building / Multi-Trade Repair",
      "Foundation & Concrete Repair",
      "Masonry, Stone & Retaining Walls",
      "Excavation, Grading & Drainage",
      "Carpentry, Decks, Lanais & Exterior Stairs",
    ],
  },
  {
    title: "Exterior envelope, roofing and openings",
    families: [
      "Painting — Interior & Exterior",
      "Waterproofing & Membrane Systems",
      "Protective & Coastal Coatings",
      "Roofing",
      "Gutters, Downspouts & Roof Drainage",
      "Glazing, Windows & Exterior Doors",
      "Screens & Minor Enclosure Service",
      "Fences, Gates, Guards & Rails",
      "Garage-Door Opener Minor Service",
      "Garage Doors & Storm Shutters",
      "Commercial / Steel / Fire Doors",
    ],
  },
  {
    title: "Interior finishes",
    families: ["Flooring & Carpet", "Tile & Stone"],
  },
  {
    title: "Plumbing, water, wastewater and gas",
    families: [
      "Plumbing & Water Heating",
      "Propane / Fuel-Gas Piping & Appliance Connections",
      "Catchment Installation, Pumps & Treatment",
      "Catchment Cleaning & Minor Maintenance",
      "Septic / Cesspool Pumping & Service",
      "Wastewater Installation & Cesspool Conversion",
    ],
  },
  {
    title: "Electrical, mechanical and building systems",
    families: [
      "Electrical",
      "Solar PV & Battery Storage",
      "HVAC, Mini-Splits & Ventilation",
      "Commercial Refrigeration",
      "Security, Alarm & Low Voltage",
      "Fire Protection, Alarms & Suppression",
    ],
  },
  {
    title: "Pools, solar heating and grounds",
    families: ["Pools & Spas", "Pool Solar & Pool Heating", "Tree Trimming, Removal & Arborist Services"],
  },
  {
    title: "Pest, restoration and environmental hazards",
    families: [
      "Termite, WDO & Pest Control",
      "Water / Fire / Mold Mitigation",
      "Restoration Reconstruction",
      "Asbestos, Lead & Hazardous-Material Specialists",
    ],
  },
];

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function pageFromPath(pathname) {
  return PATH_TO_PAGE[normalizePath(pathname)] || "home";
}

function pathForPage(page) {
  return PAGE_PATHS[page] || "/";
}

function Button({ children, onClick, variant = "primary", size = "md", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-[#1268D5] text-white shadow-sm hover:bg-[#0D57B5]",
    navy: "bg-[#061B33] text-white shadow-sm hover:bg-[#0B2B4D]",
    outline: "border border-slate-300 bg-white text-[#061B33] hover:border-[#1268D5] hover:text-[#1268D5]",
    light: "bg-white text-[#061B33] shadow-sm hover:bg-slate-100",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-[#061B33]",
  };
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-3 text-sm", lg: "px-6 py-3.5 text-base" };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-[0_12px_34px_rgba(6,27,51,0.07)] ${className}`.trim()}>{children}</div>;
}

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`max-w-3xl space-y-4 ${align === "center" ? "mx-auto text-center" : ""}`.trim()}>
      {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-[#061B33] md:text-4xl">{title}</h2>
      {description && <p className="text-base leading-8 text-slate-600 md:text-lg">{description}</p>}
    </div>
  );
}

function ServiceCard({ service, onOpen }) {
  const Icon = service.icon;
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#1268D5] via-[#2A91CB] to-[#49BDA7]" />
        <div className="flex flex-1 flex-col p-6">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.accent}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl font-bold text-[#061B33]">{service.title}</h3>
          <p className="mt-3 flex-1 leading-7 text-slate-600">{service.blurb}</p>
          <Button variant="ghost" onClick={() => onOpen(service.id)} className="mt-5 justify-start px-0">
            Explore service <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function HomePage({ onOpen }) {
  const propertyServices = services.slice(0, 4);
  const remainingServices = services.slice(4);
  return (
    <div className="space-y-20 md:space-y-24">
      <section className="overflow-hidden rounded-[2rem] bg-[#061B33] text-white shadow-2xl">
        <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative flex items-center px-7 py-14 md:px-12 lg:px-14 lg:py-16">
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#1268D5]/25 blur-3xl" />
            <div className="relative space-y-7">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#77D7CF]">Locally owned on Hawaiʻi Island</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Property expertise. Practical technology. Dependable local support.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Aloha Technology Services LLC is organized around the work we most value: supporting properties, inspecting homes, coordinating qualified providers and solving practical operational and technology challenges.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="light" onClick={() => onOpen("home-inspections")}>
                  Explore Home Inspections
                </Button>
                <Button size="lg" className="border border-white/20 bg-white/10 hover:bg-white/20" onClick={() => onOpen("contact")}>
                  Request Service
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Hawaiʻi Island focused", "Photo-documented service", "Clear written scope"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-full">
            <img
              src="/images/inspection-hero.jpg"
              alt="Hawaiʻi Island residence used to represent home inspections and property services"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061B33] via-[#061B33]/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#061B33]/40" />
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Priority services"
          title="Property and home services come first"
          description="These services reflect the work ATS most prefers to perform and the areas where local field experience, detailed documentation and strong provider relationships create the greatest value."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {propertyServices.map((service) => <ServiceCard key={service.id} service={service} onOpen={onOpen} />)}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="overflow-hidden rounded-[2rem] shadow-xl">
          <img src="/images/property-field-services-hero.jpg" alt="Field service professional documenting the exterior of a Hawaiʻi Island residence" className="aspect-[16/10] w-full object-cover" loading="lazy" />
        </div>
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Property Field Services</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#061B33] md:text-4xl">Clear onsite support without taking over the owner’s decisions</h2>
          <p className="text-lg leading-8 text-slate-600">
            ATS performs owner-directed visual checks, access support, delivery verification, incident documentation and defined onsite tasks. The owner retains all property-management, rental, financial and legal authority.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Dated photographs", "Written visit notes", "Authorized vendor access", "Prompt escalation"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#061B33]">
                <CheckCircle2 className="h-5 w-5 text-[#1E9C73]" /> {item}
              </div>
            ))}
          </div>
          <Button variant="navy" onClick={() => onOpen("property-field-services")}>View Property Field Services <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Home inspections</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#061B33] md:text-4xl">Eleven inspection options built around different property decisions</h2>
            <p className="leading-8 text-slate-600">
              From a full buyer inspection to thermal moisture assessment, irrigation, pool and spa reviews and custom rental arrival/departure documentation, each scope is explained clearly before the inspection begins.
            </p>
            <Button onClick={() => onOpen("home-inspections")}>Compare Inspection Services <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {inspectionTypes.slice(0, 4).map((inspection) => (
              <div key={inspection.id} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                <inspection.icon className="h-6 w-6 text-[#1268D5]" />
                <h3 className="mt-4 font-bold text-[#061B33]">{inspection.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{inspection.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Operations, technology and digital services"
          title="Additional capabilities arranged in your preferred order"
          description="ATS can also improve workflows, install and support technology, create training resources, develop websites and build practical automation, AI and application solutions."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {remainingServices.map((service) => <ServiceCard key={service.id} service={service} onOpen={onOpen} />)}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <Card className="p-7 md:p-9">
          <ShieldCheck className="h-9 w-9 text-[#1268D5]" />
          <h2 className="mt-5 text-2xl font-bold text-[#061B33]">Scope clarity is part of the service</h2>
          <p className="mt-4 leading-7 text-slate-600">
            ATS defines what will be inspected, observed, installed, coordinated or completed before work begins. When a task requires a licensed contractor, engineer, pest professional or specialty trade, that boundary is communicated and the appropriate provider category is identified.
          </p>
        </Card>
        <Card className="bg-[#061B33] p-7 text-white md:p-9">
          <Search className="h-9 w-9 text-[#77D7CF]" />
          <h2 className="mt-5 text-2xl font-bold">A deeper local provider resource</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Our internal Hawaiʻi Island directory contains 580 researched entries representing 316 unique providers across 39 separated service families, with East and West Hawaiʻi coverage and a documented verification process.
          </p>
          <Button variant="light" className="mt-6" onClick={() => onOpen("vendor-coordination")}>Explore Vendor Coordination</Button>
        </Card>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-[#0B2B4D] to-[#1268D5] px-7 py-12 text-white md:px-11">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Start with the actual need</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Tell us what is happening at the property or in the operation.</h2>
            <p className="mt-4 leading-7 text-blue-100">ATS will help identify the appropriate inspection, field service, provider category or technical solution and prepare a clear next step.</p>
          </div>
          <Button variant="light" size="lg" onClick={() => onOpen("contact")}>Request a Consultation <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </section>
    </div>
  );
}

function InspectionCard({ inspection, onSelect }) {
  const Icon = inspection.icon;
  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <img src={inspection.image} alt={`${inspection.title} service`} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
        <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#1268D5] text-white shadow-lg">
          <Icon className="h-5 w-5" />
        </div>
        {inspection.badge && <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0D57B5] shadow">Add-on option</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-6 text-[#061B33]">{inspection.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{inspection.short}</p>
        <button onClick={() => onSelect(inspection.id)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1268D5] hover:text-[#0D57B5]">
          View details <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}

function HomeInspectionsPage({ onOpen }) {
  const [selectedInspection, setSelectedInspection] = useState("full-residential");
  const selected = inspectionTypes.find((item) => item.id === selectedInspection) || inspectionTypes[0];

  const selectInspection = (id) => {
    setSelectedInspection(id);
    window.setTimeout(() => document.getElementById("inspection-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="overflow-hidden rounded-[2rem] bg-[#061B33] text-white shadow-2xl">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="px-7 py-12 md:px-11 lg:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77D7CF]">Home inspections</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Thorough. Impartial. Insightful.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Protect your investment and make more informed decisions with a detailed, visual and non-invasive inspection of readily accessible residential systems and components.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Independent documentation", text: "Findings are based on observed conditions—not the outcome of a sale." },
                { icon: Thermometer, title: "Advanced tools", text: "Thermal imaging and moisture measurements are used when appropriate." },
                { icon: FileText, title: "Clear reporting", text: "Photographs, priorities, limitations and practical recommendations." },
                { icon: MapPin, title: "Hawaiʻi Island context", text: "Local awareness of moisture, corrosion, drainage, pests and island logistics." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#77D7CF]" />
                  <div><p className="font-bold">{title}</p><p className="mt-1 text-sm leading-6 text-slate-300">{text}</p></div>
                </div>
              ))}
            </div>
            <Button variant="light" size="lg" className="mt-8" onClick={() => onOpen("contact")}>Request an Inspection Quote</Button>
          </div>
          <div className="relative min-h-[420px]">
            <img src="/images/inspection-hero.jpg" alt="Hawaiʻi Island home representing residential inspection services" className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061B33]/55 to-transparent" />
          </div>
        </div>
      </section>

      <section className="space-y-9">
        <SectionHeading
          eyebrow="Inspection services"
          title="Choose the inspection that matches the decision you need to make"
          description="Every service begins with a defined scope. Select any option to review who it is for, what is normally included and what the final deliverable explains."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {inspectionTypes.map((inspection) => <InspectionCard key={inspection.id} inspection={inspection} onSelect={selectInspection} />)}
        </div>
      </section>

      <section id="inspection-detail" className="scroll-mt-32 overflow-hidden rounded-[2rem] border border-blue-100 bg-blue-50/60">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[360px] lg:min-h-full">
            <img src={selected.image} alt={`${selected.title} detail`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#1268D5] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Selected service</span>
              {selected.badge && <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-[#0D57B5]">{selected.badge}</span>}
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#061B33]">{selected.title}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{selected.short}</p>
            <div className="mt-7 rounded-xl border border-white bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1268D5]">Best for</p>
              <p className="mt-2 leading-7 text-slate-700">{selected.bestFor}</p>
            </div>
            <div className="mt-7">
              <h3 className="text-xl font-bold text-[#061B33]">Typical scope</h3>
              <div className="mt-4 grid gap-3">
                {selected.includes.map((item) => (
                  <div key={item} className="flex gap-3 text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E9C73]" /><span className="leading-6">{item}</span></div>
                ))}
              </div>
            </div>
            <div className="mt-7 rounded-xl bg-[#061B33] p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#77D7CF]">What you receive</p>
              <p className="mt-2 leading-7 text-slate-200">{selected.deliverable}</p>
            </div>
            <Button className="mt-7" onClick={() => onOpen("contact")}>Request This Inspection <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-100 bg-emerald-50 px-7 py-10 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Bundled add-on options</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33]">Add targeted systems to another inspection</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Moisture and water-intrusion, irrigation and pool/spa inspections may be quoted at a reduced bundled rate when performed during another qualifying inspection. Pricing depends on property size, system complexity, access, travel and the requested scope.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {inspectionTypes.filter((item) => item.badge).map((item) => (
              <button key={item.id} onClick={() => selectInspection(item.id)} className="rounded-2xl border border-white bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <item.icon className="h-7 w-7 text-emerald-700" />
                <h3 className="mt-4 font-bold text-[#061B33]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.short}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-9">
        <SectionHeading eyebrow="Your inspection report" title="Organized to support action—not confusion" description="The report explains what was observed, why it matters, what could not be inspected and what type of follow-up should be considered." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Red — High / Immediate", text: "Urgent safety, active-damage or high-consequence conditions that warrant prompt action or specialist evaluation." },
            { title: "Yellow — Medium / Soon", text: "Conditions requiring repair, maintenance, further evaluation or planning in the near term." },
            { title: "Green — Okay / Monitor", text: "Serviceable conditions, routine maintenance items and components that should continue to be monitored." },
            { title: "Limitations & referrals", text: "Inaccessible, shut-down or unsafe components are documented, along with the appropriate specialist category when needed." },
          ].map((item) => (
            <Card key={item.title} className="p-6"><h3 className="text-lg font-bold text-[#061B33]">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.text}</p></Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-7 text-amber-950">
        <strong>Inspection scope and limitations:</strong> Residential inspections are visual and non-invasive reviews of readily accessible components at the time of inspection. They are not warranties, guarantees, destructive investigations, engineering analyses, environmental assessments, licensed pest certifications, appraisals or comprehensive code-compliance inspections. Concealed, inaccessible, shut-down, unsafe or excluded components may not be inspected.
      </section>

      <section className="rounded-[2rem] bg-[#061B33] px-8 py-11 text-white">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl"><h2 className="text-3xl font-bold">Ready to discuss the property and inspection timing?</h2><p className="mt-4 leading-7 text-slate-300">Include the property location, approximate size, property type, desired date and whether you are buying, selling, maintaining or requesting a targeted inspection.</p></div>
          <Button variant="light" size="lg" onClick={() => onOpen("contact")}>Book a Service</Button>
        </div>
      </section>
    </div>
  );
}

function VendorCoordinationPage({ onOpen }) {
  const ratingBands = [
    { score: "90–100", label: "Exceptional", text: "Best combined quality, reputation and relative value evidence." },
    { score: "85–89", label: "Strong", text: "Very good option with limited material concerns in the available evidence." },
    { score: "78–84", label: "Good", text: "Credible candidate; compare scope, references and current availability." },
    { score: "70–77", label: "Compare", text: "Scope fit may exist, but licensing, review evidence or value requires closer comparison." },
    { score: "Below 70", label: "Provisional", text: "Use only after enhanced verification and recent comparable references." },
  ];
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="overflow-hidden rounded-[2rem] bg-[#061B33] text-white shadow-2xl">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="px-7 py-12 md:px-11 lg:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77D7CF]">Vendor coordination</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">The right provider category. Researched. Compared. Verified again.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              ATS maintains a detailed internal referral research directory for Hawaiʻi Island. We use it to identify appropriate provider families, compare available evidence and support owner-authorized communication, scheduling, access and project documentation.
            </p>
            <Button variant="light" size="lg" className="mt-8" onClick={() => onOpen("contact")}>Request Vendor Assistance</Button>
          </div>
          <div className="relative min-h-[420px]">
            <img src="/images/vendor-coordination-hero.jpg" alt="Vendor coordination meeting and project documentation" className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061B33]/55 to-transparent" />
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { value: "580", label: "Directory entries" },
          { value: "316", label: "Unique providers" },
          { value: "39", label: "Separated families" },
          { value: "285", label: "East entries" },
          { value: "295", label: "West entries" },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 text-center"><p className="text-4xl font-bold text-[#1268D5]">{stat.value}</p><p className="mt-2 text-sm font-semibold text-slate-600">{stat.label}</p></Card>
        ))}
      </section>

      <section className="space-y-9">
        <SectionHeading eyebrow="How ATS uses the directory" title="A structured research and coordination process" description="A directory entry is a starting point—not an endorsement. Every project is matched to the exact scope, location and risk involved, and regulated work requires current verification before a provider name is presented." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            { n: "01", title: "Define the actual scope", text: "Clarify the visible concern, desired outcome, location, timing, access and whether regulated work may be involved." },
            { n: "02", title: "Select the provider family", text: "Match the need to the separated licensing, skill and risk category rather than relying on a broad search term." },
            { n: "03", title: "Review location and service evidence", text: "Confirm a Hawaiʻi Island address or documented Big Island service path and compare East/West availability and travel considerations." },
            { n: "04", title: "Evaluate quality-to-value evidence", text: "Review credential fit, local service confidence, reputation evidence, sample confidence and relative value position." },
            { n: "05", title: "Verify current status", text: "Complete a same-day MyPVL and complaint/disciplinary check, confirm exact classification, insurance, permits and responsible licensee." },
            { n: "06", title: "Support the client’s decision", text: "Coordinate proposals, communication, scheduling, access and documentation while the client selects the provider and approves scope and cost." },
          ].map((step) => (
            <Card key={step.n} className="p-6"><p className="text-sm font-black tracking-[0.18em] text-[#1268D5]">{step.n}</p><h3 className="mt-3 text-xl font-bold text-[#061B33]">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.text}</p></Card>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-50 px-7 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Quality-to-value methodology</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33]">What an internal rating is based on</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The rating is an editorial comparison aid. It does not guarantee performance and does not replace current license, insurance, scope, reference, proposal or warranty review.
            </p>
            <div className="mt-6 space-y-3">
              {[
                ["50%", "License, credential and exact-scope evidence"],
                ["20%", "Hawaiʻi Island service and contact confidence"],
                ["20%", "Reputation evidence and review-sample confidence"],
                ["10%", "Relative value position"],
              ].map(([value, text]) => (
                <div key={value} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4"><span className="text-xl font-black text-[#1268D5]">{value}</span><span className="leading-6 text-slate-700">{text}</span></div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ratingBands.map((band) => (
              <Card key={band.label} className="p-5"><div className="flex items-baseline justify-between gap-3"><h3 className="font-bold text-[#061B33]">{band.label}</h3><span className="text-sm font-black text-[#1268D5]">{band.score}</span></div><p className="mt-3 text-sm leading-6 text-slate-600">{band.text}</p></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-9">
        <SectionHeading eyebrow="Provider coverage" title="Thirty-nine separated provider families" description="Families are separated whenever licensing, skill, risk or the client’s decision differs. This prevents a general provider search from being treated as proof that a business is qualified for the exact work." />
        <div className="grid gap-6 lg:grid-cols-2">
          {providerFamilyGroups.map((group) => (
            <Card key={group.title} className="p-6 md:p-7">
              <h3 className="text-xl font-bold text-[#061B33]">{group.title}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {group.families.map((family) => <div key={family} className="flex gap-3 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1E9C73]" /><span>{family}</span></div>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <Card className="p-7 md:p-9">
          <h2 className="text-2xl font-bold text-[#061B33]">Price tiers are planning positions—not quotes</h2>
          <div className="mt-6 space-y-4">
            {[
              ["$", "Value-oriented", "Small/local provider, focused scope or lower overhead. Compare complete written scope and total project price."],
              ["$$", "Typical local market", "Established local provider with balanced service, process and availability. Obtain comparable written proposals."],
              ["$$$", "Premium / specialty", "Higher specialization, stronger process or complex materials and systems. Confirm the named specialist."],
              ["$$$$", "Engineering / major project", "Design, structural, site, large-loss, luxury, multi-trade or high-liability scope requiring defined professional deliverables."],
            ].map(([symbol, title, text]) => (
              <div key={symbol} className="grid grid-cols-[48px_1fr] gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"><span className="text-2xl font-black text-[#1268D5]">{symbol}</span><div><p className="font-bold text-[#061B33]">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div></div>
            ))}
          </div>
        </Card>
        <Card className="bg-[#061B33] p-7 text-white md:p-9">
          <ShieldCheck className="h-9 w-9 text-[#77D7CF]" />
          <h2 className="mt-5 text-2xl font-bold">Non-negotiable checks before a regulated referral</h2>
          <div className="mt-6 space-y-4">
            {[
              "Exact legal entity, credential and classification match",
              "Current status and complaint/disciplinary history",
              "Insurance, permits, subcontractors and named licensees",
              "Town, travel charge, availability and response time",
              "Written scope, exclusions, itemized price and change-order method",
              "Schedule, payment, cleanup, warranty and recent references",
            ].map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#77D7CF]" /><span className="leading-6 text-slate-200">{item}</span></div>)}
          </div>
        </Card>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-7 text-amber-950">
        <strong>Professional boundary:</strong> The directory is a dated research resource, not an endorsement, guarantee, warranty or direction to hire. ATS does not accept referral compensation, select a provider on the client’s behalf, guarantee third-party work or use an unconfirmed license for regulated work. Provider ratings, availability, licensing, insurance, reviews and pricing can change and must be checked for the specific project.
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-[#0B2B4D] to-[#1268D5] px-8 py-11 text-white">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div className="max-w-3xl"><h2 className="text-3xl font-bold">Need the right provider category for a property concern?</h2><p className="mt-4 leading-7 text-blue-100">Share the issue, location, desired outcome and timing. ATS can review the appropriate provider family and explain the verification and coordination process.</p></div><Button variant="light" size="lg" onClick={() => onOpen("contact")}>Request Vendor Assistance</Button></div>
      </section>
    </div>
  );
}

function GenericServicePage({ service, onOpen }) {
  const Icon = service.icon;
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-7">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.accent}`}><Icon className="h-7 w-7" /></div>
          <div className="space-y-4"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Service</p><h1 className="text-4xl font-bold tracking-tight text-[#061B33] md:text-5xl">{service.title}</h1><p className="text-xl leading-8 text-slate-600">{service.hero}</p></div>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">{service.overview}</p>
          <div className="flex flex-wrap gap-3"><Button onClick={() => onOpen("contact")}>Request a Consultation</Button><Button variant="outline" onClick={() => onOpen("home")}>Back to Home</Button></div>
        </div>
        {service.image ? (
          <div className="overflow-hidden rounded-[2rem] shadow-xl"><img src={service.image} alt={`${service.title} service`} className="aspect-[16/10] w-full object-cover" loading="eager" /></div>
        ) : (
          <Card className="bg-[#061B33] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77D7CF]">What clients gain</p>
            <div className="mt-6 space-y-4">{service.outcomes.map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#77D7CF]" /><span className="leading-6 text-slate-200">{item}</span></div>)}</div>
          </Card>
        )}
      </section>

      {service.image && <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{service.outcomes.map((item) => <Card key={item} className="p-5"><CheckCircle2 className="h-6 w-6 text-[#1E9C73]" /><p className="mt-3 font-bold text-[#061B33]">{item}</p></Card>)}</section>}

      <section className="space-y-8">
        <SectionHeading eyebrow="Examples" title="How this service can help" description="Every engagement is tailored to the property, equipment, workflow, users and desired result." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{service.examples.map((example) => <Card key={example.title} className="p-6"><h3 className="text-xl font-bold text-[#061B33]">{example.title}</h3><p className="mt-3 leading-7 text-slate-600">{example.description}</p></Card>)}</div>
      </section>

      {service.details && <section className="rounded-[2rem] border border-blue-100 bg-blue-50 px-7 py-10 md:px-10"><SectionHeading eyebrow="Service approach" title="What the engagement includes" description="The exact deliverables are confirmed in the written scope before work begins." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{service.details.map((detail) => <Card key={detail.title} className="p-6"><h3 className="text-xl font-bold text-[#061B33]">{detail.title}</h3><p className="mt-3 leading-7 text-slate-600">{detail.description}</p></Card>)}</div></section>}

      {service.exclusions && <section className="space-y-8"><SectionHeading eyebrow="Scope boundaries" title="Activities outside this service" description="These decisions and regulated activities must remain with the owner or an appropriately licensed professional." /><div className="grid gap-4 md:grid-cols-2">{service.exclusions.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"><X className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" /><span className="leading-6 text-slate-700">{item}</span></div>)}</div></section>}

      {service.disclaimer && <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-7 text-amber-950"><strong>Important:</strong> {service.disclaimer}</section>}

      <section className="rounded-[2rem] bg-[#061B33] px-8 py-11 text-white"><div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div className="max-w-3xl"><h2 className="text-3xl font-bold">Need help with {service.shortTitle.toLowerCase()}?</h2><p className="mt-4 leading-7 text-slate-300">Describe the property, equipment, workflow or project and the result you are trying to achieve. ATS will review the scope and discuss the most practical next step.</p></div><Button variant="light" size="lg" onClick={() => onOpen("contact")}>Request Service</Button></div></section>
    </div>
  );
}

function AboutPage({ onOpen }) {
  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-[2rem] bg-[#061B33] text-white">
        <div className="grid gap-10 px-7 py-12 md:px-11 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-14">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77D7CF]">About Aloha Technology Services LLC</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Built from local experience across property operations, hands-on work and technology.</h1>
            <p className="text-lg leading-8 text-slate-300">Aloha Technology Services LLC was founded by Kenyon “Koa” Smith to combine detailed property documentation, practical field support, vendor coordination, operational improvement and technology implementation for Hawaiʻi Island clients.</p>
            <Button variant="light" onClick={() => onOpen("contact")}>Discuss Your Project <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10">
            <img src={FOUNDER_PORTRAIT} alt="Kenyon Koa Smith, founder of Aloha Technology Services LLC" className="aspect-[5/4] w-full object-cover" loading="eager" />
            <div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#77D7CF]">Founder</p><h2 className="mt-1 text-2xl font-bold">Kenyon “Koa” Smith</h2><p className="mt-3 leading-7 text-slate-300">Hawaiʻi Island operations professional, technical problem-solver and owner of ATS.</p></div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-7 md:p-9"><h2 className="text-3xl font-bold text-[#061B33]">A career built around practical responsibility</h2><div className="mt-5 space-y-4 leading-8 text-slate-600"><p>Koa grew up in Waimea, graduated from Parker School and earned a Bachelor’s Degree from the University of Hawaiʻi at Mānoa before returning home to build his career.</p><p>His hands-on background includes apprentice-level and supervised electrical work, irrigation-system installation and troubleshooting, landscaping and grounds support, flooring installation and detailed finish work. His later career expanded into luxury residential and resort operations involving property readiness, inspections, maintenance planning, owner communication, guest service, vendor coordination, budgeting, documentation and quality control.</p><p>Across those roles, Koa supported more than 50 high-value residences, coordinated with over 60 local vendors and helped manage thousands of guest arrivals and departures. He also developed inspection standards, SOPs, training materials, damage-tracking systems and operational tools.</p></div></Card>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { icon: Home, title: "Property operations", text: "Inspection, readiness, maintenance coordination, documentation and owner communication." },
            { icon: Wrench, title: "Hands-on foundation", text: "Supervised electrical exposure, irrigation, landscaping support, flooring and finish work." },
            { icon: Users, title: "Vendor coordination", text: "Proposal review, scheduling, access, project documentation and local-provider relationships." },
            { icon: Workflow, title: "Processes and training", text: "SOPs, checklists, inspection standards, training resources and operational improvement." },
            { icon: Laptop, title: "Technology systems", text: "Websites, applications, automation, AI, reporting, connectivity and user support." },
            { icon: MapPin, title: "Local commitment", text: "Raised on Hawaiʻi Island with an understanding of island logistics and long-term relationships." },
          ].map(({ icon: Icon, title, text }) => <Card key={title} className="p-6"><Icon className="h-7 w-7 text-[#1268D5]" /><h3 className="mt-4 text-xl font-bold text-[#061B33]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></Card>)}
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-blue-50 px-7 py-10 md:px-10"><SectionHeading eyebrow="The operating standard" title="Clear scope, factual documentation and dependable follow-through" description="ATS begins by understanding the actual problem, the people involved, the property or operational environment and the desired result. The service is then defined around those needs rather than forcing every project into the same package." /><div className="mt-8 grid gap-4 md:grid-cols-3">{["Define what ATS will and will not do", "Document observations and decisions clearly", "Refer regulated work to qualified professionals"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-white bg-white p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E9C73]" /><span className="font-semibold leading-6 text-[#061B33]">{item}</span></div>)}</div></section>
    </div>
  );
}

function ContactPage() {
  const [state, handleSubmit] = useForm(FORM_ID);
  const [projectType, setProjectType] = useState("");
  const inspectionOptions = inspectionTypes.map((inspection) => `Home Inspection — ${inspection.title}`);
  const projectOptions = [
    "Property Field Services",
    ...inspectionOptions,
    "Vendor Coordination",
    "Handyman Services",
    "Workflow Optimization",
    "Technology Installation",
    "Training and Support",
    "Website Development",
    "Insight & Analysis",
    "Automation Development",
    "AI Implementation",
    "Application Development",
    "Other",
  ];
  return (
    <div className="space-y-12">
      <SectionHeading eyebrow="Contact" title="Tell us about the property, project or operational need" description="Share the location, desired outcome, timing and any known conditions. ATS will review the request and follow up about scope, availability and the most practical next step." />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#061B33]">Request service or a consultation</h2>
          <p className="mt-2 leading-7 text-slate-600">Pricing is determined case by case. A written proposal or inspection quote is provided when appropriate.</p>
          {state.succeeded ? (
            <div className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-lg font-bold text-emerald-950">Mahalo. Your message was sent.</h3><p className="mt-2 leading-7 text-emerald-800">ATS will review the details and follow up as soon as possible.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-700">Full name</label><input id="name" type="text" name="name" required className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1268D5] focus:ring-2 focus:ring-blue-100" /></div>
                <div><label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">Email</label><input id="email" type="email" name="email" required className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1268D5] focus:ring-2 focus:ring-blue-100" /><ValidationError prefix="Email" field="email" errors={state.errors} /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label htmlFor="phone" className="mb-2 block text-sm font-bold text-slate-700">Phone number</label><input id="phone" type="tel" name="phone" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1268D5] focus:ring-2 focus:ring-blue-100" /></div>
                <div><label htmlFor="projectType" className="mb-2 block text-sm font-bold text-slate-700">Service requested</label><select id="projectType" name="projectType" required value={projectType} onChange={(event) => setProjectType(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#1268D5] focus:ring-2 focus:ring-blue-100"><option value="" disabled>Select a service</option>{projectOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
              </div>
              {projectType === "Property Field Services" && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-950"><strong>Scope note:</strong> Property Field Services are owner-directed onsite services only. ATS does not provide property management, caretaker or custodian services, leasing, tenant placement, rent handling or landlord-tenant representation.</div>}
              {projectType.startsWith("Home Inspection") && <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-950"><strong>Helpful details:</strong> Include the property address or area, property type, approximate square footage, occupied or vacant status, desired date and any known areas of concern.</div>}
              <div className="grid gap-4 md:grid-cols-2"><div><label htmlFor="contactMethod" className="mb-2 block text-sm font-bold text-slate-700">Preferred contact method</label><select id="contactMethod" name="contactMethod" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"><option>Email</option><option>Phone</option><option>Text</option></select></div><div><label htmlFor="timeline" className="mb-2 block text-sm font-bold text-slate-700">Desired timeline</label><select id="timeline" name="timeline" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"><option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–3 months</option><option>Planning / gathering information</option></select></div></div>
              <div><label htmlFor="location" className="mb-2 block text-sm font-bold text-slate-700">Property or project location</label><input id="location" type="text" name="location" placeholder="Example: Waikoloa, Waimea, Kona or Hilo" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1268D5] focus:ring-2 focus:ring-blue-100" /></div>
              <div><label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-700">Project details</label><textarea id="message" name="message" rows="8" required placeholder="Describe the property, observed concern, requested service, desired result and timing." className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1268D5] focus:ring-2 focus:ring-blue-100" /><ValidationError prefix="Message" field="message" errors={state.errors} /></div>
              <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />
              <Button type="submit" size="lg" disabled={state.submitting}>{state.submitting ? "Sending..." : "Send Request"}</Button>
            </form>
          )}
        </Card>
        <div className="space-y-6">
          <Card className="bg-[#061B33] p-7 text-white"><h2 className="text-2xl font-bold">Contact information</h2><p className="mt-3 leading-7 text-slate-300">Serving homeowners, property owners, businesses, vacation-rental stakeholders and operational teams across Hawaiʻi Island.</p><div className="mt-6 space-y-5"><div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 text-[#77D7CF]" /><a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white">{COMPANY_EMAIL}</a></div><div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-[#77D7CF]" /><a href={`tel:${COMPANY_PHONE_HREF}`} className="hover:text-white">{COMPANY_PHONE}</a></div><div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[#77D7CF]" /><span>Locally owned and operated on Hawaiʻi Island</span></div></div></Card>
          <Card className="p-7"><h2 className="text-xl font-bold text-[#061B33]">What happens next?</h2><div className="mt-5 space-y-4">{["ATS reviews the service request and location.", "We follow up with questions or schedule a site review when needed.", "The scope, limitations, timing and pricing approach are confirmed.", "A written proposal or inspection quote is provided when applicable."].map((item, index) => <div key={item} className="flex gap-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-[#1268D5]">{index + 1}</div><p className="pt-1 leading-6 text-slate-600">{item}</p></div>)}</div></Card>
        </div>
      </div>
    </div>
  );
}

export default function TechnicalSolutionsCompanyWebsite() {
  const [activePage, setActivePage] = useState(() => pageFromPath(window.location.pathname));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const activeService = useMemo(() => services.find((service) => service.id === activePage), [activePage]);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(pageFromPath(window.location.pathname));
      setMobileOpen(false);
      setServicesOpen(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const seo = PAGE_SEO[activePage] || PAGE_SEO.home;
    const canonicalUrl = `${SITE_URL}${pathForPage(activePage)}`;
    const socialImageUrl = `${SITE_URL}${seo.image || SOCIAL_IMAGE}`;
    document.title = seo.title;

    const setMeta = (selector, attribute, value, content) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', "name", "description", seo.description);
    setMeta('meta[name="robots"]', "name", "robots", "index, follow, max-image-preview:large");
    setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    setMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", socialImageUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", socialImageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [activePage]);

  const openPage = (page) => {
    const nextPath = pathForPage(page);
    if (normalizePath(window.location.pathname) !== nextPath) {
      window.history.pushState({ page }, "", nextPath);
    }
    setActivePage(page);
    setMobileOpen(false);
    setServicesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    if (activePage === "home") return <HomePage onOpen={openPage} />;
    if (activePage === "home-inspections") return <HomeInspectionsPage onOpen={openPage} />;
    if (activePage === "vendor-coordination") return <VendorCoordinationPage onOpen={openPage} />;
    if (activePage === "about") return <AboutPage onOpen={openPage} />;
    if (activePage === "contact") return <ContactPage />;
    if (activeService) return <GenericServicePage service={activeService} onOpen={openPage} />;
    return <HomePage onOpen={openPage} />;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061B33] text-white shadow-lg">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-4 py-2 sm:px-6 lg:px-8">
          <button onClick={() => openPage("home")} className="flex min-w-0 items-center" aria-label="Return to the Aloha Technology Services LLC homepage">
            <img src={LOGO} alt="Aloha Technology Services LLC" className="h-16 w-auto max-w-[250px] object-contain sm:max-w-[300px]" loading="eager" fetchPriority="high" />
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            <button onClick={() => openPage("home")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${activePage === "home" ? "bg-white/15 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>Home</button>
            <div className="relative">
              <button onClick={() => setServicesOpen((value) => !value)} className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${activeService && !["home-inspections", "vendor-coordination"].includes(activePage) ? "bg-white/15 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>Services <ChevronDown className="h-4 w-4" /></button>
              {servicesOpen && (
                <div className="absolute left-0 top-12 w-[760px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl">
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#1268D5]">Services in preferred order</p>
                  <div className="grid gap-2 md:grid-cols-2">{services.map((service, index) => <button key={service.id} onClick={() => openPage(service.id)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-[#061B33]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-[#1268D5]">{index + 1}</span>{service.shortTitle}</button>)}</div>
                </div>
              )}
            </div>
            <button onClick={() => openPage("home-inspections")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${activePage === "home-inspections" ? "bg-white/15 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>Home Inspections</button>
            <button onClick={() => openPage("vendor-coordination")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${activePage === "vendor-coordination" ? "bg-white/15 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>Vendor Coordination</button>
            <button onClick={() => openPage("about")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${activePage === "about" ? "bg-white/15 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>About</button>
            <button onClick={() => openPage("contact")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${activePage === "contact" ? "bg-white/15 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>Contact</button>
            <Button size="sm" onClick={() => openPage("contact")}>Book an Inspection</Button>
          </nav>

          <button className="rounded-lg border border-white/20 p-2 lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#061B33] lg:hidden">
            <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">
              <button onClick={() => openPage("home")} className="block w-full rounded-xl bg-white/10 px-4 py-3 text-left font-semibold">Home</button>
              <details className="rounded-xl bg-white/10"><summary className="cursor-pointer px-4 py-3 font-semibold">Services</summary><div className="space-y-1 px-3 pb-3">{services.map((service, index) => <button key={service.id} onClick={() => openPage(service.id)} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/10"><span className="mr-2 text-[#77D7CF]">{index + 1}.</span>{service.shortTitle}</button>)}</div></details>
              <button onClick={() => openPage("about")} className="block w-full rounded-xl bg-white/10 px-4 py-3 text-left font-semibold">About</button>
              <button onClick={() => openPage("contact")} className="block w-full rounded-xl bg-[#1268D5] px-4 py-3 text-left font-semibold">Contact / Book an Inspection</button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <nav aria-label="All website pages" className="sr-only">
          <a href="/">Home</a><a href="/about">About</a><a href="/contact">Contact</a>{services.map((service) => <a key={service.id} href={pathForPage(service.id)}>{service.title}</a>)}
        </nav>
        {renderPage()}
      </main>

<footer className="mt-20 bg-[#061B33] text-white">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1.15fr_0.6fr]">
      <div>
        <img
          src={LOGO}
          alt="Aloha Technology Services LLC"
          className="h-24 w-auto max-w-full object-contain object-left"
          loading="lazy"
        />
        <p className="mt-5 max-w-xl leading-7 text-slate-300">
          Locally owned and operated on Hawaiʻi Island. Property field services,
          home inspections, vendor coordination, handyman support, operations
          and practical technology solutions.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="text-blue-200 hover:text-white"
          >
            {COMPANY_EMAIL}
          </a>
          <a
            href={`tel:${COMPANY_PHONE_HREF}`}
            className="text-blue-200 hover:text-white"
          >
            {COMPANY_PHONE}
          </a>
        </div>
      </div>

      <div>
        <h2 className="font-bold">Priority services</h2>
        <div className="mt-4 space-y-3">
          {services.slice(0, 4).map((service) => (
            <button
              key={service.id}
              onClick={() => openPage(service.id)}
              className="block text-left text-sm text-slate-300 transition hover:text-white"
            >
              {service.title}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold">Specialized services</h2>
        <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {services.slice(4).map((service) => (
            <button
              key={service.id}
              onClick={() => openPage(service.id)}
              className="block text-left text-sm text-slate-300 transition hover:text-white"
            >
              {service.title}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold">Company</h2>
        <div className="mt-4 space-y-3">
          <button
            onClick={() => openPage("home")}
            className="block text-sm text-slate-300 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => openPage("about")}
            className="block text-sm text-slate-300 hover:text-white"
          >
            About
          </button>
          <button
            onClick={() => openPage("contact")}
            className="block text-sm text-slate-300 hover:text-white"
          >
            Contact
          </button>
        </div>
      </div>
    </div>

    <div className="mt-10 border-t border-white/10 pt-6 text-sm leading-6 text-slate-400">
      © 2026 {COMPANY_NAME}. Service availability, scope and pricing are confirmed
      project by project. Third-party providers perform work under their own
      licensing, insurance, terms and warranties.
    </div>
  </div>
</footer>
      <AlohaAssistant onNavigate={openPage} />
    </div>
  );
}
