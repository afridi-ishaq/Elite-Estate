export const dynamic = "force-dynamic";

import Link from "next/link";
import Container from "@/components/Container";
import LeadsChart from "@/components/admin/LeadsChart";
import LeadStatusChart from "@/components/admin/LeadStatusChart";
import PropertiesCityChart from "@/components/admin/PropertiesCityChart";
import LeadSourceChart from "@/components/admin/LeadSourceChart";

import {
  getPropertiesByCity,
  getDashboardStats,
  getLeadStatusData,
  getRecentLeads,
  getRecentProperties,
  getLeadsOverTime,
  getLeadSourceData,
} from "@/lib/dashboard-service";

import {
  Building2,
  Users,
  UserCheck,
  UserPlus,
  ArrowUpRight,
  MapPin,
  ChevronRight,
  Flame,
  Trophy,
  Percent,
} from "lucide-react";

export default async function AdminPage() {
  const [
    cityData,
    stats,
    chartData,
    recentLeads,
    recentProperties,
    leadsOverTime,
    sourceData,
  ] = await Promise.all([
    getPropertiesByCity(),
    getDashboardStats(),
    getLeadStatusData(),
    getRecentLeads(),
    getRecentProperties(),
    getLeadsOverTime(),
    getLeadSourceData(),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Live CRM Overview
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 text-sm md:text-base mt-2">
              Welcome back to{" "}
              <span className="text-[#0F4C5C] font-semibold text-xl">
                Elite Estates
              </span>{" "}
              operational command center.
            </p>
          </div>

          <Link
            href="/admin/properties"
            style={{ color: "white" }}
            className="px-5 py-2.5 rounded-xl bg-[#0F4C5C] font-semibold text-sm shadow-md flex items-center gap-2 active:scale-95"
          >
            <span>Manage Properties</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Properties
              </span>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.totalProperties.toLocaleString()}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Leads
              </span>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.totalLeads.toLocaleString()}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Agents
              </span>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.totalAgents.toLocaleString()}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                New Leads
              </span>
              <div className="p-2.5 bg-amber-500 rounded-xl text-white">
                <UserPlus className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-900">
              {stats.newLeads.toLocaleString()}
            </p>
          </div>
        </div>

        {/* AI and conversion cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                Hot Leads
              </span>
              <div className="p-2.5 bg-red-500 rounded-xl text-white">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.hotLeads.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">AI score 70 or higher</p>
          </div>

          <div className="bg-white border border-emerald-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Closed Leads
              </span>
              <div className="p-2.5 bg-emerald-500 rounded-xl text-white">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.closedLeads.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">Deals won</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Conversion Rate
              </span>
              <div className="p-2.5 bg-[#0F4C5C] rounded-xl text-white">
                <Percent className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.conversionRate}%
            </p>
            <p className="text-xs text-slate-500 mt-1">Closed ÷ total leads</p>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Leads Growth & Flow
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Inquiries timeline over time
            </p>
            <LeadsChart initialData={leadsOverTime} />
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Lead Status</h2>
            <p className="text-xs text-slate-500 mb-6">
              Current conversion pipeline
            </p>
            <LeadStatusChart data={chartData} />
          </div>
        </div>

        {/* Lead sources */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm mb-10">
          <h2 className="text-lg font-bold text-slate-900">Lead Sources</h2>
          <p className="text-xs text-slate-500 mb-6">
            Where your leads come from
          </p>
          <LeadSourceChart data={sourceData} />
        </div>

        {/* Recent leads and city chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Leads
                </h2>
                <p className="text-xs text-slate-500">
                  Latest prospect inquiries
                </p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-bold text-amber-700 flex items-center gap-1"
              >
                View all
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentLeads.map((lead) => {
                const isNew = lead.status?.toLowerCase() === "new";
                return (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-900">
                        {lead.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">
                          {lead.name}
                        </p>
                        <p className="text-slate-500 text-xs">{lead.email}</p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        isNew
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-slate-200 text-slate-700 border-slate-300"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                Regional Distribution
              </h2>
              <p className="text-xs text-slate-500">
                Property portfolio broken down by city
              </p>
            </div>
            <PropertiesCityChart data={cityData} />
          </div>
        </div>

        {/* Recent properties */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Properties
              </h2>
              <p className="text-xs text-slate-500">Newly added listings</p>
            </div>
            <Link
              href="/admin/properties"
              className="text-xs font-bold text-amber-700 flex items-center gap-1"
            >
              Manage listings
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 line-clamp-1">
                      {property.title}
                    </p>
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {property.city}
                    </p>
                  </div>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  PKR {property.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/properties"
            className="bg-white border border-slate-200 hover:border-amber-300 rounded-3xl p-8 shadow-sm"
          >
            <Building2 className="w-6 h-6 text-slate-800 mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Properties</h2>
            <p className="text-slate-500 text-sm mt-2">
              View, edit, or publish property listings and media.
            </p>
          </Link>

          <Link
            href="/admin/leads"
            className="bg-white border border-slate-200 hover:border-amber-300 rounded-3xl p-8 shadow-sm"
          >
            <Users className="w-6 h-6 text-slate-800 mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Leads</h2>
            <p className="text-slate-500 text-sm mt-2">
              Manage client inquiries, update status, and assign leads.
            </p>
          </Link>

          <Link
            href="/admin/agents"
            className="bg-white border border-slate-200 hover:border-amber-300 rounded-3xl p-8 shadow-sm"
          >
            <UserCheck className="w-6 h-6 text-slate-800 mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Agents</h2>
            <p className="text-slate-500 text-sm mt-2">
              Track agent performance, manage roles, and permissions.
            </p>
          </Link>
        </div>
      </Container>
    </main>
  );
}