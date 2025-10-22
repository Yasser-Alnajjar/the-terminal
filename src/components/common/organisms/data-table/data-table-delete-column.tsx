"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Input,
  Label,
} from "@components";
import { OctagonAlert, Trash2, X } from "lucide-react";
import { cn } from "@lib/utils";
import { useTranslate } from "@hooks";
import { Table, Row } from "@tanstack/react-table";

interface CommonDeleteProps {
  onDelete?: (ids: string[]) => void;
  selectedKey: string;
  triggerClassName?: string;
  triggerType?: "button" | "menu";
}

interface BulkDeleteProps<TData> extends CommonDeleteProps {
  mode: "bulk";
  table: Table<TData>;
}

interface SingleDeleteProps<TData> extends CommonDeleteProps {
  mode: "single";
  row: Row<TData>;
}

type DataTableDeleteProps<TData> =
  | BulkDeleteProps<TData>
  | SingleDeleteProps<TData>;

export function DataTableDeleteColumn<TData>(
  props: DataTableDeleteProps<TData>
) {
  const t = useTranslate("dataTable");
  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (props.mode === "bulk") {
      const selectedIds = props.table
        .getSelectedRowModel()
        .rows.map((r) => (r.original as any)[props.selectedKey as string]);
      props.onDelete?.(selectedIds);
    } else {
      props.onDelete?.([
        (props.row.original as any)[props.selectedKey as string],
      ]);
    }
  };

  const trigger =
    props.triggerType === "menu" ? (
      <li
        className={cn(
          "cursor-pointer hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none",
          props.triggerClassName
        )}
      >
        <Trash2 size={16} />
        {t("delete")}
      </li>
    ) : (
      <Button variant="error" size="default">
        <Trash2 size={16} />
      </Button>
    );

  const name =
    props.mode === "single"
      ? (props.row.original as any)?.name ?? "file"
      : undefined;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent className="max-w-xl p-8 border-[1.5px] border-border hover:border-error-400 gap-4 rounded-2xl">
        <AlertDialogHeader className="flex-row items-center justify-between">
          <AlertDialogTitle className="m-0 flex items-center gap-2 font-medium text-xl">
            <OctagonAlert className="text-error-400" />
            {t("delete_title", name ? { name } : undefined)}
          </AlertDialogTitle>
          <AlertDialogAction asChild>
            <Button
              variant="error"
              size={"icon"}
              className="rounded-full border-0"
              aria-label="Close"
            >
              <X size={16} />
            </Button>
          </AlertDialogAction>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-gray-600 mb-0 text-sm font-medium">
          {t("delete_Description")}
        </AlertDialogDescription>

        <div className="flex flex-col gap-2">
          <Label className="font-medium text-gray-600">
            {t.rich("type_delete", {
              b: (chunk: any) => (
                <b className="font-semibold text-gray-700">{chunk}</b>
              ),
            })}
          </Label>
          <Input
            variant="error"
            className="border-border placeholder:text-base bg-transparent"
            placeholder={t("here")}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>

        <AlertDialogFooter className="mt-1">
          <AlertDialogCancel variant="primary" className="px-[33.5px]">
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="px-[33.5px] bg-error-50 text-error-300 border-error-100"
            disabled={value.toLowerCase() !== "delete"}
            onClick={handleDelete}
          >
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
