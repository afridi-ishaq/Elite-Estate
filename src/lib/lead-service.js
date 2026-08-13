import { prisma } from "./prisma";

export async function createLead(data) {
  return await prisma.lead.create({
    data,
  });
}