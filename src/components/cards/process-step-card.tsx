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
    <div className="group shadow-soft hover:shadow-card rounded-[2rem] border border-neutral-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 lg:p-10 dark:border-neutral-800 dark:bg-neutral-900">
      <span className="text-primary/20 group-hover:text-primary/40 mb-2 block text-5xl font-black transition-colors lg:mb-4">
        {step}
      </span>
      <h3 className="mb-3 text-lg font-bold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}
