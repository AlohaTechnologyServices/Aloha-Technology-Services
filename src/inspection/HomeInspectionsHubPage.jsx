import React from "react";
import { ArrowRight, CheckCircle2, FileText, MapPin, ShieldCheck, Thermometer } from "lucide-react";
import { GET_NOTICE, inspectionClassifications, inspectionServices } from "./inspectionData";

function InspectionCard({ inspection, onOpen }) {
  const Icon = inspection.icon;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_34px_rgba(6,27,51,0.07)] transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={inspection.image}
          alt={`${inspection.title} service`}
          className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.025]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#1268D5] text-white shadow-lg">
          <Icon className="h-5 w-5" />
        </div>
        {inspection.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0D57B5] shadow">
            {inspection.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-bold leading-6 text-[#061B33]">{inspection.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{inspection.short}</p>
        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">Pricing</p>
          <p className="mt-1 font-bold text-[#061B33]">{inspection.startingPrice}</p>
        </div>
        <button
          onClick={() => onOpen(inspection.pageId)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1268D5] transition hover:text-[#0D57B5]"
        >
          View scope, pricing & details <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function HomeInspectionsHubPage({ onOpen }) {
  const addOns = inspectionServices.filter((inspection) => inspection.badge);

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="overflow-hidden rounded-[2rem] bg-[#061B33] text-white shadow-2xl">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="px-7 py-12 md:px-11 lg:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77D7CF]">Residential inspection services</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">The right inspection starts with a clearly defined scope.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              ATS offers eleven inspection workflows for buyers, sellers, current owners, new construction, targeted system concerns and owner-directed condition documentation. Each service now has its own page with scope, limitations, deliverables and pricing.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Visual & non-invasive", text: "The agreed scope is confirmed before fieldwork begins." },
                { icon: Thermometer, title: "Useful diagnostic tools", text: "Thermal imaging and moisture readings supplement visual observations when appropriate." },
                { icon: FileText, title: "Customer-friendly reports", text: "Photographs, classifications, limitations and recommended next actions." },
                { icon: MapPin, title: "Hawaiʻi Island context", text: "Local awareness of moisture, corrosion, drainage, coastal exposure and island logistics." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#77D7CF]" />
                  <div>
                    <p className="font-bold">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onOpen("contact")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#061B33] shadow-sm transition hover:bg-slate-100"
            >
              Request an Inspection <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative min-h-[420px]">
            <img
              src="/images/home-inspection-hero.jpg"
              alt="Hawaiʻi Island residence representing ATS home inspection services"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061B33]/45 to-transparent" />
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">Compare inspection services</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#061B33] md:text-4xl">Choose the inspection that matches the property decision.</h2>
          <p className="text-base leading-8 text-slate-600 md:text-lg">
            Select a service to review the exact customer-facing scope, professional boundaries, report deliverable and pricing. Dedicated pages make each inspection easier to compare, share and revisit.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-950">
          <strong>{GET_NOTICE}</strong>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {inspectionServices.map((inspection) => (
            <InspectionCard key={inspection.id} inspection={inspection} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-100 bg-emerald-50 px-7 py-10 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Bundled add-on options</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33]">Add targeted systems to another qualifying inspection.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Moisture/water-intrusion and irrigation services have published add-on pricing where shown. Pool/spa pricing is listed on its dedicated page. Final scope depends on access, system complexity and the requested work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {addOns.map((inspection) => (
              <button
                key={inspection.id}
                onClick={() => onOpen(inspection.pageId)}
                className="rounded-2xl border border-white bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <inspection.icon className="h-7 w-7 text-emerald-700" />
                <h3 className="mt-4 font-bold text-[#061B33]">{inspection.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{inspection.startingPrice}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1268D5]">ATS report classifications</p>
          <h2 className="text-3xl font-bold text-[#061B33] md:text-4xl">One classification system across the website, inspector app and report.</h2>
          <p className="leading-8 text-slate-600">
            Condition status describes what was observed. Classification communicates the recommended response. They are kept separate so customers can quickly understand what deserves attention.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {inspectionClassifications.map((item) => (
            <article key={item.key} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-bold text-[#061B33]">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-7 text-amber-950">
        <strong>General inspection boundary:</strong> ATS residential inspections are visual, non-invasive reviews of readily accessible conditions present at the time of inspection. They are not warranties or guarantees and do not predict future performance or remaining service life. Regulated or specialist evaluation is referred to the appropriately qualified professional when needed.
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-[#0B2B4D] to-[#1268D5] px-8 py-11 text-white">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">Not sure which inspection fits the property?</h2>
            <p className="mt-4 leading-7 text-blue-100">Send the property type, approximate size, location, timing and the decision you are trying to make. ATS can identify the most appropriate inspection scope before quoting the work.</p>
          </div>
          <button
            onClick={() => onOpen("contact")}
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-[#061B33] transition hover:bg-slate-100"
          >
            Contact ATS
          </button>
        </div>
      </section>
    </div>
  );
}
