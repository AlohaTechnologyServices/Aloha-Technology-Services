import { useForm, ValidationError } from "@formspree/react";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Video, Wrench, BarChart3, Workflow, ArrowRight, CheckCircle2, Mail, Phone, MapPin, Menu, X } from "lucide-react";

function Button({ children, onClick, variant = "default", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center font-medium transition rounded-2xl";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  };
  const sizes = {
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white border ${className}`.trim()}>{children}</div>;
}

function CardHeader({ children, className = "" }) {
  return <div className={`p-6 ${className}`.trim()}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`px-6 pb-6 ${className}`.trim()}>{children}</div>;
}

function CardTitle({ children, className = "" }) {
  return <h3 className={`font-semibold ${className}`.trim()}>{children}</h3>;
}

function CardDescription({ children, className = "" }) {
  return <p className={`${className}`.trim()}>{children}</p>;
}

const services = [
  {
    id: "application-development",
    title: "Application Development & Implementation",
    shortTitle: "App Development",
    icon: Code2,
    blurb:
      "Custom software, internal tools, and seamless application rollouts designed around how your business actually works.",
    hero:
      "Build the right tools and deploy them with confidence.",
    overview:
      "We develop practical applications that solve real operational problems. From custom dashboards to workflow-specific internal tools, we help businesses design, build, and implement software that fits their day-to-day needs. We also support the rollout of third-party applications, helping teams integrate new systems with minimal disruption.",
    examples: [
      {
        title: "Custom Operations Dashboard",
        description:
          "Built an internal dashboard for a property management team to track work orders, vendor updates, and arrival readiness in one place, reducing status-check time and improving communication across departments.",
      },
      {
        title: "CRM and Booking System Integration",
        description:
          "Connected a business’s lead pipeline with its scheduling tools so new inquiries automatically triggered follow-up tasks, notifications, and appointment creation.",
      },
      {
        title: "Legacy Process Modernization",
        description:
          "Replaced spreadsheet-based workflows with a lightweight web application that centralized approvals, notes, and reporting for leadership.",
      },
    ],
    outcomes: ["Custom-fit solutions", "Smoother software rollouts", "Less manual work", "Better system adoption"],
  },
  {
    id: "training-videos",
    title: "Training Videos & Support",
    shortTitle: "Training & Support",
    icon: Video,
    blurb:
      "Clear, engaging training content and support materials that help your team learn faster and perform with confidence.",
    hero:
      "Turn complicated processes into clear, repeatable training.",
    overview:
      "We create easy-to-follow training videos, walkthroughs, and support resources that make new systems and procedures easier to understand. Whether you are onboarding employees, documenting a process, or reducing repeated support questions, we build materials your team can actually use.",
    examples: [
      {
        title: "Employee Onboarding Video Series",
        description:
          "Produced a set of short onboarding videos for new administrative staff covering login procedures, communication standards, software basics, and escalation steps.",
      },
      {
        title: "How-To Support Library",
        description:
          "Created a searchable set of video guides and written reference sheets for a small business adopting new digital tools, reducing repetitive support requests.",
      },
      {
        title: "Homeowner Device Tutorials",
        description:
          "Delivered simple training materials for homeowners explaining how to use installed smart home devices, streaming systems, and remote access tools.",
      },
    ],
    outcomes: ["Faster onboarding", "More consistent execution", "Reduced support burden", "Higher confidence for end users"],
  },
  {
    id: "technology-installation",
    title: "On-Site Technology Installation",
    shortTitle: "On-Site Installation",
    icon: Wrench,
    blurb:
      "Professional on-site setup and installation for technology devices in homes, offices, and managed properties.",
    hero:
      "Reliable technology installation done right the first time.",
    overview:
      "We provide hands-on installation and setup services for homeowners and property managers who need dependable technology in place without the hassle. We focus on clean execution, practical configuration, and making sure the end result works the way it should before we leave.",
    examples: [
      {
        title: "Smart Home Device Setup",
        description:
          "Installed and configured smart displays, streaming devices, wireless accessories, and connected home tools for a homeowner who wanted a simple, easy-to-manage setup.",
      },
      {
        title: "Vacation Rental Tech Refresh",
        description:
          "Set up TVs, network-connected devices, and guest-facing technology in a managed property to improve the guest experience and reduce troubleshooting calls.",
      },
      {
        title: "Office Equipment Deployment",
        description:
          "Installed essential workplace technology and ensured staff could immediately use devices, accounts, and shared systems without a long setup period.",
      },
    ],
    outcomes: ["Professional installation", "Reduced technical issues", "Cleaner user experience", "Less downtime"],
  },
  {
    id: "business-insight",
    title: "Business Insight & Analysis",
    shortTitle: "Insight & Analysis",
    icon: BarChart3,
    blurb:
      "Actionable reporting, analysis, and decision support to help you identify opportunities and improve results.",
    hero:
      "Use your data to make sharper business decisions.",
    overview:
      "We help clients make sense of operations, performance, and trends by translating information into useful insights. Instead of overwhelming you with raw data, we focus on the patterns, issues, and opportunities that matter most so you can act with clarity.",
    examples: [
      {
        title: "Performance Trend Review",
        description:
          "Analyzed operational data to identify recurring delays, staffing bottlenecks, and service gaps, then presented practical recommendations to improve turnaround time.",
      },
      {
        title: "Revenue and Efficiency Snapshot",
        description:
          "Built a leadership-ready summary showing where time and resources were being lost, helping a business prioritize process changes with the highest impact.",
      },
      {
        title: "Client Reporting Package",
        description:
          "Developed clear reporting for stakeholders who needed a concise understanding of performance without digging through multiple disconnected spreadsheets.",
      },
    ],
    outcomes: ["Clearer reporting", "Better prioritization", "Smarter decisions", "Improved visibility"],
  },
  {
    id: "workflow-optimization",
    title: "Workflow Optimization",
    shortTitle: "Workflow Optimization",
    icon: Workflow,
    blurb:
      "Streamlined processes that remove friction, improve consistency, and help your team move faster.",
    hero:
      "Simplify operations and unlock efficiency across your workflow.",
    overview:
      "We review how work gets done, identify unnecessary steps, and build more efficient workflows that support better outcomes. That can include process redesign, automation opportunities, handoff improvements, or better documentation so your team spends less time chasing tasks and more time completing them.",
    examples: [
      {
        title: "Approval Process Redesign",
        description:
          "Mapped a multi-step approval workflow, removed redundant touchpoints, and shortened turnaround times by introducing clearer ownership and automated notifications.",
      },
      {
        title: "Standard Operating Procedure Buildout",
        description:
          "Created step-by-step workflow documentation for repeatable tasks so teams could execute consistently across shifts, locations, or departments.",
      },
      {
        title: "Service Coordination Improvement",
        description:
          "Reorganized task handoffs between operations, support, and field teams to reduce missed updates and improve accountability.",
      },
    ],
    outcomes: ["Greater efficiency", "Fewer handoff issues", "More consistency", "Scalable operations"],
  },
];

const navItems = [
  { id: "home", label: "Home" },
  ...services.map((s) => ({ id: s.id, label: s.shortTitle })),
  { id: "contact", label: "Contact" },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="text-base md:text-lg text-slate-600 leading-8">{description}</p>
    </div>
  );
}

function ServiceCard({ service, onOpen }) {
  const Icon = service.icon;
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full rounded-3xl border-slate-200 shadow-sm">
        <CardHeader className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Icon className="w-6 h-6 text-slate-700" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
            <CardDescription className="text-slate-600 leading-7">
              {service.blurb}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={() => onOpen(service.id)} className="rounded-2xl">
            View page <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function HomePage({ onOpen }) {
  return (
    <div className="space-y-24">
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Technical solutions for modern operations
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Practical technology services built around real-world needs.
            </h1>
            <p className="text-lg text-slate-600 leading-8 max-w-2xl">
              We help clients implement better systems, streamline workflows, improve operations, and solve technical challenges with practical, results-driven support.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-2xl" onClick={() => onOpen("contact")}>
              Request a Consultation
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl" onClick={() => onOpen("application-development")}>
              Explore services
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {[
              "Custom solutions tailored to real operational needs",
              "Hands-on support for businesses, property managers, and homeowners",
              "Clear implementation with practical, results-driven execution",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 px-4 py-4 text-sm font-medium text-slate-700 bg-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm"
        >
          <div className="grid gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="flex items-start gap-4 rounded-2xl bg-white p-4 border border-slate-100">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{service.shortTitle}</p>
                    <p className="text-sm text-slate-600 leading-6">{service.blurb}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="What we do"
          title="A complete suite of technical and operational services"
          description="We partner with businesses, property managers, and homeowners to implement technology that makes operations smoother, support easier, and decision-making stronger."
        />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Who we help</CardTitle>
            <CardDescription className="text-base leading-7">
              Our services are designed for organizations and individuals who want practical outcomes, not unnecessary complexity.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-slate-700">
            {[
              "Small and mid-sized businesses improving internal operations",
              "Property managers modernizing systems and guest-facing technology",
              "Homeowners needing reliable device setup and support",
              "Teams rolling out new tools and processes across departments",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 text-slate-700" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm bg-white text-black">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Our mission</CardTitle>
            <CardDescription className="text-black text-base leading-7">
              To simplify complex challenges and deliver practical, results-driven solutions that empower clients to thrive in a competitive landscape.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-black leading-7">
            <p>
              We believe technology should make work easier, decisions clearer, and daily operations more efficient.
            </p>
            <p>
              Whether you need a custom application, better documentation, on-site device setup, or a smarter workflow, we build solutions that fit your environment and move your goals forward.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ServicePage({ service, onOpen }) {
  const Icon = service.icon;
  return (
    <div className="space-y-16">
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <div className="space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Icon className="w-7 h-7 text-slate-700" />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Service page</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{service.title}</h1>
            <p className="text-xl text-slate-600 leading-8">{service.hero}</p>
          </div>
          <p className="text-base md:text-lg text-slate-600 leading-8 max-w-3xl">{service.overview}</p>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-2xl" onClick={() => onOpen("contact")}>Talk to us</Button>
            <Button variant="outline" className="rounded-2xl" onClick={() => onOpen("home")}>Back to home</Button>
          </div>
        </div>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">What clients gain</CardTitle>
            <CardDescription className="text-base leading-7">
              We focus on measurable improvements and practical value.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {service.outcomes.map((item) => (
              <div key={item} className="flex gap-3 text-slate-700"><CheckCircle2 className="w-5 h-5 mt-0.5" /><span>{item}</span></div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Examples"
          title="Clear examples of this service in action"
          description="Here are sample scenarios that show how this service can solve real-world problems for businesses, property managers, and homeowners."
        />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {service.examples.map((example) => (
            <motion.div key={example.title} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="h-full rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl leading-7">{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-7">{example.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

     <section className="rounded-[2rem] bg-slate-900 px-8 py-10 text-white">
  <div className="max-w-3xl space-y-4">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Next step</p>
    <h2 className="text-3xl font-bold text-white">Need help with {service.shortTitle.toLowerCase()}?</h2>
    <p className="text-slate-300 leading-8">
      We tailor every engagement to the client’s actual goals, systems, and environment. Let’s talk through your needs and design the right approach.
    </p>
    <Button className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100" onClick={() => onOpen("contact")}>
      Contact us <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </div>
</section>
    </div>
  );
}

function ContactPage() {
  const [state, handleSubmit] = useForm("mnjlpyya");

  return (
    <div className="space-y-12">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build the right solution for your needs"
        description="Tell us about your project and we’ll follow up with next steps."
      />

      <div className="max-w-2xl">
        {state.succeeded ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">Thank you.</h3>
            <p className="mt-2 text-slate-600">
              Your message has been sent successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <Button type="submit" disabled={state.submitting}>
              {state.submitting ? "Sending..." : "Request a Consultation"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function TechnicalSolutionsCompanyWebsite() {
  const [activePage, setActivePage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeService = useMemo(
    () => services.find((service) => service.id === activePage),
    [activePage]
  );

  const openPage = (page) => {
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <button onClick={() => openPage("home")} className="text-left">
            <div className="font-bold text-xl tracking-tight">Aloha Technology Solutions</div>
            <div className="text-sm text-slate-500">Technical Solutions & Support</div>
          </button>

          <nav className="hidden xl:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => openPage(item.id)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition ${
                  activePage === item.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="xl:hidden p-2 rounded-xl border border-slate-200"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openPage(item.id)}
                  className={`px-4 py-3 rounded-2xl text-left text-sm font-medium ${
                    activePage === item.id ? "bg-slate-900 text-white" : "text-slate-700 bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {activePage === "home" && <HomePage onOpen={openPage} />}
        {activeService && <ServicePage service={activeService} onOpen={openPage} />}
        {activePage === "contact" && <ContactPage />}
      </main>

      <footer className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">Aloha Technology Solutions</p>
            <p>Practical, results-driven technical solutions.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => openPage("home")} className="hover:text-slate-900">Home</button>
            {services.map((service) => (
              <button key={service.id} onClick={() => openPage(service.id)} className="hover:text-slate-900">
                {service.shortTitle}
              </button>
            ))}
            <button onClick={() => openPage("contact")} className="hover:text-slate-900">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
