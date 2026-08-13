import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    "admin123",
    10
  );

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@eliteestates.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin Created");
}

main();