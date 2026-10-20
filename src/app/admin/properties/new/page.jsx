import CreatePropertyForm from "@/components/admin/CreatePropertyForm";
import { getAgents } from "@/lib/agent-service";

export const dynamic = "force-dynamic";

export default async function NewPropertyPage() {
  const agents = await getAgents();

  // Only send what the form needs
  const agentOptions = agents.map((a) => ({ id: a.id, name: a.name }));

  return (
    <main className="pt-24 pb-24 md:pt-32">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl bg-white p-5 shadow-md sm:p-8">
          <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Add Property</h1>

          <CreatePropertyForm agents={agentOptions} />
        </div>
      </div>
    </main>
  );
}