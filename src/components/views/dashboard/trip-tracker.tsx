'use client';

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Clock, Hourglass, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { useDashboard } from '@/hooks/useDashboard'

const ReactApexcharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export default function TripsTracker() {
  const stats = useDashboard();
  const completionRate = Math.round((stats.trips.completed / stats.trips.total) * 100);

  const options: ApexOptions = {
    chart: {
      height: 320,
      type: 'radialBar',
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: true,
          speed: 1000
        }
      }
    },
    stroke: {
      dashArray: 10,
      lineCap: 'butt',
      width: 20,
      show: true,
      curve: 'smooth'
    },
    labels: ['Completed Trips'],
    colors: ['hsl(var(--gradient-purple-start))'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
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
        gradientToColors: ['hsl(var(--gradient-purple-start))']
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -140,
        endAngle: 130,
        hollow: {
          size: '60%',
        },
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
            fontWeight: '400'
          },
          value: {
            offsetY: 15,
            fontSize: '24px',
            fontWeight: '600',
            formatter: (val) => `${val}%`,
            color: 'hsl(var(--foreground))',
            show: true
          }
        }
      }
    }
  }

  const data = [
    {
      title: 'In Progress',
      subtitle: stats.trips.inProgress,
      icon: <Loader2 className="h-5 w-5" />,
      color: 'hsl(var(--chart-1))'
    },
    {
      title: 'Scheduled',
      subtitle: stats.trips.scheduled,
      icon: <Clock className="h-5 w-5" />,
      color: 'hsl(var(--chart-2))'
    },
    {
      title: 'Delayed',
      subtitle: stats.trips.delayed,
      icon: <Hourglass className="h-5 w-5" />,
      color: 'hsl(var(--chart-3))'
    }
  ]

  return (
    <Card className="h-full w-full rounded-md shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Trips Tracker
          <p className="text-xs font-normal text-muted-foreground mt-1">Last 7 Days</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <h2 className="text-4xl font-semibold mb-2">{stats.trips.total}</h2>
            <p className="mb-8 text-base text-muted-foreground">Total Trips</p>
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index !== data.length - 1 ? 'mb-6' : ''}`}
              >
                <div
                  className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <div className="flex flex-col">
                  <h6 className="text-sm font-medium">{item.title}</h6>
                  <span className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center sm:col-span-7">
            <ReactApexcharts
              type="radialBar"
              height={325}
              options={options}
              series={[completionRate]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}