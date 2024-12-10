'use client';

import React, { useState } from 'react';
import { useDriver } from '@/hooks/useDriver';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  UserCheck,
  UserX,
  AlertTriangle,
  Battery,
  Signal,
  Clock,
  Shield,
  Car,
  Activity,
  MapPin,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DriverTableContainer } from '@/components/features/driver-table';
import { EnhancedDriver } from '@/types';
import { Separator } from '@/components/ui/separator';

// Types
interface MetricCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ElementType;
  trend?: number;
  color?: string;
}

interface DriverDetailsPanelProps {
  selectedDriver?: EnhancedDriver | null;
}

// MetricCard Component
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
}) => (
  <Card className="flex-1 rounded-md">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`text-${color}-500`} size={20} />
        </div>
      </div>
    </CardContent>
  </Card>
);

// DriverDetailsPanel Component
const DriverDetailsPanel: React.FC<DriverDetailsPanelProps> = ({
  selectedDriver,
}) => {
  if (!selectedDriver) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a driver to view details
      </div>
    );
  }

  return (
    <div className="h-full p-6 space-y-6 overflow-y-auto">
      {/* Driver Header */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-xl font-semibold text-primary-500">
              {selectedDriver.fullname
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
            ${
              selectedDriver.status === 'available'
                ? 'bg-success-500'
                : selectedDriver.status === 'on-trip'
                  ? 'bg-warning-500'
                  : 'bg-muted-foreground'
            }`}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{selectedDriver.fullname}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>#{selectedDriver.id}</span>
            <span>•</span>
            <span className="capitalize">{selectedDriver.status}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Stats */}
      <div>
        <h4 className="text-sm font-semibold mb-4">Performance Overview</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-semibold text-primary-500">
              {selectedDriver.metrics.safetyMetrics.safetyRating}%
            </div>
            <div className="text-xs text-muted-foreground">Safety Score</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-semibold text-primary-500">
              {selectedDriver.metrics.tripMetrics.onTimeRate}%
            </div>
            <div className="text-xs text-muted-foreground">On-Time Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-semibold text-primary-500">
              {selectedDriver.metrics.timeManagement.breakTimeCompliance}%
            </div>
            <div className="text-xs text-muted-foreground">
              Break Compliance
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Vehicle & Trip Info */}
      <div>
        <h4 className="text-sm font-semibold mb-4">Current Status</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Current Vehicle</span>
            </div>
            <span className="text-sm font-medium">
              {selectedDriver.currentVehicle?.id || 'Unassigned'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Region</span>
            </div>
            <span className="text-sm font-medium">{selectedDriver.state}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">License</span>
            </div>
            <span className="text-sm font-medium">
              {selectedDriver.license_number}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Current Trip */}
      {selectedDriver.currentTrip && (
        <>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold">
                Active Trip #{selectedDriver.currentTrip.id}
              </h4>
              <div className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded">
                In Progress
              </div>
            </div>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="speed" stroke="#7367F0" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Recent Activity */}
      <div>
        <h4 className="text-sm font-semibold mb-4">Recent Activity</h4>
        <div className="space-y-4">
          {selectedDriver.recentActivity.slice(0, 4).map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <Activity className="h-4 w-4 text-primary-500 mt-1" />
              <div>
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main DriverManagement Component
const DriverManagement = () => {
  const {
    drivers,
    selectedDrivers,
    overviewMetrics,
    selectDriver,
    isLoading,
    error,
  } = useDriver();
  React.useEffect(() => {
    if (drivers.length > 0 && selectedDrivers.length === 0) {
      selectDriver(drivers[0].id);
    }
  }, [drivers, selectedDrivers, selectDriver]);
  const selectedDriver =
    drivers.find((d) => d.id === selectedDrivers[0]) || drivers[0];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="md:max-w-[86rem] max-w-[100dvw] overflow-x-auto overflow-y-auto p-4">
      <div className="h-full relative">
        <div className="grid lg:grid-cols-[380px,1fr] gap-4 h-full">
          {/* Left Sidebar */}
          <div className="space-y-4 p-4 overflow-y-auto bg-card rounded-md shadow-md">
            <DriverDetailsPanel selectedDriver={selectedDriver} />
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Drivers"
                value={overviewMetrics.totalCount}
                subtitle="Registered drivers"
                icon={Users}
                trend={5}
              />
              <MetricCard
                title="Active Drivers"
                value={overviewMetrics.activeCount}
                subtitle="Currently on trip"
                icon={UserCheck}
                trend={2}
                color="success"
              />
              <MetricCard
                title="Available Drivers"
                value={overviewMetrics.availableCount}
                subtitle="Ready for dispatch"
                icon={Clock}
                trend={-3}
                color="warning"
              />
              <MetricCard
                title="Critical Issues"
                value={overviewMetrics.criticalIssues.total}
                subtitle="Require attention"
                icon={AlertTriangle}
                color="destructive"
              />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Device Status Card */}
              <Card className="rounded-md">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold mb-4">Device Status</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Battery className="text-warning-500" size={16} />
                        <span className="text-sm">Low Battery</span>
                      </div>
                      <span>{overviewMetrics.criticalIssues.lowBattery}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Signal className="text-warning-500" size={16} />
                        <span className="text-sm">Poor Signal</span>
                      </div>
                      <span>{overviewMetrics.criticalIssues.poorSignal}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* License Status Card */}
              <Card className="rounded-md">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold mb-4">License Status</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Shield className="text-destructive-500" size={16} />
                        <span className="text-sm">Expired</span>
                      </div>
                      <span>{overviewMetrics.licenseAlerts.expired}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Clock className="text-warning-500" size={16} />
                        <span className="text-sm">Expiring Soon</span>
                      </div>
                      <span>{overviewMetrics.licenseAlerts.expiringSoon}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Assignment Card */}
              <Card className="rounded-md">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold mb-4">
                    Vehicle Assignment
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Car className="text-primary-500" size={16} />
                        <span className="text-sm">Assigned</span>
                      </div>
                      <span>
                        {drivers.filter((d) => d.currentVehicle).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <UserX className="text-muted-foreground" size={16} />
                        <span className="text-sm">Unassigned</span>
                      </div>
                      <span>
                        {drivers.filter((d) => !d.currentVehicle).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions and Table Section */}
            <div className="min-h-[400px]">
              <DriverTableContainer
                data={drivers}
                onDriverSelect={selectDriver}
                statusFilters={[]}
                searchTerm={''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;
