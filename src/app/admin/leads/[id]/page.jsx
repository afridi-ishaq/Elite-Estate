
import Container from "@/components/Container";
import { getLeadById } from "@/lib/lead-service";
import { notFound } from "next/navigation";
import LeadStatusSelect from "@/components/LeadStatusSelect";
import LeadNotes from "@/components/LeadNotes";
import { SOURCE_LABELS, STATUS_LABELS } from "@/lib/lead-constants";
import AnalyzeButton from "@/components/AnalyzeButton";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Wallet,
  MessageSquare,
  FileText,
  BrainCircuit,
  Clock,
  ArrowLeft,
  Sparkles,
  Activity,
} from "lucide-react";

function describeActivity(a) {
  if (a.type === "STATUS_CHANGED") {
    return `Status changed: ${STATUS_LABELS[a.fromStatus]} → ${STATUS_LABELS[a.toStatus]}`;
  }

  return a.note || a.type;
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
        <Icon size={20} />
      </div>

      <div>
        <h2 className="font-bold text-slate-800">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
}

export default async function LeadDetailsPage({ params }) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) notFound();

  const TEMP_STYLES = {
    HOT: "bg-red-100 text-red-700",
    WARM: "bg-amber-100 text-amber-700",
    COLD: "bg-blue-100 text-blue-700",
  };

  const temperatureStyle =
    TEMP_STYLES[lead.aiTemperature] || "bg-slate-100 text-slate-600";

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <Container>
        <div className="mx-auto max-w-6xl">

          {/* Page heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#0F4C5C]">
                ADMINISTRATION / LEADS
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Lead Details
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                View and manage customer information, qualification, and activity.
              </p>
            </div>

            <a
              href="/admin/leads"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#0F4C5C] hover:text-[#0F4C5C]"
            >
              <ArrowLeft size={17} />
              Back to Leads
            </a>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Main lead information */}
            <div className="space-y-6 lg:col-span-2">

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Card header */}
                <div className="bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-6 py-7 text-white sm:px-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        Customer Information
                      </p>
                      <h2 className="mt-1 text-2xl font-bold">
                        {lead.name}
                      </h2>
                      <p className="mt-1 text-sm text-white/75">
                        Lead ID: {lead.id}
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white">
                      {SOURCE_LABELS[lead.source] || lead.source}
                    </span>
                  </div>
                </div>

                <div className="space-y-8 p-6 sm:p-8">

                  {/* Contact information */}
                  <section>
                    <SectionHeading
                      icon={User}
                      title="Contact Information"
                      description="Customer's personal and contact details"
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <DetailItem
                        icon={User}
                        label="Full Name"
                        value={lead.name}
                      />

                      <DetailItem
                        icon={Mail}
                        label="Email Address"
                        value={lead.email}
                      />

                      <DetailItem
                        icon={Phone}
                        label="Phone Number"
                        value={lead.phone}
                      />

                      <DetailItem
                        icon={MapPin}
                        label="City"
                        value={lead.city}
                      />
                    </div>
                  </section>

                  {/* Property requirements */}
                  <section>
                    <SectionHeading
                      icon={Home}
                      title="Property Requirements"
                      description="Customer's preferred property and budget"
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <DetailItem
                        icon={Home}
                        label="Property Type"
                        value={lead.propertyType}
                      />

                      <DetailItem
                        icon={Wallet}
                        label="Budget"
                        value={
                          lead.budget
                            ? lead.budget.toLocaleString()
                            : "-"
                        }
                      />
                    </div>
                  </section>

                  {/* Lead status */}
                  <section>
                    <SectionHeading
                      icon={Activity}
                      title="Lead Status"
                      description="Update the current customer lead status"
                    />

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <LeadStatusSelect
                        leadId={lead.id}
                        currentStatus={lead.status}
                      />
                    </div>
                  </section>

                  {/* Customer message */}
                  <section>
                    <SectionHeading
                      icon={MessageSquare}
                      title="Customer Message"
                      description="Original message submitted by the customer"
                    />

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                      {lead.message || "No message provided."}
                    </div>
                  </section>

                  {/* Internal notes */}
                  <section>
                    <SectionHeading
                      icon={FileText}
                      title="Internal Notes"
                      description="Private notes for your team"
                    />

                    <LeadNotes
                      leadId={lead.id}
                      initialNotes={lead.notes}
                    />
                  </section>

                </div>
              </section>
            </div>

            {/* Right sidebar */}
            <aside className="space-y-6">

              {/* AI Qualification */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-6 py-5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <BrainCircuit size={21} />
                    </div>

                    <div>
                      <h2 className="font-bold">AI Qualification</h2>
                      <p className="text-xs text-white/70">
                        Intelligent lead analysis
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {lead.aiScore !== null ? (
                    <div className="space-y-5">

                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${temperatureStyle}`}
                        >
                          {lead.aiTemperature || "UNKNOWN"} LEAD
                        </span>

                        <div className="text-right">
                          <span className="text-3xl font-bold text-[#0F4C5C]">
                            {lead.aiScore}
                          </span>
                          <span className="ml-1 text-sm text-slate-400">
                            / 100
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                          Summary
                        </p>
                        <p className="text-sm leading-6 text-slate-700">
                          {lead.aiSummary || "No summary available."}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                          Recommendation
                        </p>
                        <div className="rounded-xl border border-[#D9C7A7]/40 bg-[#D9C7A7]/20 p-4 text-sm leading-6 text-slate-700">
                          {lead.aiRecommendation || "No recommendation available."}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-4 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
                        <Sparkles size={23} />
                      </div>

                      <p className="font-semibold text-slate-800">
                        Not analyzed yet
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Run AI qualification to evaluate this lead.
                      </p>
                    </div>
                  )}

                  <div className="mt-5">
                    <AnalyzeButton
                      leadId={lead.id}
                      hasAnalysis={lead.aiScore !== null}
                    />
                  </div>
                </div>
              </section>

              {/* Activity timeline */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeading
                  icon={Clock}
                  title="Activity Timeline"
                  description="History of lead updates"
                />

                {lead.activities.length > 0 ? (
                  <ol className="relative ml-2 space-y-6 border-l-2 border-[#D9C7A7]">
                    {lead.activities.map((a) => (
                      <li key={a.id} className="relative ml-6">
                        <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#C89B3C] shadow-sm" />

                        <p className="text-sm font-semibold leading-5 text-slate-800">
                          {describeActivity(a)}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {new Date(a.createdAt).toLocaleString("en-GB")}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-slate-500">
                    No activity recorded yet.
                  </p>
                )}
              </section>

            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
}
