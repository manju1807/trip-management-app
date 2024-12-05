'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnDef,
  Table,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TableSection<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T, any>[];
}

interface ReportTemplateProps<T, U extends T = T> {
  title: string;
  sections: [TableSection<T>, TableSection<U>?];
  showCheckbox?: boolean;
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export default function ReportTemplate<T, U extends T = T>({
  title,
  sections,
  showCheckbox = true,
  onDateRangeChange,
  initialStartDate = new Date(new Date().setMonth(new Date().getMonth() - 1)),
  initialEndDate = new Date(),
}: ReportTemplateProps<T, U>) {
  const [startDate, setStartDate] = React.useState<Date | null>(
    initialStartDate
  );
  const [endDate, setEndDate] = React.useState<Date | null>(initialEndDate);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Handle date changes and search
  // Updated handleDateChange to handle undefined values
  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    // Convert undefined to null
    const newDate = date || null;

    if (type === 'start') {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
  };

  const handleSearch = () => {
    if (startDate && endDate && onDateRangeChange) {
      onDateRangeChange(startDate, endDate);
    }
  };

  const validSections = sections.filter(
    (section): section is TableSection<T> | TableSection<U> =>
      section !== undefined
  );

  const tables = validSections.map((section) => {
    const finalColumns = React.useMemo(() => {
      if (!showCheckbox) {
        return section.columns as ColumnDef<T | U, any>[];
      }

      const checkboxColumn: ColumnDef<T | U, any> = {
        id: 'select',
        header: ({ table }: { table: Table<T | U> }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
      };

      return [checkboxColumn, ...section.columns] as ColumnDef<T | U, any>[];
    }, [section.columns, showCheckbox]);

    return useReactTable<T | U>({
      data: section.data as (T | U)[],
      columns: finalColumns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        globalFilter,
        pagination,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: setPagination,
    });
  });

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-border space-y-6">
        <h2 className="text-lg">{title}</h2>
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="space-y-1 flex flex-col w-full md:w-auto">
            <label className="text-sm">Filter Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full md:w-[240px] justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={(day) => handleDateChange('start', day)}
                  disabled={(date) => (endDate ? date > endDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-1 flex flex-col w-full md:w-auto">
            <label className="text-sm">Filter End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full md:w-[240px] justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate || undefined}
                  onSelect={(day) => handleDateChange('end', day)}
                  disabled={(date) => (startDate ? date < startDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            className="w-full md:w-auto bg-[hsl(var(--gradient-purple-start))] text-destructive-foreground shadow-md"
            onClick={handleSearch}
            disabled={!startDate || !endDate}
          >
            Search
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Rest of the component remains the same */}
        <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-4 md:items-center">
          <Button className="w-full md:w-auto bg-[hsl(var(--gradient-purple-start))] text-destructive-foreground shadow-md">
            Export xlsx
          </Button>
          <input
            type="text"
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-border rounded-md bg-card"
          />
        </div>

        {validSections.map((section, index) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-base">{section.title}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse divide-y divide-border">
                <thead className="bg-accent">
                  {tables[index].getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b text-left text-sm"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 whitespace-nowrap"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-border">
                  {tables[index].getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-3 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="flex flex-row items-center justify-start md:justify-end gap-4 p-4 md:p-6">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Rows per page:
            </span>
            <select
              className="border border-border bg-accent rounded px-2 py-1"
              value={pagination.pageSize}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(e.target.value),
                }))
              }
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  className="bg-card text-gray-700"
                >
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {pagination.pageIndex * pagination.pageSize + 1}-
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                validSections[0].data.length
              )}{' '}
              of {validSections[0].data.length}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }))
                }
                disabled={pagination.pageIndex === 0}
                className="p-1"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                disabled={
                  (pagination.pageIndex + 1) * pagination.pageSize >=
                  validSections[0].data.length
                }
                className="p-1"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
