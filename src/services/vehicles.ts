// services/vehicle.ts

import {
  Vehicle,
  DateTime,
  Trip,
  Driver,
  VehicleMaintenance,
  FuelInfo,
  SpeedReport,
} from '@/types';

import { Vehicles } from '@/constants/vehicles';
import { TripsMock } from '@/constants/trips';
import { Drivers } from '@/constants/drivers';
import { VehicleMaintenanceMock } from '@/constants/maintenance-reports';
import { FuelInfoMock } from '@/constants/fuel-reports';
import { SpeedReportsMock } from '@/constants/speed-reports';

// =============== Types & Interfaces ===============

export type VehicleStatus =
  | 'active'
  | 'idle'
  | 'maintenance'
  | 'out-of-service';
export type DocumentType = 'rc' | 'insurance' | 'pollution' | 'fitness';
export type MaintenanceStatus = 'due' | 'ongoing' | 'completed' | 'scheduled';

export interface VehicleMetrics {
  utilization: {
    fleetUtilizationRate: number;
    averageTripsPerDay: number;
    averageDailyDistance: number;
    idleTimePercentage: number;
  };
  efficiency: {
    fuelEfficiency: number;
    fuelCostPerKm: number;
    totalFuelConsumption: number;
    fuelCostTrend: number[];
  };
  maintenance: {
    costPerVehicle: number;
    averageRepairTime: number;
    breakdownFrequency: number;
    maintenanceCompliance: number;
  };
}

export interface EnhancedVehicle extends Vehicle {
  status: VehicleStatus;
  currentDriver?: Driver;
  currentTrip?: Trip;
  currentLocation?: {
    latitude: number;
    longitude: number;
    timestamp: DateTime;
  };
  documentStatus: {
    [key in DocumentType]: 'valid' | 'expiring' | 'expired';
  };
  maintenanceStatus: MaintenanceStatus;
  metrics: VehicleMetrics;
}

export interface VehicleFilters {
  status?: VehicleStatus[];
  types?: string[];
  documentStatus?: 'valid' | 'expiring' | 'expired';
  maintenanceStatus?: MaintenanceStatus[];
  search?: string;
  ageRange?: {
    min: number;
    max: number;
  };
  capacityRange?: {
    min: number;
    max: number;
  };
  location?: string;
  fuelEfficiencyRange?: {
    min: number;
    max: number;
  };
  utilizationRange?: {
    min: number;
    max: number;
  };
  maintenanceCostRange?: {
    min: number;
    max: number;
  };
  documentTypes?: DocumentType[];
  dateRange?: {
    start: DateTime;
    end: DateTime;
  };
}

export interface VehicleSortOption {
  field: keyof EnhancedVehicle | string;
  direction: 'asc' | 'desc';
}

