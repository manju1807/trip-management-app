// @/app/(pages)/reports/trip-alerts.tsx
'use client';

import ReportTemplate from '@/components/views/Templates/reports/report-template';
import { useReports, reportColumns } from '@/hooks/useReports';

export default function TripAlertsReport() {
  const { tripAlertsData, dateRange, updateDateRange } = useReports();

  return (
    <ReportTemplate
      title="Trip Alerts Report"
      sections={[
        {
          title: 'Trip Alerts',
          data: tripAlertsData,
          columns: reportColumns.tripAlerts,
        },
      ]}
      onDateRangeChange={updateDateRange}
      initialStartDate={dateRange.startDate}
      initialEndDate={dateRange.endDate}
    />
  );
}
