'use client';

import React, { useState } from 'react';
import {
  Navigation,
  Phone,
  MessageSquare,
  ShieldAlert,
  Car,
  MapPin,
  Clock,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LiveTrackingSection() {
  const { activeBooking, setActiveBooking } = useApp();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'provider', text: 'Good evening Mr. Singhania, I am on Dr. Annie Besant Road. ETA 6-7 mins. Is visitor parking available at Lodha Bellissimo?', time: '18:18' },
    { sender: 'customer', text: 'Yes Vikram, slot #P2-14 is reserved under HomeEase. Security has your gate pass.', time: '18:19' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  if (!activeBooking) return null;

  const tracking = activeBooking.tracking;
  const provider = activeBooking.provider;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'customer', text: newMessage, time: 'Just now' },
    ]);
    setNewMessage('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'provider', text: 'Noted! Entering service gate now with pressure testing equipment.', time: 'Just now' },
      ]);
    }, 1200);
  };

  const handleFastForwardGPS = () => {
    setActiveBooking((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'arrived',
        tracking: {
          ...prev.tracking,
          routeProgressPercent: 100,
          distanceRemainingKm: 0.05,
          etaMinutes: 1,
          currentSpeedKmH: 0,
          lastUpdated: 'Arrived at destination gate',
        },
      };
    });
  };

  const handleResetGPS = () => {
    setActiveBooking((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'en_route',
        tracking: {
          ...prev.tracking,
          routeProgressPercent: 35,
          distanceRemainingKm: 2.1,
          etaMinutes: 7,
          currentSpeedKmH: 34,
          lastUpdated: 'Live GPS active',
        },
      };
    });
  };

  return (
    <section id="live-tracking" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-[#00D9FF] text-xs font-semibold">
          <Navigation className="w-3.5 h-3.5" />
          <span>Section 09 • Uber-Style Real-Time Telemetry</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-space">
          Sub-Meter Live Tracking Radar
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          Experience total transparency. Watch your dedicated verified pro approach your residence on our high-precision live route map.
        </p>
      </div>

      {/* MAIN TRACKING CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE MAP HUD */}
        <div className="lg:col-span-8 rounded-3xl glass-panel border border-slate-300/80 dark:border-white/15 overflow-hidden shadow-2xl relative">
          {/* MAP CANVAS SIMULATOR */}
          <div className="relative w-full h-[450px] sm:h-[520px] bg-[#070d18] overflow-hidden flex items-center justify-center">
            {/* Dark luxury street map grid lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="street-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1e293b" strokeWidth="1" />
                  <circle cx="40" cy="40" r="1.5" fill="#334155" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#street-grid)" />

              {/* Highway Arterial Roads */}
              <path
                d="M -50 150 Q 250 180 500 240 T 950 260"
                fill="none"
                stroke="#1e293b"
                strokeWidth="18"
              />
              <path
                d="M 120 -50 Q 200 250 350 400 T 550 600"
                fill="none"
                stroke="#1e293b"
                strokeWidth="14"
              />

              {/* Glowing Dynamic Route Polyline */}
              <path
                d="M 160 380 Q 280 320 440 280 T 680 180"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="6"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>

            {/* DESTINATION PIN (Customer's Penthouse) */}
            <div className="absolute top-[180px] right-[180px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/40 animate-bounce">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/40 animate-ping pointer-events-none" />
              </div>
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-bold text-white border border-[#D4AF37]/40 backdrop-blur-md">
                Your Residence (Penthouse 24B)
              </span>
            </div>

            {/* LIVE PROVIDER VEHICLE MARKER (Positioned dynamically along route) */}
            <div
              className="absolute transition-all duration-1000 z-20 flex flex-col items-center"
              style={{
                left: `${18 + (tracking.routeProgressPercent / 100) * 58}%`,
                top: `${72 - (tracking.routeProgressPercent / 100) * 38}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Radar pulse ripples */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#00D9FF]/20 border-2 border-[#00D9FF] flex items-center justify-center shadow-xl shadow-[#00D9FF]/40 text-black font-bold">
                  <Car className="w-6 h-6 text-[#00D9FF]" />
                </div>
                <div className="absolute -inset-3 rounded-full border border-[#00D9FF] animate-radar-pulse pointer-events-none" />
              </div>

              <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-[#00D9FF]/40 text-[10px] font-mono text-[#00D9FF] font-bold whitespace-nowrap shadow-md">
                {provider?.vehicleNumber} • {tracking.currentSpeedKmH} km/h
              </div>
            </div>

            {/* OVERLAY TELEMETRY FLOATING BAR */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl z-20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00D9FF]/20 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {tracking.etaMinutes} mins away
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {tracking.distanceRemainingKm} km remaining • Tata Ace EV
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 max-w-xs mx-2 hidden sm:block">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>En Route</span>
                  <span className="text-[#00D9FF] font-bold">
                    {Math.round(tracking.routeProgressPercent)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#D4AF37] to-[#00D9FF] h-full transition-all duration-700"
                    style={{ width: `${tracking.routeProgressPercent}%` }}
                  />
                </div>
              </div>

              {/* Simulator Action Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleFastForwardGPS}
                  title="Simulate instant arrival"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 border border-white/10 flex items-center gap-1"
                >
                  <Play className="w-3 h-3 text-[#00D9FF]" />
                  <span>Arrive</span>
                </button>
                <button
                  onClick={handleResetGPS}
                  title="Reset route simulation"
                  className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 border border-white/10"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PROVIDER PROFILE & DIRECT COMMS */}
        <div className="lg:col-span-4 space-y-4">
          {/* Provider Identity Card */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-300/80 dark:border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center gap-3.5 pb-3 border-b border-slate-200 dark:border-white/10">
              <img
                src={provider?.avatar}
                alt={provider?.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/50 dark:ring-[#D4AF37] shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{provider?.name}</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00C853]" />
                </div>
                <p className="text-xs text-amber-800 dark:text-[#D4AF37] font-semibold">{provider?.category} Specialist</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-gray-400 mt-1 font-medium">
                  <span>★ {provider?.rating}</span>
                  <span>•</span>
                  <span>{provider?.jobsCompleted}+ jobs</span>
                </div>
              </div>
            </div>

            {/* Vehicle & Verification Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-gray-400 font-medium">
                <span>Assigned Vehicle:</span>
                <span className="text-slate-900 dark:text-white font-bold">{provider?.vehicle}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-gray-400 font-medium">
                <span>Vehicle Registration:</span>
                <span className="text-sky-700 dark:text-[#00D9FF] font-mono font-bold">{provider?.vehicleNumber}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-gray-400 font-medium">
                <span>Trust Score:</span>
                <span className="text-emerald-700 dark:text-[#00C853] font-bold">{provider?.trustScore}% (A+)</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <a
                href={`tel:${provider?.phone}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-[#00D9FF]" />
                <span>Call Pro</span>
              </a>

              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isChatOpen
                    ? 'bg-sky-600 dark:bg-[#00D9FF] text-white dark:text-black border-sky-600 dark:border-[#00D9FF]'
                    : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>

          {/* IN-APP LIVE ENCRYPTED CHAT WINDOW */}
          {isChatOpen && (
            <div className="p-4 rounded-3xl glass-panel border border-sky-400/40 dark:border-[#00D9FF]/30 shadow-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#00C853]" />
                  <span>Encrypted Channel with {provider?.name.split(' ')[0]}</span>
                </span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="h-44 overflow-y-auto space-y-2 pr-1">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === 'customer' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-2.5 rounded-xl text-xs leading-relaxed ${
                        msg.sender === 'customer'
                          ? 'bg-sky-600 dark:bg-[#00D9FF] text-white dark:text-black font-semibold'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 dark:text-gray-500 mt-0.5">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type directions, gate code..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-white/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 outline-none focus:border-[#00D9FF]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-sky-600 dark:bg-[#00D9FF] text-white dark:text-black font-bold rounded-xl text-xs shadow-sm"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
