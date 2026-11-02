import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Sora } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'HomeEase — Trusted Home Services at Your Fingertips | Premium 3D Marketplace',
  description:
    'Experience next-generation home services. Book certified professionals for plumbing, electrical, AC, cleaning, and renovation with real-time GPS tracking, transparent dynamic pricing, and luxury guarantees.',
  keywords: [
    'home services',
    'plumber',
    'electrician',
    'AC repair',
    'cleaning',
    'luxury home care',
    'Uber for home services',
    'HomeEase',
    'verified technicians',
  ],
  authors: [{ name: 'HomeEase Global' }],
  icons: {
    icon: [
      { url: '/images/homeease-icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'HomeEase — Trusted Home Services at Your Fingertips',
    description: 'Instant booking, live Uber-style tracking, and verified certified technicians.',
    siteName: 'HomeEase',
    images: [
      {
        url: '/images/homeease-full-logo.png',
        width: 1015,
        height: 860,
        alt: 'HomeEase Logo',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${sora.variable} h-full antialiased light`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-[#D4AF37] selection:text-white overflow-x-hidden transition-colors duration-200"
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