export interface VehicleBulkOperation {
  vehicleIds: number[];
  operation:
    | 'status_update'
    | 'maintenance_schedule'
    | 'driver_assign'
    | 'document_update'
    | 'export'
    | 'location_update';
  payload?: {
    status?: VehicleStatus;
    maintenanceDate?: DateTime;
    maintenanceType?: string;
    driverId?: number;
    documentType?: DocumentType;
    documentData?: any;
    exportFormat?: 'csv' | 'xlsx' | 'pdf';
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}

// =============== Core Vehicle Operations ===============

export const getAllVehicles = (): EnhancedVehicle[] => {
  return Vehicles.map((vehicle) => enhanceVehicle(vehicle));
};

export const getVehicleById = (id: number): EnhancedVehicle | undefined => {
  const vehicle = Vehicles.find((v) => v.id === id);
  return vehicle ? enhanceVehicle(vehicle) : undefined;
};

// =============== Overview & Performance Metrics ===============

export const getOverviewMetrics = () => {
  const enhancedVehicles = getAllVehicles();
  const now = new Date();

  return {
    totalCount: Vehicles.length,
    statusDistribution: {
      active: enhancedVehicles.filter((v) => v.status === 'active').length,
      idle: enhancedVehicles.filter((v) => v.status === 'idle').length,
      maintenance: enhancedVehicles.filter((v) => v.status === 'maintenance')
        .length,
      outOfService: enhancedVehicles.filter(
        (v) => v.status === 'out-of-service'
      ).length,
    },
    documentAlerts: {
      expired: enhancedVehicles.filter((v) =>
        Object.values(v.documentStatus).some((status) => status === 'expired')
      ).length,
      expiring: enhancedVehicles.filter((v) =>
        Object.values(v.documentStatus).some((status) => status === 'expiring')
      ).length,
    },
    maintenanceAlerts: {
      due: enhancedVehicles.filter((v) => v.maintenanceStatus === 'due').length,
      ongoing: enhancedVehicles.filter((v) => v.maintenanceStatus === 'ongoing')
        .length,
      scheduled: enhancedVehicles.filter(
        (v) => v.maintenanceStatus === 'scheduled'
      ).length,
    },
  };
};

export const getVehiclePerformanceMetrics = (
  vehicleId: number
): VehicleMetrics => {
  const trips = getTripsByVehicleId(vehicleId);
  const maintenanceRecords = getMaintenanceRecordsByVehicleId(vehicleId);
  const fuelRecords = getFuelRecordsByVehicleId(vehicleId);

  return {
    utilization: calculateUtilizationMetrics(trips),
    efficiency: calculateEfficiencyMetrics(trips, fuelRecords),
    maintenance: calculateMaintenanceMetrics(maintenanceRecords),
  };
};

// =============== Document Management ===============

export const getDocumentStatus = (
  vehicle: Vehicle
): Record<DocumentType, 'valid' | 'expiring' | 'expired'> => {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const checkExpiry = (
    expiryDate: unknown
  ): 'valid' | 'expiring' | 'expired' => {
    // Handle various input types safely
    if (expiryDate === null || expiryDate === undefined) return 'expired';

    // Convert to string, handling potential number inputs
    const expiryString =
      typeof expiryDate === 'number'
        ? new Date(expiryDate).toISOString()
        : String(expiryDate);

    // Safely parse the date
    const expiry = new Date(expiryString);

    // Validate the date
    if (isNaN(expiry.getTime())) return 'expired';

    if (expiry < now) return 'expired';
    if (expiry <= thirtyDaysFromNow) return 'expiring';
    return 'valid';
  };

  // Dynamically check only existing expiry properties
  const documentStatus: Partial<
    Record<DocumentType, 'valid' | 'expiring' | 'expired'>
  > = {};

  const expiryMap: Record<DocumentType, keyof Vehicle> = {
    rc: 'rc_expiry',
    insurance: 'insurance_expiry',
    pollution: 'pollution_expiry',
    fitness: 'fitness_expiry',
  };

  (Object.keys(expiryMap) as DocumentType[]).forEach((docType) => {
    const expiryProp = expiryMap[docType];

    // Safely access the property and pass to checkExpiry
    const expiryValue = vehicle[expiryProp];
    documentStatus[docType] = checkExpiry(expiryValue);
  });

  return documentStatus as Record<
    DocumentType,
    'valid' | 'expiring' | 'expired'
  >;
};

// =============== Filter & Sort Operations ===============

export const filterVehicles = (
  vehicles: EnhancedVehicle[],
  filters: VehicleFilters
): EnhancedVehicle[] => {
  return vehicles.filter((vehicle) => {
    // Apply all filters
    if (filters.status?.length && !filters.status.includes(vehicle.status))
      return false;
    if (
      filters.types?.length &&
      !filters.types.includes(vehicle.vehicle_type || '')
    )
      return false;
    if (filters.documentTypes?.length) {
      const hasInvalidDocument = filters.documentTypes.some(
        (docType) => vehicle.documentStatus[docType] === 'expired'
      );
      if (hasInvalidDocument) return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchableFields = [
        vehicle.vehicle_number,
        vehicle.registration_number,
        vehicle.vehicle_make,
        vehicle.vehicle_model,
        vehicle.owner_name,
      ].filter(Boolean);
      if (
        !searchableFields.some((field) =>
          field?.toLowerCase().includes(searchLower)
        )
      )
        return false;
    }
    // Add more filter conditions as needed
    return true;
  });
};

export const sortVehicles = (
  vehicles: EnhancedVehicle[],
  sort: VehicleSortOption
): EnhancedVehicle[] => {
  return [...vehicles].sort((a, b) => {
    const aValue = getNestedValue(a, sort.field);
    const bValue = getNestedValue(b, sort.field);
    return sort.direction === 'asc'
      ? compare(aValue, bValue)
      : compare(bValue, aValue);
  });
};

// =============== Bulk Operations ===============

export const executeBulkOperation = async (
  operation: VehicleBulkOperation
): Promise<boolean> => {
  try {
    validateBulkOperation(operation);

    const handlers = {
      status_update: handleBulkStatusUpdate,
      maintenance_schedule: handleBulkMaintenanceSchedule,
      driver_assign: handleBulkDriverAssign,
      document_update: handleBulkDocumentUpdate,
      export: handleBulkExport,
      location_update: handleBulkLocationUpdate,
    };

    const handler = handlers[operation.operation];
    if (!handler)
      throw new Error(`Unsupported operation: ${operation.operation}`);

    return await handler(operation);
  } catch (error) {
    console.error('Bulk operation failed:', error);
    return false;
  }
};

// =============== Helper Functions ===============

const enhanceVehicle = (vehicle: Vehicle): EnhancedVehicle => {
  const currentTrip = getCurrentTrip(vehicle.id);
  const currentDriver = currentTrip
    ? getCurrentDriver(currentTrip.driver)
    : undefined;

  return {
    ...vehicle,
    status: calculateVehicleStatus(vehicle.id),
    currentDriver,
    currentTrip,
    currentLocation: getCurrentLocation(vehicle.id),
    documentStatus: getDocumentStatus(vehicle),
    maintenanceStatus: calculateMaintenanceStatus(vehicle.id),
    metrics: getVehiclePerformanceMetrics(vehicle.id),
  };
};

const getTripsByVehicleId = (vehicleId: number): Trip[] => {
  return TripsMock.filter((trip) => trip.vehicle === vehicleId);
};

const getMaintenanceRecordsByVehicleId = (
  vehicleId: number
): VehicleMaintenance[] => {
  const trips = getTripsByVehicleId(vehicleId);
  return VehicleMaintenanceMock.filter((record) =>
    trips.some((trip) => trip.id === record.trip)
  );
};

const getFuelRecordsByVehicleId = (vehicleId: number): FuelInfo[] => {
  const trips = getTripsByVehicleId(vehicleId);
  return FuelInfoMock.filter((record) =>
    trips.some((trip) => trip.id === record.trip)
  );
};

// =============== Calculation Functions ===============

export const calculateVehicleStatus = (vehicleId: number): VehicleStatus => {
  const currentTrip = getCurrentTrip(vehicleId);
  const maintenanceRecords = getMaintenanceRecordsByVehicleId(vehicleId);
  const currentMaintenance = maintenanceRecords.find(
    (record) => record.status === 'ongoing' || record.status === 'scheduled'
  );

  if (currentMaintenance) return 'maintenance';
  if (currentTrip) return 'active';

  // Check for other idle conditions (e.g., no trips in last 24 hours)
  const recentTrips = TripsMock.filter(
    (trip) =>
      trip.vehicle === vehicleId &&
      new Date(trip.end_time).getTime() > Date.now() - 24 * 60 * 60 * 1000
  );

  return recentTrips.length > 0 ? 'idle' : 'out-of-service';
};

export const getCurrentTrip = (vehicleId: number): Trip | undefined => {
  const now = new Date();
  return TripsMock.find(
    (trip) =>
      trip.vehicle === vehicleId &&
      new Date(trip.start_time) <= now &&
      new Date(trip.end_time) >= now
  );
};

export const getCurrentDriver = (driverId: number): Driver | undefined => {
  return Drivers.find((driver) => driver.id === driverId);
};

export const getCurrentLocation = (
  vehicleId: number
): { latitude: number; longitude: number; timestamp: DateTime } | undefined => {
  const currentTrip = getCurrentTrip(vehicleId);
  if (!currentTrip) return undefined;

  const speedReports = SpeedReportsMock.filter(
    (report) => report.trip === currentTrip.id
  );
  const latestReport = speedReports[speedReports.length - 1];

  return latestReport
    ? {
        latitude: latestReport.latitude,
        longitude: latestReport.longitude,
        timestamp: latestReport.timestamp,
      }
    : undefined;
};

export const calculateMaintenanceStatus = (
  vehicleId: number
): MaintenanceStatus => {
  const maintenanceRecords = getMaintenanceRecordsByVehicleId(vehicleId);
  const ongoingMaintenance = maintenanceRecords.find(
    (record) => record.status === 'ongoing'
  );

  if (ongoingMaintenance) return 'ongoing';

  const scheduledMaintenance = maintenanceRecords.find(
    (record) => record.status === 'scheduled'
  );
  if (scheduledMaintenance) return 'scheduled';

  const dueMaintenance = maintenanceRecords.find((record) => {
    const now = new Date();
    const maintenanceDate = new Date(record.scheduled_date);
    return maintenanceDate <= now && record.status === 'pending';
  });

  return dueMaintenance ? 'due' : 'completed';
};

export const calculateUtilizationMetrics = (trips: Trip[]) => {
  if (trips.length === 0) {
    return {
      fleetUtilizationRate: 0,
      averageTripsPerDay: 0,
      averageDailyDistance: 0,
      idleTimePercentage: 100,
    };
  }

  const totalDistance = trips.reduce(
    (sum, trip) => sum + (trip.distance || 0),
    0
  );
  const totalDuration = trips.reduce((sum, trip) => {
    const start = new Date(trip.start_time).getTime();
    const end = new Date(trip.end_time).getTime();
    return sum + (end - start);
  }, 0);

  const uniqueDays = new Set(
    trips.map((trip) => new Date(trip.start_time).toDateString())
  ).size;

  return {
    fleetUtilizationRate: (trips.length / uniqueDays) * 100,
    averageTripsPerDay: trips.length / uniqueDays,
    averageDailyDistance: totalDistance / uniqueDays,
    idleTimePercentage:
      100 - (totalDuration / (uniqueDays * 24 * 60 * 60 * 1000)) * 100,
  };
};

export const calculateEfficiencyMetrics = (
  trips: Trip[],
  fuelRecords: FuelInfo[]
) => {
  if (trips.length === 0 || fuelRecords.length === 0) {
    return {
      fuelEfficiency: 0,
      fuelCostPerKm: 0,
      totalFuelConsumption: 0,
      fuelCostTrend: [],
    };
  }

  const totalDistance = trips.reduce(
    (sum, trip) => sum + (trip.distance || 0),
    0
  );
  const totalFuel = fuelRecords.reduce(
    (sum, record) => sum + (record.amount || 0),
    0
  );
  const fuelCosts = fuelRecords.map((record) => record.cost || 0);

  return {
    fuelEfficiency: totalDistance > 0 ? totalFuel / totalDistance : 0,
    fuelCostPerKm:
      totalDistance > 0 ? (totalFuel * fuelCosts[0]) / totalDistance : 0,
    totalFuelConsumption: totalFuel,
    fuelCostTrend: fuelCosts,
  };
};

export const calculateMaintenanceMetrics = (
  maintenanceRecords: VehicleMaintenance[]
) => {
  if (maintenanceRecords.length === 0) {
    return {
      costPerVehicle: 0,
      averageRepairTime: 0,
      breakdownFrequency: 0,
      maintenanceCompliance: 100,
    };
  }

  const totalCost = maintenanceRecords.reduce(
    (sum, record) => sum + (record.cost || 0),
    0
  );
  const repairTimes = maintenanceRecords.map((record) => {
    if (!record.start_time || !record.end_time) return 0;
    const start = new Date(record.start_time).getTime();
    const end = new Date(record.end_time).getTime();
    return (end - start) / (60 * 60 * 1000); // Convert to hours
  });

  const averageRepairTime =
    repairTimes.reduce((sum, time) => sum + time, 0) / repairTimes.length;
  const completedRecords = maintenanceRecords.filter(
    (record) => record.status === 'completed'
  );

  return {
    costPerVehicle: totalCost / maintenanceRecords.length,
    averageRepairTime,
    breakdownFrequency: maintenanceRecords.length,
    maintenanceCompliance:
      (completedRecords.length / maintenanceRecords.length) * 100,
  };
};

export const getExpiryStatus = (
  expiryDate: DateTime,
  now: Date,
  thirtyDaysFromNow: Date
): 'valid' | 'expiring' | 'expired' => {
  const expiry = new Date(expiryDate);

  if (expiry < now) return 'expired';
  if (expiry <= thirtyDaysFromNow) return 'expiring';
  return 'valid';
};

export const compare = (a: any, b: any): number => {
  if (a === b) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }

