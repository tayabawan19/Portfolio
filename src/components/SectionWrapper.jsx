import React from 'react';
import { motion } from 'framer-motion';

export default function SectionWrapper({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}
