/**
 * Financial calculation utilities for tiered top-ups, split wallet rules,
 * welcome vouchers, and loyalty priority queue ETAs.
 */

export type LoyaltyTier = 'Regular' | 'Silver' | 'Gold' | 'Platinum';

/**
 * Calculates tiered top-up bonus credits based on deposit amount:
 * - < ₹500: 0%
 * - ₹500 to ₹999: 5%
 * - ₹1,000 to ₹4,999: 7%
 * - ₹5,000+: 20%
 */
export function calculateTopUpBonus(amount: number): number {
  if (amount < 500) {
    return 0;
  }
  if (amount < 1000) {
    return Math.round(amount * 0.05);
  }
  if (amount < 5000) {
    return Math.round(amount * 0.07);
  }
  return Math.round(amount * 0.20);
}

export interface CheckoutDiscountParams {
  subtotal: number;
  ordersCompletedCount: number;
  bonusBalance: number;
}

export interface CheckoutDiscountResult {
  welcomeDiscount: number;
  bonusDeduction: number;
  netPayableSubtotal: number;
}

/**
 * Computes checkout discounts:
 * 1. ₹200 off for the first 5 orders (ordersCompletedCount < 5).
 * 2. Club bonus deduction capped at max 10% of user bonus balance AND max 10% of remaining order subtotal.
 */
export function calculateCheckoutDiscounts({
  subtotal,
  ordersCompletedCount,
  bonusBalance,
}: CheckoutDiscountParams): CheckoutDiscountResult {
  const isWelcomeOfferApplicable = ordersCompletedCount < 5;
  const welcomeDiscount = isWelcomeOfferApplicable ? Math.min(200, subtotal) : 0;
  const remainingAfterWelcome = Math.max(0, subtotal - welcomeDiscount);

  // Bonus deduction rule: Max 10% of current bonus balance AND max 10% of remaining subtotal
  const maxBonusAllowedFromBalance = Math.floor(Math.max(0, bonusBalance) * 0.10);
  const maxBonusAllowedFromSubtotal = Math.floor(remainingAfterWelcome * 0.10);
  const bonusDeduction = Math.min(maxBonusAllowedFromBalance, maxBonusAllowedFromSubtotal);

  const netPayableSubtotal = Math.max(0, remainingAfterWelcome - bonusDeduction);

  return {
    welcomeDiscount,
    bonusDeduction,
    netPayableSubtotal,
  };
}

/**
 * Returns dynamic arrival ETA in minutes based on loyalty tier:
 * - Regular: 30 minutes
 * - Silver: 18 minutes
 * - Gold: 10 minutes
 * - Platinum: 5 minutes
 */
export function getTierETA(tier: LoyaltyTier = 'Regular'): number {
  switch (tier) {
    case 'Platinum':
      return 5;
    case 'Gold':
      return 10;
    case 'Silver':
      return 18;
    case 'Regular':
    default:
      return 30;
  }
}
