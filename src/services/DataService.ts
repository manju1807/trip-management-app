// // services/DataService.ts
// export class DataService {
//   // Get all data related to a driver
//   static getDriverDetails(driverId: number) {
//     const driver = DriversMock.find(d => d.id === driverId);
//     const trips = TripsMock.filter(t => t.driver === driverId);
//     const gpsData = GpsDataMock.filter(g => g.driver === driverId);

//     return {
//       driver,
//       trips,
//       gpsData
//     };
//   }

//   // Get all data related to a vehicle
//   static getVehicleDetails(vehicleId: number) {
//     const vehicle = VehiclesMock.find(v => v.id === vehicleId);
//     const trips = TripsMock.filter(t => t.vehicle === vehicleId);

//     return {
//       vehicle,
//       trips,
//       maintenance: MaintenanceReportsMock.filter(m =>
//         trips.some(t => t.id === m.trip)
//       ),
//       fuel: FuelReportsMock.filter(f =>
//         trips.some(t => t.id === f.trip)
//       )
//     };
//   }

//   // Get complete trip details
//   static getTripDetails(tripId: number) {
//     const trip = TripsMock.find(t => t.id === tripId);
//     if (!trip) return null;

//     return {
//       trip,
//       driver: DriversMock.find(d => d.id === trip.driver),
//       vehicle: VehiclesMock.find(v => v.id === trip.vehicle),
//       route: RoutesMock.find(r => r.id === trip.route),
//       speedReports: SpeedReportsMock.filter(s => s.trip === tripId),
//       idleReports: IdleReportsMock.filter(i => i.trip === tripId),
//       fuelReports: FuelReportsMock.filter(f => f.trip === tripId),
//       maintenanceReports: MaintenanceReportsMock.filter(m => m.trip === tripId)
//     };
//   }

//   // Get route analysis
//   static getRouteAnalysis(routeId: number) {
//     const route = RoutesMock.find(r => r.id === routeId);
//     const trips = TripsMock.filter(t => t.route === routeId);

//     return {
//       route,
//       trips,
//       averageSpeed: this.calculateAverageSpeed(trips),
//       totalIdleTime: this.calculateTotalIdleTime(trips),
//       // Add more analytics as needed
//     };
//   }
// }
