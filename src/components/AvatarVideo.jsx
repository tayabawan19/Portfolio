import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';

export default function AvatarVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Handle unmute toggle with browser autoplay policy safety
  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch((err) => {
          console.warn("Playback error on unmute:", err);
        });
      }
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
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
          transition={{
            delay: 1.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="fixed bottom-6 left-6 max-[480px]:bottom-4 max-[480px]:left-4 z-[999] group"
        >
          <div className="relative">
            {/* Close Button (top-right of circle) */}
            <button
              onClick={handleClose}
              className="absolute -top-1 -right-1 z-20 w-6 h-6 bg-[#020817] border border-white/20 hover:border-red-500 hover:text-red-400 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg"
              title="Close video intro"
              aria-label="Close avatar intro video"
            >
              <X size={12} strokeWidth={2.5} />
            </button>

            {/* Circular Video Player Container */}
            <div className="w-[120px] h-[120px] max-[640px]:w-[90px] max-[640px]:h-[90px] max-[480px]:w-[80px] max-[480px]:h-[80px] rounded-full p-[2px] bg-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.85)] hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#020817] relative">
                <video
                  ref={videoRef}
                  src="/avatar-intro.mp4"
                  autoPlay
                  muted={isMuted}
                  playsInline
                  loop={false}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>

            {/* Unmute / Mute Toggle Button (bottom-right of circle) */}
            <button
              onClick={toggleMute}
              className="absolute -bottom-1 -right-1 z-20 w-7 h-7 bg-[#020817]/90 border border-[#06B6D4]/50 hover:border-[#06B6D4] text-[#06B6D4] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-md hover:scale-110"
              title={isMuted ? "Click to unmute" : "Click to mute"}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <VolumeX size={14} strokeWidth={2} />
              ) : (
                <Volume2 size={14} strokeWidth={2} />
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
