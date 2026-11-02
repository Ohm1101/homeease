# Tiered Customer Lifecycle & Split Wallet Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a realistic customer lifecycle featuring non-premium default accounts, an upgrade-to-premium onboarding modal, a split wallet with a 10% bonus usage cap, tiered top-up bonuses, ₹200 discounts on the first 5 orders, and loyalty-accelerated dispatch queues.

**Architecture:** Extend core types in `src/types/index.ts` to track `bonusBalance`, `isPremium`, and `ordersCompletedCount`. Implement tiered deposit bonuses and split-wallet debit rules in `src/context/AppContext.tsx`. Build a dedicated `PremiumUpgradeModal.tsx` for VIP onboarding and update `BookingModal.tsx` to enforce the 10% bonus cap, ₹200 welcome voucher, and priority queue dispatch.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS v4, Lucide React, Canvas Confetti.

**Spec:** [Design Specification approved in conversation](file:///C:/Users/ohmt3/homeease/docs/superpowers/plans/2026-11-02-tiered-customer-lifecycle-wallet.md)

## Global Constraints

- Superpowers zero-dependency rule: no external state managers (Zustand, Redux); manage via `AppContext.tsx`.
- All financial numbers must be handled cleanly as integers (INR ₹) with zero decimal floating artifacts.
- In light theme, all text must remain crisp slate (`#0f172a` / `#1e293b`) with high contrast.
- All state updates to user profile and wallet balances must persist in `localStorage`.

## Review Focus

- New user registration must initialize with `walletBalance: 0`, `bonusBalance: 0`, `isPremium: false`, `ordersCompletedCount: 0`, and `loyaltyTier: 'Regular'`.
- Bonus balance deductions in checkout must never exceed `min(bonusBalance * 0.10, orderTotal * 0.10)`.
- ₹200 first-orders discount must only apply when `ordersCompletedCount < 5`.
- Top-up bonuses must strictly follow the tier rules: ₹500–999 (+5%), ₹1,000–4,999 (+7%), ₹5,000+ (+20%), below ₹500 (0%).
- Upgrading to Premium must credit ₹500 bonus balance and upgrade queue priority without erasing existing deposits.

---

### Task 1: Extend Data Schemas in `src/types/index.ts`

**Files:**
- Modify: `src/types/index.ts:15-30` (User interface)
- Modify: `src/types/index.ts:132-143` (PricingBreakdown interface)

**Interfaces:**
- Produces: Updated `User` with `bonusBalance`, `isPremium`, `ordersCompletedCount`, and `'Regular'` tier.
- Produces: Updated `PricingBreakdown` with `welcomeDiscount`, `bonusDeduction`, and `cashOrWalletPayable`.

- [ ] **Step 1: Update `User` interface in `src/types/index.ts`**
  Add `bonusBalance: number`, `isPremium: boolean`, `ordersCompletedCount: number`, and expand `loyaltyTier: 'Regular' | 'Silver' | 'Gold' | 'Platinum'`.
- [ ] **Step 2: Update `PricingBreakdown` in `src/types/index.ts`**
  Add `welcomeDiscount: number`, `bonusDeduction: number`, and `cashOrWalletPayable: number`.
- [ ] **Step 3: Update mock customer in `src/data/mockData.ts`**
  Sync existing default mock customers with the new fields (`bonusBalance: 0`, `isPremium: false`, `ordersCompletedCount: 0`, `loyaltyTier: 'Regular'`).
- [ ] **Step 4: Verify TypeScript compilation**
  Run `bun run build` to verify no type breaks.

---

### Task 2: Tiered Top-Up Bonus & Split Wallet in `src/context/AppContext.tsx`

**Files:**
- Modify: `src/context/AppContext.tsx:100-145` (Default customer)
- Modify: `src/context/AppContext.tsx:40-98` (Context interface)
- Modify: `src/context/AppContext.tsx:210-250` (Login and signup handlers)
- Modify: `src/context/AppContext.tsx:375-430` (addFundsToWallet & upgradeToPremium)

**Interfaces:**
- Consumes: `User` and `PricingBreakdown` from Task 1.
- Produces: `calculateTopUpBonus(amount: number) -> number`
- Produces: `addFundsToWallet(amount: number) -> void` (deposits real + credits tiered bonus)
- Produces: `upgradeToPremium() -> void` (awards ₹500 bonus + VIP status)
- Produces: `isPremiumModalOpen`, `setIsPremiumModalOpen`

- [ ] **Step 1: Implement `calculateTopUpBonus(amount: number)` helper**
  - `< 500`: `0`
  - `>= 500 && < 1000`: `Math.round(amount * 0.05)`
  - `>= 1000 && < 5000`: `Math.round(amount * 0.07)`
  - `>= 5000`: `Math.round(amount * 0.20)`
- [ ] **Step 2: Update `addFundsToWallet` to credit real and bonus balances**
  Deposit `amount` to `walletBalance`, compute bonus and add to `bonusBalance`.
- [ ] **Step 3: Implement `upgradeToPremium()`**
  Sets `isPremium = true`, adds `500` to `bonusBalance`, updates `loyaltyTier = 'Silver'` if previously Regular.
- [ ] **Step 4: Update new customer initialization**
  Set newly registered user defaults to 0 wallet, 0 bonus, not premium, Regular tier.
- [ ] **Step 5: Verify build**
  Run `bun run build`.

---

### Task 3: 10% Bonus Cap & ₹200 First-Orders Discount in `BookingModal.tsx`

**Files:**
- Modify: `src/components/modals/BookingModal.tsx:65-105` (Pricing calculation)
- Modify: `src/components/modals/BookingModal.tsx:340-450` (Step 3 & 4 summary breakdown)

**Interfaces:**
- Consumes: `currentUser.bonusBalance`, `currentUser.ordersCompletedCount`, `currentUser.walletBalance` from Task 2.
- Produces: Live checkout pricing breakdown displaying ₹200 welcome voucher and 10% bonus cap.

- [ ] **Step 1: Compute Welcome Discount**
  If `currentUser?.ordersCompletedCount < 5`, `welcomeDiscount = Math.min(200, subtotalBeforeDiscount)`.
- [ ] **Step 2: Compute 10% Max Bonus Deduction**
  `maxBonusAllowed = Math.floor(Math.min((currentUser?.bonusBalance || 0) * 0.10, remainingSubtotal * 0.10))`.
- [ ] **Step 3: Update Step 3 (Price Breakdown) UI**
  Display lines:
  - "First 5 Orders Welcome Voucher (-₹200)" with a gold badge.
  - "Club Bonus Deduction (Max 10% Cap: -₹X)".
  - "Payable via Real Deposit / UPI / Card: ₹Y".
- [ ] **Step 4: Update Order Dispatch & Balance Settlement**
  In `handleConfirmAndPay`:
  - Deduct bonus deduction from `currentUser.bonusBalance`.
  - Deduct real wallet amount from `currentUser.walletBalance` (if paying with wallet).
  - Increment `ordersCompletedCount`.
  - Award +100 loyalty points.
- [ ] **Step 5: Verify build**
  Run `bun run build`.

---

### Task 4: Priority Queue & Loyalty Tier Dispatch ETA

**Files:**
- Modify: `src/components/modals/BookingModal.tsx:140-190`
- Modify: `src/context/AppContext.tsx:410-440` (`triggerInstantBooking`)
- Modify: `src/components/sections/LiveTrackingSection.tsx:50-85`

**Interfaces:**
- Consumes: `currentUser.loyaltyTier` and `currentUser.loyaltyPoints`.
- Produces: Dynamic ETA calculation (Regular: 30m, Silver: 18m, Gold: 10m, Platinum: 5m).

- [ ] **Step 1: Implement tier-based dispatch ETA calculator**
  Map tier to arrival ETA:
  - Regular: 30–35 min
  - Silver: 18–20 min
  - Gold: 10–12 min
  - Platinum: 5–7 min
- [ ] **Step 2: Display Priority Queue status badge in booking modal**
  Show active queue speed chip based on current tier.
- [ ] **Step 3: Update `triggerInstantBooking` telemetry**
  Seed live tracking telemetry with the tier-adjusted ETA.
- [ ] **Step 4: Verify build**
  Run `bun run build`.

---

### Task 5: Build `PremiumUpgradeModal.tsx` & Dashboard Integration

**Files:**
- Create: `src/components/modals/PremiumUpgradeModal.tsx`
- Modify: `src/app/page.tsx:165-175` (Mount modal)
- Modify: `src/components/dashboards/CustomerDashboardView.tsx:150-210` (Wallet tab & VIP badge)
- Modify: `src/app/register/page.tsx:60-100` (Post-signup trigger)

**Interfaces:**
- Consumes: `upgradeToPremium`, `isPremiumModalOpen`, `setIsPremiumModalOpen` from `AppContext`.
- Produces: Modal with VIP benefits, instant ₹500 credit trigger, and confetti celebration.

- [ ] **Step 1: Create `src/components/modals/PremiumUpgradeModal.tsx`**
  Luxury modal showcasing:
  - ₹500 Instant Welcome Bonus Credits
  - Express Priority Queue (Save up to 25 mins per arrival)
  - 10% Extra Cashback on all services
  - 1-Click "Activate HomeEase Premium" button triggering `upgradeToPremium()` with confetti.
- [ ] **Step 2: Mount `PremiumUpgradeModal` in `src/app/page.tsx`**
- [ ] **Step 3: Update `CustomerDashboardView.tsx` Wallet Tab**
  Display distinct cards for:
  - **Real Deposit Balance**: 100% usable on any booking.
  - **Promotional Bonus Balance**: Shows "10% per booking rule" and active bonus sum.
  - **Top-Up Calculator**: Interactive input previewing the +5% / +7% / +20% bonus in real time before depositing.
  - **Become Premium Banner** if `!currentUser.isPremium`.
- [ ] **Step 4: Update `src/app/register/page.tsx`**
  After registration, log the user in as a Regular tier customer and trigger `setIsPremiumModalOpen(true)`.
- [ ] **Step 5: Verify build**
  Run `bun run build`.

---

### Task 6: End-to-End Verification & Verification Gate

**Files:**
- Test scripts & browser endpoint tests

- [ ] **Step 1: Test `bun run build`** (Verify 0 TypeScript/Turbopack errors)
- [ ] **Step 2: Test Registration & Regular Tier Defaults**
  Create account → verify 0 wallet, 0 bonus, Regular tier, and Premium modal trigger.
- [ ] **Step 3: Test Wallet Top-Up Tiered Bonuses**
  Deposit ₹600 → verify ₹30 bonus (5%). Deposit ₹2,000 → verify ₹140 bonus (7%). Deposit ₹5,000 → verify ₹1,000 bonus (20%).
- [ ] **Step 4: Test Checkout Discounts**
  Book service → verify ₹200 Welcome Voucher applied, and bonus deduction capped at 10% of bonus balance.
- [ ] **Step 5: Test Priority Queue Dispatch**
  Verify ETA matches customer's tier.
