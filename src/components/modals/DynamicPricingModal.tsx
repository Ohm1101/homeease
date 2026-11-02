'use client';

import React, { useState } from 'react';
import {
  X,
  Calculator,
  Sliders,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SERVICE_CATEGORIES } from '@/data/mockData';

export default function DynamicPricingModal() {
  const { isPricingModalOpen, setIsPricingModalOpen, openBookingModal } = useApp();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [distanceKm, setDistanceKm] = useState(3.5);
  const [urgencyMode, setUrgencyMode] = useState<'standard' | 'priority' | 'midnight'>('standard');
  const [difficultyTier, setDifficultyTier] = useState<'standard' | 'complex' | 'structural'>('standard');

  if (!isPricingModalOpen) return null;

  const selectedCategory = SERVICE_CATEGORIES[categoryIndex];
  const baseServiceFee = selectedCategory.startingPrice;

  // Distance cost calculation: ₹12 per km
  const distanceCost = Math.round(distanceKm * 12);

  // Urgency Multiplier
  const urgencyMultiplier =
    urgencyMode === 'midnight' ? 1.6 : urgencyMode === 'priority' ? 1.25 : 1.0;

  // Difficulty adjustment
  const difficultyFee =
    difficultyTier === 'structural' ? 350 : difficultyTier === 'complex' ? 150 : 0;

  const subtotal = Math.round((baseServiceFee + distanceCost + difficultyFee) * urgencyMultiplier);
  const platformFee = 29;
  const taxes = Math.round((subtotal + platformFee) * 0.18);
  const totalCalculated = subtotal + platformFee + taxes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsPricingModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider">
              Algorithmic Cost Estimator
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white font-space">
            Transparent Dynamic Pricing Engine
          </h3>
          <p className="text-xs text-gray-400">
            Experiment with distance, urgency multipliers, and difficulty tiers to inspect our real-time formula.
          </p>
        </div>

        {/* INPUT CONTROLS */}
        <div className="space-y-4 text-xs">
          {/* Category Dropdown */}
          <div>
            <label className="text-gray-300 font-medium block mb-1">Select Service Sector:</label>
            <select
              value={categoryIndex}
              onChange={(e) => setCategoryIndex(Number(e.target.value))}
              className="w-full bg-[#111827] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-medium outline-none focus:border-[#D4AF37]"
            >
              {SERVICE_CATEGORIES.map((c, i) => (
                <option key={c.id} value={i}>
                  {c.name} — Base ₹{c.startingPrice}
                </option>
              ))}
            </select>
          </div>

          {/* Distance Slider */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/3 border border-white/5">
            <div className="flex justify-between">
              <span className="text-gray-300 font-medium">Travel Distance Radius:</span>
              <span className="text-[#00D9FF] font-mono font-bold">{distanceKm.toFixed(1)} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full accent-[#00D9FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>0.5 km (Hyperlocal)</span>
              <span>12 km (City Arterial)</span>
              <span>25 km (Outskirts)</span>
            </div>
          </div>

          {/* Urgency Multiplier Switcher */}
          <div className="space-y-1.5">
            <span className="text-gray-300 font-medium block">Urgency & Time of Day:</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: 'Standard (1.0x)', desc: 'Scheduled Slot' },
                { id: 'priority', label: 'Express (1.25x)', desc: 'Under 25 mins' },
                { id: 'midnight', label: 'Midnight (1.6x)', desc: '11 PM - 6 AM Crisis' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setUrgencyMode(m.id as typeof urgencyMode)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    urgencyMode === m.id
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-xs">{m.label}</div>
                  <div className="text-[10px] text-gray-400">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Tier */}
          <div className="space-y-1.5">
            <span className="text-gray-300 font-medium block">Service Difficulty Classification:</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: 'Standard', fee: '+₹0' },
                { id: 'complex', label: 'Concealed / In-Wall', fee: '+₹150' },
                { id: 'structural', label: 'Heavy Architectural', fee: '+₹350' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficultyTier(d.id as typeof difficultyTier)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    difficultyTier === d.id
                      ? 'bg-[#00D9FF]/20 border-[#00D9FF] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-xs">{d.label}</div>
                  <div className="text-[10px] text-[#00D9FF]">{d.fee}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MATH BREAKDOWN SHEET */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>Base Service Fee ({selectedCategory.name}):</span>
            <span className="text-white font-mono">₹{baseServiceFee}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Distance Surcharge ({distanceKm.toFixed(1)} km @ ₹12/km):</span>
            <span className="text-white font-mono">₹{distanceCost}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Difficulty Adjustment:</span>
            <span className="text-white font-mono">₹{difficultyFee}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Urgency Multiplier Factor:</span>
            <span className="text-[#D4AF37] font-mono font-bold">{urgencyMultiplier}x</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Platform Convenience & Damage Protection Fee:</span>
            <span className="text-white font-mono">₹{platformFee}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Statutory GST Tax (18%):</span>
            <span className="text-white font-mono">₹{taxes}</span>
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-bold">
            <span className="text-white">Estimated Transparent Total:</span>
            <span className="text-2xl font-extrabold text-[#D4AF37] font-space">
              ₹{totalCalculated}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00C853]" />
            <span>Guaranteed Price Lock Upon Booking</span>
          </span>

          <button
            onClick={() => {
              setIsPricingModalOpen(false);
              openBookingModal(selectedCategory);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold text-xs shadow-md shadow-[#D4AF37]/25"
          >
            Lock Price & Book
          </button>
        </div>
      </div>
    </div>
  );
}
