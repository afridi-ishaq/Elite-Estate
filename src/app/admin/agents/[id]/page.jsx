import { getAgentById } from "@/lib/agent-service";
import { notFound } from "next/navigation";
import EditAgentForm from "./EditAgentForm";

export default async function EditAgentPage({ params }) {
  const { id } = await params;

  const agent = await getAgentById(id);

  if (!agent) {
    notFound();
  }

  return <EditAgentForm agent={agent} />;
}