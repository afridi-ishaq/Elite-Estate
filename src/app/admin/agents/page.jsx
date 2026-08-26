import Link from "next/link";
import Container from "@/components/Container";
import { getAgents } from "@/lib/agent-service";

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <main className="pt-24 pb-24 min-h-screen">
      <Container className="max-w-full px-2 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Agents
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage team members and agent directory
            </p>
          </div>

          <Link
            href="/admin/agents/new"
            style={{ color: "white" }}
            className="inline-flex items-center justify-center bg-[#0F4C5C] hover:bg-[#0c3d4a] text-white font-medium px-5 py-3 rounded-xl transition duration-200 shadow-sm text-sm"
          >
            + Add Agent
          </Link>
        </div>

        {/* Content Section */}
        {!agents || agents.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">No Agents Found</h2>
            <p className="text-gray-500 text-sm mt-1">
              Get started by adding your first real estate agent.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-lg font-semibold uppercase tracking-wider text-gray-900">
                    <th className="p-4 pl-6">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Title</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {agents.map((agent) => (
                    <tr
                      key={agent.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="p-4 pl-6 font-semibold text-gray-900 whitespace-nowrap">
                        {agent.name}
                      </td>

                      <td className="p-4 text-gray-700 whitespace-nowrap">
                        {agent.email}
                      </td>

                      <td className="p-4 text-gray-700 whitespace-nowrap">
                        {agent.phone || "—"}
                      </td>

                      <td className="p-4 text-gray-700 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                          {agent.title || "Agent"}
                        </span>
                      </td>

                      <td className="p-4 pr-6 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/agents/${agent.id}`}
                          style={{ color: "white" }}
                          className="inline-block bg-[#0F4C5C] hover:bg-[#0c3d4a] text-white text-xs font-medium px-4 py-2 rounded-lg transition"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-gray-100">
              {agents.map((agent) => (
                <div key={agent.id} className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h2 className="font-bold text-gray-900 text-base">
                        {agent.name}
                      </h2>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {agent.title || "Agent"}
                      </span>
                    </div>

                    <Link
                      href={`/admin/agents/${agent.id}`}
                      className="bg-[#0F4C5C] hover:bg-[#0c3d4a] text-white text-xs font-medium px-3.5 py-2 rounded-lg transition"
                    >
                      Edit
                    </Link>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="font-medium text-gray-800">{agent.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Phone</span>
                      <span className="font-medium text-gray-800">{agent.phone || "—"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}