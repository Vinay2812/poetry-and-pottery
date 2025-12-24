import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readReplicas } from "@prisma/extension-read-replicas";

import { DATABASE_URL } from "../consts/env";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connectionString = DATABASE_URL;

const mainAdapter = new PrismaPg({ connectionString });
const replicaAdapter = new PrismaPg({ connectionString });

const replicaClient = new PrismaClient({ adapter: replicaAdapter });

const prisma = new PrismaClient({ adapter: mainAdapter }).$extends(
  readReplicas({
    replicas: [replicaClient],
  }),
);

export { prisma };
