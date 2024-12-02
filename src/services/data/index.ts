import type {
  Driver,
  FuelInfo,
  GpsData,
  IdleReport,
  Route,
  SpeedReport,
  Trip,
  Vehicle,
  VehicleMaintenance,
} from '../../types/index';

import { Drivers } from '@/constants/drivers';
import { FuelInfoMock } from '@/constants/fuel-reports';
import { GpsDataMock } from '@/constants/gps-data';
import { IdleReportsMock as IdleReports } from '@/constants/idle-reports';
import { VehicleMaintenanceMock as Maintenance } from '@/constants/maintenance-reports';
import { RoutesMock as Routes } from '@/constants/routes';
import { SpeedReportsMock as SpeedReports } from '@/constants/speed-reports';
import { TripsMock as Trips } from '@/constants/trips';
import { Vehicles } from '@/constants/vehicles';

export const getTripWithDetails = (tripId: number) => {
  const trip = Trips.find((t: Trip) => t.id === tripId);
  if (!trip) {
    return null;
  }

  return {
    ...trip,
    driver: Drivers.find((d: Driver) => d.id === trip.driver),
    vehicle: Vehicles.find((v: Vehicle) => v.id === trip.vehicle),
    route: Routes.find((r: Route) => r.id === trip.route),
    gpsData: GpsDataMock.filter((g: GpsData) => g.driver === trip.driver),
    fuelInfo: FuelInfoMock.filter((f: FuelInfo) => f.trip === trip.id),
    idleReports: IdleReports.filter((i: IdleReport) => i.trip === trip.id),
    speedReports: SpeedReports.filter((s: SpeedReport) => s.trip === trip.id),
    maintenance: Maintenance.filter(
      (m: VehicleMaintenance) => m.trip === trip.id
    ),
  };
};

export const getDriverWithCurrentTrip = (driverId: number) => {
  const driver = Drivers.find((d: Driver) => d.id === driverId);
  if (!driver) {
    return null;
  }

  const currentTrip = Trips.find(
    (t: Trip) => t.driver === driverId && !t.end_time
  );
  return {
    ...driver,
    currentTrip: currentTrip
      ? {
        ...currentTrip,
        vehicle: Vehicles.find((v: Vehicle) => v.id === currentTrip.vehicle),
        route: Routes.find((r: Route) => r.id === currentTrip.route),
      }
      : null,
    gpsData: GpsDataMock.find((g: GpsData) => g.driver === driverId),
  };
};

export const getVehicleWithCurrentTrip = (vehicleId: number) => {
  const vehicle = Vehicles.find((v: Vehicle) => v.id === vehicleId);
  if (!vehicle) {
    return null;
  }

  const currentTrip = Trips.find(
    (t: Trip) => t.vehicle === vehicleId && !t.end_time
  );
  return {
    ...vehicle,
    currentTrip: currentTrip
      ? {
        ...currentTrip,
        driver: Drivers.find((d: Driver) => d.id === currentTrip.driver),
        route: Routes.find((r: Route) => r.id === currentTrip.route),
      }
      : null,
    maintenance: Maintenance.filter(
      (m: VehicleMaintenance) => m.trip === currentTrip?.id
    ).sort(
      (a: VehicleMaintenance, b: VehicleMaintenance) =>
        new Date(b.maintenance_time || 0).getTime() -
        new Date(a.maintenance_time || 0).getTime()
    ),
  };
};

export const getDashboardStats = () => {
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    drivers: {
      total: Drivers.length,
      available: Drivers.length - Trips.filter((t: Trip) => !t.end_time).length,
      onTrip: Trips.filter((t: Trip) => !t.end_time).length,
      offline: GpsDataMock.filter((g: GpsData) => g.signal_strength === 0)
        .length,
    },
    vehicles: {
      total: Vehicles.length,
      available:
        Vehicles.length - Trips.filter((t: Trip) => !t.end_time).length,
      onTrip: Trips.filter((t: Trip) => !t.end_time).length,
      maintenance: Maintenance.filter(
        (m: VehicleMaintenance) =>
          m.maintenance_time && new Date(m.maintenance_time) >= lastWeek
      ).length,
    },
    trips: {
      total: Trips.length,
      inProgress: Trips.filter((t: Trip) => t.start_time && !t.end_time).length,
      scheduled: Trips.filter((t: Trip) => !t.start_time).length,
      completed: Trips.filter((t: Trip) => t.end_time).length,
      delayed: Trips.filter((t: Trip) => {
        if (!t.scheduled_start_time || !t.start_time) {
          return false;
        }
        const diff =
          new Date(t.start_time).getTime() -
          new Date(t.scheduled_start_time).getTime();
        return diff > 15 * 60 * 1000; // 15 minutes delay
      }).length,
    },
    routes: {
      total: Routes.length,
      active: new Set(
        Trips.filter((t: Trip) => !t.end_time).map((t: Trip) => t.route)
      ).size,
    },
  };
};

export const getTripAnalytics = (startDate: Date, endDate: Date) => {
  const relevantTrips = Trips.filter((t: Trip) => {
    const tripDate = new Date(t.created_at);
    return tripDate >= startDate && tripDate <= endDate;
  });

  return {
    tripCount: relevantTrips.length,
    totalDistance: relevantTrips.reduce(
      (acc: number, t: Trip) => acc + (t.distance_travelled || 0),
      0
    ),
    fuelUsage: FuelInfoMock.filter((f: FuelInfo) =>
      relevantTrips.some((t: Trip) => t.id === f.trip)
    ).reduce((acc: number, f: FuelInfo) => acc + (f.fuel_filled || 0), 0),
    maintenanceCosts: Maintenance.filter(
      (m: VehicleMaintenance) =>
        m.maintenance_time &&
        new Date(m.maintenance_time) >= startDate &&
        new Date(m.maintenance_time) <= endDate
    ).reduce(
      (acc: number, m: VehicleMaintenance) => acc + (m.bill_amount || 0),
      0
    ),
    alerts: {
      speedingIncidents: SpeedReports.filter(
        (s: SpeedReport) =>
          s.timestamp &&
          new Date(s.timestamp) >= startDate &&
          new Date(s.timestamp) <= endDate
      ).length,
      idleTime: IdleReports.filter(
        (i: IdleReport) =>
          i.timestamp &&
          new Date(i.timestamp) >= startDate &&
          new Date(i.timestamp) <= endDate
      ).reduce((acc: number, i: IdleReport) => {
        if (!i.start_idle_time || !i.end_idle_time) {
          return acc;
        }
        return (
          acc +
          (new Date(i.end_idle_time).getTime() -
            new Date(i.start_idle_time).getTime()) /
          (60 * 1000)
        );
      }, 0),
    },
  };
};
