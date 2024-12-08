import { TrendingUp, LucideIcon } from 'lucide-react';
import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon = TrendingUp,
  iconColor = "text-green-700",
  iconBgColor = "bg-green-200"
}) => (
  <div className="p-2 rounded-md shadow-md h-full w-full flex flex-row justify-between border border-border bg-card">
    <div className="space-y-2">
      <p className="text-xs">{title}</p>
      <p className="text-md font-medium">{value}</p>
      <p className="text-xs">{subtitle}</p>
    </div>
    <div className="flex items-start">
      <div className={`p-2 rounded-lg ${iconBgColor}`}>
        <Icon size={14} className={iconColor} />
      </div>
    </div>
  </div>
);

const Header: React.FC = () => {
  return (
    <h1>hello from header component</h1>
  )
}

const ManagementLayout: React.FC = () => {
  const stats = [
    {
      title: 'Vehicles',
      value: '19',
      subtitle: 'Total Vehicles',
      icon: TrendingUp,
      iconColor: 'text-green-700',
      iconBgColor: 'bg-green-200'
    },
    {
      title: 'Active',
      value: '12',
      subtitle: 'Active Vehicles',
      icon: TrendingUp,
      iconColor: 'text-blue-700',
      iconBgColor: 'bg-blue-200'
    },
    {
      title: 'Maintenance',
      value: '7',
      subtitle: 'In Maintenance',
      icon: TrendingUp,
      iconColor: 'text-orange-700',
      iconBgColor: 'bg-orange-200'
    },
  ];

  return (
    <div className="h-full relative">
      {/* Main Layout */}
      <div className="grid lg:grid-cols-[380px,1fr] gap-4 h-full">
        {/* Left Sidebar */}
        <div className="space-y-4 p-4 overflow-y-auto bg-card rounded-md shadow-md">
          <h1>hello world</h1>
        </div>
        {/* Main Section - Desktop */}
        <div className="relative h-full hidden lg:block">
          <div className="flex flex-col w-full h-full justify-between gap-4">
            <div className="flex flex-row gap-4 justify-between">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  {...stat}
                />
              ))}
            </div>
            <div className="flex flex-col justify-center items-center">
              <Header />
            </div>
          </div>
        </div>
        {/* Main Section - Mobile */}
      </div>
    </div>
  );
};

export default ManagementLayout;