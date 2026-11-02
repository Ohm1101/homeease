'use client';

import React, { useState } from 'react';
import {
  MousePointerClick,
  Radio,
  Calculator,
  Navigation,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function HowItWorksSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { openBookingModal } = useApp();

  const activeStep = HOW_IT_WORKS_STEPS[activeStepIndex];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 03 • Frictionless Workflow</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          How HomeEase Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          Six seamless phases designed for uncompromising precision, automated matching, and complete peace of mind.
        </p>
      </div>

      {/* 6-STEP HORIZONTAL INTERACTIVE TIMELINE SELECTOR */}
      <div className="relative mb-12">
        {/* Continuous connector line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-slate-300 dark:bg-white/10 -translate-y-1/2 z-0" />
        <div
          className="hidden lg:block absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#00D9FF] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(activeStepIndex / 5) * 100}%` }}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isCompleted = activeStepIndex > idx;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-32 glass-panel ${
                  isActive
                    ? 'border-amber-500 dark:border-[#D4AF37] shadow-xl shadow-amber-500/15 dark:shadow-[#D4AF37]/15 scale-105 ring-1 ring-amber-500'
                    : isCompleted
                    ? 'border-sky-500/40 text-slate-800 dark:text-gray-300'
                    : 'border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive ? 'text-amber-800 dark:text-[#D4AF37]' : isCompleted ? 'text-sky-700 dark:text-[#00D9FF]' : 'text-slate-500 dark:text-gray-500'
                    }`}
                  >
                    Phase {step.step}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? 'bg-[#D4AF37] text-black shadow'
                        : isCompleted
                        ? 'bg-[#00D9FF] text-black'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                </div>

                <div>
                  <h4
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-gray-300'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400 block truncate mt-0.5">
                    {step.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILED ACTIVE STEP SHOWCASE STAGE */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-300/80 dark:border-white/15 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: STEP INFORMATION */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-[#00D9FF] text-xs font-semibold">
              <span>Step {activeStep.step} of 06</span>
              <span>•</span>
              <span>{activeStep.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-space">
              {activeStep.title}
            </h3>

            <p className="text-base text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
              {activeStep.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-gray-300 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-[#D4AF37] tracking-wider block">
                Technical Execution Architecture
              </span>
              <p>{activeStep.detail}</p>
            </div>

            <div className="flex items-center gap-4 pt-3">
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20 flex items-center gap-2"
              >
                <span>Experience Booking Flow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() =>
                  setActiveStepIndex((prev) => (prev < 5 ? prev + 1 : 0))
                }
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-gray-200 text-xs font-semibold transition-all"
              >
                Next Phase →
              </button>
            </div>
          </div>

          {/* RIGHT: LIVE INTERACTIVE PREVIEW SIMULATION OF THIS STEP */}
          <div className="lg:col-span-5 p-5 rounded-2xl glass-panel border border-slate-300/80 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-[#00D9FF] animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-gray-300">SYSTEM SIMULATOR</span>
              </div>
              <span className="text-[10px] font-mono text-amber-700 dark:text-[#D4AF37] font-bold">v2.6 LIVE</span>
            </div>

            {activeStepIndex === 0 && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Plumbing • High Pressure Leak</span>
                  <span className="text-xs text-amber-800 dark:text-[#D4AF37] font-semibold">Selected</span>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-cyan-950/30 border border-sky-200 dark:border-[#00D9FF]/20 text-[11px] text-sky-900 dark:text-cyan-300">
                  AI Computer Vision: Analyzed photo of water burst. Recommended: Master Plumber with acoustic leak detector.
                </div>
              </div>
            )}

            {activeStepIndex === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-700 dark:text-gray-300">
                  <span>Geo-Spatial Radius:</span>
                  <span className="text-sky-700 dark:text-[#00D9FF] font-mono font-bold">4.2 km (Worli)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                    4.98
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Vikramaditya Sharma</div>
                    <div className="text-[10px] text-slate-600 dark:text-gray-400">Match found in 38 seconds</div>
                  </div>
                </div>
              </div>
            )}

            {activeStepIndex === 2 && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-gray-400 font-medium">
                  <span>Base Fee:</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹349</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-gray-400 font-medium">
                  <span>Travel Distance (2.1 km):</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹45</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-gray-400 font-medium">
                  <span>GST (18%):</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹94</span>
                </div>
                <div className="border-t border-slate-200 dark:border-white/10 pt-2 flex justify-between font-bold text-amber-800 dark:text-[#D4AF37] text-sm">
                  <span>Total Guaranteed:</span>
                  <span>₹617</span>
                </div>
              </div>
            )}

            {activeStepIndex === 3 && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-gray-400 font-medium">ETA:</span>
                  <span className="text-sky-700 dark:text-[#00D9FF] font-bold">7 Minutes (2.1 km)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00D9FF] h-full w-3/4 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-600 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                  <Navigation className="w-3.5 h-3.5 text-sky-600 dark:text-[#00D9FF]" />
                  <span>Tata Ace EV • Reg: MH 02 EV 9421</span>
                </div>
              </div>
            )}

            {activeStepIndex === 4 && (
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>50-Point Quality Checklist 100% Passed</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-gray-400 font-medium">
                  Digital handover signed. Anti-leak test executed under 4-bar pressure.
                </div>
              </div>
            )}

            {activeStepIndex === 5 && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-1 text-amber-500 dark:text-[#D4AF37]">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                  <span className="text-slate-900 dark:text-white ml-2 font-bold">5.0 Star Verified Review</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[11px] text-slate-700 dark:text-gray-300">
                  ₹500 Referral Bonus unlocked & GST invoice mailed to registered address.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
