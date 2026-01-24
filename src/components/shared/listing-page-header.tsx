import Link from "next/link";

import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ListingPageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export function ListingPageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
}: ListingPageHeaderProps) {
  return (
    <div className={cn("mb-6 pb-7 lg:mb-8", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="text-muted-foreground mb-2 hidden items-center gap-2 text-[13px] lg:flex">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-neutral-300">/</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <h1 className="font-display text-2xl font-bold text-neutral-900 lg:text-3xl dark:text-neutral-100">
        {title}
      </h1>
      <div className="bg-primary mt-3 h-[3px] w-12 rounded-full" />
      {subtitle && (
        <p className="text-muted-foreground mt-3 text-sm">{subtitle}</p>
      )}
    </div>
  );
}
