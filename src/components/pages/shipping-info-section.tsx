import { type LucideIcon } from "lucide-react";

interface ShippingInfoSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function ShippingInfoSection({
  title,
  icon: Icon,
  children,
}: ShippingInfoSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
        {title}
      </h2>
      <div className="shadow-soft rounded-2xl bg-white p-5 lg:p-6">
        <div className="flex gap-4">
          <div className="bg-primary-lighter text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <Icon className="h-5 w-5" />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
