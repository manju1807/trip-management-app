import type { VehicleMaintenance } from '@/types';

export const VehicleMaintenanceMock: VehicleMaintenance[] = [
  {
    id: 1,
    trip: 3, // Ashok Leyland Bus - Kochi Coastal Route
    odometer: 89720.3,
    service_type: 'Brake System Maintenance',
    service_center_name: 'Ashok Leyland Service Center - Kochi',
    bill_number: 'ASC/KCH/2024/1156',
    bill_amount: 12500.0,
    maintenance_time: '2024-11-30T07:30:00Z',
  },
  {
    id: 2,
    trip: 6, // Mahindra XUV300 - Coimbatore Industrial Belt
    odometer: 42630.4,
    service_type: 'Regular Service',
    service_center_name: 'Mahindra Authorized Service - Coimbatore',
    bill_number: 'MAS/CBE/2024/2789',
    bill_amount: 8200.0,
    maintenance_time: '2024-11-30T08:15:00Z',
  },
  {
    id: 3,
    trip: 8, // Tata Prima Truck - Vizag Port Route
    odometer: 125430.8,
    service_type: 'Engine Oil Change',
    service_center_name: 'Tata Motors Workshop - Vizag',
    bill_number: 'TMW/VZG/2024/3421',
    bill_amount: 15800.0,
    maintenance_time: '2024-11-30T09:00:00Z',
  },
  {
    id: 4,
    trip: 10, // Volvo Bus - Madurai Temple Circuit
    odometer: 78920.4,
    service_type: 'Air Conditioning Service',
    service_center_name: 'Volvo Bus Service Center - Madurai',
    bill_number: 'VBS/MDU/2024/4532',
    bill_amount: 18500.0,
    maintenance_time: '2024-11-30T10:30:00Z',
  },
  {
    id: 5,
    trip: 12, // Hyundai Alcazar - Salem Industrial Connect
    odometer: 32195.6,
    service_type: 'Tire Replacement',
    service_center_name: 'Hyundai Service Plus - Salem',
    bill_number: 'HSP/SLM/2024/5643',
    bill_amount: 32000.0,
    maintenance_time: '2024-11-30T11:15:00Z',
  },
  {
    id: 6,
    trip: 13, // Bharat Benz Tanker - Thrissur Festival Route
    odometer: 156780.2,
    service_type: 'Transmission Service',
    service_center_name: 'Bharat Benz Service - Thrissur',
    bill_number: 'BBS/TCR/2024/6754',
    bill_amount: 25600.0,
    maintenance_time: '2024-11-30T12:00:00Z',
  },
  {
    id: 7,
    trip: 15, // Skoda Kushaq - Hubli Commerce Route
    odometer: 15825.4,
    service_type: 'Regular Service',
    service_center_name: 'Skoda Service Center - Hubli',
    bill_number: 'SSC/HBL/2024/7865',
    bill_amount: 9800.0,
    maintenance_time: '2024-11-30T12:45:00Z',
  },
  {
    id: 8,
    trip: 16, // Tata Prima Truck - Vijayawada City Circuit
    odometer: 125575.9,
    service_type: 'Clutch Repair',
    service_center_name: 'Tata Commercial Service - Vijayawada',
    bill_number: 'TCS/VJW/2024/8976',
    bill_amount: 22500.0,
    maintenance_time: '2024-11-30T13:30:00Z',
  },
  {
    id: 9,
    trip: 18, // Toyota Glanza - Calicut Beach Route
    odometer: 23450.6,
    service_type: 'Battery Replacement',
    service_center_name: 'Toyota Service Edge - Calicut',
    bill_number: 'TSE/CLT/2024/9087',
    bill_amount: 8500.0,
    maintenance_time: '2024-11-30T14:15:00Z',
  },
  {
    id: 10,
    trip: 20, // Toyota Innova - Hampi Heritage Circuit
    odometer: 45375.8,
    service_type: 'Wheel Alignment',
    service_center_name: 'Toyota Service - Hospet',
    bill_number: 'TSH/HSP/2024/1098',
    bill_amount: 2500.0,
    maintenance_time: '2024-11-30T15:00:00Z',
  },
  {
    id: 11,
    trip: 1, // Toyota Innova - Bangalore Urban Circuit
    odometer: 45280.5,
    service_type: 'Air Filter Change',
    service_center_name: 'Toyota Service - Bangalore',
    bill_number: 'TSB/BLR/2024/2109',
    bill_amount: 3200.0,
    maintenance_time: '2024-11-30T06:45:00Z',
  },
  {
    id: 12,
    trip: 4, // Kia Carens - Hyderabad Tech Corridor
    odometer: 28450.9,
    service_type: 'Regular Service',
    service_center_name: 'Kia Motors Service - Hyderabad',
    bill_number: 'KMS/HYD/2024/3210',
    bill_amount: 7800.0,
    maintenance_time: '2024-11-30T08:45:00Z',
  },
  {
    id: 13,
    trip: 7, // Toyota Glanza - Trivandrum Coastal Highway
    odometer: 23410.2,
    service_type: 'Brake Pad Replacement',
    service_center_name: 'Toyota Service - Trivandrum',
    bill_number: 'TST/TVM/2024/4321',
    bill_amount: 6500.0,
    maintenance_time: '2024-11-30T09:30:00Z',
  },
  {
    id: 14,
    trip: 11, // Eicher Truck - Warangal Heritage Route
    odometer: 98450.6,
    service_type: 'Suspension Service',
    service_center_name: 'Eicher Service Center - Warangal',
    bill_number: 'ESC/WRL/2024/5432',
    bill_amount: 18900.0,
    maintenance_time: '2024-11-30T11:45:00Z',
  },
  {
    id: 15,
    trip: 14, // Force Motors Mini Bus - Tirupati Temple Route
    odometer: 67890.5,
    service_type: 'Engine Tune-up',
    service_center_name: 'Force Motors Workshop - Tirupati',
    bill_number: 'FMW/TPT/2024/6543',
    bill_amount: 12300.0,
    maintenance_time: '2024-11-30T13:15:00Z',
  },
  {
    id: 16,
    trip: 17, // Volvo Bus - Ooty Hill Route
    odometer: 79015.8,
    service_type: 'Brake System Check',
    service_center_name: 'Volvo Service Center - Ooty',
    bill_number: 'VSC/OTY/2024/7654',
    bill_amount: 9500.0,
    maintenance_time: '2024-11-30T14:45:00Z',
  },
  {
    id: 17,
    trip: 19, // Mahindra XUV300 - Vellore Education Route
    odometer: 42680.3,
    service_type: 'Oil and Filter Change',
    service_center_name: 'Mahindra Service - Vellore',
    bill_number: 'MSV/VLR/2024/8765',
    bill_amount: 4800.0,
    maintenance_time: '2024-11-30T15:45:00Z',
  },
  {
    id: 18,
    trip: 2, // Hyundai Alcazar - Chennai Metro Connect
    odometer: 32150.7,
    service_type: 'AC Service',
    service_center_name: 'Hyundai Service Hub - Chennai',
    bill_number: 'HSH/CHN/2024/9876',
    bill_amount: 5500.0,
    maintenance_time: '2024-11-30T07:15:00Z',
  },
  {
    id: 19,
    trip: 5, // Skoda Kushaq - Mysore Heritage Circuit
    odometer: 15780.2,
    service_type: 'Regular Service',
    service_center_name: 'Skoda Workshop - Mysore',
    bill_number: 'SWM/MYS/2024/0987',
    bill_amount: 8900.0,
    maintenance_time: '2024-11-30T08:30:00Z',
  },
  {
    id: 20,
    trip: 9, // Toyota Innova - Mangalore Port Connect
    odometer: 45325.7,
    service_type: 'Tire Rotation',
    service_center_name: 'Toyota Service - Mangalore',
    bill_number: 'TSM/MNG/2024/1234',
    bill_amount: 1800.0,
    maintenance_time: '2024-11-30T10:15:00Z',
  },
];
