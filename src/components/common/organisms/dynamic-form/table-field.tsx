"use client";

import { useState } from "react";
import { getIn, FieldArray, useFormikContext } from "formik";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  IFieldConfig,
  FieldRenderer,
  Checkbox,
} from "@components";
import { cn } from "@lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { useTranslate } from "@hooks";
import { Paper } from "@icons";
import { renderArrayError } from "./helpers";

interface TableFieldProps {
  field: IFieldConfig;
}

export function TableField({ field }: TableFieldProps) {
  const t = useTranslate("dynamic_form");
  const { values } = useFormikContext<any>();
  const rows: any[] = values[field.name] || [];

  const [selectedRows, setSelectedRows] = useState<boolean[]>(() =>
    new Array(rows.length).fill(false)
  );

  if (selectedRows.length !== rows.length) {
    setSelectedRows(new Array(rows.length).fill(false));
  }

  const allSelected = rows.length > 0 && selectedRows.every(Boolean);
  const anySelected = selectedRows.some(Boolean);

  const toggleSelectAll = (checked: boolean) => {
    setSelectedRows(new Array(rows.length).fill(checked));
  };

  const toggleRow = (index: number, checked: boolean) => {
    const updated = [...selectedRows];
    updated[index] = checked;
    setSelectedRows(updated);
  };

  return (
    <FieldArray name={field.name}>
      {({ push, remove, form }) => {
        const error = getIn(form.errors, field.name);
        const touched = getIn(form.touched, field.name);

        return (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-gray-500 rounded-lg">
              <Table className="table-auto w-full p-1 text-table-text">
                <TableHeader>
                  <TableRow className="border-t border-table-border bg-light-100">
                    <TableHead className="w-8">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked: boolean) =>
                          toggleSelectAll(!!checked)
                        }
                      />
                    </TableHead>
                    {field?.arrayFields?.map((f) => (
                      <TableHead
                        key={f.name}
                        className="whitespace-nowrap select-none border-table-border text-center"
                      >
                        {f.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length ? (
                    rows.map((row, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                        data-state={selectedRows[rowIndex] ? "selected" : ""}
                        className="border-b border-table-border hover:bg-table-row-selected/50"
                      >
                        <TableCell className="w-8">
                          <Checkbox
                            checked={selectedRows[rowIndex] || false}
                            onCheckedChange={(checked: boolean) =>
                              toggleRow(rowIndex, !!checked)
                            }
                          />
                        </TableCell>

                        {field?.arrayFields?.map((f, index) => (
                          <TableCell key={f.name + index}>
                            <div
                              className={cn(
                                "col-span-12",
                                f.col,
                                f.colClassName
                              )}
                            >
                              <FieldRenderer
                                field={f}
                                name={`${field.name}[${rowIndex}].${f.name}`}
                              />
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={
                          field?.arrayFields?.length
                            ? field?.arrayFields?.length + 1
                            : 0
                        }
                      >
                        <div className="flex items-center justify-center h-[30vh]">
                          <div className="max-w-2xl text-center flex items-center justify-center flex-col gap-4">
                            <Paper />
                            <h1 className="text-xl font-semibold">
                              {t("no_data")}
                            </h1>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {(touched || form.submitCount > 0) && error && (
              <small className="my-2 block text-xs text-error-300">
                {renderArrayError(error)}
              </small>
            )}
            <div className="flex items-center gap-4">
              {anySelected && (
                <Button
                  variant="error"
                  type="button"
                  onClick={() => {
                    const indicesToRemove = selectedRows
                      .map((isSelected, idx) => (isSelected ? idx : null))
                      .filter((idx) => idx !== null) as number[];
                    indicesToRemove.reverse().forEach((idx) => remove(idx));
                  }}
                >
                  <Trash2 size={20} /> {t("delete")}
                </Button>
              )}
              <Button type="button" onClick={() => push({})}>
                <Plus size={20} /> {t("add_row")}
              </Button>
            </div>
          </div>
        );
      }}
    </FieldArray>
  );
}
