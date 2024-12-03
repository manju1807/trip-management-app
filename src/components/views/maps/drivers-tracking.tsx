'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserRound,
  RefreshCcw,
  Battery,
  Signal,
  MapPin,
  Clock,
  Smartphone,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { GpsDataMock } from '@/constants/gps-data';
import { Drivers } from '@/constants/drivers';
import MapComponent from '@/components/views/maps/MapComponent';

export default function DriverTrackingDashboard() {
  const [selectedDriver, setSelectedDriver] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced driver data combination
  const driversWithGPS = useMemo(() => {
    return Drivers.map(driver => ({
      ...driver,
      gpsData: GpsDataMock.find(gps => gps.driver === driver.id)
    }));
  }, []);

  const filteredDrivers = useMemo(() => {
    return driversWithGPS.filter(driver => {
      const matchesSearch = driver.fullname.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all'
        ? true
        : filterStatus === 'online'
          ? (driver.gpsData?.signal_strength ?? 0) > 0
          : (driver.gpsData?.signal_strength ?? 0) === 0;
      return matchesSearch && matchesStatus;
    });
  }, [driversWithGPS, filterStatus, searchQuery]);

  const selectedDriverGPS = useMemo(() => {
    const driver = driversWithGPS.find(d => d.id === selectedDriver);
    return driver?.gpsData;
  }, [driversWithGPS, selectedDriver]);

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSignalStrengthText = (strength: number) => {
    if (strength > 3) return 'Excellent';
    if (strength > 2) return 'Good';
    if (strength > 0) return 'Poor';
    return 'No Signal';
  };

  return (
    <div className="grid grid-cols-[380px,1fr] gap-4 h-full">
      {/* Left Sidebar */}
      <div className="space-y-4 p-4 overflow-y-auto bg-card rounded-md shadow-md">
        <div className="space-y-3">
          <Input
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-card rounded-md"
          />
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-full bg-card rounded-md">
              <SelectValue placeholder="Driver Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            className="w-full bg-[#d6f7fb] hover:bg-[#c2f4f9] dark:bg-[#274c62] dark:hover:bg-[#24596f] text-accent-foreground"
            onClick={() => setSelectedDriver(1)}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="space-y-3">
          {filteredDrivers.map((driver) => {
            const isOnline = (driver.gpsData?.signal_strength ?? 0) > 0;
            const isSelected = driver.id === selectedDriver;

            return (
              <Card
                key={driver.id}
                className={`relative transition-all cursor-pointer hover:shadow-md rounded-md ${isSelected ? 'bg-gradient-to-r from-[hsl(var(--gradient-purple-start))] to-[hsl(var(--gradient-purple-end))] text-white'
                  : 'bg-card hover:bg-accent'
                  } ${!isOnline ? 'opacity-75' : ''}`}
                onClick={() => setSelectedDriver(driver.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserRound className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-primary'}`} />
                        <span className="font-semibold">{driver.fullname}</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>

                    {/* Status Labels */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Signal className={`w-4 h-4 ${isSelected ? 'text-white' : ''}`} />
                        <span className={isSelected ? 'text-white' : isOnline ? 'text-green-500' : 'text-red-500'}>
                          {getSignalStrengthText(driver.gpsData?.signal_strength ?? 0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Battery className={`w-4 h-4 ${isSelected ? 'text-white' : getBatteryColor(driver.gpsData?.battery_level ?? 0)
                          }`} />
                        <span>{driver.gpsData?.battery_level ?? 0}%</span>
                      </div>
                    </div>

                    {/* Device Info */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span>{driver.gpsData?.os_version ?? 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {driver.gpsData?.timestamp
                            ? new Date(driver.gpsData.timestamp).toLocaleTimeString()
                            : 'No Data'}
                        </span>
                      </div>
                    </div>

                    {/* Location & Speed */}
                    {driver.gpsData?.latitude && (
                      <div className="text-sm grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          <span>{driver.gpsData.speed ?? 0} km/h</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Map Section */}
      <div className="h-full">
        {selectedDriverGPS?.latitude && selectedDriverGPS?.longitude ? (
          <MapComponent
            center={[selectedDriverGPS.latitude, selectedDriverGPS.longitude]}
            zoom={13}
            markerPosition={[selectedDriverGPS.latitude, selectedDriverGPS.longitude]}
            popupContent={driversWithGPS.find(d => d.id === selectedDriver)?.fullname || ''}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>No location data available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}