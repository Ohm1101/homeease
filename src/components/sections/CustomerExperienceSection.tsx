'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  CalendarCheck,
  Navigation,
  CreditCard,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CustomerExperienceSection() {
  const [activeStep, setActiveStep] = useState(2);
  const { openBookingModal } = useApp();

  const customerSteps = [
    {
      id: 'step-1',
      num: '01',
      title: 'Account Creation',
      tagline: 'Instant 1-Click Biometric or Google Sign-In',
      icon: UserPlus,
      color: '#00D9FF',
      details: 'Save luxury residences, security gate instructions, and family preferences in your secure encrypted profile.',
      preview: 'Zero passwords required. Passkey and OTP authentication ready in 5 seconds.',
    },
    {
      id: 'step-2',
      num: '02',
      title: 'Intelligent Service Search',
      tagline: 'AI Diagnostics or 14 Curated Sectors',
      icon: Search,
      color: '#D4AF37',
      details: 'Snap a picture of any broken appliance or leaking joint. Our neural vision model matches the exact spare part and technician rank.',
      preview: 'Natural language search: "My AC smells moldy and water is dripping on the floor"',
    },
    {
      id: 'step-3',
      num: '03',
      title: 'Instant Transparent Booking',
      tagline: 'Guaranteed Upfront Pricing Engine',
      icon: CalendarCheck,
      color: '#10B981',
      details: 'Choose between 25-minute immediate dispatch or schedule a VIP slot that matches your private calendar.',
      preview: 'Price Lock Promise: No dynamic surcharges added after confirmation.',
    },
    {
      id: 'step-4',
      num: '04',
      title: 'Live Uber-Style GPS Radar',
      tagline: 'Sub-Meter Precision Telemetry',
      icon: Navigation,
      color: '#00D9FF',
      details: 'Track your certified engineer in real-time as their electric service vehicle navigates your city streets with live ETA updates.',
      preview: 'Vehicle registration, driver photo, and direct encrypted VOIP audio call available.',
    },
    {
      id: 'step-5',
      num: '05',
      title: 'Automated Frictionless Payment',
      tagline: 'UPI, Luxury Cards & Instant Wallet',
      icon: CreditCard,
      color: '#D4AF37',
      details: 'Authorize payments seamlessly only after the 50-point cleanliness audit and digital sign-off are verified.',
      preview: 'GST invoice generated instantly and backed by ₹50 Lakh damage insurance.',
    },
    {
      id: 'step-6',
      num: '06',
      title: 'Reputation & Loyalty Rewards',
      tagline: 'Platinum Club Tier Progression',
      icon: Star,
      color: '#F59E0B',
      details: 'Rate your pro, add digital tips, and earn cashback points that convert directly into future service wallet credits.',
      preview: 'Every 5-star review enters you into our monthly Concierge Club luxury giveaway.',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-[#00D9FF] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 05 • Client Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          The Customer Experience
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          An elevated, concierge-grade journey from the moment you notice an issue to the final digital invoice.
        </p>
      </div>

      {/* INTERACTIVE JOURNEY DIAGRAM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT: 6-STEP INTERACTIVE PROGRESSION STACK */}
        <div className="lg:col-span-6 space-y-2.5">
          {customerSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl cursor-pointer border glass-panel transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? 'border-sky-500 dark:border-[#00D9FF] shadow-lg shadow-sky-500/15 dark:shadow-[#00D9FF]/15 translate-x-2'
                    : 'border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-500 dark:border-[#00D9FF] text-sky-700 dark:text-[#00D9FF]'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 font-bold">
                        PHASE {step.num}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-gray-400 mt-0.5">{step.tagline}</p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isSelected ? 'bg-sky-500 dark:bg-[#00D9FF] text-white dark:text-black font-bold' : 'text-slate-400 dark:text-gray-600'
                  }`}
                >
                  {isSelected ? '→' : '•'}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: ANIMATED STEP SPOTLIGHT CONTAINER */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl glass-panel p-8 border border-slate-300/80 dark:border-white/15 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-[#00D9FF] animate-ping" />
                <span className="text-xs font-mono text-slate-600 dark:text-gray-400 uppercase tracking-wider font-bold">
                  Phase {customerSteps[activeStep].num} Blueprint
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700 dark:text-[#D4AF37]">
                Customer Standard 99.4% CSAT
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-space">
                {customerSteps[activeStep].title}
              </h3>
              <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
                {customerSteps[activeStep].details}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-black/40 border border-slate-200 dark:border-[#00D9FF]/20 space-y-2">
              <span className="text-[10px] uppercase font-bold text-sky-700 dark:text-[#00D9FF] tracking-wider block">
                Feature Highlights & Protocol
              </span>
              <p className="text-xs text-slate-800 dark:text-gray-300 font-mono">
                {customerSteps[activeStep].preview}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero-Friction Guarantee</span>
              </div>

              <button
                onClick={() => openBookingModal()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#38bdf8] text-black font-bold text-xs shadow-lg shadow-[#00D9FF]/20 flex items-center gap-1.5 transition-all hover:opacity-90"
              >
                <span>Launch Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
