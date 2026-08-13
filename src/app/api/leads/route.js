import { NextResponse } from "next/server";
import { createLead } from "@/lib/lead-service";

export async function POST(request) {
  try {
    const body = await request.json();

    const lead = await createLead({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}