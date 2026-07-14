import { useForm, ValidationError } from "@formspree/react";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, Bot, Building2, CheckCircle2, ChevronDown, Code2,
  Globe2, Hammer, Home, Laptop, Mail, MapPin, Menu, Network, Phone, PlayCircle,
  Smartphone, Users, Video, Wifi, Workflow, X, Zap
} from "lucide-react";

const COMPANY_NAME = "Aloha Technology Services LLC";
const COMPANY_EMAIL = "hawaiiats@gmail.com";
const COMPANY_PHONE = "";
const FORM_ID = "mnjlpyya";

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
    id: "vendor-coordination", category: "property", title: "Vendor Coordination & Project Assistance", shortTitle: "Vendor Coordination", icon: Users, accent: "bg-emerald-50 text-emerald-700",
    blurb: "Local vendor identification, communication, scheduling, and project assistance for repairs and property improvements.",
    hero: "One trusted point of contact for local property needs.",
    overview: "We help homeowners, property managers, and businesses identify and coordinate qualified Big Island vendors for repairs, maintenance, improvements, and specialized work. We assist with communication and scheduling so clients spend less time searching, following up, and managing details.",
    examples: [
      { title: "Repair Vendor Coordination", description: "Identify appropriate local professionals, communicate the issue, request availability, and help coordinate access." },
      { title: "Home Improvement Assistance", description: "Support estimate collection, scheduling, project communication, and client updates for improvement projects." },
      { title: "Specialized Trade Referrals", description: "Coordinate licensed professionals when work requires electrical, plumbing, HVAC, roofing, or other specialized expertise." },
    ],
    outcomes: ["Less coordination time", "Clearer communication", "Better project visibility", "Reliable local support"],
    disclaimer: "Third-party work is separately quoted and completed under the vendor’s applicable licensing, terms, and warranties.",
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
  { id: "property", label: "Property & Home Services", icon: Home, description: "Local vendor coordination, handyman support, property technology, and project assistance.", serviceIds: ["vendor-coordination", "handyman-services"] },
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

    <section className="space-y-10"><SectionHeading eyebrow="Property support" title="Simplifying repairs, improvements, and day-to-day property needs" description="We provide hands-on assistance when appropriate and coordinate trusted professionals when a project requires specialized or licensed expertise." /><div className="grid gap-7 md:grid-cols-2">{services.filter((service) => service.category === "property").map((service) => <ServiceCard key={service.id} service={service} onOpen={onOpen} />)}</div></section>

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
      <div className="space-y-7"><div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.accent}`}><Icon className="h-7 w-7" /></div><div className="space-y-4"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1D84B5]">Service</p><h1 className="text-4xl font-bold tracking-tight text-[#17324D] md:text-5xl">{service.title}</h1><p className="text-xl leading-8 text-slate-600">{service.hero}</p></div><p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{service.overview}</p><div className="flex flex-wrap gap-3"><Button onClick={() => onOpen("contact")}>Request a Consultation</Button><Button variant="outline" onClick={() => onOpen("home")}>Back to Home</Button></div></div>
      <Card><CardHeader><CardTitle className="text-xl">What clients gain</CardTitle><CardDescription className="mt-2 leading-7">Practical outcomes designed around the actual needs of the project.</CardDescription></CardHeader><CardContent className="grid gap-4">{service.outcomes.map((item) => <div key={item} className="flex gap-3 text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#3B7A57]" /><span>{item}</span></div>)}</CardContent></Card>
    </section>
    <section className="space-y-8"><SectionHeading eyebrow="Examples" title="How this service can help" description="Each engagement is tailored to the property, business, equipment, workflow, and outcome involved." /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{service.examples.map((example) => <Card key={example.title} className="h-full"><CardHeader><CardTitle className="text-xl leading-7">{example.title}</CardTitle></CardHeader><CardContent><p className="leading-7 text-slate-600">{example.description}</p></CardContent></Card>)}</div></section>
    {service.disclaimer && <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-6 text-amber-950"><strong>Important:</strong> {service.disclaimer}</section>}
    <section className="rounded-[2rem] bg-[#17324D] px-8 py-10 text-white"><div className="max-w-3xl space-y-5"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#84DCCF]">Next step</p><h2 className="text-3xl font-bold">Need help with {service.shortTitle.toLowerCase()}?</h2><p className="leading-8 text-slate-300">Tell us about the property, equipment, workflow, or project. We will review the details and discuss the most practical next step.</p><Button variant="light" onClick={() => onOpen("contact")}>Request a Consultation <ArrowRight className="h-4 w-4" /></Button></div></section>
  </div>;
}

function AboutPage({ onOpen }) {
  return <div className="space-y-16"><section className="rounded-[2rem] bg-[#F2FBFB] px-6 py-12 md:px-10"><SectionHeading eyebrow="About us" title="Local knowledge. Practical experience. Clear solutions." description="Aloha Technology Services LLC is locally owned and operated on Hawaiʻi Island. We support businesses, homeowners, vacation rentals, and property managers with websites, automation, AI implementation, technology, workflow improvement, vendor coordination, and practical property services." /></section><section className="grid gap-8 lg:grid-cols-2"><Card><CardHeader><CardTitle className="text-2xl">Our approach</CardTitle></CardHeader><CardContent className="space-y-4 leading-7 text-slate-600"><p>We start by understanding the actual problem, the people involved, and the desired outcome. From there, we recommend practical steps rather than forcing every client into the same package.</p><p>Some projects require hands-on installation or handyman support. Others require a website, business automation, responsible AI implementation, software, process improvement, training, or coordination with a qualified local professional. Our role is to simplify the path forward.</p></CardContent></Card><Card><CardHeader><CardTitle className="text-2xl">Our mission</CardTitle></CardHeader><CardContent className="space-y-4 leading-7 text-slate-600"><p>Our mission is to simplify complex challenges and deliver practical, results-driven solutions that help clients operate with greater confidence.</p><p>We believe technology and property support should make daily life easier, improve communication, and create lasting value.</p></CardContent></Card></section><section className="rounded-[2rem] bg-[#17324D] px-8 py-10 text-white"><h2 className="text-3xl font-bold">Ready to discuss your project?</h2><p className="mt-4 max-w-3xl leading-8 text-slate-300">Share the details and we will help identify the right service, vendor, or next step.</p><Button variant="light" className="mt-6" onClick={() => onOpen("contact")}>Contact Aloha Technology Services LLC</Button></section></div>;
}

function ContactPage() {
  const [state, handleSubmit] = useForm(FORM_ID);
  return <div className="space-y-12"><SectionHeading eyebrow="Contact" title="Tell us about your project" description="Share as much detail as you can. We will review your request and follow up about scope, availability, and the most practical next step." /><div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
    <Card><CardHeader><CardTitle className="text-2xl">Request a consultation</CardTitle><CardDescription className="mt-2 leading-7">Pricing is determined case by case. When appropriate, a written proposal will be provided during the quoting process.</CardDescription></CardHeader><CardContent>{state.succeeded ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-lg font-semibold text-emerald-950">Thank you.</h3><p className="mt-2 leading-7 text-emerald-800">Your message has been sent successfully. We will be in touch soon.</p></div> : <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2"><div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label><input id="name" type="text" name="name" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /></div><div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label><input id="email" type="email" name="email" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /><ValidationError prefix="Email" field="email" errors={state.errors} /></div></div>
      <div className="grid gap-4 md:grid-cols-2"><div><label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label><input id="phone" type="tel" name="phone" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /></div><div><label htmlFor="projectType" className="mb-2 block text-sm font-semibold text-slate-700">Project type</label><select id="projectType" name="projectType" required defaultValue="" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15"><option value="" disabled>Select a project type</option><option>Business Technology</option><option>Residential Technology</option><option>Vacation Rental / Property Management</option><option>Handyman Services</option><option>Vendor Coordination</option><option>Workflow / Business Operations</option><option>Application Development</option><option>Website Development</option><option>Automation Development</option><option>AI Implementation</option><option>Other</option></select></div></div>
      <div className="grid gap-4 md:grid-cols-2"><div><label htmlFor="contactMethod" className="mb-2 block text-sm font-semibold text-slate-700">Preferred contact method</label><select id="contactMethod" name="contactMethod" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15"><option>Email</option><option>Phone</option><option>Text</option></select></div><div><label htmlFor="timeline" className="mb-2 block text-sm font-semibold text-slate-700">Desired timeline</label><select id="timeline" name="timeline" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15"><option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–3 months</option><option>Planning / gathering information</option></select></div></div>
      <div><label htmlFor="location" className="mb-2 block text-sm font-semibold text-slate-700">Project location or area</label><input id="location" type="text" name="location" placeholder="Example: Waikoloa, Waimea, Kona" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /></div>
      <div><label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">Project details</label><textarea id="message" name="message" rows="7" required placeholder="Describe the issue, project, property, equipment, goals, and any timing considerations." className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1D84B5] focus:ring-2 focus:ring-[#1D84B5]/15" /><ValidationError prefix="Message" field="message" errors={state.errors} /></div>
      <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" /><Button type="submit" size="lg" disabled={state.submitting}>{state.submitting ? "Sending..." : "Request a Consultation"}</Button>
    </form>}</CardContent></Card>
    <div className="space-y-6"><Card tone="dark"><CardHeader><CardTitle className="text-2xl">Contact information</CardTitle><CardDescription className="mt-2 leading-7">Serving businesses, homeowners, vacation rentals, property managers, and personal clients across Hawaiʻi Island.</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 text-[#84DCCF]" /><a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white">{COMPANY_EMAIL}</a></div>{COMPANY_PHONE && <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-[#84DCCF]" /><a href={`tel:${COMPANY_PHONE}`} className="hover:text-white">{COMPANY_PHONE}</a></div>}<div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[#84DCCF]" /><span>Locally owned and operated on the Big Island of Hawaiʻi</span></div></CardContent></Card><Card><CardHeader><CardTitle className="text-xl">What happens next?</CardTitle></CardHeader><CardContent className="space-y-4 text-slate-600">{["We review your project details.", "We follow up with questions or schedule a site review when needed.", "We determine the appropriate service, vendor, or project approach.", "A written proposal is provided when applicable."].map((item, index) => <div key={item} className="flex gap-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF6F7] text-sm font-semibold text-[#17324D]">{index + 1}</div><p className="pt-1 leading-6">{item}</p></div>)}</CardContent></Card></div>
  </div></div>;
}

export default function TechnicalSolutionsCompanyWebsite() {
  const [activePage, setActivePage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const activeService = useMemo(() => services.find((service) => service.id === activePage), [activePage]);
  const openPage = (page) => { setActivePage(page); setMobileOpen(false); setServicesOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div className="min-h-screen bg-white text-slate-900">
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => openPage("home")}
          className="block min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md lg:max-w-[690px]"
          aria-label="Return to the Aloha Technology Services LLC homepage"
        >
          <img
            src="/images/aloha-technology-services-header-banner.png"
            alt="Aloha Technology Services LLC — Website, Automation, AI, Technology, Property and Operations"
            className="block h-16 w-full object-fill sm:h-[68px]"
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
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">{activePage === "home" && <HomePage onOpen={openPage} />}{activeService && <ServicePage service={activeService} onOpen={openPage} />}{activePage === "about" && <AboutPage onOpen={openPage} />}{activePage === "contact" && <ContactPage />}</main>
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
  </div>;
}
