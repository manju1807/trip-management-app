import { getVehicleWithCurrentTrip } from '@/services';
// hooks/useVehicle.ts
import { useMemo } from 'react';

export const useVehicle = (vehicleId: number) => {
  return useMemo(() => getVehicleWithCurrentTrip(vehicleId), [vehicleId]);
};
