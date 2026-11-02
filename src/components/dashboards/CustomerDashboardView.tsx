'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  User,
  MapPin,
  Calendar,
  Clock,
  Wallet,
  Gift,
  FileText,
  LifeBuoy,
  Bell,
  Settings,
  Star,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  LogIn,
  LogOut,
  Lock,
  Wrench,
  Search,
  Zap,
  Check,
  ChevronRight,
  Truck,
  Award,
  Sparkles,
  Crown,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MOCK_PROVIDERS, SERVICE_CATEGORIES } from '@/data/mockData';

export default function CustomerDashboardView() {
  const {
    isCustomerLoggedIn,
    loginAsCustomer,
    logoutCustomer,
    customerProfile,
    activeBooking,
    addFundsToWallet,
    openBookingModal,
    selectedCity,
    setIsPremiumModalOpen,
    calculateTopUpBonus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'services' | 'bookings' | 'wallet' | 'referrals' | 'invoices' | 'support' | 'settings'>('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('plumbing');
  const [serviceSearchQuery, setServiceSearchQuery] = useState<string>('');
  const [walletAddAmount, setWalletAddAmount] = useState(1000);
  const [showWalletSuccess, setShowWalletSuccess] = useState(false);

  // If customer is not logged in, show secure login prompt gate
  if (!isCustomerLoggedIn) {
    return (
      <section id="customer-dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-[#00D9FF]/30 text-center space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all shadow-sm"
            >
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Home</span>
            </Link>
            <span className="text-xs text-gray-400 font-mono">CUSTOMER PORTAL GATE</span>
          </div>

          <div className="w-16 h-16 rounded-3xl bg-[#00D9FF]/10 border-2 border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white font-space">
              Customer Authentication Required
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Please sign in to access your active service dispatches, penthouse addresses, and HomeEase Wallet.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/customer/login"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#38bdf8] text-black font-extrabold text-xs shadow-lg shadow-[#00D9FF]/20 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Open Customer Login Page</span>
            </Link>

            <button
              onClick={() => loginAsCustomer()}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#D4AF37]" />
              <span>1-Click Fast Login as {customerProfile.name}</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const currentUser = customerProfile;

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    addFundsToWallet(walletAddAmount);
    setShowWalletSuccess(true);
    setTimeout(() => setShowWalletSuccess(false), 3000);
  };

  return (
    <section id="customer-dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/15 shadow-2xl space-y-8">
        {/* TOP PROFILE HEADER WITH HOME & LOGOUT BUTTON */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#D4AF37]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-space">{currentUser.name}</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                  {currentUser.loyaltyTier} Member
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
              <div className="flex items-center gap-2 text-[11px] text-[#00D9FF] mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentUser.address?.street}, {currentUser.address?.area}, {currentUser.address?.city}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* HOME BUTTON */}
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all shadow-sm"
              title="Return to Home"
            >
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Home</span>
            </Link>

            <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                HomeEase Wallet
              </span>
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-lg font-extrabold gold-gradient-text font-space">
                  ₹{currentUser.walletBalance.toLocaleString('en-IN')}
                </span>
                {(currentUser.bonusBalance || 0) > 0 && (
                  <span className="text-xs font-bold text-emerald-400">
                    (+₹{currentUser.bonusBalance})
                  </span>
                )}
              </div>
            </div>

            {!currentUser.isPremium && (
              <button
                onClick={() => setIsPremiumModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#b48c1e]/20 to-[#D4AF37]/30 border border-[#D4AF37] text-amber-800 dark:text-[#D4AF37] hover:text-black dark:hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Become VIP</span>
              </button>
            )}

            <button
              onClick={() => openBookingModal()}
              className="px-4 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20"
            >
              Book New Service
            </button>

            <button
              onClick={logoutCustomer}
              className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 transition-all text-xs flex items-center gap-1"
              title="Log out of Customer Portal"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* DASHBOARD TAB NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs">
          {[
            { id: 'services', label: 'All Services & Available Providers', icon: Wrench },
            { id: 'bookings', label: 'My Bookings & History', icon: Calendar },
            { id: 'wallet', label: 'Digital Wallet & Cashback', icon: Wallet },
            { id: 'referrals', label: 'Referral Rewards (₹500)', icon: Gift },
            { id: 'invoices', label: 'GST Invoices', icon: FileText },
            { id: 'support', label: 'VIP Concierge Support', icon: LifeBuoy },
            { id: 'settings', label: 'Addresses & Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all font-medium ${
                  isActive
                    ? 'bg-[#00D9FF] text-black font-bold shadow-md shadow-[#00D9FF]/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 0: ALL SERVICES & LIVE AVAILABLE PROVIDERS */}
        {activeTab === 'services' && (() => {
          const filteredCategories = SERVICE_CATEGORIES.filter(
            (c) =>
              c.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
              c.description.toLowerCase().includes(serviceSearchQuery.toLowerCase())
          );
          const activeCategory =
            SERVICE_CATEGORIES.find((c) => c.id === selectedServiceId) || SERVICE_CATEGORIES[0];

          const availableProviders = MOCK_PROVIDERS.filter((p) =>
            p.category.toLowerCase().includes(activeCategory.name.toLowerCase().split(' ')[0]) ||
            p.services.some((s) => s.toLowerCase().includes(activeCategory.name.toLowerCase()))
          );
          const displayProviders = availableProviders.length > 0 ? availableProviders : MOCK_PROVIDERS.slice(0, 3);

          return (
            <div className="space-y-8">
              {/* SECTION HEADER & SEARCH */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                      Verified Service Catalog • {selectedCity} Hub
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-space">
                    All Services & Available Specialists
                  </h3>
                  <p className="text-xs text-gray-300">
                    Select any service below to inspect verified professionals available for immediate dispatch at this time.
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search 14 services..."
                    value={serviceSearchQuery}
                    onChange={(e) => setServiceSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              {/* 14 SERVICES GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
                {filteredCategories.map((cat) => {
                  const isSelected = cat.id === selectedServiceId;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedServiceId(cat.id)}
                      className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-br from-sky-500/20 to-amber-500/20 border-[#00D9FF] shadow-lg shadow-sky-500/20 scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
                          style={{
                            backgroundColor: `${cat.color}25`,
                            color: cat.color,
                          }}
                        >
                          <Wrench className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white truncate">{cat.name}</div>
                        <div className="text-[10px] text-[#D4AF37] font-semibold mt-0.5">
                          From ₹{cat.startingPrice}
                        </div>
                        <div className="text-[9px] text-gray-400 mt-0.5">{cat.avgTime}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* AVAILABLE PROVIDERS FOR SELECTED SERVICE */}
              <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#00D9FF]/40 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>{displayProviders.length} Specialists Online Now</span>
                      </span>
                      <span className="text-xs text-gray-400">• Ready for Immediate Callout</span>
                    </div>
                    <h4 className="text-lg font-bold text-white font-space">
                      Specialists Available at this Time for {activeCategory.name}
                    </h4>
                  </div>

                  <button
                    onClick={() => openBookingModal(activeCategory)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold text-xs shadow-md shadow-[#D4AF37]/20 flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Auto-Dispatch Nearest ({activeCategory.name})</span>
                  </button>
                </div>

                {/* PROVIDER CARDS LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D9FF]/50 transition-all space-y-4 shadow-lg group"
                    >
                      {/* Top: Avatar, Status & Verified Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={provider.avatar}
                              alt={provider.name}
                              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#00D9FF]"
                            />
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-black" title="Online Now" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-xs font-bold text-white group-hover:text-[#00D9FF] transition-colors truncate max-w-[140px]">
                                {provider.name}
                              </h5>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            </div>
                            <span className="text-[10px] text-gray-400 block">{provider.category} Specialist</span>
                            <div className="flex items-center gap-1 text-[10px] text-[#D4AF37] mt-0.5">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="font-bold">{provider.rating}</span>
                              <span className="text-gray-400">({provider.jobsCompleted}+ jobs)</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Available
                        </span>
                      </div>

                      {/* Distance & Real-Time ETA */}
                      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-white/10 bg-black/20 rounded-xl px-3">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Fastest Arrival:</span>
                          <span className="text-xs font-bold text-[#00D9FF] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{provider.etaMinutes} mins ETA</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block">Distance:</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{provider.distanceKm} km away</span>
                          </span>
                        </div>
                      </div>

                      {/* Vehicle & Services */}
                      <div className="space-y-1.5 text-[11px] text-gray-300">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                          <Truck className="w-3 h-3 text-[#00D9FF]" />
                          <span className="truncate">{provider.vehicle}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {provider.services.slice(0, 2).map((s, idx) => (
                            <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Selection Action */}
                      <div className="pt-2 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Standard Rate</span>
                          <span className="text-sm font-extrabold text-[#D4AF37] font-space">
                            ₹{provider.hourlyRate}
                            <span className="text-[10px] text-gray-400 font-normal"> / job</span>
                          </span>
                        </div>

                        <button
                          onClick={() => openBookingModal(activeCategory)}
                          className="px-3.5 py-2 rounded-xl bg-[#00D9FF] hover:bg-[#38bdf8] text-black font-bold text-xs shadow-md shadow-[#00D9FF]/20 flex items-center gap-1 transition-all group-hover:scale-105"
                        >
                          <span>Select & Book</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* TAB 1: BOOKINGS & HISTORY */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Active Live Booking Card */}
            {activeBooking && (
              <div className="p-6 rounded-2xl glass-panel-cyan border border-[#00D9FF]/40 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Active Live Service Order • #{activeBooking.id}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] font-bold border border-[#00D9FF]/30">
                    Status: {activeBooking.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block">Service Requested:</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">{activeBooking.serviceName}</span>
                    <span className="text-[11px] text-gray-400">{activeBooking.categoryName} Sector</span>
                  </div>

                  <div>
                    <span className="text-gray-400 block">Assigned Master Pro:</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">{activeBooking.provider?.name}</span>
                    <span className="text-[11px] text-[#00D9FF]">ETA: {activeBooking.tracking.etaMinutes} mins ({activeBooking.tracking.distanceRemainingKm} km)</span>
                  </div>

                  <div>
                    <span className="text-gray-400 block">Guaranteed Total:</span>
                    <span className="text-sm font-bold text-[#D4AF37] mt-0.5 block">₹{activeBooking.pricing.total}</span>
                    <span className="text-[11px] text-emerald-400">Paid via {activeBooking.paymentMethod}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{activeBooking.address}</span>
                  <a
                    href="#live-tracking"
                    className="px-4 py-1.5 rounded-xl bg-[#00D9FF] text-black font-bold text-xs flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>View on Live Radar</span>
                  </a>
                </div>
              </div>
            )}

            {/* Past Completed Bookings */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                Service History & Archives
              </h4>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'HE-BK-78102',
                    service: 'Whole-Home Earthing & Surge Protector Setup',
                    cat: 'Electrical',
                    pro: 'Arjun Mehra (Master Electrician)',
                    date: '14 Oct 2026',
                    cost: '₹1,599',
                    rating: '5.0★',
                  },
                  {
                    id: 'HE-BK-65190',
                    service: 'High-Pressure Jet Pump Foam Cleaning (2 Split ACs)',
                    cat: 'AC Services',
                    pro: 'Dr. Rajesh Nair (HVAC)',
                    date: '28 Sep 2026',
                    cost: '₹1,198',
                    rating: '5.0★',
                  },
                  {
                    id: 'HE-BK-54211',
                    service: 'Balcony Garden Complete Revamp & Pruning',
                    cat: 'Gardening',
                    pro: 'Sneha Patel',
                    date: '12 Sep 2026',
                    cost: '₹699',
                    rating: '5.0★',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.service}</span>
                        <span className="text-[10px] text-gray-500 font-mono">#{item.id}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {item.pro} • Completed on {item.date}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-white">{item.cost}</div>
                        <div className="text-[10px] text-[#D4AF37]">{item.rating} Reviewed</div>
                      </div>
                      <button
                        onClick={() => openBookingModal()}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10"
                      >
                        Rebook
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WALLET */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            {/* SPLIT BALANCES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* REAL DEPOSIT BALANCE */}
              <div className="p-6 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    Real Deposit Balance
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                    100% Usable
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-space">
                  ₹{currentUser.walletBalance.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-gray-300">
                  Fully usable across all 14 service categories and hardware invoices. Instant 1-click booking without bank OTP delays.
                </p>
              </div>

              {/* PROMOTIONAL BONUS BALANCE */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-purple-950/40 to-indigo-950/40 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
                    Promotional Bonus Balance
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                    Max 10% Per Order
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-space">
                  ₹{(currentUser.bonusBalance || 0).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-gray-300">
                  Earned from deposit bonuses, VIP onboarding, and referrals. Up to 10% automatically deducted from your order subtotal at checkout!
                </p>
              </div>
            </div>

            {/* UPGRADE TO PREMIUM BANNER IF NOT PREMIUM */}
            {!currentUser.isPremium && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#D4AF37]/20 to-amber-500/15 border border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#D4AF37] text-black">
                    <Crown className="w-6 h-6 fill-black" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Upgrade to HomeEase Premium Club</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">FREE VIP GIFT</span>
                    </h4>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Get ₹500 instant bonus credits, VIP priority queue (18m arrival), and exclusive discounts.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPremiumModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold text-xs shadow-lg shadow-[#D4AF37]/30 whitespace-nowrap"
                >
                  Claim ₹500 & Upgrade
                </button>
              </div>
            )}

            {/* TOP UP CALCULATOR & LEDGER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-gray-300 tracking-wider">
                    Add Money with Tiered Bonus
                  </span>
                  <span className="text-[10px] text-[#00D9FF] font-semibold">Instant Credit</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 block">Select or Enter Amount (INR):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { amount: 500, label: '₹500', bonus: '+5%' },
                      { amount: 1000, label: '₹1,000', bonus: '+7%' },
                      { amount: 2000, label: '₹2,000', bonus: '+7%' },
                      { amount: 5000, label: '₹5,000', bonus: '+20%' },
                    ].map((chip) => (
                      <button
                        key={chip.amount}
                        type="button"
                        onClick={() => setWalletAddAmount(chip.amount)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          walletAddAmount === chip.amount
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-bold">{chip.label}</div>
                        <div className="text-[10px] text-emerald-400 font-extrabold">{chip.bonus}</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <input
                      type="number"
                      min="100"
                      step="100"
                      value={walletAddAmount}
                      onChange={(e) => setWalletAddAmount(Number(e.target.value))}
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <button
                      onClick={handleAddFunds}
                      className="px-5 py-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-extrabold rounded-xl text-xs transition-all shadow-md shadow-[#D4AF37]/20"
                    >
                      Add ₹{walletAddAmount}
                    </button>
                  </div>
                </div>

                {/* LIVE BONUS PREVIEW CALCULATOR */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Deposit into Real Wallet:</span>
                    <span className="text-white font-mono font-bold">₹{walletAddAmount}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Bonus Credits ({calculateTopUpBonus(walletAddAmount) > 0 ? (walletAddAmount >= 5000 ? '+20%' : walletAddAmount >= 1000 ? '+7%' : '+5%') : '0%'}):</span>
                    <span className="font-mono font-bold">+₹{calculateTopUpBonus(walletAddAmount)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-white font-bold">
                    <span>Total Account Value:</span>
                    <span className="text-[#D4AF37] font-mono font-bold text-sm">
                      ₹{walletAddAmount + calculateTopUpBonus(walletAddAmount)}
                    </span>
                  </div>
                </div>

                {showWalletSuccess && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      Successfully added ₹{walletAddAmount} to Real Wallet + ₹{calculateTopUpBonus(walletAddAmount)} extra bonus!
                    </span>
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 space-y-3">
                <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                  Wallet Bonus Rules & Ledger
                </h4>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-gray-300">
                  <div className="font-bold text-white mb-1">Tiered Top-Up Bonus Scale:</div>
                  <ul className="space-y-1 text-[11px] list-disc list-inside text-gray-400">
                    <li><strong className="text-white">₹500 to ₹999:</strong> +5% extra promotional bonus</li>
                    <li><strong className="text-white">₹1,000 to ₹4,999:</strong> +7% extra promotional bonus</li>
                    <li><strong className="text-white">₹5,000 and above:</strong> +20% extra promotional bonus</li>
                    <li><strong className="text-white">Checkout Rule:</strong> Up to 10% of bonus balance can be used per booking.</li>
                  </ul>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/3 border border-white/5 flex justify-between">
                    <div>
                      <div className="font-semibold text-white">Top-Up Bonus Added</div>
                      <div className="text-[10px] text-gray-400">Automated Promotional Credit</div>
                    </div>
                    <span className="text-emerald-400 font-bold">+10% Cap Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REFERRALS */}
        {activeTab === 'referrals' && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 space-y-4">
            <h4 className="text-base font-bold text-white font-space">
              Refer Friends & Neighboring Estates — Earn ₹500
            </h4>
            <p className="text-xs text-gray-300 max-w-xl">
              Give your friends ₹500 off their first home service. When they complete their booking, you instantly receive ₹500 credits directly in your HomeEase Wallet.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono font-bold text-[#D4AF37]">
                {currentUser.referralCode}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(`https://homeease.app/join?ref=${currentUser.referralCode}`)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10"
              >
                Copy Referral Link
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: INVOICES */}
        {activeTab === 'invoices' && (
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
              GST Tax Compliant Invoices
            </h4>
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white">Invoice #INV-2026-HE-9942</div>
                <div className="text-[10px] text-gray-400">High-Pressure Pipe Leak Repair • GST 18% Included</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#D4AF37] font-bold">₹617</span>
                <button
                  onClick={() => alert('Downloading official GST invoice PDF...')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-200 border border-white/10"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SUPPORT */}
        {activeTab === 'support' && (
          <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-white">
              VIP Dedicated Platinum Support Desk
            </h4>
            <p className="text-xs text-gray-400">
              As a Platinum client, you have direct routing to our Senior Operations Escalations Director. Average resolution under 12 minutes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:18004193273"
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
              >
                Direct Priority Call
              </a>
              <button
                onClick={() => alert('Support ticket #TCK-991 created. Concierge agent assigned.')}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10"
              >
                Open Emergency Ticket
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-4 text-xs">
            <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
              Profile & Residence Preferences
            </h4>
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Primary Residence:</span>
                <span className="text-white font-medium">{currentUser.address?.street}, {currentUser.address?.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gate Instructions:</span>
                <span className="text-[#00D9FF]">Visitor Entry pass via MyGate pre-authorized</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Biometric 2FA:</span>
                <span className="text-emerald-400 font-semibold">Active & Encrypted</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
