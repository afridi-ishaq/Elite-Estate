import Link from "next/link";
import Image from "next/image";
import { getAgents } from "@/lib/agent-service";

export default async function AdminAgentsPage() {
  const agents = (await getAgents()) || [];

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Agents</h1>
            <p className="text-slate-500 mt-1">Manage your real estate agents.</p>
          </div>

          <Link
            href="/admin/agents/new"
            className="inline-flex items-center justify-center bg-[#0F4C5C] hover:opacity-90 transition-opacity text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-sm"
          >
            + Add Agent
          </Link>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {agents.length === 0 ? (
            <div className="p-12 text-center">
              <h2 className="text-xl font-semibold text-slate-800">No Agents Yet</h2>
              <p className="text-slate-500 mt-2 text-sm">Add your first agent to get started.</p>
              <Link
                href="/admin/agents/new"
                className="mt-4 inline-block text-sm font-semibold text-[#0F4C5C] hover:underline"
              >
                + Create Agent
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {agents.map((agent) => {
                const initial = agent.name ? agent.name.charAt(0).toUpperCase() : "A";

                return (
                  <div
                    key={agent.id}
                    className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {agent.image ? (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-slate-100">
                          <Image
                            src={agent.image}
                            alt={agent.name || "Agent profile photo"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center shrink-0">
                          {initial}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {agent.name || "Unnamed Agent"}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          {agent.title || "Property Agent"}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {agent.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/admin/agents/${agent.id}`}
                      className="text-[#0F4C5C] hover:text-[#0b3844] font-semibold text-sm shrink-0 px-3 py-1.5 rounded-lg hover:bg-[#0F4C5C]/5 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}