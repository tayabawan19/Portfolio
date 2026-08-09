import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

export default function AvatarHeroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && isPlaying) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-[420px] rounded-2xl overflow-hidden bg-[#0A0F1D]/90 border border-[#06B6D4]/30 shadow-[0_0_35px_rgba(6,182,212,0.2)] hover:shadow-[0_0_50px_rgba(6,182,212,0.35)] hover:border-[#06B6D4]/60 transition-all duration-500 relative group"
      >
        {/* Header Bar */}
        <div className="bg-[#020817]/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#06B6D4]"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              AI Avatar Intro
            </span>
          </div>

          <button
            onClick={toggleMute}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-all text-[11px] font-mono font-semibold cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX size={13} />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <Volume2 size={13} />
                <span>Muted</span>
              </>
            )}
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative w-full aspect-[4/5] bg-black/60 overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/avatar-intro.mp4" type="video/mp4" />
            <source src="/avatar-intro.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Click Target to Toggle Play/Pause or Unmute */}
          <div 
            onClick={togglePlay}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-14 h-14 rounded-full bg-[#06B6D4] text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                <Play size={24} className="ml-1 fill-current" />
              </div>
            )}
          </div>

          {/* Unmute Prompt Banner if Muted */}
          {isMuted && (
            <button
              onClick={toggleMute}
              className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#020817]/85 border border-[#06B6D4]/40 hover:border-[#06B6D4] text-white text-[11px] font-mono px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 transition-all cursor-pointer backdrop-blur-md animate-pulse"
            >
              <VolumeX size={12} className="text-[#06B6D4]" />
              <span>Click for Sound</span>
            </button>
          )}

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-[#06B6D4] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer Controls & Info */}
        <div className="p-3 bg-[#020817]/95 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={handleRestart}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              title="Restart Video"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <span className="text-[11px] text-gray-400">
            Muhammad Tayyab Tanveer
          </span>
        </div>
      </motion.div>
    </div>
  );
}
