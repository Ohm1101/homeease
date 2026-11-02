export type UserRole = 'customer' | 'provider' | 'admin' | 'guest';

export interface SceneStep {
  id: number;
  triggerProgress: number; // 0.0 to 1.0
  title: string;
  subtitle: string;
  category: string;
  description: string;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  mode?: 'logo' | 'city' | 'villa' | 'gate' | 'living' | 'kitchen' | 'bathroom' | 'bedroom' | 'ac_zoom' | 'xray' | 'scan' | 'services' | 'network' | 'matching' | 'pricing' | 'booking' | 'tracking' | 'complete' | 'before_after' | 'reviews' | 'mobile' | 'dashboards' | 'gold' | 'smart_city' | 'final';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  rating?: number;
  walletBalance: number;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum';
  loyaltyPoints: number;
  referralCode: string;
  address?: Address;
}

export interface Address {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  street: string;
  area: string;
  city: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  startingPrice: number;
  avgTime: string;
  rating: number;
  reviewsCount: number;
  providersCount: number;
  badge?: string;
  color: string;
  subServices: SubService[];
  commonIssues: string[];
}

export interface SubService {
  id: string;
  title: string;
  price: number;
  estimatedMinutes: number;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  category: string;
  services: string[];
  experienceYears: number;
  jobsCompleted: number;
  trustScore: number;
  isVerified: boolean;
  verificationBadges: {
    govtId: boolean;
    address: boolean;
    policeVerified: boolean;
    skillCertified: boolean;
    backgroundCheck: boolean;
  };
  distanceKm: number;
  etaMinutes: number;
  vehicle: string;
  vehicleNumber: string;
  phone: string;
  hourlyRate: number;
  location: {
    lat: number;
    lng: number;
  };
  portfolioPhotos: string[];
}

export type BookingStatus =
  | 'searching'
  | 'confirmed'
  | 'en_route'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  categoryName: string;
  customerName: string;
  customerPhone: string;
  address: string;
  dateTime: string;
  status: BookingStatus;
  provider?: Provider;
  issueDescription?: string;
  issuePhotoUrl?: string;
  pricing: PricingBreakdown;
  tracking: TrackingSession;
  paymentMethod: 'UPI' | 'Card' | 'Wallet' | 'NetBanking' | 'Cash';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  invoiceNumber: string;
  createdAt: string;
  rating?: number;
  reviewComment?: string;
}

export interface PricingBreakdown {
  baseFee: number;
  distanceCost: number;
  urgencyMultiplier: number;
  difficultyFee: number;
  subtotal: number;
  discount: number;
  platformFee: number;
  tax: number; // 18% GST
  total: number;
}

export interface TrackingSession {
  providerLat: number;
  providerLng: number;
  destLat: number;
  destLng: number;
  distanceRemainingKm: number;
  etaMinutes: number;
  currentSpeedKmH: number;
  routeProgressPercent: number;
  lastUpdated: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerLocation: string;
  avatar: string;
  serviceUsed: string;
  rating: number;
  date: string;
  quote: string;
  hasVideo: boolean;
  videoThumb?: string;
  videoDuration?: string;
  verifiedBooking: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  highlightColor: string;
  features: string[];
  discountPercentage: number;
  emergencyFeeWaiver: boolean;
  priorityDispatchMinutes: number;
}

export interface DocumentVerificationItem {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: string;
  docType: 'Aadhaar / National ID' | 'Trade Certificate' | 'Police Clearance' | 'Driving License';
  docNumber: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  docPreviewUrl: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastMessage: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'payment' | 'security' | 'promo';
}
