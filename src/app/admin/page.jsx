import Link from "next/link";
import Container from "@/components/Container";

import LeadsChart from "@/components/admin/LeadsChart";

import LeadStatusChart from "@/components/admin/LeadStatusChart";

import {
  getDashboardStats,
  getLeadStatusData,
} from "@/lib/dashboard-service";

export default async function AdminPage() {
  const stats =
    await getDashboardStats();

  const chartData =
    await getLeadStatusData();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-3">
            Welcome to Elite Estates CRM
          </p>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-gray-500">
              Properties
            </h3>

            <p className="text-4xl font-bold mt-3">
              {stats.totalProperties}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-gray-500">
              Leads
            </h3>

            <p className="text-4xl font-bold mt-3">
              {stats.totalLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-gray-500">
              Agents
            </h3>

            <p className="text-4xl font-bold mt-3">
              {stats.totalAgents}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-gray-500">
              New Leads
            </h3>

            <p className="text-4xl font-bold mt-3 text-[#C89B3C]">
              {stats.newLeads}
            </p>
          </div>
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-start mb-10">
          <div className="md:col-span-7">
            <LeadsChart />
          </div>
          <div className="md:col-span-3">
            <LeadStatusChart data={chartData} />
          </div>
        </div>
        

        {/* Navigation Cards */}

        <div className="grid md:grid-cols-3 gap-8">
          <Link
            href="/admin/properties"
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold">
              Properties
            </h2>

            <p className="text-gray-500 mt-3">
              Manage property listings
            </p>
          </Link>

          <Link
            href="/admin/leads"
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold">
              Leads
            </h2>

            <p className="text-gray-500 mt-3">
              Manage customer inquiries
            </p>
          </Link>

          <Link
            href="/admin/agents"
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold">
              Agents
            </h2>

            <p className="text-gray-500 mt-3">
              Manage agents
            </p>
          </Link>
        </div>
      </Container>
    </main>
  );
}