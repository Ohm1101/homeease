'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Smartphone,
  Calendar,
  Navigation,
  Wallet,
  Star,
  LayoutDashboard,
  Download,
  QrCode,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const Smartphone3D = dynamic(() => import('@/components/3d/Smartphone3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-3xl glass-panel border border-white/10 flex items-center justify-center">
      <div className="text-xs text-gray-400 font-mono">Loading 3D Smartphone Viewport...</div>
    </div>
  ),
});

type AppScreen = 'booking' | 'tracking' | 'wallet' | 'reviews' | 'dashboard';

export default function MobileAppShowcaseSection() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('booking');

  const screens = [
    {
      id: 'booking',
      title: 'Instant Booking',
      subtitle: '1-tap express dispatch or schedule with AI photo symptom diagnosis.',
      icon: Calendar,
      color: '#00D9FF',
      mockContent: {
        headline: 'Emergency Dispatch Active',
        stat: '38s Average Matching',
        detail: 'Instant dispatch algorithm pins 5-star certified technicians within 3 km.',
      },
    },
    {
      id: 'tracking',
      title: 'Real-Time Radar',
      subtitle: 'Live Uber-style map tracking with turn-by-turn ETA and telemetry.',
      icon: Navigation,
      color: '#00D9FF',
      mockContent: {
        headline: 'Live GPS Telemetry',
        stat: '7 Mins Away • 34 km/h',
        detail: 'Electric service van en route. Direct encrypted audio calling enabled.',
      },
    },
    {
      id: 'wallet',
      title: 'HomeEase Wallet',
      subtitle: 'Instant cashback credits, GST invoices, and 1-tap refunds.',
      icon: Wallet,
      color: '#D4AF37',
      mockContent: {
        headline: 'Available Balance: ₹4,850',
        stat: 'Platinum Tier Rewards',
        detail: 'Earn 5% cashback on every home maintenance visit with auto-redemption.',
      },
    },
    {
      id: 'reviews',
      title: 'Verified Reviews',
      subtitle: '100% authenticated client feedback with before/after photos.',
      icon: Star,
      color: '#F59E0B',
      mockContent: {
        headline: '4.98 Rating • 14,200 Reviews',
        stat: '100% Workmanship Guarantee',
        detail: 'Every feedback is verified through digital smart contract handovers.',
      },
    },
    {
      id: 'dashboard',
      title: 'Provider Partner Suite',
      subtitle: 'Dedicated portal for technicians to manage jobs and daily payouts.',
      icon: LayoutDashboard,
      color: '#10B981',
      mockContent: {
        headline: 'Daily Earnings: ₹4,200',
        stat: '3 Jobs Completed Today',
        detail: 'Same-day bank settlement with automatic tool insurance coverage.',
      },
    },
  ];

  const currentScreenData = screens.find((s) => s.id === activeScreen) || screens[0];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-[#00D9FF] text-xs font-semibold">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Section 11 • Mobile Native Experience</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          Next-Gen Mobile Application
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          Experience HomeEase in the palm of your hand. Built for iOS and Android with fluid 120 FPS animations, widgets, and dynamic island notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: 5 SCREEN SELECTOR CARDS */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs uppercase font-bold text-slate-600 dark:text-gray-400 tracking-wider mb-2">
            Switch In-App Screen
          </div>

          <div className="space-y-2.5">
            {screens.map((screen) => {
              const Icon = screen.icon;
              const isSelected = activeScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(screen.id as AppScreen)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between glass-panel ${
                    isSelected
                      ? 'border-amber-500 dark:border-[#D4AF37] shadow-xl shadow-amber-500/15 dark:shadow-[#D4AF37]/15 translate-x-1.5'
                      : 'border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-amber-500/20 dark:bg-[#D4AF37]/20 border-amber-500 dark:border-[#D4AF37] text-amber-800 dark:text-[#D4AF37]'
                          : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{screen.title}</h4>
                      <p className="text-[11px] text-slate-600 dark:text-gray-400 mt-0.5 font-medium">{screen.subtitle}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-amber-800 dark:text-[#D4AF37]' : 'text-slate-400 dark:text-gray-600'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* APP STORE DOWNLOAD BADGES */}
          <div className="pt-6 flex flex-wrap items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 flex items-center gap-2.5 text-xs transition-all shadow-sm">
              <Download className="w-4 h-4 text-sky-400 dark:text-[#00D9FF]" />
              <div className="text-left">
                <div className="text-[9px] text-slate-300 dark:text-gray-400 uppercase">Download on the</div>
                <div className="font-bold text-white">Apple App Store</div>
              </div>
            </button>

            <button className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 flex items-center gap-2.5 text-xs transition-all shadow-sm">
              <Download className="w-4 h-4 text-amber-400 dark:text-[#D4AF37]" />
              <div className="text-left">
                <div className="text-[9px] text-slate-300 dark:text-gray-400 uppercase">Get it on</div>
                <div className="font-bold text-white">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D ROTATING SMARTPHONE & LIVE SCREEN SIMULATOR */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* 3D Canvas Phone */}
            <Smartphone3D activeScreen={activeScreen} />

            {/* Screen Telemetry Glass Tag */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 p-3.5 rounded-2xl glass-panel border border-slate-300/80 dark:border-white/15 text-center shadow-2xl backdrop-blur-xl">
              <div className="text-[10px] uppercase font-bold text-amber-800 dark:text-[#D4AF37] tracking-wider">
                {currentScreenData.mockContent.headline}
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                {currentScreenData.mockContent.stat}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 mt-1 font-medium">
                {currentScreenData.mockContent.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
