'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  CreditCard,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Upload,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SERVICE_CATEGORIES } from '@/data/mockData';

export default function BookingModal() {
  const {
    isBookingModalOpen,
    closeBookingModal,
    selectedCategoryDetail,
    selectedBookingCategory,
    selectedBookingSubServiceId,
    currentUser,
    bookingFormKey,
    triggerInstantBooking,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const initialCategory = selectedBookingCategory || selectedCategoryDetail;
  const [selectedCatId, setSelectedCatId] = useState(initialCategory?.id || 'plumbing');
  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string>(selectedBookingSubServiceId || 'p1');
  const [scheduleType, setScheduleType] = useState<'instant' | 'scheduled'>('instant');
  const [scheduledDate, setScheduledDate] = useState('Today, 19:30');
  const [issueDescription, setIssueDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Wallet' | 'Cash'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  // ALWAYS RESET ON OPEN OR FORM KEY CHANGE
  useEffect(() => {
    if (isBookingModalOpen) {
      setStep(1);
      setIsProcessing(false);
      setIssueDescription('');
      const targetCat = selectedBookingCategory || selectedCategoryDetail;
      if (targetCat) {
        setSelectedCatId(targetCat.id);
        const subId = selectedBookingSubServiceId || targetCat.subServices[0]?.id || 'p1';
        setSelectedSubServiceId(subId);
      } else {
        setSelectedCatId('plumbing');
        setSelectedSubServiceId('p1');
      }
    }
  }, [isBookingModalOpen, bookingFormKey, selectedBookingCategory, selectedBookingSubServiceId, selectedCategoryDetail]);

  if (!isBookingModalOpen) return null;

  const currentCategory =
    SERVICE_CATEGORIES.find((c) => c.id === selectedCatId) || SERVICE_CATEGORIES[0];
  const currentSubService =
    currentCategory.subServices.find((s) => s.id === selectedSubServiceId) ||
    currentCategory.subServices[0];

  // Dynamic pricing calculation
  const basePrice = currentSubService.price;
  const distanceFee = 45;
  const urgencyFee = scheduleType === 'instant' ? 50 : 0;
  const gst = Math.round((basePrice + distanceFee + urgencyFee) * 0.18);
  const platformFee = 29;
  const loyaltyDiscount = currentUser?.loyaltyTier === 'Platinum' ? 50 : 0;
  const grandTotal = basePrice + distanceFee + urgencyFee + gst + platformFee - loyaltyDiscount;

  const handleStartFresh = () => {
    setStep(1);
    setIsProcessing(false);
    setIssueDescription('');
    setSelectedCatId('plumbing');
    setSelectedSubServiceId('p1');
    setScheduleType('instant');
  };

  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(1); // Clean jump-start reset for next booking
      setIssueDescription('');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#00D9FF', '#00C853'],
        });
      } catch (err) {
        // silent fallback
      }
      triggerInstantBooking(currentSubService.title, currentCategory.name, grandTotal);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel bg-white/95 dark:bg-[#0c1322]/95 border border-slate-300/80 dark:border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 my-auto text-slate-900 dark:text-white">
        {/* TOP CONTROLS */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          {/* RESTART / FRESH BOOKING BUTTON */}
          <button
            onClick={handleStartFresh}
            title="Start fresh new booking"
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-1 border border-slate-300 dark:border-white/10 shadow-sm"
          >
            <RotateCcw className="w-3 h-3 text-[#b48c1e] dark:text-[#D4AF37]" />
            <span className="hidden sm:inline font-medium">New Booking</span>
          </button>

          <button
            onClick={closeBookingModal}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HEADER */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] dark:bg-[#00D9FF] animate-ping" />
            <span className="text-[10px] font-mono uppercase font-bold text-[#b48c1e] dark:text-[#D4AF37] tracking-wider">
              Autonomous Booking Engine
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-space">
            {step === 1 && 'Configure Service & AI Diagnosis'}
            {step === 2 && 'Select Schedule & Arrival Window'}
            {step === 3 && 'Transparent Price Breakdown'}
            {step === 4 && 'Authorize Secure Payment'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-gray-400 font-medium">
            Phase {step} of 4 • Guaranteed 30-Day Workmanship Warranty Included
          </p>
        </div>

        {/* STEP 1: SERVICE & AI ISSUE DIAGNOSIS */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            {/* Category Switcher */}
            <div>
              <label className="text-gray-300 font-medium block mb-1.5">
                Service Sector:
              </label>
              <select
                value={selectedCatId}
                onChange={(e) => {
                  setSelectedCatId(e.target.value);
                  const newCat = SERVICE_CATEGORIES.find((c) => c.id === e.target.value);
                  if (newCat) setSelectedSubServiceId(newCat.subServices[0].id);
                }}
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-semibold outline-none focus:border-[#D4AF37]"
              >
                {SERVICE_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — (Starting ₹{c.startingPrice})
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-services selection */}
            <div>
              <label className="text-gray-300 font-medium block mb-1.5">
                Specific Work Required:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentCategory.subServices.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubServiceId(sub.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSubServiceId === sub.id
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-bold text-white">{sub.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                      <span>{sub.estimatedMinutes} mins est.</span>
                      <span className="font-bold text-[#D4AF37]">₹{sub.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Issue diagnosis text / photo */}
            <div>
              <label className="text-gray-300 font-medium block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Describe or Paste Photo of Household Issue:</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Water leaking rapidly from under bathroom sink, shutoff valve appears stuck..."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 outline-none focus:border-[#00D9FF]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20"
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCHEDULE */}
        {step === 2 && (
          <div className="space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setScheduleType('instant')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  scheduleType === 'instant'
                    ? 'bg-[#00D9FF]/15 border-[#00D9FF] text-white shadow-lg shadow-[#00D9FF]/15'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#00D9FF] font-bold text-sm mb-1">
                  <Zap className="w-4 h-4 fill-[#00D9FF]" />
                  <span>Immediate Express</span>
                </div>
                <p className="text-gray-400 text-[11px]">
                  Priority dispatch within 25 minutes. Ideal for leaks, blackouts, or urgent repairs.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setScheduleType('scheduled')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  scheduleType === 'scheduled'
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/15'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule for Later</span>
                </div>
                <p className="text-gray-400 text-[11px]">
                  Pick a preferred appointment slot matching your calendar. Zero wait times.
                </p>
              </button>
            </div>

            {scheduleType === 'scheduled' && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-gray-300 font-medium block">Select Time Slot:</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {['Tomorrow 10:00 AM', 'Tomorrow 02:30 PM', 'Tomorrow 06:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setScheduledDate(slot)}
                      className={`p-2 rounded-lg border text-xs ${
                        scheduledDate === slot
                          ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                          : 'bg-black/40 text-gray-300 border-white/10'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Address Confirmation */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00D9FF]" />
                <div>
                  <div className="font-bold text-white">
                    {currentUser?.address?.street}, {currentUser?.address?.area}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    City: {currentUser?.address?.city} • Default Residence
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-[#00D9FF] font-semibold">Verified</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>View Dynamic Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DYNAMIC PRICING BREAKDOWN */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5">
              <div className="flex justify-between text-gray-400">
                <span>{currentSubService.title} (Base Fee):</span>
                <span className="text-white font-mono font-medium">₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Travel Distance (2.1 km radius):</span>
                <span className="text-white font-mono font-medium">₹{distanceFee}</span>
              </div>
              {urgencyFee > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Immediate Express Priority Surcharge:</span>
                  <span className="text-white font-mono font-medium">₹{urgencyFee}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Platform Safety & Damage Insurance Fee:</span>
                <span className="text-white font-mono font-medium">₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>GST Tax (18% Statutory):</span>
                <span className="text-white font-mono font-medium">₹{gst}</span>
              </div>
              {loyaltyDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Platinum Member Privilege Discount:</span>
                  <span className="font-mono">-₹{loyaltyDiscount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="font-bold text-white">Guaranteed Lock Total:</span>
                <span className="text-xl font-extrabold text-[#D4AF37] font-space">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Zero hidden surge fees. Backed by HomeEase Price Lock Promise.</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl bg-[#00D9FF] text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#00D9FF]/20"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT */}
        {step === 4 && (
          <div className="space-y-5 text-xs">
            <label className="text-gray-300 font-medium block">
              Choose Payment Method:
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'UPI', label: 'UPI / QR Code', icon: QrCode, desc: 'Google Pay, PhonePe, Paytm' },
                { id: 'Wallet', label: 'HomeEase Wallet', icon: Sparkles, desc: `Balance: ₹${currentUser?.walletBalance || 0}` },
                { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
                { id: 'Cash', label: 'Cash on Completion', icon: CheckCircle2, desc: 'Pay after service approval' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as typeof paymentMethod)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-white mb-0.5">
                      <Icon className="w-4 h-4 text-[#D4AF37]" />
                      <span>{m.label}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block">{m.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">Amount Authorized</span>
                <span className="text-xl font-bold text-[#D4AF37] font-space">₹{grandTotal}</span>
              </div>
              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00C853]" />
                <span>256-Bit SSL Encrypted</span>
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={handleConfirmAndPay}
                disabled={isProcessing}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold text-xs shadow-xl shadow-[#D4AF37]/30 flex items-center gap-2 transition-all hover:opacity-95"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Dispatching Specialist...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Authorize & Dispatch Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
