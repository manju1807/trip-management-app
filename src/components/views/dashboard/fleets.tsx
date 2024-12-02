import { useDashboard } from "@/hooks/useDashboard";
import { Truck, Activity, TimerOff } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

export default function FleetCard() {
  const stats = useDashboard();

  return (
    <Card className="bg-card text-muted-foreground rounded-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-400">Fleets Data</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{stats.vehicles.total}</span>
          <span className="text-emerald-500 text-sm">+4.2%</span>
        </div>
        <p className="text-xs text-gray-400">You informed of this week compared to last week</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mt-4 bg-slate-800/50 p-4 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-indigo-500" />
              <span className="text-gray-400">Total</span>
            </div>
            <div className="text-xl mt-1">{stats.vehicles.total}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-500" />
              <span className="text-gray-400">Available</span>
            </div>
            <div className="text-xl mt-1">{stats.vehicles.available}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <TimerOff className="h-4 w-4 text-red-500" />
              <span className="text-gray-400">On Trip</span>
            </div>
            <div className="text-xl mt-1">{stats.vehicles.onTrip}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
