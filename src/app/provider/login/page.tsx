'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  Briefcase,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Award,
  Truck,
  DollarSign,
  Star,
  Navigation,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProviderLoginPage() {
  const router = useRouter();
  const { loginAsProvider, providerProfile, theme, toggleTheme } = useApp();

  const [phone, setPhone] = useState(providerProfile.phone);
  const [email, setEmail] = useState(providerProfile.email);
  const [name, setName] = useState(providerProfile.name);
  const [trade, setTrade] = useState('Plumbing & Hydraulic Restoration');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      loginAsProvider({ phone, email, name });
      setIsLoggingIn(false);
      router.push('/#provider-dashboard');
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      loginAsProvider();
      setIsLoggingIn(false);
      router.push('/#provider-dashboard');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[#dbe7f2] text-[#0f172a] dark:bg-[#030712] dark:text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden bg-mesh-pattern transition-colors duration-200">
      {/* TOP HEADER WITH PROMINENT HOME BUTTON & THEME TOGGLE */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-300/80 dark:border-white/10 z-10">
        <div className="flex items-center gap-4">
          {/* HOME BUTTON */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white transition-all shadow-sm group"
          >
            <Home className="w-4 h-4 text-[#b48c1e] dark:text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span>Home</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#00D9FF] p-[1.5px]">
              <div className="w-full h-full bg-slate-950 dark:bg-[#030712] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white font-space">
              Home<span className="text-[#b48c1e] dark:text-[#D4AF37]">Ease</span>
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-[#D4AF37] border border-amber-500/30">
              PRO SUITE
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/register"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors hidden sm:block"
          >
            New Provider? Register →
          </Link>

          <Link
            href="/customer/login"
            className="text-xs font-semibold text-slate-700 hover:text-sky-600 dark:text-gray-400 dark:hover:text-[#00D9FF] transition-colors hidden sm:block"
          >
            Customer Login →
          </Link>

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs text-slate-700 dark:text-gray-300 font-medium"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-5xl mx-auto w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* LEFT COLUMN: PROVIDER PROFILE & ACCREDITATION DETAILS */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-[#D4AF37] text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Accredited Specialist Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-space leading-tight">
            Provider Partner Sign In
          </h1>

          <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
            Enter your active provider session to receive live sub-second job dispatches within your 5 km radius, access daily revenue settlements, and chat with clients.
          </p>

          {/* Provider Portal Platform Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl glass-panel-gold border border-amber-500/20 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-[#D4AF37] flex items-center justify-center">
                <Navigation className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Hyper-Local Radar</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Receive high-paying dispatches within a 5 km radius with zero transit waste.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel-gold border border-amber-500/20 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Daily Instant Payouts</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Immediate settlement to your bank account or UPI after each job completion.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel-gold border border-amber-500/20 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-[#00D9FF] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">PRO Badge & VIP Flow</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Build your independent trade reputation with verified reviews and recurring retainers.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel-gold border border-amber-500/20 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Commercial Insurance</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                ₹50,000 technician personal safety and tool coverage backed by HomeEase Trust.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM & 1-CLICK FAST LOGIN */}
        <div className="lg:col-span-6">
          <div className="p-8 rounded-3xl glass-panel border border-slate-300/80 dark:border-white/15 shadow-2xl space-y-6">
            {/* Quick Demo 1-Click Login Button */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 to-[#00D9FF]/15 border border-[#D4AF37]/40 space-y-2 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-[#D4AF37] tracking-wider block">
                Instant Evaluator Access
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-extrabold text-xs shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Signing in as {providerProfile.name}...</span>
                  </>
                ) : (
                  <>
                    <Briefcase className="w-4 h-4" />
                    <span>1-Click Login as {providerProfile.name} (Pro)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-gray-500 my-2">
              <div className="flex-1 h-[1px] bg-slate-300 dark:bg-white/10" />
              <span>OR ENTER PRO ACCREDITATION</span>
              <div className="flex-1 h-[1px] bg-slate-300 dark:bg-white/10" />
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-800 dark:text-gray-300 font-semibold block mb-1">Specialist Name:</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-800 dark:text-gray-300 font-semibold block mb-1">Trade Discipline:</label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/90 dark:bg-black/90 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#D4AF37]"
                >
                  <option value="Plumbing & Hydraulic Restoration" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Plumbing & Hydraulic Restoration</option>
                  <option value="Certified High-Voltage Electrical" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Certified High-Voltage Electrical</option>
                  <option value="HVAC & Air Conditioning Specialist" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">HVAC & Air Conditioning Specialist</option>
                  <option value="Architectural Carpentry & Locks" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Architectural Carpentry & Locks</option>
                  <option value="Smart Home IoT & Surveillance" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Smart Home IoT & Surveillance</option>
                </select>
              </div>

              <div>
                <label className="text-slate-800 dark:text-gray-300 font-semibold block mb-1">Mobile Contact:</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/20 dark:border dark:border-white/15 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Authorize & Open Provider Partner Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Direct Link to Registration Page */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
                  Want to expand your trade business?
                </span>
                <span className="text-[10px] text-slate-600 dark:text-amber-300">
                  Register as an accredited Provider Partner
                </span>
              </div>
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm shrink-0"
              >
                <span>Register</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-600 dark:text-gray-400 border-t border-slate-200/80 dark:border-white/10">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-medium">
                <Home className="w-3.5 h-3.5 text-[#b48c1e] dark:text-[#D4AF37]" />
                <span>Return to Home</span>
              </Link>

              <Link href="/customer/login" className="hover:text-slate-900 dark:hover:text-[#00D9FF] font-medium">
                Customer Account Login →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-slate-300/80 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-600 dark:text-gray-400 z-10">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white font-medium">
          <Home className="w-3 h-3 text-[#b48c1e] dark:text-[#D4AF37]" />
          <span>HomeEase Platform</span>
        </Link>
        <span>Encrypted Provider Partner Access Channel</span>
      </footer>
    </main>
  );
}
