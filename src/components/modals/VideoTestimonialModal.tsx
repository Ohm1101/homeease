'use client';

import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function VideoTestimonialModal() {
  const { isVideoModalOpen, setIsVideoModalOpen } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isVideoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/20 overflow-hidden shadow-2xl my-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsVideoModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SIMULATED VIDEO PLAYER CANVAS */}
        <div className="relative w-full h-[380px] sm:h-[460px] bg-black flex items-center justify-center overflow-hidden">
          {/* Background image backdrop */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Villa"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          />

          {/* Dark luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

          {/* Video Center Play / Pause Indicator */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-20 h-20 rounded-full bg-[#D4AF37]/90 text-black flex items-center justify-center shadow-2xl shadow-[#D4AF37]/50 hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-black" />
            ) : (
              <Play className="w-8 h-8 fill-black translate-x-0.5" />
            )}
          </button>

          {/* Floating Video Overlay Content */}
          <div className="absolute bottom-6 left-6 right-6 z-10 space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase text-[10px]">
                Verified Estate Case Study
              </span>
              <span className="text-gray-300 font-medium">Bandra West Sea-Facing Penthouse</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-space">
              "How HomeEase restored our entire 5,000 sq ft smart home within 45 minutes."
            </h3>

            <div className="flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">Karan Johar</span>
                <span>•</span>
                <span className="text-[#D4AF37]">★ 5.0 Rating Verified</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-black/60 text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-gray-400">01:45 / 02:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
