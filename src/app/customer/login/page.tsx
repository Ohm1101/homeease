'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  User,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Wallet,
  Crown,
  Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { loginAsCustomer, customerProfile, isCustomerLoggedIn, theme, toggleTheme } = useApp();

  const [phone, setPhone] = useState(customerProfile.phone);
  const [email, setEmail] = useState(customerProfile.email);
  const [name, setName] = useState(customerProfile.name);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'otp' | 'google' | 'quick'>('quick');

  useEffect(() => {
    if (isCustomerLoggedIn) {
      router.push('/#customer-dashboard');
    }
  }, [isCustomerLoggedIn, router]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      loginAsCustomer({ phone, email, name });
      setIsLoggingIn(false);
      router.push('/#customer-dashboard');
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      loginAsCustomer();
      setIsLoggingIn(false);
      router.push('/#customer-dashboard');
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
              <div className="w-full h-full bg-[#0a1526] rounded-[11px] flex items-center justify-center overflow-hidden">
                <img
                  src="/images/homeease-icon.png"
                  alt="HomeEase"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white font-space">
              Home<span className="text-[#b48c1e] dark:text-[#D4AF37]">Ease</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/register"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors hidden sm:block"
          >
            New here? Register →
          </Link>

          <Link
            href="/provider/login"
            className="text-xs font-semibold text-slate-700 hover:text-[#b48c1e] dark:text-gray-400 dark:hover:text-[#D4AF37] transition-colors hidden sm:block"
          >
            Provider Login →
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
        {/* LEFT COLUMN: CUSTOMER IDENTITY & ACCOUNT DETAILS PREVIEW */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-sky-700 dark:text-[#00D9FF] text-xs font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>Client Authentication Gateway</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-space leading-tight">
            Customer Account Access
          </h1>

          <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
            Sign in to manage your active service dispatches, view live GPS tracking telemetry, top up your HomeEase Wallet, and inspect past GST invoices.
          </p>

          {/* Customer Portal Platform Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-[#00D9FF] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Sub-Second AI Dispatch</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Connect instantly with top-rated certified specialists in your area.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-[#D4AF37] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">30-Day Guarantee</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                ₹10,000 comprehensive property damage cover and free reservice warranty.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Live GPS Telemetry</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Uber-style real-time route tracking directly to your doorstep.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Zero Hidden Charges</h4>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Transparent dynamic pricing with automated GST invoicing and instant refunds.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM & 1-CLICK FAST LOGIN */}
        <div className="lg:col-span-6">
          <div className="p-8 rounded-3xl glass-panel border border-slate-300/80 dark:border-white/15 shadow-2xl space-y-6">
            {/* Quick Demo 1-Click Login Button */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00D9FF]/15 to-[#D4AF37]/15 border border-[#00D9FF]/40 space-y-2 text-center">
              <span className="text-[10px] uppercase font-bold text-sky-700 dark:text-[#00D9FF] tracking-wider block">
                Instant Investor & Evaluator Access
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00D9FF] text-black font-extrabold text-xs shadow-lg shadow-[#00D9FF]/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Signing in as {customerProfile.name}...</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span>1-Click Login as {customerProfile.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-gray-500 my-2">
              <div className="flex-1 h-[1px] bg-slate-300 dark:bg-white/10" />
              <span>OR ENTER CUSTOM CREDENTIALS</span>
              <div className="flex-1 h-[1px] bg-slate-300 dark:bg-white/10" />
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-800 dark:text-gray-300 font-semibold block mb-1">Full Name:</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-800 dark:text-gray-300 font-semibold block mb-1">Mobile Phone:</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-800 dark:text-gray-300 font-semibold block mb-1">Email Address:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/20 dark:border dark:border-white/15 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Authorize & Open Customer Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Direct Link to Registration Page */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
                  Don't have an account yet?
                </span>
                <span className="text-[10px] text-slate-600 dark:text-emerald-300">
                  Register as a new customer in 30 seconds
                </span>
              </div>
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm shrink-0"
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

              <Link href="/provider/login" className="hover:text-slate-900 dark:hover:text-[#D4AF37] font-medium">
                Service Provider Login →
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
        <span>256-Bit SSL Encrypted Customer Session</span>
      </footer>
    </main>
  );
}
