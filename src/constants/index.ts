// constants/index.ts
import { IdleReportsMock } from './idle-reports';
import { VehicleMaintenanceMock } from './maintenance-reports';
import { SpeedReportsMock } from './speed-reports';
import { TripsMock } from './trips';

// You can also create helper functions here
export const getDriverTrips = (driverId: number) => {
  return TripsMock.filter((trip) => trip.driver === driverId);
};

export const getVehicleTrips = (vehicleId: number) => {
  return TripsMock.filter((trip) => trip.vehicle === vehicleId);
};

export const getTripReports = (tripId: number) => {
  return {
    speed: SpeedReportsMock.filter((report) => report.trip === tripId),
    idle: IdleReportsMock.filter((report) => report.trip === tripId),
    fuel: IdleReportsMock.filter((report) => report.trip === tripId),
    maintenance: VehicleMaintenanceMock.filter(
      (report) => report.trip === tripId
    ),
  };
};
