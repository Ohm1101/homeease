'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Home,
  User,
  Briefcase,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Building,
  Wrench,
  Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PremiumUpgradeModal from '@/components/modals/PremiumUpgradeModal';

export default function RegisterPage() {
  const router = useRouter();
  const { loginAsCustomer, loginAsProvider, theme, toggleTheme, supportedCities, setIsPremiumModalOpen, isCustomerLoggedIn } = useApp();

  useEffect(() => {
    if (isCustomerLoggedIn) {
      router.push('/#customer-dashboard');
    }
  }, [isCustomerLoggedIn, router]);

  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [address, setAddress] = useState('');
  const [trade, setTrade] = useState('Plumbing');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00D9FF', '#D4AF37', '#00C853'],
        });
      } catch (err) {}

      if (role === 'customer') {
        loginAsCustomer({
          name: name || 'Aarav Singhania',
          email: email || 'client@homeease.in',
          phone: phone || '+91 98700 88210',
          walletBalance: 0,
          bonusBalance: 0,
          isPremium: false,
          ordersCompletedCount: 0,
          loyaltyTier: 'Regular',
          loyaltyPoints: 0,
          address: {
            id: 'addr-new',
            label: 'Home',
            street: address || 'Penthouse 18B',
            area: 'Sea Face',
            city,
            zipCode: '400018',
            latitude: 19.0176,
            longitude: 72.8177,
            isDefault: true,
          },
        });
        setIsPremiumModalOpen(true);
        setIsSubmitting(false);
        router.push('/#customer-dashboard');
      } else {
        loginAsProvider({
          name: name || 'Vikramaditya Sharma',
          email: email || 'pro@homeease.in',
          phone: phone || '+91 98200 12845',
        });
        setIsSubmitting(false);
        router.push('/#provider-dashboard');
      }
    }, 900);
  };

  const handleQuickDemoRegister = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00D9FF', '#D4AF37', '#00C853'],
        });
      } catch (err) {}

      if (role === 'customer') {
        loginAsCustomer({
          walletBalance: 0,
          bonusBalance: 0,
          isPremium: false,
          ordersCompletedCount: 0,
          loyaltyTier: 'Regular',
          loyaltyPoints: 0,
        });
        setIsPremiumModalOpen(true);
        router.push('/#customer-dashboard');
      } else {
        loginAsProvider();
        router.push('/#provider-dashboard');
      }
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#dbe7f2] text-[#0f172a] dark:bg-[#030712] dark:text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden bg-mesh-pattern transition-colors duration-200">
      {/* HEADER WITH HOME BUTTON & THEME TOGGLE */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-white/10 z-10">
        <div className="flex items-center gap-4">
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
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/customer/login"
            className="text-xs font-semibold text-slate-700 hover:text-[#0284c7] dark:text-gray-300 dark:hover:text-[#00D9FF] transition-colors hidden sm:block"
          >
            Already have an account? Sign In →
          </Link>

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs text-slate-700 dark:text-gray-300 font-medium"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* REGISTRATION CONTAINER */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8 z-10">
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-slate-300/80 dark:border-white/15 shadow-2xl space-y-6">
          {/* HEADER */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Your HomeEase Account</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-space">
              Join the Next-Gen Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              Book verified home maintenance specialists with sub-second AI dispatch, live GPS tracking, and ₹10,000 damage protection.
            </p>
          </div>

          {/* ROLE SELECTOR TOGGLE (CUSTOMER VS SERVICE PROVIDER) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'customer'
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-[#0284c7] dark:text-[#00D9FF]" />
              <span>Customer Account</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('provider')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'provider'
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#b48c1e] dark:text-[#D4AF37]" />
              <span>Service Provider</span>
            </button>
          </div>

          {/* 1-CLICK QUICK REGISTRATION */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-amber-500/10 to-emerald-500/10 border border-sky-400/30 text-center space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-sky-800 dark:text-[#00D9FF] tracking-wider block">
              Instant Investor & Evaluator Signup
            </span>
            <button
              type="button"
              onClick={handleQuickDemoRegister}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00D9FF] text-black font-extrabold text-xs shadow-md shadow-sky-500/20 inline-flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>1-Click Fast Register as {role === 'customer' ? 'Customer (Aarav)' : 'Provider (Vikram)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* REGISTRATION FORM */}
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 dark:text-gray-300 font-bold block mb-1">
                  Full Legal Name:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Singhania"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-gray-300 font-bold block mb-1">
                  Mobile Number:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98700 88210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-gray-300 font-bold block mb-1">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@luxuryestates.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-gray-300 font-bold block mb-1">
                  Service City:
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-medium"
                  >
                    {supportedCities.map((c) => (
                      <option key={c} value={c} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {role === 'provider' && (
                <div>
                  <label className="text-slate-700 dark:text-gray-300 font-bold block mb-1">
                    Primary Trade / Discipline:
                  </label>
                  <div className="relative">
                    <Wrench className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={trade}
                      onChange={(e) => setTrade(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-medium"
                    >
                      <option value="Plumbing">Plumbing & Sanitary</option>
                      <option value="Electrical">Electrical & Circuitry</option>
                      <option value="AC Services">HVAC & Jet Foam AC</option>
                      <option value="Appliance Repair">Appliance Restoration</option>
                      <option value="Carpentry">Luxury Carpentry</option>
                      <option value="Deep Cleaning">Full Deep Cleaning</option>
                    </select>
                  </div>
                </div>
              )}

              <div className={role === 'customer' ? 'sm:col-span-2' : ''}>
                <label className="text-slate-700 dark:text-gray-300 font-bold block mb-1">
                  Street / Area Address:
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Penthouse 24B, Lodha Bellissimo, Worli"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-medium"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 dark:text-gray-300 font-bold block mb-1">
                  Create Account Password:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Enter strong password (min. 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* AGREEMENT CHECKBOX */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-sky-600 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-slate-600 dark:text-gray-300 text-[11px] leading-relaxed cursor-pointer">
                I agree to HomeEase Platform Terms of Service, 30-Day Reservice Guarantee, ₹10,000 comprehensive property coverage, and Privacy Policy.
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting || !agreed}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-extrabold text-xs tracking-tight shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white dark:border-black border-t-transparent animate-spin" />
                  <span>Creating Your Verified Account...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span>Complete Registration & Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* FOOTER SWITCH TO LOGIN */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-gray-400">
            <div>
              <span>Already registered? </span>
              <Link href="/customer/login" className="text-sky-600 dark:text-[#00D9FF] font-bold hover:underline">
                Sign In to Customer Account
              </Link>
            </div>

            <Link href="/provider/login" className="text-amber-700 dark:text-[#D4AF37] font-bold hover:underline">
              Looking for Specialist Provider Login? →
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-500 z-10">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">
          <Home className="w-3 h-3 text-[#b48c1e] dark:text-[#D4AF37]" />
          <span>HomeEase Platform</span>
        </Link>
        <span>256-Bit SSL Encrypted Registration Session</span>
      </footer>

      {/* VIP PREMIUM ONBOARDING MODAL */}
      <PremiumUpgradeModal />
    </main>
  );
}
