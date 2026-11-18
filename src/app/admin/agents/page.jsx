
import Link from "next/link";
import {
  Users,
  UserPlus,
  Mail,
  BriefcaseBusiness,
  Pencil,
  UserRound,
  ArrowRight,
} from "lucide-react";
import { getAgents } from "@/lib/agent-service";

export default async function AdminAgentsPage() {
  const agents = await getAgents();

  return (
    <main className="min-h-screen bg-slate-50 px-4 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0F4C5C]">
              <Users size={17} />
              <span>Team Management</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Agents
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your real estate agents and their professional profiles.
            </p>
          </div>

          <Link
            href="/admin/agents/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110"
          >
            <UserPlus size={18} />
            Add New Agent
          </Link>
        </div>

        {/* Agents Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Agents
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {agents.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#0F4C5C]">
                <Users size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Team Status
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {agents.length > 0 ? "Team Active" : "No Members"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {agents.length > 0
                    ? "Your agent profiles are available."
                    : "Add an agent to get started."}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#C89B3C]">
                <BriefcaseBusiness size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Agents List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Agent Directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage your registered agents.
              </p>
            </div>

            <span className="w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-[#0F4C5C]">
              {agents.length} {agents.length === 1 ? "Agent" : "Agents"}
            </span>
          </div>

          {agents.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Users size={30} />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                No Agents Yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                Your team directory is currently empty. Add your first agent
                to start managing your real estate team.
              </p>

              <Link
                href="/admin/agents/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0F4C5C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3844]"
              >
                <UserPlus size={17} />
                Add Your First Agent
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Agent Information */}
                  <div className="flex min-w-0 items-center gap-4">
                    {agent.image ? (
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="h-14 w-14 shrink-0 rounded-2xl border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-lg font-bold text-[#0F4C5C]">
                        {agent.name?.charAt(0)?.toUpperCase() || (
                          <UserRound size={23} />
                        )}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-slate-900">
                        {agent.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {agent.title || "Property Agent"}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={13} />
                        <span className="truncate">{agent.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Edit Action */}
                  <Link
                    href={`/admin/agents/${agent.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F4C5C] transition hover:border-[#0F4C5C] hover:bg-teal-50 sm:w-auto"
                  >
                    <Pencil size={15} />
                    Edit Agent
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {agents.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4">
              <p className="text-xs text-slate-500">
                Showing {agents.length}{" "}
                {agents.length === 1 ? "agent" : "agents"} in your directory.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
