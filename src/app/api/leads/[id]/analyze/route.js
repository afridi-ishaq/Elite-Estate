import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { analyzeLead } from "@/lib/lead-service";

export async function POST(request, { params }) {
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