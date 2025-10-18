"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  DataTablePagination,
} from "@components";
import { cn } from "@lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection?: Record<string, boolean>;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  globalFilter?: string;
  setGlobalFilter?: (filter: string) => void;
  className?: string;
  headerClassName?: string;
  tableClassName?: string;
  paginated?: boolean;
}

export function CustomDataTable<TData, TValue>({
  columns,
  data,
  rowSelection,
  onRowSelectionChange,
  globalFilter,
  setGlobalFilter,
  className,
  tableClassName,
  headerClassName,
  paginated = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, globalFilter },
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: onRowSelectionChange
      ? (updaterOrValue) => {
          const value =
            typeof updaterOrValue === "function"
              ? updaterOrValue(rowSelection ?? {})
              : updaterOrValue;
          onRowSelectionChange(value);
        }
      : undefined,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className={cn(tableClassName)}>
        <Table>
          <TableHeader className={cn("bg-gray-200", headerClassName)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-sm text-foreground"
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-sm"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {paginated && <DataTablePagination table={table} className="p-4" />}
    </Card>
  );
}
