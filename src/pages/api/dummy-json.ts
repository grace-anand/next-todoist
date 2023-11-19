import { prisma } from "~/server/db";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest & {
    body: { title: string; details?: string };
  },
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const jsonData: SampleJson[] = await prisma.sampleJson.findMany();
    res.status(200).json(jsonData);
  } else if (req.method === "POST") {
    const jsonData: SampleJson = await prisma.sampleJson.create({
      data: {
        json: req?.body,
      },
    });

    res.status(200).json(jsonData);
  } else if (req.method === "PUT") {
    const jsonData: SampleJson = await prisma.sampleJson.update({
      where: { id: req.body.id },
      data: { json: req.body },
    });
    res.status(200).json(jsonData);
  } else if (req.method === "DELETE") {
    const jsonData: SampleJson = await prisma.sampleJson.delete({
      where: { id: req.query.id as string },
    });
    res.status(200).json(jsonData);
  }
}
