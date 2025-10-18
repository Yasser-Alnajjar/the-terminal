"use client";

import type { Table } from "@tanstack/react-table";
import {
  Button,
  DataTableViewOptions,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import { cn } from "@lib/utils";
import { useTranslate } from "@hooks";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function DataTablePagination<TData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  const t = useTranslate("dataTable.pagination");
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const getVisiblePages = () => {
    const delta = 2;
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (left > 2) pages.push("ellipsis");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push("ellipsis");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2 w-full border border-border rounded-lg shadow-md p-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger
            className="h-8 gap-2 disabled:cursor-default disabled:!opacity-100 disabled:!text-light-500 disabled:!bg-light-300"
            disabled={table.getCoreRowModel().rows.length === 0}
          >
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DataTableViewOptions table={table} />
      </div>
      <div className="flex items-center gap-1 ">
        {getVisiblePages().map((pageNum, index) =>
          pageNum === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-1 text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              className={cn(
                "h-8 w-8 p-0 text-gray-700 text-xs font-medium rounded-lg cursor-pointer",
                pageNum === currentPage
                  ? "border border-border bg-background hover:bg-gray-300/40 focus-visible:ring-gray-300"
                  : "border border-transparent hover:border-border hover:bg-gray-300/40"
              )}
              onClick={() => table.setPageIndex(pageNum - 1)}
            >
              {pageNum.toString().padStart(2, "0")}
            </button>
          )
        )}
      </div>
      <div className="flex items-center gap-2 select-none">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-sm font-medium bg-transparent "
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t("previous")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-sm font-medium bg-transparent"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
