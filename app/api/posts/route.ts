import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, groupId, attributes } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        group: { connect: { id: groupId } },
        attributes: {
          create: attributes.map((attr: { key: string; value: string }) => ({
            key: attr.key,
            value: attr.value,
          })),
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
