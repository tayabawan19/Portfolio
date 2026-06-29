import React from 'react';

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  githubLink, 
  liveLink,
  icon: IconComponent,
  gradientText = "PROJECT PREVIEW"
}) {
  return (
    <div className="w-[85vw] md:w-[65vw] lg:w-[60vw] xl:w-[50vw] shrink-0 snap-start rounded-2xl border border-white/5 bg-[#121212] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:border-red-500/20 hover:shadow-[0_10px_30px_-15px_rgba(255,26,26,0.15)] group">
      
      {/* Left side: Visual representation / Gradient */}
      <div className="w-full md:w-2/5 h-48 md:h-auto min-h-[220px] relative overflow-hidden bg-gradient-to-br from-[#FF1A1A]/20 via-[#1A0303] to-[#0D0D0D] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/5">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#FF1A1A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#FF1A1A]/10 rounded-full blur-2xl"></div>
        
        {/* Project Icon */}
        <div className="w-16 h-16 rounded-full bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,26,26,0.1)] group-hover:scale-110 transition-transform duration-500 relative z-10">
          {IconComponent && <IconComponent className="text-[#FF1A1A] w-7 h-7" />}
        </div>
        
        {/* Overlay preview label */}
        <span className="text-[9px] font-mono tracking-[0.25em] text-gray-500 uppercase font-bold relative z-10">
          {gradientText}
        </span>
      </div>

      {/* Right side: Project Details */}
      <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Project Title (Vivid Red) */}
          <h3 className="text-xl md:text-2xl font-bold font-display text-[#FF1A1A] tracking-wider mb-3 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          
          {/* Project Description */}
          <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed mb-6">
            {description}
          </p>
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
