'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Booking,
  ServiceCategory,
  NotificationItem,
  DocumentVerificationItem,
} from '@/types';
import {
  MOCK_PROVIDERS,
  MOCK_ACTIVE_BOOKING,
  MOCK_NOTIFICATIONS,
  SERVICE_CATEGORIES,
  VERIFICATION_QUEUE_DATA,
} from '@/data/mockData';

export type ActivePersona = 'customer' | 'provider' | 'admin' | 'guest';

interface AppContextType {
  currentUser: User | null;
  activePersona: ActivePersona;
  setActivePersona: (persona: ActivePersona) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  activeBooking: Booking | null;
  setActiveBooking: React.Dispatch<React.SetStateAction<Booking | null>>;
  
  // Theme Toggle
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // Explicit Authentication Gates
  isCustomerLoggedIn: boolean;
  loginAsCustomer: (details?: Partial<User>) => void;
  logoutCustomer: () => void;
  customerProfile: User;
  
  isProviderLoggedIn: boolean;
  loginAsProvider: (details?: Partial<User>) => void;
  logoutProvider: () => void;
  providerProfile: User;
  
  // Modals
  isBookingModalOpen: boolean;
  selectedBookingCategory: ServiceCategory | null;
  selectedBookingSubServiceId: string | null;
  openBookingModal: (category?: ServiceCategory, subServiceId?: string) => void;
  closeBookingModal: () => void;
  bookingFormKey: number; // Increment to force clean refresh of booking engine
  resetBookingEngine: () => void;
  
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: (open: boolean) => void;
  
  isAuthModalOpen: boolean;
  authRole: 'customer' | 'provider' | 'admin';
  openAuthModal: (role?: 'customer' | 'provider' | 'admin') => void;
  closeAuthModal: () => void;
  
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  
  selectedCategoryDetail: ServiceCategory | null;
  openServiceDetail: (category: ServiceCategory) => void;
  closeServiceDetail: () => void;
  
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  
  // Real-time tracking
  isTrackingActive: boolean;
  setIsTrackingActive: (active: boolean) => void;
  updateTrackingProgress: (progress: number) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Verification Queue (Admin)
  verificationQueue: DocumentVerificationItem[];
  updateVerificationStatus: (id: string, status: 'approved' | 'rejected') => void;
  
  // Wallet
  addFundsToWallet: (amount: number) => void;
  
  // City Availability
  isCityUnavailableModalOpen: boolean;
  setIsCityUnavailableModalOpen: (open: boolean) => void;
  unavailableCityName: string;
  setUnavailableCityName: (city: string) => void;
  checkCityAvailability: (city: string) => boolean;
  supportedCities: string[];

  // Fast dispatch simulation
  triggerInstantBooking: (serviceName: string, category: string, price: number) => void;
}

export const SUPPORTED_CITIES = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune'];

const defaultUserCustomer: User = {
  id: 'usr-cust-1',
  name: 'Aarav Singhania',
  email: 'aarav.singhania@luxuryestates.in',
  phone: '+91 98700 88210',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  walletBalance: 4850,
  loyaltyTier: 'Platinum',
  loyaltyPoints: 3420,
  referralCode: 'AARAV-VIP',
  address: {
    id: 'addr-1',
    label: 'Home',
    street: 'Penthouse 24B, Lodha Bellissimo',
    area: 'Worli Sea Face',
    city: 'Mumbai',
    zipCode: '400018',
    latitude: 19.0176,
    longitude: 72.8177,
    isDefault: true,
  },
};

const defaultUserProvider: User = {
  id: 'usr-prov-1',
  name: 'Vikramaditya Sharma',
  email: 'vikram.sharma@homeease-pro.com',
  phone: '+91 98200 12845',
  role: 'provider',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  rating: 4.98,
  walletBalance: 28450,
  loyaltyTier: 'Platinum',
  loyaltyPoints: 8900,
  referralCode: 'VIKRAM-PRO',
};

