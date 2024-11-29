import type { Trip } from '@/types';

export const TripsMock: Trip[] = [
  {
    id: 1,
    driver: 5, // Abdul Rahman Khan from Bangalore
    vehicle: 1, // Toyota Innova
    route: 1, // Bangalore Urban Circuit
    scheduled_start_time: '2024-11-30T08:00:00Z',
    start_time: '2024-11-30T08:05:00Z',
    end_time: '2024-11-30T09:30:00Z',
    distance_travelled: 45.2,
    current_latitude: 12.8458,
    current_longitude: 77.5947,
    total_idle_time: 25,
    current_idle_time: 0,
    current_speed: 0,
    is_speeding: false,
    created_at: '2024-11-30T07:45:00Z',
  },
  {
    id: 2,
    driver: 3, // Suresh Venkatesh from Tamil Nadu
    vehicle: 2, // Hyundai Alcazar
    route: 2, // Chennai Metro Connect
    scheduled_start_time: '2024-11-30T08:30:00Z',
    start_time: '2024-11-30T08:35:00Z',
    end_time: null,
    distance_travelled: 28.7,
    current_latitude: 12.7409,
    current_longitude: 80.0112,
    total_idle_time: 35,
    current_idle_time: 5,
    current_speed: 45.5,
    is_speeding: false,
    created_at: '2024-11-30T08:15:00Z',
  },
  {
    id: 3,
    driver: 7, // Ravi Krishnan from Kerala
    vehicle: 3, // Ashok Leyland Bus
    route: 3, // Kochi Coastal Route
    scheduled_start_time: '2024-11-30T09:00:00Z',
    start_time: '2024-11-30T09:00:00Z',
    end_time: '2024-11-30T10:15:00Z',
    distance_travelled: 15.3,
    current_latitude: 10.019,
    current_longitude: 76.2432,
    total_idle_time: 20,
    current_idle_time: 0,
    current_speed: 0,
    is_speeding: false,
    created_at: '2024-11-30T08:45:00Z',
  },
  {
    id: 4,
    driver: 8, // Sunita Reddy from Telangana
    vehicle: 8, // Kia Carens
    route: 4, // Hyderabad Tech Corridor
    scheduled_start_time: '2024-11-30T09:30:00Z',
    start_time: '2024-11-30T09:40:00Z',
    end_time: null,
    distance_travelled: 18.9,
    current_latitude: 17.4147,
    current_longitude: 78.3816,
    total_idle_time: 15,
    current_idle_time: 15,
    current_speed: 0,
    is_speeding: false,
    created_at: '2024-11-30T09:15:00Z',
  },
  {
    id: 5,
    driver: 18, // Anita Hegde from Karnataka
    vehicle: 14, // Skoda Kushaq
    route: 5, // Mysore Heritage Circuit
    scheduled_start_time: '2024-11-30T10:00:00Z',
    start_time: '2024-11-30T10:05:00Z',
    end_time: null,
    distance_travelled: 12.4,
    current_latitude: 12.2725,
    current_longitude: 76.6736,
    total_idle_time: 25,
    current_idle_time: 0,
    current_speed: 35.2,
    is_speeding: false,
    created_at: '2024-11-30T09:45:00Z',
  },
  {
    id: 6,
    driver: 12, // Lakshmi Raghavan from Tamil Nadu
    vehicle: 6, // Mahindra XUV300
    route: 6, // Coimbatore Industrial Belt
    scheduled_start_time: '2024-11-30T10:30:00Z',
    start_time: '2024-11-30T10:35:00Z',
    end_time: null,
    distance_travelled: 22.8,
    current_latitude: 11.0168,
    current_longitude: 76.9558,
    total_idle_time: 40,
    current_idle_time: 10,
    current_speed: 48.5,
    is_speeding: false,
    created_at: '2024-11-30T10:15:00Z',
  },
  {
    id: 7,
    driver: 13, // Arjun Menon from Kerala
    vehicle: 12, // Toyota Glanza
    route: 7, // Trivandrum Coastal Highway
    scheduled_start_time: '2024-11-30T11:00:00Z',
    start_time: '2024-11-30T11:10:00Z',
    end_time: null,
    distance_travelled: 16.7,
    current_latitude: 8.4004,
    current_longitude: 76.9787,
    total_idle_time: 30,
    current_idle_time: 5,
    current_speed: 42.8,
    is_speeding: false,
    created_at: '2024-11-30T10:45:00Z',
  },
  {
    id: 8,
    driver: 4, // Meera Singh
    vehicle: 4, // Tata Prima Truck
    route: 8, // Vizag Port Route
    scheduled_start_time: '2024-11-30T11:30:00Z',
    start_time: '2024-11-30T11:35:00Z',
    end_time: null,
    distance_travelled: 8.9,
    current_latitude: 17.6868,
    current_longitude: 83.2185,
    total_idle_time: 45,
    current_idle_time: 15,
    current_speed: 32.5,
    is_speeding: false,
    created_at: '2024-11-30T11:15:00Z',
  },
  {
    id: 9,
    driver: 5, // Abdul Rahman Khan
    vehicle: 1, // Toyota Innova
    route: 9, // Mangalore Port Connect
    scheduled_start_time: '2024-11-30T12:00:00Z',
    start_time: '2024-11-30T12:05:00Z',
    end_time: null,
    distance_travelled: 14.2,
    current_latitude: 12.9175,
    current_longitude: 74.8019,
    total_idle_time: 20,
    current_idle_time: 0,
    current_speed: 55.6,
    is_speeding: true,
    created_at: '2024-11-30T11:45:00Z',
  },
  {
    id: 10,
    driver: 3, // Suresh Venkatesh
    vehicle: 15, // Volvo Bus
    route: 10, // Madurai Temple Circuit
    scheduled_start_time: '2024-11-30T12:30:00Z',
    start_time: '2024-11-30T12:35:00Z',
    end_time: null,
    distance_travelled: 5.6,
    current_latitude: 9.9252,
    current_longitude: 78.1198,
    total_idle_time: 30,
    current_idle_time: 30,
    current_speed: 0,
    is_speeding: false,
    created_at: '2024-11-30T12:15:00Z',
  },
  {
    id: 11,
    driver: 17, // Mohammed Ismail
    vehicle: 13, // Eicher Truck
    route: 11, // Warangal Heritage Route
    scheduled_start_time: '2024-11-30T13:00:00Z',
    start_time: '2024-11-30T13:05:00Z',
    end_time: null,
    distance_travelled: 19.8,
    current_latitude: 18.0013,
    current_longitude: 79.5881,
    total_idle_time: 25,
    current_idle_time: 0,
    current_speed: 45.2,
    is_speeding: false,
    created_at: '2024-11-30T12:45:00Z',
  },
  {
    id: 12,
    driver: 12, // Lakshmi Raghavan
    vehicle: 2, // Hyundai Alcazar
    route: 12, // Salem Industrial Connect
    scheduled_start_time: '2024-11-30T13:30:00Z',
    start_time: '2024-11-30T13:35:00Z',
    end_time: null,
    distance_travelled: 25.4,
    current_latitude: 11.6643,
    current_longitude: 78.146,
    total_idle_time: 35,
    current_idle_time: 5,
    current_speed: 52.8,
    is_speeding: true,
    created_at: '2024-11-30T13:15:00Z',
  },
  {
    id: 13,
    driver: 7, // Ravi Krishnan
    vehicle: 7, // Bharat Benz Tanker
    route: 13, // Thrissur Festival Route
    scheduled_start_time: '2024-11-30T14:00:00Z',
    start_time: '2024-11-30T14:05:00Z',
    end_time: null,
    distance_travelled: 11.2,
    current_latitude: 10.5276,
    current_longitude: 76.2144,
    total_idle_time: 40,
    current_idle_time: 10,
    current_speed: 38.5,
    is_speeding: false,
    created_at: '2024-11-30T13:45:00Z',
  },
  {
    id: 14,
    driver: 8, // Sunita Reddy
    vehicle: 9, // Force Motors Mini Bus
    route: 14, // Tirupati Temple Route
    scheduled_start_time: '2024-11-30T14:30:00Z',
    start_time: '2024-11-30T14:35:00Z',
    end_time: null,
    distance_travelled: 8.7,
    current_latitude: 13.6833,
    current_longitude: 79.3474,
    total_idle_time: 50,
    current_idle_time: 15,
    current_speed: 25.4,
    is_speeding: false,
    created_at: '2024-11-30T14:15:00Z',
  },
  {
    id: 15,
    driver: 18, // Anita Hegde
    vehicle: 14, // Skoda Kushaq
    route: 15, // Hubli Commerce Route
    scheduled_start_time: '2024-11-30T15:00:00Z',
    start_time: '2024-11-30T15:05:00Z',
    end_time: null,
    distance_travelled: 15.8,
    current_latitude: 15.3647,
    current_longitude: 75.124,
    total_idle_time: 25,
    current_idle_time: 0,
    current_speed: 58.2,
    is_speeding: true,
    created_at: '2024-11-30T14:45:00Z',
  },
  {
    id: 16,
    driver: 4, // Meera Singh
    vehicle: 4, // Tata Prima Truck
    route: 16, // Vijayawada City Circuit
    scheduled_start_time: '2024-11-30T15:30:00Z',
    start_time: '2024-11-30T15:35:00Z',
    end_time: null,
    distance_travelled: 12.9,
    current_latitude: 16.5107,
    current_longitude: 80.6287,
    total_idle_time: 30,
    current_idle_time: 5,
    current_speed: 42.5,
    is_speeding: false,
    created_at: '2024-11-30T15:15:00Z',
  },
  {
    id: 17,
    driver: 3, // Suresh Venkatesh
    vehicle: 15, // Volvo Bus
    route: 17, // Ooty Hill Route
    scheduled_start_time: '2024-11-30T16:00:00Z',
    start_time: '2024-11-30T16:05:00Z',
    end_time: null,
    distance_travelled: 6.8,
    current_latitude: 11.4087,
    current_longitude: 76.7367,
    total_idle_time: 45,
    current_idle_time: 10,
    current_speed: 22.5,
    is_speeding: false,
    created_at: '2024-11-30T15:45:00Z',
  },
  {
    id: 18,
    driver: 13, // Arjun Menon
    vehicle: 12, // Toyota Glanza
    route: 18, // Calicut Beach Route
    scheduled_start_time: '2024-11-30T16:30:00Z',
    start_time: '2024-11-30T16:35:00Z',
    end_time: null,
    distance_travelled: 9.4,
    current_latitude: 11.2588,
    current_longitude: 75.7804,
    total_idle_time: 20,
    current_idle_time: 0,
    current_speed: 45.8,
    is_speeding: true,
    created_at: '2024-11-30T16:15:00Z',
  },
  {
    id: 19,
    driver: 12, // Lakshmi Raghavan
    vehicle: 6, // Mahindra XUV300
    route: 19, // Vellore Education Route
    scheduled_start_time: '2024-11-30T17:00:00Z',
    start_time: '2024-11-30T17:05:00Z',
    end_time: null,
    distance_travelled: 16.2,
    current_latitude: 12.9692,
    current_longitude: 79.1559,
    total_idle_time: 35,
    current_idle_time: 5,
    current_speed: 48.5,
    is_speeding: false,
    created_at: '2024-11-30T16:45:00Z',
  },
];
