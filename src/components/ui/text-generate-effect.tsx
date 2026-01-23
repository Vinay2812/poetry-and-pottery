"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.08),
        },
      );
    }
  }, [isInView, animate, duration, filter]);

  return (
    <div ref={scope} className={cn(className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="inline-block"
          style={{
            opacity: 0,
            filter: filter ? "blur(4px)" : "none",
          }}
        >
          {word}
          {idx < wordsArray.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </div>
  );
}
