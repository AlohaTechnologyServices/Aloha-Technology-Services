import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, RotateCcw, X } from "lucide-react";

const STARTER_CHOICES = [
  { label: "Help me choose a service", prompt: "Help me choose the right service." },
  { label: "Home inspection", prompt: "I need information about a home inspection." },
  { label: "Property check or vendor access", prompt: "I need owner-directed property field services." },
  { label: "Website or automation", prompt: "I need help with a website or business automation." },
  { label: "Wi-Fi, TV, or devices", prompt: "I need help with Wi-Fi, a TV, or connected devices." },
  { label: "Handyman or vendor", prompt: "I need a repair and I am not sure whether I need handyman or vendor coordination." },
  { label: "Pricing and quotes", prompt: "How does pricing and quoting work?" },
];

const SERVICE_CHOICES = [
  { label: "Buying, selling, or maintaining a home", prompt: "I need a home inspection." },
  { label: "Property check, photos, or vendor access", prompt: "I need owner-directed property field services." },
  { label: "Website, automation, or AI", prompt: "I need digital services." },
  { label: "Wi-Fi, TVs, computers, or devices", prompt: "I need technology installation." },
  { label: "Minor repair or installation", prompt: "I need handyman services." },
  { label: "Licensed or specialized repair", prompt: "I need vendor coordination." },
  { label: "Business process or reporting", prompt: "I need business operations help." },
];

const REPAIR_CHOICES = [
  { label: "Minor repair, mounting, or assembly", prompt: "The work is a minor repair, mounting, assembly, or adjustment." },
  { label: "Electrical, plumbing, HVAC, roofing, or specialized work", prompt: "The work needs a licensed or specialized trade professional." },
];

const PROPERTY_FIELD_CHOICES = [
  { label: "Visual check and photos", prompt: "I need a scheduled visual property check and photos." },
  { label: "Meet a vendor or delivery", prompt: "I need someone onsite for an owner-authorized vendor or delivery appointment." },
  { label: "Storm, leak, alarm, or incident check", prompt: "I need an owner-directed incident check at a property." },
  { label: "Rental or tenant services", prompt: "I need leasing, tenant, rent, or property management help." },
];

const DIGITAL_CHOICES = [
  { label: "New or redesigned website", prompt: "I need website development." },
  { label: "Automate repetitive work", prompt: "I need automation development." },
  { label: "Implement AI in a business", prompt: "I need AI implementation." },
  { label: "Build an application or dashboard", prompt: "I need application development." },
];

