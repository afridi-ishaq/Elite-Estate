export const dynamic = "force-dynamic";

import Link from "next/link";
import Container from "@/components/Container";
import LeadsChart from "@/components/admin/LeadsChart";
import LeadStatusChart from "@/components/admin/LeadStatusChart";
import PropertiesCityChart from "@/components/admin/PropertiesCityChart";

import {
  getPropertiesByCity,
  getDashboardStats,
  getLeadStatusData,
  getRecentLeads,
  getRecentProperties,
  getLeadsOverTime,
} from "@/lib/dashboard-service";

import {
  Building2,
  Users,
  UserCheck,
  UserPlus,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default async function AdminPage() {
  const [
    cityData,
    stats,
    chartData,
    recentLeads,
    recentProperties,
    leadsOverTime,
  ] = await Promise.all([
    getPropertiesByCity(),
    getDashboardStats(),
    getLeadStatusData(),
    getRecentLeads(),
    getRecentProperties(),
    getLeadsOverTime(),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 selection:bg-amber-100 selection:text-amber-900">
      <Container>
        {/* Header Banner */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Live CRM Overview
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 text-sm md:text-base mt-2">
              Welcome back to <span className="text-slate-900 font-semibold text-xl">Elite Estates</span> operational command center.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/properties"
              style={{ color: "white" }}
              className="px-5 py-2.5 rounded-xl bg-[#0F4C5C] transition-all font-semibold text-sm shadow-md shadow-slate-900/10 flex items-center gap-2 active:scale-95"
            >
              <span>Manage Properties</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Card 1: Total Properties */}
          <div className="group bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Properties
              </span>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {stats.totalProperties.toLocaleString()}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
          </div>

          {/* Card 2: Total Leads */}
          <div className="group bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Leads
              </span>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {stats.totalLeads.toLocaleString()}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <TrendingUp className="w-3 h-3" /> +8%
              </span>
            </div>
          </div>

          {/* Card 3: Active Agents */}
          <div className="group bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Agents
              </span>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {stats.totalAgents.toLocaleString()}
              </p>
              <span className="text-xs font-semibold text-slate-500">
                Verified
              </span>
            </div>
          </div>

          {/* Card 4: New Leads */}
          <div className="group bg-linear-to-br from-amber-50/60 to-white border border-amber-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                New Leads
              </span>
              <div className="p-2.5 bg-amber-500 border border-amber-600 rounded-xl text-white">
                <UserPlus className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold tracking-tight text-amber-900">
                {stats.newLeads.toLocaleString()}
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Requires Action
              </span>
            </div>
          </div>
        </div>

        {/* Primary Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-10 items-stretch">
          <div className="lg:col-span-5 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Leads Growth & Flow</h2>
                <p className="text-xs text-slate-500">Inquiries timeline over time</p>
              </div>
            </div>
            <div className="w-full h-full min-h-75">
              <LeadsChart initialData={leadsOverTime} />
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">Lead Status</h2>
              <p className="text-xs text-slate-500">Current conversion pipeline</p>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
              <LeadStatusChart data={chartData} />
            </div>
          </div>
        </div>

        {/* Data Tables & City Distribution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Recent Leads */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Recent Leads</h2>
                <p className="text-xs text-slate-500">Latest prospect inquiries</p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 group"
              >
                View all
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-3 flex-1">
              {recentLeads.map((lead) => {
                const isNew = lead.status?.toLowerCase() === "new";
                return (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-all duration-200"
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
                          : "bg-slate-200/70 text-slate-700 border-slate-300"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Properties by City Chart */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Regional Distribution</h2>
              <p className="text-xs text-slate-500">Property portfolio broken down by city</p>
            </div>
            <div className="w-full flex-1 flex items-center justify-center min-h-70">
              <PropertiesCityChart data={cityData} />
            </div>
          </div>
        </div>

        {/* Recent Properties Section */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Recent Properties</h2>
              <p className="text-xs text-slate-500">Newly added listings</p>
            </div>
            <Link
              href="/admin/properties"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 group"
            >
              Manage listings
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-amber-50 border border-amber-200/80 text-amber-700 rounded-xl">
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

                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900">
                    PKR {property.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/properties"
            className="group bg-white border border-slate-200/80 hover:border-amber-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Properties
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              View, edit, or publish property listings and media.
            </p>
          </Link>

          <Link
            href="/admin/leads"
            className="group bg-white border border-slate-200/80 hover:border-amber-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Leads
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Manage client inquiries, update status, and assign leads.
            </p>
          </Link>

          <Link
            href="/admin/agents"
            className="group bg-white border border-slate-200/80 hover:border-amber-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
              <UserCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Agents
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Track agent performance, manage roles, and permissions.
            </p>
          </Link>
        </div>
      </Container>
    </main>
  );
}