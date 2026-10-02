export const dynamic = "force-dynamic";
import Link from "next/link";
import Container from "@/components/Container";
import { getLeads } from "@/lib/lead-service";
import { SOURCE_LABELS } from "@/lib/lead-constants";
// Removed unused redirect import

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <main className="pt-32 pb-24">
      <Container>
        {/* Changed from button to Link */}

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Leads Management</h1>
          <Link
            href="/admin/leads/new"
            className="bg-[#C89B3C] px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            style={{ color: "white" }}
          >
            + Add Lead
          </Link>
        </div>
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left"> Name </th>
                <th className="p-4 text-left"> Email </th>
                <th className="p-4 text-left"> Phone </th>
                <th className="p-4 text-left"> Source </th>
                <th className="p-4 text-left"> Status </th>
                <th className="p-4 text-left"> Actions </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50 transition" >
                  <td className="p-4 font-medium"> {lead.name} </td>
                  <td className="p-4"> {lead.email} </td>
                  <td className="p-4"> {lead.phone} </td>
                  <td className="p-4">
                    <span className="bg-[#D9C7A7]/40 text-[#0F4C5C] px-3 py-1 rounded-full text-sm">
                      {SOURCE_LABELS[lead.source]}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className=" bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm " >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className=" inline-flex items-center bg-[#0F4C5C] text-white px-4 py-2 rounded-lg hover:opacity-90 transition "
                      style={{ color: "white" }}
                    >
                      View Lead
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
