// pages/reports/fuel-maintenance.tsx
'use client';

import ReportTemplate from '@/components/views/reports/report-template';
import { useReports, reportColumns } from '@/hooks/useReports';

export default function FuelMaintenanceReport() {
  const { fuelMaintenanceData, dateRange, updateDateRange } = useReports();

  const combinedData = [
    ...fuelMaintenanceData.fuelReports,
    ...fuelMaintenanceData.maintenanceReports,
  ];

  return (
    <ReportTemplate
      title="Fuel & Maintenance Report"
      sections={[
        {
          title: 'Fuel & Maintenance Records',
          data: combinedData,
          columns: reportColumns.fuelMaintenance,
        },
      ]}
      onDateRangeChange={updateDateRange}
      initialStartDate={dateRange.startDate}
      initialEndDate={dateRange.endDate}
    />
  );
}
