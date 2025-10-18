"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.columnDef.enableSorting ?? false;

  if (!canSort) {
    return <div className={cn("flex items-center", className)}>{title}</div>;
  }

  const sorted = column.getIsSorted();

  return (
    <div
      className={cn(
        "w-fit flex items-center justify-center gap-1 cursor-pointer select-none",
        className
      )}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span className="font-medium text-sm text-table-text capitalize">
        {title}
      </span>
      {!sorted ? (
        <ArrowDown size={16} />
      ) : sorted === "asc" ? (
        <ArrowUp size={16} />
      ) : (
        sorted === "desc" && <ArrowDown size={16} />
      )}
    </div>
  );
}