const BUSINESS_CHOICES = [
  { label: "Improve workflows or SOPs", prompt: "I need workflow optimization." },
  { label: "Reporting, dashboards, or analysis", prompt: "I need business insight and analysis." },
  { label: "Training videos or documentation", prompt: "I need training videos and documentation." },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "assistant",
    text:
      "Aloha! I’m the Aloha Technology Services website guide. I can answer basic service questions, help you choose the right service, and take you to the correct page. What are you working on?",
    choices: STARTER_CHOICES,
  },
];

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function buildReply(rawInput) {
  const input = rawInput.toLowerCase().replace(/[’ʻ]/g, "'").trim();

  if (
    includesAny(input, [
      "hello",
      "hi ",
      "hey",
      "aloha",
      "good morning",
      "good afternoon",
      "good evening",
    ]) ||
    input === "hi"
  ) {
    return {
      text:
        "Aloha! Tell me what you are trying to accomplish, and I’ll point you toward the most relevant service.",
      choices: SERVICE_CHOICES,
    };
  }

  if (
    includesAny(input, [
      "choose",
      "which service",
      "not sure",
      "what service",
      "right service",
      "where do i start",
    ])
  ) {
    return {
      text:
        "Choose the option that best matches your project. I can narrow it down further after that.",
      choices: SERVICE_CHOICES,
    };
  }

  if (
    includesAny(input, [
      "property management",
      "property manager",
      "caretaker",
      "custodian",
      "leasing",
      "lease administration",
      "tenant screening",
      "tenant placement",
      "guest placement",
      "rent collection",
      "collect rent",
      "security deposit",
      "show a rental",
      "show the property to tenants",
      "eviction",
      "landlord-tenant",
      "landlord tenant",
    ])
  ) {
    return {
      text:
        "ATS does not provide property management, caretaker or custodian services, leasing, rental advertising, tenant or guest placement, rent or security-deposit handling, lease administration, occupancy decisions, or landlord-tenant representation. Those responsibilities must remain with the owner or an appropriately licensed Hawaiʻi real estate professional. ATS can still provide clearly defined, owner-directed field visits such as visual checks, photographs, vendor access, and delivery documentation.",
      page: "property-field-services",
      actionLabel: "View Property Field Services",
      choices: PROPERTY_FIELD_CHOICES,
    };
  }

  if (
    includesAny(input, [
      "property field",
      "property check",
      "check the property",
      "visual check",
      "visual property check",
      "photo documentation",
      "property photos",
      "vacant home check",
      "vacant property check",
      "vendor access",
      "meet a vendor",
      "meet the contractor",
      "delivery verification",
      "meet a delivery",
      "storm check",
      "leak check",
      "alarm check",
      "incident check",
      "onsite field support",
      "on-site field support",
      "field visit",
      "owner-directed",
      "owner directed",
    ])
  ) {
    return {
      text:
        "Owner-Directed Property Field Services provides factual onsite support for property owners, including scheduled visual checks, dated photographs, vendor or delivery access, incident checks, technology checks, and post-service documentation. ATS follows a written owner-approved scope and does not make leasing, tenant, financial, legal, or property-management decisions.",
      page: "property-field-services",
      actionLabel: "View Property Field Services",
      choices: PROPERTY_FIELD_CHOICES,
    };
  }

  if (
    includesAny(input, [
      "home inspection",
      "property inspection",
      "house inspection",
      "buying a home",
      "buy a home",
      "buyer inspection",
      "pre-purchase",
      "pre purchase",
      "selling a home",
      "sell a home",
      "seller inspection",
      "pre-listing",
      "pre listing",
      "maintenance inspection",
      "condition review",
    ])
  ) {
    return {
      text:
        "Residential Home Inspections are designed for buyers, sellers, and current homeowners. The inspection is a visual, non-invasive review of readily accessible systems and includes a client-friendly report, photographs, prioritized findings, and practical recommendations. Pricing is quoted after reviewing the property and requested scope.",
      page: "home-inspections",
      actionLabel: "View Home Inspections",
      choices: [
        { label: "I am buying", prompt: "I am buying a property and need an inspection." },
        { label: "I am selling", prompt: "I am selling a property and need a pre-listing inspection." },
        { label: "Request an inspection quote", prompt: "I want to request a home inspection quote." },
      ],
    };
  }

  if (
    includesAny(input, [
      "inspection quote",
      "request a home inspection quote",
      "request an inspection quote",
    ])
  ) {
    return {
      text:
        "The best next step is the consultation form. Select the appropriate Home Inspection project type and include the property location, approximate size, property type, desired date, and whether you are buying, selling, or requesting a maintenance review.",
      page: "contact",
      actionLabel: "Request an Inspection Quote",
    };
  }

  if (
    includesAny(input, [
      "price",
      "pricing",
      "cost",
      "rate",
      "rates",
      "estimate",
      "quote",
      "how much",
    ])
  ) {
    return {
      text:
        "Pricing is determined case by case after reviewing the project scope, location, access, materials or equipment, third-party costs, and anticipated time. When appropriate, clients receive a written proposal before work begins.",
      page: "contact",
      actionLabel: "Request a Quote",
    };
  }

  if (
    includesAny(input, [
      "service area",
      "where do you work",
      "where are you located",
      "location",
      "big island",
      "hawaii island",
      "hawai'i island",
      "kona",
      "waikoloa",
      "waimea",
      "kamuela",
      "hilo",
    ])
  ) {
    return {
      text:
        "Aloha Technology Services LLC is locally owned and operated on Hawaiʻi Island. Availability and travel considerations depend on the project location and scope, so include the property or business location when requesting a quote.",
      page: "contact",
      actionLabel: "Contact ATS",
    };
  }

  if (
    includesAny(input, [
      "website",
      "web site",
      "redesign",
      "landing page",
      "online presence",
      "contact form",
      "seo",
    ])
  ) {
    return {
      text:
        "Website Development is the right service for a new business or personal website, a redesign, mobile improvements, landing pages, lead-generation forms, analytics, and platform integrations.",
      page: "website-development",
      actionLabel: "View Website Development",
    };
  }

  if (
    includesAny(input, [
      "automation",
      "automate",
      "repetitive",
      "reminder",
      "approval",
      "data entry",
      "customer follow-up",
      "customer follow up",
      "notification",
      "recurring report",
    ])
  ) {
    return {
      text:
        "Automation Development can connect existing tools, reduce manual entry, automate reminders and approvals, improve customer follow-up, and simplify recurring administrative work.",
      page: "automation-development",
      actionLabel: "View Automation Development",
    };
  }

  if (
    includesAny(input, [
      "artificial intelligence",
      " ai ",
      "ai implementation",
      "chatbot",
      "knowledge assistant",
      "document summary",
      "document summaries",
    ]) ||
    input.startsWith("ai ") ||
    input === "ai"
  ) {
    return {
      text:
        "AI Implementation focuses on practical business use cases such as customer-support assistance, internal knowledge tools, document processing, reporting, and administrative workflows. Solutions are planned around privacy, security, data quality, and human review.",
      page: "ai-implementation",
      actionLabel: "View AI Implementation",
    };
  }

  if (
    includesAny(input, [
      "application",
      "app development",
      "software",
      "dashboard",
      "internal tool",
      "spreadsheet modernization",
      "platform rollout",
    ])
  ) {
    return {
      text:
        "Application Development & Implementation is appropriate for custom internal tools, dashboards, spreadsheet modernization, and third-party software rollouts with training and process support.",
      page: "application-development",
      actionLabel: "View Application Development",
    };
  }

  if (
    includesAny(input, [
      "digital services",
      "website or automation",
      "website and automation",
      "web automation",
    ])
  ) {
    return {
      text:
        "Digital projects generally fall under Website Development, Automation Development, AI Implementation, or Application Development. Choose the closest match below.",
      choices: DIGITAL_CHOICES,
    };
  }

  if (
    includesAny(input, [
      "wifi",
      "wi-fi",
      "mesh",
      "network",
      "internet",
      "router",
      "television",
      " tv ",
      "smart home",
      "smart-home",
      "connected device",
      "printer",
      "streaming device",
      "technology installation",
    ]) ||
    input.startsWith("tv ") ||
    input === "tv"
  ) {
    return {
      text:
        "Technology Installation & Refresh Services covers mesh Wi-Fi, internet-provider coordination, televisions, streaming equipment, smart-home and connected devices, printers, office equipment, and broader residential or commercial technology refreshes.",
      page: "technology-installation",
      actionLabel: "View Technology Installation",
    };
  }

  if (
    includesAny(input, [
      "training",
      "training video",
      "documentation",
      "how-to guide",
      "how to guide",
      "onboarding",
      "standard operating procedure training",
    ])
  ) {
    return {
      text:
        "Training Videos & Support is designed for employee onboarding, system walkthroughs, homeowner or guest instructions, written guides, and reusable support libraries.",
      page: "training-support",
      actionLabel: "View Training & Support",
    };
  }

  if (
    includesAny(input, [
      "workflow",
      "sop",
      "process improvement",
      "handoff",
      "operational efficiency",
      "business operations help",
    ])
  ) {
    return {
      text:
        "Workflow Optimization is appropriate when a process has unnecessary steps, unclear ownership, inconsistent handoffs, or needs practical SOPs and better operating structure.",
      page: "workflow-optimization",
      actionLabel: "View Workflow Optimization",
    };
  }

  if (
    includesAny(input, [
      "reporting",
      "analytics",
      "analysis",
      "kpi",
      "dashboard reporting",
      "business insight",
      "performance trend",
      "data",
    ])
  ) {
    return {
      text:
        "Business Insight & Analysis helps turn operational information into useful reporting, trend reviews, dashboards, and practical recommendations for decision-makers.",
      page: "business-insight",
      actionLabel: "View Business Insight & Analysis",
    };
  }

  if (includesAny(input, ["business operations", "business process"])) {
    return {
      text:
        "Business-support projects generally fall under Workflow Optimization, Business Insight & Analysis, or Training Videos & Support.",
      choices: BUSINESS_CHOICES,
    };
  }

  if (
    includesAny(input, [
      "electrician",
      "plumber",
      "plumbing",
      "electrical",
      "hvac",
      "air conditioning",
      "roof",
      "roofing",
      "licensed contractor",
      "licensed trade",
      "specialist",
      "specialized repair",
      "vendor coordination",
      "find a vendor",
      "contractor",
    ])
  ) {
    return {
      text:
        "Vendor Coordination is the right starting point when work requires a qualified or licensed professional. ATS can help identify appropriate local vendors and assist with communication, estimates, scheduling, access, and project updates. The third-party vendor separately quotes and performs the specialized work.",
      page: "vendor-coordination",
      actionLabel: "View Vendor Coordination",
    };
  }

  if (
    includesAny(input, [
      "handyman",
      "mount",
      "mounting",
      "assembly",
      "assemble",
      "minor repair",
      "adjustment",
      "punch list",
      "shelf",
      "shelving",
      "cabinet hardware",
      "door hardware",
    ])
  ) {
    return {
      text:
        "Handyman Services covers minor repairs, mounting, assembly, adjustments, hardware replacement, and property punch-list work that does not require a licensed contractor or specialized trade professional.",
      page: "handyman-services",
      actionLabel: "View Handyman Services",
    };
  }

  if (includesAny(input, ["repair", "fix", "broken", "improvement"])) {
    return {
      text:
        "The right service depends on the type of work. ATS can perform appropriate minor handyman work, while electrical, plumbing, HVAC, roofing, structural, and other specialized work should be coordinated with a qualified professional.",
      choices: REPAIR_CHOICES,
    };
  }

  if (
    includesAny(input, [
      "about",
      "who are you",
      "company",
      "locally owned",
      "owner",
      "aloha technology services",
    ])
  ) {
    return {
      text:
        "Aloha Technology Services LLC is a locally owned and operated Hawaiʻi Island company providing technology, digital, owner-directed property field services, residential home inspections, and operational support for businesses, homeowners, property owners, and property managers.",
      page: "about",
      actionLabel: "About ATS",
    };
  }

  if (
    includesAny(input, [
      "contact",
      "email",
      "call",
      "phone",
      "consultation",
      "book",
      "schedule",
      "appointment",
      "talk to someone",
    ])
  ) {
    return {
      text:
        "Use the consultation form to share your project type, location, timeline, and details. ATS will review the request and follow up about scope, availability, and the most practical next step.",
      page: "contact",
      actionLabel: "Open Contact Form",
    };
  }

  return {
    text:
      "I’m not fully certain which service fits from that description. Choose the closest category below, or open the contact form and provide the project details so ATS can review it directly.",
    choices: SERVICE_CHOICES,
    page: "contact",
    actionLabel: "Contact ATS",
  };
}

