"use client";

import React, { useEffect, useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type Table as TTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
  DataTableEmpty,
} from "@components";
import { DataTablePagination } from "./data-table-pagination";

import { cn } from "@lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  headerClassName?: string;
  paginated?: boolean;
  selectionRender?: ({ table }: { table: TTable<TData> }) => React.ReactNode;
  addButton?: ({ table }: { table: TTable<TData> }) => React.ReactNode;
  header?: ({ table }: { table: TTable<TData> }) => React.ReactNode;
  footer?: ({ table }: { table: TTable<TData> }) => React.ReactNode;
  customFilter?: (row: any, filters: any) => boolean;
  onFiltersChange?: (filters: any) => void;
  title?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  headerClassName,
  paginated = true,
  selectionRender,
  addButton,
  header,
  footer,
  className,
  customFilter,
  onFiltersChange,
  title,
}: DataTableProps<TData, TValue>) {
  const [customFilters, setCustomFilters] = useState<any>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, onRowSelectionChange] = useState({});
  const processedColumns = columns.map((column) => {
    if (column.enableColumnFilter && !column.filterFn) {
      return { ...column };
    }
    return column;
  });

  const table = useReactTable({
    data,
    columns: processedColumns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: onRowSelectionChange
      ? (updaterOrValue) => {
          const value =
            typeof updaterOrValue === "function"
              ? updaterOrValue(rowSelection ?? {})
              : updaterOrValue;
          onRowSelectionChange(value);
        }
      : undefined,
    globalFilterFn: customFilter
      ? (row) => {
          if (customFilters) {
            return customFilter(row, customFilters);
          }
          return true;
        }
      : "includesString",
    enableColumnFilters: true,
    state: {
      rowSelection,
      sorting,
      globalFilter: customFilters ? "active" : globalFilter,
    },
  });
  useEffect(() => {
    if (onFiltersChange && customFilters) {
      onFiltersChange(customFilters);
      setCustomFilters(customFilters);
    }
  }, [customFilters, onFiltersChange]);

  return (
    <React.Fragment>
      <div
        className={cn(
          "w-full  border border-border rounded-lg shadow-md flex-1",
          className
        )}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4">
          {(title ||
            addButton ||
            Object.keys(table.getState().rowSelection).length > 0) && (
            <div className="flex flex-col lg:flex-row items-center gap-2">
              {addButton && addButton({ table })}
              {selectionRender && selectionRender({ table })}
              {title && <h2 className="font-semibold">{title}</h2>}
            </div>
          )}
          {header && header({ table })}
        </div>

        <div className="overflow-x-auto hide-scrollbar">
          <Table className=" w-full p-1">
            {table.getRowModel().rows.length > 0 && (
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className={cn("border-t", headerClassName)}
                  >
                    <TableHead className="text-center w-10">
                      <Checkbox
                        checked={
                          table.getIsAllPageRowsSelected()
                            ? true
                            : table.getIsSomePageRowsSelected()
                            ? "indeterminate"
                            : false
                        }
                        onCheckedChange={(value) =>
                          table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                      />
                    </TableHead>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "whitespace-nowrap select-none",
                          header.id === "actions" &&
                            "w-10 bg-background sticky z-10 end-0"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            )}
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    className={cn(
                      "group border-b border-s border-s-transparent hover:!border-s data-[state=selected]:!border-s data-[state=selected]:border-s-primary-400 hover:border-s-primary-400  hover:bg-primary-25"
                    )}
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                      />
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        data-id={cell.id}
                        className={cn(
                          "whitespace-nowrap",
                          cell.column.id.includes("actions") &&
                            "w-10 bg-background sticky z-10 end-0"
                        )}
                      >
                        {cell.getContext().getValue() === ""
                          ? "-"
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 2}
                    className="h-20 text-center"
                  >
                    <DataTableEmpty />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {paginated && <DataTablePagination table={table} />}
      {footer && footer({ table })}
    </React.Fragment>
  );
}
