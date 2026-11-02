'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Users,
  MapPin,
  Star,
  Clock,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export default function StatisticsSection() {
  const [counts, setCounts] = useState({
    services: 52400,
    providers: 15800,
    cities: 320,
    rating: 4.96,
  });

  // Subtle real-time pulse increment
  useEffect(() => {
    const timer = setInterval(() => {
      setCounts((prev) => ({
        ...prev,
        services: prev.services + 1,
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: 'stat-1',
      label: 'Services Completed',
      value: `${counts.services.toLocaleString('en-IN')}+`,
      sub: 'Zero unresolved disputes',
      icon: CheckCircle2,
      color: '#00D9FF',
    },
    {
      id: 'stat-2',
      label: 'Verified Pro Providers',
      value: `${counts.providers.toLocaleString('en-IN')}+`,
      sub: 'Top 4% acceptance rate',
      icon: Users,
      color: '#D4AF37',
    },
    {
      id: 'stat-3',
      label: 'Metropolitan Cities',
      value: `${counts.cities}+`,
      sub: 'Sub-30 min arrival coverage',
      icon: MapPin,
      color: '#10B981',
    },
    {
      id: 'stat-4',
      label: 'Average Client Rating',
      value: `${counts.rating}★`,
      sub: 'Over 140,000 verified reviews',
      icon: Star,
      color: '#F59E0B',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-300/80 dark:border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient background beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 07 • Enterprise Reliability Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-space">
            Proven Performance at Global Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-white/5 hover:border-amber-500/30 dark:hover:border-white/20 transition-all text-center space-y-2 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</h4>
                <p className="text-xs text-slate-600 dark:text-gray-400 font-medium">{item.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
