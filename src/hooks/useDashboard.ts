import { getDashboardStats } from '@/services/data';
// hooks/useDashboard.ts
import { useMemo } from 'react';

export const useDashboard = () => {
  return useMemo(() => getDashboardStats(), []);
};
