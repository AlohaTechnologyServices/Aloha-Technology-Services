import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, RotateCcw, Send, X } from "lucide-react";

const STARTER_CHOICES = [
  { label: "Help me choose a service", prompt: "Help me choose the right service." },
  { label: "Compare inspection types", prompt: "Help me compare home inspection types." },
  { label: "Book a home inspection", prompt: "I want to book a home inspection." },
  { label: "Find the right vendor", prompt: "I need vendor coordination." },
  { label: "Property field visit", prompt: "I need property field services." },
  { label: "Pricing and quotes", prompt: "How does pricing work?" },
];

const SERVICE_CHOICES = [
  { label: "Property Field Services", prompt: "Tell me about property field services." },
  { label: "Home Inspections", prompt: "Tell me about home inspections." },
  { label: "Vendor Coordination", prompt: "Tell me about vendor coordination." },
  { label: "Handyman Services", prompt: "Tell me about handyman services." },
  { label: "Operations or technology", prompt: "I need operations or technology help." },
];

const INSPECTION_CHOICES = [
  { label: "Buying a home", prompt: "I am buying a home and need an inspection." },
  { label: "Selling a home", prompt: "I am selling a home and need a pre-listing inspection." },
  { label: "Maintenance review", prompt: "I want a home maintenance inspection." },
  { label: "Moisture or leak concern", prompt: "I need a moisture and water-intrusion inspection." },
  { label: "Irrigation or pool/spa", prompt: "I need an irrigation or pool inspection." },
  { label: "Rental arrival/departure", prompt: "I need custom arrival and departure inspections." },
];

