import { getDriverWithCurrentTrip } from '@/services';
// hooks/useDriver.ts
import { useMemo } from 'react';

export const useDriver = (driverId: number) => {
  return useMemo(() => getDriverWithCurrentTrip(driverId), [driverId]);
};