const defaultUserAdmin: User = {
  id: 'usr-admin-1',
  name: 'Devraj Oberoi (Admin)',
  email: 'devraj@homeease.internal',
  phone: '+91 98000 00001',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  walletBalance: 1250000,
  loyaltyTier: 'Platinum',
  loyaltyPoints: 50000,
  referralCode: 'ADMIN-MASTER',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<ActivePersona>('customer');
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUserCustomer);
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(MOCK_ACTIVE_BOOKING);
  const [isTrackingActive, setIsTrackingActive] = useState<boolean>(true);
  
  // Theme State: 'dark' or 'light' (Light theme default as requested)
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Explicit Authentication Gates (Login required to book/buy services)
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState<boolean>(false);
  const [isProviderLoggedIn, setIsProviderLoggedIn] = useState<boolean>(true);
  const [customerProfile, setCustomerProfile] = useState<User>(defaultUserCustomer);
  const [providerProfile, setProviderProfile] = useState<User>(defaultUserProvider);

  // City Availability
  const [isCityUnavailableModalOpen, setIsCityUnavailableModalOpen] = useState<boolean>(false);
  const [unavailableCityName, setUnavailableCityName] = useState<string>('Dubai');

  // Booking Refresh Key
  const [bookingFormKey, setBookingFormKey] = useState<number>(1);

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedBookingCategory, setSelectedBookingCategory] = useState<ServiceCategory | null>(null);
  const [selectedBookingSubServiceId, setSelectedBookingSubServiceId] = useState<string | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authRole, setAuthRole] = useState<'customer' | 'provider' | 'admin'>('customer');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState<ServiceCategory | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  
  // Verification Queue
  const [verificationQueue, setVerificationQueue] = useState<DocumentVerificationItem[]>(VERIFICATION_QUEUE_DATA);
  
  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Apply theme to document element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'light') {
        root.classList.remove('dark');
        root.classList.add('light');
      } else {
        root.classList.remove('light');
        root.classList.add('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Restore persisted login session from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('homeease_customer_logged_in');
      if (savedAuth === 'true') {
        setIsCustomerLoggedIn(true);
      }
    }
  }, []);

  const loginAsCustomer = (details?: Partial<User>) => {
    const updated = { ...customerProfile, ...details, role: 'customer' as const };
    setCustomerProfile(updated);
    setCurrentUser(updated);
    setIsCustomerLoggedIn(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('homeease_customer_logged_in', 'true');
    }
    setActivePersona('customer');
  };

  const logoutCustomer = () => {
    setIsCustomerLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('homeease_customer_logged_in');
    }
    if (activePersona === 'customer') {
      setCurrentUser(null);
    }
  };

  const loginAsProvider = (details?: Partial<User>) => {
    const updated = { ...providerProfile, ...details, role: 'provider' as const };
    setProviderProfile(updated);
    setCurrentUser(updated);
    setIsProviderLoggedIn(true);
    setActivePersona('provider');
  };

  const logoutProvider = () => {
    setIsProviderLoggedIn(false);
    if (activePersona === 'provider') {
      setCurrentUser(null);
    }
  };

  // Sync persona with user
  useEffect(() => {
    if (activePersona === 'customer') {
      setCurrentUser(isCustomerLoggedIn ? customerProfile : null);
    } else if (activePersona === 'provider') {
      setCurrentUser(isProviderLoggedIn ? providerProfile : null);
    } else if (activePersona === 'admin') {
      setCurrentUser(defaultUserAdmin);
    } else {
      setCurrentUser(null);
    }
  }, [activePersona, isCustomerLoggedIn, isProviderLoggedIn, customerProfile, providerProfile]);

  // Live GPS movement simulation
  useEffect(() => {
    if (!isTrackingActive || !activeBooking) return;

    const interval = setInterval(() => {
      setActiveBooking((prev) => {
        if (!prev) return null;
        const currentProg = prev.tracking.routeProgressPercent;
        if (currentProg >= 98) {
          return {
            ...prev,
            status: 'arrived',
            tracking: {
              ...prev.tracking,
              routeProgressPercent: 100,
              distanceRemainingKm: 0.1,
              etaMinutes: 1,
              currentSpeedKmH: 0,
              lastUpdated: 'Arrived at gate',
            },
          };
        }
        const nextProg = Math.min(98, currentProg + 1.5);
        const remainingKm = Math.max(0.2, (2.1 * (1 - nextProg / 100)).toFixed(1) as unknown as number);
        const eta = Math.max(1, Math.ceil(7 * (1 - nextProg / 100)));
        return {
          ...prev,
          tracking: {
            ...prev.tracking,
            routeProgressPercent: nextProg,
            distanceRemainingKm: Number(remainingKm),
            etaMinutes: eta,
            currentSpeedKmH: Math.floor(28 + Math.random() * 14),
            lastUpdated: 'Just now (GPS active)',
          },
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isTrackingActive, activeBooking]);

  const checkCityAvailability = (city: string): boolean => {
    return SUPPORTED_CITIES.some((c) => c.toLowerCase() === city.toLowerCase());
  };

  const handleSetSelectedCity = (city: string) => {
    if (!checkCityAvailability(city)) {
      setUnavailableCityName(city);
      setIsCityUnavailableModalOpen(true);
      return;
    }
    setSelectedCity(city);
  };

  const resetBookingEngine = () => {
    setBookingFormKey((prev) => prev + 1);
  };

  const openBookingModal = (category?: ServiceCategory, subServiceId?: string) => {
    // ALWAYS dismiss ServiceDetailModal so it never covers or conflicts with the booking flow
    setSelectedCategoryDetail(null);

    if (category) {
      setSelectedBookingCategory(category);
    }
    if (subServiceId) {
      setSelectedBookingSubServiceId(subServiceId);
    }

    // If not logged in as customer, immediately jump to customer login page!
    if (!isCustomerLoggedIn) {
      if (typeof window !== 'undefined') {
        window.location.href = '/customer/login';
      }
      return;
    }

    // Force reset booking engine so it never shows previously completed state!
    setBookingFormKey((prev) => prev + 1);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openAuthModal = (role: 'customer' | 'provider' | 'admin' = 'customer') => {
    setAuthRole(role);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openServiceDetail = (category: ServiceCategory) => {
    setSelectedCategoryDetail(category);
  };

  const closeServiceDetail = () => {
    setSelectedCategoryDetail(null);
  };

  const updateTrackingProgress = (progress: number) => {
    if (!activeBooking) return;
    setActiveBooking({
      ...activeBooking,
      tracking: {
        ...activeBooking.tracking,
        routeProgressPercent: progress,
      },
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const updateVerificationStatus = (id: string, status: 'approved' | 'rejected') => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const addFundsToWallet = (amount: number) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      walletBalance: currentUser.walletBalance + amount,
    };
    setCurrentUser(updated);
    if (currentUser.role === 'customer') {
      setCustomerProfile(updated);
    } else if (currentUser.role === 'provider') {
      setProviderProfile(updated);
    }
  };

  const triggerInstantBooking = (serviceName: string, category: string, price: number) => {
    const newBooking: Booking = {
      id: `HE-BK-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceId: `inst-${Date.now()}`,
      serviceName,
      categoryName: category,
      customerName: currentUser?.name || customerProfile.name,
      customerPhone: currentUser?.phone || customerProfile.phone,
      address: currentUser?.address ? `${currentUser.address.street}, ${currentUser.address.area}, ${currentUser.address.city}` : `${customerProfile.address?.street}, ${customerProfile.address?.area}, ${customerProfile.address?.city}`,
      dateTime: 'Immediate Express Dispatch',
      status: 'en_route',
      provider: MOCK_PROVIDERS[Math.floor(Math.random() * MOCK_PROVIDERS.length)],
      pricing: {
        baseFee: price,
        distanceCost: 45,
        urgencyMultiplier: 1.0,
        difficultyFee: 100,
        subtotal: price + 145,
        discount: 50,
        platformFee: 29,
        tax: Math.round((price + 145) * 0.18),
        total: Math.round(price + 124 + (price + 145) * 0.18),
      },
      tracking: {
        providerLat: 19.076,
        providerLng: 72.8777,
        destLat: 19.0176,
        destLng: 72.8177,
        distanceRemainingKm: 2.1,
        etaMinutes: 7,
        currentSpeedKmH: 34,
        routeProgressPercent: 15,
        lastUpdated: 'Just dispatched',
      },
      paymentMethod: 'UPI',
      paymentStatus: 'paid',
      invoiceNumber: `INV-2026-HE-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    setActiveBooking(newBooking);
    setIsTrackingActive(true);
    setIsBookingModalOpen(false);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Provider Dispatched!',
      message: `${newBooking.provider?.name} is en route for ${serviceName}. ETA: 7 mins.`,
      time: 'Just now',
      read: false,
      type: 'booking',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activePersona,
        setActivePersona,
        selectedCity,
        setSelectedCity: handleSetSelectedCity,
        isCityUnavailableModalOpen,
        setIsCityUnavailableModalOpen,
        unavailableCityName,
        setUnavailableCityName,
        checkCityAvailability,
        supportedCities: SUPPORTED_CITIES,
        activeBooking,
        setActiveBooking,
        theme,
        toggleTheme,
        isCustomerLoggedIn,
        loginAsCustomer,
        logoutCustomer,
        customerProfile,
        isProviderLoggedIn,
        loginAsProvider,
        logoutProvider,
        providerProfile,
        isBookingModalOpen,
        selectedBookingCategory,
        selectedBookingSubServiceId,
        openBookingModal,
        closeBookingModal,
        bookingFormKey,
        resetBookingEngine,
        isPricingModalOpen,
        setIsPricingModalOpen,
        isAuthModalOpen,
        authRole,
        openAuthModal,
        closeAuthModal,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        selectedCategoryDetail,
        openServiceDetail,
        closeServiceDetail,
        isVideoModalOpen,
        setIsVideoModalOpen,
        isTrackingActive,
        setIsTrackingActive,
        updateTrackingProgress,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        verificationQueue,
        updateVerificationStatus,
        addFundsToWallet,
        triggerInstantBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
