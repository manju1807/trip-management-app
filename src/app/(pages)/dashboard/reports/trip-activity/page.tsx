// pages/reports/trip-activity.tsx
'use client';
import ReportTemplate from '@/components/views/Templates/reports/report-template';
import { useReports, reportColumns } from '@/hooks/useReports';

export default function TripActivityReport() {
  const { tripActivityData, dateRange, updateDateRange } = useReports();

  return (
    <>
      <ReportTemplate
        title="Trip Activity Report"
        sections={[
          {
            title: "Trip Activities",
            data: tripActivityData,
            columns: reportColumns.tripActivity
          }
        ]}
      />
    </>
  );
}