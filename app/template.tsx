"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
