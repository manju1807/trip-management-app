import DriverAnalysisCard from "@/components/views/dashboard/driver-analytics";
import FleetCard from "@/components/views/dashboard/fleets";
import PerformanceCard from "@/components/views/dashboard/performance-card";
import LocationCard from '@/components/views/dashboard/location-detail';
import TripTrackerCard from '@/components/views/dashboard/trip-tracker';

export default function DashboardHome() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-4">
        <DriverAnalysisCard />
        <PerformanceCard />
        <LocationCard />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FleetCard />
        <TripTrackerCard />
      </div>
    </div>
  );
}
