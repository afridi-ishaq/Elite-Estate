import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-guard";
import { analyzeLead } from "@/lib/lead-service";

export const maxDuration = 60;

export async function POST(request, { params }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const lead = await analyzeLead(id);

    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);

    return NextResponse.json(lead);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}