import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScheduleAppointmentBar from '@/components/ScheduleAppointmentBar';
import PageTransition from '@/components/PageTransition';
import ScrollProgress from '@/components/ScrollProgress';
import MobileQuickActions from '@/components/MobileQuickActions';

// Dynamically import ParticleBackground - it's heavy and optional for UX
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
  ssr: false,
  loading: () => null,
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Haines City Dental | Your Smile, Our Priority',
  description: 'Experience modern dental care with state-of-the-art technology and compassionate service. We\'re dedicated to creating beautiful, healthy smiles for the entire family.',
  keywords: ['dental', 'dentist', 'Haines City', 'Florida', 'cosmetic dentistry', 'family dentistry', 'implants', 'teeth whitening', 'dental care'],
  authors: [{ name: 'Haines City Dental' }],
  creator: 'Haines City Dental',
  publisher: 'Haines City Dental',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: 'Haines City Dental | Your Smile, Our Priority',
    description: 'Experience modern dental care with state-of-the-art technology and compassionate service.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Haines City Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haines City Dental | Your Smile, Our Priority',
    description: 'Experience modern dental care with state-of-the-art technology and compassionate service.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0ea5e9',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} min-h-screen relative antialiased`}>
        {/* Skip Navigation Link for Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-dental-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dental-blue-500"
        >
          Skip to main content
        </a>

        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Background gradient overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-dental-blue-50/30 to-white pointer-events-none" />
        
        {/* Scroll Progress Indicator */}
        <ScrollProgress />
        
        {/* Header */}
        <Header />
        
        {/* Schedule Appointment Bar */}
        <ScheduleAppointmentBar />
        
        {/* Main Content with Page Transitions */}
        <PageTransition>
          <main id="main-content" className="relative min-h-screen pb-20 md:pb-0">
            {children}
          </main>
        </PageTransition>
        
        {/* Footer */}
        <Footer />
        
        {/* Mobile Quick Actions - Fixed bottom bar for mobile */}
        <MobileQuickActions />
      </body>
    </html>
  );
}
