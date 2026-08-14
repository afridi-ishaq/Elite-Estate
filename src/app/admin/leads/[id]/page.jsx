import Container from "@/components/Container";
import { getLeadById } from "@/lib/lead-service";
import { notFound } from "next/navigation";

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

            <p>
              <strong>Status:</strong> {lead.status}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div className="bg-gray-100 p-4 rounded-xl">
              {lead.message || "No message"}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}