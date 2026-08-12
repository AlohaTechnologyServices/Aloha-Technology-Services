import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Minus, ShieldCheck } from "lucide-react";
import {
  GET_NOTICE,
  getInspectionByPageId,
  inspectionClassifications,
  inspectionServices,
} from "./inspectionData";

function PricingTable({ block, onOpen }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <h3 className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-base font-bold text-[#061B33]">{block.title}</h3>
      <div>
        {block.rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-2 border-t border-slate-100 px-5 py-4 first:border-t-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5"
          >
            <span className="min-w-0 leading-6 text-slate-600">{row.label}</span>
            {row.estimate ? (
              <button
                onClick={() => onOpen("contact")}
                className="justify-self-start rounded-xl bg-[#1268D5] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0D57B5] sm:justify-self-end"
              >
                Request an Estimate
              </button>
            ) : (
              <strong className="text-[#061B33] sm:text-right">{row.price}</strong>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Breadcrumbs({ inspection, onOpen }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
      <button onClick={() => onOpen("home")} className="hover:text-[#1268D5]">Home</button>
      <ChevronRight className="h-4 w-4" />
      <button onClick={() => onOpen("home-inspections")} className="hover:text-[#1268D5]">Home Inspections</button>
      <ChevronRight className="h-4 w-4" />
      <span className="font-semibold text-slate-700">{inspection.shortTitle}</span>
    </nav>
  );
}

export default function InspectionDetailPage({ pageId, onOpen }) {
  const inspection = getInspectionByPageId(pageId);

  if (!inspection) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-3xl font-bold text-[#061B33]">Inspection page not found</h1>
        <button onClick={() => onOpen("home-inspections")} className="mt-5 font-bold text-[#1268D5]">Return to Home Inspections</button>
      </div>
    );
  }

  const Icon = inspection.icon;
  const related = inspectionServices.filter((item) => item.id !== inspection.id).slice(0, 3);

  return (
    <div className="space-y-14 md:space-y-16">
      <Breadcrumbs inspection={inspection} onOpen={onOpen} />

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[340px] lg:min-h-[520px]">
            <img src={inspection.image} alt={`${inspection.title} on Hawaiʻi Island`} className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061B33]/30 to-transparent" />
          </div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-7 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1268D5] text-white"><Icon className="h-6 w-6" /></span>
              {inspection.badge && <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-[#0D57B5]">{inspection.badge}</span>}
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#1268D5]">Residential inspection service</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#061B33] md:text-5xl">{inspection.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{inspection.short}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1268D5]">Best for</p>
                <p className="mt-2 leading-6 text-slate-700">{inspection.bestFor}</p>
              </div>
              <div className="rounded-xl border border-white bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1268D5]">Pricing</p>
                <p className="mt-2 text-lg font-bold text-[#061B33]">{inspection.startingPrice}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">See the complete rate schedule below.</p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => onOpen("contact")} className="inline-flex items-center gap-2 rounded-xl bg-[#1268D5] px-5 py-3 font-semibold text-white transition hover:bg-[#0D57B5]">
                Request This Inspection <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => onOpen("home-inspections")} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-[#061B33] transition hover:border-[#1268D5] hover:text-[#1268D5]">
                <ArrowLeft className="h-4 w-4" /> Compare Inspections
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1268D5]">Scope of work</p>
          <h2 className="mt-3 text-3xl font-bold text-[#061B33]">What is normally reviewed</h2>
          <p className="mt-4 leading-7 text-slate-600">The exact inspection scope is confirmed before service. Accessible conditions are reviewed using visual, non-invasive methods and normal user controls where appropriate and safe.</p>
          <div className="mt-7 grid gap-4">
            {inspection.scope.map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E9C73]" />
                <p className="leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7 md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Scope boundaries</p>
          <h2 className="mt-3 text-2xl font-bold text-[#061B33]">What this inspection does not represent</h2>
          <div className="mt-6 grid gap-4">
            {inspection.boundaries.map((item) => (
              <div key={item} className="flex gap-3">
                <Minus className="mt-1 h-4 w-4 shrink-0 text-amber-700" />
                <p className="leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-[2rem] bg-[#061B33] p-7 text-white md:p-9">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <ShieldCheck className="h-9 w-9 text-[#77D7CF]" />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-[#77D7CF]">What you receive</p>
            <h2 className="mt-3 text-2xl font-bold">A report designed to support clear next actions.</h2>
          </div>
          <p className="text-lg leading-8 text-slate-100">{inspection.deliverable}</p>
        </div>
      </section>

      <section className="space-y-7">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1268D5]">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold text-[#061B33]">Inspection rates</h2>
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-950"><strong>{GET_NOTICE}</strong></div>
        </div>

        {inspection.pricingCustom ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-9">
            <h3 className="text-2xl font-bold text-[#061B33]">Custom quote based on the requested inspection scope</h3>
            <p className="mt-4 leading-7 text-slate-600">Each client receives a defined scope and per-visit price before service begins. Pricing considers:</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {inspection.pricingFactors.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1268D5]" />
                  <span className="leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onOpen("contact")} className="mt-7 rounded-xl bg-[#1268D5] px-5 py-3 font-semibold text-white hover:bg-[#0D57B5]">Request a Custom Quote</button>
          </div>
        ) : (
          <div className={`grid gap-5 ${(inspection.pricing || []).length > 1 ? "lg:grid-cols-2" : "grid-cols-1"}`}>
            {(inspection.pricing || []).map((block) => <PricingTable key={block.title} block={block} onOpen={onOpen} />)}
          </div>
        )}

        {inspection.pricingNotes?.length > 0 && (
          <div className="rounded-2xl bg-slate-50 px-6 py-5">
            {inspection.pricingNotes.map((note) => <p key={note} className="text-sm leading-7 text-slate-600">{note}</p>)}
          </div>
        )}
      </section>

      <section className="space-y-7">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1268D5]">Report classifications</p>
          <h2 className="mt-3 text-3xl font-bold text-[#061B33]">How ATS communicates recommended response</h2>
          <p className="mt-4 leading-7 text-slate-600">The same five classifications are used in the ATS Inspector application and customer report.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {inspectionClassifications.map((item) => (
            <article key={item.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#061B33]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1268D5]">Related inspection services</p>
            <h2 className="mt-3 text-3xl font-bold text-[#061B33]">Compare other inspection scopes</h2>
          </div>
          <button onClick={() => onOpen("home-inspections")} className="font-bold text-[#1268D5]">View all 11 inspections</button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <button key={item.id} onClick={() => onOpen(item.pageId)} className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img src={item.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-bold text-[#061B33]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.short}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-[#0B2B4D] to-[#1268D5] px-8 py-11 text-white">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">Ready to request this inspection?</h2>
            <p className="mt-4 leading-7 text-blue-100">Include the property location, approximate inspected area, property type, desired date and any known concerns that may affect access or scope.</p>
          </div>
          <button onClick={() => onOpen("contact")} className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#061B33] transition hover:bg-slate-100">
            Request Inspection <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
