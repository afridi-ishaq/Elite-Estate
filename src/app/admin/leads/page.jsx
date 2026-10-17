export const dynamic = "force-dynamic";

import Link from "next/link";
import Container from "@/components/Container";
import { getLeads } from "@/lib/lead-service";
import { SOURCE_LABELS } from "@/lib/lead-constants";

const TEMP_STYLES = {
  HOT: "bg-red-100 text-red-700",
  WARM: "bg-amber-100 text-amber-700",
  COLD: "bg-blue-100 text-blue-700",
};

function ScoreBadge({ lead }) {
  if (lead.aiScore === null || lead.aiScore === undefined) {
    return <span className="text-sm text-gray-400">Not scored</span>;
  }
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        TEMP_STYLES[lead.aiTemperature] || "bg-gray-100 text-gray-700"
      }`}
    >
      {lead.aiTemperature} · {lead.aiScore}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
      {status?.replace("_", " ")}
    </span>
  );
}

function SourceBadge({ source }) {
  return (
    <span className="rounded-full bg-[#D9C7A7]/40 px-3 py-1 text-xs text-[#0F4C5C]">
      {SOURCE_LABELS[source] || source}
    </span>
  );
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <main className="pb-24 pt-24 md:pt-32">
      <Container>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Leads Management</h1>
          <Link
            href="/admin/leads/new"
            className="inline-flex items-center justify-center rounded-xl bg-[#C89B3C] px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            + Add Lead
          </Link>
        </div>

        {leads.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center text-gray-500 shadow-md">
            No leads yet.
          </div>
        )}

        {/* Mobile: cards */}
        <div className="space-y-3 md:hidden">
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href={`/admin/leads/${lead.id}`}
              className="block rounded-2xl bg-white p-4 shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{lead.name}</p>
                  <p className="truncate text-sm text-gray-500">{lead.email}</p>
                  <p className="text-sm text-gray-500">{lead.phone}</p>
                </div>
                <StatusBadge status={lead.status} />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <SourceBadge source={lead.source} />
                <ScoreBadge lead={lead} />
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: table */}
        {leads.length > 0 && (
          <div className="hidden overflow-hidden rounded-3xl bg-white shadow-md md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Source</th>
                    <th className="p-4 text-left">AI Score</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b transition hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">{lead.name}</td>
                      <td className="p-4">{lead.email}</td>
                      <td className="p-4">{lead.phone}</td>
                      <td className="p-4">
                        <SourceBadge source={lead.source} />
                      </td>
                      <td className="p-4">
                        <ScoreBadge lead={lead} />
                      </td>
                      <td className="p-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center rounded-lg bg-[#0F4C5C] px-4 py-2 text-white transition hover:opacity-90"
                        >
                          View Lead
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}