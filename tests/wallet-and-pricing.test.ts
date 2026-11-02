import { describe, expect, it } from 'bun:test';
import { calculateTopUpBonus, calculateCheckoutDiscounts, getTierETA } from '../src/utils/pricingAndTiers';

describe('Tiered Top-Up Bonus Calculations', () => {
  it('awards 0% bonus for deposits under ₹500', () => {
    expect(calculateTopUpBonus(0)).toBe(0);
    expect(calculateTopUpBonus(100)).toBe(0);
    expect(calculateTopUpBonus(499)).toBe(0);
  });

  it('awards 5% bonus for deposits between ₹500 and ₹999', () => {
    expect(calculateTopUpBonus(500)).toBe(25);
    expect(calculateTopUpBonus(600)).toBe(30);
    expect(calculateTopUpBonus(999)).toBe(50);
  });

  it('awards 7% bonus for deposits between ₹1,000 and ₹4,999', () => {
    expect(calculateTopUpBonus(1000)).toBe(70);
    expect(calculateTopUpBonus(2000)).toBe(140);
    expect(calculateTopUpBonus(4999)).toBe(350);
  });

  it('awards 20% bonus for deposits of ₹5,000 and above', () => {
    expect(calculateTopUpBonus(5000)).toBe(1000);
    expect(calculateTopUpBonus(6000)).toBe(1200);
    expect(calculateTopUpBonus(10000)).toBe(2000);
  });
});

describe('Checkout Discounts & 10% Bonus Cap', () => {
  it('gives ₹200 off for customers on their first 5 orders', () => {
    const discounts0 = calculateCheckoutDiscounts({
      subtotal: 1000,
      ordersCompletedCount: 0,
      bonusBalance: 0,
    });
    expect(discounts0.welcomeDiscount).toBe(200);

    const discounts4 = calculateCheckoutDiscounts({
      subtotal: 1000,
      ordersCompletedCount: 4,
      bonusBalance: 0,
    });
    expect(discounts4.welcomeDiscount).toBe(200);

    const discounts5 = calculateCheckoutDiscounts({
      subtotal: 1000,
      ordersCompletedCount: 5,
      bonusBalance: 0,
    });
    expect(discounts5.welcomeDiscount).toBe(0);
  });

  it('caps bonus deduction at 10% of bonus balance and 10% of remaining order subtotal', () => {
    // Subtotal 1000, welcome discount 200 => net subtotal 800.
    // Bonus balance = 500. 10% of bonus balance = 50. 10% of 800 = 80.
    // Max bonus deduction should be min(50, 80) = 50.
    const result1 = calculateCheckoutDiscounts({
      subtotal: 1000,
      ordersCompletedCount: 0,
      bonusBalance: 500,
    });
    expect(result1.welcomeDiscount).toBe(200);
    expect(result1.bonusDeduction).toBe(50);
    expect(result1.netPayableSubtotal).toBe(750);

    // Case where bonus balance is high (e.g. 5000), but net subtotal is only 400.
    // 10% of bonus = 500. 10% of net subtotal = 40.
    // Max bonus deduction = min(500, 40) = 40.
    const result2 = calculateCheckoutDiscounts({
      subtotal: 600,
      ordersCompletedCount: 0,
      bonusBalance: 5000,
    });
    expect(result2.welcomeDiscount).toBe(200);
    expect(result2.bonusDeduction).toBe(40);
    expect(result2.netPayableSubtotal).toBe(360);
  });
});

describe('Priority Queue Dispatch ETA by Tier', () => {
  it('returns faster dispatch times for higher loyalty tiers', () => {
    expect(getTierETA('Regular')).toBe(30);
    expect(getTierETA('Silver')).toBe(18);
    expect(getTierETA('Gold')).toBe(10);
    expect(getTierETA('Platinum')).toBe(5);
  });
});
