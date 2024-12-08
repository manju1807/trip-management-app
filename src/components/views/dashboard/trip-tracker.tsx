'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Hourglass, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useDashboard } from '@/hooks/useDashboard';

const ReactApexcharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function TripsTracker() {
  const stats = useDashboard();
  const [chartSeries, setChartSeries] = React.useState<number[]>([0]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const completionRate = Math.round(
        (stats.trips.completed / stats.trips.total) * 100
      );
      setChartSeries([completionRate || 0]);
    }, 300); // Delay to allow for smooth animation

    return () => clearTimeout(timeout);
  }, [stats.trips.completed, stats.trips.total]);

  // Chart options
  const options: ApexOptions = {
    chart: {
      height: 320,
      type: 'radialBar',
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: true,
          speed: 1000,
        },
      },
    },
    stroke: {
      dashArray: 10,
      lineCap: 'butt',
      width: 20,
      show: true,
      curve: 'smooth',
    },
    labels: ['Completed Trips'],
    colors: ['hsl(var(--gradient-purple-start))'],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityTo: 0.5,
        opacityFrom: 1,
        shadeIntensity: 0.5,
        stops: [30, 70, 100],
        inverseColors: false,
        gradientToColors: ['hsl(var(--gradient-purple-start))'],
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -140,
        endAngle: 130,
        hollow: { size: '60%' },
        track: {
          background: 'transparent',
          startAngle: -140,
          endAngle: 130,
        },
        dataLabels: {
          name: {
            offsetY: -15,
            color: 'hsl(var(--muted-foreground))',
            fontSize: '16px',
            fontWeight: '400',
          },
          value: {
            offsetY: 15,
            fontSize: '36px',
            fontWeight: '600',
            formatter: (val) => `${val}%`,
            color: 'hsl(var(--foreground))',
            show: true,
          },
        },
      },
    },
  };

  // Data for stats
  const data = [
    {
      title: 'In Progress',
      subtitle: stats.trips.inProgress,
      icon: <Loader2 className="h-5 w-5" />,
      color: 'hsl(var(--chart-1))',
    },
    {
      title: 'Scheduled',
      subtitle: stats.trips.scheduled,
      icon: <Clock className="h-5 w-5" />,
      color: 'hsl(var(--chart-2))',
    },
    {
      title: 'Delayed',
      subtitle: stats.trips.delayed,
      icon: <Hourglass className="h-5 w-5" />,
      color: 'hsl(var(--chart-3))',
    },
  ];

  // Constants for reused styles
  const cardHeaderClasses = 'pb-2';
  const cardTitleClasses = 'text-base font-medium';
  const subtitleClasses = 'text-xs font-normal text-muted-foreground mt-1';
  const metricTitleClasses = 'text-4xl font-semibold mb-2';
  const metricSubtitleClasses = 'mb-8 text-base text-muted-foreground';
  const itemContainerClasses = 'flex items-center mb-6 last:mb-0';
  const itemIconWrapperClasses =
    'mr-4 flex h-12 w-12 items-center justify-center rounded-lg';
  const itemTitleClasses = 'text-sm font-medium';
  const itemSubtitleClasses = 'text-xs text-muted-foreground';

  return (
    <Card className="h-full w-full rounded-md shadow-xl">
      <CardHeader className={cardHeaderClasses}>
        <CardTitle className={cardTitleClasses}>
          Trips Tracker
          <p className={subtitleClasses}>Last 7 Days</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <h2 className={metricTitleClasses}>{stats.trips.total}</h2>
            <p className={metricSubtitleClasses}>Total Trips</p>
            {data.map((item, index) => (
              <div key={index} className={itemContainerClasses}>
                <div
                  className={itemIconWrapperClasses}
                  style={{
                    backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`,
                  }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <div className="flex flex-col">
                  <h6 className={itemTitleClasses}>{item.title}</h6>
                  <span className={itemSubtitleClasses}>{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center sm:col-span-7">
            <ReactApexcharts
              type="radialBar"
              height={325}
              options={options}
              series={chartSeries}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
