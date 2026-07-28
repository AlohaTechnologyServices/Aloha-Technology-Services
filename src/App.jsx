import { useForm, ValidationError } from "@formspree/react";
import AlohaAssistant from "./AlohaAssistant";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, Bot, Building2, CheckCircle2, ChevronDown, Code2,
  Globe2, Hammer, Home, Laptop, Mail, MapPin, Menu, Network, Phone, PlayCircle,
  Smartphone, Users, Video, Wifi, Workflow, X, Zap
} from "lucide-react";

const COMPANY_NAME = "Aloha Technology Services LLC";
const COMPANY_EMAIL = "hawaiiats@gmail.com";
const COMPANY_PHONE = "+1 808 443 7148";
const COMPANY_PHONE_HREF = "+18084437148";
const FORM_ID = "mnjlpyya";

const SITE_URL = "https://atshawaii.vercel.app";
const DEFAULT_SOCIAL_IMAGE = "/images/aloha-technology-services-header-banner.png";
const FOUNDER_PORTRAIT = "/images/kenyon-koa-smith-about.webp";

const PAGE_PATHS = {
  home: "/",
  about: "/about",
  contact: "/contact",
  "application-development": "/services/application-development",
  "technology-installation": "/services/technology-installation",
  "training-support": "/services/training-support",
  "website-development": "/services/website-development",
  "automation-development": "/services/automation-development",
  "ai-implementation": "/services/ai-implementation",
  "workflow-optimization": "/services/workflow-optimization",
  "business-insight": "/services/business-insight",
  "vendor-coordination": "/services/vendor-coordination",
  "handyman-services": "/services/handyman-services",
  "home-inspections": "/services/home-inspections",
  "property-field-services": "/services/property-field-services",
};

const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page])
);

const PAGE_SEO = {
  home: {
    title: "Aloha Technology Services LLC | Technology, AI, Websites & Property Services",
    description:
      "Locally owned Hawaiʻi Island company providing website development, automation, AI implementation, technology installation, residential home inspections, owner-directed property field services, workflow improvement, vendor coordination, and handyman services.",
  },
  about: {
    title: "About Koa Smith | Aloha Technology Services LLC",
    description:
      "Meet Kenyon “Koa” Smith and learn how his college education, supervised electrical work, irrigation experience, flooring installation, luxury property operations, technology, and process improvement shape Aloha Technology Services LLC.",
    image: FOUNDER_PORTRAIT,
  },
  contact: {
    title: "Contact Aloha Technology Services LLC | Request a Consultation",
    description:
      "Contact Aloha Technology Services LLC to discuss owner-directed property field services, a residential home inspection, website, automation, AI, technology, business, vendor coordination, or handyman project on Hawaiʻi Island.",
  },
  "application-development": {
    title: "Application Development & Implementation | Aloha Technology Services LLC",
    description:
      "Custom applications, internal dashboards, third-party software implementation, and process modernization for Hawaiʻi Island businesses.",
  },
  "technology-installation": {
    title: "Technology Installation & Refresh Services | Hawaiʻi Island",
    description:
      "TV installation, mesh Wi-Fi, connected devices, office equipment, internet-provider coordination, and technology refresh services for homes and businesses.",
  },
  "training-support": {
    title: "Training Videos & Technology Support | Hawaiʻi Island",
    description:
      "Practical employee training videos, homeowner instructions, system walkthroughs, documentation, and technology support resources.",
  },
  "website-development": {
    title: "Website Development for Hawaiʻi Island Businesses",
    description:
      "Professional responsive website development, website redesigns, landing pages, integrations, and lead-generation forms for businesses and personal projects.",
  },
  "automation-development": {
    title: "Business & Personal Automation Development | Hawaiʻi Island",
    description:
      "Custom automation for repetitive tasks, customer follow-up, reporting, approvals, reminders, data handling, and personal productivity.",
  },
  "ai-implementation": {
    title: "Practical AI Implementation for Hawaiʻi Businesses",
    description:
      "Responsible AI implementation for customer support, document processing, reporting, internal knowledge, administration, and cost reduction.",
  },
  "workflow-optimization": {
    title: "Workflow Optimization & SOP Development | Hawaiʻi Island",
    description:
      "Business workflow analysis, process redesign, SOP development, improved handoffs, and operational efficiency consulting.",
  },
  "business-insight": {
    title: "Business Insight, Reporting & Operational Analysis | Hawaiʻi Island",
    description:
      "Actionable business reporting, operational analysis, dashboards, trend reviews, and decision support for Hawaiʻi Island organizations.",
  },
  "vendor-coordination": {
    title: "Vendor Coordination & Project Assistance | Hawaiʻi Island",
    description:
      "Local vendor identification, estimate coordination, scheduling, communication, project updates, and specialized trade referrals.",
  },
  "handyman-services": {
    title: "Professional Handyman Services | Hawaiʻi Island",
    description:
      "Minor repairs, installations, mounting, assembly, adjustments, property punch-list work, and manufacturer-guided support on Hawaiʻi Island.",
  },
  "property-field-services": {
    title: "Owner-Directed Property Field Services | Hawaiʻi Island",
    description:
      "Owner-directed visual property checks, photo documentation, vendor access, delivery verification, storm checks, and onsite field support for Hawaiʻi Island property owners. No leasing or property management services.",
  },
  "home-inspections": {
    title: "Home Inspections for Buyers & Sellers | Hawaiʻi Island",
    description:
      "Professional residential home inspections for buyers, sellers, and homeowners on Hawaiʻi Island, with a client-friendly report, photographs, prioritized findings, and practical recommendations.",
  },
};

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
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-[#17324D] text-white shadow-sm hover:bg-[#214765]",
    accent: "bg-[#1D84B5] text-white shadow-sm hover:bg-[#176f98]",
    outline: "border border-slate-300 bg-white text-slate-900 hover:border-[#1D84B5] hover:text-[#1D84B5]",
    light: "bg-white text-[#17324D] hover:bg-slate-100",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-[#17324D]",
  };
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-3 text-sm", lg: "px-6 py-3.5 text-base" };
  return <button onClick={onClick} className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim()} {...props}>{children}</button>;
}

const CARD_TONES = {
  light: {
    background: "#FFFFFF",
    title: "#17324D",
    text: "#475569",
    border: "rgba(203, 213, 225, 0.8)",
  },
  dark: {
    background: "#17324D",
    title: "#FFFFFF",
    text: "#CBD5E1",
    border: "rgba(23, 50, 77, 1)",
  },
  soft: {
    background: "#F2FBFB",
    title: "#17324D",
    text: "#475569",
    border: "#CBE8E7",
  },
  sand: {
    background: "#F7F3EB",
    title: "#17324D",
    text: "#475569",
    border: "#E9E0D2",
  },
};

