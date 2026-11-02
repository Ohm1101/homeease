'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CTASection() {
  const { openBookingModal, openAuthModal } = useApp();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-[#D4AF37]/40 p-8 sm:p-16 text-center space-y-6 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#00D9FF]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-black/60 border border-amber-500/40 dark:border-[#D4AF37]/40 text-amber-800 dark:text-[#D4AF37] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 13 • The Future of Living</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-space">
            Ready To Simplify Home Services?
          </h2>

          <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed font-medium">
            Join over 50,000 households enjoying verified master technicians, dynamic price guarantees, and instant live GPS dispatch across all residential needs.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openBookingModal()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-extrabold text-sm tracking-tight shadow-xl shadow-[#D4AF37]/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Book Service Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openAuthModal('provider')}
              className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-black/60 dark:hover:bg-black/80 border border-slate-300 dark:border-white/20 font-bold text-sm tracking-tight transition-all backdrop-blur-xl flex items-center gap-2.5 shadow-sm"
            >
              <Users className="w-4 h-4 text-sky-400 dark:text-[#00D9FF]" />
              <span>Become Provider</span>
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#00C853]" />
              <span>₹50 Lakh Property Protection</span>
            </span>
            <span>•</span>
            <span>Sub-38 Second AI Matching</span>
            <span>•</span>
            <span>100% Police Verified Masters</span>
          </div>
        </div>
      </div>
    </section>
  );
}
