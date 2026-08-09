import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';

export default function AvatarVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Handle initial play with unmuted audio
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing unmuted by default
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay with sound blocked by browser, falling back to muted play:", err);
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  }, []);

  // Auto-mute when 1 complete video playback finishes
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
          transition={{
            delay: 1.5,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="w-full max-w-[440px] mx-auto my-auto"
        >
          <div className="relative group">
            {/* Close Button (top-right corner) */}
            <button
              onClick={handleClose}
              className="absolute -top-2.5 -right-2.5 z-30 w-7 h-7 bg-[#020817] border border-white/20 hover:border-red-500 hover:text-red-400 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-xl"
              title="Close video"
              aria-label="Close video"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {/* Landscape Video Container */}
            <div className="w-full aspect-[16/10] rounded-[16px] border-2 border-[#06B6D4] shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] transition-all duration-300 bg-[#020817] overflow-hidden relative cursor-pointer">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                loop={false}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              >
                <source src="/avatar-intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Animated Audio Indicator Badge (top-left) */}
              <AnimatePresence>
                {!isMuted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-3 left-3 z-20 bg-[#020817]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#06B6D4]/40 flex items-center space-x-1.5 pointer-events-none shadow-md"
                  >
                    <Volume2 size={13} className="text-[#06B6D4] animate-pulse" />
                    <span className="text-[11px] font-mono font-semibold text-white tracking-wide">
                      🔊 Playing...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Unmute / Mute Toggle Button (bottom-right) */}
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 z-20 w-8 h-8 bg-[#020817]/90 border border-[#06B6D4]/50 hover:border-[#06B6D4] text-[#06B6D4] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-md hover:scale-110"
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX size={15} strokeWidth={2} />
                ) : (
                  <Volume2 size={15} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
