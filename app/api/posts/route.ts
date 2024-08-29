import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // NextRequest型でリクエストを取得
    const body = await req.json();
    const { title, groupId, attributes } = body;
    // データベースに新しい投稿を作成
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
    // 成功レスポンスを返す
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    // エラーハンドリング
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
