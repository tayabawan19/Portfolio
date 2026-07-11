import React from 'react';
import { motion } from 'framer-motion';

export default function SectionWrapper({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 relative ${className}`}
    >
      {/* Subtle top gradient fade from background color */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/10 to-transparent pointer-events-none" />
      {children}
    </motion.section>
  );
}
