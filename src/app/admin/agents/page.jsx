import Link from "next/link";
import { getAgents } from "@/lib/agent-service";

export default async function AdminAgentsPage() {
  const agents = await getAgents();

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Agents
            </h1>

            <p className="text-slate-500 mt-1">
              Manage your real estate agents.
            </p>
          </div>

          <Link
            href="/admin/agents/new"
            className="bg-[#0F4C5C] text-white px-5 py-3 rounded-xl font-semibold"
          >
            + Add Agent
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          {agents.length === 0 ? (
            <div className="p-10 text-center">
              <h2 className="text-xl font-semibold">
                No Agents Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Add your first agent.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">

                    {agent.image ? (
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center">
                        {agent.name?.charAt(0)}
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold">
                        {agent.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {agent.title || "Property Agent"}
                      </p>

                      <p className="text-xs text-slate-400">
                        {agent.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/agents/${agent.id}`}
                    className="text-[#0F4C5C] font-semibold text-sm"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}