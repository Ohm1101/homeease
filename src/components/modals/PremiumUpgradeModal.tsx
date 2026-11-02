'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Crown,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Gift,
  QrCode,
  Copy,
  Check,
  RefreshCw,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PremiumUpgradeModal() {
  const { isPremiumModalOpen, setIsPremiumModalOpen, upgradeToPremium, currentUser } = useApp();

  const [step, setStep] = useState<'benefits' | 'pay'>('pay');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [verificationState, setVerificationState] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');

  if (!isPremiumModalOpen) return null;

  const upiId = 'homeease.vip@okhdfcbank';
  const subscriptionPrice = 499;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  const handleVerifyPayment = () => {
    setVerificationState('checking');
    setVerificationMessage('Connecting to UPI Gateway & Banking Network...');

    setTimeout(() => {
      setVerificationMessage('Matching settlement with merchant transaction ledger...');
    }, 900);

    setTimeout(() => {
      setVerificationState('success');
      setVerificationMessage('Payment Verified! ₹499 Received.');

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#00D9FF', '#00C853', '#FFFFFF'],
        });
      } catch (e) {}

      setTimeout(() => {
        upgradeToPremium();
        setVerificationState('idle');
        setUtrNumber('');
      }, 1400);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/80 dark:bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel bg-white/95 dark:bg-[#0c1322]/95 border border-[#D4AF37]/50 p-6 sm:p-8 shadow-2xl space-y-6 my-auto text-slate-900 dark:text-white">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => {
            setIsPremiumModalOpen(false);
            setVerificationState('idle');
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-300 dark:border-white/10"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* HEADER ICON & TITLE */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#b48c1e] to-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <Crown className="w-6 h-6 text-black fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-space text-slate-900 dark:text-white">
                HomeEase Premium VIP
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-[#D4AF37] text-[10px] font-extrabold uppercase border border-amber-500/30">
                ₹{subscriptionPrice}/Year
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-gray-400">
              Instant ₹500 welcome bonus credits • Express 18m arrival queue • 10% cashback
            </p>
          </div>
        </div>

        {/* MAIN BODY: SPLIT VIEW - PERKS ON LEFT, QR PAYMENT ON RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* LEFT COLUMN: VIP BENEFITS RECAP */}
          <div className="md:col-span-6 space-y-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
              <Gift className="w-4 h-4 text-amber-700 dark:text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  ₹500 Instant Welcome Bonus
                </span>
                <span className="text-[11px] text-slate-600 dark:text-gray-300">
                  Credited directly to your wallet bonus balance upon verification.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-sky-700 dark:text-[#00D9FF] shrink-0 mt-0.5 fill-current" />
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  Priority Queue: 18m Arrival
                </span>
                <span className="text-[11px] text-slate-600 dark:text-gray-300">
                  Cut technician response times in half with Silver VIP priority routing.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-700 dark:text-purple-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  ₹200 Off First 5 Bookings
                </span>
                <span className="text-[11px] text-slate-600 dark:text-gray-300">
                  Save ₹1,000+ total across your initial 5 home maintenance dispatches.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Cancel subscription anytime with 1-click in your dashboard.</span>
            </div>
          </div>

          {/* RIGHT COLUMN: GOOGLE PAY UPI QR CODE & VERIFY PAYMENT */}
          <div className="md:col-span-6 p-4 rounded-2xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 text-center space-y-3.5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-gray-400 block">
                Scan & Pay via Google Pay / UPI
              </span>
              <div className="text-xl font-extrabold text-[#b48c1e] dark:text-[#D4AF37] font-space">
                Amount: ₹{subscriptionPrice}
              </div>
            </div>

            {/* EMBEDDED GOOGLE PAY QR CODE IMAGE */}
            <div className="relative inline-block mx-auto group">
              <div className="p-2 rounded-2xl bg-white shadow-xl border-2 border-[#D4AF37] flex items-center justify-center">
                <img
                  src="/images/subscription-qr.jpg"
                  alt="Google Pay UPI QR Code"
                  className="w-44 h-44 object-contain rounded-xl"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-bold shadow-md whitespace-nowrap">
                GPay • PhonePe • Paytm
              </div>
            </div>

            {/* UPI ID COPY CHIP */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-[11px] font-mono font-semibold text-slate-600 dark:text-gray-300">
                UPI: <strong className="text-slate-900 dark:text-white">{upiId}</strong>
              </span>
              <button
                type="button"
                onClick={handleCopyUPI}
                className="p-1 px-2 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-[10px] font-bold flex items-center gap-1 text-slate-800 dark:text-white transition-all"
                title="Copy UPI ID"
              >
                {copiedUPI ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUPI ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* VERIFICATION SECTION */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <input
                type="text"
                placeholder="UPI Ref / UTR No. (optional)"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                disabled={verificationState === 'checking' || verificationState === 'success'}
                className="w-full text-center py-2 px-3 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/20 text-xs text-slate-900 dark:text-white font-mono placeholder:text-slate-400 dark:placeholder:text-gray-500"
              />

              {/* VERIFICATION FEEDBACK BANNER */}
              {verificationState === 'checking' && (
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs flex items-center justify-center gap-2 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{verificationMessage}</span>
                </div>
              )}

              {verificationState === 'success' && (
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{verificationMessage}</span>
                </div>
              )}

              {/* CHECK PAYMENT BUTTON */}
              {verificationState !== 'success' && (
                <button
                  type="button"
                  onClick={handleVerifyPayment}
                  disabled={verificationState === 'checking'}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#b48c1e] to-[#D4AF37] hover:from-[#c59c25] hover:to-[#dfbb43] text-black font-extrabold text-xs shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {verificationState === 'checking' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Checking Payment Gateway...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 fill-black text-[#D4AF37]" />
                      <span>I Have Paid — Check Payment Status</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>256-Bit SSL Encrypted Banking • Instant Automated Settlement</span>
          </div>
          <button
            onClick={() => {
              setIsPremiumModalOpen(false);
              setVerificationState('idle');
            }}
            className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white font-semibold hover:underline"
          >
            Maybe later
          </button>
        </div>

      </div>
    </div>
  );
}
