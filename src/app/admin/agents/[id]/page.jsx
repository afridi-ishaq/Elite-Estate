import { notFound } from "next/navigation";
import { getAgentById } from "@/lib/agent-service";

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

                <form className="space-y-4">
                    <input
                        defaultValue={agent.name}
                        className="
                        w-full
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <input
                        defaultValue={agent.email}
                        className="
                        w-full
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <input
                        defaultValue={agent.phone}
                        className="
                        w-full
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <input
                        defaultValue={agent.title}
                        className="
                        w-full
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <textarea
                        defaultValue={agent.bio}
                        rows={5}
                        className="
                        w-full
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <button
                        type="submit"
                        className="
                        bg-[#0F4C5C]
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        "
                    >
                        Update Agent
                    </button>
                </form>
            </div>
        </main>
    );
}