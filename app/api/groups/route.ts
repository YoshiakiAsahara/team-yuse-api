// pages/api/groups/index.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

// POST /api/groups
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const group = await prisma.group.create({
      data: {
        name,
      },
    });
    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