function Card({ children, className = "", tone = "light" }) {
  const theme = CARD_TONES[tone] || CARD_TONES.light;

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        borderColor: theme.border,
        "--card-title-color": theme.title,
        "--card-text-color": theme.text,
      }}
      className={`rounded-3xl border shadow-[0_14px_45px_rgba(23,50,77,0.07)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "" }) {
  return <div className={`p-6 md:p-7 ${className}`.trim()}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`px-6 pb-6 md:px-7 md:pb-7 ${className}`.trim()}>{children}</div>;
}

function CardTitle({ children, className = "" }) {
  return (
    <h3
      style={{ color: "var(--card-title-color, #17324D)" }}
      className={`font-semibold ${className}`.trim()}
    >
      {children}
    </h3>
  );
}

function CardDescription({ children, className = "" }) {
  return (
    <p
      style={{ color: "var(--card-text-color, #475569)" }}
      className={className.trim()}
    >
      {children}
    </p>
  );
}

const services = [
  {
    id: "application-development", category: "technology", title: "Application Development & Implementation", shortTitle: "Application Development", icon: Code2, accent: "bg-blue-50 text-blue-700",
    blurb: "Custom internal tools, dashboards, and application rollouts designed around how your organization actually works.",
    hero: "Build the right tools and implement them with confidence.",
    overview: "We develop practical software and help businesses implement new applications with less disruption. Our focus is usability, adoption, and measurable operational value rather than unnecessary complexity.",
    examples: [
      { title: "Custom Operations Dashboard", description: "Centralize work orders, project updates, owner requests, and performance reporting in one practical interface." },
      { title: "Third-Party Application Rollout", description: "Configure a new platform, document workflows, train users, and support a smooth transition into daily operations." },
      { title: "Spreadsheet Process Modernization", description: "Replace fragmented spreadsheets and manual approvals with a structured, trackable internal application." },
    ],
    outcomes: ["Less manual work", "Better visibility", "Improved adoption", "Stronger operational control"],
  },
  {
    id: "technology-installation", category: "technology", title: "Technology Installation & Refresh Services", shortTitle: "Technology Installation", icon: Wifi, accent: "bg-teal-50 text-teal-700",
    blurb: "Residential and commercial technology installation, connectivity improvements, device setup, and full-property refreshes.",
    hero: "Reliable technology for homes, businesses, and managed properties.",
    overview: "We install, upgrade, and troubleshoot technology for homeowners, businesses, vacation rentals, and property managers. From new televisions and mesh Wi-Fi to connected appliances and office equipment, we help create a dependable technology environment across the entire property.",
    examples: [
      { title: "Whole-Property Connectivity Refresh", description: "Coordinate with the internet provider, assess coverage, install a mesh network, and verify reliable connectivity throughout a home or business." },
      { title: "Television & Entertainment Upgrade", description: "Install new televisions, streaming devices, accessories, and cable-management solutions for homes, offices, and vacation rentals." },
      { title: "Connected Devices & Appliances", description: "Configure smart-home devices, connected appliances, printers, displays, and shared equipment so they work together reliably." },
    ],
    outcomes: ["Improved Wi-Fi coverage", "Cleaner installations", "Fewer support issues", "Better guest and employee experiences"],
  },
  {
    id: "training-support", category: "technology", title: "Training Videos & Support", shortTitle: "Training & Support", icon: Video, accent: "bg-violet-50 text-violet-700",
    blurb: "Clear, engaging training materials that help employees, homeowners, and end users adopt new systems with confidence.",
    hero: "Turn complicated processes into clear, repeatable guidance.",
    overview: "We create practical training videos, walkthroughs, written guides, and support resources for new applications, procedures, devices, and operational workflows.",
    examples: [
      { title: "Employee Onboarding Series", description: "Short, focused videos explaining systems, standards, workflows, and escalation steps for new team members." },
      { title: "How-To Support Library", description: "A searchable collection of video and written instructions that reduces repetitive support requests." },
      { title: "Homeowner & Guest Instructions", description: "Simple tutorials explaining television, Wi-Fi, smart-home, and connected-device use." },
    ],
    outcomes: ["Faster onboarding", "Fewer repeated questions", "More consistent execution", "Greater user confidence"],
  },
  {
    id: "website-development", category: "digital", title: "Website Development", shortTitle: "Website Development", icon: Globe2, accent: "bg-sky-50 text-sky-700",
    blurb: "Professional, responsive websites designed to strengthen credibility, explain your services, and convert visitors into qualified inquiries.",
    hero: "Build a professional website that supports real business goals.",
    overview: "We design and develop modern websites for businesses, professionals, property services, and personal ventures. Each site is built around clear messaging, mobile usability, performance, lead generation, and straightforward long-term maintenance.",
    examples: [
      { title: "Business Service Website", description: "Create a polished website that explains services, builds trust, captures leads, and provides customers with a clear next step." },
      { title: "Website Refresh & Modernization", description: "Update an outdated website with improved structure, responsive design, clearer messaging, stronger calls to action, and modern technology." },
      { title: "Landing Pages & Integrations", description: "Build focused campaign pages and connect forms, scheduling tools, analytics, payment systems, or other existing business technologies." },
    ],
    outcomes: ["Stronger online credibility", "Mobile-friendly customer experience", "More qualified inquiries", "A scalable digital foundation"],
  },
  {
    id: "automation-development", category: "digital", title: "Automation Development", shortTitle: "Automation Development", icon: Zap, accent: "bg-fuchsia-50 text-fuchsia-700",
    blurb: "Custom automations using new or existing technologies to reduce repetitive work for businesses and individuals.",
    hero: "Automate repetitive work and keep important processes moving.",
    overview: "We design practical automations that connect existing tools, reduce manual entry, improve follow-up, and simplify recurring business or personal tasks. Solutions can use platforms you already own or introduce new technology when it offers clear value.",
    examples: [
      { title: "Lead & Customer Follow-Up", description: "Route website inquiries, send notifications, create tasks, update records, and trigger timely follow-up automatically." },
      { title: "Administrative Workflow Automation", description: "Automate recurring reports, approvals, reminders, document handling, data entry, and internal notifications." },
      { title: "Personal Productivity Automation", description: "Simplify scheduling, reminders, information organization, household administration, and other repeatable personal workflows." },
    ],
    outcomes: ["Less repetitive work", "Fewer manual errors", "Faster response times", "Lower operating effort"],
  },
  {
    id: "ai-implementation", category: "digital", title: "New AI Implementation", shortTitle: "AI Implementation", icon: Bot, accent: "bg-indigo-50 text-indigo-700",
    blurb: "Responsible AI implementation that helps businesses improve service, accelerate routine work, and reduce avoidable operating costs.",
    hero: "Put practical AI to work across your business.",
    overview: "We help businesses identify realistic AI opportunities, select appropriate tools, configure workflows, prepare internal knowledge, train users, and implement human-review processes. The goal is not to add AI for its own sake—it is to solve specific business needs with measurable operational value.",
    examples: [
      { title: "AI-Assisted Customer Support", description: "Create guided response systems, internal knowledge assistants, and customer-service workflows that help teams respond faster and more consistently." },
      { title: "Document & Reporting Assistance", description: "Use AI to summarize information, draft reports, organize documents, extract recurring details, and accelerate administrative work." },
      { title: "AI Workflow Assessment & Rollout", description: "Evaluate business processes, identify appropriate AI use cases, implement selected tools, train employees, and establish responsible review procedures." },
    ],
    outcomes: ["Reduced administrative workload", "Faster access to information", "More consistent service", "Lower costs where automation is appropriate"],
    disclaimer: "AI recommendations are tailored to the client’s privacy, security, data-quality, and human-review requirements. Cost savings and performance improvements vary by use case.",
  },
  {
    id: "workflow-optimization", category: "business", title: "Workflow Optimization", shortTitle: "Workflow Optimization", icon: Workflow, accent: "bg-cyan-50 text-cyan-700",
    blurb: "Streamlined workflows, clearer ownership, and better handoffs across teams and departments.",
    hero: "Simplify work and remove operational friction.",
    overview: "We review how work moves through your organization, identify unnecessary steps, clarify responsibilities, and design workflows that support greater consistency and efficiency.",
    examples: [
      { title: "Approval Process Redesign", description: "Reduce unnecessary touchpoints, clarify decision ownership, and improve turnaround time." },
      { title: "Cross-Department Handoffs", description: "Improve communication between operations, support, accounting, vendors, and leadership." },
      { title: "Standard Operating Procedures", description: "Create practical SOPs that make routine work easier to teach, repeat, and measure." },
    ],
    outcomes: ["Faster execution", "Fewer missed handoffs", "Clearer accountability", "More scalable operations"],
  },
  {
    id: "business-insight", category: "business", title: "Business Insight & Analysis", shortTitle: "Insight & Analysis", icon: BarChart3, accent: "bg-amber-50 text-amber-700",
    blurb: "Actionable reporting and operational analysis that helps leaders identify trends, risks, and opportunities.",
    hero: "Turn operational information into better decisions.",
    overview: "We translate business and operational information into practical insights. Rather than overwhelming clients with raw data, we focus on the patterns and recommendations that support better performance.",
    examples: [
      { title: "Performance Trend Review", description: "Identify recurring delays, service gaps, workload patterns, and resource constraints." },
      { title: "Leadership Reporting", description: "Create concise dashboards and summaries that help decision-makers understand what requires attention." },
      { title: "Operational Opportunity Analysis", description: "Evaluate processes, costs, and service performance to identify practical improvement opportunities." },
    ],
    outcomes: ["Clearer reporting", "Better prioritization", "Stronger decisions", "Improved visibility"],
  },
  {
    id: "property-field-services",
    category: "property",
    title: "Owner-Directed Property Field Services",
    shortTitle: "Property Field Services",
    icon: Home,
    accent: "bg-emerald-50 text-emerald-700",
    blurb: "On-island visual checks, factual photo documentation, access support, and owner-authorized field coordination for multiple property owners.",
    hero: "Reliable local field support while the owner retains every management and leasing decision.",
    overview: "Aloha Technology Services LLC provides project-based, owner-directed field services for property owners who need a dependable person on Hawaiʻi Island to observe, document, provide access, and complete clearly authorized tasks. We operate as an independent service vendor—not as a property manager, caretaker, custodian, leasing agent, or real estate representative. Each visit is performed under a defined written scope, and the owner retains control of all rental, tenant, financial, legal, and property-management decisions.",
    examples: [
      { title: "Scheduled Visual Property Check", description: "Visit the property under an agreed checklist, observe readily visible conditions, photograph the requested areas, and send a dated factual report to the owner." },
      { title: "Vendor Access & Appointment Support", description: "Meet an owner-selected vendor, provide authorized property access, document arrival and departure, and report visible completion status without directing licensed trade work." },
      { title: "Storm, Leak, Alarm, or Incident Check", description: "Respond to an owner request to visually check a reported concern, document observable conditions, and promptly relay findings so the owner can decide what action to authorize." },
      { title: "Delivery & Installation Verification", description: "Receive or document an authorized delivery, confirm visible item condition and placement, and provide photographs or notes requested by the owner." },
      { title: "Technology & Connectivity Check", description: "Check owner-identified televisions, Wi-Fi equipment, smart devices, or connected appliances and perform approved basic troubleshooting within the technology-service scope." },
      { title: "Post-Service Documentation", description: "Return after authorized work to photograph visible results, note apparent completion or remaining concerns, and send documentation to the owner. This is not a warranty or professional inspection." },
    ],
    outcomes: [
      "Dated photographs and factual field notes",
      "Faster owner awareness of visible concerns",
      "Reliable onsite access and appointment support",
      "Clear owner control over every decision",
    ],
    detailsEyebrow: "Available field services",
    detailsTitle: "Owner-authorized onsite support",
    detailsDescription: "Services are limited to the written work order or recurring checklist approved by the owner. ATS reports observable facts and does not exercise property-management authority.",
    details: [
      { title: "Visual Checks & Documentation", description: "Exterior and interior walkthroughs of accessible areas, requested photographs or video, meter or indicator photographs, and factual notes about visible conditions." },
      { title: "Access & Onsite Presence", description: "Authorized entry for vendors, deliveries, internet providers, installers, or other scheduled appointments, with arrival, access, and departure documentation." },
      { title: "Owner-Directed Vendor Assistance", description: "Scheduling support, relaying owner-approved information, confirming appointment details, and documenting visible progress. The owner selects the vendor and approves scope and cost." },
      { title: "Supplies, Deliveries & Inventory", description: "Owner-authorized pickup, delivery, placement, basic inventory counts, and documentation of items at the property." },
      { title: "Technology Field Support", description: "Connectivity checks, device setup, equipment resets, television and streaming support, smart-device assistance, and coordination with internet or technology providers." },
      { title: "Escalation of Visible Concerns", description: "Prompt notice when a visit reveals water, damage, security, pest, utility, or safety concerns, followed by action only after owner authorization except when emergency services must be contacted." },
    ],
    deliverablesEyebrow: "Owner documentation",
    deliverablesTitle: "What the owner receives",
    deliverablesDescription: "Deliverables are matched to the agreed scope and are intended to give the owner timely, factual information—not professional opinions or management decisions.",
    deliverables: [
      "Dated visit confirmation and service checklist",
      "Requested photographs, video, readings, or visible-condition notes",
      "Vendor, delivery, access, or appointment documentation",
      "Prompt escalation notice for observable urgent conditions",
      "A clear record of owner instructions and completed authorized tasks",
    ],
    exclusionsTitle: "Services ATS does not provide",
    exclusionsDescription: "These activities are outside the Property Field Services scope and must remain with the owner or an appropriately licensed professional.",
    exclusions: [
      "Advertising, marketing, listing, showing, or offering property for rent",
      "Finding, soliciting, screening, approving, or rejecting tenants or guests",
      "Negotiating rent, deposits, concessions, occupancy, or lease terms",
      "Preparing, signing, modifying, administering, or enforcing leases",
      "Collecting, holding, depositing, disbursing, or accounting for rent or security deposits",
      "Making tenant, guest, rental, eviction, or landlord-tenant decisions",
      "Representing the owner as a property manager, caretaker, custodian, broker, or salesperson",
      "Performing work that requires a real estate, contractor, trade, engineering, pest-control, or other professional license",
    ],
    ctaLabel: "Request Property Field Services",
    disclaimer: "Aloha Technology Services LLC provides independent, owner-directed field services only. ATS is not a licensed Hawaiʻi real estate broker or salesperson and does not provide property management, caretaker or custodian services, leasing, rental advertising, tenant or guest placement, rent or security-deposit handling, lease administration, occupancy decisions, or landlord-tenant representation. Visual field checks are non-invasive observations and are not a residential home inspection, engineering evaluation, code-compliance inspection, pest inspection, appraisal, warranty, or guarantee. Owners retain all decision-making authority and must use appropriately licensed professionals whenever the requested work requires a license.",
  },
  {
    id: "vendor-coordination", category: "property", title: "Vendor Coordination & Project Assistance", shortTitle: "Vendor Coordination", icon: Users, accent: "bg-emerald-50 text-emerald-700",
    blurb: "Owner-authorized vendor identification, scheduling support, access assistance, and documented project follow-through.",
    hero: "Local project assistance carried out from clear client instructions.",
    overview: "We help homeowners, property managers, and businesses identify qualified Big Island vendors and support owner-authorized scheduling, access, communication, and documentation. ATS does not control client funds, direct licensed trade work, or exercise property-management or leasing authority.",
    examples: [
      { title: "Repair Vendor Coordination", description: "Identify appropriate local professionals, communicate the issue, request availability, and help coordinate access." },
      { title: "Home Improvement Assistance", description: "Support estimate collection, scheduling, project communication, and client updates for improvement projects." },
      { title: "Specialized Trade Referrals", description: "Coordinate licensed professionals when work requires electrical, plumbing, HVAC, roofing, or other specialized expertise." },
    ],
    outcomes: ["Less coordination time", "Clearer communication", "Better project visibility", "Reliable local support"],
    disclaimer: "Third-party work is separately quoted and completed under the vendor’s applicable licensing, terms, and warranties. ATS provides owner-authorized coordination and documentation only and does not act as a property manager, leasing representative, general contractor, or licensed trade professional.",
  },
  {
    id: "home-inspections", category: "property", title: "Residential Home Inspections", shortTitle: "Home Inspections", icon: CheckCircle2, accent: "bg-sky-50 text-sky-700",
    blurb: "Professional, client-friendly residential inspections for buyers, sellers, and homeowners who need a clearer understanding of a property's visible condition.",
    hero: "Make informed property decisions with a clear, prioritized inspection report.",
    overview: "Our residential home inspection is a visual, non-invasive review of readily accessible systems and components at the time of inspection. The service is designed to help buyers understand a property before closing, help sellers identify concerns before listing, and help homeowners plan maintenance and repairs with greater confidence.",
    examples: [
      { title: "Pre-Purchase Home Inspection", description: "A detailed inspection for prospective buyers that documents visible conditions, identifies safety or repair concerns, and provides a practical action plan for due diligence and closing discussions." },
      { title: "Pre-Listing Seller Inspection", description: "A proactive inspection before marketing the property, helping sellers understand visible concerns, plan repairs, gather specialist evaluations when appropriate, and reduce avoidable surprises during escrow." },
      { title: "Homeowner & Maintenance Inspection", description: "A property-condition review for current owners who want to prioritize maintenance, monitor aging systems, prepare for improvements, or establish a clearer repair plan." },
    ],
    outcomes: ["A prioritized executive summary", "System-by-system documented findings", "Clear repair and specialist recommendations", "A professional client-friendly report"],
    detailsTitle: "What the inspection covers",
    detailsDescription: "Coverage is based on the property's installed systems, accessibility, operating conditions, safety, and the agreed inspection scope.",
    details: [
      { title: "Site, Drainage & Coastal Exposure", description: "Visible grading, drainage, walkways, retaining conditions, vegetation clearances, shoreline and salt exposure, and other site factors that can affect water entry, corrosion, termite risk, and long-term maintenance." },
      { title: "Foundation & Structural Components", description: "Accessible slabs, foundation walls, piers, posts, columns, floor framing, wall and roof framing, crawlspaces, visible connectors, and indications of movement, moisture, decay, corrosion, or alteration." },
      { title: "Exterior, Windows, Doors & Roofing", description: "Exterior cladding and finishes, sealants, flashings, penetrations, representative windows and doors, roof coverings, drainage, attic areas, insulation, ventilation, and visible evidence of leakage or deterioration." },
      { title: "Plumbing, Electrical, HVAC & Propane", description: "Visible and accessible supply and drain components, water heating and catchment systems where present, electrical service and representative devices, cooling and ventilation, indoor moisture indicators, and propane or fuel-gas components." },
      { title: "Interior, Kitchen, Bathrooms & Utility Areas", description: "Interior rooms and finishes, representative doors, windows, receptacles and fixtures, built-in kitchen appliances, bathrooms, laundry, garage, and utility areas." },
      { title: "Lanais, Decks, Pests & Ancillary Systems", description: "Decks, lanais, balconies, stairs and guards, visible termite and wood-decay indicators, detached structures, accessible ancillary systems, and Hawaiʻi-specific coastal considerations." },
    ],
    deliverablesTitle: "What clients receive",
    deliverables: [
      "A client-friendly written inspection report with documented observations and photographs",
      "Condition status for each inspected component, including serviceable, maintenance, deficient, safety, specialist evaluation, limited, and informational findings",
      "Red, Yellow, and Green urgency priorities that distinguish immediate concerns, near-term action, and maintenance or monitoring",
      "An executive summary and client action plan focused on the most important findings",
      "A consolidated repair plan with recommended trades or specialist referrals when appropriate",
      "Documented inspection methods, access limitations, and systems that could not be fully inspected",
    ],
    ctaLabel: "Request an Inspection Quote",
    disclaimer: "The inspection records visible conditions of readily accessible residential components at the time of inspection. It is not a warranty, guarantee, engineering analysis, destructive investigation, environmental assessment, licensed pest certification, appraisal, or comprehensive code-compliance inspection. Concealed, inaccessible, shut-down, unsafe, or excluded components may not be inspected. Recommendations should be completed by appropriately qualified professionals.",
  },
  {
    id: "handyman-services", category: "property", title: "Handyman Services", shortTitle: "Handyman Services", icon: Hammer, accent: "bg-orange-50 text-orange-700",
    blurb: "Practical, detail-oriented assistance for minor repairs, installations, adjustments, and property punch-list work.",
    hero: "Reliable hands-on support for everyday property needs.",
    overview: "We provide professional handyman support for homeowners, managed properties, vacation rentals, and businesses. When manufacturer-specific procedures apply, we consult available product documentation or work directly with manufacturer support whenever appropriate.",
    examples: [
      { title: "Mounting & Installation", description: "Televisions, shelving, wall-mounted accessories, smart devices, hardware, and compatible equipment." },
      { title: "Minor Repairs & Adjustments", description: "Cabinet, door, furniture, hardware, fixture, and general property punch-list assistance." },
      { title: "Manufacturer-Guided Support", description: "Coordinate with manufacturers or follow applicable product guidance for compatible repairs and replacement components." },
    ],
    outcomes: ["Professional workmanship", "Clear communication", "Manufacturer-aware repairs", "Convenient local support"],
    disclaimer: "Handyman services are limited to work that does not require a licensed contractor or specialized trade professional.",
  },
];

const serviceGroups = [
  { id: "technology", label: "Technology Solutions", icon: Laptop, description: "Applications, installations, connectivity, training, and technology refreshes.", serviceIds: ["application-development", "technology-installation", "training-support"] },
  { id: "digital", label: "Web, Automation & AI", icon: Globe2, description: "Website development, custom automation, and practical AI implementation for business and personal needs.", serviceIds: ["website-development", "automation-development", "ai-implementation"] },
  { id: "business", label: "Business Solutions", icon: Building2, description: "Workflow improvement, operational analysis, reporting, and process support.", serviceIds: ["workflow-optimization", "business-insight"] },
  { id: "property", label: "Property Field & Home Services", icon: Home, description: "Owner-directed property field services, residential home inspections, vendor assistance, handyman support, property technology, and project documentation.", serviceIds: ["property-field-services", "home-inspections", "vendor-coordination", "handyman-services"] },
];

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return <div className={`max-w-3xl space-y-4 ${align === "center" ? "mx-auto text-center" : ""}`.trim()}>
    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1D84B5]">{eyebrow}</p>
    <h2 className="text-3xl font-bold tracking-tight text-[#17324D] md:text-4xl">{title}</h2>
    <p className="text-base leading-8 text-slate-600 md:text-lg">{description}</p>
  </div>;
}

function ServiceCard({ service, onOpen }) {
  const Icon = service.icon;
  return <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full">
    <Card className="h-full overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-[#1D84B5] via-[#3FA7A3] to-[#74C69D]" />
      <CardHeader className="space-y-5">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.accent}`}><Icon className="h-6 w-6" /></div>
        <div className="space-y-2"><CardTitle className="text-xl">{service.title}</CardTitle><CardDescription className="leading-7">{service.blurb}</CardDescription></div>
      </CardHeader>
      <CardContent><Button variant="ghost" onClick={() => onOpen(service.id)} className="px-0">View service <ArrowRight className="h-4 w-4" /></Button></CardContent>
    </Card>
  </motion.div>;
}

