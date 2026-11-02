import { describe, expect, it } from 'bun:test';
import { calculateTopUpBonus, calculateCheckoutDiscounts, getTierETA, LoyaltyTier } from '../src/utils/pricingAndTiers';
import { User } from '../src/types';

describe('E2E Customer Lifecycle & Split Wallet System', () => {
  it('initializes standard registered customer with 0 balance and Regular tier', () => {
    const newUser: User = {
      id: 'cust-101',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98111 22233',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      walletBalance: 0,
      bonusBalance: 0,
      isPremium: false,
      ordersCompletedCount: 0,
      loyaltyTier: 'Regular',
      loyaltyPoints: 0,
      referralCode: 'PRIYA-NEW',
    };

    expect(newUser.walletBalance).toBe(0);
    expect(newUser.bonusBalance).toBe(0);
    expect(newUser.isPremium).toBe(false);
    expect(newUser.ordersCompletedCount).toBe(0);
    expect(newUser.loyaltyTier).toBe('Regular');
    expect(getTierETA(newUser.loyaltyTier)).toBe(30);
  });

  it('correctly simulates VIP Upgrade giving ₹500 bonus credits and Silver priority queue', () => {
    const user: User = {
      id: 'cust-102',
      name: 'Rohan Gupta',
      email: 'rohan@example.com',
      phone: '+91 98222 33344',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      walletBalance: 100,
      bonusBalance: 0,
      isPremium: false,
      ordersCompletedCount: 0,
      loyaltyTier: 'Regular',
      loyaltyPoints: 0,
      referralCode: 'ROHAN-VIP',
    };

    // Upgrade to Premium
    const upgradedUser: User = {
      ...user,
      isPremium: true,
      bonusBalance: user.bonusBalance + 500,
      loyaltyTier: user.loyaltyTier === 'Regular' ? 'Silver' : user.loyaltyTier,
      loyaltyPoints: Math.max(user.loyaltyPoints, 500),
    };

    expect(upgradedUser.isPremium).toBe(true);
    expect(upgradedUser.bonusBalance).toBe(500);
    expect(upgradedUser.walletBalance).toBe(100); // Existing deposit untouched
    expect(upgradedUser.loyaltyTier).toBe('Silver');
    expect(getTierETA(upgradedUser.loyaltyTier)).toBe(18); // 18m express arrival
  });

  it('correctly applies tiered top-up bonuses and updates wallet balance', () => {
    let wallet = 0;
    let bonus = 0;

    // Top up ₹600 (5% tier)
    let deposit = 600;
    let bonusEarned = calculateTopUpBonus(deposit);
    wallet += deposit;
    bonus += bonusEarned;
    expect(bonusEarned).toBe(30);
    expect(wallet).toBe(600);
    expect(bonus).toBe(30);

    // Top up ₹2,000 (7% tier)
    deposit = 2000;
    bonusEarned = calculateTopUpBonus(deposit);
    wallet += deposit;
    bonus += bonusEarned;
    expect(bonusEarned).toBe(140);
    expect(wallet).toBe(2600);
    expect(bonus).toBe(170);

    // Top up ₹5,000 (20% tier)
    deposit = 5000;
    bonusEarned = calculateTopUpBonus(deposit);
    wallet += deposit;
    bonus += bonusEarned;
    expect(bonusEarned).toBe(1000);
    expect(wallet).toBe(7600);
    expect(bonus).toBe(1170);
  });

  it('executes 5 orders with ₹200 voucher and 10% bonus cap, removing voucher on 6th order', () => {
    let completedOrders = 0;
    let bonusBalance = 500;
    const serviceFee = 800; // Subtotal for each order

    for (let i = 0; i < 5; i++) {
      const { welcomeDiscount, bonusDeduction, netPayableSubtotal } = calculateCheckoutDiscounts({
        subtotal: serviceFee,
        ordersCompletedCount: completedOrders,
        bonusBalance,
      });

      expect(welcomeDiscount).toBe(200); // ₹200 off
      const remainingAfterWelcome = serviceFee - 200; // 600
      // 10% of bonus balance (50) vs 10% of remaining (60) => 50
      expect(bonusDeduction).toBe(Math.floor(Math.min(bonusBalance * 0.10, remainingAfterWelcome * 0.10)));
      expect(netPayableSubtotal).toBe(remainingAfterWelcome - bonusDeduction);

      bonusBalance -= bonusDeduction;
      completedOrders++;
    }

    expect(completedOrders).toBe(5);

    // 6th Order: First 5 orders completed, welcome discount must be 0
    const sixthOrder = calculateCheckoutDiscounts({
      subtotal: serviceFee,
      ordersCompletedCount: completedOrders,
      bonusBalance,
    });

    expect(sixthOrder.welcomeDiscount).toBe(0);
    expect(sixthOrder.bonusDeduction).toBe(Math.floor(Math.min(bonusBalance * 0.10, serviceFee * 0.10)));
  });
});
