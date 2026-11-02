-- =========================================================
-- HomeEase Production Database Schema for Supabase
-- Run this in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Click Run
-- =========================================================

-- 1. Customer & Provider Profiles (Split Wallets & Multi-Device Sync)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  role TEXT DEFAULT 'customer',
  wallet_balance NUMERIC DEFAULT 0,
  bonus_balance NUMERIC DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  loyalty_tier TEXT DEFAULT 'Regular',
  orders_completed_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bookings & Live Dispatches
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  category_name TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  address TEXT,
  price NUMERIC,
  status TEXT DEFAULT 'confirmed',
  payment_method TEXT DEFAULT 'UPI',
  payment_status TEXT DEFAULT 'paid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Service Provider Applications
CREATE TABLE IF NOT EXISTS public.provider_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  trade TEXT NOT NULL,
  city TEXT DEFAULT 'Mumbai',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
