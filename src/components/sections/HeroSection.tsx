'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  TrendingDown,
  Navigation,
  Lock,
  ArrowRight,
  Search,
  Sparkles,
  Zap,
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  PhoneCall,
  Activity,
  Award,
  ChevronRight,
  Shield,
  Truck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SERVICE_CATEGORIES } from '@/data/mockData';

export default function HeroSection() {
  const { openBookingModal, openAuthModal, setIsPricingModalOpen, setIsAIAssistantOpen, selectedCity } = useApp();
  const [selectedCatId, setSelectedCatId] = useState('plumbing');
  const [selectedEstimatorIndex, setSelectedEstimatorIndex] = useState(0);

  const estimatorItems = [
    {
      title: 'Water Leakage Repair',
      category: 'Plumbing',
      base: 349,
      duration: '45 mins',
      included: 'Inspection + Pipe Joint Seal + 30D Warranty',
      catId: 'plumbing',
    },
    {
      title: 'AC Jet Deep Clean',
      category: 'AC Services',
      base: 599,
      duration: '60 mins',
      included: 'Indoor/Outdoor Jet Wash + Gas Pressure Check',
      catId: 'ac-services',
    },
    {
      title: 'Short Circuit & Wiring',
      category: 'Electrical',
      base: 299,
      duration: '35 mins',
      included: 'MCB Load Diagnostics + Shock Prevention',
      catId: 'electrical',
    },
    {
      title: 'Full Villa Deep Sanitization',
      category: 'Cleaning',
      base: 999,
      duration: '180 mins',
      included: 'Hospital-grade disinfectant + Machine Scrub',
      catId: 'cleaning',
    },
  ];

  const currentEstimator = estimatorItems[selectedEstimatorIndex];

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = SERVICE_CATEGORIES.find((c) => c.id === selectedCatId) || SERVICE_CATEGORIES[0];
    openBookingModal(cat);
  };

  const handleBookEstimator = (catId: string) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.id === catId) || SERVICE_CATEGORIES[0];
    openBookingModal(cat);
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-mesh-pattern">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#00D9FF]/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT COLUMN: HERO VALUE PROPOSITION */}
        <div className="lg:col-span-6 space-y-6 z-10">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-[#D4AF37]/40 shadow-sm backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-800 dark:text-gray-200">
              Next-Gen Autonomous Service Marketplace
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-space">
            Trusted Home Services{' '}
            <span className="gold-gradient-text block mt-1">at Your Fingertips</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl">
            Book verified professionals for plumbing, electrical work, repairs, cleaning, renovation, and smart home automation with sub-second AI dispatch, real-time GPS tracking, and transparent dynamic pricing.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => openBookingModal()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-slate-950 font-bold text-sm tracking-tight shadow-xl shadow-[#D4AF37]/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>Get Started & Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openAuthModal('provider')}
              className="px-5 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-sm transition-all shadow-sm backdrop-blur-xl flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#0284c7] dark:text-[#00D9FF]" />
              <span>Become a Service Provider</span>
            </button>

            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="px-4 py-3.5 rounded-xl bg-sky-50 dark:bg-cyan-950/40 hover:bg-sky-100 dark:hover:bg-cyan-900/40 border border-sky-300 dark:border-[#00D9FF]/30 text-sky-800 dark:text-[#00D9FF] font-medium text-xs transition-all flex items-center gap-1.5"
            >
              <span>Calculate Estimate</span>
            </button>
          </div>

          {/* QUICK SERVICE BOOKING BAR */}
          <form
            onSubmit={handleQuickBook}
            className="p-2 sm:p-2.5 rounded-2xl glass-panel border border-slate-200 dark:border-white/15 shadow-xl flex flex-col sm:flex-row items-center gap-2 mt-4"
          >
            <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto flex-1">
              <Search className="w-4 h-4 text-[#b48c1e] dark:text-[#D4AF37] shrink-0" />
              <select
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="bg-transparent text-xs text-slate-800 dark:text-white outline-none w-full cursor-pointer font-medium"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-white text-slate-900 dark:bg-[#111827] dark:text-white">
                    {cat.name} — From ₹{cat.startingPrice}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-gray-400 w-full sm:w-auto">
              <MapPin className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#00D9FF]" />
              <span className="text-slate-800 dark:text-white font-medium">{selectedCity}</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md shadow-[#00D9FF]/20"
            >
              Find Pro (38s)
            </button>
          </form>

          {/* 4 MANDATORY VISUAL BADGES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#00C853] shrink-0" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-200">
                ✓ Verified Professionals
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
              <TrendingDown className="w-4 h-4 text-[#b48c1e] dark:text-[#D4AF37] shrink-0" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-200">
                ✓ Dynamic Pricing
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
              <Navigation className="w-4 h-4 text-[#0284c7] dark:text-[#00D9FF] shrink-0" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-200">
                ✓ Live GPS Tracking
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
              <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-200">
                ✓ Secure Payments
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREMIER LIVE DISPATCH & PRO SHOWCASE HUB */}
        <div className="lg:col-span-6 z-10 space-y-4">
          {/* MAIN SHOWCASE PANEL */}
          <div className="rounded-3xl glass-panel p-6 sm:p-7 shadow-2xl border border-slate-200/80 dark:border-white/15 relative overflow-hidden bg-white/60 dark:bg-[#0c1322]/80 backdrop-blur-xl">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#D4AF37]/15 to-transparent rounded-bl-full pointer-events-none" />

            {/* TOP DISPATCH STATUS BAR */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">
                  Live Dispatch Radar: <span className="text-[#0284c7] dark:text-[#00D9FF]">{selectedCity}</span>
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                28 Specialists Available Now
              </span>
            </div>

            {/* FEATURED TOP-RATED SPECIALIST CARD */}
            <div className="mt-5 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                      alt="Vikramaditya Sharma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white dark:bg-[#0c1322]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-white dark:fill-[#0c1322]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-space">
                      Vikramaditya Sharma
                    </h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-[#D4AF37]/20 text-amber-800 dark:text-[#D4AF37]">
                      PRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-gray-400">
                    Master HVAC & Electrical Specialist
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 dark:text-gray-300">
                    <span className="flex items-center text-amber-600 dark:text-[#D4AF37] font-semibold">
                      <Star className="w-3 h-3 fill-current mr-0.5" /> 4.98
                    </span>
                    <span>•</span>
                    <span>2,410+ jobs completed</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">7 min ETA</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBookEstimator('electrical')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs tracking-tight shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Instant Connect</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* INTERACTIVE SERVICE COST ESTIMATOR CHIPS */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-300">
                  Instant Guaranteed Fair Quotes
                </span>
                <span className="text-[11px] text-slate-500 dark:text-gray-400">
                  Click to inspect breakdown
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {estimatorItems.map((item, index) => {
                  const isSelected = selectedEstimatorIndex === index;
                  return (
                    <button
                      key={item.title}
                      onClick={() => setSelectedEstimatorIndex(index)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-amber-50/80 dark:bg-[#D4AF37]/15 border-[#D4AF37] shadow-sm'
                          : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase text-slate-500 dark:text-gray-400">
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-[#b48c1e] dark:text-[#D4AF37]">
                          ₹{item.base}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-white truncate mt-0.5">
                        {item.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ESTIMATOR ACTIVE BREAKDOWN BOX */}
              <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-between mt-2">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    {currentEstimator.title} — ₹{currentEstimator.base}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-gray-400">
                    {currentEstimator.included} • ⏱️ {currentEstimator.duration}
                  </div>
                </div>
                <button
                  onClick={() => handleBookEstimator(currentEstimator.catId)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#00D9FF] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs shadow-sm transition-all shrink-0"
                >
                  Book ₹{currentEstimator.base}
                </button>
              </div>
            </div>

            {/* REAL-TIME DISPATCH ACTIVITY TICKER */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span>Last booking: 3 mins ago in Worli Sea Face</span>
              </div>
              <div className="flex items-center gap-1 text-slate-700 dark:text-gray-300 font-medium">
                <Shield className="w-3.5 h-3.5 text-[#b48c1e] dark:text-[#D4AF37]" />
                <span>₹10,000 Damage Cover</span>
              </div>
            </div>
          </div>

          {/* 3 VALUE CARDS BELOW SHOWCASE */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-center bg-white/60 dark:bg-white/5 backdrop-blur-xl">
              <div className="text-base font-extrabold text-slate-900 dark:text-white font-space">
                15 Mins
              </div>
              <div className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">
                Avg. Dispatch Arrival
              </div>
            </div>

            <div className="p-3 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-center bg-white/60 dark:bg-white/5 backdrop-blur-xl">
              <div className="text-base font-extrabold text-amber-700 dark:text-[#D4AF37] font-space">
                30-Day
              </div>
              <div className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">
                Free Reservice Guarantee
              </div>
            </div>

            <div className="p-3 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-center bg-white/60 dark:bg-white/5 backdrop-blur-xl">
              <div className="text-base font-extrabold text-[#0284c7] dark:text-[#00D9FF] font-space">
                100%
              </div>
              <div className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">
                Verified Background Checks
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
