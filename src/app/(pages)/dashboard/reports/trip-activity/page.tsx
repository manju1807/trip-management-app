// pages/reports/trip-activity.tsx
'use client';
import ReportTemplate from '@/components/views/reports/report-template';
import { useReports, reportColumns } from '@/hooks/useReports';

export default function TripActivityReport() {
  const { tripActivityData, dateRange, updateDateRange } = useReports();

  return (
    <ReportTemplate
      title="Trip Activity Report"
      sections={[
        {
          title: 'Trip Activities',
          data: tripActivityData,
          columns: reportColumns.tripActivity,
        },
      ]}
      onDateRangeChange={updateDateRange}
      initialStartDate={dateRange.startDate}
      initialEndDate={dateRange.endDate}
    />
  );
}
