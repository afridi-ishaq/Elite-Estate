import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateLeadStatus, updateLeadNotes } from "@/lib/lead-service";

const VALID_STATUSES = [
  "NEW",
  "CONTACTED",
  "INTERESTED",
  "VISIT_SCHEDULED",
  "CLOSED",
];

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    let lead;

    if (body.status !== undefined) {
      if (!VALID_STATUSES.includes(body.status)) {
        return NextResponse.json(
          { error: "Invalid status" },
          { status: 400 }
        );
      }
      lead = await updateLeadStatus(id, body.status);
    }

    if (body.notes !== undefined) {
      lead = await updateLeadNotes(id, body.notes);
    }

    if (!lead) {
      return NextResponse.json(
        { error: "Nothing to update" },
        { status: 400 }
      );
    }

    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);
    revalidatePath("/admin");

    return NextResponse.json(lead);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}