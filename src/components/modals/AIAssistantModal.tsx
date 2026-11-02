'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Mic,
  Bot,
  User,
  Zap,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SERVICE_CATEGORIES } from '@/data/mockData';

export default function AIAssistantModal() {
  const { isAIAssistantOpen, setIsAIAssistantOpen, openBookingModal } = useApp();

  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; actionCategory?: string; projectedPrice?: number }>>([
    {
      sender: 'ai',
      text: 'Greetings. I am HomeEase Neural Assistant. Describe any household fault, noise, or electrical trip, or ask for a price prediction. How may I assist your estate today?',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isAIAssistantOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();

      let reply = 'I have analyzed the symptoms. This indicates an urgent maintenance requirement.';
      let category = 'plumbing';
      let price = 499;

      if (lower.includes('ac') || lower.includes('cool') || lower.includes('warm air') || lower.includes('compressor')) {
        reply = 'Diagnostic result: Likely capacitor failure or refrigerant leak in your AC unit. Continuous operation may burn the hermetic compressor. Recommended: High-Pressure Jet Clean & Gas Pressure Calibration.';
        category = 'ac-services';
        price = 599;
      } else if (lower.includes('spark') || lower.includes('mcb') || lower.includes('power') || lower.includes('shock') || lower.includes('electric')) {
        reply = 'High Fire Risk Diagnostic: Neutral line load imbalance or arcing circuit breaker detected. Do not attempt manual bypass. Recommended: Master Electrician thermal scan.';
        category = 'electrical';
        price = 449;
      } else if (lower.includes('water') || lower.includes('leak') || lower.includes('pipe') || lower.includes('flood') || lower.includes('tap')) {
        reply = 'Diagnostic: High-pressure water line or gasket compromise. Immediate shutoff valve isolation advised. Recommended: Ultrasonic leak detection clamp.';
        category = 'plumbing';
        price = 499;
      } else if (lower.includes('clean') || lower.includes('sofa') || lower.includes('dust')) {
        reply = 'Recommendation: Deep Hospital-Grade Steam Sanitization & Kärcher hot water extraction. Removes 99.9% of dust mites and allergens.';
        category = 'cleaning';
        price = 799;
      } else {
        reply = 'Our predictive maintenance model has matched your request. An accredited master technician with 4.9+ rating is available in your immediate sector within 25 minutes.';
        category = 'plumbing';
        price = 399;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          actionCategory: category,
          projectedPrice: price,
        },
      ]);
    }, 1000);
  };

  const handleBookCategory = (catId: string) => {
    const found = SERVICE_CATEGORIES.find((c) => c.id === catId) || SERVICE_CATEGORIES[0];
    setIsAIAssistantOpen(false);
    openBookingModal(found);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-[#00D9FF]/40 p-6 sm:p-8 shadow-2xl space-y-5 my-auto flex flex-col h-[620px]">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsAIAssistantOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-space">
                HomeEase AI Concierge & Diagnostic Bot
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] font-semibold">
                Neural Model v4.8
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Autonomous symptom detection, price prediction & rapid dispatch.
            </p>
          </div>
        </div>

        {/* CHAT LOG */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-[#00D9FF]/20 text-[#00D9FF] flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#00D9FF] text-black font-medium'
                    : 'bg-white/5 border border-white/10 text-gray-200'
                }`}
              >
                <p>{msg.text}</p>

                {msg.actionCategory && (
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[#D4AF37] font-bold">
                      Est. ₹{msg.projectedPrice}
                    </span>
                    <button
                      onClick={() => handleBookCategory(msg.actionCategory!)}
                      className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-black font-bold text-[11px] flex items-center gap-1 shadow-sm"
                    >
                      <span>Book Specialist</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-bounce" />
              <span>Analyzing telemetry database & projecting quote...</span>
            </div>
          )}
        </div>

        {/* QUICK SUGGESTION CHIPS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 text-[11px]">
          {[
            'AC blowing warm air',
            'Water burst in bathroom',
            'Circuit breaker sparking',
            'Kitchen deep clean estimate',
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSendMessage(chip)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* INPUT FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2 shrink-0 pt-2 border-t border-white/10"
        >
          <input
            type="text"
            placeholder="Type symptoms or ask cost prediction..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#00D9FF]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#00D9FF] text-black font-bold rounded-xl text-xs flex items-center justify-center shadow-md shadow-[#00D9FF]/20"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
