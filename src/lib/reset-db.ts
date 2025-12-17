import { prisma } from "./prisma";

const resetDb = async (): Promise<void> => {
  await prisma.$executeRaw`
    -- Drop all public sequences, functions, tables, and views
    DROP SCHEMA IF EXISTS public CASCADE;
    
    -- Recreate the public schema
    CREATE SCHEMA public;
    
    -- Restore default privileges
    GRANT ALL ON SCHEMA public TO postgres;
    GRANT ALL ON SCHEMA public TO public;
  `;
};

resetDb()
  .then(() => {
    console.log("Database reset successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error resetting database:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
