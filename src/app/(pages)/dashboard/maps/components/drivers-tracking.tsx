'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Map as LeafletMap } from 'leaflet';
import {
  UserRound,
  RefreshCcw,
  Battery,
  Signal,
  MapPin,
  Clock,
  Smartphone,
  AlertCircle,
  ChevronRight,
  Search,
} from 'lucide-react';
import { GpsDataMock } from '@/constants/gps-data';
import { Drivers } from '@/constants/drivers';
import MapComponent from './MapComponent';
import { cn } from '@/lib/utils';
import { Driver, GpsData } from '@/types';
interface DriverWithGPS extends Driver {
  gpsData?: GpsData;
}

export default function DriverTrackingDashboard() {
  const [selectedDriver, setSelectedDriver] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'online' | 'offline'
  >('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMapDialogOpen, setIsMapDialogOpen] = useState<boolean>(false);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (isMapDialogOpen || window.innerWidth >= 1024) {
      const timer = setTimeout(() => {
        setIsMapReady(true);
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMapDialogOpen]);

  const driversWithGPS = useMemo<DriverWithGPS[]>(() => {
    return Drivers.map((driver) => ({
      ...driver,
      gpsData: GpsDataMock.find((gps) => gps.driver === driver.id),
    }));
  }, []);

  const filteredDrivers = useMemo<DriverWithGPS[]>(() => {
    return driversWithGPS.filter((driver) => {
      const matchesSearch = driver.fullname
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === 'all'
          ? true
          : filterStatus === 'online'
            ? (driver.gpsData?.signal_strength ?? 0) > 0
            : (driver.gpsData?.signal_strength ?? 0) === 0;
      return matchesSearch && matchesStatus;
    });
  }, [driversWithGPS, filterStatus, searchQuery]);

  const selectedDriverGPS = useMemo<GpsData | undefined>(() => {
    const driver = driversWithGPS.find((d) => d.id === selectedDriver);
    return driver?.gpsData;
  }, [driversWithGPS, selectedDriver]);

  const selectedDriverName = useMemo<string>(() => {
    return driversWithGPS.find((d) => d.id === selectedDriver)?.fullname ?? '';
  }, [driversWithGPS, selectedDriver]);

  const getBatteryColor = (level: number): string => {
    if (level > 60) return 'text-success-500';
    if (level > 20) return 'text-warning-500';
    return 'text-destructive-500';
  };

  const getSignalStrengthText = (strength: number): string => {
    if (strength > 3) return 'Excellent';
    if (strength > 2) return 'Good';
    if (strength > 0) return 'Poor';
    return 'No Signal';
  };

  const handleDriverSelect = (driverId: number): void => {
    setSelectedDriver(driverId);
    if (window.innerWidth < 1024) {
      setIsMapDialogOpen(true);
    }
  };

  const handleReset = (): void => {
    setSelectedDriver(1);
    setFilterStatus('all');
    setSearchQuery('');
    setIsMapReady(false);
  };

  const renderDriverCard = (driver: DriverWithGPS): JSX.Element => {
    const isOnline = (driver.gpsData?.signal_strength ?? 0) > 0;
    const isSelected = driver.id === selectedDriver;

    return (
      <Card
        key={driver.id}
        className={cn(
          'relative transition-all cursor-pointer hover:shadow-md rounded-md',
          isSelected
            ? 'bg-gradient-to-r from-[hsl(var(--gradient-purple-start))] to-[hsl(var(--gradient-purple-end))] text-white'
            : 'bg-card hover:bg-accent',
          !isOnline && 'opacity-75'
        )}
        onClick={() => handleDriverSelect(driver.id)}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'p-2 rounded-md',
                    isSelected ? 'bg-white/10' : 'bg-gray-500/10'
                  )}
                >
                  <UserRound
                    className={cn(
                      'w-4 h-4',
                      isSelected ? 'text-white' : 'text-primary-600'
                    )}
                  />
                </div>
                <span className="text-button-md font-medium">
                  {driver.fullname}
                </span>
              </div>
              <ChevronRight
                className={cn(
                  'w-4 h-4',
                  isSelected ? 'text-white' : 'text-muted-foreground'
                )}
              />
            </div>

            {/* Status Labels */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Signal
                  className={cn(
                    'w-4 h-4',
                    isSelected ? 'text-white' : undefined
                  )}
                />
                <span
                  className={cn(
                    isSelected
                      ? 'text-white'
                      : isOnline
                        ? 'text-success-500'
                        : 'text-destructive-500'
                  )}
                >
                  {getSignalStrengthText(driver.gpsData?.signal_strength ?? 0)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Battery
                  className={cn(
                    'w-4 h-4',
                    isSelected
                      ? 'text-white'
                      : getBatteryColor(driver.gpsData?.battery_level ?? 0)
                  )}
                />
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
  };

  const renderMap = (): JSX.Element => (
    <>
      {selectedDriverGPS?.latitude && selectedDriverGPS?.longitude ? (
        <div className="absolute inset-0 w-full h-full">
          <MapComponent
            key={`map-${selectedDriver}-${isMapDialogOpen ? 'dialog' : 'desktop'}`}
            center={[selectedDriverGPS.latitude, selectedDriverGPS.longitude]}
            zoom={13}
            markerPosition={[
              selectedDriverGPS.latitude,
              selectedDriverGPS.longitude,
            ]}
            popupContent={selectedDriverName}
            onMapReady={() => setIsMapReady(true)}
            mapRef={mapRef}
          />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center bg-muted/20">
          <div className="text-center text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p>No location data available</p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="h-full relative">
      {/* Main Layout */}
      <div className="grid lg:grid-cols-[380px,1fr] gap-4 h-full">
        {/* Left Sidebar */}
        <div className="space-y-4 p-4 overflow-y-auto bg-card rounded-lg shadow-md">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search User"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card border-border"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filterStatus}
                onValueChange={setFilterStatus as (value: string) => void}
              >
                <SelectTrigger className="w-full bg-card border-border">
                  <SelectValue placeholder="Driver Status" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectGroup className="bg-card">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#d6f7fb] hover:bg-[#c2f4f9] dark:bg-[#274c62] dark:hover:bg-[#24596f] text-accent-foreground shrink-0"
                onClick={handleReset}
              >
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredDrivers.map(renderDriverCard)}
          </div>
        </div>

        {/* Map Section - Desktop */}
        <div className="relative h-full rounded-lg overflow-hidden hidden lg:block">
          {renderMap()}
        </div>

        {/* Map Dialog - Mobile */}
        <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
          <DialogContent className="p-4 max-w-[85dvw] h-fit bg-card rounded-md">
            <h6 className="text-sm font-medium text-left text-muted-foreground h-fit">
              {selectedDriverName}'s Location
            </h6>
            <div className="relative w-full h-[26rem] p-2 rounded-md">
              {renderMap()}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