  return a < b ? -1 : 1;
};

export const getNestedValue = (obj: any, path: string): any => {
  return path
    .split('.')
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      obj
    );
};

// =============== Bulk Operation Handlers ===============

export const validateBulkOperation = (
  operation: VehicleBulkOperation
): void => {
  if (!operation.vehicleIds || operation.vehicleIds.length === 0) {
    throw new Error('No vehicles selected for bulk operation');
  }

  // Validate specific operation requirements
  switch (operation.operation) {
    case 'status_update':
      if (!operation.payload?.status) {
        throw new Error('Status update requires a valid status');
      }
      break;
    case 'maintenance_schedule':
      if (
        !operation.payload?.maintenanceDate ||
        !operation.payload?.maintenanceType
      ) {
        throw new Error('Maintenance schedule requires date and type');
      }
      break;
    case 'driver_assign':
      if (!operation.payload?.driverId) {
        throw new Error('Driver assignment requires a valid driver ID');
      }
      break;
    case 'document_update':
      if (
        !operation.payload?.documentType ||
        !operation.payload?.documentData
      ) {
        throw new Error('Document update requires type and data');
      }
      break;
    case 'export':
      if (!operation.payload?.exportFormat) {
        throw new Error('Export requires a valid format');
      }
      break;
    case 'location_update':
      if (
        !operation.payload?.location?.latitude ||
        !operation.payload?.location?.longitude
      ) {
        throw new Error('Location update requires valid coordinates');
      }
      break;
    default:
      throw new Error(`Unsupported operation: ${operation.operation}`);
  }
};

