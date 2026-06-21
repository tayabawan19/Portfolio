import React, { useState } from 'react';
import { ExternalLink, Folder, ChevronDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Github = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  link = "#",
  isFeatured = false,
  role,
  path,
  githubMobile,
  githubBackend,
  achievements = []
}) {
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <motion.div 
      layout
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 30px -10px rgba(233, 30, 99, 0.25), 0 0 15px -3px rgba(233, 30, 99, 0.15)",
        borderColor: "rgba(233, 30, 99, 0.3)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`glass-card p-6 md:p-8 rounded-xl flex flex-col justify-between group relative overflow-hidden ${
        isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-3' : 'h-full'
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#E91E63]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#E91E63]/20 transition-all duration-300"></div>
      )}

      <div className={isFeatured ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 h-full w-full' : 'flex flex-col h-full justify-between'}>
        <div className={isFeatured ? 'lg:col-span-7 flex flex-col justify-between' : 'flex flex-col h-full justify-between'}>
          <div>
            {/* Header Icons & Badge */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#E91E63]/10 text-[#E91E63] rounded-lg">
                  <Folder size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                {isFeatured && (
                  <span className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#E91E63] bg-[#E91E63]/10 border border-[#E91E63]/20 rounded-full font-mono">
                    <Star size={10} className="fill-[#E91E63]" />
                    Featured Project
                  </span>
                )}
              </div>
              
              {!isFeatured && (
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
              )}
            </div>

            {/* Path label */}
            {path && (
              <div className="text-xs text-gray-500 font-mono mb-2 tracking-wider">
                {path}
              </div>
            )}

            {/* Project Title */}
            <h3 className={`font-bold text-white group-hover:text-[#E91E63] transition-colors font-space leading-tight ${
              isFeatured ? 'text-2xl md:text-3xl mb-1' : 'text-xl mb-3'
            }`}>
              {title}
            </h3>

            {/* Course/Role label */}
            {role && (
              <div className="text-xs text-[#E91E63]/90 font-mono mb-4 uppercase tracking-wider font-semibold">
                {role}
              </div>
            )}

            {/* Project Description */}
            <p className={`leading-relaxed text-gray-400 font-sans ${isFeatured ? 'text-sm md:text-base mb-6' : 'text-sm mb-6'}`}>
              {description}
            </p>
          </div>

          {/* Project Tags & Buttons for Featured (Left Column) */}
          <div className="space-y-6 mt-auto">
            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* GitHub Links for Featured Project */}
            {isFeatured && (githubMobile || githubBackend) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {githubMobile && (
                  <a 
                    href={githubMobile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-white bg-white/5 border border-white/10 hover:border-[#E91E63]/30 hover:bg-[#E91E63]/10 rounded-lg transition-all cursor-pointer"
                  >
                    <Github size={14} className="text-[#E91E63]" />
                    <span>GitHub (Mobile)</span>
                  </a>
                )}
                {githubBackend && (
                  <a 
                    href={githubBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-white bg-white/5 border border-white/10 hover:border-[#E91E63]/30 hover:bg-[#E91E63]/10 rounded-lg transition-all cursor-pointer"
                  >
                    <Github size={14} className="text-[#E91E63]" />
                    <span>GitHub (Backend)</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Expandable key achievements (Right Column for Featured) */}
        {isFeatured && achievements.length > 0 && (
          <div className="lg:col-span-5 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
            <button 
              onClick={() => setShowAchievements(!showAchievements)}
              className="flex items-center justify-between w-full text-sm font-mono font-semibold text-gray-300 hover:text-[#E91E63] transition-colors py-2 border-b border-white/5 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                Key Achievements ({achievements.length})
              </span>
              <ChevronDown size={16} className={`transform transition-transform duration-200 ${showAchievements ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence initial={false}>
              {showAchievements && (
                <motion.ul 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-4 space-y-3 text-xs text-gray-400 font-sans list-none overflow-hidden"
                >
                  {achievements.map((ach, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2.5 leading-relaxed text-left"
                    >
                      <span className="text-[#E91E63] mt-1 shrink-0 font-bold">•</span>
                      <span>{ach}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {!showAchievements && (
              <p className="text-xs text-gray-500 italic mt-4 font-sans text-left font-mono tracking-wide">
                Click the dropdown above to view core technical achievements, implementation details, and architecture highlights.
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
