import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jvurkzyprjrjikgpmolo.supabase.co';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_s2FdLk6MJjvRD00RuvpzNA__1vWuiiZ';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Cloud Database Helper Functions for Multi-Device Sync

export interface CloudProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  wallet_balance: number;
  bonus_balance: number;
  is_premium: boolean;
  loyalty_tier: string;
  orders_completed_count: number;
}

/**
 * Fetch profile by phone or email across any device
 */
export async function fetchCloudProfile(identifier: string) {
  try {
    const isEmail = identifier.includes('@');
    const query = supabase.from('profiles').select('*');
    const { data, error } = isEmail
      ? await query.eq('email', identifier).single()
      : await query.eq('phone', identifier).single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Save or update customer/provider profile in cloud
 */
export async function syncCloudProfile(profile: Partial<CloudProfile>) {
  try {
    if (!profile.phone && !profile.email) return null;

    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          ...profile,
          updated_at: new Date().toISOString(),
        },
        { onConflict: profile.email ? 'email' : 'phone' }
      )
      .select()
      .single();

    if (error) {
      console.warn('Supabase sync warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Cloud sync error:', err);
    return null;
  }
}

/**
 * Save booking into Supabase so providers and customers see it across devices
 */
export async function saveCloudBooking(booking: Record<string, unknown>) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.warn('Supabase booking warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Cloud booking error:', err);
    return null;
  }
}
