import React from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectCard({ title, description, tags, link = "#" }) {
  return (
    <motion.div 
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 30px -10px rgba(233, 30, 99, 0.25), 0 0 15px -3px rgba(233, 30, 99, 0.15)",
        borderColor: "rgba(233, 30, 99, 0.3)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 md:p-8 rounded-xl flex flex-col justify-between h-full group"
    >
      <div>
        {/* Header Icons */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-[#E91E63]/10 text-[#E91E63] rounded-lg">
            <Folder size={20} className="group-hover:scale-110 transition-transform" />
          </div>
          <a 
            href={link}
            onClick={(e) => {
              if (link === "#") e.preventDefault();
            }}
            target={link !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#E91E63] transition-colors p-2 hover:bg-white/5 rounded-full"
            aria-label={`View details of ${title}`}
          >
            <ExternalLink size={18} />
          </a>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#E91E63] transition-colors font-space">
          {title}
        </h3>

        {/* Project Description */}
        <p className="text-sm leading-relaxed text-gray-400 font-sans mb-6">
          {description}
        </p>
      </div>

      {/* Project Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map((tag) => (
          <span key={tag} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
