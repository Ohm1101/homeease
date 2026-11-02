'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Lock,
  Headphones,
  PhoneCall,
  MapPin,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { openAuthModal, openBookingModal } = useApp();

  return (
    <footer className="w-full bg-slate-100/90 dark:bg-[#030712] border-t border-slate-300 dark:border-white/10 pt-16 pb-12 relative overflow-hidden text-slate-800 dark:text-white">
      {/* Background ambient luxury glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b48c1e]/10 dark:bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0284c7]/10 dark:bg-[#00D9FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP INVESTOR & TRUST BANNER */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 mb-16 border border-slate-300/80 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-[#D4AF37]/20 border border-amber-500/40 dark:border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#b48c1e] dark:text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                The HomeEase Safety & Assurance Shield
              </h4>
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5 font-medium">
                Every verified booking includes up to ₹50,00,000 / $1,000,000 Property Damage Protection & 30-Day Workmanship Guarantee.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2.5 rounded-xl bg-[#b48c1e] hover:bg-[#d4af37] text-white dark:bg-[#D4AF37] dark:hover:bg-[#F3E5AB] dark:text-black font-semibold text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              Book Service Now
            </button>
            <button
              onClick={() => openAuthModal('provider')}
              className="px-5 py-2.5 rounded-xl bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-medium text-xs transition-all shadow-sm"
            >
              Partner Sign-Up
            </button>
          </div>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-300/80 dark:border-white/10">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#00D9FF] p-[1.5px]">
                <div className="w-full h-full bg-slate-950 dark:bg-[#030712] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-space">
                Home<span className="text-[#b48c1e] dark:text-[#D4AF37]">Ease</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed max-w-sm font-medium">
              HomeEase is the premier high-tech marketplace connecting discerning homeowners with background-cleared, skill-certified specialists for plumbing, electrical, climate control, smart home, and luxury renovations.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-gray-300 font-medium">
                <PhoneCall className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#00D9FF]" />
                <span>24/7 Emergency Hotline: 1800-419-EASE (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-gray-300 font-medium">
                <Mail className="w-3.5 h-3.5 text-[#b48c1e] dark:text-[#D4AF37]" />
                <span>concierge@homeease.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-gray-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#16a34a] dark:text-[#00C853]" />
                <span>Global HQ: Financial District, BKC, Mumbai & DIFC, Dubai</span>
              </div>
            </div>
          </div>

          {/* ALL 14 CATEGORIES */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 font-space">
              Service Sectors (14)
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-gray-400 font-medium">
              {SERVICE_CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <Link href={`#services`} className="hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 font-space">
              Specialized Care
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-gray-400 font-medium">
              {SERVICE_CATEGORIES.slice(7, 14).map((cat) => (
                <li key={cat.id}>
                  <Link href={`#services`} className="hover:text-[#0284c7] dark:hover:text-[#00D9FF] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PLATFORM & PORTALS */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 font-space">
              Portals & Architecture
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-gray-400 font-medium">
              <li>
                <Link href="#customer-dashboard" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="#provider-dashboard" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Provider Partner Suite
                </Link>
              </li>
              <li>
                <Link href="#admin-dashboard" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Master Admin & Dispatch
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  HomeEase Club Membership
                </Link>
              </li>
              <li>
                <Link href="#live-tracking" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Interactive Uber GPS Radar
                </Link>
              </li>
              <li>
                <Link href="#trust" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Trust Score & Police Verification
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & CERTIFICATIONS */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-gray-500 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#16a34a] dark:text-[#00C853]" />
              <span>256-bit End-to-End Encryption</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3 h-3 text-[#b48c1e] dark:text-[#D4AF37]" />
              <span>ISO 9001:2026 Quality Certified</span>
            </span>
          </div>

          <div>
            © 2026 HomeEase Technologies Inc. All rights reserved. Designed to world-class startup standards.
          </div>
        </div>
      </div>
    </footer>
  );
}
