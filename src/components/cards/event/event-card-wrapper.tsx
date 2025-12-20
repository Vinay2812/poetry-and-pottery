import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EventCardWrapperProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function EventCardWrapper({
  href,
  children,
  className,
}: EventCardWrapperProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link
        href={href}
        className={cn(
          "shadow-soft hover:shadow-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}

interface EventCardWrapperWithActionsProps {
  children: ReactNode;
  className?: string;
}

export function EventCardWrapperWithActions({
  children,
  className,
}: EventCardWrapperWithActionsProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group shadow-soft hover:shadow-card relative flex flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
