import Container from "@/components/Container";
import { getLeadById } from "@/lib/lead-service";
import { notFound } from "next/navigation";
import LeadStatusSelect from "@/components/LeadStatusSelect";
import Link from "next/link";


export default async function LeadDetailsPage({
  params,
}) {
  const { id } = await params;

  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="bg-white rounded-3xl p-8 shadow-md">
          <h1 className="text-4xl font-bold mb-8">
            Lead Details
          </h1>

          <div className="space-y-4">
            <p>
              <strong>Name:</strong> {lead.name}
            </p>

            <p>
              <strong>Email:</strong> {lead.email}
            </p>

            <p>
              <strong>Phone:</strong> {lead.phone}
            </p>

            <p>
              <strong>City:</strong> {lead.city || "-"}
            </p>

            <p>
              <strong>Budget:</strong> {lead.budget || "-"}
            </p>

            <div>
            <p className="mb-2">
                <strong>Status</strong>
            </p>

            <LeadStatusSelect
                leadId={lead.id}
                currentStatus={lead.status}
            />
            </div>

            <p>
              <strong>Message:</strong>
            </p>

            <div className="bg-gray-100 p-4 rounded-xl">
              {lead.message || "No message"}
            </div>
          </div>
            <Link 
            href="/admin/leads" 
            style={{ color: "white" }}
            className="inline-block mt-6 bg-[#0F4C5C] text-white px-5 py-3 rounded-xl hover:bg-[#0b3844] transition-colors"
            >
            OK
            </Link>
        </div>
      </Container>
    </main>
  );
}