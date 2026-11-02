'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Sun,
  Moon,
  Wrench,
  Shield,
  MapPin,
  Bell,
  Sparkles,
  User,
  ChevronDown,
  Navigation,
  CheckCircle2,
  Menu,
  X,
  CreditCard,
  Briefcase,
  Layers,
  Zap,
  LogIn,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const {
    currentUser,
    activePersona,
    setActivePersona,
    selectedCity,
    setSelectedCity,
    theme,
    toggleTheme,
    notifications,
    markNotificationAsRead,
    openBookingModal,
    openAuthModal,
    setIsPricingModalOpen,
    setIsAIAssistantOpen,
  } = useApp();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const cities = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Pune', 'Dubai', 'London'];

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      <div className="max-w-7xl mx-auto rounded-2xl glass-panel px-4 sm:px-6 py-2.5 flex items-center justify-between border border-slate-200/80 dark:border-white/10 shadow-lg backdrop-blur-2xl bg-white/70 dark:bg-[#07111F]/80">
        {/* BRAND LOGO ON THE LEFT */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#00D9FF] to-[#07111F] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 dark:bg-[#030712] rounded-[9px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-space">
              Home<span className="text-[#b48c1e] dark:text-[#D4AF37]">Ease</span>
            </span>
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-[#00D9FF]/20 text-sky-800 dark:text-[#00D9FF] border border-sky-300 dark:border-[#00D9FF]/30">
              PRO
            </span>
          </div>
        </Link>

        {/* AT THE VERY END OF HEADER: 3-LINE MENU BUTTON */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs transition-all shadow-md group cursor-pointer"
            title="Open Full Navigation Menu"
            aria-label="Open Full Navigation Menu"
          >
            <Menu className="w-4 h-4 text-[#00D9FF] dark:text-slate-900 group-hover:scale-110 transition-transform" />
            <span className="font-space">Menu</span>
          </button>
        </div>
      </div>

      {/* SLIDE-OUT MENU DRAWER (SLIDES FROM RIGHT TO LEFT WITH SMOOTH ANIMATION) */}
      {/* Dimmed backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ease-in-out ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Sliding Drawer Container */}
      <aside
        className={`fixed top-0 right-0 h-full w-[380px] max-w-[92vw] glass-panel bg-white/95 dark:bg-[#07111F]/95 backdrop-blur-3xl border-l border-slate-300/80 dark:border-white/15 shadow-2xl z-[101] transform transition-transform duration-300 ease-out flex flex-col justify-between overflow-y-auto ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* DRAWER TOP BAR: LOGO & CLOSE BUTTON */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
            <Link
              href="/"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#00D9FF] to-[#07111F] p-[1.5px]">
                <div className="w-full h-full bg-slate-950 dark:bg-[#030712] rounded-[9px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-space">
                Home<span className="text-[#b48c1e] dark:text-[#D4AF37]">Ease</span>
              </span>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-[#00D9FF]/20 text-sky-800 dark:text-[#00D9FF] border border-sky-300 dark:border-[#00D9FF]/30">
                PRO
              </span>
            </Link>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-gray-300 transition-all cursor-pointer"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DEDICATED HOME BUTTON */}
          <Link
            href="/"
            onClick={() => setIsDrawerOpen(false)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-[#D4AF37] transition-all group font-bold text-xs"
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-[#b48c1e] dark:text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Return to Home Page</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* CITY SELECTION IN DRAWER */}
          <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-gray-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#00D9FF]" />
                <span>Service City:</span>
              </span>
              <span className="text-[#0284c7] dark:text-[#00D9FF] font-semibold">{selectedCity}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    selectedCity === city
                      ? 'bg-sky-600 dark:bg-[#00D9FF] text-white dark:text-black shadow-sm'
                      : 'bg-white dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/5 hover:border-sky-400'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* THEME & FAST ACTIONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#0284c7]" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setIsAIAssistantOpen(true);
              }}
              className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-[#00D9FF]/30 text-sky-700 dark:text-[#00D9FF] text-xs font-bold flex items-center gap-1.5"
              title="AI Problem Diagnostics"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Lab</span>
            </button>
          </div>

          {/* MAIN NAVIGATION DIRECTORY */}
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-gray-500 tracking-wider block px-2 pb-1">
              Platform Sections
            </span>

            {[
              { label: 'All 14 Verified Services', href: '/#services', icon: Wrench, color: 'text-sky-600 dark:text-[#00D9FF]' },
              { label: 'Household Diagnostics (3D Lab)', href: '/#problems', icon: Layers, color: 'text-amber-600 dark:text-[#D4AF37]' },
              { label: 'How HomeEase Works', href: '/#how-it-works', icon: CheckCircle2, color: 'text-emerald-600 dark:text-[#00C853]' },
              { label: 'Live GPS Radar Map', href: '/#live-tracking', icon: Navigation, color: 'text-sky-600 dark:text-[#00D9FF]' },
              { label: 'Club Membership & Pricing', href: '/#pricing', icon: CreditCard, color: 'text-amber-600 dark:text-[#D4AF37]' },
              { label: 'Trust, Safety & ₹10,000 Coverage', href: '/#trust', icon: Shield, color: 'text-purple-600 dark:text-purple-400' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white transition-all font-semibold"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.label}</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-400" />
                </Link>
              );
            })}
          </div>

          {/* ACCOUNTS & REGISTRATION */}
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200 dark:border-white/10">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-gray-500 tracking-wider block px-2 pb-1">
              Account Portals & Registration
            </span>

            <Link
              href="/register"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/40 text-slate-900 dark:text-white transition-all font-bold"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div>Create Account (Register)</div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 font-normal">Customer & Service Provider Signup</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </Link>

            <Link
              href="/customer/login"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/20 hover:bg-sky-100 dark:hover:bg-sky-900/30 border border-sky-200 dark:border-sky-800/40 text-slate-900 dark:text-white transition-all font-bold"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#0284c7] dark:text-[#00D9FF]" />
                <div>
                  <div>Customer Login & Portal</div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 font-normal">View Services & Available Providers</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-600 dark:text-[#00D9FF]" />
            </Link>

            <Link
              href="/provider/login"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-amber-200 dark:border-amber-800/40 text-slate-900 dark:text-white transition-all font-bold"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
                <div>
                  <div>Service Provider Portal</div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 font-normal">Receive 5 km Dispatches & Payouts</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* DRAWER FOOTER: BOOK NOW CTA */}
        <div className="p-6 border-t border-slate-200 dark:border-white/10 space-y-3 bg-slate-50/80 dark:bg-black/30">
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              openBookingModal();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-black text-black" />
            <span>Autonomous Booking Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-gray-400 pt-1">
            <span>24/7 Priority Emergency Helpline</span>
            <span className="font-mono font-bold text-slate-700 dark:text-gray-300">1800-419-EASE</span>
          </div>
        </div>
      </aside>
    </header>
  );
}
