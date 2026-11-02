'use client';

import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PRICING_PLANS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const { openBookingModal } = useApp();

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-[#D4AF37] text-xs font-semibold">
          <Crown className="w-3.5 h-3.5" />
          <span>Section 12 • HomeEase Club Memberships</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          Elevate Your Living with Exclusive Care
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          Choose a membership that fits your lifestyle. Enjoy priority dispatch, permanent service discounts, and complimentary seasonal home inspections.
        </p>

        {/* BILLING TOGGLE */}
        <div className="pt-2 flex items-center justify-center">
          <div className="p-1 rounded-2xl glass-panel border border-slate-300/80 dark:border-white/10 flex items-center gap-1 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Membership</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20 font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isAnnual = billingCycle === 'annual';
          const displayPrice = isAnnual
            ? plan.priceAnnual === 0
              ? 'Free'
              : `₹${Math.round(plan.priceAnnual / 12).toLocaleString('en-IN')}`
            : plan.priceMonthly === 0
            ? 'Free'
            : `₹${plan.priceMonthly.toLocaleString('en-IN')}`;

          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                isPopular
                  ? 'glass-panel-gold border-amber-500 dark:border-[#D4AF37] shadow-2xl shadow-amber-500/15 dark:shadow-[#D4AF37]/15 scale-105 z-10'
                  : 'glass-panel border-slate-300/80 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-white/20'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-extrabold tracking-wider uppercase shadow-lg shadow-[#D4AF37]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-black" />
                  <span>Most Preferred by Estates</span>
                </div>
              )}

              <div>
                <div className="space-y-1 mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-space">{plan.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-medium">{plan.tagline}</p>
                </div>

                <div className="pb-6 border-b border-slate-200 dark:border-white/10 mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-space">
                      {displayPrice}
                    </span>
                    {plan.priceMonthly > 0 && (
                      <span className="text-xs text-slate-600 dark:text-gray-400 font-medium">/ month</span>
                    )}
                  </div>
                  {isAnnual && plan.priceAnnual > 0 && (
                    <span className="text-[11px] text-amber-800 dark:text-[#D4AF37] font-semibold block mt-1">
                      Billed annually at ₹{plan.priceAnnual.toLocaleString('en-IN')} / year
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="text-[10px] uppercase font-bold text-slate-600 dark:text-gray-400 tracking-wider">
                    Included Privileges:
                  </div>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-gray-300 font-medium">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${plan.highlightColor}20`,
                          color: plan.highlightColor,
                        }}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => openBookingModal()}
                className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-tight transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isPopular
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black shadow-[#D4AF37]/25 hover:opacity-90'
                    : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-white border border-slate-300 dark:border-white/15'
                }`}
              >
                <span>{plan.priceMonthly === 0 ? 'Start Free Account' : 'Upgrade to ' + plan.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
