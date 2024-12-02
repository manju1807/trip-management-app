export type DateTime = string; // Assuming DateTime is represented as an ISO string in TypeScript

export interface Driver {
  id: number;
  fullname: string;
  gender?: string;
  dob?: DateTime;
  contact: string;
  address?: string;
  state?: string;
  zipcode?: string;
  license_number?: string;
  license_expiry?: DateTime;
  created_at: DateTime;
}

export interface GpsData {
  id: number;
  driver: number;
  latitude?: number | null;
  longitude?: number | null;
  speed?: number | null;
  timestamp?: DateTime;
  os_version?: string;
  battery_level?: number;
  signal_strength?: number;
}

export interface Vehicle {
  id: number;
  vehicle_number?: string;
  vehicle_capacity?: number;
  vehicle_chassis_number?: string | null;
  vehicle_type?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  registration_number?: string;
  rc_expiry?: DateTime | null;
  insurance_number?: string | null;
  insurance_expiry?: DateTime | null;
  pollution_number?: string | null;
  pollution_expiry?: DateTime | null;
  owner_name?: string;
  owner_contact?: string;
  speed_limit?: number;
  created_at: DateTime;
}

export interface Route {
  id: number;
  route_name?: string;
  start_location?: string;
  end_location?: string;
  end_location_latitude?: number;
  end_location_longitude?: number;
  idle_time?: number;
  speed_limit?: number;
  created_at: DateTime;
}

export interface Trip {
  id: number;
  driver: number;
  vehicle: number;
  route: number;
  scheduled_start_time?: DateTime;
  start_time?: DateTime | null;
  end_time?: DateTime | null;
  distance_travelled?: number;
  current_latitude?: number;
  current_longitude?: number;
  total_idle_time?: number;
  current_idle_time?: number;
  current_speed?: number;
  is_speeding?: boolean;
  created_at: DateTime;
}

export interface IdleReport {
  id: number;
  trip: number;
  start_idle_time: DateTime;
  end_idle_time?: DateTime | null;
  timestamp: DateTime;
  latitude?: number;
  longitude?: number;
}

export interface SpeedReport {
  id: number;
  trip: number;
  speed?: number;
  start_speed_time?: DateTime | null;
  end_speed_time?: DateTime | null;
  timestamp: DateTime;
  latitude: number;
  longitude: number;
}

export interface FuelInfo {
  id: number;
  trip: number;
  odometer?: number;
  fuel_filled?: number;
  bill_number?: string;
  fuel_cost?: number;
  fuel_filled_time?: DateTime | null;
}

export interface VehicleMaintenance {
  id: number;
  trip: number;
  odometer?: number;
  service_type?: string;
  service_center_name?: string;
  bill_number?: string;
  bill_amount?: number;
  maintenance_time?: DateTime | null;
}
export interface RelatedTripData {
  trip: Trip;
  speedReports: SpeedReport[];
  idleReports: IdleReport[];
  fuelReports: FuelInfo[];
  maintenanceReports: VehicleMaintenance[];
}

export interface RelatedDriverData {
  driver: Driver;
  trips: Trip[];
  vehicles?: Vehicle[];
  gpsData: GpsData[];
}
