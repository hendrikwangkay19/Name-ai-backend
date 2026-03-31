"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  const style =
    variant === "primary"
      ? "bg-gradient-to-r from-accent to-deepblue text-white shadow-glow hover:shadow-gold"
      : "border border-white/30 bg-white/5 text-white hover:border-gold/80";

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className={`inline-flex rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${style}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
