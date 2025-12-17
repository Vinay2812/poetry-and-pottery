/*
  Warnings:

  - The `status` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `level` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `product_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "event_registrations" ALTER COLUMN "id" SET DEFAULT ('ticket_' || gen_random_uuid()::text);

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "id" SET DEFAULT ('event_' || gen_random_uuid()::text),
DROP COLUMN "status",
ADD COLUMN     "status" TEXT DEFAULT 'active',
DROP COLUMN "level",
ADD COLUMN     "level" TEXT DEFAULT 'beginner';

-- AlterTable
ALTER TABLE "product_orders" ALTER COLUMN "id" SET DEFAULT ('order_' || gen_random_uuid()::text),
DROP COLUMN "status",
ADD COLUMN     "status" TEXT DEFAULT 'processing';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" TEXT DEFAULT 'user';
