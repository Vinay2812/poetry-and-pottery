-- AlterTable
ALTER TABLE "event_registrations" ALTER COLUMN "id" SET DEFAULT ('ticket_' || gen_random_uuid()::text);

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "gallery" TEXT[],
ALTER COLUMN "id" SET DEFAULT ('event_' || gen_random_uuid()::text);

-- AlterTable
ALTER TABLE "product_orders" ALTER COLUMN "id" SET DEFAULT ('order_' || gen_random_uuid()::text);