const DIGITAL_CHOICES = [
  { label: "Workflow or SOPs", prompt: "I need workflow optimization." },
  { label: "Technology installation", prompt: "I need technology installation." },
  { label: "Training and support", prompt: "I need training and support." },
  { label: "Website development", prompt: "I need website development." },
  { label: "Reporting or analysis", prompt: "I need insight and analysis." },
  { label: "Automation, AI or an app", prompt: "I need automation, AI, or application development." },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "assistant",
    text:
      "Aloha! I’m the ATS website guide. I can help you choose a service, compare inspection options, explain vendor coordination, or take you to the right page. What are you working on?",
    choices: STARTER_CHOICES,
  },
];

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function buildReply(rawInput) {
  const input = rawInput.toLowerCase().replace(/[’ʻ]/g, "'").trim();

  if (!input) {
    return { text: "Please enter a few details about the property, project, or service you need." };
  }

  if (includesAny(input, ["hello", "aloha", "good morning", "good afternoon", "good evening"]) || input === "hi" || input === "hey") {
    return {
      text: "Aloha! Choose the option that best matches your need, and I’ll narrow it down.",
      choices: SERVICE_CHOICES,
    };
  }

  if (includesAny(input, ["choose", "which service", "not sure", "where do i start", "right service"])) {
    return {
      text:
        "Start with the outcome you need: an onsite property visit, a home-condition inspection, a qualified third-party provider, minor hands-on work, or an operations/technology solution.",
      choices: SERVICE_CHOICES,
    };
  }

  if (includesAny(input, ["compare inspection", "inspection types", "which inspection", "different inspections"])) {
    return {
      text:
        "ATS offers eleven inspection options. A Full Residential or Buyer’s Inspection is the broadest choice; Pre-Listing is for sellers; Maintenance is for current owners; Condo/Townhome and New Construction are tailored scopes; Reinspection checks previously reported items; moisture, irrigation and pool/spa are targeted services; and arrival/departure inspections document rental-property condition.",
      page: "home-inspections",
      actionLabel: "Compare All Inspections",
      choices: INSPECTION_CHOICES,
    };
  }

  if (includesAny(input, ["buying", "buyer", "purchase", "due diligence", "under contract"])) {
    return {
      text:
        "A Buyer’s Home Inspection is designed for the due-diligence period. It reviews readily accessible residential systems, documents visible safety and repair concerns, distinguishes urgent issues from maintenance, and provides a photographic report for informed discussion with your real-estate and advisory team.",
      page: "home-inspections",
      actionLabel: "View Buyer Inspection Details",
      choices: [
        { label: "Request a quote", prompt: "I want a buyer inspection quote." },
        { label: "Add moisture inspection", prompt: "Can moisture inspection be added?" },
      ],
    };
  }

  if (includesAny(input, ["selling", "seller", "pre-listing", "pre listing", "before listing"])) {
    return {
      text:
        "A Pre-Listing Home Inspection helps an owner identify visible concerns before marketing the property, plan repairs or specialist evaluations, and reduce avoidable surprises during escrow. It supports preparation and disclosure discussions but does not replace legal or real-estate advice.",
      page: "home-inspections",
      actionLabel: "View Pre-Listing Details",
    };
  }

  if (includesAny(input, ["maintenance inspection", "current owner", "annual inspection", "maintenance review"])) {
    return {
      text:
        "A Home Maintenance Inspection is for current owners who want to identify deferred maintenance, developing concerns, water-management issues, corrosion, aging components, and near-term service priorities. The report is organized to support a practical property-care plan.",
      page: "home-inspections",
      actionLabel: "View Maintenance Inspection",
    };
  }

  if (includesAny(input, ["moisture", "water intrusion", "water-intrusion", "thermal", "leak", "wet spot", "mold concern", "musty"])) {
    return {
      text:
        "The Moisture and Water-Intrusion Inspection uses thermal imaging, a moisture meter, visual indicators, and review of likely pathways at accessible areas. It can be quoted at a reduced bundled rate with another qualifying inspection. Thermal imaging does not see through walls and cannot by itself confirm mold, concealed damage, or the exact source of moisture.",
      page: "home-inspections",
      actionLabel: "View Moisture Inspection",
      choices: [
        { label: "Book targeted inspection", prompt: "I want to book a moisture inspection." },
        { label: "Bundle with full inspection", prompt: "I want to bundle moisture with a full inspection." },
      ],
    };
  }

  if (includesAny(input, ["irrigation", "sprinkler", "watering system", "dry zone", "overspray"])) {
    return {
      text:
        "The Irrigation System Inspection reviews accessible zones, representative emitters, visible leaks, damaged heads, overspray, coverage concerns, controller settings, and observable water contact near the building. It may be bundled with another qualifying inspection at a reduced rate.",
      page: "home-inspections",
      actionLabel: "View Irrigation Inspection",
    };
  }

  if (includesAny(input, ["pool", "spa", "hot tub", "pool equipment", "pool heater"])) {
    return {
      text:
        "The Pool/Spa and Equipment Inspection reviews accessible surfaces, visible structure, pumps, filters, heaters, controls, visible piping, barriers, and safety-related conditions. Thermal imaging may be used when helpful. It is not structural engineering, water-chemistry certification, or specialized leak detection.",
      page: "home-inspections",
      actionLabel: "View Pool/Spa Inspection",
    };
  }

  if (includesAny(input, ["arrival", "departure", "turnover", "rental inspection", "vacation rental", "guest ready"])) {
    return {
      text:
        "Custom Arrival and Departure Inspections use an owner-approved checklist and dated photographs to document agreed rooms, furnishings, equipment, missing or damaged items, and visible readiness concerns. This is an owner-directed documentation service, not property management, housekeeping certification, leasing, or guest placement.",
      page: "home-inspections",
      actionLabel: "View Arrival/Departure Inspections",
    };
  }

  if (includesAny(input, ["new construction", "new build", "builder walkthrough", "warranty inspection"])) {
    return {
      text:
        "A New Construction Home Inspection is an independent visual review of installed work and readily accessible systems before final acceptance or a warranty milestone. It documents visible workmanship, incomplete items, and operational concerns, but does not replace municipal inspections, engineering, or the builder’s quality-control responsibilities.",
      page: "home-inspections",
      actionLabel: "View New Construction Inspection",
    };
  }

  if (includesAny(input, ["reinspection", "repair verification", "check repair", "verify repair"])) {
    return {
      text:
        "Repair Verification and Reinspection is a focused return visit to document whether specified reported items appear to have been addressed. It compares visible conditions with the original report, but it is not a contractor warranty, engineering certification, or guarantee of concealed work.",
      page: "home-inspections",
      actionLabel: "View Reinspection Details",
    };
  }

  if (includesAny(input, ["book inspection", "inspection quote", "schedule inspection", "buyer inspection quote", "bundle moisture", "book a moisture"])) {
    return {
      text:
        "Use the contact form and select the exact inspection service. Include the property area or address, property type, approximate size, occupied or vacant status, desired date, and any known areas of concern.",
      page: "contact",
      actionLabel: "Request an Inspection Quote",
    };
  }

  if (includesAny(input, ["home inspection", "house inspection", "property inspection", "inspection service"])) {
    return {
      text:
        "ATS provides eleven residential inspection options for buyers, sellers, owners, new construction, repair verification, moisture, irrigation, pools/spas, condos/townhomes, and rental arrival/departure documentation. Each scope is explained before the visit and includes clear limitations and reporting.",
      page: "home-inspections",
      actionLabel: "Explore Home Inspections",
      choices: INSPECTION_CHOICES,
    };
  }

  if (includesAny(input, ["vendor rating", "quality-to-value", "quality to value", "how do you rate", "provider rating"])) {
    return {
      text:
        "ATS uses an internal Quality-to-Value comparison method: 50% license/credential and exact-scope evidence, 20% Hawaiʻi Island service/contact confidence, 20% reputation evidence and review-sample confidence, and 10% relative value position. Ratings are editorial research aids—not endorsements—and current licensing, insurance, complaints, scope, proposals, and warranties must be verified for the project.",
      page: "vendor-coordination",
      actionLabel: "Review Rating Methodology",
    };
  }

  if (includesAny(input, ["vendor", "contractor", "electrician", "plumber", "plumbing", "electrical", "hvac", "roof", "roofing", "pest", "termite", "engineer", "provider"])) {
    return {
      text:
        "Vendor Coordination is appropriate when the work requires a qualified or licensed professional. ATS uses an internal directory with 580 entries, 316 unique providers, 39 separated service families, and East/West Hawaiʻi coverage. We match the exact scope, review available evidence, complete current verification, and support proposals, scheduling, access, and documentation. The client selects the provider and approves all work and cost.",
      page: "vendor-coordination",
      actionLabel: "View Vendor Coordination",
      choices: [
        { label: "Explain provider ratings", prompt: "How do you rate providers?" },
        { label: "Request vendor assistance", prompt: "I want to request vendor assistance." },
      ],
    };
  }

  if (includesAny(input, ["property field", "property check", "visual check", "storm check", "vendor access", "delivery verification", "onsite support"])) {
    return {
      text:
        "Property Field Services provide owner-directed visual checks, dated photographs, factual notes, vendor access, delivery or installation verification, incident checks, and defined onsite tasks. ATS does not provide property management, leasing, tenant placement, rent handling, or caretaker/custodian authority.",
      page: "property-field-services",
      actionLabel: "View Property Field Services",
    };
  }

  if (includesAny(input, ["property manager", "property management", "caretaker", "custodian", "tenant", "rent collection", "lease"])) {
    return {
      text:
        "ATS is not offering property management, caretaker/custodian, leasing, tenant-placement, rent/deposit handling, lease administration, or landlord-tenant representation. Property Field Services are limited to clearly authorized onsite observations, documentation, access, and tasks while the owner retains every management decision.",
      page: "property-field-services",
      actionLabel: "Review Scope Boundaries",
    };
  }

  if (includesAny(input, ["handyman", "mount", "assembly", "assemble", "minor repair", "adjustment", "punch list"])) {
    return {
      text:
        "Handyman Services cover minor repairs, mounting, assembly, adjustments, compatible installations, and punch-list work that does not require a contractor or regulated trade license. ATS documents scope and stops or refers the project if concealed conditions or expanded work require a qualified professional.",
      page: "handyman-services",
      actionLabel: "View Handyman Services",
    };
  }

  if (includesAny(input, ["workflow", "sop", "process", "handoff", "operations", "efficiency"])) {
    return {
      text:
        "Workflow Optimization reviews how tasks and information move, clarifies roles and decision points, develops practical SOPs, improves handoffs, and supports implementation. Choose another option below if the need is more technology-specific.",
      page: "workflow-optimization",
      actionLabel: "View Workflow Optimization",
      choices: DIGITAL_CHOICES,
    };
  }

  if (includesAny(input, ["wifi", "wi-fi", "mesh", "internet", "router", "television", " tv", "smart home", "connected device", "technology installation"])) {
    return {
      text:
        "Technology Installation covers mesh Wi-Fi, internet-provider coordination, televisions, streaming equipment, connected devices and appliances, printers, displays, and residential or commercial technology refreshes.",
      page: "technology-installation",
      actionLabel: "View Technology Installation",
    };
  }

  if (includesAny(input, ["training", "onboarding", "how-to", "how to", "documentation", "walkthrough", "support library"])) {
    return {
      text:
        "Training and Support includes employee onboarding videos, system walkthroughs, homeowner or guest instructions, written guides, and reusable support libraries for procedures, applications, and devices.",
      page: "training-support",
      actionLabel: "View Training & Support",
    };
  }

  if (includesAny(input, ["website", "web site", "redesign", "landing page", "seo", "online presence"])) {
    return {
      text:
        "Website Development includes new responsive websites, redesigns, landing pages, lead forms, analytics, integrations, search foundations, and ongoing service updates.",
      page: "website-development",
      actionLabel: "View Website Development",
    };
  }

  if (includesAny(input, ["analysis", "reporting", "dashboard", "kpi", "insight", "trend", "data"])) {
    return {
      text:
        "Insight & Analysis turns operational information into leadership-ready reporting, dashboards, trend reviews, issue patterns, and practical recommendations.",
      page: "business-insight",
      actionLabel: "View Insight & Analysis",
    };
  }

  if (includesAny(input, ["automation", "automate", "repetitive", "reminder", "approval", "follow-up", "follow up", "data entry"])) {
    return {
      text:
        "Automation Development can route inquiries, create tasks, send reminders, organize recurring reports, reduce duplicate entry, and support repeatable administrative or property-service workflows with clear exception handling.",
      page: "automation-development",
      actionLabel: "View Automation Development",
    };
  }

  if (includesAny(input, ["artificial intelligence", "ai implementation", "chatbot", "knowledge assistant", "document summary"]) || input === "ai" || input.startsWith("ai ")) {
    return {
      text:
        "AI Implementation focuses on defined use cases such as internal knowledge, customer-support drafting, document assistance, and reporting. ATS plans for privacy, data quality, approved access, human review, and situations where AI should not be used.",
      page: "ai-implementation",
      actionLabel: "View AI Implementation",
    };
  }

  if (includesAny(input, ["application", "app development", "software", "internal tool", "spreadsheet modernization", "platform rollout"])) {
    return {
      text:
        "Application Development is appropriate for internal tools, operational dashboards, spreadsheet modernization, field or inspection tools, request portals, and third-party application implementation.",
      page: "application-development",
      actionLabel: "View Application Development",
    };
  }

  if (includesAny(input, ["price", "pricing", "cost", "rate", "quote", "how much", "estimate"])) {
    return {
      text:
        "Pricing is determined after reviewing the service, property or project location, scope, access, size, system complexity, materials, third-party costs, and expected time. Moisture, irrigation, and pool/spa inspections may qualify for a reduced bundled rate when added to another inspection. A written quote or proposal is provided when appropriate.",
      page: "contact",
      actionLabel: "Request a Quote",
    };
  }

  if (includesAny(input, ["service area", "where do you work", "big island", "hawaii island", "hawai'i island", "kona", "waikoloa", "waimea", "hilo", "pahoa", "keaau"])) {
    return {
      text:
        "ATS is locally owned and operated on Hawaiʻi Island. Availability and travel considerations depend on the project location and scope, so include the property or business area when requesting service.",
      page: "contact",
      actionLabel: "Contact ATS",
    };
  }

  if (includesAny(input, ["contact", "email", "phone", "request service", "request vendor assistance"])) {
    return {
      text:
        "Use the contact page to select the exact service and provide the property or project location, desired timing, observed concern, and desired outcome. ATS can then review scope and availability.",
      page: "contact",
      actionLabel: "Open Contact Form",
    };
  }

  return {
    text:
      "I can help with Property Field Services, Home Inspections, Vendor Coordination, Handyman Services, Workflow Optimization, Technology Installation, Training and Support, Website Development, Insight & Analysis, Automation, AI, and Application Development. Choose a category below or add more detail about the result you need.",
    choices: SERVICE_CHOICES,
  };
}

