import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play } from 'lucide-react';

export default function AvatarVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Start video muted initially to comply with browser autoplay requirements
    video.muted = true;
    video.play().catch(() => {});

    const tryUnmute = async () => {
      try {
        video.muted = false;
        video.volume = 1.0;
        await video.play();
        setIsMuted(false);
        setHasInteracted(true);
      } catch (err) {
        // If autoplay policy requires a user tap, keep muted until tapped or scrolled
        video.muted = true;
        setIsMuted(true);
      }
    };

    const muteVideo = () => {
      video.muted = true;
      setIsMuted(true);
    };

    // Unmute when scrolled into view, mute when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            tryUnmute();
          } else {
            isVisibleRef.current = false;
            muteVideo();
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    observer.observe(container);

    // Global listener: unmute on user interaction if the video is currently in view
    const handleUserGesture = () => {
      if (isVisibleRef.current && video.muted) {
        tryUnmute();
      }
    };

    window.addEventListener('pointerdown', handleUserGesture);
    window.addEventListener('click', handleUserGesture);
    window.addEventListener('keydown', handleUserGesture);

    // Handle tab visibility (mute when switching tabs, unmute if visible upon returning)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        muteVideo();
      } else if (isVisibleRef.current) {
        tryUnmute();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      muteVideo();
    };
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
      if (!hasInteracted) {
        videoRef.current.currentTime = 0;
        setHasInteracted(true);
      }
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleMuteBtn = (e) => {
    e.stopPropagation();
    handleContainerClick();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4,
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
            preload="auto"
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          >
            <source src="/avatar-intro.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Prompt Overlay when muted */}
          <AnimatePresence>
            {isMuted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center pointer-events-none p-4 text-center z-10"
              >
                <div className="w-12 h-12 rounded-full bg-[#06B6D4] text-white flex items-center justify-center shadow-lg shadow-[#06B6D4]/40 animate-bounce mb-2">
                  <Volume2 size={22} className="ml-0.5" />
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold text-white bg-[#020817]/90 px-3 py-1.5 rounded-full border border-[#06B6D4]/50 shadow-md">
                  Tap Anywhere for Sound 🔊
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Audio Indicator Badge (top-left when playing sound) */}
          <AnimatePresence>
            {!isMuted && (
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
