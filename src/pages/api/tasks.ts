import { prisma } from "~/server/db";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest & {
    body: { title: string; details?: string };
  },
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const tasks: Task[] = await prisma.task.findMany();
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    const task: Task = await prisma.task.create({
      data: {
        title: req?.body?.title,
        details: req?.body?.details,
      },
    });
    res.status(200).json(task);
  } else if (req.method === "PUT") {
    const task: Task = await prisma.task.update({
      where: { id: req.body.id },
      data: { title: req.body.title, details: req.body.details },
    });
    res.status(200).json(task);
  }
}
