"use client";

import React, { useEffect } from "react";
import {
  Badge,
  Button,
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import { Plus, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useStore, useTranslate } from "@hooks";

import { FilterConfig, OPERATORS } from "src/store/data-table-filter/state";
import { format } from "date-fns";
import { cn } from "@lib/utils";
import { useLocale } from "next-intl";

interface Props {
  filters: FilterConfig[];
  onApply: (items: any[]) => void;
  className?: string;
  show: boolean;
}

export const DataTableFilters: React.FC<Props> = ({
  filters,
  onApply,
  show,
  className,
}) => {
  const t = useTranslate("dataTable");
  const locale = useLocale();
  const {
    items,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    getFieldConfig,
    setFilters,
    formatFilterValue,
  } = useStore((state) => ({
    items: state.items,
    addFilter: state.addFilter,
    removeFilter: state.removeFilter,
    updateFilter: state.updateFilter,
    clearFilters: state.clearFilters,
    getFieldConfig: state.getFieldConfig,
    formatFilterValue: state.formatFilterValue,
    setFilters: state.setFilters,
  }));

  useEffect(() => {
    if (show) setFilters(filters);
    return () => clearFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!show || !filters.length) return null;

  return (
    <div
      className={cn(
        "w-full border border-border rounded-lg space-y-3 p-4 shadow-md",
        className
      )}
    >
      {items.map((it, idx) => {
        const cfg = getFieldConfig(it.id);
        const ops = cfg ? OPERATORS[cfg.type] : [];
        const operatorDisablesValue = (op: string) =>
          op === "is_empty" ||
          op === "is_not_empty" ||
          op.startsWith("last_") ||
          op === "today" ||
          cfg?.type === "boolean";
        return (
          <div
            key={idx}
            className="flex flex-wrap md:flex-nowrap items-center gap-3 border-b border-border pb-3"
          >
            <Select
              value={it.id || undefined}
              dir={locale === "ar" ? "rtl" : "ltr"}
              onValueChange={(v) => {
                updateFilter(idx, {
                  id: v,
                  operator: "",
                  value: "",
                });
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={locale === "ar" ? "اختر" : "Choose"}
                />
              </SelectTrigger>
              <SelectContent>
                {filters

                  .filter(
                    (f) =>
                      !items.some((it2, i2) => i2 !== idx && it2.id === f.id)
                  )
                  .map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {cfg && (
              <>
                <Select
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  value={it.operator ?? ""}
                  onValueChange={(op) => {
                    let value = "";

                    if (cfg.type === "date") {
                      switch (op) {
                        case "today":
                          value = "today";
                          break;
                        case "last_7":
                          value = "last_7";
                          break;
                        case "last_30":
                          value = "last_30";
                          break;
                        case "last_90":
                          value = "last_90";
                          break;
                        case "last_180":
                          value = "last_180";
                          break;
                        case "last_365":
                          value = "last_365";
                          break;
                        default:
                          value = "";
                      }
                    } else if (cfg.type === "boolean") {
                      switch (op) {
                        case "true":
                          value = "true";
                          break;
                        case "false":
                          value = "false";
                          break;
                        case "any":
                          value = "any";
                          break;
                        default:
                          value = "";
                      }
                    }

                    updateFilter(idx, { operator: op, value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={locale === "ar" ? "العنصر" : "Operator"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ops.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!operatorDisablesValue(it.operator) && (
                  <>
                    {(cfg.type === "text" || cfg.type === "number") && (
                      <Input
                        value={it.value || ""}
                        onChange={(e) =>
                          updateFilter(idx, { value: e.target.value })
                        }
                        placeholder={
                          cfg.type === "number"
                            ? "Enter number"
                            : "Enter text or comma-separated values"
                        }
                        type={cfg.type === "number" ? "number" : "text"}
                      />
                    )}

                    {cfg.type === "select" && (
                      <Select
                        dir={locale === "ar" ? "rtl" : "ltr"}
                        value={it.value || undefined}
                        onValueChange={(v) => updateFilter(idx, { value: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose value" />
                        </SelectTrigger>
                        <SelectContent>
                          {cfg.options?.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {cfg.type === "date" &&
                      (it.operator === "range" ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {it.value
                                ? (() => {
                                    const range: DateRange = JSON.parse(
                                      it.value
                                    );
                                    return range?.from && range?.to
                                      ? `${format(
                                          new Date(range.from),
                                          "dd/MM/yyyy"
                                        )} - ${format(
                                          new Date(range.to),
                                          "dd/MM/yyyy"
                                        )}`
                                      : "Pick a date range";
                                  })()
                                : "Pick a date range"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="range"
                              numberOfMonths={2}
                              selected={
                                it.value
                                  ? JSON.parse(it.value)
                                  : { from: undefined, to: undefined }
                              }
                              onSelect={(range: DateRange | undefined) => {
                                if (!range?.from || !range?.to) return;
                                updateFilter(idx, {
                                  value: JSON.stringify({
                                    from: range.from,
                                    to: range.to,
                                  }),
                                });
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : it.operator === "custom" ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {it.value
                                ? new Date(it.value).toLocaleDateString()
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                it.value ? new Date(it.value) : undefined
                              }
                              onSelect={(date) => {
                                if (date)
                                  updateFilter(idx, {
                                    value: date.toISOString(),
                                  });
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : null)}
                  </>
                )}
              </>
            )}
            <Button
              size="icon"
              variant="error"
              className="shrink-0"
              onClick={() => removeFilter(idx)}
            >
              <X size={16} />
            </Button>
          </div>
        );
      })}

      <div className="flex flex-wrap  items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={() => addFilter()}>
            <Plus size={14} /> {t("add_filter")}
          </Button>
          <Button variant="error" onClick={clearFilters}>
            {t("clear_filters")}
          </Button>
          <Button variant="primary" onClick={() => onApply(items)}>
            {t("apply_filters")}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {items
            .filter((it) => it.id && it.operator)
            .map((it, idx) => {
              const cfg = getFieldConfig(it.id);
              if (!cfg) return null;
              return (
                <Badge key={idx} className="flex items-center gap-1 capitalize">
                  <span>
                    {cfg.label}:{" "}
                    {formatFilterValue(cfg.type, it.operator, it.value)}
                  </span>
                  <X
                    size={14}
                    className="cursor-pointer hover:text-destructive"
                    onClick={() => removeFilter(idx)}
                  />
                </Badge>
              );
            })}
        </div>
      </div>
    </div>
  );
};
