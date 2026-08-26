import Link from "next/link";
import Container from "@/components/Container";
import { getAgents } from "@/lib/agent-service";

export default async function AgentsPage() {
    const agents = await getAgents();

return (
    <main className="pt-18 pb-24">
        <Container>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">
                    Agents
                </h1>

                <Link
                    href="/admin/agents/new"
                    className="bg-[#0F4C5C] text-white px-5 py-3 rounded-xl"
                    style={{ color: "white" }}
                >
                    Add Agent
                </Link>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-4">
                                Name
                            </th>

                            <th className="text-left p-4">
                                Email
                            </th>

                            <th className="text-left p-4">
                                Phone
                            </th>

                            <th className="text-left p-4">
                                Title
                            </th>
                            <th className="text-left p-4">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {agents.map((agent) => (
                            <tr
                                key={agent.id}
                                className="border-b"
                            >
                                <td className="p-4">
                                    {agent.name}
                                </td>

                                <td className="p-4">
                                    {agent.email}
                                </td>

                                <td className="p-4">
                                    {agent.phone}
                                </td>

                                <td className="p-4">
                                    {agent.title}
                                </td>
                                <td className="p-4">
                                    <Link
                                        href={`/admin/agents/${agent.id}`}
                                        className="
                                        bg-[#0F4C5C]
                                        text-white
                                        px-3
                                        py-2
                                        rounded-lg
                                        "
                                        style={{ color: "white" }}
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    </main>
);
}