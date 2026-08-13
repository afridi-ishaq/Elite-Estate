import Container from "@/components/Container";
import { getLeads } from "@/lib/lead-service";

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Leads
          </h1>

          <p className="text-gray-600 mt-3">
            Manage customer inquiries
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0F4C5C] text-white">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {lead.name}
                  </td>

                  <td className="p-4">
                    {lead.email}
                  </td>

                  <td className="p-4">
                    {lead.phone}
                  </td>

                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No leads found.
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}