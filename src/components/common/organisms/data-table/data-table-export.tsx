"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Label,
  Checkbox,
  Tabs,
  TabsList,
  TabsTrigger,
  ToggleSwitch,
} from "@components";
import { useLocale, useTranslations } from "next-intl";
import { Utils } from "@lib/utils";
import { Table } from "@tanstack/react-table";
import { FileDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useToast } from "@hooks";

interface DataTableExportDialogProps<TData> {
  table: Table<TData>;
}

export function ExportDialog<TData>({
  table,
}: DataTableExportDialogProps<TData>) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<"csv" | "json">("csv");
  const [delimiter, setDelimiter] = useState(",");
  const [mode, setMode] = useState<"all" | "custom">("all");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const locale = useLocale();
  const t = useTranslations("dataTable");
  const pathname = usePathname();
  const { toast } = useToast();
  const fields =
    table.getAllColumns().map((col) => ({
      key: col.id,
      label: col.id,
    })) ?? [];

  const recordCount = table.getCoreRowModel().rows.length;

  const toggleField = (key: string) =>
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows.map((row) => row.original);

    const exportRows =
      mode === "custom" && selectedFields.length > 0
        ? rows.map((r) =>
            Object.fromEntries(
              Object.entries(r as any).filter(([key]) =>
                selectedFields.includes(key)
              )
            )
          )
        : rows;

    const fileName = `The-Terminal-${pathname.split("/").at(-1)}.${format}`;

    if (format === "csv") {
      Utils.exportToCsv(fileName, exportRows as any, delimiter);
    } else {
      const blob = new Blob([JSON.stringify(exportRows, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    }
    toast({
      title: "Success",
      description:
        "Export has started ! Your data should be available shortly.",
    });
    setOpen(false);
  };

  return (
    <>
      <ToggleSwitch
        checked={open}
        onCheckedChange={(checked) => setOpen(checked)}
        size="sm"
        tooltip={t("export.tooltip")}
        checkedChildren={<FileDown />}
        unCheckedChildren={<FileDown />}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-xl space-y-6"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <DialogHeader>
            <DialogTitle>{t("export.title")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              {t("export.recordCount", { count: recordCount })}
            </p>

            {/* File format */}
            <div className="flex flex-col gap-2">
              <Label className="font-semibold">
                {t("export.fileFormat.label")}
              </Label>
              <Tabs value={format} onValueChange={(v: any) => setFormat(v)}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="csv">
                    {t("export.fileFormat.csv")}
                  </TabsTrigger>
                  <TabsTrigger value="json">
                    {t("export.fileFormat.json")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Delimiter */}
            {format === "csv" && (
              <div className="flex flex-col gap-2">
                <Label className="font-semibold">
                  {t("export.delimiter.label")}
                </Label>
                <Tabs value={delimiter} onValueChange={setDelimiter}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="\t">
                      {t("export.delimiter.tab")}
                    </TabsTrigger>
                    <TabsTrigger value=";">
                      {t("export.delimiter.semicolon")}
                    </TabsTrigger>
                    <TabsTrigger value=",">
                      {t("export.delimiter.comma")}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* Export mode */}
            <div className="flex flex-col gap-2">
              <Label className="font-semibold">{t("export.mode.label")}</Label>
              <Tabs value={mode} onValueChange={(v: any) => setMode(v)}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="all">{t("export.mode.all")}</TabsTrigger>
                  <TabsTrigger value="custom">
                    {t("export.mode.custom")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Fields (custom mode) */}
            {mode === "custom" && (
              <div className="flex flex-col gap-2">
                <Label className="font-semibold">
                  {t("export.fields.label")}
                </Label>
                <div className="border border-border custom-scroll rounded-xl p-2 max-h-64 overflow-y-auto space-y-1">
                  {fields.map((field) => (
                    <label
                      key={field.key}
                      className="capitalize flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-muted"
                    >
                      <Checkbox
                        checked={selectedFields.includes(field.key)}
                        onCheckedChange={() => toggleField(field.key)}
                      />
                      <span>{field.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="error-outline" onClick={() => setOpen(false)}>
              {t("export.actions.cancel")}
            </Button>
            <Button variant="primary-outline" onClick={handleExport}>
              {t("export.actions.export")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
