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
    <div className="shadow-soft hover:shadow-card rounded-2xl bg-white p-6 transition-shadow duration-200">
      <span className="text-primary mb-2 block text-3xl font-bold opacity-30">
        {step}
      </span>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
