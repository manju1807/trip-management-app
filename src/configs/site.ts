import { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

// Font configurations
export const inter = localFont({
  src: [
    {
      path: '../app/fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
      style: 'normal',
    },
    {
      path: '../app/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  fallback: ['system-ui', 'sans-serif'],
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

// Site configuration
export const siteConfig = {
  url: 'https://voyagerpro.netlify.app/',
  name: 'Voyager Pro',
  title: 'Voyager Pro: Advanced Fleet Management & Logistics Dashboard',
  description:
    'Comprehensive fleet management solution offering real-time vehicle tracking, driver management, trip monitoring, and detailed analytics. Perfect for logistics operations and transportation businesses.',
  keywords:
    'fleet management, logistics dashboard, real-time tracking, vehicle management, driver tracking, trip monitoring, fuel management, maintenance tracking, route optimization, driver safety, fleet analytics, transportation management, logistics operations, fleet tracking software, driver performance metrics, vehicle maintenance, trip reporting, fleet efficiency, logistics automation, fleet safety',
  author: 'Manjunath R',
  category: 'Transportation & Logistics',
  ogImage: 'opengraph-image.png',
  icons: {
    // Basic favicon
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', size: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', size: '32x32', type: 'image/png' },
    ],
    // Apple Touch Icons
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        size: '180x180',
        type: 'image/png',
      },
      {
        url: '/icons/android-chrome-192x192.png',
        size: '192x192',
        type: 'image/png',
      },
      {
        url: '/icons/android-chrome-512x512.png',
        size: '512x512',
        type: 'image/png',
      },
    ],
    // Web manifest
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },
  languages: {
    'en-US': '/en-US',
    'es-ES': '/es-ES',
  },
  twitterHandle: '',
  shortDescription:
    'Advanced fleet management dashboard for real-time tracking, driver management, and comprehensive logistics analytics.',
  features: [
    'Live vehicle tracking and route monitoring',
    'Driver performance and safety analytics',
    'Vehicle maintenance and fuel management',
    'Comprehensive trip planning and tracking',
    'Real-time alerts and notifications',
    'Detailed reporting and analytics',
    'Driver safety and compliance monitoring',
    'Vehicle health and status tracking',
  ],
  targetAudience: [
    'Fleet Managers',
    'Logistics Coordinators',
    'Transportation Companies',
    'Operations Managers',
    'Field Service Managers',
  ],
  fonts: {
    inter,
  },
} as const;

// Construct metadata object from siteConfig
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Advanced Fleet Management & Logistics Dashboard`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/icons/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
      {
        rel: 'android-chrome',
        url: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
  alternates: {
    languages: siteConfig.languages,
    canonical: siteConfig.url,
  },
  authors: [{ name: siteConfig.author }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  applicationName: siteConfig.name,
  category: siteConfig.category,
  other: {
    'application-type': 'Fleet Management Software',
    'target-industry': 'Transportation & Logistics',
    'primary-purpose': 'Fleet Operations Management',
  },
};
