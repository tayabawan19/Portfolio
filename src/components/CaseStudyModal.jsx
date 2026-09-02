import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Layers, Cpu, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const GitHubIcon = ({ size = 16, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function CaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020817]/85 backdrop-blur-md z-40 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            className="relative w-full max-w-4xl bg-[#020817] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col text-left"
          >
            {/* Top Bar Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex items-start justify-between bg-gradient-to-r from-white/[0.03] to-transparent shrink-0">
              <div className="space-y-2 pr-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#06B6D4] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/25">
                    {project.category || project.gradientText || "Engineering Case Study"}
                  </span>
                  {project.isFlagship && (
                    <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center gap-1">
                      <Sparkles size={12} /> Flagship
                    </span>
                  )}
                </div>
                <h3 id="case-study-title" className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                  {project.title.split('—')[0].trim()}
                </h3>
                <p className="text-sm text-white/60 font-sans leading-relaxed">
                  {project.description}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 font-sans">
              
              {/* Media Preview (Video or Screenshot Gallery) */}
              {project.video ? (
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-lg">
                  <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] flex items-center gap-1.5 text-xs font-mono text-white/40">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-green-500/60" />
                    <span className="ml-2">Live Demo Walkthrough</span>
                  </div>
                  <video
                    src={project.video}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-h-[380px] object-contain bg-black"
                  />
                </div>
              ) : project.screenshots && project.screenshots.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] font-bold">
                    APPLICATION SCREENS
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {project.screenshots.map((s, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden border border-white/10 bg-[#020817] group">
                        <img
                          src={s.src}
                          alt={s.caption || `Screen ${idx + 1}`}
                          className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="p-1.5 text-[10px] font-mono text-white/50 text-center truncate bg-white/[0.02]">
                          {s.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <AlertCircle size={15} />
                    <span>The Engineering Problem</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    {project.problem || "Bridging the gap between academic projects and industry discovery, where student technical quality is difficult to verify objectively without structured AI analysis and real-time validation."}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-[#06B6D4] font-mono text-xs uppercase font-bold tracking-wider">
                    <CheckCircle2 size={15} />
                    <span>The Solution & Architecture</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    {project.solution || "An end-to-end full-stack software system implementing automated AI evaluation, resilient backend services, real-time messaging, and secure authentication to deliver a reliable user experience."}
                  </p>
                </div>
              </div>

              {/* System Architecture Flow */}
              {project.architecture && (
                <div className="p-6 rounded-xl bg-[#06B6D4]/[0.03] border border-[#06B6D4]/20 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] font-bold flex items-center gap-2">
                    <Layers size={16} /> SYSTEM ARCHITECTURE PIPELINE
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {project.architecture.map((layer, lIdx) => (
                      <div key={lIdx} className="p-3 rounded-lg bg-[#020817] border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-white/40 block">
                          Layer {lIdx + 1}: {layer.layer}
                        </span>
                        <span className="text-xs font-bold text-white block">
                          {layer.tech}
                        </span>
                        <p className="text-[11px] text-white/55 leading-tight">
                          {layer.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Technical Features / Achievements */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/70 font-bold flex items-center gap-2">
                  <Cpu size={16} className="text-[#06B6D4]" />
                  KEY TECHNICAL ACHIEVEMENTS & IMPLEMENTATION
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(project.achievements || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-white/75 leading-relaxed">
                      <span className="text-[#06B6D4] mt-0.5 shrink-0 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Challenges & Solutions */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300/80 font-bold flex items-center gap-2">
                    <Code2 size={16} className="text-amber-400" />
                    KEY ENGINEERING CHALLENGES & RESOLUTIONS
                  </h4>
                  <div className="space-y-3">
                    {project.challenges.map((ch, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 text-xs">
                        <div className="font-semibold text-white/90 flex items-center gap-2">
                          <span className="text-amber-400 font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10">
                            CHALLENGE
                          </span>
                          <span>{ch.challenge}</span>
                        </div>
                        <p className="text-white/60 pl-2 border-l border-[#06B6D4]/40 mt-1">
                          <span className="text-[#06B6D4] font-medium">Solution: </span>
                          {ch.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Technologies Tag List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-white/[0.04] border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.01] shrink-0">
              <span className="text-xs text-white/40 font-mono">
                Developer: Muhammad Tayyab Tanveer
              </span>
              
              <div className="flex items-center gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-md border border-white/15 hover:border-white text-white hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <GitHubIcon size={15} />
                    <span>View Repository</span>
                  </a>
                )}

                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-md bg-[#06B6D4] hover:bg-[#0891B2] text-white transition-all shadow-md shadow-[#06B6D4]/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Visit Live Application</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
