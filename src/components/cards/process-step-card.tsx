interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
}

export function ProcessStepCard({
  step,
  title,
  description,
}: ProcessStepCardProps) {
  return (
    <div className="group shadow-soft hover:shadow-card bg-card border-border rounded-[2rem] border p-6 transition-all duration-300 hover:-translate-y-1 lg:p-10">
      <span className="text-primary/20 group-hover:text-primary/40 mb-2 block text-5xl font-black transition-colors lg:mb-4">
        {step}
      </span>
      <h3 className="text-foreground mb-3 text-lg font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
    </div>
  );
}
