import { type LucideIcon } from "lucide-react";

interface CareCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CareCard({ icon: Icon, title, description }: CareCardProps) {
  return (
    <div className="shadow-soft rounded-xl bg-white p-5 text-center">
      <div className="bg-primary-lighter text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display mb-2 font-semibold text-neutral-900">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
