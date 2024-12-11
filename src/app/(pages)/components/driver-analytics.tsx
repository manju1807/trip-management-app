import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import graphicsImg from '@/custom/assets/graphic-illustration-1.png';
import Image from 'next/image';
import { useDashboard } from '@/hooks/useDashboard';

export default function DriverAnalysisCard() {
  const stats = useDashboard();

  return (
    <Card className="col-span-1 md:col-span-2 relative bg-[hsl(var(--gradient-purple-start))] shadow-xl text-destructive-foreground rounded-md overflow-hidden border-border">
      <CardHeader className="pb-2">
        <h5 className="text-xl font-semibold mb-1">Voyager Pro Analysis</h5>
        <p className="text-sm opacity-75">Driver Analysis</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center pt-2 md:pt-0">
        {/* Details */}
        <div className="col-span-1 sm:col-span-2">
          <h6 className="text-lg font-semibold mb-4">Driver</h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { count: stats.drivers.available, label: 'Available' },
              { count: stats.drivers.offline, label: 'Offline Drivers' },
              { count: stats.drivers.onTrip, label: 'On-Trip Drivers' },
              { count: stats.drivers.total, label: 'Total Drivers' },
            ].map(({ count, label }, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="flex items-center justify-center bg-primary/10 rounded-md font-medium h-8 w-12">
                  {count}
                </div>
                <p className="text-sm font-medium truncate">{label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Image */}
        <div className="sm:col-span-1 flex justify-center">
          <Image
            src={graphicsImg.src}
            alt="Graphic Illustration"
            height={40}
            width={40}
            className="h-40 w-auto object-contain drop-shadow-2xl"
            priority
            quality={100}
            unoptimized
          />
        </div>
      </CardContent>
    </Card>
  );
}
