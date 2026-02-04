import { CustomizationDashboardSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Customization Options
          </h1>
          <p className="text-sm text-neutral-500">
            Manage product customization categories and options
          </p>
        </div>
      </div>
      <CustomizationDashboardSkeleton />
    </div>
  );
}