export const handleBulkStatusUpdate = async (
  operation: VehicleBulkOperation
): Promise<boolean> => {
  try {
    operation.vehicleIds.forEach((vehicleId) => {
      const vehicle = Vehicles.find((v) => v.id === vehicleId);
      if (vehicle && operation.payload?.status) {
        // In a real implementation, this would update the vehicle status in a database
        console.log(
          `Updating vehicle ${vehicleId} status to ${operation.payload.status}`
        );
      }
    });
    return true;
  } catch (error) {
    console.error('Bulk status update failed:', error);
    return false;
  }
};

export const handleBulkMaintenanceSchedule = async (
  operation: VehicleBulkOperation
): Promise<boolean> => {
  try {
    operation.vehicleIds.forEach((vehicleId) => {
      const vehicle = Vehicles.find((v) => v.id === vehicleId);
      if (
        vehicle &&
        operation.payload?.maintenanceDate &&
        operation.payload?.maintenanceType
      ) {
        // In a real implementation, this would schedule maintenance for the vehicle
        console.log(
          `Scheduling ${operation.payload.maintenanceType} maintenance for vehicle ${vehicleId} on ${operation.payload.maintenanceDate}`
        );
      }
    });
    return true;
  } catch (error) {
    console.error('Bulk maintenance scheduling failed:', error);
    return false;
  }
};

