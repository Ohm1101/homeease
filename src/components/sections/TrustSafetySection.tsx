'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  Fingerprint,
  MapPin,
  Phone,
  Briefcase,
  UserCheck,
  Sparkles,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export default function TrustSafetySection() {
  const verificationPillars = [
    {
      id: 'v1',
      title: 'Government ID Verified',
      subtitle: 'Aadhaar / National Passport biometrically validated with UIDAI & government databases.',
      icon: Fingerprint,
      badge: 'Tier 1 Mandatory',
    },
    {
      id: 'v2',
      title: 'Address Verified',
      subtitle: 'Geo-tagged home residence verification & physical verification by on-ground field officers.',
      icon: MapPin,
      badge: 'Physical Check',
    },
    {
      id: 'v3',
      title: 'Phone & 2FA Verified',
      subtitle: 'Secure linked mobile number with periodic biometric and facial liveness re-verification.',
      icon: Phone,
      badge: 'Real-Time Sync',
    },
    {
      id: 'v4',
      title: 'Skill & Tooling Certified',
      subtitle: 'Practical bench exams, trade diplomas, and calibration check on electrical/plumbing instruments.',
      icon: Award,
      badge: 'Certified Master',
    },
    {
      id: 'v5',
      title: 'Experience Verified',
      subtitle: 'Minimum 3+ years demonstrable track record in premium residential or commercial maintenance.',
      icon: Briefcase,
      badge: '3+ Years Vetted',
    },
    {
      id: 'v6',
      title: 'Police Clearance Certificate',
      subtitle: 'Formal police verification clearance certificate (PCC) vetted against criminal court databases.',
      icon: ShieldCheck,
      badge: 'Zero Crime Record',
    },
    {
      id: 'v7',
      title: 'Comprehensive Background Check',
      subtitle: 'Screened by global compliance partners (First Advantage / AuthBridge) for total household peace.',
      icon: UserCheck,
      badge: 'Enterprise Standard',
    },
    {
      id: 'v8',
      title: 'Trust Score System (99.4%)',
      subtitle: 'Continuous algorithmic behavioral rating analyzing punctuality, courtesy, and post-service warranty.',
      icon: Lock,
      badge: 'Live Metric',
    },
  ];

  return (
    <section id="trust" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Section 08 • The Gold Standard of Security</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          Trust & Safety Architecture
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          We treat entering your private home with the utmost sanctity. Every HomeEase specialist undergoes our rigorous 8-Pillar Verification Protocol.
        </p>
      </div>

      {/* 8-PILLAR BADGES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {verificationPillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              className="p-5 rounded-2xl glass-card border border-slate-300/80 dark:border-white/5 flex flex-col justify-between space-y-4 hover:border-emerald-500/40"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {pillar.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{pillar.title}</h4>
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 leading-relaxed font-medium">{pillar.subtitle}</p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-gray-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>100% Verified Safe</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* TRUST SCORE SYSTEM & $1M INSURANCE BANNER */}
      <div className="rounded-3xl glass-panel-gold p-8 border border-amber-500/30 dark:border-[#D4AF37]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold gold-gradient-text font-space">
              99.4%
            </span>
            <span className="text-xs uppercase font-bold text-slate-700 dark:text-gray-300 tracking-wider">
              Platform Trust Index
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Backed by ₹50,00,000 / $1,000,000 Comprehensive Property Protection
          </h3>
          <p className="text-xs text-slate-700 dark:text-gray-300 max-w-2xl leading-relaxed font-medium">
            In the rare event of accidental damage or component failure during a service call, HomeEase automatically covers full restoration costs without lengthy insurer paperwork.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-center shadow-sm">
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono">0.02%</div>
            <div className="text-[10px] text-slate-600 dark:text-gray-400 uppercase font-semibold">Dispute Rate</div>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-center shadow-sm">
            <div className="text-base font-bold text-amber-800 dark:text-[#D4AF37] font-mono">100%</div>
            <div className="text-[10px] text-slate-600 dark:text-gray-400 uppercase font-semibold">PCC Screened</div>
          </div>
        </div>
      </div>
    </section>
  );
}
