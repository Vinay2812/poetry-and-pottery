import { DATABASE_URL, OPTIMIZE_API_KEY, REPLICA_URL } from "@/consts/env";
import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { withOptimize } from "@prisma/extension-optimize";
import { readReplicas } from "@prisma/extension-read-replicas";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connectionString = DATABASE_URL;
const replicaConnectionString = REPLICA_URL ?? connectionString;

const mainAdapter = new PrismaPg({ connectionString });
const replicaAdapter = new PrismaPg({
  connectionString: replicaConnectionString,
});

const replicaClient = new PrismaClient({ adapter: replicaAdapter });

let prisma: PrismaClient;

if (OPTIMIZE_API_KEY) {
  prisma = new PrismaClient({ adapter: mainAdapter })
    .$extends(
      readReplicas({
        replicas: [replicaClient],
      }),
    )
    .$extends(
      withOptimize({
        apiKey: OPTIMIZE_API_KEY,
      }),
    ) as PrismaClient;
} else {
  prisma = new PrismaClient({ adapter: mainAdapter }).$extends(
    readReplicas({
      replicas: [replicaClient],
    }),
  ) as unknown as PrismaClient;
}

export { prisma };