export const handleBulkDriverAssign = async (
  operation: VehicleBulkOperation
): Promise<boolean> => {
  try {
    operation.vehicleIds.forEach((vehicleId) => {
      const vehicle = Vehicles.find((v) => v.id === vehicleId);
      if (vehicle && operation.payload?.driverId) {
        // In a real implementation, this would assign the driver to the vehicle
        console.log(
          `Assigning driver ${operation.payload.driverId} to vehicle ${vehicleId}`
        );
      }
    });
    return true;
  } catch (error) {
    console.error('Bulk driver assignment failed:', error);
    return false;
  }
};

export const handleBulkDocumentUpdate = async (
  operation: VehicleBulkOperation
): Promise<boolean> => {
  try {
    operation.vehicleIds.forEach((vehicleId) => {
      const vehicle = Vehicles.find((v) => v.id === vehicleId);
      if (
        vehicle &&
        operation.payload?.documentType &&
        operation.payload?.documentData
      ) {
        // In a real implementation, this would update the document for the vehicle
        console.log(
          `Updating ${operation.payload.documentType} document for vehicle ${vehicleId}`
        );
      }
    });
    return true;
  } catch (error) {
    console.error('Bulk document update failed:', error);
    return false;
  }
};

export const handleBulkExport = async (
  operation: VehicleBulkOperation
): Promise<boolean> => {
  try {
    const vehiclesToExport = Vehicles.filter((vehicle) =>
      operation.vehicleIds.includes(vehicle.id)
    );

    // In a real implementation, this would generate an export file
    console.log(
      `Exporting ${vehiclesToExport.length} vehicles in ${operation.payload?.exportFormat} format`
    );
    return true;
  } catch (error) {
    console.error('Bulk export failed:', error);
    return false;
  }
};

export const handleBulkLocationUpdate = async (
  operation: VehicleBulkOperation
): Promise<boolean> => {
  try {
    operation.vehicleIds.forEach((vehicleId) => {
      const vehicle = Vehicles.find((v) => v.id === vehicleId);
      if (vehicle && operation.payload?.location) {
        // In a real implementation, this would update the vehicle's location
        console.log(
          `Updating location for vehicle ${vehicleId}: ${JSON.stringify(operation.payload.location)}`
        );
      }
    });
    return true;
  } catch (error) {
    console.error('Bulk location update failed:', error);
    return false;
  }
};

// =============== Service Export ===============

export const vehicleService = {
  // Core Operations
  getAllVehicles,
  getVehicleById,
  getOverviewMetrics,
  getVehiclePerformanceMetrics,

  // Document Management
  getDocumentStatus,

  // Filter & Sort
  filterVehicles,
  sortVehicles,

  // Bulk Operations
  executeBulkOperation,
};

export default vehicleService;
