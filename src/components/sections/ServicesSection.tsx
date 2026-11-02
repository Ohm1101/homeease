'use client';

import React, { useState } from 'react';
import {
  Wrench,
  Zap,
  Tv,
  Wind,
  Hammer,
  Paintbrush,
  Sparkles,
  Trees,
  ShieldAlert,
  Camera,
  Truck,
  Layers,
  Cpu,
  AlertOctagon,
  ArrowUpRight,
  Star,
  Clock,
  Search,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/data/mockData';
import { ServiceCategory } from '@/types';
import { useApp } from '@/context/AppContext';

// Icon mapping helper
function renderCategoryIcon(iconName: string, color: string) {
  const iconProps = { className: 'w-6 h-6', style: { color } };
  switch (iconName) {
    case 'Wrench':
      return <Wrench {...iconProps} />;
    case 'Zap':
      return <Zap {...iconProps} />;
    case 'Tv':
      return <Tv {...iconProps} />;
    case 'Wind':
      return <Wind {...iconProps} />;
    case 'Hammer':
      return <Hammer {...iconProps} />;
    case 'Paintbrush':
      return <Paintbrush {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Trees':
      return <Trees {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    case 'Camera':
      return <Camera {...iconProps} />;
    case 'Truck':
      return <Truck {...iconProps} />;
    case 'Layers':
      return <Layers {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'AlertOctagon':
      return <AlertOctagon {...iconProps} />;
    default:
      return <Wrench {...iconProps} />;
  }
}

export default function ServicesSection() {
  const { openBookingModal, openServiceDetail } = useApp();
  const [filterQuery, setFilterQuery] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'rapid' | 'tech' | 'luxury'>('all');

  const filteredCategories = SERVICE_CATEGORIES.filter((cat) => {
    const matchesQuery =
      cat.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(filterQuery.toLowerCase());

    if (!matchesQuery) return false;

    if (activeFilterTab === 'rapid') {
      return ['plumbing', 'electrical', 'emergency-assistance', 'ac-services'].includes(cat.id);
    }
    if (activeFilterTab === 'tech') {
      return ['smart-home', 'security-services', 'appliance-repair'].includes(cat.id);
    }
    if (activeFilterTab === 'luxury') {
      return ['renovation', 'painting', 'cleaning'].includes(cat.id);
    }

    return true;
  });

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-[#00D9FF] text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 04 • Certified Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
            All 14 Verified Service Sectors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl">
            From emergency 24/7 power restoration to luxury turnkey interior architecture, every service is delivered by vetted, background-cleared professionals.
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search category or issue..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs">
            <button
              onClick={() => setActiveFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeFilterTab === 'all'
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (14)
            </button>
            <button
              onClick={() => setActiveFilterTab('rapid')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeFilterTab === 'rapid'
                  ? 'bg-[#00D9FF] text-black font-semibold'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Rapid 24/7
            </button>
            <button
              onClick={() => setActiveFilterTab('tech')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeFilterTab === 'tech'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Smart Tech
            </button>
            <button
              onClick={() => setActiveFilterTab('luxury')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeFilterTab === 'luxury'
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Luxury Living
            </button>
          </div>
        </div>
      </div>

      {/* 14 SERVICES GRID WITH 3D TILT EFFECT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="group relative p-6 rounded-2xl glass-card flex flex-col justify-between cursor-pointer border border-slate-300/80 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-[#D4AF37]/50"
            onClick={() => openServiceDetail(category)}
          >
            {/* Top row: Icon & Badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${category.color}15`,
                    border: `1px solid ${category.color}40`,
                  }}
                >
                  {renderCategoryIcon(category.icon, category.color)}
                </div>

                {category.badge && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${category.color}20`,
                      color: category.color,
                      border: `1px solid ${category.color}40`,
                    }}
                  >
                    {category.badge}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                <span>{category.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>

              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {category.tagline}
              </p>

              {/* Subservice preview pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {category.subServices.slice(0, 2).map((sub) => (
                  <span
                    key={sub.id}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100/90 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/5"
                  >
                    {sub.title.split(' ')[0]} {sub.title.split(' ')[1]}
                  </span>
                ))}
                {category.subServices.length > 2 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-500">
                    +{category.subServices.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom row: Pricing, Rating, Book Button */}
            <div className="pt-5 mt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-500 dark:text-gray-500 block">Starting from</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">₹{category.startingPrice}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-700 dark:text-gray-300 font-semibold">
                  <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>{category.rating}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openBookingModal(category);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white/10 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-black dark:hover:text-black text-xs font-semibold text-white transition-all border border-slate-300 dark:border-white/10 shadow-sm"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
