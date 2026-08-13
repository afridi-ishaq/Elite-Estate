import { getLeads } from "@/lib/lead-service";

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <main className="pt-32 pb-24 px-8">
      <h1 className="text-4xl font-bold mb-8">
        Leads Dashboard
      </h1>

      {leads.length === 0 ? (
        <div
          className="
            bg-white
            rounded-2xl
            p-12
            text-center
          "
        >
          <h2 className="text-2xl font-bold">
            No Leads Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Inquiry submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="
              w-full
              bg-white
              rounded-2xl
              overflow-hidden
            "
          >
            <thead className="bg-[#0F4C5C] text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b"
                >
                  <td className="p-4">{lead.name}</td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">{lead.phone}</td>
                  <td className="p-4">
                    {lead.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}