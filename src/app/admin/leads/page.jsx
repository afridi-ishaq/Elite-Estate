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
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.status}</td>

                  <td>
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="
        bg-[#0F4C5C]
        text-white
        px-3
        py-2
        rounded-lg
      "
                      style={{ color: "white" }}
                    >
                      View
                    </Link>
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