'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  AlertTriangle,
  Clock,
  ShieldAlert,
  ArrowRight,
  Flame,
  Droplets,
  Zap,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { HOME_PROBLEMS, SERVICE_CATEGORIES } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const ProblemShowcase3D = dynamic(() => import('@/components/3d/ProblemShowcase3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[380px] rounded-2xl glass-panel border border-white/10 flex items-center justify-center">
      <div className="text-xs text-gray-400 font-mono">Loading 3D Hardware Telemetry...</div>
    </div>
  ),
});

export default function ProblemShowcaseSection() {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const { openBookingModal } = useApp();

  const currentProblem = HOME_PROBLEMS[selectedProblemIndex];

  const handleFixProblem = () => {
    const matchedCategory = SERVICE_CATEGORIES.find(
      (c) => c.name.toLowerCase().includes(currentProblem.category.toLowerCase().split(' ')[0])
    ) || SERVICE_CATEGORIES[0];
    openBookingModal(matchedCategory);
  };

  return (
    <section id="problems" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00D9FF]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Section 02 • Household Diagnostics</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          Every Home Needs Care
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          HomeEase connects you with skilled experts in minutes. Inspect common household emergencies in real-time 3D and dispatch certified technicians immediately.
        </p>
      </div>

      {/* INTERACTIVE 3D PROBLEM LAB GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: 6 PROBLEM SELECTOR CARDS */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 px-1 mb-2">
            Select Active Household Crisis
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {HOME_PROBLEMS.map((problem, index) => {
              const isSelected = selectedProblemIndex === index;
              return (
                <div
                  key={problem.id}
                  onClick={() => setSelectedProblemIndex(index)}
                  className={`p-3.5 rounded-2xl cursor-pointer border glass-panel transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 dark:border-[#D4AF37] shadow-lg shadow-amber-500/10 dark:shadow-[#D4AF37]/10 translate-x-1.5'
                      : 'border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-amber-500/20 dark:bg-[#D4AF37]/20 border-amber-500 dark:border-[#D4AF37] text-amber-800 dark:text-[#D4AF37]'
                          : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400'
                      }`}
                    >
                      {problem.modelType === 'pipe' && <Droplets className="w-5 h-5 text-sky-600 dark:text-[#00D9FF]" />}
                      {problem.modelType === 'switch' && <Zap className="w-5 h-5 text-amber-600 dark:text-[#D4AF37]" />}
                      {problem.modelType === 'ac' && <Cpu className="w-5 h-5 text-sky-500 dark:text-[#38BDF8]" />}
                      {problem.modelType === 'door' && <ShieldAlert className="w-5 h-5 text-amber-500 dark:text-[#F59E0B]" />}
                      {problem.modelType === 'leak' && <Droplets className="w-5 h-5 text-emerald-600 dark:text-[#10B981]" />}
                      {problem.modelType === 'appliance' && <AlertTriangle className="w-5 h-5 text-pink-600 dark:text-[#EC4899]" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{problem.title}</h4>
                      <p className="text-[11px] text-slate-600 dark:text-gray-400">
                        {problem.category} • <span className="text-sky-600 dark:text-[#00D9FF] font-semibold">{problem.eta} dispatch</span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-900 dark:text-[#D4AF37]'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'
                    }`}
                  >
                    {problem.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: 3D MODEL PREVIEW & DIAGNOSTIC CARD */}
        <div className="lg:col-span-7 space-y-5">
          {/* 3D Telemetry Canvas */}
          <ProblemShowcase3D modelType={currentProblem.modelType} />

          {/* Diagnostic Dossier Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-300/80 dark:border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-slate-600 dark:text-gray-400 tracking-wider">
                  Hazard Classification:
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{currentProblem.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 font-semibold border border-red-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {currentProblem.severity}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-700 dark:text-[#00D9FF] font-semibold border border-sky-500/30 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ETA {currentProblem.eta}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                <span className="text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  Detected Symptoms
                </span>
                <p className="text-slate-800 dark:text-gray-200 leading-relaxed font-medium">{currentProblem.symptoms}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                <span className="text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  Engineered Solution
                </span>
                <p className="text-slate-800 dark:text-gray-200 leading-relaxed font-medium">{currentProblem.solution}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="text-xs text-slate-600 dark:text-gray-400">Guaranteed Estimate:</div>
                <div className="text-base font-bold text-amber-700 dark:text-[#D4AF37]">
                  {currentProblem.costEstimate}
                </div>
              </div>

              <button
                onClick={handleFixProblem}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center gap-2 transition-all hover:opacity-90"
              >
                <span>Dispatch Verified Specialist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
