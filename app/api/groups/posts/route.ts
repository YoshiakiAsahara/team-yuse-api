import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, groupId, attributes } = req.body;

    try {
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
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
