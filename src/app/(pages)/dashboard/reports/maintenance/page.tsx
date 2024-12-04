// pages/reports/fuel-maintenance.tsx
'use client';

import ReportTemplate from '@/components/views/Templates/reports/report-template';
import { useReports, reportColumns } from '@/hooks/useReports';

export default function FuelMaintenanceReport() {
  const { fuelMaintenanceData, dateRange, updateDateRange } = useReports();

  const combinedData = [
    ...fuelMaintenanceData.fuelReports,
    ...fuelMaintenanceData.maintenanceReports
  ];

  return (
    <ReportTemplate
      title="Fuel & Maintenance Report"
      sections={[
        {
          title: "Fuel & Maintenance Records",
          data: combinedData,
          columns: reportColumns.fuelMaintenance
        }
      ]}
    />
  );
}