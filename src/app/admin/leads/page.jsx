import Container from "@/components/Container";
import { getLeads } from "@/lib/lead-service";
import LeadStatusSelect from "@/components/LeadStatusSelect";

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <h1 className="text-4xl font-bold mb-8">
          Leads Management
        </h1>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Status
                </th>
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
                    <LeadStatusSelect
                      id={lead.id}
                      currentStatus={lead.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}