'use client';

import React from 'react';
import {
  Star,
  CheckCircle2,
  Play,
  Quote,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { MOCK_TESTIMONIALS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function ReviewsSection() {
  const { setIsVideoModalOpen } = useApp();

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 10 • Client Accolades</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          Loved by Over 50,000 Luxury Estates
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          Read authentic, verified experiences from homeowners who demand perfection in every repair and architectural installation.
        </p>
      </div>

      {/* TESTIMONIALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-7 rounded-3xl glass-card border border-slate-300/80 dark:border-white/10 flex flex-col justify-between space-y-5 relative group"
          >
            <div>
              {/* Top Row: Avatar, Name, Location, Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.customerName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-500/40 dark:ring-[#D4AF37]/40 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {testimonial.customerName}
                      </h4>
                      {testimonial.verifiedBooking && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00C853]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-medium">{testimonial.customerLocation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-amber-500 dark:text-[#D4AF37] fill-amber-500 dark:fill-[#D4AF37]"
                    />
                  ))}
                </div>
              </div>

              {/* Service Tag */}
              <div className="inline-block px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-white/5 border border-sky-200 dark:border-white/5 text-[11px] font-semibold text-sky-800 dark:text-[#00D9FF] mb-3">
                {testimonial.serviceUsed}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-300 leading-relaxed italic font-medium">
                "{testimonial.quote}"
              </p>
            </div>

            {/* Bottom Row: Date & Video Testimonial Preview button */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-gray-500 font-medium">{testimonial.date}</span>

              {testimonial.hasVideo ? (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-[#D4AF37] hover:text-black dark:hover:text-white transition-colors px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30"
                >
                  <Play className="w-3 h-3 fill-amber-600 dark:fill-[#D4AF37]" />
                  <span>Watch Video Case Study ({testimonial.videoDuration})</span>
                </button>
              ) : (
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Work Order</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
