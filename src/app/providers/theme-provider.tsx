// src/providers/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Get theme from localStorage or system preference
    const theme =
      localStorage.getItem('trip-planner-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');

    // Apply theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="trip-planner-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
