'use client'

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

// Dynamically import ApexCharts with no SSR
const ReactApexcharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const data = [
  {
    title: 'In Progress',
    subtitle: '2',
    icon: <Loader2 className="h-5 w-5" />,
    color: 'hsl(var(--gradient-purple-start))'
  },
  {
    title: 'Scheduled',
    subtitle: '5',
    icon: <Clock className="h-5 w-5" />,
    color: 'hsl(var(--chart-2))'
  },
  {
    title: 'Delayed',
    subtitle: '5',
    icon: <Hourglass className="h-5 w-5" />,
    color: 'hsl(var(--chart-3))'
  }
]

export default function TripsTracker() {
  const stats = useDashboard();
  const completionRate = Math.round((stats.trips.completed / stats.trips.total) * 100);
  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { dashArray: 10 },
    labels: ['Completed Task'],
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
        endAngle: 130,
        startAngle: -140,
        hollow: { size: '60%' },
        track: { background: 'transparent' },
        dataLabels: {
          name: {
            offsetY: -15,
            color: 'hsl(var(--muted-foreground))',
            fontSize: '0.875rem',
          },
          value: {
            offsetY: 15,
            fontWeight: 500,
            formatter: (value) => `${value}%`,
            color: 'hsl(var(--foreground))',
            fontSize: '1.5rem', // Tailwind's text-xl
          },
        }
      }
    },
    grid: {
      padding: {
        top: -30,
        bottom: 12
      }
    },
    responsive: [
      {
        breakpoint: 1300,
        options: {
          grid: {
            padding: {
              left: 22
            }
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          grid: {
            padding: {
              left: 0
            }
          }
        }
      }
    ]
  }

  return (
    <Card className="bg-card text-muted-foreground">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Trips Tracker
          <p className="text-xs mt-1">Last 7 Days</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <h2 className="text-5xl font-bold text-foreground">16</h2>
            <p className="mb-8 text-lg text-muted-foreground">Total Trips</p>
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index !== data.length - 1 ? 'mb-6' : ''
                  }`}
              >
                <div
                  className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
                >
                  <div className="text-foreground">{item.icon}</div>
                </div>
                <div className="flex flex-col items-start">
                  <h6 className="font-medium text-foreground">{item.title}</h6>
                  <span className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center justify-center sm:col-span-7">
            <ReactApexcharts
              type="radialBar"
              height={350}
              options={options}
              series={[80]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
