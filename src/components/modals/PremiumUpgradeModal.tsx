'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Crown,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Gift,
  Clock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PremiumUpgradeModal() {
  const { isPremiumModalOpen, setIsPremiumModalOpen, upgradeToPremium, currentUser } = useApp();

  if (!isPremiumModalOpen) return null;

  const handleActivate = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#00D9FF', '#FFD700', '#FFFFFF'],
      });
    } catch (e) {
      // silent fallback
    }
    upgradeToPremium();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/75 dark:bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel bg-white/95 dark:bg-[#0c1322]/95 border border-[#D4AF37]/50 p-6 sm:p-8 shadow-2xl space-y-6 my-auto text-slate-900 dark:text-white">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsPremiumModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-300 dark:border-white/10"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* HEADER ICON & BADGE */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#b48c1e] to-[#D4AF37] shadow-xl shadow-[#D4AF37]/30 mb-2">
            <Crown className="w-8 h-8 text-black fill-black" />
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            HomeEase VIP Experience
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-space text-slate-900 dark:text-white">
            Unlock HomeEase Premium
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 max-w-sm mx-auto">
            Upgrade your residence membership to receive instant promo credits, express priority queuing, and VIP benefits.
          </p>
        </div>

        {/* VALUE PROPOSITION PERKS */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-[#D4AF37]/10 border border-amber-500/20 dark:border-[#D4AF37]/30 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 dark:bg-[#D4AF37]/20 text-amber-800 dark:text-[#D4AF37] shrink-0 mt-0.5">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>₹500 Instant Welcome Bonus</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-extrabold">FREE</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                Credited directly to your wallet bonus balance. Redeemable for up to 10% off on all upcoming bookings!
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-500/10 dark:bg-[#00D9FF]/10 border border-sky-500/20 dark:border-[#00D9FF]/30 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 dark:bg-[#00D9FF]/20 text-sky-700 dark:text-[#00D9FF] shrink-0 mt-0.5">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Priority Express Queue (18m ETA)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                Skip standard 30-min queues with Silver VIP priority dispatch. Our nearest master technicians are assigned first.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-500/10 dark:bg-purple-500/10 border border-purple-500/20 dark:border-purple-500/30 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>₹200 Off First 5 Orders + Tiered Top-Up Bonuses</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                Enjoy ₹200 off your first 5 services, plus earn up to +20% extra bonus balance whenever you add money to your wallet.
              </p>
            </div>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleActivate}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#b48c1e] to-[#D4AF37] hover:from-[#c59c25] hover:to-[#dfbb43] text-black font-extrabold text-sm shadow-xl shadow-[#D4AF37]/30 flex items-center justify-center gap-2 transition-all"
          >
            <Crown className="w-4 h-4 fill-black" />
            <span>Claim ₹500 & Activate Premium</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPremiumModalOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-all text-center"
          >
            Continue with Standard Account
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-200 dark:border-white/10">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Zero subscription fees • Activate instantly with 1-click</span>
        </div>

      </div>
    </div>
  );
}
