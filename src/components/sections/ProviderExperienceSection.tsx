'use client';

import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  BellRing,
  CheckCircle,
  Wallet,
  TrendingUp,
  UserCheck,
  ArrowRight,
  Calculator,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProviderExperienceSection() {
  const { openAuthModal } = useApp();
  const [weeklyHours, setWeeklyHours] = useState(35);
  const [selectedTrade, setSelectedTrade] = useState<'electrical' | 'plumbing' | 'ac' | 'smart-home'>('electrical');

  const tradeMultipliers = {
    electrical: { rate: 650, name: 'Master Electrical Engineer' },
    plumbing: { rate: 580, name: 'Certified Plumbing Specialist' },
    ac: { rate: 720, name: 'HVAC & Jet Cleaning Tech' },
    'smart-home': { rate: 950, name: 'IoT & Automation Specialist' },
  };

  const calculatedMonthlyIncome = Math.round(weeklyHours * tradeMultipliers[selectedTrade].rate * 4.2);

  const providerSteps = [
    {
      num: '01',
      title: 'Seamless Registration',
      subtitle: 'Digital profile creation with skill matrix and service radius configuration.',
      icon: UserCheck,
    },
    {
      num: '02',
      title: 'Document Upload',
      subtitle: 'Upload Aadhaar/National ID, trade certifications, and police clearance.',
      icon: FileText,
    },
    {
      num: '03',
      title: 'AI Verification Process',
      subtitle: 'Automated 24-hour background audit, criminal checks & tool inspection.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Receive Smart Dispatches',
      subtitle: 'Hyper-localized job alerts within 5 km. Accept or decline without penalty.',
      icon: BellRing,
    },
    {
      num: '05',
      title: 'Execute Quality Service',
      subtitle: 'Follow digital 50-point checklist with photographic evidence verification.',
      icon: CheckCircle,
    },
    {
      num: '06',
      title: 'Instant Daily Payouts',
      subtitle: 'Direct deposit into your bank account or HomeEase Pro Wallet within 60 seconds.',
      icon: Wallet,
    },
    {
      num: '07',
      title: 'Build Tier & Reputation',
      subtitle: 'Unlock Gold & Platinum status for lower commission fees and VIP commercial jobs.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 06 • Pro Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          The Provider Experience & Workflow
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          Empowering elite tradespeople with premium recurring earnings, dignity of work, automated navigation, and instant daily bank settlements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* LEFT COLUMN: 7-STEP PROVIDER WORKFLOW */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs uppercase font-bold text-slate-600 dark:text-gray-400 tracking-wider mb-2">
            The Pro Partner Pipeline
          </div>

          <div className="space-y-2.5">
            {providerSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-3.5 rounded-2xl glass-card border border-slate-300/80 dark:border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-white/5 border border-amber-500/20 dark:border-white/10 flex items-center justify-center font-bold text-xs text-amber-800 dark:text-[#D4AF37] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 font-bold">
                          STEP {step.num}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-gray-400 mt-0.5">{step.subtitle}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0 hidden sm:inline-block">
                    Automated
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE PRO EARNINGS CALCULATOR */}
        <div className="lg:col-span-5">
          <div className="p-8 rounded-3xl glass-panel-gold border border-amber-500/30 dark:border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-800 dark:text-[#D4AF37]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Pro Earnings Simulator
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Daily Payouts
              </span>
            </div>

            {/* Trade Selector */}
            <div className="space-y-2">
              <label className="text-xs text-slate-700 dark:text-gray-300 font-semibold block">Select Your Discipline:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['electrical', 'plumbing', 'ac', 'smart-home'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTrade(t)}
                    className={`py-2 px-2.5 rounded-xl border text-left capitalize transition-all ${
                      selectedTrade === t
                        ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37] shadow-sm'
                        : 'bg-white/80 dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:bg-white'
                    }`}
                  >
                    {t.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Hours Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 dark:text-gray-300 font-medium">Working Hours per Week:</span>
                <span className="font-bold text-sky-700 dark:text-[#00D9FF] font-mono">{weeklyHours} Hours / week</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-500 font-mono">
                <span>10 hrs (Part-Time)</span>
                <span>35 hrs (Standard)</span>
                <span>60 hrs (Full Throttle)</span>
              </div>
            </div>

            {/* Projected Output Card */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-black/60 border border-slate-300 dark:border-white/10 text-center space-y-1 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-gray-400 tracking-wider">
                Projected Monthly Net Earnings
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-space">
                ₹{calculatedMonthlyIncome.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-slate-600 dark:text-gray-400 block font-medium">
                ≈ ${(calculatedMonthlyIncome / 87).toFixed(0)} USD / mo (Zero delayed dues)
              </span>
            </div>

            <button
              onClick={() => openAuthModal('provider')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold text-xs tracking-tight shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2 transition-all hover:opacity-90"
            >
              <span>Apply for Verified Pro Accreditation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
