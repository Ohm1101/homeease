'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  ShieldAlert,
  UserCheck,
  DollarSign,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Lock,
  Sliders,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AdminDashboardView() {
  const { verificationQueue, updateVerificationStatus } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'kyc' | 'pricing-controls' | 'disputes' | 'audit-logs'>('kyc');

  // Dynamic surge pricing state
  const [surgeMultiplier, setSurgeMultiplier] = useState(1.0);
  const [platformFee, setPlatformFee] = useState(29);
  const [surgeSaved, setSurgeSaved] = useState(false);

  const handleSaveSurge = (e: React.FormEvent) => {
    e.preventDefault();
    setSurgeSaved(true);
    setTimeout(() => setSurgeSaved(false), 2500);
  };

  return (
    <section id="admin-dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/15 shadow-2xl space-y-8">
        {/* ADMIN HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-space">
                  HomeEase Master Command Center
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Global Operations Admin
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Monitoring 320 Metropolitan Regions • Sub-Second Neural Dispatch Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all shadow-sm"
              title="Return to Home"
            >
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Home</span>
            </Link>

            <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400">Today GMV</span>
              <div className="text-lg font-bold text-emerald-400 font-mono">₹14,82,400</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400">Net Take Rate</span>
              <div className="text-lg font-bold text-[#D4AF37] font-mono">₹2,22,360</div>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs">
          {[
            { id: 'kyc', label: `Provider KYC Queue (${verificationQueue.filter((d) => d.status === 'pending').length} Pending)`, icon: FileCheck },
            { id: 'pricing-controls', label: 'Dynamic Pricing & Surge Override', icon: Sliders },
            { id: 'disputes', label: 'Disputes & Emergency SOS (0 Active)', icon: AlertTriangle },
            { id: 'audit-logs', label: 'Security & 2FA Audit Logs', icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as typeof activeAdminTab)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all font-medium ${
                  isActive
                    ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: KYC VERIFICATION QUEUE */}
        {activeAdminTab === 'kyc' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                Pending Accreditation Documents
              </h4>
              <span className="text-xs text-gray-400">
                AI Optical Character Recognition (OCR) Pre-Scanned
              </span>
            </div>

            <div className="space-y-3">
              {verificationQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/3 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.docPreviewUrl}
                      alt="Doc"
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{item.providerName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300">
                          {item.providerCategory}
                        </span>
                      </div>
                      <p className="text-gray-400 text-[11px] mt-0.5">
                        {item.docType}: <span className="font-mono text-white">{item.docNumber}</span> • Submitted {item.submittedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                        item.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : item.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {item.status}
                    </span>

                    {item.status === 'pending' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateVerificationStatus(item.id, 'approved')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => updateVerificationStatus(item.id, 'rejected')}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-medium text-xs border border-rose-500/30 flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-500 font-mono">Processed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PRICING & SURGE ENGINE OVERRIDES */}
        {activeAdminTab === 'pricing-controls' && (
          <form onSubmit={handleSaveSurge} className="p-6 rounded-2xl glass-panel space-y-6 max-w-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#D4AF37]" />
              <span>Real-Time Pricing Engine Controls</span>
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Citywide Surge Multiplier:</span>
                <span className="font-bold text-[#D4AF37] font-mono">{surgeMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={surgeMultiplier}
                onChange={(e) => setSurgeMultiplier(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">
                1.0x = Baseline Pricing • 1.5x = Heavy Rain/Surge • 2.0x = Midnight Emergency
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Platform Convenience Fee:</span>
                <span className="font-bold text-[#00D9FF] font-mono">₹{platformFee}</span>
              </div>
              <input
                type="range"
                min="19"
                max="99"
                step="5"
                value={platformFee}
                onChange={(e) => setPlatformFee(Number(e.target.value))}
                className="w-full accent-[#00D9FF] cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold text-xs shadow-md"
            >
              Deploy Pricing Algorithm Update
            </button>

            {surgeSaved && (
              <span className="text-xs text-emerald-400 block mt-2">
                ✓ Dynamic parameters pushed to Redis edge nodes across all 320 cities!
              </span>
            )}
          </form>
        )}

        {/* TAB 3: DISPUTES */}
        {activeAdminTab === 'disputes' && (
          <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">All Clear • Zero Active Escalations</h4>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Platform dispute rate is currently at 0.02%. Any emergency SOS alert triggered by client or provider will flash here with GPS coordinates.
            </p>
          </div>
        )}

        {/* TAB 4: AUDIT LOGS */}
        {activeAdminTab === 'audit-logs' && (
          <div className="space-y-2 text-xs font-mono">
            {[
              { time: '18:24:10', event: 'JWT Token refreshed for Client #usr-cust-1', ip: '103.21.244.18', status: 'SUCCESS' },
              { time: '18:22:45', event: 'UPI Webhook confirmed for Order #HE-BK-89421 (₹617)', ip: 'Razorpay-Prod', status: 'VERIFIED' },
              { time: '18:19:02', event: 'Biometric Face Match verified for Vikramaditya Sharma', ip: 'UIDAI-Gateway', status: 'CLEARED' },
              { time: '18:15:30', event: 'Sub-meter GPS websocket stream opened', ip: 'Socket-Cluster-4', status: 'ACTIVE' },
            ].map((log, i) => (
              <div key={i} className="p-3 rounded-xl bg-black/60 border border-white/5 flex justify-between items-center">
                <div className="text-gray-400">
                  <span className="text-gray-500">{log.time}</span> • {log.event} ({log.ip})
                </div>
                <span className="text-emerald-400 font-bold">{log.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
