'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  MapPin,
  Camera,
  MessageSquare,
  Video,
  Power,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  LogIn,
  LogOut,
  Lock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProviderDashboardView() {
  const {
    isProviderLoggedIn,
    loginAsProvider,
    logoutProvider,
    providerProfile,
  } = useApp();

  const [isOnline, setIsOnline] = useState(true);
  const [incomingRequest, setIncomingRequest] = useState<{
    id: string;
    customer: string;
    location: string;
    distance: string;
    service: string;
    payout: number;
    timer: number;
  } | null>({
    id: 'DISP-8812',
    customer: 'Dr. Cyrus Mistry',
    location: 'Worli Hill Road, Mumbai',
    distance: '1.4 km away',
    service: 'Concealed Water Pipe Gasket Burst',
    payout: 850,
    timer: 24,
  });

  const [acceptedJob, setAcceptedJob] = useState(false);

  // If provider is not logged in, show authentication required gate
  if (!isProviderLoggedIn) {
    return (
      <section id="provider-dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-[#D4AF37]/30 text-center space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all shadow-sm"
            >
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Home</span>
            </Link>
            <span className="text-xs text-gray-400 font-mono">PRO SUITE GATE</span>
          </div>

          <div className="w-16 h-16 rounded-3xl bg-[#D4AF37]/10 border-2 border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white font-space">
              Provider Accreditation Required
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Please sign in with your verified technician credentials to receive live job dispatch alerts, view revenue settlements, and manage daily service availability.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/provider/login"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold text-xs shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Open Provider Login Page</span>
            </Link>

            <button
              onClick={() => loginAsProvider()}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#00D9FF]" />
              <span>1-Click Fast Login as {providerProfile.name} (Pro)</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const handleAcceptRequest = () => {
    setAcceptedJob(true);
    setIncomingRequest(null);
  };

  const handleDeclineRequest = () => {
    setIncomingRequest(null);
  };

  return (
    <section id="provider-dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/15 shadow-2xl space-y-8">
        {/* PROVIDER TOP STATUS BAR WITH HOME & LOGOUT BUTTON */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={providerProfile.avatar}
              alt={providerProfile.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#00D9FF]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-space">
                  {providerProfile.name}
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Master Verified</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Plumbing & Hydraulic Restoration • 9 Years Exp • 3,840 Jobs Done
              </p>
              <div className="flex items-center gap-3 text-[11px] text-[#D4AF37] mt-1">
                <span>★ 4.98 Rating (1,420 Reviews)</span>
                <span>•</span>
                <span className="text-[#00D9FF]">Assigned Area: South Mumbai (7 km)</span>
              </div>
            </div>
          </div>

          {/* ONLINE TOGGLE & HOME / LOGOUT CONTROLS */}
          <div className="flex flex-wrap items-center gap-3">
            {/* HOME BUTTON */}
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all shadow-sm"
              title="Return to Home"
            >
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Home</span>
            </Link>

            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                isOnline
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                }`}
              />
              <span>{isOnline ? 'Online (Accepting Dispatches)' : 'Offline (Paused)'}</span>
            </button>

            <button
              onClick={() => alert(`Initiating Instant Settlement: ₹${providerProfile.walletBalance.toLocaleString('en-IN')} sent to HDFC Bank ****9012`)}
              className="px-4 py-2.5 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20"
            >
              Instant Daily Payout (₹{providerProfile.walletBalance.toLocaleString('en-IN')})
            </button>

            <button
              onClick={logoutProvider}
              className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 transition-all text-xs flex items-center gap-1"
              title="Log out of Provider Suite"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* INCOMING DISPATCH CALLOUT (LIVE ALERT) */}
        {isOnline && incomingRequest && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-[#00D9FF] shadow-2xl space-y-3 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-ping" />
                <span className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider">
                  Incoming VIP Service Request • #{incomingRequest.id}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-white bg-black/50 px-2 py-0.5 rounded-md border border-white/10">
                Auto-rejects in {incomingRequest.timer}s
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <h4 className="text-sm font-bold text-white">{incomingRequest.service}</h4>
                <p className="text-gray-300 mt-0.5">
                  Client: {incomingRequest.customer} • {incomingRequest.location} ({incomingRequest.distance})
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-gray-400 block">Pro Payout</span>
                  <span className="text-base font-extrabold text-[#D4AF37]">
                    ₹{incomingRequest.payout}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDeclineRequest}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 text-xs"
                  >
                    Pass
                  </button>
                  <button
                    onClick={handleAcceptRequest}
                    className="px-5 py-2 rounded-xl bg-[#00D9FF] text-black font-extrabold text-xs shadow-lg shadow-[#00D9FF]/30"
                  >
                    Accept Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {acceptedJob && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Job #{incomingRequest?.id || 'DISP-8812'} Accepted. Customer notified via GPS.</span>
            </div>
            <a href="#live-tracking" className="text-white underline font-bold">
              Open Route Radar
            </a>
          </div>
        )}

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Today's Net Revenue</span>
            <div className="text-2xl font-bold text-white font-space">₹4,200</div>
            <span className="text-[10px] text-emerald-400">3 Jobs completed today</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">This Month's Take-Home</span>
            <div className="text-2xl font-bold text-[#D4AF37] font-space">₹98,400</div>
            <span className="text-[10px] text-gray-400">84 hours active service</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Punctuality Score</span>
            <div className="text-2xl font-bold text-[#00D9FF] font-space">99.2%</div>
            <span className="text-[10px] text-gray-400">Avg arrival time: 6.4 mins</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Pro Tier Status</span>
            <div className="text-2xl font-bold text-emerald-400 font-space">Platinum Pro</div>
            <span className="text-[10px] text-gray-400">Top 1% earner in Mumbai</span>
          </div>
        </div>

        {/* BEFORE & AFTER PORTFOLIO PREVIEW */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
              Before & After Verified Workmanship Portfolio
            </h4>
            <span className="text-xs text-[#D4AF37]">+ Upload New Work Proof</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'High-Pressure Pipe Gasket Restoration',
                loc: 'Lodha Bellissimo Penthouse',
                afterImg: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Concealed Diverter Valve Replacement',
                loc: 'Oberoi Sky Heights, Bandra',
                afterImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'UV Water Sterilizer & Sump Overhaul',
                loc: 'Koregaon Park Estate, Pune',
                afterImg: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=400&q=80',
              },
            ].map((work, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-2 text-xs"
              >
                <div className="h-32 rounded-xl overflow-hidden relative">
                  <img
                    src={work.afterImg}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-emerald-400 font-bold">
                    Verified After
                  </span>
                </div>
                <h5 className="font-bold text-white truncate">{work.title}</h5>
                <p className="text-[11px] text-gray-400">{work.loc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
