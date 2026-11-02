'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Sparkles,
  X,
  Bell,
  ArrowRight,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CityUnavailableModal() {
  const {
    isCityUnavailableModalOpen,
    setIsCityUnavailableModalOpen,
    unavailableCityName,
    setSelectedCity,
    supportedCities,
  } = useApp();

  const [contactInput, setContactInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCityUnavailableModalOpen) return null;

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactInput('');
      setIsCityUnavailableModalOpen(false);
    }, 2500);
  };

  const handleSwitchToActiveCity = (city: string) => {
    setSelectedCity(city);
    setIsCityUnavailableModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl border border-sky-300/40 dark:border-white/15 space-y-6 text-center my-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsCityUnavailableModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* RADAR ICON WITH PULSE */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-sky-500/20 dark:bg-[#00D9FF]/20 animate-ping" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-sky-500/20 via-sky-400/30 to-amber-400/20 border-2 border-sky-400/50 flex items-center justify-center text-sky-600 dark:text-[#00D9FF] shadow-lg shadow-sky-500/20">
            <MapPin className="w-10 h-10" />
          </div>
        </div>

        {/* MAIN USER-REQUESTED NOTICE */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-[#D4AF37] border border-amber-500/20 inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Territory Coverage Notice</span>
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-space leading-snug">
            Services in {unavailableCityName}
          </h3>

          <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40">
            <p className="text-sm font-semibold text-slate-800 dark:text-cyan-200 leading-relaxed">
              We are unavailable to run services in <span className="underline decoration-amber-500 font-bold">{unavailableCityName}</span> right now, but we start there very soon, so come back later!
            </p>
          </div>
        </div>

        {/* NOTIFICATION WAITLIST */}
        {!isSubmitted ? (
          <form onSubmit={handleNotifySubmit} className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-gray-300">
              Be the first to know when certified professionals launch in your neighborhood:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Enter email or mobile number..."
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/15 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00D9FF] dark:hover:bg-[#38bdf8] text-white dark:text-black font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notify Me</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>You are on the priority waitlist for {unavailableCityName}!</span>
          </div>
        )}

        {/* SWITCH TO SUPPORTED CITIES */}
        <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2.5 text-xs">
          <span className="text-[11px] text-slate-500 dark:text-gray-400 block font-medium">
            Explore live autonomous dispatches in our active metros:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {supportedCities.map((city) => (
              <button
                key={city}
                onClick={() => handleSwitchToActiveCity(city)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold transition-all hover:border-[#D4AF37] flex items-center gap-1.5"
              >
                <Navigation className="w-3 h-3 text-[#b48c1e] dark:text-[#D4AF37]" />
                <span>{city}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
