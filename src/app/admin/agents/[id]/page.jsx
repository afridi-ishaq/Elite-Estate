import { notFound } from "next/navigation";
import { getAgentById } from "@/lib/agent-service";
import EditAgentForm from "@/components/EditAgentForm";

export default async function EditAgentPage({
  params,
}) {
  const { id } = await params;

  const agent = await getAgentById(id);

  if (!agent) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold mb-6">
          Edit Agent
        </h1>

        <EditAgentForm
          agent={agent}
        />
      </div>
    </main>
  );
}