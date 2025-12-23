import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { DATABASE_URL } from "../consts/env";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connectionString = DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
