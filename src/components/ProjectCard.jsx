import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  githubLink, 
  liveLink,
  icon: IconComponent,
  gradientText = "PROJECT PREVIEW",
  bgGradient,
  achievements = [],
  screenshots = []
}) {
  const [showAchievements, setShowAchievements] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const isGreen = !!bgGradient;
  const hasScreenshots = screenshots && screenshots.length > 0;

  useEffect(() => {
    if (!hasScreenshots) return;
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % screenshots.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hasScreenshots, screenshots.length]);

  return (
    <div className="w-[85vw] md:w-[65vw] lg:w-[60vw] xl:w-[50vw] shrink-0 snap-start rounded-2xl border border-white/5 bg-[#121212] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:border-red-500/20 hover:shadow-[0_10px_30px_-15px_rgba(255,26,26,0.15)] group">
      
      {/* Left side: Visual representation / Gradient */}
      <div className={`w-full md:w-2/5 ${hasScreenshots ? 'h-[360px] md:h-auto' : 'h-48 md:h-auto'} min-h-[220px] relative overflow-hidden bg-gradient-to-br ${bgGradient || 'from-[#FF1A1A]/20 via-[#1A0303] to-[#0D0D0D]'} flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/5`}>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        {/* Glow effect */}
        <div className={`absolute inset-0 ${isGreen ? 'bg-[#10B981]/5' : 'bg-[#FF1A1A]/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        <div className={`absolute -top-10 -left-10 w-24 h-24 ${isGreen ? 'bg-[#10B981]/10' : 'bg-[#FF1A1A]/10'} rounded-full blur-2xl`}></div>
        
        {hasScreenshots ? (
          /* Phone Mockup Screen Carousel */
          <div className="relative w-[135px] h-[270px] bg-black rounded-[24px] border-[3px] border-neutral-800 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col group/phone z-10 transition-transform duration-500 group-hover:scale-[1.03]">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-neutral-800 rounded-b-md z-30"></div>
            
            {/* Screen Content */}
            <div className="relative w-full h-full bg-[#0d0d0d] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImgIdx}
                  src={screenshots[currentImgIdx].src}
                  alt={screenshots[currentImgIdx].caption}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full h-full object-cover select-none"
                />
              </AnimatePresence>
            </div>

            {/* Caption Overlay */}
            <div className="absolute bottom-5 left-0 right-0 text-center bg-black/60 backdrop-blur-[2px] py-1 text-[8px] font-mono text-white/90 tracking-wider z-20 select-none">
              {screenshots[currentImgIdx].caption}
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1 z-30">
              {screenshots.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImgIdx(idx); }}
                  className={`w-1 h-1 rounded-full transition-all duration-300 cursor-pointer ${currentImgIdx === idx ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>

            {/* Navigation arrows (only visible on hover of the phone mockup) */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setCurrentImgIdx((prev) => (prev - 1 + screenshots.length) % screenshots.length); 
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black/55 border border-white/5 flex items-center justify-center text-white/80 hover:bg-black/90 z-30 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 cursor-pointer text-[9px] font-bold"
            >
              ‹
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setCurrentImgIdx((prev) => (prev + 1) % screenshots.length); 
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black/55 border border-white/5 flex items-center justify-center text-white/80 hover:bg-black/90 z-30 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 cursor-pointer text-[9px] font-bold"
            >
              ›
            </button>
          </div>
        ) : (
          /* Standard Project Icon Representation */
          <>
            <div className={`w-16 h-16 rounded-full ${isGreen ? 'bg-[#10B981]/10 border-[#10B981]/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-[#FF1A1A]/10 border-[#FF1A1A]/30 shadow-[0_0_20px_rgba(255,26,26,0.1)]'} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
              {IconComponent && <IconComponent className={`${isGreen ? 'text-emerald-500' : 'text-[#FF1A1A]'} w-7 h-7`} />}
            </div>
            
            {/* Overlay preview label */}
            <span className="text-[9px] font-mono tracking-[0.25em] text-gray-500 uppercase font-bold relative z-10">
              {gradientText}
            </span>
          </>
        )}
      </div>

      {/* Right side: Project Details */}
      <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Project Title (Vivid Red) */}
          <h3 className="text-xl md:text-2xl font-bold font-display text-[#FF1A1A] tracking-wider mb-3 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          
          {/* Project Description */}
          <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed mb-4">
            {description}
          </p>

          {/* Key Achievements Accordion */}
          {achievements && achievements.length > 0 && (
            <div className="mb-6">
              <button 
                onClick={() => setShowAchievements(!showAchievements)}
                className="flex items-center justify-between w-full text-xs font-mono font-semibold text-gray-400 hover:text-[#FF1A1A] transition-colors py-2 border-b border-white/5 cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  KEY ACHIEVEMENTS ({achievements.length})
                </span>
                <ChevronDown size={14} className={`transform transition-transform duration-250 ${showAchievements ? "rotate-180 text-[#FF1A1A]" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {showAchievements && (
                  <motion.ul 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-3 space-y-2.5 text-[11px] text-gray-400 font-sans list-none overflow-hidden"
                  >
                    {achievements.map((ach, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-start gap-2 leading-relaxed text-left"
                      >
                        <span className="text-[#FF1A1A] mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF1A1A]"></span>
                        <span>{ach}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Tech stack tags and Action link */}
        <div className="space-y-6">
          {/* Tech tags: uppercase, red-bordered pills */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span key={idx} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {githubLink && liveLink ? (
              <>
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-4 py-2 bg-transparent border border-white/10 hover:border-white hover:bg-white/5 text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
                >
                  GITHUB
                </a>
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-4 py-2 bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 hover:border-[#FF1A1A] hover:bg-[#FF1A1A] text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer shadow-sm shadow-[#FF1A1A]/5"
                >
                  LIVE LINK →
                </a>
              </>
            ) : liveLink ? (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-4 py-2 bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 hover:border-[#FF1A1A] hover:bg-[#FF1A1A] text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer shadow-sm shadow-[#FF1A1A]/5"
              >
                LIVE LINK →
              </a>
            ) : githubLink ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-4 py-2 bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 hover:border-[#FF1A1A] hover:bg-[#FF1A1A] text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer shadow-sm shadow-[#FF1A1A]/5"
              >
                VIEW DETAILS →
              </a>
            ) : null}
          </div>
        </div>
      </div>
      
    </div>
  );
}
