import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "main"; // there is only ever one settings row

export async function getSettings() {
  return await prisma.settings.findUnique({ where: { id: SETTINGS_ID } });
}

export async function saveSettings(data) {
  return await prisma.settings.upsert({
    where: { id: SETTINGS_ID },
    update: data,
    create: { id: SETTINGS_ID, ...data },
  });
}