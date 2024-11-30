import { getTripWithDetails } from '@/services/data';
// hooks/useTrip.ts
import { useMemo } from 'react';

export const useTrip = (tripId: number) => {
  return useMemo(() => getTripWithDetails(tripId), [tripId]);
};
