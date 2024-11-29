import type { SpeedReport } from '@/types';

export const SpeedReportsMock: SpeedReport[] = [
  {
    id: 1,
    trip: 9, // Abdul Rahman Khan's Mangalore Port trip
    speed: 55.6,
    start_speed_time: '2024-11-30T12:15:00Z',
    end_speed_time: '2024-11-30T12:25:00Z',
    timestamp: '2024-11-30T12:25:00Z',
    latitude: 12.9175,
    longitude: 74.8019,
  },
  {
    id: 2,
    trip: 12, // Lakshmi Raghavan's Salem trip
    speed: 52.8,
    start_speed_time: '2024-11-30T13:45:00Z',
    end_speed_time: '2024-11-30T13:55:00Z',
    timestamp: '2024-11-30T13:55:00Z',
    latitude: 11.6643,
    longitude: 78.146,
  },
  {
    id: 3,
    trip: 15, // Anita Hegde's Hubli trip
    speed: 58.2,
    start_speed_time: '2024-11-30T15:15:00Z',
    end_speed_time: '2024-11-30T15:25:00Z',
    timestamp: '2024-11-30T15:25:00Z',
    latitude: 15.3647,
    longitude: 75.124,
  },
  {
    id: 4,
    trip: 18, // Arjun Menon's Calicut trip
    speed: 45.8,
    start_speed_time: '2024-11-30T16:45:00Z',
    end_speed_time: '2024-11-30T16:55:00Z',
    timestamp: '2024-11-30T16:55:00Z',
    latitude: 11.2588,
    longitude: 75.7804,
  },
  {
    id: 5,
    trip: 2, // Suresh Venkatesh's Chennai trip
    speed: 45.5,
    start_speed_time: '2024-11-30T08:45:00Z',
    end_speed_time: '2024-11-30T08:55:00Z',
    timestamp: '2024-11-30T08:55:00Z',
    latitude: 12.7409,
    longitude: 80.0112,
  },
  {
    id: 6,
    trip: 6, // Lakshmi Raghavan's Coimbatore trip
    speed: 48.5,
    start_speed_time: '2024-11-30T10:45:00Z',
    end_speed_time: '2024-11-30T10:55:00Z',
    timestamp: '2024-11-30T10:55:00Z',
    latitude: 11.0168,
    longitude: 76.9558,
  },
  {
    id: 7,
    trip: 7, // Arjun Menon's Trivandrum trip
    speed: 42.8,
    start_speed_time: '2024-11-30T11:20:00Z',
    end_speed_time: '2024-11-30T11:30:00Z',
    timestamp: '2024-11-30T11:30:00Z',
    latitude: 8.4004,
    longitude: 76.9787,
  },
  {
    id: 8,
    trip: 11, // Mohammed Ismail's Warangal trip
    speed: 45.2,
    start_speed_time: '2024-11-30T13:15:00Z',
    end_speed_time: '2024-11-30T13:25:00Z',
    timestamp: '2024-11-30T13:25:00Z',
    latitude: 18.0013,
    longitude: 79.5881,
  },
  {
    id: 9,
    trip: 16, // Meera Singh's Vijayawada trip
    speed: 42.5,
    start_speed_time: '2024-11-30T15:45:00Z',
    end_speed_time: '2024-11-30T15:55:00Z',
    timestamp: '2024-11-30T15:55:00Z',
    latitude: 16.5107,
    longitude: 80.6287,
  },
  {
    id: 10,
    trip: 19, // Lakshmi Raghavan's Vellore trip
    speed: 48.5,
    start_speed_time: '2024-11-30T17:15:00Z',
    end_speed_time: '2024-11-30T17:25:00Z',
    timestamp: '2024-11-30T17:25:00Z',
    latitude: 12.9692,
    longitude: 79.1559,
  },
  {
    id: 11,
    trip: 5, // Anita Hegde's Mysore trip
    speed: 35.2,
    start_speed_time: '2024-11-30T10:15:00Z',
    end_speed_time: '2024-11-30T10:25:00Z',
    timestamp: '2024-11-30T10:25:00Z',
    latitude: 12.2725,
    longitude: 76.6736,
  },
  {
    id: 12,
    trip: 8, // Meera Singh's Vizag trip
    speed: 32.5,
    start_speed_time: '2024-11-30T11:45:00Z',
    end_speed_time: '2024-11-30T11:55:00Z',
    timestamp: '2024-11-30T11:55:00Z',
    latitude: 17.6868,
    longitude: 83.2185,
  },
  {
    id: 13,
    trip: 14, // Sunita Reddy's Tirupati trip
    speed: 25.4,
    start_speed_time: '2024-11-30T14:45:00Z',
    end_speed_time: '2024-11-30T14:55:00Z',
    timestamp: '2024-11-30T14:55:00Z',
    latitude: 13.6833,
    longitude: 79.3474,
  },
  {
    id: 14,
    trip: 17, // Suresh Venkatesh's Ooty trip
    speed: 22.5,
    start_speed_time: '2024-11-30T16:15:00Z',
    end_speed_time: '2024-11-30T16:25:00Z',
    timestamp: '2024-11-30T16:25:00Z',
    latitude: 11.4087,
    longitude: 76.7367,
  },
  {
    id: 15,
    trip: 13, // Ravi Krishnan's Thrissur trip
    speed: 38.5,
    start_speed_time: '2024-11-30T14:15:00Z',
    end_speed_time: '2024-11-30T14:25:00Z',
    timestamp: '2024-11-30T14:25:00Z',
    latitude: 10.5276,
    longitude: 76.2144,
  },
  {
    id: 16,
    trip: 9, // Abdul Rahman Khan's Mangalore trip (second report)
    speed: 52.3,
    start_speed_time: '2024-11-30T12:30:00Z',
    end_speed_time: '2024-11-30T12:40:00Z',
    timestamp: '2024-11-30T12:40:00Z',
    latitude: 12.918,
    longitude: 74.8025,
  },
  {
    id: 17,
    trip: 12, // Lakshmi Raghavan's Salem trip (second report)
    speed: 50.1,
    start_speed_time: '2024-11-30T14:00:00Z',
    end_speed_time: '2024-11-30T14:10:00Z',
    timestamp: '2024-11-30T14:10:00Z',
    latitude: 11.6648,
    longitude: 78.1465,
  },
  {
    id: 18,
    trip: 15, // Anita Hegde's Hubli trip (second report)
    speed: 55.7,
    start_speed_time: '2024-11-30T15:30:00Z',
    end_speed_time: '2024-11-30T15:40:00Z',
    timestamp: '2024-11-30T15:40:00Z',
    latitude: 15.3652,
    longitude: 75.1245,
  },
  {
    id: 19,
    trip: 6, // Lakshmi Raghavan's Coimbatore trip (second report)
    speed: 46.8,
    start_speed_time: '2024-11-30T11:00:00Z',
    end_speed_time: '2024-11-30T11:10:00Z',
    timestamp: '2024-11-30T11:10:00Z',
    latitude: 11.0173,
    longitude: 76.9563,
  },
  {
    id: 20,
    trip: 7, // Arjun Menon's Trivandrum trip (second report)
    speed: 40.5,
    start_speed_time: '2024-11-30T11:35:00Z',
    end_speed_time: '2024-11-30T11:45:00Z',
    timestamp: '2024-11-30T11:45:00Z',
    latitude: 8.4009,
    longitude: 76.9792,
  },
];