function GroupCard({ group, onOpen }) {
  const Icon = group.icon;
  const groupServices = group.serviceIds.map((id) => services.find((service) => service.id === id)).filter(Boolean);
  return <Card className="h-full overflow-hidden">
    <CardHeader className="space-y-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF6F7] text-[#17324D]"><Icon className="h-7 w-7" /></div>
      <div className="space-y-2"><CardTitle className="text-2xl">{group.label}</CardTitle><CardDescription className="leading-7">{group.description}</CardDescription></div>
    </CardHeader>
    <CardContent className="space-y-4">
      {groupServices.map((service) => <button key={service.id} onClick={() => onOpen(service.id)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-[#3FA7A3] hover:bg-[#F2FBFB] hover:text-[#17324D]"><span>{service.shortTitle}</span><ArrowRight className="h-4 w-4" /></button>)}
    </CardContent>
  </Card>;
}

function HomePage({ onOpen }) {
  return <div className="space-y-24">
    <section className="relative overflow-hidden rounded-[2.25rem] bg-[#17324D] px-6 py-12 text-white md:px-10 md:py-16 lg:px-14">
      <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#1D84B5]/25 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#3FA7A3]/20 blur-3xl" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#84DCCF]">Technology • Digital • Property • Operations</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Practical solutions for Hawaiʻi businesses, homes, and properties.</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">Locally owned and operated on the Big Island, Aloha Technology Services LLC helps businesses, homeowners, and property managers build websites, implement automation and AI, improve operations, modernize technology, coordinate trusted vendors, and complete projects with confidence.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="light" onClick={() => onOpen("contact")}>Request a Consultation</Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:border-white hover:bg-white/10 hover:text-white" onClick={() => document.getElementById("services-overview")?.scrollIntoView({ behavior: "smooth" })}>Explore Services</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Locally owned on Hawaiʻi Island", "Residential and commercial support", "Written proposals before work begins"].map((item) => <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-sm font-medium text-slate-100">{item}</div>)}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#84DCCF]">
            How we can help
          </p>
          <div className="grid gap-4">
            {serviceGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.id}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#17324D]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{group.label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {group.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="rounded-[2rem] border border-[#CBE8E7] bg-[#F2FBFB] px-6 py-8 md:px-10">
      <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3FA7A3] text-white"><MapPin className="h-7 w-7" /></div>
        <div><h2 className="text-2xl font-semibold text-[#17324D]">Proudly locally owned and operated on Hawaiʻi Island</h2><p className="mt-2 max-w-4xl leading-7 text-slate-600">We understand the unique logistics of island businesses, vacation rentals, managed residences, and homeowner projects. Our goal is to provide responsive local support, clear communication, and practical solutions from the first conversation through completion.</p></div>
      </div>
    </section>

    <section id="services-overview" className="space-y-10 scroll-mt-28">
      <SectionHeading eyebrow="Our services" title="One local resource for digital, technology, business, and property support" description="Our services are organized into four practical categories so you can quickly find the support that best fits your project." align="center" />
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">{serviceGroups.map((group) => <GroupCard key={group.id} group={group} onOpen={onOpen} />)}</div>
    </section>

    <section className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-6 py-10 md:px-10 md:py-12">
      <div className="space-y-10">
        <SectionHeading eyebrow="Digital growth & efficiency" title="Websites, automation, and AI built around practical needs" description="Strengthen your online presence, connect the tools you already use, automate repetitive work, and introduce AI where it can create clear operational value." />
        <div className="grid gap-7 lg:grid-cols-3">
          {services.filter((service) => service.category === "digital").map((service) => <ServiceCard key={service.id} service={service} onOpen={onOpen} />)}
        </div>
        <div className="rounded-2xl border border-indigo-100 bg-white/80 px-5 py-4 text-sm leading-6 text-slate-600">
          New technology is recommended only when it supports a defined goal. We can work with existing platforms, connect new tools, train users, and establish appropriate privacy, security, and human-review practices.
        </div>
      </div>
    </section>

    <section className="rounded-[2rem] bg-[#F7F3EB] px-6 py-10 md:px-10 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-5"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1D84B5]">Featured service</p><h2 className="text-3xl font-bold tracking-tight text-[#17324D] md:text-4xl">Technology refreshes for entire homes and businesses</h2><p className="leading-8 text-slate-600">We can help replace outdated televisions, coordinate with internet providers, install mesh networks, improve whole-property Wi-Fi coverage, configure connected appliances, and set up the devices your family, guests, or team depend on every day.</p><Button variant="accent" onClick={() => onOpen("technology-installation")}>Explore Technology Refreshes <ArrowRight className="h-4 w-4" /></Button></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[{ icon: Wifi, title: "Mesh Wi-Fi", text: "Improve coverage across larger homes, offices, and managed properties." },{ icon: PlayCircle, title: "TV & Streaming", text: "Install new televisions, streaming devices, and entertainment equipment." },{ icon: Network, title: "Provider Coordination", text: "Communicate with internet providers and help resolve service or equipment issues." },{ icon: Smartphone, title: "Connected Devices", text: "Configure smart-home devices, appliances, printers, displays, and shared equipment." }].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-white/80 bg-white p-5 shadow-sm"><Icon className="h-6 w-6 text-[#1D84B5]" /><h3 className="mt-4 font-semibold text-[#17324D]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}
        </div>
      </div>
    </section>

    <section className="space-y-10"><SectionHeading eyebrow="Property field support" title="Documented onsite support while owners retain control" description="From owner-directed visual checks and vendor access to residential home inspections, technology, and minor project assistance, we provide clear field documentation without offering property management or leasing services." /><div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">{services.filter((service) => service.category === "property").map((service) => <ServiceCard key={service.id} service={service} onOpen={onOpen} />)}</div></section>

    <section className="grid gap-8 lg:grid-cols-2">
      <Card><CardHeader><CardTitle className="text-2xl">Why choose Aloha Technology Services LLC?</CardTitle><CardDescription className="mt-2 leading-7">We combine technical capability, operational experience, local vendor coordination, and practical property support.</CardDescription></CardHeader><CardContent className="grid gap-4 text-slate-700">{["Locally owned and operated on Hawaiʻi Island", "Support for businesses, homeowners, vacation rentals, and property managers", "Clear communication and documented project proposals", "Manufacturer-aware support when product-specific guidance applies", "Coordination with qualified local vendors for specialized work", "Solutions designed around long-term usability and value"].map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3B7A57]" /><span>{item}</span></div>)}</CardContent></Card>
      <Card tone="dark"><CardHeader><CardTitle className="text-2xl">Project-based pricing</CardTitle><CardDescription className="mt-2 leading-7">Every property, business, and project has different requirements.</CardDescription></CardHeader><CardContent className="space-y-5"><p className="leading-7">Pricing is determined on a case-by-case basis after reviewing the requested work, project scope, required materials, location, access, and anticipated time.</p><p className="leading-7">When appropriate, clients receive a written proposal outlining scope, estimated labor, materials or equipment, third-party costs, scheduling considerations, and proposed pricing.</p><Button variant="light" onClick={() => onOpen("contact")}>Request a Project Review</Button></CardContent></Card>
    </section>

    <section className="rounded-[2rem] bg-gradient-to-r from-[#1D84B5] to-[#3FA7A3] px-6 py-12 text-white md:px-10"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Start a conversation</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Have a technology, property, or operational challenge?</h2><p className="mt-4 leading-7 text-white/90">Tell us what you are trying to accomplish. We will help you identify the right next step and prepare a clear proposal when appropriate.</p></div><Button variant="light" size="lg" onClick={() => onOpen("contact")}>Request a Consultation <ArrowRight className="h-4 w-4" /></Button></div></section>
  </div>;
}

function ServicePage({ service, onOpen }) {
  const Icon = service.icon;
  return <div className="space-y-16">
    <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="space-y-7"><div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.accent}`}><Icon className="h-7 w-7" /></div><div className="space-y-4"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1D84B5]">Service</p><h1 className="text-4xl font-bold tracking-tight text-[#17324D] md:text-5xl">{service.title}</h1><p className="text-xl leading-8 text-slate-600">{service.hero}</p></div><p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{service.overview}</p><div className="flex flex-wrap gap-3"><Button onClick={() => onOpen("contact")}>{service.ctaLabel || "Request a Consultation"}</Button><Button variant="outline" onClick={() => onOpen("home")}>Back to Home</Button></div></div>
      <Card><CardHeader><CardTitle className="text-xl">What clients gain</CardTitle><CardDescription className="mt-2 leading-7">Practical outcomes designed around the actual needs of the project.</CardDescription></CardHeader><CardContent className="grid gap-4">{service.outcomes.map((item) => <div key={item} className="flex gap-3 text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#3B7A57]" /><span>{item}</span></div>)}</CardContent></Card>
    </section>
    <section className="space-y-8"><SectionHeading eyebrow="Examples" title="How this service can help" description="Each engagement is tailored to the property, business, equipment, workflow, and outcome involved." /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{service.examples.map((example) => <Card key={example.title} className="h-full"><CardHeader><CardTitle className="text-xl leading-7">{example.title}</CardTitle></CardHeader><CardContent><p className="leading-7 text-slate-600">{example.description}</p></CardContent></Card>)}</div></section>
    {service.details && <section className="space-y-8"><SectionHeading eyebrow={service.detailsEyebrow || "Inspection scope"} title={service.detailsTitle || "What this service covers"} description={service.detailsDescription || "Coverage is tailored to the agreed service scope."} /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{service.details.map((detail) => <Card key={detail.title} className="h-full"><CardHeader><CardTitle className="text-xl leading-7">{detail.title}</CardTitle></CardHeader><CardContent><p className="leading-7 text-slate-600">{detail.description}</p></CardContent></Card>)}</div></section>}
    {service.deliverables && <section className="rounded-[2rem] border border-[#CBE8E7] bg-[#F2FBFB] px-6 py-10 md:px-10"><div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1D84B5]">{service.deliverablesEyebrow || "Client report"}</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17324D]">{service.deliverablesTitle || "What clients receive"}</h2><p className="mt-4 leading-7 text-slate-600">{service.deliverablesDescription || "The final report is organized to help clients understand what was observed, why it matters, and what action should be considered next."}</p></div><div className="grid gap-4">{service.deliverables.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-white/80 bg-white px-5 py-4 text-slate-700 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3B7A57]" /><span className="leading-6">{item}</span></div>)}</div></div></section>}
    {service.exclusions && <section className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-10 md:px-10"><SectionHeading eyebrow="Scope boundaries" title={service.exclusionsTitle || "Services not included"} description={service.exclusionsDescription || "The following activities are outside this service scope."} /><div className="mt-8 grid gap-4 md:grid-cols-2">{service.exclusions.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 shadow-sm"><X className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" /><span className="leading-6">{item}</span></div>)}</div></section>}
    {service.disclaimer && <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-6 text-amber-950"><strong>Important:</strong> {service.disclaimer}</section>}
    <section className="rounded-[2rem] bg-[#17324D] px-8 py-10 text-white"><div className="max-w-3xl space-y-5"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#84DCCF]">Next step</p><h2 className="text-3xl font-bold">Need help with {service.shortTitle.toLowerCase()}?</h2><p className="leading-8 text-slate-300">Tell us about the property, equipment, workflow, or project. We will review the details and discuss the most practical next step.</p><Button variant="light" onClick={() => onOpen("contact")}>{service.ctaLabel || "Request a Consultation"} <ArrowRight className="h-4 w-4" /></Button></div></section>
  </div>;
}

function AboutPage({ onOpen }) {
  const experienceHighlights = [
    {
      icon: Building2,
      value: "50+",
      label: "Luxury residences supported",
      text: "Experience supporting high-value homes across Hawaiʻi Island resort and residential communities.",
    },
    {
      icon: Users,
      value: "60+",
      label: "Local vendor relationships",
      text: "Coordination experience across construction, HVAC, appliances, restoration, locksmith, internet, alarm, and specialty services.",
    },
    {
      icon: Home,
      value: "Thousands",
      label: "Guest transitions supported",
      text: "Operational experience preparing residences, coordinating service, and protecting the owner and guest experience.",
    },
    {
      icon: BarChart3,
      value: "Bachelor’s Degree",
      label: "Analytical foundation",
      text: "A college education that supports structured problem-solving, systems thinking, data analysis, and practical implementation.",
    },
  ];

  const professionalFoundations = [
    {
      icon: Building2,
      title: "Luxury property operations",
      text: "Koa’s professional background includes residential and resort operations, property readiness, inspections, preventative maintenance, repair coordination, owner communication, guest service, project support, and quality control.",
    },
    {
      icon: Zap,
      title: "Supervised electrical experience",
      text: "His apprentice-level and supervised electrical background included assisting with installation, wiring, and troubleshooting while working within defined plans, safety practices, and qualified oversight. This experience is presented as practical background, not as an electrical contractor license.",
    },
    {
      icon: Home,
      title: "Irrigation Technician",
      text: "As an Irrigation Technician, Koa gained hands-on experience installing, maintaining, and troubleshooting irrigation systems while also supporting landscaping, grounds maintenance, and the consistent care required to keep outdoor areas functional and presentable.",
    },
    {
      icon: Hammer,
      title: "Flooring Installer",
      text: "His flooring experience included installation support, surface and jobsite preparation, material handling, detailed finish work, and attention to the sequencing and quality standards that affect a completed interior space.",
    },
    {
      icon: Workflow,
      title: "Processes, SOPs, and training",
      text: "He has created inspection procedures, readiness standards, damage-tracking systems, training resources, operational databases, and repeatable workflows designed to improve consistency and accountability.",
    },
    {
      icon: Users,
      title: "Vendor and project coordination",
      text: "His experience includes reviewing proposals, comparing options, coordinating schedules, documenting progress, supporting invoice approval, and helping owners and teams work effectively with local service providers.",
    },
    {
      icon: Laptop,
      title: "Technology and business systems",
      text: "His technical interests and operational experience support website development, application implementation, automation, responsible AI use, reporting, technology installation, training, and workflow improvement.",
    },
  ];

  const serviceConnections = [
    {
      title: "Websites, applications, automation, and AI",
      text: "College-level analytical training, systems thinking, hands-on technology work, and operational problem-solving provide the foundation for building practical digital tools rather than technology for technology’s sake.",
    },
    {
      title: "Workflow optimization, reporting, and training",
      text: "Years of documenting inspections, coordinating teams, building SOPs, tracking issues, and improving handoffs shape ATS solutions for clearer operations and better decision-making.",
    },
    {
      title: "Technology installation and troubleshooting",
      text: "Supervised electrical exposure, practical troubleshooting, connected-home experience, and coordination with internet and equipment providers support careful technology installations while reinforcing when licensed electrical or specialty work must be referred out.",
    },
    {
      title: "Home inspections and property field services",
      text: "Experience with property conditions, landscaping, irrigation, flooring, finish work, maintenance coordination, and detailed documentation supports broader awareness during inspections and clearly defined onsite field services.",
    },
    {
      title: "Handyman work and vendor coordination",
      text: "Hands-on trade exposure helps Koa assess visible conditions, communicate scope clearly, complete appropriate minor work, and recognize when a licensed contractor or specialized professional is required.",
    },
    {
      title: "A practical standard for finished work",
      text: "Flooring, landscape, irrigation, electrical-support, and luxury-property experience developed an appreciation for preparation, sequencing, cleanliness, visual quality, functionality, and dependable follow-through.",
    },
  ];

  return <div className="space-y-16">
    <section className="overflow-hidden rounded-[2rem] bg-[#17324D] px-6 py-12 text-white md:px-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#84DCCF]">About Aloha Technology Services LLC</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">Built from local experience across technology, property operations, and service.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">Aloha Technology Services LLC was founded by Kenyon “Koa” Smith to bring together technical problem-solving, hands-on field experience, business operations, and a deep understanding of Hawaiʻi Island homes, vendors, and client expectations.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="light" onClick={() => onOpen("contact")}>Discuss Your Project <ArrowRight className="h-4 w-4" /></Button>
            <Button variant="outline" className="border-white bg-white text-[#17324D] shadow-sm hover:border-white hover:bg-slate-100 hover:text-[#17324D]" onClick={() => onOpen("home")}>Explore ATS Services</Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-sm">
          <div className="relative overflow-hidden bg-slate-900">
            <img
              src={FOUNDER_PORTRAIT}
              alt="Kenyon “Koa” Smith, founder of Aloha Technology Services LLC"
              width="1000"
              height="800"
              className="block aspect-[5/4] w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17324D] via-[#17324D]/85 to-transparent px-6 pb-5 pt-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#84DCCF]">Founder</p>
              <h2 className="mt-1 text-2xl font-bold">Kenyon “Koa” Smith</h2>
            </div>
          </div>
          <div className="p-7">
            <p className="leading-7 text-slate-300">Hawaiʻi Island operations professional, technical problem-solver, and owner of Aloha Technology Services LLC.</p>
            <div className="mt-6 space-y-4 border-t border-white/15 pt-6 text-sm leading-6 text-slate-300">
              <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#84DCCF]" /><span>Raised in Waimea and committed to serving Hawaiʻi Island communities.</span></div>
              <div className="flex gap-3"><BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-[#84DCCF]" /><span>Bachelor’s Degree from the University of Hawaiʻi at Mānoa.</span></div>
              <div className="flex gap-3"><Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#84DCCF]" /><span>Professional foundation in luxury residential, resort, property, and business operations.</span></div>
              <div className="flex gap-3"><Hammer className="mt-0.5 h-5 w-5 shrink-0 text-[#84DCCF]" /><span>Hands-on background in supervised electrical work, irrigation systems, landscaping support, flooring installation, and finish work.</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-10">
      <SectionHeading eyebrow="Professional background" title="Experience that directly supports the work ATS provides" description="The services offered by ATS are grounded in real operational responsibility, technical education, onsite problem-solving, documentation, vendor coordination, and client service." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {experienceHighlights.map(({ icon: Icon, value, label, text }) => <Card key={label} tone="soft"><CardContent className="p-6"><Icon className="h-7 w-7 text-[#1D84B5]" /><p className="mt-5 text-3xl font-bold tracking-tight text-[#17324D]">{value}</p><h3 className="mt-2 font-semibold text-[#17324D]">{label}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></CardContent></Card>)}
      </div>
    </section>

    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <Card tone="sand">
        <CardHeader><CardTitle className="text-3xl">From Waimea to a career built on practical responsibility</CardTitle></CardHeader>
        <CardContent className="space-y-5 text-base leading-8 text-slate-600">
          <p>Koa grew up in Waimea on the Big Island and graduated from Parker School. He later earned a Bachelor’s Degree from the University of Hawaiʻi at Mānoa before returning home to build his career and remain close to family.</p>
          <p>Before and alongside his operations career, Koa developed a practical foundation through apprentice-level and supervised electrical work, irrigation work, and flooring work. As an Irrigation Technician, his responsibilities included installing, maintaining, and troubleshooting irrigation systems while supporting landscaping and grounds care. His broader hands-on experience also included assisting with electrical installation, wiring, and troubleshooting, as well as flooring installation support, surface preparation, material handling, and detailed finish work.</p>
          <p>Those experiences strengthened his understanding of jobsite conditions, work sequencing, safety, workmanship, preventive care, and the importance of recognizing when a task requires a licensed trade professional. His career later expanded into luxury residential and resort operations, where success depended on careful inspections, reliable communication, maintenance planning, vendor coordination, documentation, budget awareness, service recovery, and consistent follow-through.</p>
          <p>Across those roles, he supported more than 50 high-value residences, worked with over 60 local vendors and service providers, and helped coordinate thousands of guest arrivals and departures. He also developed inspection standards, training materials, damage-tracking processes, and operating procedures used by teams supporting complex properties.</p>
          <p>That combination of analytical training and field experience led to the creation of Aloha Technology Services LLC in 2024: a locally owned company focused on making technology, property support, and business operations more practical and easier to manage.</p>
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {professionalFoundations.map(({ icon: Icon, title, text }) => <Card key={title}><CardContent className="p-6"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF6F7] text-[#1D84B5]"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-semibold text-[#17324D]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></CardContent></Card>)}
      </div>
    </section>

    <section className="rounded-[2rem] bg-[#F2FBFB] px-6 py-10 md:px-10 md:py-12">
      <SectionHeading eyebrow="Why the experience matters" title="Every service is connected to work Koa has performed in the real world" description="ATS combines technical capability with an operator’s understanding of reliability, communication, scope, documentation, and the people affected by each project." />
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {serviceConnections.map((item) => <div key={item.title} className="rounded-2xl border border-[#CBE8E7] bg-white p-6 shadow-sm"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#1D84B5]" /><div><h3 className="text-lg font-semibold text-[#17324D]">{item.title}</h3><p className="mt-2 leading-7 text-slate-600">{item.text}</p></div></div></div>)}
      </div>
    </section>

    <section className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-2xl">A practical, client-centered approach</CardTitle></CardHeader>
        <CardContent className="space-y-4 leading-7 text-slate-600"><p>ATS begins by understanding the actual problem, the people involved, the property or business environment, and the desired result. The recommended solution is then shaped around the client’s needs rather than forcing every project into the same package.</p><p>Clear scope, realistic expectations, documented communication, and dependable follow-through are treated as part of the service—not as extras.</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-2xl">Local commitment</CardTitle></CardHeader>
        <CardContent className="space-y-4 leading-7 text-slate-600"><p>Being raised on Hawaiʻi Island shapes how Koa approaches relationships, communication, and responsibility. ATS is built to serve local businesses, homeowners, property owners, and organizations with respect for island logistics and the importance of trusted long-term relationships.</p><p>When a project requires expertise outside ATS’s scope, the goal is to communicate that clearly and help identify the appropriate next step or qualified professional.</p></CardContent>
      </Card>
    </section>

    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-sm leading-6 text-emerald-950"><strong>Property Field Services scope:</strong> ATS provides clearly defined, owner-directed onsite vendor services. ATS does not provide property management, caretaker or custodian services, leasing, tenant placement, rent or deposit handling, lease administration, or landlord-tenant representation.</section>

    <section className="rounded-[2rem] bg-[#17324D] px-8 py-10 text-white"><h2 className="text-3xl font-bold">Ready to discuss what you are trying to accomplish?</h2><p className="mt-4 max-w-3xl leading-8 text-slate-300">Share the project, challenge, property, system, or workflow. ATS will review the details and help identify a practical next step.</p><Button variant="light" className="mt-6" onClick={() => onOpen("contact")}>Contact Aloha Technology Services LLC <ArrowRight className="h-4 w-4" /></Button></section>
  </div>;
}

function ContactPage() {
  const [state, handleSubmit] = useForm(FORM_ID);
  const [projectType, setProjectType] = useState("");
  return <div className="space-y-12"><SectionHeading eyebrow="Contact" title="Tell us about your project" description="Share as much detail as you can. We will review your request and follow up about scope, availability, and the most practical next step." /><div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
    <Card><CardHeader><CardTitle className="text-2xl">Request a consultation</CardTitle><CardDescription className="mt-2 leading-7">Pricing is determined case by case. When appropriate, a written proposal will be provided during the quoting process.</CardDescription></CardHeader><CardContent>{state.succeeded ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-lg font-semibold text-emerald-950">Thank you.</h3><p className="mt-2 leading-7 text-emerald-800">Your message has been sent successfully. We will be in touch soon.</p></div> : <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2"><div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label><input id="name" type="text" name="name" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /></div><div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label><input id="email" type="email" name="email" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /><ValidationError prefix="Email" field="email" errors={state.errors} /></div></div>
      <div className="grid gap-4 md:grid-cols-2"><div><label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label><input id="phone" type="tel" name="phone" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /></div><div><label htmlFor="projectType" className="mb-2 block text-sm font-semibold text-slate-700">Project type</label><select id="projectType" name="projectType" required value={projectType} onChange={(event) => setProjectType(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15"><option value="" disabled>Select a project type</option><option>Business Technology</option><option>Residential Technology</option><option>Owner-Directed Property Field Services</option><option>Home Inspection - Buying</option><option>Home Inspection - Selling</option><option>Home Inspection - Maintenance / Condition Review</option><option>Handyman Services</option><option>Vendor Coordination</option><option>Workflow / Business Operations</option><option>Application Development</option><option>Website Development</option><option>Automation Development</option><option>AI Implementation</option><option>Other</option></select></div></div>{projectType === "Owner-Directed Property Field Services" && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-950"><strong>Property Field Services scope:</strong> ATS provides owner-directed onsite vendor services only. We do not provide property management, caretaker or custodian services, leasing, tenant placement, rent or deposit handling, or landlord-tenant representation.</div>}
      <div className="grid gap-4 md:grid-cols-2"><div><label htmlFor="contactMethod" className="mb-2 block text-sm font-semibold text-slate-700">Preferred contact method</label><select id="contactMethod" name="contactMethod" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15"><option>Email</option><option>Phone</option><option>Text</option></select></div><div><label htmlFor="timeline" className="mb-2 block text-sm font-semibold text-slate-700">Desired timeline</label><select id="timeline" name="timeline" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15"><option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–3 months</option><option>Planning / gathering information</option></select></div></div>
      <div><label htmlFor="location" className="mb-2 block text-sm font-semibold text-slate-700">Project location or area</label><input id="location" type="text" name="location" placeholder="Example: Waikoloa, Waimea, Kona" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /></div>
      <div><label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">Project details</label><textarea id="message" name="message" rows="7" required placeholder="Describe the issue, project, property, equipment, goals, and any timing considerations." className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /><ValidationError prefix="Message" field="message" errors={state.errors} /></div>
      <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" /><Button type="submit" size="lg" disabled={state.submitting}>{state.submitting ? "Sending..." : "Request a Consultation"}</Button>
    </form>}</CardContent></Card>
    <div className="space-y-6"><Card tone="dark"><CardHeader><CardTitle className="text-2xl">Contact information</CardTitle><CardDescription className="mt-2 leading-7">Serving businesses, homeowners, vacation rentals, property managers, and personal clients across Hawaiʻi Island.</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 text-[#84DCCF]" /><a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white">{COMPANY_EMAIL}</a></div>{COMPANY_PHONE && <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-[#84DCCF]" /><a href={`tel:${COMPANY_PHONE_HREF}`} className="hover:text-white">{COMPANY_PHONE}</a></div>}<div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[#84DCCF]" /><span>Locally owned and operated on the Big Island of Hawaiʻi</span></div></CardContent></Card><Card><CardHeader><CardTitle className="text-xl">What happens next?</CardTitle></CardHeader><CardContent className="space-y-4 text-slate-600">{["We review your project details.", "We follow up with questions or schedule a site review when needed.", "We determine the appropriate service, vendor, or project approach.", "A written proposal is provided when applicable."].map((item, index) => <div key={item} className="flex gap-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF6F7] text-sm font-semibold text-[#17324D]">{index + 1}</div><p className="pt-1 leading-6">{item}</p></div>)}</CardContent></Card></div>
  </div></div>;
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
    const socialImageUrl = `${SITE_URL}${seo.image || DEFAULT_SOCIAL_IMAGE}`;

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
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", activePage === "about" ? "Kenyon Koa Smith, founder of Aloha Technology Services LLC" : "Aloha Technology Services LLC");
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
  return <div className="min-h-screen bg-white text-slate-900">
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-28 max-w-7xl items-center justify-between gap-5 px-4 py-2 sm:px-6 lg:px-8">
        <button
          onClick={() => openPage("home")}
          className="block h-24 min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md lg:max-w-[620px]"
          aria-label="Return to the Aloha Technology Services LLC homepage"
        >
          <img
            src="/images/aloha-technology-services-header-banner.png"
            alt="Aloha Technology Services LLC — Website, Automation, AI, Technology, Property and Operations"
            width="1914"
            height="413"
            className="block h-full w-full object-fill"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </button>

        <nav className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            onClick={() => openPage("home")}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${activePage === "home" ? "bg-[#17324D] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-[#17324D]"}`}
          >
            Home
          </button>

          <div className="relative">
            <button
              onClick={() => setServicesOpen((value) => !value)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${activeService ? "bg-[#17324D] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-[#17324D]"}`}
            >
              Services <ChevronDown className="h-4 w-4" />
            </button>

            {servicesOpen && (
              <div className="absolute right-0 top-12 w-[900px] max-w-[calc(100vw-2rem)] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {serviceGroups.map((group) => (
                    <div key={group.id}>
                      <p className="mb-3 font-semibold text-[#17324D]">{group.label}</p>
                      <div className="space-y-1">
                        {group.serviceIds.map((id) => {
                          const service = services.find((item) => item.id === id);
                          if (!service) return null;
                          return (
                            <button
                              key={service.id}
                              onClick={() => openPage(service.id)}
                              className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-[#F2FBFB] hover:text-[#17324D]"
                            >
                              {service.shortTitle}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => openPage("about")}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${activePage === "about" ? "bg-[#17324D] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-[#17324D]"}`}
          >
            About
          </button>

          <Button size="sm" variant="accent" onClick={() => openPage("contact")}>
            Request Consultation
          </Button>
        </nav>

        <button
          className="rounded-xl border border-slate-200 p-2 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-5 sm:px-6">
            <button onClick={() => openPage("home")} className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-semibold text-[#17324D] shadow-sm">
              Home
            </button>
            <details className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <summary className="cursor-pointer px-4 py-3 font-semibold text-[#17324D]">Services</summary>
              <div className="space-y-4 px-4 pb-4">
                {serviceGroups.map((group) => (
                  <div key={group.id}>
                    <p className="mb-2 text-sm font-semibold text-[#17324D]">{group.label}</p>
                    <div className="space-y-1">
                      {group.serviceIds.map((id) => {
                        const service = services.find((item) => item.id === id);
                        if (!service) return null;
                        return (
                          <button
                            key={service.id}
                            onClick={() => openPage(service.id)}
                            className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                          >
                            {service.shortTitle}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </details>
            <button onClick={() => openPage("about")} className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-semibold text-[#17324D] shadow-sm">
              About
            </button>
            <button onClick={() => openPage("contact")} className="block w-full rounded-2xl bg-[#1D84B5] px-4 py-3 text-left font-semibold text-white shadow-md">
              Request Consultation
            </button>
          </div>
        </div>
      )}
    </header>
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <nav aria-label="All website pages" className="sr-only">
        <a href="/">Home</a>
        <a href="/about">About Aloha Technology Services LLC</a>
        <a href="/contact">Contact Aloha Technology Services LLC</a>
        {services.map((service) => (
          <a key={service.id} href={pathForPage(service.id)}>
            {service.title}
          </a>
        ))}
      </nav>
      {activePage === "home" && <HomePage onOpen={openPage} />}{activeService && <ServicePage service={activeService} onOpen={openPage} />}{activePage === "about" && <AboutPage onOpen={openPage} />}{activePage === "contact" && <ContactPage />}
    </main>
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          onClick={() => openPage("home")}
          className="block w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(23,50,77,0.10)] transition hover:shadow-[0_20px_60px_rgba(23,50,77,0.15)]"
          aria-label="Return to the Aloha Technology Services LLC homepage"
        >
          <img
            src="/images/aloha-technology-services-footer-banner.png"
            alt="Aloha Technology Services LLC services banner"
            className="block h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </button>

        <div className="mt-7 flex flex-col gap-5 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-[#17324D]">Aloha Technology Services LLC</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Locally owned and operated on Hawaiʻi Island. Website, automation, AI, technology, property, and operational support for businesses, homeowners, and property managers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => openPage("home")} className="rounded-full border border-[#17324D] bg-[#17324D] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#214765] hover:shadow-lg">
              Home
            </button>
            <button onClick={() => openPage("about")} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#17324D] shadow-md transition hover:-translate-y-0.5 hover:border-[#1D84B5] hover:text-[#1D84B5] hover:shadow-lg">
              About
            </button>
            <button onClick={() => openPage("contact")} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#17324D] shadow-md transition hover:-translate-y-0.5 hover:border-[#1D84B5] hover:text-[#1D84B5] hover:shadow-lg">
              Contact
            </button>
            <a href={`mailto:${COMPANY_EMAIL}`} className="rounded-full border border-[#1D84B5] bg-[#1D84B5] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#176f98] hover:shadow-lg">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
    <AlohaAssistant onNavigate={openPage} />
  </div>;
}
