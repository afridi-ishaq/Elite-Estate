import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const lead = await Lead.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
    });

    return NextResponse.json(
      {
        success: true,
        lead,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lead",
      },
      {
        status: 500,
      }
    );
  }
}