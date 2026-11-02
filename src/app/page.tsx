'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// CONTINUOUS 3D BACKGROUND MODEL WITH SMOOTH SCROLL CHOREOGRAPHY
const BackgroundScroll3D = dynamic(() => import('@/components/3d/BackgroundScroll3D'), {
  ssr: false,
});

import HeroSection from '@/components/sections/HeroSection';
import ProblemShowcaseSection from '@/components/sections/ProblemShowcaseSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CustomerExperienceSection from '@/components/sections/CustomerExperienceSection';
import ProviderExperienceSection from '@/components/sections/ProviderExperienceSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import TrustSafetySection from '@/components/sections/TrustSafetySection';
import LiveTrackingSection from '@/components/sections/LiveTrackingSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import MobileAppShowcaseSection from '@/components/sections/MobileAppShowcaseSection';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';

import CustomerDashboardView from '@/components/dashboards/CustomerDashboardView';
import ProviderDashboardView from '@/components/dashboards/ProviderDashboardView';
import AdminDashboardView from '@/components/dashboards/AdminDashboardView';

import BookingModal from '@/components/modals/BookingModal';
import DynamicPricingModal from '@/components/modals/DynamicPricingModal';
import AuthModal from '@/components/modals/AuthModal';
import AIAssistantModal from '@/components/modals/AIAssistantModal';
import ServiceDetailModal from '@/components/modals/ServiceDetailModal';
import VideoTestimonialModal from '@/components/modals/VideoTestimonialModal';
import CityUnavailableModal from '@/components/modals/CityUnavailableModal';

import { useApp } from '@/context/AppContext';
import { Sparkles, Bot, Shield, User, Briefcase } from 'lucide-react';

export default function Home() {
  const { activePersona, setActivePersona, setIsAIAssistantOpen, openBookingModal } = useApp();

  return (
    <main className="min-h-screen bg-[#dbe7f2] text-[#0f172a] dark:bg-[#030712] dark:text-white flex flex-col selection:bg-[#D4AF37] selection:text-white dark:selection:text-[#030712] relative overflow-x-hidden transition-colors duration-200">
      {/* FLOATING NAVIGATION BAR */}
      <Navbar />

      {/* CONTINUOUS 3D BACKGROUND MODEL WITH SMOOTH SCROLL CHOREOGRAPHY */}
      <BackgroundScroll3D />

      {/* SECTION 1: HERO VALUE & LIVE PRO DISPATCH SHOWCASE */}
      <HeroSection />

      {/* SECTION 2: HOME PROBLEM SHOWCASE */}
      <ProblemShowcaseSection />

      {/* SECTION 3: HOW HOMEEASE WORKS */}
      <HowItWorksSection />

      {/* SECTION 4: ALL 14 SERVICES */}
      <ServicesSection />

      {/* SECTION 5: CUSTOMER EXPERIENCE */}
      <CustomerExperienceSection />

      {/* SECTION 6: PROVIDER EXPERIENCE */}
      <ProviderExperienceSection />

      {/* SECTION 7: STATISTICS */}
      <StatisticsSection />

      {/* SECTION 8: TRUST & SAFETY */}
      <TrustSafetySection />

      {/* SECTION 9: LIVE TRACKING (UBER MAP) */}
      <LiveTrackingSection />

      {/* SECTION 10: REVIEWS & TESTIMONIALS */}
      <ReviewsSection />

      {/* SECTION 11: MOBILE APP SHOWCASE */}
      <MobileAppShowcaseSection />

      {/* SECTION 12: PRICING & SUBSCRIPTION */}
      <PricingSection />

      {/* SECTION 13: CALL TO ACTION */}
      <CTASection />

      {/* PORTALS & DASHBOARD SUITES */}
      <div className="space-y-16 py-12 border-t border-slate-300 dark:border-white/10 bg-gradient-to-b from-transparent via-slate-100/50 dark:via-[#07111F]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-800 dark:text-gray-300 font-semibold shadow-sm">
            <span>Enterprise Portals Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-space">
            Live Functional Stakeholder Dashboards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 max-w-lg mx-auto font-medium">
            Experience the platform from each stakeholder's perspective: Customer, Service Provider, or Master Operations Admin.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActivePersona('customer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePersona === 'customer'
                  ? 'bg-[#0284c7] text-white dark:bg-[#00D9FF] dark:text-black shadow-lg shadow-sky-500/20'
                  : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-white/10 shadow-sm'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </button>

            <button
              onClick={() => setActivePersona('provider')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePersona === 'provider'
                  ? 'bg-[#b48c1e] text-white dark:bg-[#D4AF37] dark:text-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-white/10 shadow-sm'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Provider Partner Portal</span>
            </button>

            <button
              onClick={() => setActivePersona('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePersona === 'admin'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-white/10 shadow-sm'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Operations Admin Console</span>
            </button>
          </div>
        </div>

        {activePersona === 'customer' && <CustomerDashboardView />}
        {activePersona === 'provider' && <ProviderDashboardView />}
        {activePersona === 'admin' && <AdminDashboardView />}
      </div>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING ACTION DOCK (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating AI Diagnostic Bot Trigger */}
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#00D9FF] via-[#38bdf8] to-[#D4AF37] text-black font-extrabold text-xs shadow-2xl shadow-[#00D9FF]/40 transition-all transform hover:scale-105 active:scale-95"
        >
          <Bot className="w-4 h-4" />
          <span>HomeEase AI Assistant</span>
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
        </button>
      </div>

      {/* ALL INTERACTIVE MODALS */}
      <BookingModal />
      <DynamicPricingModal />
      <AuthModal />
      <AIAssistantModal />
      <ServiceDetailModal />
      <VideoTestimonialModal />
      <CityUnavailableModal />
    </main>
  );
}
