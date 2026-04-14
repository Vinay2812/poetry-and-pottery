import { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="group shadow-soft hover:shadow-card bg-card rounded-[2rem] border border-neutral-100 p-6 transition-all duration-300 hover:-translate-y-1 lg:p-10">
      <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 lg:mb-6">
        <Icon className="text-primary h-7 w-7" />
      </div>
      <h3 className="text-foreground mb-3 text-lg font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
    </div>
  );
}
