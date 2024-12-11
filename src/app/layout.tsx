import './globals.css';
import { Providers } from '@/app/providers/tanstack-provider';
import { metadata, siteConfig, viewport } from '@/configs/site';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${siteConfig.fonts.inter.className} antialiased min-h-screen w-full h-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
