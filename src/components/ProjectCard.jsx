import React, { useState } from 'react';
import { ExternalLink, BookOpen, Layers, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const GitHubIcon = ({ size = 15, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectCard(props) {
  const project = props.project || props;
  const onOpenCaseStudy = props.onOpenCaseStudy;
  const {
    title,
    description,
    tags = [],
    githubLink,
    liveLink,
    icon: IconComponent,
    gradientText,
    isFlagship = false,
    video,
    screenshots = [],
    number = 1
  } = project;

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Pick the top 3-5 primary tags for clean visual hierarchy
  const displayTags = tags.slice(0, 4);

  // Clean title without em-dash if present
  const cleanTitle = title.includes('—') ? title.split('—')[0].trim() : title;
  const subtitle = title.includes('—') ? title.split('—')[1].trim() : (gradientText || "Engineering Project");

  return (
    <div className="h-full flex flex-col justify-between rounded-xl border border-white/10 bg-[#020817]/90 hover:border-[#06B6D4]/40 hover:bg-[#020817] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#06B6D4]/5 overflow-hidden text-left group">
      <div>
        {/* Card Header & Media Preview */}
        {video ? (
          <div className="relative h-48 bg-black overflow-hidden border-b border-white/10 flex items-center justify-center">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            {isFlagship && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#06B6D4] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1 z-10">
                ⚡ Flagship
              </span>
            )}
            <button
              onClick={() => onOpenCaseStudy && onOpenCaseStudy(project)}
              className="absolute inset-0 bg-black/30 hover:bg-black/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              aria-label="View Project Case Study"
            >
              <span className="px-3 py-1.5 rounded-full bg-[#020817]/80 backdrop-blur-sm border border-white/20 text-xs font-mono font-medium flex items-center gap-1.5">
                <Play size={12} className="fill-white" /> Case Study & Demo
              </span>
            </button>
          </div>
        ) : screenshots && screenshots.length > 0 ? (
          <div className="relative h-48 bg-[#0a1120] overflow-hidden border-b border-white/10 flex items-center justify-center">
            <img
              src={screenshots[activeImgIdx]?.src || screenshots[0]?.src}
              alt={title}
              className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
            {screenshots.length > 1 && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 z-10 bg-black/60 px-2 py-0.5 rounded-full">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIdx(i);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${activeImgIdx === i ? 'bg-[#06B6D4] w-3' : 'bg-white/40'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 text-[10px] font-mono uppercase tracking-wider">
              {subtitle}
            </span>
          </div>
        ) : (
          <div className="h-28 bg-gradient-to-br from-white/[0.03] to-transparent border-b border-white/10 p-5 flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]">
              {IconComponent ? <IconComponent size={22} /> : <Layers size={22} />}
            </div>
            <span className="text-xs font-mono font-bold text-white/30">
              #{String(number).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#06B6D4] block">
              {subtitle}
            </span>
            <h3 className="text-lg font-bold font-display text-white group-hover:text-[#06B6D4] transition-colors leading-snug">
              {cleanTitle}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {displayTags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-white/75"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-white/40">
                +{tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 sm:p-6 pt-0 border-t border-white/[0.06] mt-4 flex items-center justify-between gap-3 pt-4">
        {onOpenCaseStudy ? (
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="text-xs font-mono font-bold uppercase tracking-wider text-[#06B6D4] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1"
          >
            <BookOpen size={13} />
            <span>Case Study</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all cursor-pointer"
              aria-label={`${cleanTitle} GitHub repository`}
            >
              <GitHubIcon size={14} />
            </a>
          )}

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-[#06B6D4]/10 hover:bg-[#06B6D4] border border-[#06B6D4]/30 hover:border-[#06B6D4] text-[#06B6D4] hover:text-white text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Demo</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
