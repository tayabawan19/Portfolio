import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function AvatarVideo() {
  // Start muted to ensure 100% smooth mobile autoplay without freezing
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayedUnmuted, setHasPlayedUnmuted] = useState(false);
  const videoRef = useRef(null);

  // Guarantee mobile and desktop autoplay by starting muted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile Safari / Chrome requirement
    video.muted = true;
    video.playsInline = true;

    // Trigger autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay fallback handling:", err);
      });
    }

    // Try unmuting automatically if desktop browser allows unmuted audio
    const attemptUnmute = async () => {
      try {
        video.muted = false;
        await video.play();
        setIsMuted(false);
        setHasPlayedUnmuted(true);
      } catch (e) {
        // Autoplay policy prevented unmuted audio -> fallback to muted play
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      }
    };

    attemptUnmute();
  }, []);

  // When 1 full playback finishes: automatically mute and continue looping silently
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // User click/tap anywhere on container to toggle audio
  const handleContainerClick = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleMuteBtn = (e) => {
    e.stopPropagation();
    handleContainerClick();
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay: 1.2,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className="w-full max-w-[540px] md:max-w-[580px] mx-auto my-auto"
    >
      <div className="relative group">
        {/* Landscape Video Container */}
        <div 
          onClick={handleContainerClick}
          className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-[20px] border-2 border-[#06B6D4] shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] transition-all duration-300 bg-[#020817] overflow-hidden relative cursor-pointer"
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            preload="auto"
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          >
            <source src="/avatar-intro.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Animated Audio Indicator Badge (top-left) */}
          <AnimatePresence>
            {!isMuted ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-3 left-3 z-20 bg-[#020817]/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#06B6D4]/40 flex items-center space-x-1.5 pointer-events-none shadow-md"
              >
                <Volume2 size={14} className="text-[#06B6D4] animate-pulse" />
                <span className="text-[11px] font-mono font-semibold text-white tracking-wide">
                  🔊 Playing with Sound
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="tap-unmute"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-3 left-3 z-20 bg-[#020817]/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 flex items-center space-x-1.5 pointer-events-none shadow-md animate-pulse"
              >
                <VolumeX size={14} className="text-gray-400" />
                <span className="text-[11px] font-mono font-semibold text-white/90 tracking-wide">
                  Tap for Sound 🔊
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unmute / Mute Toggle Button (bottom-right) */}
          <button
            onClick={toggleMuteBtn}
            className="absolute bottom-3.5 right-3.5 z-20 w-9 h-9 bg-[#020817]/90 border border-[#06B6D4]/50 hover:border-[#06B6D4] text-[#06B6D4] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-md hover:scale-110"
            title={isMuted ? "Tap to unmute" : "Tap to mute"}
            aria-label={isMuted ? "Tap to unmute" : "Tap to mute"}
          >
            {isMuted ? (
              <VolumeX size={16} strokeWidth={2} />
            ) : (
              <Volume2 size={16} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
