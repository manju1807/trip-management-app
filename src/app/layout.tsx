import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from '@/app/providers/tanstack-provider';
import MainLayout from '@/components/layouts/main-layout';

// Inter Variable Font configuration
const inter = localFont({
  src: [
    {
      path: './fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
      style: 'normal',
    },
    {
      path: './fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Trip Planner',
  description: 'Plan your trips effortlessly with our app!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} antialiased min-h-screen bg-background`}
      >
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
