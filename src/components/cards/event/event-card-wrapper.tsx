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
          "flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 lg:hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-neutral-900",
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
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 lg:hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-neutral-900",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
