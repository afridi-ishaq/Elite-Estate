
import Link from "next/link";
import { ArrowLeft, Building2, Home, ShieldCheck } from "lucide-react";
import CreatePropertyForm from "@/components/admin/CreatePropertyForm";
import { getAgents } from "@/lib/agent-service";

export const dynamic = "force-dynamic";

export default async function NewPropertyPage() {
  const agents = await getAgents();

  // Only send what the form needs
  const agentOptions = agents.map((a) => ({
    id: a.id,
    name: a.name,
  }));

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">

        {/* Back Navigation */}
        <Link
          href="/admin/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#0F4C5C]"
        >
          <ArrowLeft size={17} />
          Back to Properties
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0F4C5C]">
            <Building2 size={17} />
            Property Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Add New Property
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Add a property to your portfolio. Provide accurate details,
            pricing, images, and agent information to create a professional
            listing.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Teal Header */}
          <div className="bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                <Home size={25} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Property Information
                </h2>

                <p className="mt-1 text-sm text-white/75">
                  Complete the fields below to create your listing.
                </p>
              </div>
            </div>
          </div>

          {/* Existing Form */}
          <div className="p-5 sm:p-8">
            <CreatePropertyForm agents={agentOptions} />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-8">
            <ShieldCheck size={17} className="shrink-0 text-[#0F4C5C]" />
            <p className="text-xs leading-5 text-slate-500">
              Ensure all property information is accurate before submitting
              your listing.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
