import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useCalmMotion } from "@/hooks/useMediaQuery";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const calm = useCalmMotion();
  if (calm) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  const Moving = as === "li" ? motion.li : motion.div;
  return (
    <Moving
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </Moving>
  );
}
