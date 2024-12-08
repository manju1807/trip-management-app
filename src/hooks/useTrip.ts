import { getTripWithDetails } from '@/services';
// hooks/useTrip.ts
import { useMemo } from 'react';

export const useTrip = (tripId: number) => {
  return useMemo(() => getTripWithDetails(tripId), [tripId]);
};
