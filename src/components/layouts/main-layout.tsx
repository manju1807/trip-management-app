// MainLayout.tsx
'use client';
import React, { type ReactNode, useState } from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Navbar from './navbar/navbar';
import DesktopSidebar from './sidebar/desktop-sidebar';
import { MainLayoutProps } from '@/types/';
import { ScrollArea } from '../ui/scroll-area';

const DefaultErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {error.message || 'An unexpected error occurred in the application.'}
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <Button
          variant="default"
          className="w-full flex items-center justify-center space-x-2"
          onClick={resetErrorBoundary}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => (window.location.href = '/')}
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          If this problem persists, please contact support
        </p>
      </div>
    </div>
  </div>
);

const LoadingFallback = (): JSX.Element => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const ErrorBoundaryWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const onError = (error: Error, info: React.ErrorInfo): void => {
    console.error({
      error: error.message,
      stack: error.stack,
      componentStack: info.componentStack || 'No component stack available',
    });
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={DefaultErrorFallback}
      onError={onError}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
};

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

    setTimeout(() => {
      setPinnedState((prev) => ({
        ...prev,
        isTransitioning: false,
      }));
    }, 300);
  };

  return (
    <ErrorBoundaryWrapper>
      <React.Suspense fallback={<LoadingFallback />}>
        <main className="h-full bg-background md:max-h-[100dvh] max-w-[100dvw] overflow-y-auto md:overflow-hidden">
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
                  duration-300 max-w-[100dvw] md:max-w-[86rem] overflow-y-auto md:overflow-clip mx-auto py-2
                  `}
            >
              <Navbar />
              <ScrollArea>{children}</ScrollArea>
            </div>
          </div>
        </main>
      </React.Suspense>
    </ErrorBoundaryWrapper>
  );
};

export default MainLayout;
