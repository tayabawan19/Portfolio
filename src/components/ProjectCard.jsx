import React, { useState, useEffect } from 'react';
import { ExternalLink, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GitHubIcon = ({ size = 16, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

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
  screenshots = [],
  number
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const hasScreenshots = screenshots && screenshots.length > 0;

  useEffect(() => {
    if (!hasScreenshots) return;
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % screenshots.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hasScreenshots, screenshots.length]);

  // Compute file path
  const getFilePath = () => {
    if (title.includes("ZenPay")) return "~/projects/zenpay";
    if (title.includes("PaceTrack")) return "~/projects/pacetrack";
    if (title.includes("CropSense")) return "~/projects/cropsense";
    if (title.includes("Food Delivery")) return "~/projects/food-delivery";
    if (title.includes("Quiz")) return "~/projects/quiz-app";
    if (title.includes("Diary")) return "~/projects/digital-diary";
    if (title.includes("Resource")) return "~/projects/sre-app";
    if (title.includes("Social Media")) return "~/projects/social-media-tool";
    if (title.includes("JhootayShootay")) return "~/projects/jhootay-shootay";
    return "~/projects/project";
  };

  // Compute Category
  const getCategory = () => {
    if (title.includes("ZenPay")) return "Fintech Mobile App";
    if (title.includes("PaceTrack")) return "Running Tracker Mobile App";
    if (title.includes("CropSense")) return "Agricultural Intelligence Platform";
    if (title.includes("Food Delivery")) return "Shortest Route Solver";
    if (title.includes("Quiz")) return "Desktop Application";
    if (title.includes("Diary")) return "File Security Utility";
    if (title.includes("Resource")) return "Systems Engineering Document";
    if (title.includes("Social Media")) return "Project Lifecycle Documentation";
    if (title.includes("JhootayShootay")) return "WordPress WooCommerce Store";
    return gradientText || "Software Project";
  };

  // Format index
  const formattedNumber = String(number).padStart(2, '0');

  // Trigger flip animation
  const handleCardClick = (e) => {
    // Prevent flip if user clicks inside links, badges, or pagination
    if (e.target.closest('a') || e.target.closest('.tech-tag') || e.target.closest('.pagination-dot')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full h-[530px] flip-card select-none">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* CARD FRONT */}
        <div 
          onClick={handleCardClick}
          className="flip-card-front glass-card rounded-[10px] overflow-hidden flex flex-col justify-between cursor-pointer border border-white/[0.07] hover:border-[#06B6D4]/40 hover:shadow-[0_16px_40px_rgba(6,182,212,0.1)] transition-colors duration-300"
        >
          <div>
            {/* Header Row */}
            <div className="flex justify-between items-center px-6 pt-5 pb-3 border-b border-white/[0.04] bg-white/[0.01]">
              <span className="font-mono text-xs text-white/35 transition-colors duration-300 group-hover:text-[#06B6D4] font-medium">
                {getFilePath()}
              </span>
              <span className="font-mono text-xs text-white/35 font-semibold">
                {formattedNumber}
              </span>
            </div>

            {/* Visual Preview (Image at top) */}
            {hasScreenshots ? (
              <div className="h-[200px] relative overflow-hidden bg-gradient-to-br from-[#06B6D4]/10 via-[#020817] to-[#020817] flex items-center justify-center p-3 border-b border-white/[0.05]">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                
                {/* Mockup screen */}
                <div className="relative w-[85px] h-[170px] bg-black rounded-[14px] border-[2px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col transition-transform duration-500 group-hover:scale-[1.03]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-neutral-800 rounded-b-sm z-30" />
                  <div className="relative w-full h-full bg-[#0d0d0d] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentImgIdx}
                        src={screenshots[currentImgIdx].src}
                        alt={screenshots[currentImgIdx].caption}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                  <div className="absolute bottom-1.5 left-0 right-0 text-center bg-black/60 py-0.5 text-[6px] font-mono text-white/95 z-25">
                    {screenshots[currentImgIdx].caption}
                  </div>
                  {/* Dots */}
                  <div className="absolute bottom-0.5 left-0 right-0 flex justify-center gap-0.5 z-30">
                    {screenshots.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentImgIdx(idx); }}
                        className={`w-0.5 h-0.5 rounded-full pagination-dot transition-all duration-300 cursor-pointer ${currentImgIdx === idx ? 'bg-white scale-125' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[200px] relative overflow-hidden bg-gradient-to-br from-[#06B6D4]/5 via-transparent to-transparent flex items-center justify-center border-b border-white/[0.04] p-4">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="w-12 h-12 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  {IconComponent ? (
                    <IconComponent className="text-[#06B6D4] w-6 h-6" />
                  ) : (
                    <span className="text-[#06B6D4] text-sm font-bold font-mono">//</span>
                  )}
                </div>
              </div>
            )}

            {/* Description / Content */}
            <div className="p-5 text-left">
              <span className="block text-[11px] font-bold font-mono tracking-widest text-[#06B6D4] uppercase mb-1">
                {getCategory()}
              </span>
              <h3 className="text-base md:text-lg font-bold font-display text-white mb-2 line-clamp-1">
                {title.split(' — ')[0]}
              </h3>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-4 font-sans">
                {description}
              </p>
            </div>
          </div>

          {/* Footer of Front */}
          <div className="p-5 pt-0 text-left space-y-3.5">
            {/* Badges */}
            <div className="flex flex-wrap gap-1 max-h-[50px] overflow-hidden">
              {tags.slice(0, 4).map((tag, idx) => (
                <span key={idx} className="tech-tag text-[9px] px-2 py-0.5">
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="tech-tag text-[9px] px-2 py-0.5 opacity-60">+{tags.length - 4}</span>
              )}
            </div>

            {/* Action buttons & Flip hint */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
              {/* Links */}
              <div className="flex items-center gap-2">
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-white/10 hover:border-[#06B6D4]/40 hover:text-[#06B6D4] text-white/50 hover:bg-[#06B6D4]/5 rounded-md transition-all duration-200 cursor-pointer"
                    title="View Source on GitHub"
                  >
                    <GitHubIcon size={14} />
                  </a>
                )}
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-white/10 hover:border-[#06B6D4]/40 hover:text-[#06B6D4] text-white/50 hover:bg-[#06B6D4]/5 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-1 text-[10px] font-mono font-medium"
                  >
                    {liveLink.includes("releases") || liveLink.includes(".pdf") ? (
                      <>
                        <Download size={12} />
                        <span className="uppercase text-[8px]">GET</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink size={12} />
                        <span className="uppercase text-[8px]">LIVE</span>
                      </>
                    )}
                  </a>
                )}
              </div>

              {/* Flip Hint */}
              <span className="text-[9px] font-mono text-white/35 tracking-wider uppercase group-hover:text-[#06B6D4] transition-colors duration-300">
                Click to view features →
              </span>
            </div>
          </div>
        </div>

        {/* CARD BACK */}
        <div 
          onClick={handleCardClick}
          className="flip-card-back glass-card rounded-[10px] overflow-hidden flex flex-col justify-between cursor-pointer border border-white/[0.07] hover:border-[#06B6D4]/40 hover:shadow-[0_16px_40px_rgba(6,182,212,0.1)] transition-colors duration-300"
        >
          <div>
            {/* Header Row */}
            <div className="flex justify-between items-center px-6 pt-5 pb-3 border-b border-white/[0.04] bg-white/[0.01]">
              <span className="font-mono text-xs text-[#06B6D4] font-medium">
                {getFilePath()}
              </span>
              <span className="font-mono text-xs text-white/35 font-semibold">
                {formattedNumber}
              </span>
            </div>

            {/* Back Content: Scrollable Key Features */}
            <div className="p-5 text-left">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#06B6D4] uppercase block mb-3">
                ◆ KEY FEATURES ◆
              </span>
              <h3 className="text-base font-bold text-white mb-4 line-clamp-1 font-display">
                {title.split(' — ')[0]}
              </h3>

              {/* Scrollable list */}
              <ul className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-white/70 leading-relaxed">
                    <span className="text-[#06B6D4] mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer of Back */}
          <div className="p-5 pt-0 text-left space-y-3.5">
            {/* Tags (optional duplicated view to fill size) */}
            <div className="flex flex-wrap gap-1 max-h-[25px] overflow-hidden opacity-60">
              {tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="tech-tag text-[9px] px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
              {/* Links */}
              <div className="flex items-center gap-2">
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-white/10 hover:border-[#06B6D4]/40 hover:text-[#06B6D4] text-white/50 hover:bg-[#06B6D4]/5 rounded-md transition-all duration-200 cursor-pointer"
                  >
                    <GitHubIcon size={14} />
                  </a>
                )}
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-white/10 hover:border-[#06B6D4]/40 hover:text-[#06B6D4] text-white/50 hover:bg-[#06B6D4]/5 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-1 text-[10px] font-mono"
                  >
                    <ExternalLink size={12} />
                    <span className="uppercase text-[8px]">LIVE</span>
                  </a>
                )}
              </div>

              {/* Flip Back Hint */}
              <span className="text-[9px] font-mono text-white/35 tracking-wider uppercase group-hover:text-[#06B6D4] transition-colors duration-300">
                ← Click to flip back
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