function ChatMessage({ message, onNavigate, onChoice }) {
  const isAssistant = message.sender === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isAssistant
            ? "border border-slate-200 bg-white text-slate-700 shadow-sm"
            : "bg-[#17324D] text-white"
        }`}
      >
        <p>{message.text}</p>

        {message.page && (
          <button
            type="button"
            onClick={() => onNavigate(message.page)}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#1D84B5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#176f98]"
          >
            {message.actionLabel || "View Page"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {message.choices && message.choices.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.choices.map((choice) => (
              <button
                key={`${message.id}-${choice.label}`}
                type="button"
                onClick={() => onChoice(choice.prompt)}
                className="rounded-full border border-[#CBE8E7] bg-[#F2FBFB] px-3 py-1.5 text-left text-xs font-semibold text-[#17324D] transition hover:border-[#3FA7A3] hover:bg-white"
              >
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
  const messageId = useRef(2);
  const transcriptRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const frame = window.requestAnimationFrame(() => {
      transcriptRef.current?.scrollTo({
        top: transcriptRef.current.scrollHeight,
        behavior: "smooth",
      });
      inputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, messages]);

  function resetConversation() {
    setMessages(INITIAL_MESSAGES);
    setInput("");
  }

  function navigateTo(page) {
    onNavigate(page);
    setIsOpen(false);
  }

  function sendMessage(value) {
    const trimmed = value.trim();
    if (!trimmed) return;

    const userMessage = {
      id: messageId.current++,
      sender: "user",
      text: trimmed,
    };
    const reply = buildReply(trimmed);
    const assistantMessage = {
      id: messageId.current++,
      sender: "assistant",
      ...reply,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="Aloha Technology Services website assistant"
          className="mb-3 flex max-h-[min(650px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-2xl"
        >
          <header className="flex items-center justify-between bg-[#17324D] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#17324D]">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">Aloha Assistant</h2>
                <p className="text-xs text-slate-300">Service and website guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetConversation}
                className="rounded-xl p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
                aria-label="Restart conversation"
                title="Restart conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
                aria-label="Close website assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div
            ref={transcriptRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
            aria-live="polite"
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onNavigate={navigateTo}
                onChoice={sendMessage}
              />
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white p-3"
          >
            <div className="flex items-end gap-2">
              <label htmlFor="ats-assistant-input" className="sr-only">
                Ask a question about Aloha Technology Services
              </label>
              <textarea
                ref={inputRef}
                id="ats-assistant-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage(input);
                  }
                }}
                rows={1}
                maxLength={500}
                placeholder="Ask about services, pricing, or where to start…"
                className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1D84B5] text-white shadow-sm transition hover:bg-[#176f98] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send question"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 px-1 text-[11px] leading-4 text-slate-400">
              Automated website guide. For project-specific advice, pricing, or scheduling,
              use the consultation form.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="ml-auto flex items-center gap-2 rounded-full border border-white/20 bg-[#17324D] px-4 py-3 font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#214765] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#1D84B5] focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Aloha Assistant" : "Open Aloha Assistant"}
      >
        <Bot className="h-5 w-5" />
        <span className="hidden sm:inline">{isOpen ? "Close" : "Ask ATS"}</span>
      </button>
    </div>
  );
}
