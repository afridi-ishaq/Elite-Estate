import Container from "@/components/Container";
import { getLeadById } from "@/lib/lead-service";
import { notFound } from "next/navigation";
import LeadStatusSelect from "@/components/LeadStatusSelect";
import LeadNotes from "@/components/LeadNotes";
import { SOURCE_LABELS, STATUS_LABELS } from "@/lib/lead-constants";

function describeActivity(a) {
  if (a.type === "STATUS_CHANGED") {
    return `Status changed: ${STATUS_LABELS[a.fromStatus]} → ${STATUS_LABELS[a.toStatus]}`;
  }
  return a.note || a.type;
}

export default async function LeadDetailsPage({ params }) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) notFound();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Lead Details</h1>
              <span className="bg-[#D9C7A7]/40 text-[#0F4C5C] px-3 py-1 rounded-full text-sm font-medium">
                {SOURCE_LABELS[lead.source]}
              </span>
            </div>

            <div className="space-y-4">
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone}</p>
              <p><strong>City:</strong> {lead.city || "-"}</p>
              <p><strong>Property Type:</strong> {lead.propertyType || "-"}</p>
              <p>
                <strong>Budget:</strong>{" "}
                {lead.budget ? lead.budget.toLocaleString() : "-"}
              </p>

              <div>
                <p className="mb-2"><strong>Status</strong></p>
                <LeadStatusSelect
                  leadId={lead.id}
                  currentStatus={lead.status}
                />
              </div>

              <p><strong>Message:</strong></p>
              <div className="bg-gray-100 p-4 rounded-xl">
                {lead.message || "No message"}
              </div>

              <p className="pt-4"><strong>Internal Notes:</strong></p>
              <LeadNotes leadId={lead.id} initialNotes={lead.notes} />
            </div>

            <a
              href="/admin/leads"
              style={{ color: "white" }}
              className="inline-block mt-8 bg-[#0F4C5C] text-white px-5 py-3 rounded-xl hover:bg-[#0b3844] transition-colors"
            >
              Back to Leads
            </a>
          </div>

          {/* Right: timeline */}
          <div className="bg-white rounded-3xl p-8 shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-6">Timeline</h2>

            <ol className="relative border-l-2 border-[#D9C7A7] ml-2 space-y-6">
              {lead.activities.map((a) => (
                <li key={a.id} className="ml-6">
                  <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-[#C89B3C]" />
                  <p className="font-medium text-sm">{describeActivity(a)}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(a.createdAt).toLocaleString("en-GB")}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </main>
  );
}