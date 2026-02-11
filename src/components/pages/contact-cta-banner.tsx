interface ContactCtaBannerProps {
  title: string;
  description: string;
  href?: string;
  linkText?: string;
}

export function ContactCtaBanner({
  title,
  description,
  href = "/contact",
  linkText = "Contact Us",
}: ContactCtaBannerProps) {
  return (
    <div className="bg-primary-lighter rounded-2xl p-6 text-center lg:p-8">
      <h3 className="font-display mb-2 text-lg font-semibold text-neutral-900">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      <a
        href={href}
        className="bg-primary hover:bg-primary-hover inline-flex rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors"
      >
        {linkText}
      </a>
    </div>
  );
}
