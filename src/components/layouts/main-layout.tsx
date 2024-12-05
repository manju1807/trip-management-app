// MainLayout.tsx
'use client';

import React, { type ReactNode, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Navbar from './navbar/navbar';
import DesktopSidebar from './sidebar/desktop-sidebar';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  MainLayoutProps,
} from '@/types/';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Type-safe error logging
    console.error({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center h-screen p-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="mt-2">
              {this.state.error?.message ||
                'An unexpected error occurred in the application layout.'}
            </AlertDescription>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

const LoadingFallback = (): JSX.Element => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const MainLayout = ({
  children,
  initialPinned = true,
}: MainLayoutProps): JSX.Element => {
  // Use discriminated union type for state management
  type PinnedState = {
    pinned: boolean;
    isTransitioning: boolean;
  };

  const [pinnedState, setPinnedState] = useState<PinnedState>({
    pinned: initialPinned,
    isTransitioning: false,
  });

  const handlePinned = (): void => {
    setPinnedState((prev) => ({
      pinned: !prev.pinned,
      isTransitioning: true,
    }));

    // Reset transition state after animation
    setTimeout(() => {
      setPinnedState((prev) => ({
        ...prev,
        isTransitioning: false,
      }));
    }, 300); // Match duration-300 from Tailwind
  };

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingFallback />}>
        <main className="h-full bg-background max-h-[100dvh] max-w-[100dvw] overflow-hidden">
          <div className="relative flex h-full">
            <div
              className={`
                h-full shadow-xl hidden md:flex
                ${pinnedState.pinned ? 'relative' : 'absolute'}
                ${pinnedState.isTransitioning ? 'transition-all duration-300' : ''}
              `}
            >
              <DesktopSidebar
                isPinned={pinnedState.pinned}
                onPinChange={handlePinned}
              />
            </div>
            <div
              className={`
                flex flex-col flex-1 transition-all
                duration-300 max-w-[86rem] overflow-clip, mx-auto py-2
              `}
            >
              <Navbar />
              {children}
            </div>
          </div>
        </main>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default MainLayout;
