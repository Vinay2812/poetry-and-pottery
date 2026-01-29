"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-IN");
}

export function AnimatedCounter({
  value,
  suffix = "",
  className = "",
  duration = 1.5,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000,
  });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        motionValue.set(value);
      } else {
        motionValue.set(value);
      }
    }
  }, [isInView, motionValue, value, prefersReducedMotion]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatNumber(Math.round(latest)) + suffix;
      }
    });

    return () => unsubscribe();
  }, [springValue, suffix]);

  // For reduced motion, show final value immediately
  if (prefersReducedMotion) {
    return (
      <span ref={ref} className={className}>
        {formatNumber(value)}
        {suffix}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      0{suffix}
    </motion.span>
  );
}
