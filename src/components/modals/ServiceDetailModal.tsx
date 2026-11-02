'use client';

import React from 'react';
import {
  X,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ServiceDetailModal() {
  const {
    selectedCategoryDetail,
    closeServiceDetail,
    openBookingModal,
  } = useApp();

  if (!selectedCategoryDetail) return null;

  const cat = selectedCategoryDetail;

  const handleBookCategory = () => {
    closeServiceDetail();
    openBookingModal(cat);
  };

  const handleBookSubService = (subServiceId: string) => {
    closeServiceDetail();
    openBookingModal(cat, subServiceId);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel bg-white/95 dark:bg-[#0c1322]/95 border border-slate-300/80 dark:border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 my-auto text-slate-900 dark:text-white">
        {/* CLOSE BUTTON */}
        <button
          onClick={closeServiceDetail}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-gray-400 tracking-wider">
              Service Dossier • {cat.providersCount}+ Certified Pros
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-space">
            {cat.name}
          </h3>

          <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
            {cat.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-gray-400 pt-1 font-medium">
            <span className="flex items-center gap-1 text-[#b48c1e] dark:text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#b48c1e] dark:fill-[#D4AF37]" />
              <span className="font-bold">{cat.rating}</span>
              <span>({cat.reviewsCount.toLocaleString('en-IN')} reviews)</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-800 dark:text-white">
              <Clock className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#00D9FF]" />
              <span>Avg arrival: {cat.avgTime}</span>
            </span>
            <span>•</span>
            <span className="text-emerald-700 dark:text-[#00C853] font-semibold">
              30-Day Workmanship Warranty
            </span>
          </div>
        </div>

        {/* SUB SERVICES LIST */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-bold text-slate-600 dark:text-gray-400 tracking-wider">
              Standard Packages & Diagnostics Included
            </h4>
            <span className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Click any package to select</span>
          </div>

          <div className="space-y-2">
            {cat.subServices.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleBookSubService(sub.id)}
                className="w-full text-left p-4 rounded-2xl bg-slate-50/90 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300/80 dark:border-white/10 flex items-center justify-between text-xs transition-all cursor-pointer group shadow-sm hover:border-[#b48c1e] dark:hover:border-[#D4AF37]"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-[#b48c1e] dark:group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                    <span>{sub.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#b48c1e] dark:text-[#D4AF37]" />
                  </div>
                  <p className="text-slate-600 dark:text-gray-400 text-[11px] mt-0.5 font-medium">{sub.description}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm font-space">
                    ₹{sub.price}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400 block">{sub.estimatedMinutes} mins</span>
                  <span className="text-[10px] font-bold text-[#b48c1e] dark:text-[#D4AF37] group-hover:underline mt-0.5 block">Book Now →</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* COMMON ISSUES RESOLVED */}
        <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-black/40 border border-slate-200 dark:border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#b48c1e] dark:text-[#D4AF37] tracking-wider block">
            Common Household Symptoms Resolved:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {cat.commonIssues.map((issue, i) => (
              <button
                key={i}
                type="button"
                onClick={handleBookCategory}
                className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 text-[11px] font-medium hover:border-[#b48c1e] dark:hover:border-[#D4AF37] transition-colors cursor-pointer"
              >
                • {issue}
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
          <div>
            <span className="text-[10px] uppercase text-slate-500 dark:text-gray-500 block font-medium">Starting from</span>
            <span className="text-2xl font-bold text-[#b48c1e] dark:text-[#D4AF37] font-space">
              ₹{cat.startingPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBookCategory}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Book {cat.name} Specialist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
