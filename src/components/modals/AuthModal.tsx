'use client';

import React, { useState } from 'react';
import {
  X,
  User,
  Briefcase,
  Shield,
  Phone,
  Mail,
  Lock,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authRole,
    setActivePersona,
    loginAsCustomer,
    loginAsProvider,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'customer' | 'provider' | 'admin'>(authRole);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'otp'>('login');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '1']);
  const [isSuccess, setIsSuccess] = useState(false);

  // Provider registration state
  const [providerCategory, setProviderCategory] = useState('Plumbing');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      if (activeTab === 'customer') {
        loginAsCustomer({
          phone: phoneOrEmail.includes('@') ? undefined : phoneOrEmail,
          email: phoneOrEmail.includes('@') ? phoneOrEmail : undefined,
        });
      } else if (activeTab === 'provider') {
        loginAsProvider();
      } else {
        setActivePersona(activeTab);
      }
      closeAuthModal();
    }, 800);
  };

  const handleGoogleSignIn = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      loginAsCustomer();
      closeAuthModal();
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedDocName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ROLE SELECTOR TABS */}
        <div className="p-1 rounded-2xl bg-black/50 border border-white/10 grid grid-cols-3 gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setAuthMode('login');
            }}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'customer'
                ? 'bg-[#00D9FF] text-black shadow-md shadow-[#00D9FF]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('provider');
              setAuthMode('register');
            }}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'provider'
                ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pro Partner</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setAuthMode('login');
            }}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* CUSTOMER AUTHENTICATION FLOW */}
        {activeTab === 'customer' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-space">
                {authMode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
              </h3>
              <p className="text-xs text-gray-400">
                Access your bookings, saved residences, and HomeEase Wallet.
              </p>
            </div>

            {/* Google Sign In One-Tap */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:bg-gray-100 shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.31 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.41l4.02-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.26 6.59l4.02 3.13c.95-2.83 3.6-4.97 6.72-4.97z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 text-[11px] text-gray-500 my-2">
              <div className="flex-1 h-[1px] bg-white/10" />
              <span>OR USE PHONE / EMAIL</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <form onSubmit={handleSimulateLogin} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-medium block mb-1">
                  Mobile Number or Email:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="+91 98700 88210"
                    defaultValue="+91 98700 88210"
                    className="w-full pl-9 pr-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              {authMode === 'login' ? (
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-gray-300 font-medium">Password or OTP:</label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('otp')}
                      className="text-[#00D9FF] hover:underline"
                    >
                      Login via SMS OTP
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      defaultValue="••••••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-[#00D9FF]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium">Full Name:</label>
                  <input
                    type="text"
                    placeholder="Aarav Singhania"
                    defaultValue="Aarav Singhania"
                    className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#38bdf8] text-black font-extrabold text-xs shadow-lg shadow-[#00D9FF]/20 mt-2"
              >
                {authMode === 'login' ? 'Sign In as Customer' : 'Complete Registration'}
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
              {authMode === 'login' ? (
                <>
                  <span>Don't have an account?</span>
                  <button
                    onClick={() => setAuthMode('register')}
                    className="text-[#00D9FF] font-semibold hover:underline"
                  >
                    Register Now
                  </button>
                </>
              ) : (
                <>
                  <span>Already registered?</span>
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-[#00D9FF] font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* PROVIDER ONBOARDING & DOCUMENT UPLOAD */}
        {activeTab === 'provider' && (
          <form onSubmit={handleSimulateLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-space">
                Pro Specialist Accreditation Portal
              </h3>
              <p className="text-xs text-gray-400">
                Join our verified master network. Earn up to ₹1,40,000 / month with instant daily settlements.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-300 font-medium block mb-1">Trade Category:</label>
                <select
                  value={providerCategory}
                  onChange={(e) => setProviderCategory(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37]"
                >
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>AC Services</option>
                  <option>Carpentry</option>
                  <option>Smart Home Setup</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 font-medium block mb-1">Experience (Years):</label>
                <input
                  type="number"
                  defaultValue="8"
                  min="3"
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white outline-none"
                />
              </div>
            </div>

            {/* Document Upload Area */}
            <div>
              <label className="text-gray-300 font-medium block mb-1">
                Upload Aadhaar / Trade Certificate:
              </label>
              <label className="border-2 border-dashed border-white/20 hover:border-[#D4AF37] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white/3 transition-all">
                <Upload className="w-6 h-6 text-[#D4AF37] mb-1" />
                <span className="text-xs font-semibold text-white">
                  {uploadedDocName || 'Click or drag trade certificate / ID PDF'}
                </span>
                <span className="text-[10px] text-gray-500 mt-0.5">
                  OCR automatic verification • Max 15MB
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Background check cleared through UIDAI and National Police Database.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold text-xs shadow-lg shadow-[#D4AF37]/25"
            >
              Submit Accreditation & Launch Pro Suite
            </button>
          </form>
        )}

        {/* ADMIN MASTER PORTAL LOGIN */}
        {activeTab === 'admin' && (
          <form onSubmit={handleSimulateLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-space">
                Operations Master Console
              </h3>
              <p className="text-xs text-gray-400">
                Restricted to authorized HomeEase operations directors and dispatch controllers.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 font-medium block">Admin Security Key / Email:</label>
              <input
                type="text"
                defaultValue="devraj@homeease.internal"
                className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 font-medium block">Hardware 2FA Token Code:</label>
              <input
                type="password"
                defaultValue="994201"
                className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-rose-500 font-mono tracking-widest text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30"
            >
              Authenticate & Enter Master Command
            </button>
          </form>
        )}

        {isSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Authenticated successfully. Initializing session...</span>
          </div>
        )}
      </div>
    </div>
  );
}