function Message({ message, onChoice, onNavigate }) {
  const assistant = message.sender === "assistant";
  return (
    <div className={`flex ${assistant ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${assistant ? "bg-slate-100 text-slate-700" : "bg-[#1268D5] text-white"}`}>
        <p>{message.text}</p>
        {message.actionLabel && message.page && (
          <button onClick={() => onNavigate(message.page)} className="mt-3 inline-flex items-center gap-2 font-bold text-[#0D57B5] hover:underline">
            {message.actionLabel} <ArrowRight className="h-4 w-4" />
          </button>
        )}
        {message.choices && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.choices.map((choice) => (
              <button key={choice.label} onClick={() => onChoice(choice.prompt)} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-left text-xs font-semibold text-slate-700 transition hover:border-[#1268D5] hover:text-[#1268D5]">
                {choice.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AlohaAssistant({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
      }, 20);
    }
  }, [messages, isOpen]);

  const sendMessage = (value) => {
    const text = value.trim();
    if (!text) return;
    const userMessage = { id: Date.now(), sender: "user", text };
    const reply = buildReply(text);
    setMessages((current) => [...current, userMessage, { id: Date.now() + 1, sender: "assistant", ...reply }]);
    setInput("");
  };

  const reset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {isOpen && (
        <div className="mb-3 flex h-[min(650px,calc(100vh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#061B33] px-4 py-3 text-white">
            <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1268D5]"><Bot className="h-5 w-5" /></div><div><p className="font-bold">Ask ATS</p><p className="text-xs text-slate-300">Service and inspection guide</p></div></div>
            <div className="flex items-center gap-1"><button onClick={reset} className="rounded-lg p-2 hover:bg-white/10" aria-label="Reset assistant"><RotateCcw className="h-4 w-4" /></button><button onClick={() => setIsOpen(false)} className="rounded-lg p-2 hover:bg-white/10" aria-label="Close assistant"><X className="h-4 w-4" /></button></div>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => <Message key={message.id} message={message} onChoice={sendMessage} onNavigate={(page) => { onNavigate(page); setIsOpen(false); }} />)}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); sendMessage(input); }} className="border-t border-slate-200 p-3">
            <div className="flex items-end gap-2"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(input); } }} rows="2" placeholder="Describe what you need..." className="min-h-[48px] flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#1268D5] focus:ring-2 focus:ring-blue-100" /><button type="submit" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1268D5] text-white hover:bg-[#0D57B5]" aria-label="Send message"><Send className="h-5 w-5" /></button></div>
          </form>
        </div>
      )}
      <button onClick={() => setIsOpen((value) => !value)} className="flex items-center gap-2 rounded-full bg-[#1268D5] px-5 py-3 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#0D57B5]" aria-expanded={isOpen}>
        {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}<span>{isOpen ? "Close" : "Ask ATS"}</span>
      </button>
    </div>
  );
}
